# Plana UI Playground

Plana에서 생성된 React 컴포넌트를 미리보기하고 스크린샷을 생성하는 환경.

## 설치

```bash
npm install
```

## 사용법

### 컴포넌트 미리보기

```bash
npm run dev
# http://localhost:5173?component=login/LoginScreen
```

### 스크린샷 생성

```bash
npm run screenshot login/LoginScreen
```

## 디렉토리 구조

- `components/` - AI 생성 컴포넌트 (TSX)
- `components/<screen-id>/<ScreenName>Screen.tsx` - 화면 Shell
- `components/<screen-id>/sections/*.tsx` - 화면 Section 블록
- `scripts/` - 스크린샷 등 유틸리티
- `src/` - Vite 엔트리포인트

## data-plid 속성

모든 컴포넌트의 JSX 요소에는 `data-plid` 속성이 포함됩니다.
이 속성은 영역 선택 편집 기능에서 소스 코드 위치를 식별하는 데 사용됩니다.

```tsx
<div data-plid="login/LoginScreen.tsx:5">
  ...
</div>
```

권장 규칙:
- 화면은 단일 거대 파일로 만들지 말고 Shell + Section으로 분리
- 수정/선택 안정성을 위해 모든 JSX 요소에 data-plid를 유지

## 라우팅 (React Router + data-plana-route)

미리보기/내보내기 모두 React Router를 사용합니다.
이동 가능한 요소에는 `data-plana-route` 속성을 붙여 경로를 지정합니다.

```tsx
<button data-plana-route="/dashboard">대시보드로 이동</button>
```

규칙:
- 경로는 `/`로 시작합니다. (예: `/dashboard`, `/projects/alpha`)
- 클릭 브리지가 `data-plana-route`를 해석해 Router로 이동합니다.
