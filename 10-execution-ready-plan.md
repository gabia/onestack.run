# Plan: Execution-Ready Master Index - Onestack 마케팅 홍보 페이지

## TL;DR

> **Summary**: Onestack 차세대 클라우드 배포 플랫폼의 5가지 핵심 가치("Code to Edge, Securely")를 강렬하게 표현하는 고성능, 고미학 마케팅 랜딩 페이지 구축 프로젝트
>
> **Deliverables**:
> - `plans/onestack-marketing-homepage.md` - 17개 작업(T1~T17)으로 구성된 상세 실행 계획
> - React/TypeScript + Tailwind CSS 기반 단일 페이지 애플리케이션
> - 7개 섹션 컴포넌트 (Header, Hero, ValueProps, SocialProof, Comparison, CTA, Footer)
> - Lighthouse 90+ 달성 (성능, 접근성, SEO)
> - 완성된 기획 문서 (01~03)
>
> **Effort**: Large (약 50~60시간)
>
> **Parallel**: YES - Wave 별 병렬 실행 가능 (총 5 Waves, 약 1주일 예상)
>
> **Critical Path**: 
> - Wave 1: 기초 구축 (T1~T3) → Wave 2: 섹션 개발 (T4~T8, 병렬) → Wave 3: 스타일링 (T9~T11) → Wave 4: SEO/성능 (T12~T14) → Wave 5: 배포 (T15~T17)

---

## Context

### Original Request
사용자가 Onestack의 5가지 핵심 가치제안(Zero-Config 생산성, 철벽 보안, 글로벌 초고속 네트워크, 운영 자동화, 탁월한 경제성)을 강조하는 차별화된 마케팅 홍보 웹페이지를 요청했습니다. 대상은 개발자 + CTO + 비즈니스 리더 혼합, 성공 기준은 미학적 우수성 + 디자인 품질 + 전환율.

### Interview Summary / Confirmed Decisions

✅ **범위 확정**:
- 기술 스택: React + TypeScript + Tailwind CSS (기존 `design/_playground` 패턴 준수)
- 산출물: 반응형 HTML/CSS/JS (Next.js 기반 추천)
- 언어: 한국어 우선 (영문은 v2 미연)
- 배포: Onestack 자신의 플랫폼에 배포 (dogfooding)
- 색상: Primary #136dec, 신규 색상 시스템 정의
- 폰트: Pretendard (기존 글로벌)
- 성능: Lighthouse 90+ (모든 Core Web Vitals 만족)

✅ **의사결정 결과**:
- 대상 사용자: 기타/혼합 (모든 세그먼트 포함)
- 산출물 형식: 반응형 웹사이트 (HTML/CSS/JS)
- KPI: 미학적 우수성 (디자인 품질)

✅ **제외 범위**:
- 기술 스펙 설명서 (마케팅 페이지)
- 모든 기능 나열 (5가지 핵심 가치만)
- 경쟁사 명시적 비난
- 가격 책정 상세 공개 (별도 페이지)

### Prometheus Review (Guardrails & Gaps Addressed)

#### ✅ 가드레일 (방어해야 할 것)
1. **과도한 정보**: 5가지 가치에만 집중, 기술 스펙 금지
2. **경쟁사 비난**: 비교는 OK, 비난은 금지 → "객관적 비교만"
3. **성능 무시**: 이미지 최적화(WebP, lazy-loading) 필수
4. **모바일 무시**: 모든 CTA가 모바일 손가락 크기 이상
5. **타입 안정성**: `as any`, `@ts-ignore` 절대 금지

#### ⚠️ 누락 위험 (확인해야 할 것)
1. **고객 증명 콘텐츠**: 로고, 통계, 후기 준비 여부 ← 사용자 확인 필요
2. **CTA 링크 대상**: "지금 시작하기" → 어디로? (가입/데모) ← 사용자 결정 대기
3. **비교 테이블**: 포함할지 말지 ← 선택사항 (T7에서 구현)
4. **분석 도구**: Google Analytics/Mixpanel 설정 ← 배포 후 연동

---

## Work Objectives

