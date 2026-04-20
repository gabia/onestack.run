# Plan: Onestack 차세대 클라우드 배포 플랫폼 홍보 웹페이지 구현

## TL;DR

> **Summary**: Onestack의 5가지 핵심 가치("Code to Edge, Securely" 컨셉)를 강렬하게 표현하는 고성능, 고미학 마케팅 랜딩 페이지 구축
>
> **Deliverables**:
> - React/TypeScript 기반 단일 페이지 애플리케이션 (`pages/index.tsx` 또는 `app/page.tsx`)
> - 7개 섹션 컴포넌트 (Header, Hero, ValueProps, SocialProof, Comparison, CTA, Footer)
> - Tailwind CSS 스타일링 + 커스텀 애니메이션 (기존 디자인 시스템 통합)
> - SEO 최적화 (메타 태그, 구조화된 데이터, Open Graph)
> - Lighthouse 점수 90+ 달성 (성능, 접근성, SEO)
>
> **Effort**: Large (약 40~60시간)
>
> **Parallel**: YES - 컴포넌트별 병렬 개발 가능, 최종 통합 1주일
>
> **Critical Path**: 기획(완료) → 컴포넌트 개발 → 스타일링 → SEO/성능 최적화 → 배포

---

## Context

### Original Request
사용자는 Onestack의 5가지 핵심 가치제안(Zero-Config, Security, Performance, Automation, Cost)을 강조하는 차별화된 홍보 웹페이지를 요청했습니다. 대상은 개발자 + CTO + 비즈니스 리더 혼합 세그먼트, 성공 기준은 미학적 우수성 + 디자인 품질입니다.

### Confirmed Decisions
1. **기술 스택**: React + TypeScript + Tailwind CSS (기존 `design/_playground` 패턴 따르기)
2. **색상**: Primary #136dec (기존 설정), 신규 secondary/accent 색상 정의
3. **폰트**: Pretendard (기존 global)
4. **산출물**: 반응형 HTML/CSS/JS (Next.js 기반 추천)
5. **배포**: Onestack 자신의 플랫폼에 배포 (dogfooding)
6. **언어**: 한국어 우선 (영문은 v2로 미연)
7. **참고사항**: Vercel, Heroku, Coolify, Dokploy 경쟁사 분석 완료

### Metis / Oracle Review (Guardrails & Gaps Addressed)

#### ✅ 가드레일: 피해야 할 것들
1. **과도한 정보**: 5가지 가치에만 집중, 기술 스펙 서술 금지
2. **경쟁사 명시 비난**: 비교는 OK, 비난은 안 됨 → 표현 신중하게
3. **느린 로딩**: 이미지 최적화 (WebP, lazy-loading) 필수
4. **모바일 무시**: 반응형 우선, 모든 CTA 모바일에서 손가락 크기 이상

#### ⚠️ 누락 위험: 확인해야 할 것들
1. **고객 증명 콘텐츠**: 로고, 통계, 후기 준비 여부 확인 필요
2. **CTA 링크 대상**: "지금 시작하기" → 어디로? (가입 페이지? 데모 폼?) 결정 필요
3. **비교 테이블**: 포함할지 말지 확정 필요 (분량/복잡도 영향)
4. **분석 도구**: Google Analytics/Mixpanel 설정 필요

---

## Work Objectives

### Core Objective
"Code to Edge, Securely" 컨셉을 시각적으로 강렬하게 전달하고, 5가지 가치제안을 통해 방문자 → 유료 고객으로의 전환 유도하는 **최고 품질 마케팅 페이지** 구축

### Concrete Deliverables

1. **컴포넌트 라이브러리**
   - 7개 주요 섹션 컴포넌트 (Header, Hero, ValueCard, SocialProof, Comparison, CTA, Footer)
   - 재사용 가능한 기본 컴포넌트 (Button, Card, Icon, Badge)
   - Storybook 통합 (선택)

2. **스타일시트 & 테마**
   - Tailwind 커스텀 설정 (색상, 간격, 타이포그래피)
   - 글로벌 CSS (애니메이션, 기본 스타일)
   - 다크 모드 지원 (선택)

3. **SEO & 메타데이터**
   - robots.txt, sitemap.xml
   - 메타 태그 (title, description, og:*, twitter:*)
   - JSON-LD 구조화된 데이터 (Organization, Product, FAQPage)

4. **성능 최적화**
   - 이미지 최적화 (WebP, lazy-loading, next/image)
   - 코드 분할 (dynamic import)
   - 번들 크기 최소화

5. **배포 준비**
   - GitHub Actions CI/CD
   - 환경 설정 (.env 템플릿)
   - 배포 문서 (README.md)

### Definition of Done

- [ ] 모든 7개 섹션 컴포넌트가 구현되고 반응형 테스트 완료
- [ ] Lighthouse 점수: 성능 90+, 접근성 95+, SEO 100
- [ ] First Contentful Paint < 1.5s, Largest Contentful Paint < 2.5s
- [ ] 모든 CTA 버튼이 올바른 페이지로 링크
- [ ] SEO 메타 태그 및 구조화된 데이터 검증 완료
- [ ] 모바일 + 데스크톱 + 태블릿 해상도 모두 테스트 통과
- [ ] 타입 에러 없음 (`tsc --noEmit` 통과)
- [ ] 모든 이미지가 alt 태그 포함 (접근성)

### Must Have

