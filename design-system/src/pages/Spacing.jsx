import React from 'react';
import Section from './Section.jsx';
import OS_TOKENS from '../../tokens.js';
const T = () => OS_TOKENS;

export default function SpacingPage() {
  const tk = T();
  return (
    <>
      <h1 className="os-h1">간격 & 반경</h1>
      <p className="os-lede">
        신중하게 선택한 중간 단계를 포함한 2/4/8 기반 스케일. 12px이 기본 거터이며,
        20px과 32px이 대부분의 레이아웃 구성을 담당합니다.
      </p>

      <Section title="간격 체계">
        <div className="os-block">
          <div className="os-block-body">
            {tk.spacing.map(s => (
              <div key={s.name} className="os-space-row">
                <div className="os-space-name">space-{s.name}</div>
                <div className="os-space-val">{s.px}px</div>
                <div className="os-space-bar" style={{width: Math.max(s.px,1)+"px"}}/>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section title="반경">
        <div className="os-radius-grid">
          {tk.radius.map(r => (
            <div key={r.name} className="os-radius-cell">
              <div className="os-radius-chip" style={{borderRadius:r.name==="pill"?9999:r.px}}/>
              <div className="os-radius-name">radius-{r.name}</div>
              <div className="os-radius-val">{r.name==="pill"?"9999px":r.px+"px"}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="그림자">
        <div className="os-grid-3">
          {tk.shadow.map(s => (
            <div key={s.name} style={{padding:24,background:"hsl(var(--background))",borderRadius:8,border:"1px solid hsl(var(--border))"}}>
              <div style={{height:64,background:"hsl(var(--card))",borderRadius:6,boxShadow:s.css,border:"1px solid hsl(var(--border))"}}/>
              <div style={{marginTop:10,fontSize:12,fontWeight:500}}>shadow-{s.name}</div>
              <div className="os-muted" style={{fontSize:11}}>{s.usage}</div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
