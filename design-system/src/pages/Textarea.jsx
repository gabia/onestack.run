import React from 'react';
import Section from './Section.jsx';

export default function TextareaPage() {
  return (
    <>
      <h1 className="os-h1">텍스트에어리어</h1>
      <p className="os-lede">여러 줄 텍스트 입력. 인풋과 동일한 시각 언어를 공유합니다 — 흰 배경, 전면 테두리, Cobalt 포커스 링.</p>

      <Section title="상태">
        <div className="os-block">
          <div className="os-block-body" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,maxWidth:640}}>
            <div style={{gridColumn:"1/-1"}}>
              <label className="os-label">설명</label>
              <textarea className="os-input" rows={3} placeholder="프로젝트에 대한 설명..." style={{resize:"vertical"}}/>
            </div>
            <div style={{gridColumn:"1/-1"}}>
              <label className="os-label">노트 <span className="os-muted">— 읽기 전용</span></label>
              <textarea className="os-input" rows={3} readOnly defaultValue="이 필드는 읽기 전용으로 수정할 수 없습니다." style={{background:"hsl(var(--muted))",cursor:"default",resize:"none"}}/>
            </div>
            <div style={{gridColumn:"1/-1"}}>
              <label className="os-label" style={{color:"hsl(0 72% 45%)"}}>설정</label>
              <textarea className="os-input" rows={3} defaultValue="invalid yaml: [" style={{borderColor:"hsl(0 72% 51%)",boxShadow:"0 0 0 3px hsl(0 72% 51% / .18)",resize:"vertical"}}/>
              <div style={{fontSize:11,color:"hsl(0 72% 45%)",marginTop:4}}>잘못된 YAML 문법입니다.</div>
            </div>
          </div>
        </div>
      </Section>

      <Section title="명세">
        <table className="os-table">
          <thead><tr><th>속성</th><th>값</th></tr></thead>
          <tbody>
            <tr><td>배경</td><td><code className="os-inline-code">--background</code> (흰색 / 다크 기본)</td></tr>
            <tr><td>테두리</td><td><code className="os-inline-code">1px solid --border</code></td></tr>
            <tr><td>포커스 테두리</td><td><code className="os-inline-code">--ring</code> (Cobalt)</td></tr>
            <tr><td>포커스 그림자</td><td><code className="os-inline-code">0 0 0 3px --ring / 0.18</code></td></tr>
            <tr><td>읽기 전용 배경</td><td><code className="os-inline-code">--muted</code></td></tr>
            <tr><td>오류 테두리</td><td><code className="os-inline-code">--destructive</code> + 그림자</td></tr>
            <tr><td>모서리 반경</td><td><code className="os-inline-code">--radius − 2px</code> (6px)</td></tr>
            <tr><td>크기 조절</td><td>세로 방향만</td></tr>
          </tbody>
        </table>
      </Section>
    </>
  );
}