- ✅ **Hero Section**: 헤드라인, 서브, 메인 CTA × 2, 배경 비주얼
- ✅ **5가지 가치제안 카드**: 각각 아이콘 + 제목 + 설명, 반응형 그리드
- ✅ **사회적 증명**: 통계 + 고객 로고 + 사용자 후기
- ✅ **최종 CTA**: 명확한 다음 단계 (가입/데모)
- ✅ **모바일 우선 반응형**: 모든 해상도에서 완벽한 레이아웃
- ✅ **성능**: Lighthouse 90+ (모든 Core Web Vitals 만족)
- ✅ **SEO**: 메타 태그 + 구조화된 데이터 + 키워드 타겟팅
- ✅ **접근성**: WCAG 2.1 AA 준수, 스크린 리더 지원

### Must NOT Have

- ❌ **기술 스펙 상세 설명**: 마케팅 페이지이지 문서 아님
- ❌ **경쟁사 명시 비난**: "Vercel은 느리다" 같은 표현 금지
- ❌ **과도한 애니메이션**: 로딩 방해, 접근성 문제 야기 가능
- ❌ **느린 로딩**: 이미지 최적화 없는 고해상도 사진 금지
- ❌ `as any`, `@ts-ignore` 타입 억제
- ❌ **모바일 무시**: 반응형 없이 데스크톱만 고려한 레이아웃
- ❌ **콘텐츠 누락**: 고객 로고/후기 등 사회적 증명 없이 발행
- ❌ **미준수된 CTA**: 링크 없거나 잘못된 URL로 가는 버튼

---

## Verification Strategy (MANDATORY)

### Test Decision

**기본 검증**:
```bash
npm run build           # 빌드 성공 여부
npm run type-check      # 타입 에러 없음
npm run lint            # 코드 스타일 준수
```

**성능 & SEO 검증**:
```bash
# 로컬에서 Lighthouse 실행 (선택)
npm run lighthouse
```

**수동 검증**:
- 브라우저 DevTools > 모바일 디바이스 에뮬레이션 테스트
- Google PageSpeed Insights 점수 확인
- 메타 태그 검증 (Open Graph Debugger)

### Evidence Convention

- 기본 경로: `.sisyphus/evidence/task-{N}-{slug}.{ext}`
- 예: `.sisyphus/evidence/task-01-hero-component.md` (스크린샷 + 체크리스트)
- 예: `.sisyphus/evidence/task-02-lighthouse.json` (점수 캡처)

### Agent-Executed QA Scenarios

#### Scenario 1: 컴포넌트별 렌더링 확인
```text
Tool: Playwright (또는 수동 브라우저 테스트)
Steps:
  1. localhost:3000 또는 배포된 URL 접속
  2. 각 섹션(Hero, Values, Social Proof, CTA, Footer) 스크롤 확인
  3. 모바일 해상도(375px), 태블릿(768px), 데스크톱(1440px)에서 레이아웃 검증
  4. 모든 이미지 로드 확인 (Network 탭에서 이미지 200 상태)
Expected Result: 모든 섹션이 올바르게 렌더링되고, 반응형 레이아웃이 깨지지 않음
Evidence: .sisyphus/evidence/task-01-rendering.png
```

#### Scenario 2: CTA 클릭 검증
```text
Tool: Playwright / Bash
Steps:
  1. 모든 CTA 버튼(지금 시작하기, 데모 보기, GitHub, Discord) 클릭
  2. 올바른 URL로 이동하는지 확인
  3. 외부 링크는 새탭에서 열리는지 확인
Expected Result: 모든 CTA가 올바른 목적지로 이동, 링크 오류 없음
Evidence: .sisyphus/evidence/task-02-cta-links.txt
```

#### Scenario 3: Lighthouse 성능 점수
```text
Tool: Google PageSpeed Insights API 또는 Lighthouse CLI
Steps:
  1. npm run build && npm run preview (또는 배포된 URL)
  2. Lighthouse 실행 (모바일 + 데스크톱)
  3. 성능(90+), 접근성(95+), SEO(100) 점수 확인
Expected Result: 모든 점수 기준 이상 달성
Evidence: .sisyphus/evidence/task-03-lighthouse-mobile.json, task-03-lighthouse-desktop.json
```

#### Scenario 4: SEO 메타 태그 검증
```text
Tool: HTML 소스 검사
Steps:
  1. 페이지 소스에서 <head> 태그 확인
  2. 메타 태그: title, description, og:*, twitter:* 존재 여부 확인
  3. robots.txt 및 sitemap.xml 존재 확인
  4. JSON-LD <script> 태그 유효성 검사 (schema.org)
Expected Result: 모든 메타 태그 및 구조화된 데이터 올바르게 설정
Evidence: .sisyphus/evidence/task-04-seo-meta.md
```

#### Scenario 5: 접근성 (a11y) 검증
```text
Tool: axe DevTools 또는 WAVE
Steps:
  1. axe 스캔 실행, 에러 확인
  2. 모든 이미지에 alt 태그 있는지 확인
  3. 모든 버튼에 접근 가능한 텍스트 있는지 확인
  4. 키보드 네비게이션 (Tab 키로 모든 CTA 도달 가능)
Expected Result: WCAG 2.1 AA 준수, 주요 에러 없음
Evidence: .sisyphus/evidence/task-05-accessibility.md
```

---

## Execution Strategy

### Parallel Execution Waves

**Wave 1: 기초 구축 (컴포넌트 스캐폴딩)**
- T1: 프로젝트 초기화 (Next.js/React 설정, Tailwind 통합)
- T2: 기본 컴포넌트 라이브러리 (Button, Card, Icon, Badge)
- T3: 레이아웃 컴포넌트 (Header, Hero, Footer 구조)

**Wave 2: 섹션별 개발 (병렬 가능)**
- T4: Hero Section 구현
- T5: 5가지 가치제안 카드 (ValuePropositions)
- T6: 사회적 증명 섹션 (SocialProof)
- T7: 비교 테이블 섹션 (선택)
- T8: 최종 CTA 섹션

