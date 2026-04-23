import React from 'react';

export default function EmptyState() {
  return (
    <>
      <h1 className="os-h1">패턴 · 빈 상태</h1>
      <p className="os-lede">빈 상태는 가득 찬 상태만큼 중요한 디자인 비중을 가집니다 — 사용자가 참여 여부를 결정하는 순간입니다.</p>
      <div className="os-block">
        <div className="os-block-body" style={{padding:60,textAlign:"center"}}>
          <div style={{width:48,height:48,borderRadius:10,border:"1px dashed hsl(var(--border))",margin:"0 auto 16px",display:"flex",alignItems:"center",justifyContent:"center",color:"hsl(var(--muted-foreground))",fontSize:22}}>◆</div>
          <div style={{fontSize:16,fontWeight:600,marginBottom:6}}>서비스가 없습니다</div>
          <div className="os-muted" style={{fontSize:13,maxWidth:360,margin:"0 auto 20px"}}>Git 저장소를 연결하거나 Docker 이미지를 입력해 첫 번째 서비스를 배포해 보세요.</div>
          <div className="os-row" style={{justifyContent:"center"}}>
            <button className="os-btn os-btn-primary">저장소 연결</button>
            <button className="os-btn os-btn-secondary">Docker 이미지 사용</button>
          </div>
        </div>
      </div>
    </>
  );
}