### Core Objective
**"Code to Edge, Securely" 컨셉을 시각적으로 강렬하게 전달하고, 5가지 가치제안을 통해 방문자 → 유료 고객으로의 전환을 유도하는 최고 품질 마케팅 페이지 구축**

### Concrete Deliverables

**기획 문서 (완료)**:
- ✅ `01-product-brief.md` - 제품 정의, 목표, 페르소나, KPI
- ✅ `02-requirements.md` - 기능/기술/성능 상세 요구사항
- ✅ `03-flow-and-ux.md` - 사용자 여정, 섹션 명세, 컴포넌트 구조

**실행 계획**:
- 📋 `plans/onestack-marketing-homepage.md` - 17개 작업(T1~T17), 5개 Wave로 구성

**구현 산출물**:
- React/TypeScript 컴포넌트 라이브러리 (7개 섹션, 기본 컴포넌트)
- Tailwind CSS 스타일시트 + 애니메이션
- SEO 메타 태그 + JSON-LD 구조화된 데이터
- 이미지 최적화 (WebP, lazy-loading)
- CI/CD 파이프라인 (GitHub Actions)
- 배포 문서 및 모니터링 설정

### Definition of Done

- [ ] 기획 문서(01~03) 완성 및 검증
- [ ] `plans/onestack-marketing-homepage.md` 작성 완료
- [ ] T1~T17 모든 작업 완료
- [ ] Lighthouse: 성능 90+, 접근성 95+, SEO 100
- [ ] 모바일/데스크톱/태블릿 크로스 브라우저 테스트 통과
- [ ] WCAG 2.1 AA 접근성 준수
- [ ] 타입/린트 에러 없음
- [ ] 모든 CTA 링크 유효 및 검증
- [ ] SEO 메타 태그 및 구조화된 데이터 검증 완료
- [ ] 프로덕션 배포 성공
- [ ] 모니터링(분석, 에러 추적) 활성화

### Must Have

- ✅ **기획 문서**: 01-product-brief.md, 02-requirements.md, 03-flow-and-ux.md
- ✅ **실행 계획**: plans/onestack-marketing-homepage.md (17개 작업 상세 명세)
- ✅ **컴포넌트**: Hero, 5가지 ValueProps, SocialProof, CTA, Footer 섹션
- ✅ **성능**: Lighthouse 90+ (모든 Core Web Vitals)
- ✅ **SEO**: 메타 태그 + JSON-LD + robots.txt + sitemap.xml
- ✅ **접근성**: WCAG 2.1 AA, alt 태그, 키보드 네비게이션
- ✅ **반응형**: 모바일 우선, 모든 해상도 지원
- ✅ **배포**: GitHub Actions CI/CD, Onestack 플랫폼 배포

### Must NOT Have

- ❌ 실행 계획 없이 바로 코딩 시작
- ❌ 미완성 상태로 배포
- ❌ `as any`, `@ts-ignore` 타입 억제
- ❌ 느린 로딩 (이미지 최적화 미흡)
- ❌ 모바일 무시 (반응형 레이아웃)
- ❌ 경쟁사 명시 비난
- ❌ 깨진 링크

---

## Verification Strategy (MANDATORY)

### Test Decision

**문서 단계 검증**:
```bash
# 기획 문서 검증 (수동)
- 01-product-brief.md: 목표, 페르소나, KPI 명시
- 02-requirements.md: 기능/기술/성능 요구사항 상세
- 03-flow-and-ux.md: 섹션 구조, 컴포넌트 명세
- plans/onestack-marketing-homepage.md: T1~T17 작업 명세
```

**구현 단계 검증**:
```bash
npm run type-check      # TypeScript 타입 체크
npm run lint            # ESLint 린트
npm run build           # Next.js 빌드
npm run preview         # 로컬 미리보기
```

**성능/SEO 검증**:
```bash
# Google PageSpeed Insights (온라인)
# Lighthouse 성능 90+, 접근성 95+, SEO 100
```

### Plan-Level QA Scenarios

