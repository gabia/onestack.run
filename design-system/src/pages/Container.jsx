import React from 'react';
import Section from './Section.jsx';

export default function ContainerPage() {
  return (
    <>
      <h1 className="os-h1">패턴 · 페이지 컨테이너</h1>
      <p className="os-lede">대부분의 관리 페이지에서 사용하는 2-레이어 컨테이너 패턴. 사이드바 배경 프레임 안에 흰색(다크: 카드) 콘텐츠 영역을 배치합니다.</p>

      <Section title="미리보기">
        <div className="os-block">
          <div className="os-block-body" style={{padding:24}}>
            <div style={{background:"hsl(var(--sidebar-background))",borderRadius:8,padding:4}}>
              <div style={{background:"hsl(var(--background))",borderRadius:12,boxShadow:"0 1px 3px 0 rgb(0 0 0/.1),0 1px 2px -1px rgb(0 0 0/.1)",padding:20,minHeight:100}}>
                <div style={{display:"flex",flexDirection:"column",gap:8}}>
                  <div style={{height:12,width:140,background:"hsl(var(--muted))",borderRadius:4}}/>
                  <div style={{height:8,width:200,background:"hsl(var(--muted))",borderRadius:4,opacity:.6}}/>
                  <div style={{height:8,width:160,background:"hsl(var(--muted))",borderRadius:4,opacity:.6}}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section title="해부">
        <div className="os-block">
          <table className="os-table">
            <thead><tr><th>레이어</th><th>클래스</th><th>역할</th></tr></thead>
            <tbody>
              <tr>
                <td style={{fontWeight:600}}>외부 프레임</td>
                <td><code className="os-inline-code">bg-sidebar rounded-lg</code></td>
                <td className="os-muted">사이드바와 연결되는 배경 프레임. 패딩 없음.</td>
              </tr>
              <tr>
                <td style={{fontWeight:600}}>내부 콘텐츠</td>
                <td><code className="os-inline-code">bg-background rounded-xl shadow-md</code></td>
                <td className="os-muted">실제 콘텐츠 영역. 라이트: 흰색, 다크: 카드 배경.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="코드">
        <div className="os-block">
          <div className="os-block-body" style={{padding:16,background:"hsl(var(--muted))",fontFamily:"'JetBrains Mono',monospace",fontSize:12,lineHeight:1.8}}>
            <div style={{color:"hsl(var(--muted-foreground))"}}>{"// Card: 외부 프레임"}</div>
            <div>{"<Card className=\"h-full bg-sidebar rounded-lg\">"}</div>
            <div style={{paddingLeft:16}}>{"<div className=\"rounded-xl bg-background shadow-md\">"}</div>
            <div style={{paddingLeft:32,color:"hsl(var(--muted-foreground))"}}>{"// 페이지 내용"}</div>
            <div style={{paddingLeft:16}}>{"</div>"}</div>
            <div>{"</Card>"}</div>
          </div>
        </div>
      </Section>
    </>
  );
}
