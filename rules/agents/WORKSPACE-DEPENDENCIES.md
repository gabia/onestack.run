# 워크스페이스 의존성 관리 (Sandpack 모델)

이 문서는 Plana의 워크스페이스별 의존성 관리 방식을 **Sandpack 기반**으로 설명합니다.

## 개요

각 워크스페이스는 **자신의 `package.json`** 을 유지하지만, **별도의 `node_modules`를 설치하지 않습니다.**
미리보기는 브라우저에서 Sandpack이 `package.json` 의존성을 CDN으로 로드해 번들링합니다.

### 기본 제공 라이브러리

모든 새 워크스페이스는 자동으로 다음 라이브러리를 포함합니다:

```json
{
  "dependencies": {
    "lucide-react": "^0.460.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.30.1",
    "recharts": "^2.15.0"
  }
}
```

**용도:**
- `lucide-react` - 아이콘
- `recharts` - 차트/그래프
- `react`, `react-dom` - 기본 React
- `react-router-dom` - 화면 간 라우팅 (`data-plana-route` 지원)

---

## 추가 의존성 추가

### 방법 1: 사용자가 직접 추가 (권장)

1. 워크스페이스 `package.json` 파일 편집:
   ```bash
   # 예: ~/plana/1994/15623100/my-project/product-description/design/_playground/package.json
   ```

2. `dependencies`에 라이브러리 추가:
   ```json
   {
     "dependencies": {
       "lucide-react": "^0.460.0",
       "react": "^18.3.1",
       "react-dom": "^18.3.1",
       "react-router-dom": "^6.30.1",
       "recharts": "^2.15.0",
       "framer-motion": "^11.0.0"  // 추가됨
     }
   }
   ```

3. 미리보기 재로드
   - Sandpack이 브라우저에서 CDN으로 자동 로드
   - **별도 `npm install` 불필요**

### 방법 2: OpenCode가 추가 (사용자 승인 필요)

OpenCode가 기본 라이브러리로 구현 불가능한 기능을 만날 때:

1. **질문**:
   ```
   이 기능을 구현하려면 framer-motion 라이브러리가 필요합니다.
   워크스페이스에 framer-motion@^11.0.0을 추가할까요?
   (대안: Tailwind CSS로 간단한 애니메이션 구현 가능)
   ```

2. **사용자 승인 후**:
   - `package.json` 업데이트
   - 미리보기 자동 반영

---

## 워크스페이스 격리 동작 방식

### 파일 구조

```
workspace/
└── product-description/
    └── design/_playground/
        ├── components/           (워크스페이스 전용)
        ├── package.json          (의존성 정의)
        └── .playground-template-version (버전 마커)
```

### 런타임 번들링 (Sandpack)

1. **의존성 해석**
   - `package.json`의 dependencies를 읽음
   - CDN으로 필요한 패키지를 다운로드

2. **브라우저 번들링**
   - Sandpack이 컴포넌트 코드를 브라우저에서 번들링
   - 서버 빌드/Node.js 실행 없음

3. **워크스페이스 격리**
   - 다른 워크스페이스의 `package.json`과 완전히 분리
   - 서로 다른 버전을 동시에 사용 가능

---

## 사용 예시

### 예시 1: 워크스페이스별 다른 차트 라이브러리

**워크스페이스 A** (기본):
```json
{
  "dependencies": {
    "recharts": "^2.15.0"
  }
}
```

**워크스페이스 B** (커스텀):
```json
{
  "dependencies": {
    "recharts": "^2.15.0",
    "nivo": "^0.87.0"  // 추가된 차트 라이브러리
  }
}
```

두 워크스페이스는 서로 충돌 없이 렌더링됩니다.

### 예시 2: 애니메이션 라이브러리 추가

**사용자 요청**:
> "3D 회전 애니메이션이 있는 카드 UI 만들어줘"

**OpenCode 응답**:
> 3D 변환 애니메이션을 구현하려면 `framer-motion` 라이브러리가 필요합니다.
> 워크스페이스에 `framer-motion@^11.0.0`을 추가할까요?
> 
> (대안: Tailwind의 `transform` + `transition`으로 2D 회전 구현 가능)

**사용자**: "추가해줘"

**결과**:
1. `package.json`에 `"framer-motion": "^11.0.0"` 추가
2. 미리보기 재로드 → 자동 반영
3. 컴포넌트 생성

---

## 주의사항

### ✅ 허용
- 프론트엔드 UI 라이브러리 (차트, 애니메이션, 아이콘)
- TypeScript 타입 정의 패키지
- 워크스페이스별 독립적인 버전 관리

### ❌ 금지
- 백엔드/서버 라이브러리 (`express`, `fastify` 등)
- 데이터베이스 클라이언트 (`pg`, `mongodb` 등)
- API 호출 라이브러리 (`axios`, `fetch` wrapper)
- 전역 상태 관리 (`zustand`, `redux`) - 정적 프로토타입에 불필요
- React Hooks에 의존하는 라이브러리 - 정적 컴포넌트만 생성

### 보안
- **사용자 승인 없이 의존성 추가 금지**
- npm 공식 레지스트리 패키지만 허용
- `package.json`에 임의의 스크립트 추가 금지

---

## 문제 해결

### 미리보기 실패: "Cannot find module 'xxx'"
**원인**: `package.json`에 의존성이 없음

**해결**:
1. `package.json`에 패키지 추가
2. 미리보기 새로고침

### CDN 로드 실패
**원인**: 네트워크 차단 또는 외부 CDN 접근 실패

**해결**:
- 사내 프록시/방화벽 설정 확인
- CDN 접근이 불가한 환경에서는 별도 프록시 또는 사내 레지스트리 정책 검토

---

## 참고

- 템플릿: `product-description/design/_playground/package.json`
- 프리뷰 번들 API: `app/api/design/preview-bundle/route.ts`
- 프리뷰 렌더러: `app/_components/SandpackPreview.tsx`
- UI 생성 지침: `product-description/rules/agents/ui-generator.md`
