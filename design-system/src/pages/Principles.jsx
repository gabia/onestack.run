import React from 'react';
import Section from './Section.jsx';

export default function Principles() {
  const items = [
    { t: "01 — 밀도는 기능이다", d: "운영 사용자는 작업 화면에 여백을 원하지 않는다. 본문 13/14px, 좁은 행 높이, 상태를 위한 표형 숫자." },
    { t: "02 — 다크 모드는 부가 기능이 아니다", d: "모든 토큰은 처음부터 두 모드 모두에서 정의된다. 라이트보다 다크를 먼저 테스트하라." },
    { t: "03 — 상태는 색만이 아닌 형태를 가진다", d: "색각 이상자와 스크린샷 환경 모두에서 접근 가능해야 한다. 형태 + 레이블 + 색 — 색만으로는 안 된다." },
    { t: "04 — 움직임은 인과를 설명한다", d: "전환 애니메이션은 무엇이 무엇을 유발했는지를 보여준다. 운영 도구에서 idle 애니메이션은 노이즈다." },
    { t: "05 — 텍스트도 UI다", d: "레이블, 오류 상태, 빈 상태는 나중에 작성하는 것이 아니라 설계한다. 짧고, 명령형으로, 터미널 친화적으로." },
  ];
  return (
    <>
      <h1 className="os-h1">원칙</h1>
      <p className="os-lede">모든 컴포넌트와 패턴이 따라야 할 다섯 가지 규칙.</p>
      <div style={{display:"grid",gap:12}}>
        {items.map(i => (
          <div key={i.t} className="os-card">
            <div style={{fontWeight:600,marginBottom:6,letterSpacing:"-.2px"}}>{i.t}</div>
            <div className="os-muted" style={{fontSize:13.5,lineHeight:1.6}}>{i.d}</div>
          </div>
        ))}
      </div>
    </>
  );
}
