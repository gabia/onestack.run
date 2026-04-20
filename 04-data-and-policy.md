# 04. 데이터 & 정책 (Template)

상태: `DRAFT_FLOW`

작성일: YYYY-MM-DD

## 1) 데이터 인벤토리 (최소 수집)

- 산출물:
  - <product-description/** 아래 저장되는 항목>
- 로그 (append-only):
  - shared/20_approval.md
  - shared/30_decisions.md
  - shared/risk.md
  - shared/90_worklog.md (앱이 append)

## 2) 데이터 분류

- PII/민감정보 여부: <예/아니오>
- 비밀/자격증명 포함 가능성: <예/아니오>

## 3) 경계 (테넌트/워크스페이스)

- 테넌트 경계 단위: <office/user/project>
- 권한 경계 규칙: <AI/Export/Upload이 읽을 수 있는 범위>

## 4) 보관/삭제

- 기본 보관 기간: <기간>
- 삭제 트리거: <탈퇴/요청/만료 등>
- 복구/유예 정책: <정책>

## 5) 서브프로세서/리전

- 서브프로세서 공개 여부: <링크/정책>
- 데이터 처리 리전: <KR/US/EU 등>

## 6) 관리자 제어

- <기능 토글/감사로그/내보내기 제어>

## 7) AI 학습 기본값

- <기본값: 학습 안 함 / 옵트인>
