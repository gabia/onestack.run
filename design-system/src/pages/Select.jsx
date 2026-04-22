import React from 'react';
import Section from './Section.jsx';

export default function SelectPage() {
  const TAG_COLORS = ["#006FC1","#16A34A","#F59E0B","#DC2626","#8B5CF6"];
  function TagPill({label, color}) {
    return (
      <span style={{
        display:"inline-flex", alignItems:"center", gap:4,
        padding:"2px 8px", fontSize:11, fontWeight:500,
        borderRadius:4, border:"1px solid hsl(var(--border))",
        background:`${color}18`, color,
      }}>
        <span style={{width:6,height:6,borderRadius:3,background:color,flexShrink:0}}/>
        {label}
        <span style={{marginLeft:2,opacity:.6,cursor:"pointer"}}>×</span>
      </span>
    );
  }
  function FakeTrigger({children, open}) {
    return (
      <div style={{
        display:"flex", alignItems:"center", justifyContent:"space-between",
        width:"100%", minHeight:40, padding:"6px 12px",
        background:"hsl(var(--background))",
        border:`1px solid ${open ? "hsl(var(--ring))" : "hsl(var(--border))"}`,
        borderRadius:"calc(var(--radius) - 2px)",
        boxShadow: open ? "0 0 0 3px hsl(var(--ring) / 0.18)" : "none",
        cursor:"pointer", fontSize:13,
      }}>
        <div style={{display:"flex",flexWrap:"wrap",gap:4,flex:1}}>{children}</div>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{opacity:.4,flexShrink:0,marginLeft:8}}>
          <path d="M8 9l4-4 4 4M8 15l4 4 4-4"/>
        </svg>
      </div>
    );
  }
  function FakeDropdown() {
    const items = ["frontend","backend","database","infra","staging"];
    return (
      <div style={{
        marginTop:4, border:"1px solid hsl(var(--border))",
        borderRadius:8, background:"hsl(var(--popover))",
        boxShadow:"0 8px 24px rgba(0,0,0,.12)", overflow:"hidden",
      }}>
        <div style={{padding:"6px 8px",borderBottom:"1px solid hsl(var(--border))"}}>
          <input className="os-input" placeholder="태그 검색..." style={{height:30,fontSize:12}}/>
        </div>
        <div style={{padding:"4px 4px"}}>
          {items.map((item, i) => (
            <div key={item} style={{
              display:"flex", alignItems:"center", gap:8,
              padding:"6px 10px", borderRadius:5, fontSize:13,
              background: i===0 ? "hsl(var(--accent))" : "transparent",
              cursor:"pointer",
            }}>
              <span style={{
                width:14,height:14,border:"1px solid hsl(var(--border))",
                borderRadius:3, background: i===0 ? "hsl(var(--primary))" : "transparent",
                display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,
              }}>
                {i===0 && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>}
              </span>
              <TagPill label={item} color={TAG_COLORS[i % TAG_COLORS.length]}/>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <h1 className="os-h1">멀티선택기</h1>
      <p className="os-lede">태그, 환경, 기타 분류 필드에서 하나 또는 여러 값을 선택하는 단일 컴포넌트. 인풋처럼 보이지만(흰 배경, 동일한 테두리·포커스 링) 검색 가능한 팝오버를 여는 <code className="os-inline-code">button</code> 트리거 기반으로 구축됩니다.</p>

      <Section title="왜 Input이 아닌 Button인가?">
        <div className="os-card" style={{display:"flex",flexDirection:"column",gap:10}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,fontSize:13}}>
            <div style={{padding:14,border:"1px solid hsl(var(--border))",borderRadius:6}}>
              <div style={{fontWeight:600,marginBottom:6,color:"hsl(var(--foreground))"}}>✓ 버튼 (올바른 방법)</div>
              <ul style={{margin:0,paddingLeft:16,color:"hsl(var(--muted-foreground))",lineHeight:1.8}}>
                <li>클릭 시 팝오버 열림</li>
                <li>키보드 접근 가능 (Enter/Space)</li>
                <li>올바른 <code className="os-inline-code">role="combobox"</code></li>
                <li>네이티브 select 제약 없음</li>
              </ul>
            </div>
            <div style={{padding:14,border:"1px solid hsl(var(--border))",borderRadius:6,opacity:.5}}>
              <div style={{fontWeight:600,marginBottom:6}}>✗ Select 요소</div>
              <ul style={{margin:0,paddingLeft:16,color:"hsl(var(--muted-foreground))",lineHeight:1.8}}>
                <li>OS 기본 드롭다운만 지원</li>
                <li>뱃지 멀티 선택 불가</li>
                <li>크로스플랫폼 스타일링 불가</li>
                <li>커스텀 검색/필터 불가</li>
              </ul>
            </div>
          </div>
          <p className="os-p" style={{marginTop:4}}>폼에서 자연스럽게 보이도록 인풋처럼 스타일링합니다. 버튼 <code className="os-inline-code">outline</code> 변형이 이미 <code className="os-inline-code">bg-background border border-input</code>를 제공하므로 — 위에 <code className="os-inline-code">bg-input</code>을 추가하지 마세요.</p>
        </div>
      </Section>

      <Section title="상태">
        <div className="os-block">
          <div className="os-block-body" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:24,maxWidth:700}}>
            <div>
              <label className="os-label">빈 상태 (플레이스홀더)</label>
              <FakeTrigger>
                <span style={{color:"hsl(var(--muted-foreground))"}}>태그 선택...</span>
              </FakeTrigger>
            </div>
            <div>
              <label className="os-label">선택된 상태</label>
              <FakeTrigger>
                <TagPill label="frontend" color="#006FC1"/>
                <TagPill label="backend" color="#16A34A"/>
              </FakeTrigger>
            </div>
            <div style={{gridColumn:"1/-1"}}>
              <label className="os-label">열린 상태 (포커스)</label>
              <FakeTrigger open>
                <TagPill label="frontend" color="#006FC1"/>
                <span style={{color:"hsl(var(--muted-foreground))"}}>태그 선택...</span>
              </FakeTrigger>
              <FakeDropdown/>
            </div>
            <div>
              <label className="os-label">비활성화</label>
              <FakeTrigger>
                <span style={{color:"hsl(var(--muted-foreground))"}}>태그 선택...</span>
              </FakeTrigger>
            </div>
          </div>
        </div>
      </Section>

      <Section title="명세">
        <table className="os-table">
          <thead><tr><th>속성</th><th>값</th></tr></thead>
          <tbody>
            <tr><td>마크업</td><td><code className="os-inline-code">&lt;button&gt;</code> — <code className="os-inline-code">&lt;select&gt;</code> 사용 금지</td></tr>
            <tr><td>배경</td><td><code className="os-inline-code">--background</code> (흰색)</td></tr>
            <tr><td>테두리</td><td><code className="os-inline-code">1px solid --border</code></td></tr>
            <tr><td>포커스 테두리</td><td><code className="os-inline-code">--ring</code> (Cobalt)</td></tr>
            <tr><td>포커스 그림자</td><td><code className="os-inline-code">0 0 0 3px --ring / 0.18</code></td></tr>
            <tr><td>최소 높이</td><td>40px (인풋과 동일)</td></tr>
            <tr><td>선택된 항목</td><td>트리거 내부에 색상 점이 있는 태그 pill</td></tr>
          </tbody>
        </table>
      </Section>
    </>
  );
}
