# Plan: <Execution-Ready Work Stream or Phase Name>

## TL;DR
> **Summary**: <이 plan이 해결하는 핵심>
> **Deliverables**:
> - <핵심 산출물 1>
> - <핵심 산출물 2>
> **Effort**: <Small | Medium | Large>
> **Parallel**: <YES/NO + 이유>
> **Critical Path**: <선행 순서>

---

## Context

### Original Request
- <원 요청>

### Confirmed Decisions
- <확정된 범위/정책/제약>

### Metis / Oracle Review (Guardrails & Gaps Addressed)
- <이 plan이 막아야 하는 오해/누락/가드레일>

---

## Work Objectives

### Core Objective
- <가장 중요한 목적>

### Concrete Deliverables
- <산출물 목록>

### Definition of Done
- [ ] <검증 가능한 완료 조건>

### Must Have
- <반드시 포함>

### Must NOT Have
- <절대 하면 안 되는 것>

---

## Verification Strategy (MANDATORY)

### Test Decision
- <어떤 검증을 쓸지>

### Evidence Convention
- 기본 경로: `.sisyphus/evidence/task-{N}-{slug}.{ext}`

### Agent-Executed QA Scenarios

Scenario: <시나리오 이름>
  Tool: <Bash / Playwright / Review>
  Steps:
    1. <step>
    2. <step>
  Expected Result: <기대 결과>
  Evidence: `.sisyphus/evidence/task-{N}-{slug}.{ext}`

---

## Execution Strategy

### Parallel Execution Waves
- Wave 1: <작업 묶음>
- Wave 2: <작업 묶음>

### Dependency Matrix
| Task | Depends On | Blocks |
|---|---|---|
| T1 | - | T2 |
| T2 | T1 | Final |

### Agent Dispatch Summary
- <어떤 category/skill이 적합한지>

---

## TODOs

- [ ] 1. <작업 이름>

  **What to do**:
  - <구체 작업>

  **Must NOT do**:
  - <금지 사항>

  **Recommended Agent Profile**:
  - Category: `<category>`
  - Skills: `[<skill>]`

  **Parallelization**:
  - Can Parallel: `<YES/NO>`
  - Wave: `<Wave N>`
  - Blocks: `<task ids or none>`
  - Blocked By: `<task ids or none>`

  **References**:
  - `<file/path>`

  **Acceptance Criteria**:
  - [ ] <검증 가능한 완료 조건>

  **QA Scenarios**:
  ```text
  Scenario: <task-level scenario>
    Tool: <Bash / Playwright / Review>
    Steps: <step summary>
    Expected Result: <expected>
    Evidence: .sisyphus/evidence/task-{N}-{slug}.{ext}
  ```

  **Commit**: `<YES/NO>` | Message: `<conventional commit message>` | Files: `<files>`

---

## Commit Strategy
- <필요한 경우 commit 묶음 전략>

## Success Criteria

### Verification Commands
```bash
npm run verify
```

### Final Checklist
- [ ] <최종 확인 항목>
