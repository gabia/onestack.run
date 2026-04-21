# onestack.run

`onestack.run` 저장소는 두 가지 축으로 구성됩니다.

1. `Plana`(사내 자동 기획 앱)가 생성한 기획 산출물과 정적 웹 결과물
2. 별도 참고 및 업로드용으로 보관한 `Dokploy v0.29.1` 원본 소스

## Repository Structure

### 1) Plana 생성 산출물

아래 디렉터리와 문서들은 `Plana`가 생성한 기획/설계 자산입니다.

- `design/`
- `plans/`
- `rules/`
- `shared/`
- 루트의 `*.md` 문서들

이 산출물을 바탕으로 현재 정적 결과물이 생성되었습니다.

- `index.html`
- `script.js`
- `styles.css`

즉, 현재 루트의 정적 페이지는 사람이 직접 처음부터 손코딩한 결과라기보다, `Plana`의 기획 결과를 바탕으로 생성된 산출물입니다.

## 2) Dokploy Source Snapshot

`dokploy-v0.29.1/` 디렉터리는 Dokploy의 해당 버전을 그대로 클론한 뒤 이 저장소 안에 업로드해 둔 소스입니다.

- 이 디렉터리는 `onestack.run` 정적 페이지 생성 산출물과는 별개의 원본 소스 보관 영역입니다.
- 필요 시 Dokploy 특정 버전의 구조, 구현, 설정을 참고하거나 같이 관리하기 위한 목적입니다.
- 루트의 `index.html`, `script.js`, `styles.css`를 이 디렉터리에서 직접 빌드한 것은 아닙니다.

## Top-Level Files

루트에는 Plana가 생성한 주요 문서가 포함되어 있습니다.

- `00-competitive-and-policy-research.md`
- `01-product-brief.md`
- `02-requirements.md`
- `03-flow-and-ux.md`
- `04-data-and-policy.md`
- `10-execution-ready-plan.md`
- `90-intake-questionnaire.txt`

이 문서들은 서비스 방향, 요구사항, UX 흐름, 운영 규칙, 실행 계획을 담고 있으며 정적 페이지 제작의 입력 문서 역할을 합니다.

## Working Assumption

이 저장소를 다룰 때는 아래 기준으로 이해하면 됩니다.

- 루트 정적 파일: `Plana` 결과물
- 기획용 폴더와 문서: `Plana` 산출물
- `dokploy-v0.29.1/`: 업스트림 Dokploy 원본 소스 스냅샷

## Notes

- `dokploy-v0.29.1/` 내부 문서는 해당 프로젝트 원본 문서입니다.
- 이 저장소의 루트 `README.md`는 `onestack.run` 저장소 구조를 설명하는 문서이며, Dokploy 자체 설명서는 아닙니다.
