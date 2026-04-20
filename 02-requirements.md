# 02. 요구사항: Onestack 홍보 웹페이지

상태: `EXECUTION_READY`

작성일: 2026-04-17

## 1) 기능 요구사항 (v1)

### 1.1 Hero Section (랜딩)

- **헤드라인 표시**: "Code to Edge, Securely" 명시
- **서브 메시지**: "개발자는 코드에만 집중, 보안/속도는 Onestack이 책임"
- **메인 CTA 버튼**: 
  - "지금 시작하기" (가입 페이지 또는 데모 예약)
  - "데모 보기" (데모 영상 또는 스크린샷)
- **비주얼 요소**: 
  - 배경 이미지/그래픽 (코드 푸시 → 글로벌 배포 흐름 표현)
  - 반응형 레이아웃 (모바일/데스크톱)

### 1.2 5가지 핵심 가치제안 카드 섹션

#### 1.2.1 개발 생산성의 혁신 (Focus on Business)
- **카드 컴포넌트**: 아이콘 + 제목 + 설명 (3줄 이내)
  - Zero-Config: 복잡한 설정 없이 코드 푸시만으로 배포
  - Preview Deployment: 모든 브랜치에 자동 미리보기 URL 생성
  - Self-Service: 인프라 전문가 없이도 DB/도메인/환경 변수 관리
- **인터랙티브 요소** (선택): 호버 시 추가 정보 표시

#### 1.2.2 철벽 보안 (Bulletproof Security)
- **카드 컴포넌트**: 아이콘 + 제목 + 설명
  - L7 DDoS Shield: Cloudflare 기반 글로벌 애니캐스트 네트워크
  - WAF & Bot Defense: SQL 인젝션, 악의적 봇 차단
  - Origin Cloaking: 실제 배포 서버 IP 숨김

#### 1.2.3 글로벌 초고속 네트워크 (Ultimate Performance)
- **카드 컴포넌트**: 아이콘 + 제목 + 설명
  - Edge CDN: 330개 이상 도시의 엣지 노드
  - Smart Routing: 네트워크 정체 구간 우회

#### 1.2.4 운영 자동화 (Operational Zero-Touch)
- **카드 컴포넌트**: 아이콘 + 제목 + 설명
  - Auto SSL: 무료 SSL/TLS 자동 발급 및 갱신
  - Full GitOps: GitHub/GitLab 연동 자동 파이프라인

#### 1.2.5 탁월한 경제성 (Cost Optimization)
- **카드 컴포넌트**: 아이콘 + 제목 + 설명
  - Infrastructure Abstraction: 보안 장비/전문 인력 비용 절감
  - Egress Savings: 효율적 캐싱으로 데이터 전송 비용 최적화

### 1.3 사회적 증명 (Social Proof) 섹션

- **고객 수 통계**: "X,XXX명 이상의 개발자가 신뢰합니다"
- **배포 통계**: "매월 X,XXX,000+ 배포 처리"
- **고객사 로고**: 파트너/고객사 로고 5~8개 표시
- **사용자 후기**: 개발자 2~3명의 짧은 후기 + 사진
- **(선택) 미디어 언급**: 주요 개발 매체 기사 링크

### 1.4 기능 비교 테이블 (선택)

- **형식**: Vercel vs Heroku vs Onestack 비교
- **항목**: Zero-Config, 글로벌 성능, 보안, 가격, 자유도 등 6~8개
- **표시 방식**: ✅/❌ 또는 ⭐ 별점

### 1.5 다음 단계 & CTA 섹션

- **"지금 배포 시작하기"** 대형 버튼 (가입 또는 데모)
- **"GitHub 저장소"** 링크 (Stars 유도)
- **"Discord 커뮤니티"** 링크 (커뮤니티 참여 유도)
- **이메일 뉴스레터 가입**: "최신 업데이트 받기"

### 1.6 푸터 (Footer)

- **회사 소개**: Onestack 1줄 설명 + 링크
- **빠른 링크**: 문서, API, 블로그, 상태 페이지
- **소셜 미디어**: GitHub, Twitter, Discord 아이콘 링크
- **법률**: 개인정보보호정책, 이용약관, 쿠키 정책

