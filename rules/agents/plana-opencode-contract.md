# Plana ↔ OpenCode Contract Surfaces

이 문서는 Plana 지침, OpenCode 런타임, docker 배포 구성이 **같은 의미를 공유해야 하는 계약면(contract surfaces)** 을 한 곳에 정리한 기준 문서다.

목표는 다음 3가지를 동시에 만족하는 것이다.

1. 지침이 실제 런타임 capability를 벗어나지 않도록 한다.
2. 배포/로컬/sidecar 환경에서 같은 용어(`tool`, `mode`, `health`)가 같은 뜻을 갖도록 한다.
3. 장애가 났을 때 사용자에게는 이해 가능한 실패 상태만 보이게 한다.

## 계약면 요약 표

| Surface | 문서상 기대 | 현재 런타임/코드 | 현재 리스크 | SSoT 후보 |
| --- | --- | --- | --- | --- |
| Tool surface | `product-description/rules/agents/opencode.md`는 `question tool`, `plana_gate_check`, 웹 리서치 도구, 허용 skill을 언급 | `.opencode/tools/*.ts`, `lib/opencode-jobs.ts`, `opencode.gabia.json`의 MCP가 실제 제공 범위를 결정 | 문서가 실제 제공되지 않는 tool/skill 이름을 말하면 `tool invalid` 발생 | 런타임 capability + 이 문서 |
| Runtime mode | `local-cli` / `external-server`를 암묵적으로 전제 | `lib/opencode-server.ts`가 hostname/env로 실제 mode를 결정 | loopback + production, sidecar + fallback 등에서 해석 불일치 가능 | `lib/opencode-server.ts` + 이 문서 |
| Health / readiness | 운영 문서는 `/api/health`를 확인하라고 안내 | `app/api/health/route.ts`, `docker-compose.yml` healthcheck, `lib/opencode-server.ts`의 `/global/health`가 실제 상태를 구성 | HTTP 200과 readiness 의미가 다르면 모니터링/UX가 오판 가능 | `/api/health` contract + compose check |
| Workspace scoping | AGENTS.md는 항상 workspace docs dir로 스코프 고정 요구 | OpenCode API 요청의 `directory`, job docsDir, workspace helper가 실제 범위를 정함 | 규칙만 있고 강제가 약하면 경로 이탈/다른 프로젝트 접근 위험 | runtime validation + AGENTS.md |
| Redaction / exposure | 절대경로/시스템 프롬프트/툴 로그 비노출이 기본 | `plana_redact`, UI 출력, 로그 처리부가 일부만 보장 | 수동 redaction 의존 시 절대경로/토큰 누출 가능 | outbound response filtering |
| Config SSoT | repo에는 `opencode.gabia.json`이 보임 | 배포에서는 `docker-compose.yml`이 inline으로 opencode/oh-my-opencode 설정을 생성 | repo config 수정이 실제 runtime에 안 먹을 수 있음 | 단일 generator 또는 canonical config |

## 1) Tool surface 계약

### 문서 출처
- `product-description/rules/agents/opencode.md`
- `AGENTS.md`

### 코드/런타임 출처
- `.opencode/tools/plana_gate_check.ts`
- `.opencode/tools/plana_user_check.ts`
- `.opencode/tools/plana_redact.ts`
- `lib/opencode-jobs.ts`
- `opencode.gabia.json`

### 현재 기준
- Plana 전용 custom tool은 `plana_gate_check`, `plana_user_check`, `plana_redact` 세 개가 실체가 있다.
- MCP는 현재 `fetch`, `duckduckgo`만 켜져 있다.
- skill 이름은 지침에 적혀 있어도, 실제 실행 가능 여부는 OpenCode 런타임과 플러그인 로딩 결과에 달려 있다.

### 계약 규칙
- 문서에는 **실제로 capability 검증으로 확인 가능한 tool 이름만** 적는다.
- `skill`, `tool`, `mcp tool`을 같은 말처럼 섞어 쓰지 않는다.
- unsupported tool은 작업 중간 실패가 아니라 **사전 capability 오류**로 분류한다.

### 현재 mismatch
- 지침의 웹 리서치 예시 이름과 실제 MCP export 이름이 다를 가능성이 있다.
- 문서상 허용된 skill이 runtime에서 그대로 보장되는지 확인 경로가 없다.

