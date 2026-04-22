import React from 'react';
import Section from './Section.jsx';

export default function InputPage() {
  return (
    <>
      <h1 className="os-h1">인풋</h1>
      <p className="os-lede">한 줄 텍스트 입력. 기본 높이 32px — 버튼·배지 행 높이와 맞춰 폼이 자연스럽게 정렬됩니다.</p>

      <Section title="상태">
        <div className="os-block">
          <div className="os-block-body" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,maxWidth:640}}>
            <div>
              <label className="os-label">서비스 이름</label>
              <input className="os-input" defaultValue="onestack-api"/>
            </div>
            <div>
              <label className="os-label">포트</label>
              <input className="os-input" placeholder="예) 3000"/>
            </div>
            <div>
              <label className="os-label">도메인 <span className="os-muted">— 읽기 전용</span></label>
              <input className="os-input" defaultValue="api.onestack.run" readOnly style={{background:"hsl(var(--muted))"}}/>
            </div>
            <div>
              <label className="os-label" style={{color:"hsl(0 72% 45%)"}}>레플리카</label>
              <input className="os-input" defaultValue="abc" style={{borderColor:"hsl(0 72% 51%)",boxShadow:"0 0 0 3px hsl(0 72% 51% / .18)"}}/>
              <div style={{fontSize:11,color:"hsl(0 72% 45%)",marginTop:4}}>레플리카는 1~32 사이의 숫자여야 합니다.</div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