**Wave 3: 스타일링 & 최적화**
- T9: 전체 스타일시트 통합 (색상, 간격, 애니메이션)
- T10: 이미지 최적화 (WebP, lazy-loading, next/image)
- T11: 다크 모드 지원 (선택)

**Wave 4: SEO & 성능**
- T12: SEO 메타 태그 및 구조화된 데이터 추가
- T13: Lighthouse 최적화 (번들 크기, 로딩 시간)
- T14: 접근성 (a11y) 감시

**Wave 5: 검증 & 배포**
- T15: 최종 QA (모든 시나리오 테스트)
- T16: 배포 준비 (CI/CD, 환경 설정)
- T17: 배포 & 모니터링

### Dependency Matrix

| Task | 설명 | Depends On | Blocks | Effort |
|------|------|-----------|--------|--------|
| T1 | 프로젝트 초기화 | - | T2, T3 | 2h |
| T2 | 기본 컴포넌트 | T1 | T3 | 4h |
| T3 | 레이아웃 구조 | T2 | T4~T8 | 3h |
| T4 | Hero Section | T3 | T9 | 5h |
| T5 | ValueProps 카드 | T3 | T9 | 5h |
| T6 | SocialProof | T3 | T9 | 4h |
| T7 | Comparison 테이블 | T3 | T9 | 3h |
| T8 | 최종 CTA | T3 | T9 | 2h |
| T9 | 스타일링 통합 | T4~T8 | T10 | 6h |
| T10 | 이미지 최적화 | T9 | T12 | 3h |
| T11 | 다크 모드 | T9 | T12 | 2h |
| T12 | SEO 메타 & LD-JSON | T10 | T13 | 3h |
| T13 | Lighthouse 최적화 | T12 | T14 | 4h |
| T14 | 접근성 검증 | T13 | T15 | 2h |
| T15 | 최종 QA | T14 | T16 | 4h |
| T16 | 배포 준비 | T15 | T17 | 2h |
| T17 | 배포 & 모니터링 | T16 | - | 2h |

**총 예상 시간**: 약 52시간

### Agent Dispatch Summary

- **컴포넌트 개발** (T2~T8): `visual-engineering` 카테고리 + `frontend-ui-ux` 스킬
  - 반복적인 UI 컴포넌트 작성, Tailwind CSS 활용
- **스타일링 & 애니메이션** (T9~T11): `visual-engineering` + `frontend-ui-ux`
  - 디자인 일관성, 반응형 레이아웃, 애니메이션
- **SEO & 성능 최적화** (T12~T14): `unspecified-high` 또는 `deep`
  - 기술적 깊이 필요, 최적화 조율
- **배포 & CI/CD** (T16~T17): `unspecified-high`
  - 인프라/배포 설정

---

## TODOs

### Wave 1: 기초 구축

- [ ] T1. 프로젝트 초기화

  **What to do**:
  - Next.js 프로젝트 생성 (또는 기존 프로젝트 재사용)
  - Tailwind CSS 설정 (`tailwind.config.ts`)
  - TypeScript 설정 (`tsconfig.json`)
  - 기본 폴더 구조 생성 (`app/`, `components/`, `styles/`)
  - Pretendard 폰트 가져오기 (Google Fonts 또는 로컬)

  **Must NOT do**:
  - 불필요한 의존성 추가 (UI 라이브러리 없이 커스텀)
  - 큰 이미지 파일 직접 커밋

  **Recommended Agent Profile**:
  - Category: `quick`
  - Skills: `[]`

  **Parallelization**:
  - Can Parallel: NO (선행 작업)
  - Wave: 1
  - Blocks: T2, T3
  - Blocked By: -

  **References**:
  - `/workspaces/1/78666/vercel-heroky-coolify-dokploy-onestack-onestack/product-description/design/_playground/tailwind.config.cjs` (기존 설정 참고)
  - `/workspaces/1/78666/vercel-heroky-coolify-dokploy-onestack-onestack/product-description/design/_playground/src/index.css` (폰트 정의)

  **Acceptance Criteria**:
  - [ ] Next.js 프로젝트가 `npm run dev`로 실행 가능
  - [ ] Tailwind CSS가 정상 작동
  - [ ] TypeScript 컴파일 에러 없음

  **QA Scenarios**:
  ```text
  Scenario: 초기 설정 확인
    Tool: Bash
    Steps: npm run dev 실행 후 localhost:3000 접속
    Expected Result: 기본 Next.js 페이지 로드, 콘솔 에러 없음
    Evidence: .sisyphus/evidence/task-01-project-init.md
  ```

  **Commit**: YES | Message: `feat: init onestack marketing homepage project with Next.js & Tailwind` | Files: `package.json, tsconfig.json, tailwind.config.ts, next.config.js`

---

- [ ] T2. 기본 컴포넌트 라이브러리

  **What to do**:
  - `components/ui/Button.tsx` (Primary, Secondary, Ghost 변종)
  - `components/ui/Card.tsx` (기본 카드 컴포넌트)
  - `components/ui/Icon.tsx` (SVG 아이콘 래퍼)
  - `components/ui/Badge.tsx` (태그/배지)
  - Storybook 설정 (선택사항)

  **Must NOT do**:
  - 외부 UI 라이브러리 (shadcn/ui, MUI 등) 금지, 커스텀만 사용
  - 불필요한 prop variants 추가

  **Recommended Agent Profile**:
  - Category: `visual-engineering`
  - Skills: `["frontend-ui-ux"]`

  **Parallelization**:
  - Can Parallel: NO (T1 완료 후)
  - Wave: 1
  - Blocks: T3
  - Blocked By: T1

  **References**:
  - `design/_playground/components/.examples/*.tsx` (패턴 참고)
  - `design/_playground/src/index.css` (스타일 참고)

  **Acceptance Criteria**:
  - [ ] 모든 기본 컴포넌트가 Tailwind로 구현됨
  - [ ] TypeScript 타입이 명확함 (Props 인터페이스 정의)
  - [ ] 반응형 변수 포함 (hover, focus, disabled 상태)

  **QA Scenarios**:
  ```text
  Scenario: 컴포넌트 렌더링
    Tool: Bash
    Steps: npm run dev, http://localhost:3000/components 접속
    Expected Result: 각 컴포넌트가 올바르게 렌더링됨
    Evidence: .sisyphus/evidence/task-02-components.png
  ```

  **Commit**: YES | Message: `feat: add reusable ui components (Button, Card, Icon, Badge)` | Files: `components/ui/*.tsx`

