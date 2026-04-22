import React from 'react';
import Section from './Section.jsx';
import OS_TOKENS from '../../tokens.js';
const T = () => OS_TOKENS;

export default function Typography() {
  const tk = T();
  return (
    <>
      <h1 className="os-h1">타이포그래피</h1>
      <p className="os-lede">
        UI 텍스트는 Pretendard, 터미널에서 입력하는 모든 것(ID, 경로, 명령어, 로그)은 JetBrains Mono를 사용합니다.
      </p>

      <Section title="서체">
        <div className="os-grid-2">
          <div className="os-card">
            <div className="os-muted" style={{fontSize:11,textTransform:"uppercase",letterSpacing:".06em"}}>Sans — UI</div>
            <div style={{fontFamily:"'Pretendard Variable','Pretendard',sans-serif",fontSize:28,fontWeight:600,letterSpacing:"-.5px",marginTop:8}}>Pretendard</div>
            <div className="os-muted" style={{fontSize:12,marginTop:4}}>400 · 500 · 600 · 700 · 한글 최적화</div>
          </div>
          <div className="os-card">
            <div className="os-muted" style={{fontSize:11,textTransform:"uppercase",letterSpacing:".06em"}}>Mono — 코드 & 데이터</div>
            <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:24,fontWeight:500,marginTop:8}}>JetBrains Mono</div>
            <div className="os-muted" style={{fontSize:12,marginTop:4}}>400 · 500 · 고정폭, 슬래시 0</div>
          </div>
        </div>
      </Section>

      <Section title="크기 체계">
        <div className="os-block">
          <div className="os-block-body" style={{padding:"8px 24px"}}>
            {tk.typography.scale.map(s => (
              <div key={s.name} className="os-type-row">
                <div className="os-type-name">{s.name}</div>
                <div style={{fontSize:s.px,lineHeight:s.lh+"px",fontWeight:s.weight,letterSpacing: s.px>20?"-.4px":"-.1px"}}>
                  빠른 갈색 여우가 게으른 개를 뛰어넘습니다
                </div>
                <div className="os-type-meta">{s.px}/{s.lh} · {s.weight} · {s.usage}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
