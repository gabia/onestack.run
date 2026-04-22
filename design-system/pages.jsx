// All doc pages. Each exported as window.OS_PAGES[id].
// Intentionally keep them data-driven to stay small.
import React from 'react';
import OS_TOKENS from './tokens.js';

const T = () => OS_TOKENS;

function Section({ title, children, id }) {
  return (
    <section id={id}>
      <h2 className="os-h2">{title}</h2>
      {children}
    </section>
  );
}

// ── Introduction ─────────────────────────────────
function Introduction() {
  return (
    <>
      <div className="os-hero">
        <span className="os-hero-badge">v0.1.0 · design.onestack.run</span>
        <h1 className="os-h1">OneStack Design System</h1>
        <p className="os-lede">
          gabia 배포 플랫폼의 내부 언어. shadcn/ui 기초 위에 구축되어,
          테이블·로그·배포 이력·실시간 상태 등 밀도 높은 운영 화면에 최적화되어 있습니다.
        </p>
        <div className="os-row">
          <a className="os-btn os-btn-primary" href="#/colors" onClick={e=>{e.preventDefault();location.hash="#/colors";}}>기초 살펴보기</a>
          <a className="os-btn os-btn-secondary" href="#/dashboard" onClick={e=>{e.preventDefault();location.hash="#/dashboard";}}>적용 사례 보기</a>
        </div>
      </div>

      <div className="os-stats">
        <div className="os-stat"><div className="os-stat-label">토큰</div><div className="os-stat-val">86</div></div>
        <div className="os-stat"><div className="os-stat-label">컴포넌트</div><div className="os-stat-val">24</div></div>
        <div className="os-stat"><div className="os-stat-label">패턴</div><div className="os-stat-val">9</div></div>
        <div className="os-stat"><div className="os-stat-label">테마</div><div className="os-stat-val">2</div></div>
      </div>

      <Section title="이게 무엇인가">
        <p className="os-p">
          OneStack은 Dokploy의 shadcn/ui 기반을 gabia에 맞게 재테마링하고,
          배포 플랫폼의 밀도 높고 스캔 위주의 UI에 최적화한 포크입니다. CSS 변수 세트,
          Tailwind 설정, React 컴포넌트 라이브러리로 제공되며 — Dokploy 코드베이스가 이미
          사용하는 요소들이므로, 구현 경로는 전체 재작성이 아닌 토큰 교체입니다.
        </p>
      </Section>

      <Section title="세 가지 기둥">
        <div className="os-grid-3">
          {[
            { t: "읽기 전에 스캔하라", d: "사용자는 분류 중이다. 강한 위계, 한눈에 보이는 상태, 시선을 느리게 하지 않고 영역을 구분하는 여백이 필요하다." },
            { t: "절제를 통한 신뢰", d: "강조색 하나, 의미론적 상태, 모노크롬 크롬. 색은 주목을 얻는 것이지 장식이 아니다." },
            { t: "구현 충실도", d: "모든 토큰은 shadcn CSS 변수에 매핑된다. Figma와 코드는 구조적으로 일치한다." },
          ].map(x => (
            <div key={x.t} className="os-card">
              <div style={{fontWeight:600,marginBottom:6}}>{x.t}</div>
              <div className="os-muted" style={{fontSize:13,lineHeight:1.55}}>{x.d}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="이 사이트 활용법">
        <p className="os-p">
          <span className="os-inline-code">기초</span>는 색상·타이포그래피·간격·반경 등 원시 요소를 정의합니다.
          <span className="os-inline-code">컴포넌트</span>는 각 요소의 실제 적용 모습과 사용 가이드, 코드를 보여줍니다.
          <span className="os-inline-code">패턴</span>은 이것들을 조합해 배포 플랫폼의 실제 화면으로 구성합니다.
        </p>
      </Section>
    </>
  );
}

// ── Principles ───────────────────────────────────
function Principles() {
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

// ── Colors ───────────────────────────────────────
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

function Colors() {
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

// ── Typography ──────────────────────────────────
function Typography() {
  const tk = T();
  return (
    <>
      <h1 className="os-h1">타이포그래피</h1>
      <p className="os-lede">
        UI 텍스트는 Pretendard, 터미널에서 입력하는 모든 것(ID, 경로, 명령어, 로그)은 JetBrains Mono를 사용합니다.
      </p>

      <Section title="서체">
        <div className="os-grid-2">
          <div className="os-card">
            <div className="os-muted" style={{fontSize:11,textTransform:"uppercase",letterSpacing:".06em"}}>Sans — UI</div>
            <div style={{fontFamily:"'Pretendard Variable','Pretendard',sans-serif",fontSize:28,fontWeight:600,letterSpacing:"-.5px",marginTop:8}}>Pretendard</div>
            <div className="os-muted" style={{fontSize:12,marginTop:4}}>400 · 500 · 600 · 700 · 한글 최적화</div>
          </div>
          <div className="os-card">
            <div className="os-muted" style={{fontSize:11,textTransform:"uppercase",letterSpacing:".06em"}}>Mono — 코드 & 데이터</div>
            <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:24,fontWeight:500,marginTop:8}}>JetBrains Mono</div>
            <div className="os-muted" style={{fontSize:12,marginTop:4}}>400 · 500 · 고정폭, 슬래시 0</div>
          </div>
        </div>
      </Section>

      <Section title="크기 체계">
        <div className="os-block">
          <div className="os-block-body" style={{padding:"8px 24px"}}>
            {tk.typography.scale.map(s => (
              <div key={s.name} className="os-type-row">
                <div className="os-type-name">{s.name}</div>
                <div style={{fontSize:s.px,lineHeight:s.lh+"px",fontWeight:s.weight,letterSpacing: s.px>20?"-.4px":"-.1px"}}>
                  빠른 갈색 여우가 게으른 개를 뛰어넘습니다
                </div>
                <div className="os-type-meta">{s.px}/{s.lh} · {s.weight} · {s.usage}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}

// ── Spacing & Radius ─────────────────────────────
function SpacingPage() {
  const tk = T();
  return (
    <>
      <h1 className="os-h1">간격 & 반경</h1>
      <p className="os-lede">
        신중하게 선택한 중간 단계를 포함한 2/4/8 기반 스케일. 12px이 기본 거터이며,
        20px과 32px이 대부분의 레이아웃 구성을 담당합니다.
      </p>

      <Section title="간격 체계">
        <div className="os-block">
          <div className="os-block-body">
            {tk.spacing.map(s => (
              <div key={s.name} className="os-space-row">
                <div className="os-space-name">space-{s.name}</div>
                <div className="os-space-val">{s.px}px</div>
                <div className="os-space-bar" style={{width: Math.max(s.px,1)+"px"}}/>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section title="반경">
        <div className="os-radius-grid">
          {tk.radius.map(r => (
            <div key={r.name} className="os-radius-cell">
              <div className="os-radius-chip" style={{borderRadius:r.name==="pill"?9999:r.px}}/>
              <div className="os-radius-name">radius-{r.name}</div>
              <div className="os-radius-val">{r.name==="pill"?"9999px":r.px+"px"}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="그림자">
        <div className="os-grid-3">
          {tk.shadow.map(s => (
            <div key={s.name} style={{padding:24,background:"hsl(var(--background))",borderRadius:8,border:"1px solid hsl(var(--border))"}}>
              <div style={{height:64,background:"hsl(var(--card))",borderRadius:6,boxShadow:s.css,border:"1px solid hsl(var(--border))"}}/>
              <div style={{marginTop:10,fontSize:12,fontWeight:500}}>shadow-{s.name}</div>
              <div className="os-muted" style={{fontSize:11}}>{s.usage}</div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}

// ── Icons (placeholder) ──────────────────────────
function Icons() {
  const names = ["server","database","deploy","logs","metrics","shield","key","bell","search","settings","branch","terminal","container","cloud","user","chart","lock","refresh"];
  return (
    <>
      <h1 className="os-h1">아이콘</h1>
      <p className="os-lede">
        Lucide가 기본 아이콘 세트입니다 — 1.5px 선폭, 16px 및 20px 그리드.
        운영 아이콘(배포, 컨테이너, 노드)도 일관성을 위해 동일한 선폭을 사용합니다.
      </p>
      <div style={{display:"grid",gridTemplateColumns:"repeat(8,1fr)",gap:8}}>
        {names.map(n => (
          <div key={n} style={{padding:14,border:"1px solid hsl(var(--border))",borderRadius:6,textAlign:"center"}}>
            <div style={{width:20,height:20,margin:"0 auto 8px",borderRadius:4,border:"1.5px solid hsl(var(--muted-foreground))"}}/>
            <div className="os-muted" style={{fontSize:11,fontFamily:"'JetBrains Mono',monospace"}}>{n}</div>
          </div>
        ))}
      </div>
    </>
  );
}

// ── Button ───────────────────────────────────────
function ButtonPage() {
  return (
    <>
      <h1 className="os-h1">버튼</h1>
      <p className="os-lede">사용자가 시작하는 액션. 각 영역에서 가장 중요한 단일 액션에 Primary를 사용하고, 그 외는 Secondary 또는 Ghost를 사용합니다.</p>

      <Section title="변형">
        <div className="os-block">
          <div className="os-block-body">
            <div className="os-row">
              <button className="os-btn os-btn-primary">배포</button>
              <button className="os-btn os-btn-secondary">로그 보기</button>
              <button className="os-btn os-btn-outline">취소</button>
              <button className="os-btn os-btn-ghost">닫기</button>
              <button className="os-btn os-btn-danger">서비스 삭제</button>
            </div>
          </div>
        </div>
      </Section>

      <Section title="크기">
        <div className="os-block">
          <div className="os-block-body">
            <div className="os-row">
              <button className="os-btn os-btn-primary os-btn-sm">소형</button>
              <button className="os-btn os-btn-primary">기본</button>
              <button className="os-btn os-btn-primary os-btn-lg">대형</button>
            </div>
          </div>
        </div>
      </Section>

      <Section title="사용 예시">
        <pre className="os-code">{`<Button variant="primary">Deploy</Button>
<Button variant="secondary">View logs</Button>
<Button variant="danger">Delete service</Button>`}</pre>
      </Section>
    </>
  );
}

// ── Link Button ──────────────────────────────────
function LinkButtonPage() {
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

// ── Input ────────────────────────────────────────
function InputPage() {
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

// ── Select / Combobox ────────────────────────────
function SelectPage() {
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

// ── Textarea ─────────────────────────────────────
function TextareaPage() {
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

// ── Tabs ──────────────────────────────────────────
function TabPage() {
  const [seg, setSeg] = React.useState("general");
  const [under, setUnder] = React.useState("general");

  const SEG_TABS = ["일반", "환경 변수", "도메인", "고급"];
  const UNDER_TABS = ["일반", "환경 변수", "도메인", "배포", "로그", "고급"];

  function SegTabs({value, onChange, items}) {
    return (
      <div style={{
        display:"inline-flex", gap:4, background:"hsl(var(--muted))",
        padding:4, borderRadius:8, flexWrap:"wrap",
      }}>
        {items.map(item => {
          const id = item.toLowerCase();
          const active = value === id;
          return (
            <button key={id} onClick={() => onChange(id)} style={{
              display:"inline-flex", alignItems:"center", gap:6,
              padding:"5px 12px", fontSize:13, fontWeight:500,
              borderRadius:6, border:"none", cursor:"pointer",
              background: active ? "hsl(var(--background))" : "transparent",
              color: active ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))",
              boxShadow: active ? "0 1px 3px rgba(0,0,0,.12)" : "none",
              transition:"all .15s",
            }}>{item}</button>
          );
        })}
      </div>
    );
  }

  function UnderTabs({value, onChange, items}) {
    return (
      <div style={{
        display:"flex", gap:0, borderBottom:"1px solid hsl(var(--border))",
        overflowX:"auto",
      }}>
        {items.map(item => {
          const id = item.toLowerCase();
          const active = value === id;
          return (
            <button key={id} onClick={() => onChange(id)} style={{
              display:"inline-flex", alignItems:"center",
              padding:"8px 14px", fontSize:13, fontWeight: active ? 500 : 400,
              border:"none", borderBottom: active ? "2px solid hsl(var(--primary))" : "2px solid transparent",
              marginBottom:-1,
              cursor:"pointer", background:"transparent", whiteSpace:"nowrap",
              color: active ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))",
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

// ── Border Radius ─────────────────────────────────
function RadiusPage() {
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
            <div style={{display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12}}>
              {tk.radius.map(r => {
                const px = r.name === "pill" ? 9999 : r.px;
                const display = r.name === "pill" ? "9999px" : `${r.px}px`;
                return (
                  <div key={r.name} style={{
                    padding:16, border:"1px solid hsl(var(--border))",
                    borderRadius:8, display:"flex", alignItems:"center", gap:14,
                  }}>
                    <div style={{
                      width:48, height:48, flexShrink:0,
                      background:"hsl(var(--primary) / .1)",
                      border:"1.5px solid hsl(var(--primary) / .3)",
                      borderRadius: px,
                    }}/>
                    <div>
                      <div style={{fontWeight:600, fontSize:13}}>radius-{r.name}</div>
                      <div style={{fontSize:12, color:"hsl(var(--muted-foreground))", marginTop:2}}>{display}</div>
                      <div style={{fontSize:11, color:"hsl(var(--muted-foreground))", marginTop:4}}>{USAGE[r.name]}</div>
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
          <div style={{display:"flex", flexWrap:"wrap", gap:24, alignItems:"flex-end"}}>
            {COMPONENTS.map(c => (
              <div key={c.label} style={{display:"flex", flexDirection:"column", alignItems:"center", gap:8}}>
                <div style={{
                  width:c.w, height:c.h,
                  borderRadius:c.r,
                  background:c.bg,
                  color:c.color,
                  border: c.border ? "1px solid hsl(var(--border))" : "none",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:12, fontWeight:500,
                }}>{c.text}</div>
                <div style={{fontSize:11, color:"hsl(var(--muted-foreground))"}}>
                  {c.label}
                </div>
                <div style={{fontSize:11, color:"hsl(var(--muted-foreground))"}}>
                  {c.r === 9999 ? "pill" : `${c.r}px`}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section title="사용 원칙">
        <div className="os-card">
          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, fontSize:13}}>
            <div style={{padding:14, border:"1px solid hsl(var(--border))", borderRadius:6}}>
              <div style={{fontWeight:600, marginBottom:8}}>✓ 올바른 사용</div>
              <ul style={{margin:0, paddingLeft:16, color:"hsl(var(--muted-foreground))", lineHeight:1.9}}>
                <li>인풋과 버튼은 동일한 반경(md·6px) 사용</li>
                <li>카드 안의 이미지는 카드보다 작은 반경</li>
                <li>상태 칩·태그류는 pill 또는 sm</li>
                <li>모달은 lg 이상(8–12px)</li>
              </ul>
            </div>
            <div style={{padding:14, border:"1px solid hsl(var(--border))", borderRadius:6}}>
              <div style={{fontWeight:600, marginBottom:8}}>✗ 피해야 할 것</div>
              <ul style={{margin:0, paddingLeft:16, color:"hsl(var(--muted-foreground))", lineHeight:1.9}}>
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

// ── Badge ────────────────────────────────────────
function BadgePage() {
  return (
    <>
      <h1 className="os-h1">배지</h1>
      <p className="os-lede">간결한 상태 마커. 모든 상태는 점 형태·의미론적 색상·레이블을 가집니다 — 색상만으로는 안 됩니다.</p>
      <Section title="상태">
        <div className="os-block">
          <div className="os-block-body">
            <div className="os-row">
              <span className="os-badge os-badge-success"><span className="os-badge-dot" style={{background:"hsl(142 71% 36%)"}}/>실행 중</span>
              <span className="os-badge os-badge-info"><span className="os-badge-dot" style={{background:"hsl(204 100% 38%)"}}/>배포 중</span>
              <span className="os-badge os-badge-warning"><span className="os-badge-dot" style={{background:"hsl(38 92% 50%)"}}/>성능 저하</span>
              <span className="os-badge os-badge-danger"><span className="os-badge-dot" style={{background:"hsl(0 72% 51%)"}}/>실패</span>
              <span className="os-badge"><span className="os-badge-dot" style={{background:"hsl(var(--muted-foreground))"}}/>대기</span>
            </div>
          </div>
        </div>
      </Section>
      <Section title="중립 & 수량">
        <div className="os-block">
          <div className="os-block-body">
            <div className="os-row">
              <span className="os-badge">main</span>
              <span className="os-badge os-mono">v0.29.1</span>
              <span className="os-badge">레플리카 12개</span>
              <span className="os-badge">프로덕션</span>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

// ── Card ─────────────────────────────────────────
function CardPage() {
  return (
    <>
      <h1 className="os-h1">카드</h1>
      <p className="os-lede">서비스·배포·메트릭 등 독립된 정보 단위를 담습니다. 레이아웃 도구로 사용하지 않습니다.</p>
      <Section title="서비스 카드">
        <div className="os-grid-3">
          {[
            {n:"onestack-api", s:"실행 중", env:"prod", b:"main", c:"#42a"},
            {n:"onestack-web", s:"배포 중", env:"prod", b:"release/1.4", c:"info"},
            {n:"metrics-ingest", s:"실패", env:"stage", b:"fix/oom", c:"danger"},
          ].map(x => (
            <div key={x.n} className="os-card">
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                <div style={{fontWeight:600,fontSize:14}}>{x.n}</div>
                <span className={"os-badge os-badge-"+(x.s==="실행 중"?"success":x.s==="배포 중"?"info":"danger")}>
                  <span className="os-badge-dot" style={{background:"currentColor"}}/>{x.s}
                </span>
              </div>
              <div className="os-muted" style={{fontSize:12,marginTop:6,fontFamily:"'JetBrains Mono',monospace"}}>{x.env} · {x.b}</div>
              <div style={{display:"flex",gap:16,marginTop:14,fontSize:12}}>
                <div><div className="os-muted" style={{fontSize:10,textTransform:"uppercase",letterSpacing:".05em"}}>CPU</div><div style={{fontWeight:500,fontVariantNumeric:"tabular-nums"}}>12%</div></div>
                <div><div className="os-muted" style={{fontSize:10,textTransform:"uppercase",letterSpacing:".05em"}}>MEM</div><div style={{fontWeight:500,fontVariantNumeric:"tabular-nums"}}>241 MB</div></div>
                <div><div className="os-muted" style={{fontSize:10,textTransform:"uppercase",letterSpacing:".05em"}}>Replicas</div><div style={{fontWeight:500,fontVariantNumeric:"tabular-nums"}}>3/3</div></div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}

// ── Table ────────────────────────────────────────
function TablePage() {
  const rows = [
    {name:"onestack-api", status:"실행 중", env:"prod", branch:"main", replicas:"3/3", cpu:"12%", age:"4일"},
    {name:"onestack-web", status:"배포 중", env:"prod", branch:"release/1.4", replicas:"2/3", cpu:"—", age:"2분"},
    {name:"metrics-ingest", status:"실패", env:"stage", branch:"fix/oom", replicas:"0/2", cpu:"—", age:"12분"},
    {name:"auth-gateway", status:"실행 중", env:"prod", branch:"main", replicas:"4/4", cpu:"8%", age:"14일"},
    {name:"image-registry", status:"성능 저하", env:"prod", branch:"main", replicas:"2/3", cpu:"34%", age:"21일"},
  ];
  const cls = (s) => s==="실행 중"?"success":s==="배포 중"?"info":s==="실패"?"danger":s==="성능 저하"?"warning":"";
  return (
    <>
      <h1 className="os-h1">테이블</h1>
      <p className="os-lede">운영 화면의 핵심 컴포넌트. 좁은 행 높이, 대문자 마이크로 레이블, 표형 숫자.</p>
      <div className="os-block">
        <table className="os-table">
          <thead>
            <tr><th>서비스</th><th>상태</th><th>환경</th><th>브랜치</th><th>레플리카</th><th>CPU</th><th>경과</th></tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.name}>
                <td style={{fontWeight:500}}>{r.name}</td>
                <td><span className={"os-badge os-badge-"+cls(r.status)}><span className="os-badge-dot" style={{background:"currentColor"}}/>{r.status}</span></td>
                <td className="os-mono os-muted">{r.env}</td>
                <td className="os-mono os-muted">{r.branch}</td>
                <td style={{fontVariantNumeric:"tabular-nums"}}>{r.replicas}</td>
                <td style={{fontVariantNumeric:"tabular-nums"}}>{r.cpu}</td>
                <td className="os-muted" style={{fontVariantNumeric:"tabular-nums"}}>{r.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

// ── Patterns: Dashboard ─────────────────────────
function DashboardPattern() {
  const projects = [
    {n:"OneStack Core", desc:"플랫폼 서비스", svc:"12", env:"production", status:"정상"},
    {n:"Internal Tools", desc:"어드민, 대시보드, CMS", svc:"8", env:"production", status:"정상"},
    {n:"Data Platform", desc:"ETL, 데이터 웨어하우스, 큐", svc:"6", env:"staging", status:"성능 저하"},
    {n:"ML Services", desc:"모델 추론 & 학습", svc:"4", env:"staging", status:"정상"},
  ];
  return (
    <>
      <h1 className="os-h1">패턴 · 대시보드</h1>
      <p className="os-lede">프로젝트 개요 — 로그인 후 랜딩 화면. 카드·배지·상태 점·서비스 테이블을 조합합니다.</p>

      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:16}}>
        <div>
          <div style={{fontSize:18,fontWeight:600,letterSpacing:"-.2px"}}>프로젝트</div>
          <div className="os-muted" style={{fontSize:12,marginTop:2}}>4개 프로젝트 · 총 30개 서비스</div>
        </div>
        <div className="os-row">
          <button className="os-btn os-btn-secondary os-btn-sm">필터</button>
          <button className="os-btn os-btn-primary os-btn-sm">+ 새 프로젝트</button>
        </div>
      </div>

      <div className="os-grid-2" style={{marginBottom:32}}>
        {projects.map(p => (
          <div key={p.n} className="os-card" style={{padding:18}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
              <div>
                <div style={{fontWeight:600,fontSize:14}}>{p.n}</div>
                <div className="os-muted" style={{fontSize:12,marginTop:2}}>{p.desc}</div>
              </div>
              <span className={"os-badge os-badge-"+(p.status==="정상"?"success":"warning")}>
                <span className="os-badge-dot" style={{background:"currentColor"}}/>{p.status}
              </span>
            </div>
            <div style={{display:"flex",gap:20,marginTop:16,paddingTop:14,borderTop:"1px solid hsl(var(--border))",fontSize:12}}>
              <div><div className="os-muted" style={{fontSize:10,textTransform:"uppercase",letterSpacing:".06em"}}>서비스</div><div style={{fontWeight:500,fontVariantNumeric:"tabular-nums",marginTop:2}}>{p.svc}</div></div>
              <div><div className="os-muted" style={{fontSize:10,textTransform:"uppercase",letterSpacing:".06em"}}>환경</div><div style={{fontWeight:500,fontFamily:"'JetBrains Mono',monospace",marginTop:2}}>{p.env}</div></div>
              <div><div className="os-muted" style={{fontSize:10,textTransform:"uppercase",letterSpacing:".06em"}}>마지막 배포</div><div style={{fontWeight:500,fontVariantNumeric:"tabular-nums",marginTop:2}}>4분 전</div></div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="os-h2" style={{marginTop:0}}>전체 서비스</h2>
      {TablePage.__table?.() || null}
      <TableEmbed />
    </>
  );
}

function TableEmbed() {
  const rows = [
    {name:"onestack-api", status:"실행 중", env:"prod", branch:"main", replicas:"3/3", cpu:"12%", age:"4일"},
    {name:"onestack-web", status:"배포 중", env:"prod", branch:"release/1.4", replicas:"2/3", cpu:"—", age:"2분"},
    {name:"metrics-ingest", status:"실패", env:"stage", branch:"fix/oom", replicas:"0/2", cpu:"—", age:"12분"},
    {name:"auth-gateway", status:"실행 중", env:"prod", branch:"main", replicas:"4/4", cpu:"8%", age:"14일"},
    {name:"image-registry", status:"성능 저하", env:"prod", branch:"main", replicas:"2/3", cpu:"34%", age:"21일"},
    {name:"worker-jobs", status:"실행 중", env:"prod", branch:"main", replicas:"6/6", cpu:"21%", age:"8일"},
  ];
  const cls = (s) => s==="실행 중"?"success":s==="배포 중"?"info":s==="실패"?"danger":s==="성능 저하"?"warning":"";
  return (
    <div className="os-block">
      <table className="os-table">
        <thead><tr><th>서비스</th><th>상태</th><th>환경</th><th>브랜치</th><th>레플리카</th><th>CPU</th><th>경과</th></tr></thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.name}>
              <td style={{fontWeight:500}}>{r.name}</td>
              <td><span className={"os-badge os-badge-"+cls(r.status)}><span className="os-badge-dot" style={{background:"currentColor"}}/>{r.status}</span></td>
              <td className="os-mono os-muted">{r.env}</td>
              <td className="os-mono os-muted">{r.branch}</td>
              <td style={{fontVariantNumeric:"tabular-nums"}}>{r.replicas}</td>
              <td style={{fontVariantNumeric:"tabular-nums"}}>{r.cpu}</td>
              <td className="os-muted" style={{fontVariantNumeric:"tabular-nums"}}>{r.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Patterns: Empty state ───────────────────────
function EmptyState() {
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

// ── Pattern: Page Container ──────────────────────
function ContainerPage() {
  return (
    <>
      <h1 className="os-h1">패턴 · 페이지 컨테이너</h1>
      <p className="os-lede">대부분의 관리 페이지에서 사용하는 2-레이어 컨테이너 패턴. 사이드바 배경 프레임 안에 흰색(다크: 카드) 콘텐츠 영역을 배치합니다.</p>

      <Section title="미리보기">
        <div className="os-block">
          <div className="os-block-body" style={{padding:24}}>
            <div style={{
              background:"hsl(var(--sidebar-background))",
              borderRadius:8,
              padding:4,
            }}>
              <div style={{
                background:"hsl(var(--background))",
                borderRadius:12,
                boxShadow:"0 1px 3px 0 rgb(0 0 0/.1),0 1px 2px -1px rgb(0 0 0/.1)",
                padding:20,
                minHeight:100,
              }}>
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
          <div className="os-block-body" style={{
            padding:16,
            background:"hsl(var(--muted))",
            fontFamily:"'JetBrains Mono',monospace",
            fontSize:12,
            lineHeight:1.8,
          }}>
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

const OS_PAGES = {
  introduction: Introduction,
  principles: Principles,
  colors: Colors,
  typography: Typography,
  spacing: SpacingPage,
  icons: Icons,
  button: ButtonPage,
  "link-button": LinkButtonPage,
  input: InputPage,
  textarea: TextareaPage,
  select: SelectPage,
  tabs: TabPage,
  radius: RadiusPage,
  badge: BadgePage,
  card: CardPage,
  table: TablePage,
  dashboard: DashboardPattern,
  "empty-state": EmptyState,
  container: ContainerPage,
};

export default OS_PAGES;