---

- [ ] T3. 레이아웃 컴포넌트 구조

  **What to do**:
  - `components/layout/Header.tsx` (네비게이션, 로고, CTA 버튼)
  - `components/layout/Hero.tsx` (배경, 헤드라인, 서브, 메인 CTA)
  - `components/layout/Footer.tsx` (링크, 소셜, 법률)
  - `app/layout.tsx` (전체 페이지 레이아웃)
  - `app/page.tsx` (메인 랜딩 페이지)

  **Must NOT do**:
  - 아직 실제 콘텐츠 추가 금지 (구조만)
  - 스타일링 X (Wave 3에서)

  **Recommended Agent Profile**:
  - Category: `visual-engineering`
  - Skills: `["frontend-ui-ux"]`

  **Parallelization**:
  - Can Parallel: NO (T2 완료 후)
  - Wave: 1
  - Blocks: T4~T8
  - Blocked By: T2

  **References**:
  - 02-requirements.md (섹션 정의)
  - 03-flow-and-ux.md (레이아웃 명세)

  **Acceptance Criteria**:
  - [ ] 7개 섹션 컴포넌트가 메인 페이지에 스택됨
  - [ ] 세맨틱 HTML 사용 (<header>, <main>, <section>, <footer>)
  - [ ] TypeScript 에러 없음

  **QA Scenarios**:
  ```text
  Scenario: 페이지 구조 확인
    Tool: Bash / HTML 검사
    Steps: npm run build, 생성된 HTML에서 섹션 구조 확인
    Expected Result: 모든 섹션이 올바른 순서로 있음
    Evidence: .sisyphus/evidence/task-03-layout-structure.md
  ```

  **Commit**: YES | Message: `feat: scaffold layout components (Header, Hero, Footer, main sections)` | Files: `components/layout/*.tsx, app/page.tsx`

---

### Wave 2: 섹션별 개발 (병렬 가능)

- [ ] T4. Hero Section 구현

  **What to do**:
  - 배경 이미지/그래픽 (코드 푸시 → 글로벌 배포 시각화)
  - 헤드라인: "Code to Edge, Securely"
  - 서브헤드라인: "복잡한 설정 없이 보안과 속도를 갖춘 차세대 배포"
  - 메인 CTA 버튼 2개: "지금 시작하기", "데모 보기"
  - 아래로 스크롤 지시자

  **Must NOT do**:
  - 과도한 애니메이션 (로딩 방해)
  - 느린 이미지 파일

  **Recommended Agent Profile**:
  - Category: `visual-engineering`
  - Skills: `["frontend-ui-ux"]`

  **Parallelization**:
  - Can Parallel: YES (T3 완료 후)
  - Wave: 2
  - Blocks: T9
  - Blocked By: T3

  **References**:
  - 02-requirements.md § 1.1 Hero Section
  - 03-flow-and-ux.md § 4.2 Hero Section

  **Acceptance Criteria**:
  - [ ] 헤드라인/서브 텍스트가 모바일/데스크톱에서 읽기 좋음
  - [ ] 배경 이미지가 최적화되어 있음 (< 500KB)
  - [ ] CTA 버튼이 명확하고 클릭하기 쉬움

  **QA Scenarios**:
  ```text
  Scenario: Hero 섹션 반응형 확인
    Tool: Playwright / 수동 브라우저
    Steps: 375px, 768px, 1440px 해상도에서 렌더링
    Expected Result: 모든 해상도에서 레이아웃이 깨지지 않음, 텍스트 읽기 쉬움
    Evidence: .sisyphus/evidence/task-04-hero-responsive.png
  ```

  **Commit**: YES | Message: `feat: implement Hero section with headline, subheading, and CTA buttons` | Files: `components/sections/Hero.tsx, public/images/hero-*`

---

- [ ] T5. 5가지 가치제안 카드 (ValuePropositions)

  **What to do**:
  - `components/sections/ValuePropositions.tsx` 컴포넌트
  - `components/ui/ValueCard.tsx` (개별 카드)
  - 5개 카드: Focus on Business, Security, Performance, Automation, Cost
  - 각 카드: 아이콘 + 제목 + 설명 + 호버 효과
  - 반응형 그리드 (데스크톱 2x3, 모바일 1x5)

  **Must NOT do**:
  - 과도한 정보 (3줄 이내로 제한)
  - 기술 스펙 상세 설명

  **Recommended Agent Profile**:
  - Category: `visual-engineering`
  - Skills: `["frontend-ui-ux"]`

  **Parallelization**:
  - Can Parallel: YES (T3 완료 후)
  - Wave: 2
  - Blocks: T9
  - Blocked By: T3

  **References**:
  - 01-product-brief.md § 2) 문제 정의 (5가지 가치)
  - 02-requirements.md § 1.2 5가지 핵심 가치제안 카드

  **Acceptance Criteria**:
  - [ ] 5개 카드가 모두 구현됨
  - [ ] 아이콘이 일관된 스타일 (SVG, 단색)
  - [ ] 호버 효과가 부드러움 (scale, shadow 등)

  **QA Scenarios**:
  ```text
  Scenario: ValueCard 렌더링 및 호버
    Tool: Playwright
    Steps: 각 카드에 마우스 호버, 효과 확인
    Expected Result: 호버 시 카드가 약간 떠오르거나 색상이 변함
    Evidence: .sisyphus/evidence/task-05-value-cards.gif
  ```

  **Commit**: YES | Message: `feat: add ValuePropositions section with 5 core value cards` | Files: `components/sections/ValuePropositions.tsx, components/ui/ValueCard.tsx`

