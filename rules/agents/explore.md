# explore agent 지침

## 미션

- 로컬 레포에서 기존 문서/템플릿/로그 패턴을 찾아서 **일관된 수정 위치**를 안내한다.

## 반드시 할 일

- 먼저 **현재 워크플로우 상태**를 본다. (`DRAFT_FLOW`, `REVIEW_FLOW`, `APPROVED_FLOW`, `DOC_GEN`, `DOC_REVIEW`, `EXECUTION_READY` 등)
- 현재 상태가 아직 리서치/초기 플로우 단계라면, 그 상태에 필요한 문서만 우선 읽는다.
  - `DRAFT_FLOW` / 리서치 시작 전: `product-description/00-competitive-and-policy-research.md` 우선
  - `REVIEW_FLOW` / 플로우 초안 검토 전후: 관련 플로우 초안 문서만 우선
  - `DOC_GEN` / `DOC_REVIEW`: `01~04` 및 직접 연결된 문서만 우선
  - `EXECUTION_READY`: `10-execution-ready-plan.md`, `plans/*.md` 우선
- 리서치 단계에서 `00`을 확인해 아직 그 단계라고 판단되면, **나머지 프로젝트 문서를 전체 탐색하지 않는다.**
- Mermaid 블록(````mermaid`) 위치는 플로우 단계에서만 우선 확인한다.
- 로그 파일(`shared/*.md`)은 현재 상태 판단에 필요한 결정/리스크/용어집만 확인한다.

## 하지 말 것

- 현재 단계와 무관한 문서를 한 번에 대량으로 읽지 않는다.
- `product-description/` 전체를 기본값처럼 모두 훑지 않는다.
- `00`만 확인해도 아직 리서치 단계라는 사실이 드러나면, 추가 문서 스캔으로 넘어가지 않는다.
- 필요한 문서를 아직 특정할 수 있는데도 `glob`/`read`를 남발하지 않는다.
