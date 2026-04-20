# 프로젝트 버전관리 / 커밋 규칙

이 섹션은 레포지토리에서 자동 스냅샷(자동 커밋), 수동 커밋(개발자/사용자), 승인/병합 커밋 템플릿과 관련 운영 정책을 정의합니다.

주의: 구현(코드)은 `lib/git-versioning.ts`에 정의된 상수/함수(COMMIT_TEMPLATES, VERSION_ALLOWLIST, GIT_AUTHOR, validateCommitMessage)를 따릅니다. 문서화된 템플릿은 코드와 일치해야 합니다.

1) 템플릿(예시)
  - 자동 스냅샷 (자동화 job이 생성하는 커밋)
    - 권장 형식: `chore(snapshot): job {jobId} ({phase})`  ※ 코드 템플릿: `chore(snapshot): job ${jobId}` (phase는 선택적 메타)
    - 예: `chore(snapshot): job 20260219-abc123 (phase=validate)`

  - 승인/병합 커밋 (UI/승인 워크플로우에서 생성)
    - 형식: `chore(approve): {사용자 메시지}`
    - 예: `chore(approve): 승인 - 플로우 검토 완료, merge draft to main`

  - 수동(개발자) 커밋
    - 접두사 규칙: 아래 허용된 프리픽스 중 하나로 시작하거나 `chore(`로 시작해야 합니다.
      - 허용 예: `[docs] `, `[flow] `, `[decision] `, `[fix] `, `[other] ` 또는 `chore(...)`
    - 메시지 검증(요약): 비어 있으면 안되며 최소 5자, 최대 500자. (구체 검증은 코드의 validateCommitMessage 참조)
    - 예: `[docs] update CONTRIBUTING for commit rules`

2) Author / Committer 정책
  - 자동 커밋(봇/백그라운드 작업)은 최소한의 PII를 사용합니다:
    - 예: `plana-bot <noreply@plana.local>` (코드 상수: GIT_AUTHOR)
  - 수동 커밋은 가능한 한 실명/내부 이메일을 남기되 PII 노출을 최소화하세요. (예: `Hong Gil <hong.gil@company.local>`)
  - 커밋 메타(Author vs Committer): 서비스가 자동 커밋을 생성하는 경우 Author는 `plana-bot`으로 고정, Committer는 시스템 계정으로 기록될 수 있습니다.

3) 버전 관리 대상(allowlist / denylist)
  - allowlist / denylist 규칙은 `lib/git-versioning.ts`의 VERSION_ALLOWLIST를 따릅니다.
    - 기본 포함: `**/*.md`, `design/_playground/components/**` 등
    - 기본 제외: `shared/90_worklog.md`, `.opencode/**`, `rules/**`, `template/**`, 빌드/툴 산출물 등
  - 운영 규칙: `product-description/shared/90_worklog.md`는 기본적으로 버전관리에서 제외됩니다(append-only 런타임 로그이므로 기본 제외).

4) 충돌 처리 절차 (Phase 1)
  - 원칙: 충돌은 수동으로 해결합니다. 자동 rebase/squash 또는 강제 병합은 허용되지 않습니다.
  - 권장 프로세스:
    1. `git fetch` / `git pull --ff-only` (가능하면 fast-forward 우선)
    2. 충돌 발생 시: 작업을 중단하고 로컬 변경을 백업(stash 또는 브랜치 생성)
    3. 수동으로 파일을 열어 충돌 내용을 해소하고 관련 문서(결정/승인 로그)에 변경 사유를 기록합니다.
    4. 충돌 해결 커밋은 상단의 접두사 규칙을 따릅니다(예: `[other] resolve merge conflict for X`).
    5. Phase 1에서는 자동화된 force-push, auto-rebase, 또는 자동 스쿼시는 사용 금지입니다.

5) Allowlist / Denylist 운영 주의사항
  - 민감/런타임 로그(예: `shared/90_worklog.md`)는 기본적으로 제외됩니다. SSoT(기획 문서)는 `product-description/**`에 유지됩니다.
  - 변경이 필요한 경우(예: 템플릿 추가/제외)에는 `AGENTS.md` 규칙 및 변경 로그(`product-description/shared/30_decisions.md`)에 이유와 영향을 남겨야 합니다.

6) 실무 가이드 (짧은 체크리스트)
  - 자동 스냅샷: 백그라운드 job은 `chore(snapshot): job {jobId}` 형식 사용
  - 승인 병합: UI 승인 흐름에서 `chore(approve): {message}` 사용
  - 수동 커밋: 빈 메시지 금지, 접두사 규칙 준수, validateCommitMessage 기준 충족
  - 충돌: 수동 해결 → 관련 로그에 기록 → 접두사 규칙으로 커밋

참고: 더 엄격한 자동화/검증(커밋 훅, CI 검증 등)은 Phase 2에서 도입 예정입니다. 현재 Phase 1은 문서화된 규칙과 수동 검토를 우선시합니다.