---

- [ ] T6. 사회적 증명 섹션 (SocialProof)

  **What to do**:
  - `components/sections/SocialProof.tsx`
  - 통계 표시 (고객 수, 배포 건수, 별점)
  - 고객사 로고 5~8개 (그레이스케일, 호버 시 컬러)
  - 사용자 후기 슬라이더 (2~3개 후기)
  - 모바일 스택 레이아웃

  **Must NOT do**:
  - 실제 로고 없이 더미 데이터로 발행 금지
  - 거짓 통계

  **Recommended Agent Profile**:
  - Category: `visual-engineering`
  - Skills: `["frontend-ui-ux"]`

  **Parallelization**:
  - Can Parallel: YES (T3 완료 후)
  - Wave: 2
  - Blocks: T9
  - Blocked By: T3

  **References**:
  - 02-requirements.md § 1.3 사회적 증명

  **Acceptance Criteria**:
  - [ ] 고객 로고가 일관된 크기로 정렬됨
  - [ ] 통계가 가독성 좋게 표시됨 (큰 숫자 + 단위)
  - [ ] 후기 슬라이더가 부드럽게 작동 (자동 또는 화살표)

  **QA Scenarios**:
  ```text
  Scenario: 사회적 증명 섹션 로드
    Tool: Playwright
    Steps: 페이지 로드, 로고와 후기가 올바르게 표시되는지 확인
    Expected Result: 모든 요소가 로드됨, 슬라이더가 작동함
    Evidence: .sisyphus/evidence/task-06-social-proof.png
  ```

  **Commit**: YES | Message: `feat: add SocialProof section with stats, logos, and testimonials` | Files: `components/sections/SocialProof.tsx`

---

- [ ] T7. 비교 테이블 섹션 (선택)

  **What to do**:
  - `components/sections/ComparisonTable.tsx`
  - 표: 행(기능) × 열(Vercel, Heroku, Onestack)
  - ✅/❌/⭐ 표시
  - 반응형 모바일 뷰 (스택 레이아웃)

  **Must NOT do**:
  - 경쟁사 비난 (객관적 비교만)
  - 부정확한 정보

  **Recommended Agent Profile**:
  - Category: `visual-engineering`
  - Skills: `["frontend-ui-ux"]`

  **Parallelization**:
  - Can Parallel: YES (선택사항, 필요 시에만)
  - Wave: 2
  - Blocks: T9
  - Blocked By: T3

  **References**:
  - 02-requirements.md § 1.4 기능 비교 테이블
  - 배경 리서치: 경쟁사 분석 결과

  **Acceptance Criteria**:
  - [ ] 테이블이 데스크톱에서 한눈에 보임
  - [ ] 모바일에서 카드 형식으로 스택됨
  - [ ] 정보가 정확하고 공정함

  **QA Scenarios**:
  ```text
  Scenario: 비교 테이블 반응형
    Tool: Playwright
    Steps: 모바일(375px)과 데스크톱(1440px)에서 테이블 렌더링
    Expected Result: 레이아웃이 적절하게 변환됨
    Evidence: .sisyphus/evidence/task-07-comparison-table.png
  ```

  **Commit**: YES | Message: `feat: add ComparisonTable section (optional)` | Files: `components/sections/ComparisonTable.tsx`

---