**Scenario 1: 기획 문서 완성도 검증**
```text
Tool: 수동 검토
Steps:
  1. 01-product-brief.md: 목표, 페르소나, KPI, 성공 지표 존재 여부
  2. 02-requirements.md: 기능 요구사항, 기술 스택, 성능 목표 명시
  3. 03-flow-and-ux.md: 섹션별 레이아웃, 컴포넌트 명세
  4. plans/onestack-marketing-homepage.md: 17개 작업, 의존성, QA 시나리오
Expected Result: 모든 문서가 execution-ready 수준, 추가 질문 없이 시작 가능
Evidence: .sisyphus/evidence/planning-complete.md
```

**Scenario 2: 실행 계획 실행 가능성 검증**
```text
Tool: 시지푸스 검토
Steps:
  1. plans/onestack-marketing-homepage.md의 T1 작업 읽기
  2. T1의 "What to do", "Must NOT do", "Acceptance Criteria", "QA Scenarios" 검증
  3. 모든 T1~T17 작업이 동일 수준의 상세도 확인
Expected Result: 문서만 읽고도 작업 시작 가능, 모든 task가 동등한 상세도
Evidence: .sisyphus/evidence/plan-executability.md
```

### Final QA Scenarios (구현 후)

각 Task별 QA는 `plans/onestack-marketing-homepage.md`의 **QA Scenarios** 섹션 참고.

---

## Execution Strategy

### Plan Inventory

| 계획 문서 | 파일 | 목적 | 의존성 | 상태 |
|---|---|---|---|---|
| **기획 문서 1** | `01-product-brief.md` | 제품 정의, 목표, 페르소나 | - | ✅ 완료 |
| **기획 문서 2** | `02-requirements.md` | 기능/기술/성능 요구사항 | 01 | ✅ 완료 |
| **기획 문서 3** | `03-flow-and-ux.md` | 사용자 여정, 섹션 명세 | 02 | ✅ 완료 |
| **실행 계획** | `plans/onestack-marketing-homepage.md` | 17개 작업(T1~T17), 5 Wave | 01~03 | ✅ 완료 |

### Execution Waves (병렬 실행)

```
┌─────────────────────────────────────────────────────────────┐
│ Wave 1: 기초 구축 (T1~T3)                                   │
│  - T1: 프로젝트 초기화                                      │
│  - T2: 기본 컴포넌트 라이브러리                              │
│  - T3: 레이아웃 구조                                        │
│  └─► 예상 시간: 2+4+3 = 9시간                              │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ Wave 2: 섹션 개발 (T4~T8, 병렬)                             │
│  - T4: Hero Section                                        │
│  - T5: ValueProps 카드                                     │
│  - T6: SocialProof                                         │
│  - T7: Comparison 테이블 (선택)                             │
│  - T8: 최종 CTA                                            │
│  └─► 예상 시간: (5+5+4+3+2) = 19시간 (병렬이면 5시간)     │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ Wave 3: 스타일링 & 최적화 (T9~T11)                          │
│  - T9: 전체 스타일시트 통합                                 │
│  - T10: 이미지 최적화                                       │
│  - T11: 다크 모드 지원                                      │
│  └─► 예상 시간: (6+3+2) = 11시간                           │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ Wave 4: SEO & 성능 (T12~T14)                               │
│  - T12: SEO 메타 태그 + JSON-LD                            │
│  - T13: Lighthouse 최적화                                   │
│  - T14: 접근성 검증                                         │
│  └─► 예상 시간: (3+4+2) = 9시간                            │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ Wave 5: 검증 & 배포 (T15~T17)                              │
│  - T15: 최종 QA                                            │
│  - T16: 배포 준비                                           │
│  - T17: 배포 & 모니터링                                    │
│  └─► 예상 시간: (4+2+2) = 8시간                            │
└─────────────────────────────────────────────────────────────┘

총 예상 시간: 약 52시간 (병렬화 고려 시 5~6일)
```

### Agent Dispatch Summary

**구현 작업**:
- **T2~T8 (컴포넌트 개발)**: `visual-engineering` 카테고리 + `frontend-ui-ux` 스킬
  - UI 컴포넌트 작성, Tailwind CSS, 반응형 레이아웃