## 2) 기술 요구사항

### 2.1 개발 스택
- **프레임워크**: React 18+ (Next.js 기반 추천)
- **스타일링**: Tailwind CSS (기존 프로젝트 설정과 일관성)
- **컴포넌트**: TypeScript + 함수형 컴포넌트
- **기존 디자인 시스템 활용**:
  - 색상: Tailwind primary (`#136dec`) 기반
  - 폰트: Pretendard (global CSS에 정의)
  - 컴포넌트: `design/_playground` 기존 패턴 따르기

### 2.2 성능 목표
- **Lighthouse**: 성능 90+, 접근성 95+, SEO 100
- **First Contentful Paint (FCP)**: < 1.5s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Cumulative Layout Shift (CLS)**: < 0.1

### 2.3 SEO 요구사항
- **메타 태그**: 제목, 설명, Open Graph, Twitter Card
- **헤딩 계층**: H1 (한 개) → H2 (섹션별) → H3 (세부)
- **구조화된 데이터**: Schema.org (Organization, Product, FAQPage)
- **모바일 최적화**: Mobile-friendly (Google Mobile-Friendly Test 통과)
- **대상 키워드**:
  - "클라우드 배포", "서버리스 배포", "DDoS 방어"
  - "자동 배포", "엣지 CDN", "개발자 친화적 호스팅"

### 2.4 접근성 (a11y)
- **WCAG 2.1 AA 준수**
- **키보드 네비게이션**: 모든 CTA/링크 탭 가능
- **스크린 리더**: 이미지 alt 태그, 시맨틱 HTML
- **대비**: 텍스트와 배경의 대비 비율 4.5:1 이상

### 2.5 국제화 (i18n)
- **기본 언어**: 한국어
- **선택사항**: 영문 지원 여부 (별도 결정 필요)

## 3) 데이터/정책 요구사항

### 3.1 수집 데이터
- **CTA 클릭**: 이벤트 추적 (Google Analytics, Mixpanel 등)
- **사용자 신청**: 이메일, 조직, 역할 (마케팅 동의 포함)
- **페이지 분석**: 섹션별 체류시간, 스크롤 깊이

### 3.2 데이터 보관 정책
- **기본 보관 기간**: 12개월
- **삭제 정책**: 이용약관 동의 철회 시 즉시 삭제
- **외부 연동**: Google Analytics, Mixpanel (개인정보보호정책 명시)

### 3.3 쿠키 정책
- **필수 쿠키**: 웹사이트 기능 (세션)
- **분석 쿠키**: Google Analytics (사용자 동의)
- **마케팅 쿠키**: 재마케팅 (사용자 동의)

## 4) 비기능 요구사항

### 4.1 성능 & 확장성
- **응답 속도**: 모든 API 요청 < 500ms
- **동시 접속**: 1,000명 이상 동시 접속 지원
- **이미지 최적화**: WebP 형식, 동적 사이즈 조정

### 4.2 보안
- **HTTPS**: 모든 통신 암호화
- **CSRF 보호**: 토큰 기반 CSRF 방어
- **XSS 방지**: React 기본 escape, 써드파티 스크립트 감시
- **Content Security Policy (CSP)**: 외부 스크립트 제약

### 4.3 모니터링 & 로깅
- **에러 추적**: Sentry 또는 유사 도구
- **성능 모니터링**: Web Vitals 추적
- **사용자 분석**: Google Analytics 또는 Mixpanel

### 4.4 크로스 브라우저 호환성
- Chrome/Edge (최신 2 버전)
- Firefox (최신 2 버전)
- Safari (최신 2 버전)
- 모바일: iOS Safari, Chrome for Android

### 4.5 빌드/배포
- **빌드 명령**: `npm run build` (정적 HTML 생성)
- **배포**: Onestack 자신의 플랫폼에 배포 (dogfooding)
- **CI/CD**: GitHub Actions 기반 자동 배포

### 4.6 버전 관리
- **마크업**: Semantic Versioning (1.0.0)
- **변경 로그**: CHANGELOG.md 유지