- [ ] T8. 최종 CTA 섹션

  **What to do**:
  - `components/sections/CTASection.tsx`
  - 배경 색상 (Primary #136dec)
  - 큰 제목: "지금 배포 시작하기"
  - 메인 CTA 버튼
  - 세부 CTA 링크 (GitHub, Discord, 문서)

  **Must NOT do**:
  - 잘못된 링크

  **Recommended Agent Profile**:
  - Category: `visual-engineering`
  - Skills: `["frontend-ui-ux"]`

  **Parallelization**:
  - Can Parallel: YES (T3 완료 후)
  - Wave: 2
  - Blocks: T9
  - Blocked By: T3

  **References**:
  - 03-flow-and-ux.md § 4.6 최종 CTA 섹션

  **Acceptance Criteria**:
  - [ ] CTA 버튼이 명확하고 클릭하기 쉬움
  - [ ] 모든 링크가 올바른 URL로 이동
  - [ ] 모바일에서도 버튼이 손가락 크기

  **QA Scenarios**:
  ```text
  Scenario: CTA 링크 검증
    Tool: Bash / curl
    Steps: 모든 CTA 링크가 200 또는 302 상태 반환하는지 확인
    Expected Result: 모든 링크가 유효함
    Evidence: .sisyphus/evidence/task-08-cta-links.txt
  ```

  **Commit**: YES | Message: `feat: add final CTA section with primary button and secondary links` | Files: `components/sections/CTASection.tsx`

---

### Wave 3: 스타일링 & 최적화

- [ ] T9. 전체 스타일시트 통합

  **What to do**:
  - Tailwind CSS 커스텀 색상 정의 (primary, secondary, accent)
  - 글로벌 간격/그리드 설정
  - 타이포그래피 (폰트 크기, 선 높이)
  - 애니메이션 (fade-in, slide-up 등 부드러운 효과)
  - 다크 모드 지원 (선택)

  **Must NOT do**:
  - 인라인 스타일 (모든 Tailwind 클래스 사용)
  - 과도한 애니메이션

  **Recommended Agent Profile**:
  - Category: `visual-engineering`
  - Skills: `["frontend-ui-ux"]`

  **Parallelization**:
  - Can Parallel: NO (T4~T8 완료 후)
  - Wave: 3
  - Blocks: T10
  - Blocked By: T4, T5, T6, T7, T8

  **References**:
  - `design/_playground/tailwind.config.cjs` (기존 설정)
  - `design/_playground/src/index.css` (글로벌 스타일)

  **Acceptance Criteria**:
  - [ ] 모든 섹션이 시각적으로 일관성 있음
  - [ ] 색상이 #136dec 기반으로 조화로움
  - [ ] 애니메이션이 부드럽고 성능 방해 없음

  **QA Scenarios**:
  ```text
  Scenario: 스타일 일관성
    Tool: 수동 비주얼 검사
    Steps: 페이지 전체를 스크롤하면서 색상, 간격, 폰트 일관성 확인
    Expected Result: 모든 섹션이 일관된 디자인 언어 사용
    Evidence: .sisyphus/evidence/task-09-styling.png
  ```

  **Commit**: YES | Message: `style: integrate global styles and animations, finalize color palette` | Files: `tailwind.config.ts, styles/globals.css`

---

- [ ] T10. 이미지 최적화

  **What to do**:
  - WebP 형식 변환 (Hero 배경, 아이콘 SVG)
  - next/image 컴포넌트 사용
  - Lazy-loading 설정
  - srcset 반응형 이미지 설정
  - 이미지 압축 (TinyPNG, ImageOptim 등)

  **Must NOT do**:
  - 고해상도 이미지 그대로 사용
  - alt 태그 없이 이미지 삽입

  **Recommended Agent Profile**:
  - Category: `unspecified-high`
  - Skills: `[]`

  **Parallelization**:
  - Can Parallel: NO (T9 완료 후)
  - Wave: 3
  - Blocks: T12
  - Blocked By: T9

  **References**:
  - Next.js Image Documentation
  - 02-requirements.md § 2.2 성능 목표

  **Acceptance Criteria**:
  - [ ] 모든 이미지가 WebP 또는 최적화된 형식
  - [ ] next/image 컴포넌트 사용
  - [ ] Lighthouse 성능 점수 80+ (T13에서 90+으로 올림)

  **QA Scenarios**:
  ```text
  Scenario: 이미지 로딩 성능
    Tool: Network 탭 (DevTools)
    Steps: 페이지 로드, 이미지 크기와 로딩 시간 확인
    Expected Result: 각 이미지 < 200KB, 로딩 시간 < 1s
    Evidence: .sisyphus/evidence/task-10-image-optimization.png
  ```

  **Commit**: YES | Message: `perf: optimize images with WebP format and next/image component` | Files: `public/images/*, components/**` (image refs)

---

- [ ] T11. 다크 모드 지원 (선택)

  **What to do**:
  - Tailwind dark: 모드 활성화
  - 색상 변수 다크 버전 정의
  - 토글 버튼 (선택)
  - 시스템 선호도 자동 감지

  **Must NOT do**:
  - 다크 모드 없이 시작 (선택사항이지만 권장)

  **Recommended Agent Profile**:
  - Category: `visual-engineering`
  - Skills: `["frontend-ui-ux"]`

  **Parallelization**:
  - Can Parallel: YES (T9 완료 후, T10과 병렬 가능)
  - Wave: 3
  - Blocks: T12
  - Blocked By: T9

  **References**:
  - Tailwind CSS Dark Mode

  **Acceptance Criteria**:
  - [ ] 다크 모드가 시스템 선호도와 동기화
  - [ ] 모든 텍스트와 배경이 대비 충분

  **QA Scenarios**:
  ```text
  Scenario: 다크 모드 전환
    Tool: 수동 또는 브라우저 DevTools
    Steps: 다크 모드 토글, 모든 섹션이 올바르게 표시되는지 확인
    Expected Result: 모든 텍스트와 요소가 가독성 유지
    Evidence: .sisyphus/evidence/task-11-dark-mode.png
  ```

  **Commit**: YES | Message: `feat: add dark mode support with system preference detection` | Files: `tailwind.config.ts, styles/globals.css`

---

### Wave 4: SEO & 성능

- [ ] T12. SEO 메타 태그 및 구조화된 데이터

  **What to do**:
  - `next/head` 또는 `app/layout.tsx` 메타 태그 설정
  - 메타 태그: title, description, keywords, og:*, twitter:*
  - JSON-LD 구조화된 데이터 (Organization, Product, FAQPage)
  - robots.txt 생성
  - sitemap.xml 생성 (next-sitemap 라이브러리)
  - Open Graph 이미지 준비

  **Must NOT do**:
  - 키워드 스터핑
  - 잘못된 메타 정보

  **Recommended Agent Profile**:
  - Category: `unspecified-high`
  - Skills: `[]`

  **Parallelization**:
  - Can Parallel: NO (T10 완료 후)
  - Wave: 4
  - Blocks: T13
  - Blocked By: T10

  **References**:
  - 02-requirements.md § 2.3 SEO 요구사항
  - Next.js SEO Best Practices

  **Acceptance Criteria**:
  - [ ] 모든 메타 태그가 올바르게 설정
  - [ ] JSON-LD이 schema.org 유효성 검사 통과
  - [ ] robots.txt, sitemap.xml 존재

  **QA Scenarios**:
  ```text
  Scenario: SEO 메타 태그 검증
    Tool: Google Rich Results Test / Schema.org Validator
    Steps: 페이지 소스 메타 태그 확인, JSON-LD 유효성 검사
    Expected Result: 모든 메타 태그 올바름, 구조화된 데이터 유효
    Evidence: .sisyphus/evidence/task-12-seo-validation.png
  ```

  **Commit**: YES | Message: `feat: add SEO meta tags, OpenGraph, and JSON-LD structured data` | Files: `app/layout.tsx, public/robots.txt, public/sitemap.xml, lib/schema-generator.ts`

---

- [ ] T13. Lighthouse 성능 최적화

  **What to do**:
  - 번들 크기 최소화 (next/dynamic으로 코드 분할)
  - CSS-in-JS 최적화 (Tailwind purge 설정)
  - 폰트 로딩 최적화 (font-display: swap)
  - 써드파티 스크립트 지연 로딩 (Google Analytics 등)
  - Core Web Vitals 최적화 (LCP, FID, CLS)

  **Must NOT do**:
  - 기능 제거로 성능 확보 금지
  - 중요한 리소스 지연 로딩 금지

  **Recommended Agent Profile**:
  - Category: `unspecified-high`
  - Skills: `[]`

  **Parallelization**:
  - Can Parallel: NO (T12 완료 후)
  - Wave: 4
  - Blocks: T14
  - Blocked By: T12

  **References**:
  - 02-requirements.md § 2.2 성능 목표
  - Google PageSpeed Insights

  **Acceptance Criteria**:
  - [ ] Lighthouse 성능 점수 90+
  - [ ] First Contentful Paint (FCP) < 1.5s
  - [ ] Largest Contentful Paint (LCP) < 2.5s
  - [ ] Cumulative Layout Shift (CLS) < 0.1

  **QA Scenarios**:
  ```text
  Scenario: Lighthouse 성능 검사
    Tool: Google PageSpeed Insights 또는 Lighthouse CLI
    Steps: npm run build && npm run preview, Lighthouse 실행
    Expected Result: 성능 90+, 접근성 95+, SEO 100
    Evidence: .sisyphus/evidence/task-13-lighthouse.json
  ```

  **Commit**: YES | Message: `perf: optimize Lighthouse scores - code splitting, font loading, Core Web Vitals` | Files: `next.config.js, tsconfig.json, styles/globals.css`

---

- [ ] T14. 접근성 (a11y) 검증

  **What to do**:
  - axe DevTools 또는 WAVE로 스캔
  - 이미지 alt 태그 추가
  - 버튼/링크 접근 가능한 텍스트 확인
  - 키보드 네비게이션 (Tab 키 지원)
  - 색상 대비 검증 (WCAG AA 최소 4.5:1)
  - 스크린 리더 테스트

  **Must NOT do**:
  - 낮은 대비율의 색상 사용
  - 키보드 접근 불가능한 CTA

  **Recommended Agent Profile**:
  - Category: `unspecified-high`
  - Skills: `[]`

  **Parallelization**:
  - Can Parallel: NO (T13 완료 후)
  - Wave: 4
  - Blocks: T15
  - Blocked By: T13

  **References**:
  - 02-requirements.md § 2.4 접근성
  - WCAG 2.1 Guidelines

  **Acceptance Criteria**:
  - [ ] axe 스캔에서 주요 에러 없음
  - [ ] 모든 이미지에 alt 태그
  - [ ] 색상 대비 4.5:1 이상
  - [ ] 키보드 네비게이션 가능

  **QA Scenarios**:
  ```text
  Scenario: 접근성 스캔
    Tool: axe DevTools 또는 WAVE
    Steps: 페이지 스캔, 에러 및 경고 확인
    Expected Result: 주요 WCAG 2.1 AA 에러 없음
    Evidence: .sisyphus/evidence/task-14-accessibility.md
  ```

  **Commit**: YES | Message: `a11y: ensure WCAG 2.1 AA compliance with alt tags and keyboard navigation` | Files: `components/**/*.tsx`

---

### Wave 5: 검증 & 배포

- [ ] T15. 최종 QA

  **What to do**:
  - 크로스 브라우저 테스트 (Chrome, Firefox, Safari, Edge)
  - 크로스 디바이스 테스트 (모바일, 태블릿, 데스크톱)
  - 모든 CTA 링크 검증
  - 콘텐츠 오류 검토 (맞춤법, 날짜 등)
  - 최종 성능 확인 (npm run build)

  **Must NOT do**:
  - 타입 에러나 린트 에러 무시
  - 깨진 링크 발행

  **Recommended Agent Profile**:
  - Category: `unspecified-high`
  - Skills: `[]`

  **Parallelization**:
  - Can Parallel: NO (T14 완료 후)
  - Wave: 5
  - Blocks: T16
  - Blocked By: T14

  **References**:
  - 모든 QA Scenarios 합산

  **Acceptance Criteria**:
  - [ ] 모든 섹션이 올바르게 렌더링
  - [ ] 모든 링크가 유효
  - [ ] 타입/린트 에러 없음
  - [ ] 콘텐츠 오류 없음

  **QA Scenarios**:
  ```text
  Scenario: 최종 빌드 검증
    Tool: Bash
    Steps: npm run type-check && npm run lint && npm run build
    Expected Result: 모든 명령이 exit code 0으로 완료
    Evidence: .sisyphus/evidence/task-15-final-qa.log
  ```

  **Commit**: NO (이미 이전 커밋에 포함됨)

---

- [ ] T16. 배포 준비

  **What to do**:
  - `.env.example` 작성 (필요한 환경 변수 나열)
  - GitHub Actions CI/CD 설정 (`.github/workflows/deploy.yml`)
  - Deployment 문서 작성 (README.md에 배포 절차 추가)
  - 도메인/DNS 설정 지침
  - 모니터링 설정 (Sentry, Google Analytics 등)

  **Must NOT do**:
  - 민감한 정보(.env 실제 값) 커밋
  - 불완전한 배포 스크립트

  **Recommended Agent Profile**:
  - Category: `unspecified-high`
  - Skills: `[]`

  **Parallelization**:
  - Can Parallel: NO (T15 완료 후)
  - Wave: 5
  - Blocks: T17
  - Blocked By: T15

  **References**:
  - GitHub Actions 문서
  - Next.js Deployment

  **Acceptance Criteria**:
  - [ ] CI/CD 파이프라인 정의됨
  - [ ] 배포 문서 완성
  - [ ] 환경 변수 템플릿 준비

  **QA Scenarios**:
  ```text
  Scenario: CI/CD 파이프라인 테스트
    Tool: GitHub Actions
    Steps: 푸시 후 파이프라인 실행, 빌드 및 배포 성공 확인
    Expected Result: 파이프라인이 정상 작동
    Evidence: .sisyphus/evidence/task-16-cicd-success.log
  ```

  **Commit**: YES | Message: `ci: add GitHub Actions deployment pipeline and documentation` | Files: `.github/workflows/deploy.yml, .env.example, README.md`

---

- [ ] T17. 배포 & 모니터링

  **What to do**:
  - 프로덕션 배포 실행 (Onestack 플랫폼에)
  - 배포 후 smoke test (기본 기능 확인)
  - Google Analytics, Sentry 설정 및 모니터링
  - 성능 모니터링 (Core Web Vitals 추적)
  - 배포 후 문제 발생 시 대응 계획

  **Must NOT do**:
  - 미완성 상태로 배포

  **Recommended Agent Profile**:
  - Category: `unspecified-high`
  - Skills: `[]`

  **Parallelization**:
  - Can Parallel: NO (T16 완료 후)
  - Wave: 5
  - Blocks: -
  - Blocked By: T16

  **References**:
  - Onestack 배포 가이드
  - 모니터링 설정 문서

  **Acceptance Criteria**:
  - [ ] 사이트가 프로덕션에서 접근 가능
  - [ ] 모든 페이지 로드 가능 (200 상태)
  - [ ] 분석 도구가 이벤트 기록 중
  - [ ] 성능 메트릭 정상

  **QA Scenarios**:
  ```text
  Scenario: 배포 후 smoke test
    Tool: curl / Playwright
    Steps: 프로덕션 URL에서 주요 페이지 로드, 성능 메트릭 확인
    Expected Result: 모든 페이지가 200 상태, 분석 데이터 수집 중
    Evidence: .sisyphus/evidence/task-17-deployment-success.log
  ```

  **Commit**: YES | Message: `release: deploy Onestack marketing homepage to production` | Files: `.env.production` (기본 설정만)

---

## Commit Strategy

### Commit 규칙

- **원칙**: 각 Task 완료 시 의미 있는 단위로 커밋
- **메시지 형식**: `<type>: <description>` (Conventional Commits)
  - `feat`: 새 기능
  - `style`: CSS/스타일링 변경
  - `perf`: 성능 개선
  - `a11y`: 접근성 개선
  - `ci`: CI/CD 설정
  - `docs`: 문서 추가/수정
  - `refactor`: 코드 구조 개선
  - `fix`: 버그 수정

### 커밋 그룹 (권장)

```
Commit 1: feat: init project with Next.js, Tailwind, TypeScript
Commit 2: feat: add reusable UI components (Button, Card, Icon, Badge)
Commit 3: feat: scaffold layout and main page structure
Commit 4-8: feat: implement sections (Hero, ValueProps, SocialProof, etc.)
Commit 9: style: integrate global styles and finalize color palette
Commit 10: perf: optimize images with WebP and next/image
Commit 11: feat: add dark mode support
Commit 12: feat: add SEO meta tags and JSON-LD structured data
Commit 13: perf: optimize Lighthouse scores
Commit 14: a11y: ensure WCAG 2.1 AA compliance
Commit 15: ci: add GitHub Actions deployment pipeline
Commit 16: release: deploy homepage to production
```

---

## Success Criteria

### Verification Commands

```bash
# 타입 체크
npm run type-check

# 린트
npm run lint

# 빌드
npm run build

# Lighthouse (선택, 로컬 환경)
npm run lighthouse
```

### Final Checklist

- [ ] 모든 7개 섹션이 완성되고 반응형 테스트 통과
- [ ] Lighthouse: 성능 90+, 접근성 95+, SEO 100
- [ ] 타입/린트 에러 없음
- [ ] 모든 CTA 링크 유효
- [ ] SEO 메타 태그 및 구조화된 데이터 검증 완료
- [ ] 모바일 + 데스크톱 + 태블릿 크로스 브라우저 테스트 통과
- [ ] WCAG 2.1 AA 접근성 준수
- [ ] CI/CD 파이프라인 설정 완료
- [ ] 프로덕션 배포 성공
- [ ] 배포 후 모니터링 활성화 (분석, 에러 추적 등)
- [ ] 배포 문서 작성 완료

---

## 다음 단계 (Post-Deployment)

1. **성능 모니터링**: 배포 후 Core Web Vitals, 사용자 이탈률 추적
2. **A/B 테스팅**: CTA 메시지, 디자인 변형 테스트
3. **고객 피드백**: 초기 사용자 피드백 수집
4. **반복 개선**: 분석 데이터 기반 최적화

---

## 참고 문서

- `01-product-brief.md`: 제품 정의 및 목표
- `02-requirements.md`: 상세 요구사항
- `03-flow-and-ux.md`: 사용자 경험 플로우
- `00-competitive-and-policy-research.md`: 경쟁사 분석
- 기존 설정: `design/_playground/tailwind.config.cjs`, `design/_playground/src/index.css`
