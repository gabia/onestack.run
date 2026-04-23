import React from 'react';
import Section from './Section.jsx';

export default function CardPage() {
  return (
    <>
      <h1 className="os-h1">카드</h1>
      <p className="os-lede">서비스·배포·메트릭 등 독립된 정보 단위를 담습니다. 레이아웃 도구로 사용하지 않습니다.</p>
      <Section title="서비스 카드">
        <div className="os-grid-3">
          {[
            {n:"onestack-api", s:"실행 중", env:"prod", b:"main"},
            {n:"onestack-web", s:"배포 중", env:"prod", b:"release/1.4"},
            {n:"metrics-ingest", s:"실패", env:"stage", b:"fix/oom"},
          ].map(x => (
            <div key={x.n} className="os-card">
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                <div style={{fontWeight:600,fontSize:14}}>{x.n}</div>
                <span className={"os-badge os-badge-"+(x.s==="실행 중"?"success":x.s==="배포 중"?"info":"danger")}>
                  <span className="os-badge-dot" style={{background:"currentColor"}}/>{x.s}
                </span>
              </div>
              <div className="os-muted" style={{fontSize:12,marginTop:6,fontFamily:"'JetBrains Mono',monospace"}}>{x.env} · {x.b}</div>
              <div style={{display:"flex",gap:16,marginTop:14,fontSize:12}}>
                <div><div className="os-muted" style={{fontSize:10,textTransform:"uppercase",letterSpacing:".05em"}}>CPU</div><div style={{fontWeight:500,fontVariantNumeric:"tabular-nums"}}>12%</div></div>
                <div><div className="os-muted" style={{fontSize:10,textTransform:"uppercase",letterSpacing:".05em"}}>MEM</div><div style={{fontWeight:500,fontVariantNumeric:"tabular-nums"}}>241 MB</div></div>
                <div><div className="os-muted" style={{fontSize:10,textTransform:"uppercase",letterSpacing:".05em"}}>Replicas</div><div style={{fontWeight:500,fontVariantNumeric:"tabular-nums"}}>3/3</div></div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
