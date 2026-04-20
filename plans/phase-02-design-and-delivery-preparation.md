# Plan: Example Phase 02 — Design & Delivery Preparation

## TL;DR
> **Summary**: Phase 01에서 확정한 범위를 실행 단위와 검증 가능한 작업으로 분해한다.
> **Deliverables**:
> - UX/플로우/구현 작업 단위 분해
> - 병렬 실행 wave와 dependency matrix
> - 시지푸스가 바로 집행 가능한 TODO blocks
> **Effort**: Large
> **Parallel**: YES - multiple waves
> **Critical Path**: 플로우 확정 → 작업 단위 분해 → 검증 전략 수립
>
> **Note**: 이 문서는 예시 phase 문서다. 실제 프로젝트에서는 이 문서 하나만 쓰거나, 여러 개의 다른 이름 plan으로 재구성할 수 있다.

---

## Context

### Original Request
- <이 phase가 실제로 배달 준비해야 하는 범위>

### Confirmed Decisions
- <UX/기능/API/운영 방향>
- <이번 phase에서 반드시 지킬 제약>

### Prometheus Review (Guardrails & Gaps Addressed)
- TODO는 구현과 검증을 분리하지 않는다.
- 각 task는 `What to do`, `Must NOT do`, `References`, `Acceptance Criteria`, `QA Scenarios`를 가져야 한다.
- wave는 병렬화 이점을 설명할 수 있을 때만 병렬로 나눈다.

---

## Work Objectives

### Core Objective
- 설계/구현/운영 준비 작업을 execution-ready block으로 분해한다.

### Concrete Deliverables
- `03-flow-and-ux.md` 기준 실행 단위 정리
- dependency matrix
- QA / verification command / evidence plan

### Definition of Done
- [ ] 각 task가 독립 실행 가능한 block으로 정리됐다.
- [ ] 병렬 가능/불가능 이유가 있다.
- [ ] downstream 구현 phase가 바로 시작 가능하다.

### Must Have
- 사용자 플로우 기준 작업 단위 분해
- 검증 가능한 acceptance criteria
- 참고할 코드/문서 경로

### Must NOT Have
- “UI 수정”, “백엔드 작업” 같은 모호한 TODO 금지
- 검증 없는 task 금지
- 의존성 누락 금지

---

## Verification Strategy (MANDATORY)

### Test Decision
- 설계 점검 + 예상 검증 명령 사전 정의

### Agent-Executed QA Scenarios

Scenario: Every task is executable without extra interview
  Tool: Plan review
  Steps:
    1. 각 TODO block이 `What to do`, `Must NOT do`, `References`, `Acceptance Criteria`를 갖는지 확인한다
  Expected Result: task 단독으로도 집행 가능하다

Scenario: Dependency order is coherent
  Tool: Plan review
  Steps:
    1. dependency matrix와 wave 순서를 비교한다
  Expected Result: blocked-by / blocks 관계에 모순이 없다

---

## Execution Strategy

### Parallel Execution Waves
- Wave 1: 설계 계약/데이터 계약/권한 계약 정리
- Wave 2: 화면/API/운영 작업 단위 분해
- Wave 3: 테스트/검증/릴리즈 조건 정리

### Dependency Matrix
| Task | Depends On | Blocks |
|---|---|---|
| T1 | - | T2, T3, T4 |
| T2 | T1 | T4 |
| T3 | T1 | T4 |
| T4 | T2, T3 | Final execution |

### Agent Dispatch Summary
- 설계/구조 → `deep`, `unspecified-high`
- UI 중심 작업 → `visual-engineering`
- 문서 정리 → `writing`

---

## TODOs

> 실제 집행용 문서로 사용할 때는 각 TODO에 `Recommended Agent Profile`, `Parallelization`, `QA Scenarios`, `Commit`까지 추가해 `plans/plan-template.md` 수준으로 채운다.

- [ ] 1. 실행 단위와 계약을 정의한다

  **What to do**:
  - 플로우/요구사항을 기준으로 화면, API, 문서, 운영 작업 단위를 식별한다
  - 각 작업의 입력/출력/완료 기준을 적는다

  **Must NOT do**:
  - 구현 방법을 정하지 않은 상태에서 task를 너무 크게 묶지 않는다

  **References**:
  - `02-requirements.md`
  - `03-flow-and-ux.md`
  - `10-execution-ready-plan.md`

  **Acceptance Criteria**:
  - [ ] 작업 단위가 서로 다른 책임으로 분리돼 있다
  - [ ] 각 단위의 완료 기준이 있다

- [ ] 2. 병렬화와 의존성을 설계한다

  **What to do**:
  - 어떤 작업이 선행되어야 하는지 정리한다
  - 병렬 가능 작업은 wave로 묶는다

  **Must NOT do**:
  - dependency 없이 “병렬 가능”이라고만 쓰지 않는다

  **References**:
  - phase 내 TODO 목록

  **Acceptance Criteria**:
  - [ ] dependency matrix가 있다
  - [ ] critical path가 설명된다

- [ ] 3. 검증 전략을 작업에 연결한다

  **What to do**:
  - task마다 예상 verification command / QA scenario를 정의한다

  **Must NOT do**:
  - 최종 phase에만 검증을 몰아넣지 않는다

  **References**:
  - `package.json`
  - 관련 테스트/빌드 명령

  **Acceptance Criteria**:
  - [ ] 각 task에 검증 관점이 있다
  - [ ] 최종 실행자가 검증 방법을 바로 안다

---

## Success Criteria

### Verification Commands
```bash
npm run verify
```

### Final Checklist
- [ ] TODO block이 execution-ready다.
- [ ] wave / dependency / critical path가 있다.
- [ ] 검증 전략이 각 task와 연결돼 있다.
