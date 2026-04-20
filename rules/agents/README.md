# Agents Guide

이 폴더는 OpenCode/OhMyOpenCode 에이전트가 **product-description/** 산출물을 일관되게 만들도록 하는 지침 모음입니다.

## 핵심 워크플로우(요약)

1) **(필수) 리서치**: `product-description/00-competitive-and-policy-research.md` 업데이트
2) **플로우차트 초안**: Mermaid로 작성(예: `product-description/03-flow-and-ux.md`)
3) **실행 계획 정리**: 작업 규모에 따라 `product-description/plans/*.md`에 **execution-ready** plan을 1개 이상 만들고 `10-execution-ready-plan.md`에서 묶음
4) **리뷰/수정**: 기획자가 직관적으로 검토할 수 있게 질문/체크리스트 제공
5) **승인**: `shared/20_approval.md`에 append
6) **결정 로그**: `shared/30_decisions.md`에 append
7) **종료 직전 검증**: `npm run verify` 실행(맞춤법/mermaid/논리)

## 실행형 plan 문서 원칙

- `product-description/plans/*.md`는 회의 메모가 아니라 **즉시 실행 가능한 작업 계약서**여야 합니다.
- 문서 수는 고정 3개가 아니라 작업 복잡도에 따라 1개 또는 여러 개가 될 수 있습니다.
- 최소 섹션:
  - `TL;DR`
  - `Context`
  - `Work Objectives`
  - `Verification Strategy`
  - `Execution Strategy`
  - `TODOs`
  - `Success Criteria`
- 각 TODO는 최소한 아래를 포함합니다.
  - `What to do`
  - `Must NOT do`
  - `References`
  - `Acceptance Criteria`

## 용어집(Glossary) 작성 규칙 요약

- 영문 병기는 **필수 아님** (팀 합의 표기 우선)
- 어려운 용어는 **정의(Definition)를 길게** 써서 맥락/예시/경계를 명확히 한다
- 상세 규칙/양식: `product-description/shared/40_glossary.md`

## 에이전트 문서

- `plan.md`: 작업 분해 + 게이트 강제
- `explore.md`: 로컬 탐색
- `librarian.md`: 웹 리서치
- `oracle.md`: 설계 검토(읽기 전용)
- `plana-opencode-contract.md`: Plana↔OpenCode tool/runtime/config 계약 기준
