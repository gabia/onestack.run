# UI 컴포넌트 생성 지침

이 문서는 Plana가 UI 컴포넌트를 생성할 때 적용되는 규칙이다.

## 생성 규칙 (필수)

### 0. 역할 범위 (최우선)

- **프론트엔드 전용**: React/TypeScript/Tailwind UI만 생성한다.
- **백엔드/서버/DB/네트워크 코드는 절대 생성하지 않는다.**
- 외부 API 연동이 필요한 경우에도 **UI는 Mock 데이터 기반으로 완결**한다.
- 빈 파일/플레이스홀더/`.gitkeep` 생성 금지.

### 1. data-plid 속성

모든 최상위 JSX 요소에 `data-plid` 속성을 추가한다.

**형식**: `data-plid="{파일경로}:{라인번호}"`

**예시**:
```tsx
// components/login/LoginScreen.tsx
export default function LoginScreen() {
  return (
    <div data-plid="login/LoginScreen.tsx:3" className="...">
      <h1 data-plid="login/LoginScreen.tsx:4">로그인</h1>
      <input data-plid="login/LoginScreen.tsx:5" ... />
    </div>
  )
}
```

### 2. 스타일링

- **Tailwind CSS만 사용** (inline style 금지)
- 색상: primary (#136dec), gray scale
- 폰트: Pretendard (기본)
- 완성도 기준: Stitch/Lovable 수준의 현대적 UI 밀도와 레이아웃 정렬을 목표로 한다
- 컴포넌트 간 여백/정렬/계층이 명확해야 한다
- 카드/리스트/배지/요약 수치 등 정보 컴포넌트를 적극 활용한다

### 3. 파일 규칙

- **(중요) 화면 기획(TSX)을 생성할 때는 사용자의 승인을 묻지 않고, 지정된 경로에 즉시 새 파일을 생성/저장한다.**
- **산출물 형태(TSX)나 저장 위치에 대해서 사용자에게 질문하지 않는다.**
- 경로: `design/_playground/components/{화면ID}/`
- **모든 화면은 반드시 자신만의 `{화면ID}/` 서브디렉토리 안에 위치해야 한다.**
  - ❌ `components/AgentDashboard.tsx` (평면 파일 — 라우팅 불가)
  - ✅ `components/agent-dashboard/AgentDashboardScreen.tsx`
- 메인 화면 파일: `{ScreenName}Screen.tsx` (예: `ProjectOverviewScreen.tsx`)
- 섹션 폴더: `sections/`
- 섹션 파일: `{ScreenName}{Section}.tsx` (예: `ProjectOverviewHeader.tsx`)
- 메인 화면 파일은 **섹션 조합만 담당**하고, 상세 UI는 `sections/*.tsx`로 분리
- 컴포넌트명 = 파일명 일치
- 메인 파일 `export default` 필수

### 3.1 참조 예시 활용 (필수)

화면을 처음 생성하기 전에 **반드시** 아래 경로의 참조 예시를 읽고 컴포넌트 구조, data-plid 패턴, 섹션 분리 방식을 확인한다.

```
design/_playground/components/.examples/
├── planning-brief/          ← 기획 브리프 화면 예시
│   ├── PlanningBriefScreen.tsx
│   └── sections/
├── project-overview/        ← 프로젝트 개요 화면 예시
│   ├── ProjectOverviewScreen.tsx
│   └── sections/
└── publish-ready/           ← 배포 준비 화면 예시
    ├── PublishReadyScreen.tsx
    └── sections/
```

- `.examples/` 폴더는 **읽기 전용 참조용**이다. 이 폴더 안의 파일은 수정/삭제하지 않는다.
- 실제 생성 파일은 반드시 `design/_playground/components/{화면ID}/` 경로에 만든다.
- 예시와 동일한 패턴(ScreenShell + sections 분리, data-plid, data-plana-route)을 유지한다.

### 3.2 기존 화면/트리 구조가 있는 경우 (필수)

- 기존 템플릿/트리 구조가 있으면, **현재 요청된 페이지 구성에 맞게 재구성**한다.
- 필요한 페이지로 구성 변경 시 **파일명까지 함께 수정**한다.
  - 예: 화면 구성 변경 → `{ScreenName}Screen.tsx` 및 `sections/*.tsx` 파일명도 함께 변경
- 변경 후에는 data-plid 값과 경로가 **새 파일명 기준으로 일치**해야 한다.
- 새 화면 집합이 확정되면, **현재 기획에 포함되지 않는 기존 템플릿/잔여 화면은 삭제**한다.
- 최종적으로 `design/_playground/components/` 아래에는 **실제로 필요한 화면만 남아야 한다.**
- 더 이상 사용하지 않는 예전 화면/섹션/썸네일(`.png`)도 함께 정리한다.

### 4. 한국어 사용

- 모든 UI 텍스트는 한국어
- 하드코딩 데이터 사용 (실제 API 연동 X)
- 실제 서비스 플로우/용어를 반영한 문구 사용 (예: 주제 선택, 질문 진행, 결과 요약)
- 다음 단계로 이어지는 CTA가 반드시 있어야 함
- UI는 프론트엔드 전용으로 구성하며 백엔드/DB/네트워크 연결을 가정하지 않는다

### 5. Mock 데이터 정합성 (필수)

- 모든 수치/표/차트/요약 카드는 **mock 데이터**로 채운다.
- 표/카드 간 숫자 관계는 반드시 맞아야 한다.
  - 합계 = 세부 항목 합
  - 비율(%) 합 = 100%(또는 반올림 오차 범위 명시)
  - 전월/전주 비교 증감값은 원본 수치와 일치
- 화면 내 동일 지표를 여러 위치에 보여줄 때 값이 서로 다르면 안 된다.
- 정합성을 맞출 수 없는 임의 숫자는 금지한다.
- mock 데이터는 실제 서비스에서 쓰일 법한 범위/문맥으로 구성한다

### 6. UI 구조 패턴 (권장)

- 상단 헤더: 타이틀, 보조 설명, 상태 배지
- 핵심 카드: 요약 수치/진행률/상태를 카드로 묶어 제시
- 활동/히스토리/로그 영역이 필요하면 타임라인/리스트로 구성
- CTA는 화면의 목적과 다음 단계에 맞춰 1~2개로 정리
- 웹 레이아웃일 경우 좌우 분할/그리드 구성을 우선 고려

### 6.1 레이아웃 기본값 (필수)

- **웹(데스크톱) 전용으로 진행**
- 기준 폭: **1200px** (그리드/좌우 분할 허용)
- **모바일 레이아웃은 제외** (요청이 명시되지 않는 한 만들지 않음)

### 6.2 화면 간 이동(필수)

- 여러 화면이 있는 기획/템플릿이라면 **LNB/탭/상단 내비게이션** 중 하나를 포함한다.
- 이동 트리거는 **data-plana-route** 또는 **data-route** 속성을 사용한다.

**경로 형식 (필수):** `{화면ID}/{ScreenName}` — 화면의 서브디렉토리명과 파일명(`.tsx` 제외)을 `/`로 연결

```tsx
// ✅ 올바른 예: agent-dashboard/AgentDashboardScreen.tsx 화면으로 이동
<button data-plana-route="agent-dashboard/AgentDashboardScreen">에이전트 대시보드</button>

// ✅ 올바른 예: planning-brief/PlanningBriefScreen.tsx 화면으로 이동
<nav>
  <a data-plana-route="planning-brief/PlanningBriefScreen">기획 브리프</a>
  <a data-plana-route="ticket-detail/TicketDetailScreen">티켓 상세</a>
</nav>

// ❌ 잘못된 예: 컴포넌트명만 넣는 경우 (라우팅 실패)
<button data-plana-route="AgentDashboard">에이전트</button>
```

- 주요 CTA/화면 이동은 **callback prop(onStartGame, onNext 등)** 에 의존하지 말고 `data-plana-route`/`data-route`로 직접 연결한다.
- 생성된 화면은 **단독 preview 안에서도 라우팅이 동작**해야 하므로, 별도 App Shell/부모 상태 주입을 전제로 설계하지 않는다.
- 내비게이션은 최소 3개 화면 이상을 서로 오갈 수 있게 구성한다.
- 화면 목록에서 사용자가 **서비스 범위**를 체감할 수 있도록 화면명/섹션명을 명확히 표기한다.

## 금지 패턴 (절대 사용 금지)

### ❌ React Hooks (상태 관리 금지)
- `useState`, `useEffect`, `useContext`, `useReducer`, `useMemo`, `useCallback` 등 모든 Hook 사용 금지
- 이유: 정적 프로토타입만 생성. 동적 상태 관리 불필요

### ✅ 허용된 라이브러리 import

**기본 제공 라이브러리 (즉시 사용 가능):**
- ✅ `lucide-react` (아이콘)
- ✅ `recharts` (차트)
- ✅ `react`, `react-dom` (기본)
- ✅ `react-router-dom` (라우팅)
- ✅ `./sections/Header.tsx` (같은 화면의 섹션 파일)

**사용 예시:**
```tsx
import { Search, User, Settings } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis } from 'recharts'
```

### 📦 추가 의존성이 필요한 경우

**기본 제공 라이브러리로 구현 불가능할 때만** 추가 의존성을 요청할 수 있습니다.

**절차:**
1. **사용자에게 질문**: "이 기능을 구현하려면 `{라이브러리명}` 패키지가 필요합니다. 워크스페이스에 추가할까요?"
2. **사용자 승인 후**: 
   - 워크스페이스 `package.json`에 추가할 의존성과 버전을 명시
   - 예: `"framer-motion": "^11.0.0"`
3. **미리보기 반영**: Sandpack이 CDN에서 자동 로드 (별도 `npm install` 없음)

**승인 없이 추가 금지:**
- 사용자 확인 없이 임의로 의존성을 추가하지 않는다
- 기본 제공 라이브러리로 해결 가능한 경우 추가 요청하지 않는다

**예시 대화:**
```
사용자: "3D 애니메이션이 필요한 카드를 만들어줘"
AI: "3D 변환 애니메이션을 구현하려면 framer-motion 라이브러리가 필요합니다. 
     워크스페이스에 framer-motion@^11.0.0을 추가할까요? 
     (대안: Tailwind의 transform/transition으로 간단한 2D 애니메이션 가능)"
사용자: "추가해줘"
AI: [package.json 업데이트 + 컴포넌트 생성]
```

### ❌ 금지된 라이브러리
- ❌ `@heroicons/react`, `react-icons` (lucide-react만 사용)
- ❌ `axios`, `fetch`, `swr`, `react-query` (API 호출)
- ❌ `zustand`, `redux`, `jotai` (전역 상태 관리)
- ❌ 애니메이션 라이브러리는 **사용자 승인 후에만** (기본은 Tailwind transition)
- ❌ 기타 명시되지 않은 라이브러리는 **사용자 승인 후에만**

### ❌ 기타 금지
- ❌ inline style (`style={{ }}`)
- ❌ `any` 타입
- ❌ `console.log`
- ❌ 빈 catch 블록
- ❌ `.gitkeep` 또는 빈 파일 생성
- ❌ 백엔드/서버/DB 코드

## 프롬프트 템플릿

사용자 요청을 받으면 아래 형식으로 변환:

```
[컴포넌트 생성 요청]
화면ID: {screenId}
파일경로: design/_playground/components/{screenId}/{ScreenName}.tsx
섹션경로: design/_playground/components/{screenId}/sections/*.tsx

요구사항:
{사용자 설명}

서비스 연결 포인트:
- 이 화면이 서비스 플로우의 어느 단계인지 명시
- 사용자가 다음 단계로 이동하는 행동(CTA)을 포함
- 실사용에 필요한 정보(진행률/상태/결과)를 화면에 보여줄 것

품질 기준:
- Stitch/Lovable 수준의 UI 밀도와 정보 구조
- 그리드/타이포/카드 계층이 명확해야 함
- 실제 서비스에 가까운 구성 요소(헤더, 카드, 배지, 리스트, 상태 표시)를 포함

레이아웃:
- 웹(데스크톱)만 진행
- 기준 폭: 1200px
- 그리드/좌우 분할 허용
- ScreenShell + Section(최소 2개) 구조

필수 적용:
- 메인 파일은 섹션 조합만 작성
- 상세 블록은 sections 파일로 분리
- data-plid 속성 (모든 요소, 형식: {screenId}/파일명.tsx:라인번호)
- Tailwind CSS만 사용
- 한국어 텍스트
- 하드코딩 데이터
- 레이아웃 타겟은 **웹(데스크톱)**으로 고정
- 템플릿/트리 구조가 있으면 **페이지 구성에 맞게 파일명까지 수정**
- 새 화면 구성에 포함되지 않는 기존 템플릿/잔여 화면은 삭제
- 최종 화면 목록에는 현재 기획에 필요한 화면만 남기기
- **기본 제공 라이브러리 우선 사용** (lucide-react, recharts)
- **추가 의존성 필요 시 사용자 승인 요청**
- **React Hook 사용 절대 금지** (useState, useEffect 등)
```

## 수정 요청 처리

영역 선택 수정 요청 시:

1. `plid` 값으로 대상 요소 식별
2. 해당 요소만 수정 (나머지 유지)
3. data-plid 속성 라인번호 업데이트

**예시**:
```
[수정 요청]
plid: login/LoginScreen.tsx:5
현재 코드: <input placeholder="이메일" ... />
수정 내용: placeholder를 "이메일 주소를 입력하세요"로 변경
```

### [VISUAL EDIT] 처리 규칙

- 요청이 `[VISUAL EDIT]`로 시작하면 **선택된 요소만** 수정한다.
- **재설계/레이아웃 변경 금지** (타 요소 영향 최소화).
- 이전 프롬프트/프로토타입 지침은 **이번 턴에서 무시**한다.
- 수정 범위를 넘어서는 요청은 거절하고, 필요 시 사용자에게 범위를 좁히라고 안내한다.

## 실행 모드

- 기본: 화면 생성/수정은 비동기 job 기반으로 실행한다.
- 출력 계약:
  - 시작 시 `jobId`를 즉시 반환
  - 진행 중 상태/단계 표시
  - 완료 시 생성된 TSX/PNG 경로 반환
- 재시도 정책:
  - 세션 만료/무응답 감지 시 새 세션으로 1회 자동 재시도

## 상호작용 규칙 (강제)

- 생성/수정 작업은 한 번에 모두 수행하지 않고, 작은 단계(todo)로 나눠 진행한다.
- 사용자가 추가 요청을 보내면 기존 작업을 중단하고 최신 요청부터 처리한다.
- 중간 산출물(초안 화면 1개 이상)이 나오면 즉시 사용자에게 확인 포인트를 제시한다.
