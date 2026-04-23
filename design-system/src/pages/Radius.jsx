import React from 'react';
import Section from './Section.jsx';
import OS_TOKENS from '../../tokens.js';
const T = () => OS_TOKENS;

export default function RadiusPage() {
  const tk = T();

  const USAGE = {
    none: "테이블 셀, 인라인 코드 블록",
    sm:   "배지, 태그, 툴팁",
    md:   "인풋, 버튼, 드롭다운 항목",
    lg:   "카드, 모달, 팝오버",
    xl:   "대형 카드, 패널",
    pill: "상태 칩, 토글 스위치",
  };

  const COMPONENTS = [
    { label: "배지", r: 4,    w: 56,  h: 22, bg: "hsl(var(--primary) / .12)", color: "hsl(var(--primary))", text: "배포됨" },
    { label: "버튼", r: 6,    w: 80,  h: 32, bg: "hsl(var(--primary))", color: "#fff", text: "배포" },
    { label: "인풋", r: 6,    w: 160, h: 36, bg: "hsl(var(--background))", color: "hsl(var(--muted-foreground))", text: "서비스 이름", border: true },
    { label: "카드", r: 8,    w: 120, h: 64, bg: "hsl(var(--card))", color: "hsl(var(--foreground))", text: "카드", border: true },
    { label: "모달", r: 12,   w: 140, h: 80, bg: "hsl(var(--card))", color: "hsl(var(--foreground))", text: "다이얼로그", border: true },
    { label: "Pill", r: 9999, w: 72,  h: 24, bg: "hsl(var(--secondary))", color: "hsl(var(--secondary-foreground))", text: "실행 중" },
  ];

  return (
    <>
      <h1 className="os-h1">Border Radius</h1>
      <p className="os-lede">6개의 반경 토큰으로 컴포넌트 계층을 구분합니다. 작은 인터랙티브 요소는 작은 반경, 컨테이너는 큰 반경을 사용합니다.</p>

      <Section title="토큰">
        <div className="os-block">
          <div className="os-block-body">
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12}}>
              {tk.radius.map(r => {
                const px = r.name === "pill" ? 9999 : r.px;
                const display = r.name === "pill" ? "9999px" : `${r.px}px`;
                return (
                  <div key={r.name} style={{padding:16,border:"1px solid hsl(var(--border))",borderRadius:8,display:"flex",alignItems:"center",gap:14}}>
                    <div style={{width:48,height:48,flexShrink:0,background:"hsl(var(--primary) / .1)",border:"1.5px solid hsl(var(--primary) / .3)",borderRadius:px}}/>
                    <div>
                      <div style={{fontWeight:600,fontSize:13}}>radius-{r.name}</div>
                      <div style={{fontSize:12,color:"hsl(var(--muted-foreground))",marginTop:2}}>{display}</div>
                      <div style={{fontSize:11,color:"hsl(var(--muted-foreground))",marginTop:4}}>{USAGE[r.name]}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Section>

      <Section title="컴포넌트 적용 예시">
        <div className="os-card">
          <div style={{display:"flex",flexWrap:"wrap",gap:24,alignItems:"flex-end"}}>
            {COMPONENTS.map(c => (
              <div key={c.label} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:8}}>
                <div style={{width:c.w,height:c.h,borderRadius:c.r,background:c.bg,color:c.color,border:c.border?"1px solid hsl(var(--border))":"none",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:500}}>{c.text}</div>
                <div style={{fontSize:11,color:"hsl(var(--muted-foreground))"}}>{c.label}</div>
                <div style={{fontSize:11,color:"hsl(var(--muted-foreground))"}}>{c.r===9999?"pill":`${c.r}px`}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section title="사용 원칙">
        <div className="os-card">
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,fontSize:13}}>
            <div style={{padding:14,border:"1px solid hsl(var(--border))",borderRadius:6}}>
              <div style={{fontWeight:600,marginBottom:8}}>✓ 올바른 사용</div>
              <ul style={{margin:0,paddingLeft:16,color:"hsl(var(--muted-foreground))",lineHeight:1.9}}>
                <li>인풋과 버튼은 동일한 반경(md·6px) 사용</li>
                <li>카드 안의 이미지는 카드보다 작은 반경</li>
                <li>상태 칩·태그류는 pill 또는 sm</li>
                <li>모달은 lg 이상(8–12px)</li>
              </ul>
            </div>
            <div style={{padding:14,border:"1px solid hsl(var(--border))",borderRadius:6}}>
              <div style={{fontWeight:600,marginBottom:8}}>✗ 피해야 할 것</div>
              <ul style={{margin:0,paddingLeft:16,color:"hsl(var(--muted-foreground))",lineHeight:1.9}}>
                <li>같은 레벨 컴포넌트에 다른 반경 혼용</li>
                <li>인풋에 pill 반경 (폼 맥락에 부적합)</li>
                <li>임의의 px 값 직접 입력</li>
                <li>테이블 셀에 큰 반경 적용</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
