import React from 'react';
import Section from './Section.jsx';

export default function LinkButtonPage() {
  return (
    <>
      <h1 className="os-h1">링크 버튼</h1>
      <p className="os-lede">텍스트 링크처럼 보이지만 버튼 기능을 수행하거나, 인라인에서 가벼운 액션을 수행할 때 사용합니다.</p>

      <Section title="변형">
        <div className="os-block">
          <div className="os-block-body">
            <div className="os-row" style={{gap:32}}>
              <button className="os-link-btn">디자인 시스템 보기</button>
              <button className="os-link-btn os-link-btn-muted">나중에 하기</button>
              <button className="os-link-btn os-link-btn-danger">초기화</button>
            </div>
          </div>
        </div>
      </Section>

      <Section title="아이콘 조합">
        <div className="os-block">
          <div className="os-block-body">
            <div className="os-row" style={{gap:32}}>
              <button className="os-link-btn">
                <span>문서 읽기</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>
              </button>
              <button className="os-link-btn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                <span>이전으로</span>
              </button>
            </div>
          </div>
        </div>
      </Section>

      <Section title="사용 원칙">
        <div className="os-card">
          <ul style={{margin:0,paddingLeft:20,lineHeight:1.8,fontSize:13,color:"hsl(var(--muted-foreground))"}}>
            <li>페이지 내에서 위계가 낮은 보조 액션에 사용합니다.</li>
            <li>외부 링크로 이동하거나, 모달 내에서 '취소' 등의 액션을 취할 때 적합합니다.</li>
            <li>본문 텍스트 흐름 안에서 사용될 때는 일반 링크와 구분이 어려울 수 있으므로 주의합니다.</li>
          </ul>
        </div>
      </Section>

      <Section title="코드">
        <pre className="os-code">{`<button className="os-link-btn">Link Button</button>
<button className="os-link-btn os-link-btn-muted">Muted Action</button>
<button className="os-link-btn os-link-btn-danger">Destructive Action</button>`}</pre>
      </Section>
    </>
  );
}
