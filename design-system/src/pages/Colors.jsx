import React from 'react';
import Section from './Section.jsx';
import OS_TOKENS from '../../tokens.js';
const T = () => OS_TOKENS;

function ColorRow({ title, shades }) {
  return (
    <>
      <div style={{fontWeight:600,fontSize:13,margin:"18px 0 10px"}}>{title}</div>
      <div className="os-swatches">
        {Object.entries(shades).map(([k, v]) => (
          <div key={k} className="os-swatch">
            <div className="os-swatch-chip" style={{background:v.hex}}/>
            <div className="os-swatch-meta">
              <div className="os-swatch-name">{title.toLowerCase()}/{k}</div>
              <div className="os-swatch-hex">{v.hex}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default function Colors() {
  const tk = T();
  return (
    <>
      <h1 className="os-h1">색상</h1>
      <p className="os-lede">
        중립색이 인터페이스를 구성하고, 브랜드색은 액션·포커스·선택 영역에서 주목을 얻는다.
        의미론적 색상은 상태에만 사용하며 — 장식 목적으로는 절대 사용하지 않는다.
      </p>

      <Section title="브랜드 & 중립색">
        <ColorRow title="Brand" shades={tk.palette.brand} />
        <ColorRow title="Neutral" shades={tk.palette.neutral} />
      </Section>

      <Section title="의미론적 상태">
        <div className="os-row" style={{gap:24,marginTop:8}}>
          {["success","warning","danger","info"].map(k => (
            <div key={k} style={{flex:"1 1 140px"}}>
              <div style={{fontSize:12,fontWeight:500,marginBottom:6,textTransform:"capitalize"}}>{k}</div>
              <div style={{display:"flex",gap:6}}>
                {Object.entries(tk.palette[k]).map(([s, v]) => (
                  <div key={s} style={{flex:1}}>
                    <div style={{background:v.hex,height:48,borderRadius:6,border:"1px solid hsl(var(--border))"}}/>
                    <div style={{fontSize:10,fontFamily:"'JetBrains Mono',monospace",color:"hsl(var(--muted-foreground))",marginTop:4}}>{v.hex}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="의미론적 토큰 (shadcn CSS 변수)">
        <p className="os-p" style={{marginBottom:12}}>
          컴포넌트가 사용해야 할 유일한 색상 변수입니다. 위의 팔레트는 원본 소스입니다.
        </p>
        <div className="os-block">
          <div className="os-block-head"><span className="os-mono">:root — light</span></div>
          <table className="os-table">
            <tbody>
              {Object.entries(tk.semantic.light).filter(([k])=>k.startsWith("--")&&!k.includes("sidebar")&&k!=="--radius").map(([k,v]) => (
                <tr key={k}>
                  <td className="os-mono" style={{width:260}}>{k}</td>
                  <td className="os-mono os-muted">{v}</td>
                  <td style={{width:40}}><div style={{width:20,height:20,borderRadius:4,border:"1px solid hsl(var(--border))",background:`hsl(${v})`}}/></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </>
  );
}