## 2) Runtime mode 계약

### 문서 출처
- `AGENTS.md`
- 배포/개발 문서

### 코드/런타임 출처
- `lib/opencode-server.ts`
- `lib/opencode-runtime.ts`
- `lib/opencode-jobs.ts`

### 현재 기준
- `local-cli`: 로컬 개발 환경에서 app 프로세스가 `opencode serve`/`opencode run`을 직접 사용할 수 있는 경우
- `external-server`: sidecar 또는 외부 OpenCode 서버를 HTTP로 호출하는 경우

### 계약 규칙
- `external-server`에서는 local CLI fallback을 금지한다.
- runtime mode는 hostname, env, spawn policy가 합쳐진 **단일 함수**로 판정한다.
- UI와 `/api/health`는 같은 mode 값을 보여야 한다.

### 현재 mismatch
- loopback host라도 production이면 spawn 금지 같은 예외가 있어, 단순 hostname만으로는 설명이 부족하다.

## 3) Health / readiness 계약

### 문서 출처
- `product-description/09-coolify-oauth-compose-runbook.md`
- `AGENTS.md`

### 코드/런타임 출처
- `app/api/health/route.ts`
- `lib/opencode-server.ts`
- `docker-compose.yml`

### 계약 규칙
- health는 최소 `mode`, `ready`, `degraded reason`을 구분해서 표현한다.
- compose healthcheck와 UI가 **같은 readiness 의미**를 써야 한다.
- sidecar down, misconfigured, unsupported capability는 서로 다른 오류 분류를 가진다.

### 현재 mismatch
- `/api/health`의 HTTP 성공과 실제 준비 상태 의미가 완전히 고정돼 있지 않다.

## 4) Workspace scoping 계약

### 문서 출처
- `AGENTS.md`
- `product-description/rules/agents/opencode.md`

### 코드/런타임 출처
- job 생성 시 docs directory 주입 경로
- workspace helper / path validation 경로

### 계약 규칙
- OpenCode 요청은 항상 `<workspace>/product-description` 기준으로 실행한다.
- 루트 repo `product-description/`를 workspace docs dir처럼 사용하지 않는다.
- path escape는 structured violation으로 처리한다.

## 5) Redaction 계약

### 문서 출처
- `AGENTS.md`
- `product-description/rules/agents/opencode.md`

### 코드/런타임 출처
- `.opencode/tools/plana_redact.ts`
- UI output/rendering 경로
- server logs / system message 조립 경로

### 계약 규칙
- 절대경로, 이메일, 토큰/키 패턴은 기본 응답에서 자동 마스킹한다.
- redaction은 tool 호출에 의존하지 않고, **outbound path**에서 기본 적용되어야 한다.

## 6) Config SSoT 계약

### 문서 출처
- `DEVELOPMENT.md`
- `product-description/08-deployment-and-infrastructure.md`

### 코드/런타임 출처
- `opencode.gabia.json`
- `docker-compose.yml`
- `lib/opencode-server.ts`

### 계약 규칙
- operator가 “무엇을 수정하면 runtime이 바뀌는지” 즉시 알 수 있어야 한다.
- repo config와 배포 config가 동시에 authoritative 하면 안 된다.
- 둘을 유지해야 한다면 drift detection이 필수다.

### 현재 mismatch
- compose runtime이 inline 생성 config를 쓰므로 repo JSON만 수정하면 실제 배포 동작이 안 바뀔 수 있다.

## 현재 우선순위

1. Tool surface contract 고정
2. Runtime mode + health semantics 고정
3. Config SSoT 단일화 또는 drift detection 추가
4. Workspace scoping / redaction을 강제 규칙으로 승격

## 이번 리뷰의 비범위

- auth 구조 전면 개편
- product feature 확장
- 단순 프롬프트 미문 수정만으로 끝내는 접근

## 성공 기준

- 지침에 적힌 tool 이름이 supported runtime에서 실제로 검증 가능하다.
- `tool invalid` 같은 오류가 사용자-facing surprise가 아니라 사전 capability 실패로 바뀐다.
- health/mode/config 용어가 문서, UI, compose, 코드에서 같은 뜻을 가진다.
- repo config와 배포 config가 서로 다르게 움직여도 자동으로 감지되거나 아예 단일 경로가 된다.
