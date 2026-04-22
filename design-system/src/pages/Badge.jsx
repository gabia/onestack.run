import React from 'react';
import Section from './Section.jsx';

export default function BadgePage() {
  return (
    <>
      <h1 className="os-h1">배지</h1>
      <p className="os-lede">간결한 상태 마커. 모든 상태는 점 형태·의미론적 색상·레이블을 가집니다 — 색상만으로는 안 됩니다.</p>
      <Section title="상태">
        <div className="os-block">
          <div className="os-block-body">
            <div className="os-row">
              <span className="os-badge os-badge-success"><span className="os-badge-dot" style={{background:"hsl(142 71% 36%)"}}/>실행 중</span>
              <span className="os-badge os-badge-info"><span className="os-badge-dot" style={{background:"hsl(204 100% 38%)"}}/>배포 중</span>
              <span className="os-badge os-badge-warning"><span className="os-badge-dot" style={{background:"hsl(38 92% 50%)"}}/>성능 저하</span>
              <span className="os-badge os-badge-danger"><span className="os-badge-dot" style={{background:"hsl(0 72% 51%)"}}/>실패</span>
              <span className="os-badge"><span className="os-badge-dot" style={{background:"hsl(var(--muted-foreground))"}}/>대기</span>
            </div>
          </div>
        </div>
      </Section>
      <Section title="중립 & 수량">
        <div className="os-block">
          <div className="os-block-body">
            <div className="os-row">
              <span className="os-badge">main</span>
              <span className="os-badge os-mono">v0.29.1</span>
              <span className="os-badge">레플리카 12개</span>
              <span className="os-badge">프로덕션</span>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
