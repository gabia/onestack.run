# Plan: Example Phase 03 — Build, Launch & Operations Readiness

## TL;DR
> **Summary**: 실제 구현/출시/운영 전환 전에 필요한 최종 실행/검증/운영 준비를 정리한다.
> **Deliverables**:
> - 구현 완료/릴리즈 게이트
> - 운영/롤백/모니터링 준비
> - 최종 검증 명령과 체크리스트
> **Effort**: Medium
> **Parallel**: Partial
> **Critical Path**: 구현 완료 → 최종 검증 → 운영 handoff
>
> **Note**: 이 문서는 예시 phase 문서다. 실제 프로젝트에서는 이 문서 하나만 쓰거나, 여러 개의 다른 이름 plan으로 재구성할 수 있다.

---

## Context

### Original Request
- <릴리즈/운영 준비까지 포함된 요구사항>

### Confirmed Decisions
- <운영 owner / 배포 범위 / 리스크 허용치>

### Prometheus Review (Guardrails & Gaps Addressed)
- 구현 완료와 운영 준비를 분리해서 확인한다.
- 검증 실패 조건/롤백 기준이 없는 plan은 execution-ready가 아니다.

---

## Work Objectives

### Core Objective
- 출시 전 검증과 운영 전환을 시지푸스가 바로 수행 가능한 수준으로 정리한다.

### Concrete Deliverables
- launch checklist
- rollback / monitoring / handoff 메모
- 최종 verification commands

### Definition of Done
- [ ] 출시 전 체크리스트가 채워져 있다.
- [ ] 운영 owner / 모니터링 포인트 / 롤백 기준이 있다.
- [ ] 최종 검증 경로가 명확하다.

### Must Have
- 운영 담당자와 첫 주 모니터링 포인트
- 실패 시 롤백 기준
- 배포 전 검증 명령

### Must NOT Have
- 운영 책임자 없이 출시 준비 완료 처리 금지
- 리스크/롤백 기준 없이 출시 승인 금지

---

## Verification Strategy (MANDATORY)

### Test Decision
- `npm run verify`
- 필요 시 `npm run verify:all`
- 운영/배포 smoke는 환경에 맞게 추가

### Agent-Executed QA Scenarios

Scenario: Release checklist is complete
  Tool: Plan review
  Steps:
    1. launch checklist 항목이 모두 채워졌는지 확인한다
  Expected Result: 비어 있는 필수 항목이 없다

Scenario: Rollback and owner are explicit
  Tool: Document review
  Steps:
    1. 운영 owner, 모니터링 포인트, 롤백 기준을 확인한다
  Expected Result: 장애 시 누가 무엇을 볼지 즉시 알 수 있다

---

## Execution Strategy

### Parallel Execution Waves
- Wave 1: 구현 완료 상태 수집
- Wave 2: 검증/릴리즈 게이트 수행
- Wave 3: 운영 handoff / 모니터링 준비

### Dependency Matrix
- 구현 상태 확인이 검증을 block 한다
- 검증 완료가 릴리즈 승인/운영 handoff를 block 한다

---

## TODOs

> 실제 집행용 문서로 사용할 때는 각 TODO에 `Recommended Agent Profile`, `Parallelization`, `QA Scenarios`, `Commit`까지 추가해 `plans/plan-template.md` 수준으로 채운다.

- [ ] 1. 구현 완료 상태와 남은 리스크를 정리한다

  **What to do**:
  - 남은 이슈, known limitation, open risk를 정리한다

  **Must NOT do**:
  - 미해결 리스크를 숨긴 채 출시 준비 완료 처리하지 않는다

  **References**:
  - `shared/risk.md`
  - 관련 구현/운영 문서

  **Acceptance Criteria**:
  - [ ] open risk가 명시돼 있다

- [ ] 2. 최종 검증을 정의하고 실행 준비를 한다

  **What to do**:
  - build/test/docs verification 명령을 정리한다
  - 환경 의존 smoke가 있으면 같이 적는다

  **Must NOT do**:
  - “테스트 필요” 같은 추상 표현만 남기지 않는다

  **References**:
  - `package.json`
  - deployment/runbook 문서

  **Acceptance Criteria**:
  - [ ] 최종 검증 명령이 구체적이다
  - [ ] 통과 기준이 있다

- [ ] 3. 운영 handoff를 준비한다

  **What to do**:
  - 운영 owner, 첫 주 모니터링 포인트, 장애 시 확인 문서를 적는다

  **Must NOT do**:
  - owner 없는 handoff 문서를 만들지 않는다

  **References**:
  - `10-execution-ready-plan.md`
  - 운영/runbook 관련 문서

  **Acceptance Criteria**:
  - [ ] 운영 owner와 first-response 문서가 명시돼 있다

---

## Success Criteria

### Verification Commands
```bash
npm run verify
```

### Final Checklist
- [ ] 출시 전 체크리스트가 채워졌다.
- [ ] 운영 owner / 롤백 기준 / 모니터링 포인트가 있다.
- [ ] handoff 후 바로 운영이 가능하다.
