import React from 'react';
import Section from './Section.jsx';

export default function TabPage() {
  const [seg, setSeg] = React.useState("general");
  const [under, setUnder] = React.useState("general");

  const SEG_TABS = ["일반", "환경 변수", "도메인", "고급"];
  const UNDER_TABS = ["일반", "환경 변수", "도메인", "배포", "로그", "고급"];

  function SegTabs({value, onChange, items}) {
    return (
      <div style={{display:"inline-flex",gap:4,background:"hsl(var(--muted))",padding:4,borderRadius:8,flexWrap:"wrap"}}>
        {items.map(item => {
          const id = item.toLowerCase();
          const active = value === id;
          return (
            <button key={id} onClick={() => onChange(id)} style={{
              display:"inline-flex",alignItems:"center",gap:6,
              padding:"5px 12px",fontSize:13,fontWeight:500,
              borderRadius:6,border:"none",cursor:"pointer",
              background:active?"hsl(var(--background))":"transparent",
              color:active?"hsl(var(--foreground))":"hsl(var(--muted-foreground))",
              boxShadow:active?"0 1px 3px rgba(0,0,0,.12)":"none",
              transition:"all .15s",
            }}>{item}</button>
          );
        })}
      </div>
    );
  }

  function UnderTabs({value, onChange, items}) {
    return (
      <div style={{display:"flex",gap:0,borderBottom:"1px solid hsl(var(--border))",overflowX:"auto"}}>
        {items.map(item => {
          const id = item.toLowerCase();
          const active = value === id;
          return (
            <button key={id} onClick={() => onChange(id)} style={{
              display:"inline-flex",alignItems:"center",
              padding:"8px 14px",fontSize:13,fontWeight:active?500:400,
              border:"none",borderBottom:active?"2px solid hsl(var(--primary))":"2px solid transparent",
              marginBottom:-1,cursor:"pointer",background:"transparent",whiteSpace:"nowrap",
              color:active?"hsl(var(--foreground))":"hsl(var(--muted-foreground))",
              transition:"all .15s",
            }}>{item}</button>
          );
        })}
      </div>
    );
  }

  return (
    <>
      <h1 className="os-h1">탭</h1>
      <p className="os-lede">두 가지 탭 변형 — 세그먼트형은 섹션 내 옵션 전환에, 언더라인형은 페이지 수준 네비게이션에 사용합니다.</p>

      <Section title="세그먼트형">
        <div className="os-card" style={{display:"flex",flexDirection:"column",gap:12}}>
          <p style={{fontSize:13,color:"hsl(var(--muted-foreground))"}}>카드나 패널 내에서 뷰를 전환할 때 사용합니다. 뮤트된 pill 컨테이너가 무거운 크롬 없이 시각적 그룹핑을 제공합니다.</p>
          <SegTabs value={seg} onChange={setSeg} items={SEG_TABS}/>
          <div style={{padding:"12px 0 4px",fontSize:13,color:"hsl(var(--muted-foreground))"}}>
            활성: <strong style={{color:"hsl(var(--foreground))"}}>{seg}</strong>
          </div>
        </div>
      </Section>

      <Section title="언더라인형">
        <div className="os-card" style={{display:"flex",flexDirection:"column",gap:12}}>
          <p style={{fontSize:13,color:"hsl(var(--muted-foreground))"}}>페이지 수준 네비게이션(서비스 상세 페이지, 설정)에 사용합니다. 활성 탭은 Primary 색상으로 밑줄이 그어져 — 높은 가시성, 낮은 시각적 무게감.</p>
          <UnderTabs value={under} onChange={setUnder} items={UNDER_TABS}/>
          <div style={{padding:"8px 0 4px",fontSize:13,color:"hsl(var(--muted-foreground))"}}>
            활성: <strong style={{color:"hsl(var(--foreground))"}}>{under}</strong>
          </div>
        </div>
      </Section>

      <Section title="언제 어떤 것을 사용하는가">
        <div className="os-card">
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,fontSize:13}}>
            <div style={{padding:14,border:"1px solid hsl(var(--border))",borderRadius:6}}>
              <div style={{fontWeight:600,marginBottom:8}}>세그먼트형</div>
              <ul style={{margin:0,paddingLeft:16,color:"hsl(var(--muted-foreground))",lineHeight:1.9}}>
                <li>최대 2~5개 항목</li>
                <li>패널 내 모드 전환</li>
                <li>제공자 / 소스 타입 선택기</li>
                <li>필터 토글</li>
              </ul>
            </div>
            <div style={{padding:14,border:"1px solid hsl(var(--border))",borderRadius:6}}>
              <div style={{fontWeight:600,marginBottom:8}}>언더라인형</div>
              <ul style={{margin:0,paddingLeft:16,color:"hsl(var(--muted-foreground))",lineHeight:1.9}}>
                <li>6개 이상 항목 또는 긴 레이블</li>
                <li>최상위 페이지 네비게이션</li>
                <li>서비스 상세 섹션</li>
                <li>설정 카테고리</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <Section title="명세">
        <table className="os-table">
          <thead><tr><th>속성</th><th>세그먼트형</th><th>언더라인형</th></tr></thead>
          <tbody>
            <tr><td>컨테이너 배경</td><td><code className="os-inline-code">--muted</code></td><td>투명, 하단 테두리</td></tr>
            <tr><td>활성 배경</td><td><code className="os-inline-code">--background</code> + 그림자</td><td>하단 테두리 (Primary)</td></tr>
            <tr><td>활성 텍스트</td><td><code className="os-inline-code">--foreground</code></td><td><code className="os-inline-code">--foreground</code></td></tr>
            <tr><td>비활성 텍스트</td><td><code className="os-inline-code">--muted-foreground</code></td><td><code className="os-inline-code">--muted-foreground</code></td></tr>
            <tr><td>모서리 반경</td><td>트리거 6px, 목록 8px</td><td>—</td></tr>
            <tr><td>높이</td><td>자동 (목록 p-1, 트리거 py-1.5)</td><td>자동 (트리거 py-2)</td></tr>
          </tbody>
        </table>
      </Section>
    </>
  );
}
