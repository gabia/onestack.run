# Plan: Example Phase 01 — Discovery & Definition

## TL;DR
> **Summary**: 도메인/정책/요구사항을 정리해 이후 phase가 가정 없이 진행되도록 만든다.
> **Deliverables**:
> - 리서치/브리프/요구사항/정책 문서 정합성 확보
> - unresolved 질문/가정 제거
> - 후속 phase의 scope guardrails 확정
> **Effort**: Medium
> **Parallel**: Partial
> **Critical Path**: 리서치 정리 → 범위 확정 → 오픈 질문 제거
>
> **Note**: 이 문서는 예시 phase 문서다. 실제 프로젝트에서는 이 문서 하나만 쓰거나, 여러 개의 다른 이름 plan으로 재구성할 수 있다.

---

## Context

### Original Request
- <이 phase가 해결해야 할 사용자 요청/문제>

### Interview Summary / Confirmed Decisions
- <핵심 사용자>
- <핵심 범위>
- <핵심 정책/권한/보관 전제>

### Prometheus Review (Guardrails & Gaps Addressed)
- 리서치가 템플릿 상태거나 현재 도메인과 불일치하면 먼저 갱신한다.
- 00/01/02/04 문서 간 용어/정책 모순을 남긴 채 다음 phase로 넘기지 않는다.

---

## Work Objectives

### Core Objective
- 다음 phase가 추정 없이 시작되도록 범위/정책/가정을 확정한다.

### Concrete Deliverables
- `00-competitive-and-policy-research.md` 최신화
- `01-product-brief.md`, `02-requirements.md`, `04-data-and-policy.md` 정합성 정리
- `shared/30_decisions.md`, `shared/risk.md` 최신 반영

### Definition of Done
- [ ] 리서치와 현재 프로젝트 도메인이 일치한다.
- [ ] 오픈 질문/가정이 우선순위와 함께 정리됐다.
- [ ] 후속 phase에 필요한 제약조건이 문서화됐다.

### Must Have
- 한국/해외 정책 패턴 근거
- scope / non-goal / 권한 경계 명시
- 결정/리스크 로그 반영

### Must NOT Have
- 추정만으로 정책/권한 규칙 확정 금지
- 로그 없이 중요한 결정 반영 금지
- unresolved blocker를 숨긴 채 다음 phase 진행 금지

---

## Verification Strategy (MANDATORY)

### Test Decision
- 문서 정합성 검토 + `npm run verify`

### Agent-Executed QA Scenarios

Scenario: Research and policy docs align
  Tool: Document cross-check
  Steps:
    1. `00`, `01`, `02`, `04`를 비교한다
    2. 사용자/권한/데이터 처리 정의가 충돌하는지 확인한다
  Expected Result: 심각한 모순 없이 같은 범위를 설명한다

Scenario: Decision and risk logs reflect new constraints
  Tool: File review
  Steps:
    1. 최신 결정/리스크가 `shared/30_decisions.md`, `shared/risk.md`에 append 되었는지 확인한다
  Expected Result: 왜 그렇게 정리했는지가 로그에 남아 있다

---

## Execution Strategy

### Parallel Execution Waves
- Wave 1: 리서치/정책 사실 확인
- Wave 2: 범위/요구사항/가정 정리
- Wave 3: 결정/리스크 로그 업데이트 및 handoff

### Dependency Matrix
- 리서치 정리는 범위 확정을 block 한다
- 범위 확정은 설계 phase를 block 한다

---

## TODOs

> 실제 집행용 문서로 사용할 때는 각 TODO에 `Recommended Agent Profile`, `Parallelization`, `QA Scenarios`, `Commit`까지 추가해 `plans/plan-template.md` 수준으로 채운다.

- [ ] 1. 리서치와 현재 도메인을 맞춘다

  **What to do**:
  - 현재 서비스 도메인/대상 사용자/정책 전제를 확인한다
  - `00-competitive-and-policy-research.md`가 현재 주제와 어긋나면 갱신한다

  **Must NOT do**:
  - 과거 다른 프로젝트 리서치를 그대로 재사용하지 않는다

  **References**:
  - `00-competitive-and-policy-research.md`
  - `01-product-brief.md`

  **Acceptance Criteria**:
  - [ ] 현재 프로젝트의 도메인과 리서치 문서가 일치한다
  - [ ] 정책 최소 요건 체크리스트가 존재한다

- [ ] 2. 범위/질문/가정을 정리한다

  **What to do**:
  - `01`, `02`, `04`를 기준으로 포함 범위/비범위/권한 경계를 정리한다
  - unresolved 질문과 가정을 우선순위와 함께 남긴다

  **Must NOT do**:
  - 다음 phase의 구현 세부사항으로 prematurely 들어가지 않는다

  **References**:
  - `01-product-brief.md`
  - `02-requirements.md`
  - `04-data-and-policy.md`

  **Acceptance Criteria**:
  - [ ] 후속 phase가 참고할 범위/비범위가 정리돼 있다
  - [ ] blocker 질문이 숨겨지지 않았다

- [ ] 3. 결정/리스크를 로그에 반영한다

  **What to do**:
  - 핵심 제약/결정을 `shared/30_decisions.md`, `shared/risk.md`에 append 한다

  **Must NOT do**:
  - 결정 근거 없이 결론만 남기지 않는다

  **References**:
  - `shared/30_decisions.md`
  - `shared/risk.md`

  **Acceptance Criteria**:
  - [ ] 배경/대안/근거/영향이 로그에 남아 있다

---

## Success Criteria

### Verification Commands
```bash
npm run verify
```

### Final Checklist
- [ ] 범위/정책/가정이 정리됐다.
- [ ] 다음 phase가 질문 없이 시작 가능하다.
- [ ] 결정/리스크 로그가 최신이다.