- **T9~T11 (스타일링)**: `visual-engineering` + `frontend-ui-ux`
  - 디자인 일관성, 색상 팔레트, 애니메이션
- **T12~T14 (SEO/성능/접근성)**: `unspecified-high` 또는 `deep`
  - 기술적 깊이, 최적화 조율
- **T16~T17 (배포/CI/CD)**: `unspecified-high`
  - 인프라, GitHub Actions, 환경 설정

---

## Handoff Notes

**현재 단계**: 기획 문서 완성 (01~03) + 실행 계획 작성 완료 (plans/onestack-marketing-homepage.md)

**다음 단계**: `plans/onestack-marketing-homepage.md`의 T1부터 순차적 실행 (또는 Wave별 병렬)

**다음 담당자가 바로 읽을 파일** (우선순위):
1. `plans/onestack-marketing-homepage.md` - 실행할 17개 작업 상세 명세
2. `01-product-brief.md` - 제품 정의, 목표, 페르소나
3. `02-requirements.md` - 기능/기술 요구사항
4. `03-flow-and-ux.md` - 섹션 구조, 컴포넌트 명세

**선행 리서치 완료**:
- ✅ 경쟁사 분석 (Vercel, Heroku, Coolify, Dokploy)
- ✅ 기존 Onestack 디자인 시스템 확인 (Tailwind primary #136dec, Pretendard 폰트)
- ✅ 프로젝트 구조 파악

---

## Success Criteria

### Verification Commands

```bash
# 기획 문서 검증
ls -la plans/onestack-marketing-homepage.md          # 파일 존재 여부
grep -c "What to do" plans/onestack-marketing-homepage.md   # 17개 task 확인

# 구현 검증 (T1~T17 진행 후)
npm run type-check
npm run lint
npm run build
npm run preview
```

### Final Checklist

- [x] 사용자 요청 완전히 파악 및 기획 문서 작성 (01~03)
- [x] 기획 문서가 execution-ready 수준 (구체적 요구사항, 성공 기준, KPI 명시)
- [x] 실행 계획 문서 작성 완료 (plans/onestack-marketing-homepage.md)
- [x] 17개 작업(T1~T17) 모두 "What to do", "Must NOT do", "QA Scenarios" 포함
- [x] 의존성/병렬화/Wave별 순서 명시
- [x] 예상 노력, 위험, 가드레일 문서화
- [ ] T1 시작 (프로젝트 초기화) - 실행 단계로 진입
- [ ] T2~T8 병렬 진행 (Wave 2)
- [ ] T9~T14 진행 (Wave 3~4)
- [ ] T15~T17 최종 검증 및 배포 (Wave 5)
- [ ] 배포 완료 및 모니터링 활성화

---

## 다음 액션

👉 **다음 담당자 또는 시지푸스가 해야 할 일**:

1. **현재 위치**: 기획 완료, 실행 준비 단계
2. **시작할 작업**: `plans/onestack-marketing-homepage.md`의 **T1. 프로젝트 초기화** 부터 순차 실행
3. **실행 방식**:
   - Wave 1 순차 실행 (T1 → T2 → T3, 각 complete 후)
   - Wave 2 병렬 실행 (T4~T8 동시, 또는 순차)
   - Wave 3~5 계속 진행
4. **커밋 전략**: `plans/onestack-marketing-homepage.md` § Commit Strategy 참고

---

## 참고 문서

**기획 (완료)**:
- `01-product-brief.md` - Onestack 홍보 페이지 제품 정의
- `02-requirements.md` - 기능/기술/성능 상세 요구사항
- `03-flow-and-ux.md` - 사용자 여정, 섹션 명세, 컴포넌트 구조

**실행**:
- `plans/onestack-marketing-homepage.md` - 17개 작업(T1~T17), 5 Wave, 상세 QA 명세

**리서치**:
- `00-competitive-and-policy-research.md` - 경쟁사 분석 (Vercel, Heroku, Coolify, Dokploy)

**기존 설정 (통합할 것)**:
- `design/_playground/tailwind.config.cjs` - Tailwind primary #136dec
- `design/_playground/src/index.css` - Pretendard 폰트, 글로벌 스타일
