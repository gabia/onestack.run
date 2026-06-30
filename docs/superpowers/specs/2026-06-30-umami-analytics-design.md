# Umami Web Analytics Integration Design

## Overview

Onestack 플랫폼 사용자들이 배포한 사이트의 방문자 통계를 확인할 수 있도록, Umami 자체 호스팅 인스턴스를 배포하고 Dokploy 대시보드에 Analytics 탭으로 통합한다.

## Goals

- 사용자가 프로젝트 대시보드에서 Analytics를 활성화하면 Umami website가 자동 생성된다
- Vercel Analytics처럼 프로젝트 내 "분석" 탭에서 방문자 통계를 바로 확인할 수 있다
- 트래킹 코드(스크립트 태그)를 복사하여 사용자가 직접 사이트에 삽입한다

## Non-Goals

- 트래킹 코드 자동 삽입 (사용자 직접 복사 방식)
- 사용자별 독립 Umami 인스턴스 (멀티테넌트 공용)
- Umami Cloud 사용 (자체 호스팅)

---

## Architecture

```
┌─────────────────────────────────────────────────┐
│                    사용자 브라우저                    │
│  ┌──────────────────┐  ┌──────────────────────┐  │
│  │ Dokploy Dashboard │  │ 사용자의 배포된 사이트   │  │
│  │ (Analytics 탭)    │  │ (트래킹 스크립트 삽입)  │  │
│  └────────┬─────────┘  └──────────┬───────────┘  │
└───────────┼────────────────────────┼──────────────┘
            │ iframe (share URL)     │ 트래킹 데이터
            ▼                        ▼
┌─────────────────────────────────────────────────┐
│              Umami (analytics.onestack.run)       │
│  ┌─────────────┐  ┌──────────────────────────┐  │
│  │ Umami Web UI │  │ Umami Collector Endpoint │  │
│  │ (Share Page) │  │ POST /api/send           │  │
│  └──────┬──────┘  └──────────┬───────────────┘  │
│         └────────┬───────────┘                   │
│                  ▼                                │
│         ┌──────────────┐                         │
│         │  PostgreSQL   │                         │
│         │  (Umami 전용)  │                         │
│         └──────────────┘                         │
└─────────────────────────────────────────────────┘
            ▲
            │ Umami REST API
┌───────────┴─────────────────────────────────────┐
│            Dokploy API Server                    │
│  ┌──────────────────────────────────────┐       │
│  │ tRPC Router: analytics procedures    │       │
│  │ - enableAnalytics                     │       │
│  │ - disableAnalytics                    │       │
│  │ - getAnalytics                        │       │
│  └──────────────────────────────────────┘       │
└─────────────────────────────────────────────────┘
```

### Flow

1. 사용자가 Dokploy 프로젝트에서 "분석 활성화" 클릭
2. Dokploy API가 Umami REST API를 호출해 website + share URL 자동 생성
3. Analytics 탭에 Umami share page를 iframe으로 임베드
4. 사용자는 트래킹 코드를 복사해서 자신의 사이트 `<head>`에 삽입
5. 방문자 데이터가 Umami로 수집되어 Analytics 탭에서 확인 가능

---

## Umami Deployment

Docker Compose로 Dokploy 서버에 배포한다.

```yaml
services:
  umami:
    image: ghcr.io/umami-software/umami:postgresql-latest
    ports:
      - "3001:3000"
    environment:
      DATABASE_URL: postgresql://umami:${UMAMI_DB_PASSWORD}@umami-db:5432/umami
      APP_SECRET: ${UMAMI_APP_SECRET}
    depends_on:
      umami-db:
        condition: service_healthy
    restart: always

  umami-db:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: umami
      POSTGRES_USER: umami
      POSTGRES_PASSWORD: ${UMAMI_DB_PASSWORD}
    volumes:
      - umami-db-data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U umami"]
      interval: 5s
      timeout: 5s
      retries: 5
    restart: always

volumes:
  umami-db-data:
```

- **도메인**: `analytics.onestack.run` (Traefik 라우팅)
- **DB**: Dokploy PostgreSQL과 별도 Umami 전용 PostgreSQL
- **관리 계정**: 환경 변수로 관리 (`UMAMI_ADMIN_USERNAME`, `UMAMI_ADMIN_PASSWORD`)

---

## DB Schema Changes

application 테이블에 3개 필드 추가 (Drizzle migration):

```typescript
// packages/server/src/db/schema/application.ts
analyticsEnabled: boolean("analyticsEnabled").default(false),
umamiWebsiteId: text("umamiWebsiteId"),
umamiShareId: text("umamiShareId"),
```

- `analyticsEnabled`: Analytics 활성화 여부
- `umamiWebsiteId`: Umami에서 생성된 website UUID (트래킹 코드에 사용)
- `umamiShareId`: Umami share page의 slug (iframe URL에 사용)

---

## Umami API Client

