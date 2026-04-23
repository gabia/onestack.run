import React from 'react';
import Section from './Section.jsx';

export default function Introduction() {
  return (
    <>
      <div className="os-hero">
        <span className="os-hero-badge">v0.1.0 · design.onestack.run</span>
        <h1 className="os-h1">OneStack Design System</h1>
        <p className="os-lede">
          gabia 배포 플랫폼의 내부 언어. shadcn/ui 기초 위에 구축되어,
          테이블·로그·배포 이력·실시간 상태 등 밀도 높은 운영 화면에 최적화되어 있습니다.
        </p>
        <div className="os-row">
          <a className="os-btn os-btn-primary" href="#/colors" onClick={e=>{e.preventDefault();location.hash="#/colors";}}>기초 살펴보기</a>
          <a className="os-btn os-btn-secondary" href="#/dashboard" onClick={e=>{e.preventDefault();location.hash="#/dashboard";}}>적용 사례 보기</a>
        </div>
      </div>

      <div className="os-stats">
        <div className="os-stat"><div className="os-stat-label">토큰</div><div className="os-stat-val">86</div></div>
        <div className="os-stat"><div className="os-stat-label">컴포넌트</div><div className="os-stat-val">24</div></div>
        <div className="os-stat"><div className="os-stat-label">패턴</div><div className="os-stat-val">9</div></div>
        <div className="os-stat"><div className="os-stat-label">테마</div><div className="os-stat-val">2</div></div>
      </div>

      <Section title="이게 무엇인가">
        <p className="os-p">
          OneStack은 Dokploy의 shadcn/ui 기반을 gabia에 맞게 재테마링하고,
          배포 플랫폼의 밀도 높고 스캔 위주의 UI에 최적화한 포크입니다. CSS 변수 세트,
          Tailwind 설정, React 컴포넌트 라이브러리로 제공되며 — Dokploy 코드베이스가 이미
          사용하는 요소들이므로, 구현 경로는 전체 재작성이 아닌 토큰 교체입니다.
        </p>
      </Section>

      <Section title="세 가지 기둥">
        <div className="os-grid-3">
          {[
            { t: "읽기 전에 스캔하라", d: "사용자는 분류 중이다. 강한 위계, 한눈에 보이는 상태, 시선을 느리게 하지 않고 영역을 구분하는 여백이 필요하다." },
            { t: "절제를 통한 신뢰", d: "강조색 하나, 의미론적 상태, 모노크롬 크롬. 색은 주목을 얻는 것이지 장식이 아니다." },
            { t: "구현 충실도", d: "모든 토큰은 shadcn CSS 변수에 매핑된다. Figma와 코드는 구조적으로 일치한다." },
          ].map(x => (
            <div key={x.t} className="os-card">
              <div style={{fontWeight:600,marginBottom:6}}>{x.t}</div>
              <div className="os-muted" style={{fontSize:13,lineHeight:1.55}}>{x.d}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="이 사이트 활용법">
        <p className="os-p">
          <span className="os-inline-code">기초</span>는 색상·타이포그래피·간격·반경 등 원시 요소를 정의합니다.
          <span className="os-inline-code">컴포넌트</span>는 각 요소의 실제 적용 모습과 사용 가이드, 코드를 보여줍니다.
          <span className="os-inline-code">패턴</span>은 이것들을 조합해 배포 플랫폼의 실제 화면으로 구성합니다.
        </p>
      </Section>
    </>
  );
}
