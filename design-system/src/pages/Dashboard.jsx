import React from 'react';
import { TableEmbed } from './Table.jsx';

export default function DashboardPattern() {
  const projects = [
    {n:"OneStack Core",   desc:"플랫폼 서비스",              svc:"12", env:"production", status:"정상"},
    {n:"Internal Tools",  desc:"어드민, 대시보드, CMS",       svc:"8",  env:"production", status:"정상"},
    {n:"Data Platform",   desc:"ETL, 데이터 웨어하우스, 큐",  svc:"6",  env:"staging",    status:"성능 저하"},
    {n:"ML Services",     desc:"모델 추론 & 학습",            svc:"4",  env:"staging",    status:"정상"},
  ];
  return (
    <>
      <h1 className="os-h1">패턴 · 대시보드</h1>
      <p className="os-lede">프로젝트 개요 — 로그인 후 랜딩 화면. 카드·배지·상태 점·서비스 테이블을 조합합니다.</p>

      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:16}}>
        <div>
          <div style={{fontSize:18,fontWeight:600,letterSpacing:"-.2px"}}>프로젝트</div>
          <div className="os-muted" style={{fontSize:12,marginTop:2}}>4개 프로젝트 · 총 30개 서비스</div>
        </div>
        <div className="os-row">
          <button className="os-btn os-btn-secondary os-btn-sm">필터</button>
          <button className="os-btn os-btn-primary os-btn-sm">+ 새 프로젝트</button>
        </div>
      </div>

      <div className="os-grid-2" style={{marginBottom:32}}>
        {projects.map(p => (
          <div key={p.n} className="os-card" style={{padding:18}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
              <div>
                <div style={{fontWeight:600,fontSize:14}}>{p.n}</div>
                <div className="os-muted" style={{fontSize:12,marginTop:2}}>{p.desc}</div>
              </div>
              <span className={"os-badge os-badge-"+(p.status==="정상"?"success":"warning")}>
                <span className="os-badge-dot" style={{background:"currentColor"}}/>{p.status}
              </span>
            </div>
            <div style={{display:"flex",gap:20,marginTop:16,paddingTop:14,borderTop:"1px solid hsl(var(--border))",fontSize:12}}>
              <div><div className="os-muted" style={{fontSize:10,textTransform:"uppercase",letterSpacing:".06em"}}>서비스</div><div style={{fontWeight:500,fontVariantNumeric:"tabular-nums",marginTop:2}}>{p.svc}</div></div>
              <div><div className="os-muted" style={{fontSize:10,textTransform:"uppercase",letterSpacing:".06em"}}>환경</div><div style={{fontWeight:500,fontFamily:"'JetBrains Mono',monospace",marginTop:2}}>{p.env}</div></div>
              <div><div className="os-muted" style={{fontSize:10,textTransform:"uppercase",letterSpacing:".06em"}}>마지막 배포</div><div style={{fontWeight:500,fontVariantNumeric:"tabular-nums",marginTop:2}}>4분 전</div></div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="os-h2" style={{marginTop:0}}>전체 서비스</h2>
      <TableEmbed extraRows />
    </>
  );
}