```typescript
// packages/server/src/utils/analytics/umami-client.ts

class UmamiClient {
  private baseUrl: string;  // https://analytics.onestack.run
  private token: string | null;

  // POST /api/auth/login → JWT 토큰 발급 (캐싱)
  async getToken(): Promise<string>

  // POST /api/websites { name, domain } → { id, ... }
  async createWebsite(name: string, domain: string): Promise<{ id: string }>

  // DELETE /api/websites/:websiteId
  async deleteWebsite(websiteId: string): Promise<void>

  // POST /api/share { entityId, shareType: 1, name, slug } → { id, slug }
  async createShare(websiteId: string, name: string): Promise<{ id: string; slug: string }>

  // DELETE /api/share/id/:shareId
  async deleteShare(shareId: string): Promise<void>
}
```

환경 변수:
- `UMAMI_BASE_URL`: Umami 인스턴스 URL (default: `https://analytics.onestack.run`)
- `UMAMI_ADMIN_USERNAME`: 관리자 아이디
- `UMAMI_ADMIN_PASSWORD`: 관리자 비밀번호

---

## tRPC Procedures

`server/api/routers/application.ts`에 추가:

### enableAnalytics

```typescript
enableAnalytics: protectedProcedure
  .input(z.object({ applicationId: z.string() }))
  .mutation(async ({ input, ctx }) => {
    // 1. 권한 확인 (monitoring.create)
    // 2. 앱 정보 + 도메인 조회
    // 3. Umami API: createWebsite(appName, domain)
    // 4. Umami API: createShare(websiteId, appName)
    // 5. DB 업데이트: analyticsEnabled=true, umamiWebsiteId, umamiShareId
    // 6. 결과 반환
  })
```

### disableAnalytics

```typescript
disableAnalytics: protectedProcedure
  .input(z.object({ applicationId: z.string() }))
  .mutation(async ({ input, ctx }) => {
    // 1. 권한 확인
    // 2. Umami API: deleteShare(shareId)
    // 3. Umami API: deleteWebsite(websiteId)
    // 4. DB 업데이트: analyticsEnabled=false, umamiWebsiteId=null, umamiShareId=null
  })
```

### getAnalytics

```typescript
getAnalytics: protectedProcedure
  .input(z.object({ applicationId: z.string() }))
  .query(async ({ input, ctx }) => {
    // 1. 권한 확인 (monitoring.read)
    // 2. DB에서 analyticsEnabled, umamiWebsiteId, umamiShareId 조회
    // 3. 트래킹 스크립트 태그 생성
    // 4. Share URL 생성
    // 반환: { enabled, trackingScript, shareUrl }
  })
```

---

## UI Components

### Tab 추가 위치

기존 "모니터링" 탭 뒤, "고급" 탭 앞에 "분석" 탭 추가.
`monitoring.read` 권한을 재활용.

파일: `apps/dokploy/pages/dashboard/project/[projectId]/environment/[environmentId]/services/application/[applicationId].tsx`

```typescript
// TabState 타입에 "analytics" 추가
// TabsTrigger + TabsContent 추가
```

### Component Structure

```
components/dashboard/application/analytics/
├── show-analytics.tsx        # 메인 컨테이너 (상태별 분기)
├── analytics-placeholder.tsx  # 미활성화 상태 UI (활성화 버튼)
├── analytics-dashboard.tsx   # 활성화 상태: 트래킹 코드 + iframe
└── tracking-code-snippet.tsx  # 트래킹 코드 복사 UI
```

### UI States

**미활성화 상태**: 안내 메시지 + "분석 활성화" 버튼

**활성화 상태**:
- 상단: 트래킹 코드 스니펫 (복사 버튼 포함)
- 하단: Umami share page iframe (`https://analytics.onestack.run/share/{shareId}`, height 800px)
- 우상단: "비활성화" 버튼

### iframe Embed

```tsx
<iframe
  src={`https://analytics.onestack.run/share/${shareId}`}
  className="w-full border-0 rounded-lg"
  style={{ height: "800px" }}
  title="Analytics Dashboard"
/>
```

---

## Edge Cases

- **도메인 미설정 앱**: 도메인이 없는 앱은 Analytics 활성화 불가. "먼저 도메인을 설정하세요" 안내 표시.
- **도메인 변경 시**: 기존 Umami website의 domain 필드를 Umami API로 업데이트 (PUT /api/websites/:id).
- **앱 삭제 시**: 앱 삭제 flow에서 Umami website/share도 함께 정리.

## Error Handling

- **Umami 서버 다운**: Analytics 탭에서 "분석 서버에 연결할 수 없습니다" 메시지 표시
- **API 호출 실패**: 활성화/비활성화 시 toast 에러 메시지, DB 상태 롤백
- **인증 토큰 만료**: UmamiClient에서 자동 재발급 (401 응답 시 retry)

## Testing

- UmamiClient 단위 테스트 (API 호출 mock)
- tRPC 프로시저 통합 테스트
- UI 컴포넌트 렌더링 테스트 (활성화/미활성화 상태 전환)
