// Shell: sidebar nav + header + content area + theme toggle + dark-mode aware layout
// Renders a docs-site chrome, then swaps inner page content by route (hash-based).

const PAGES = [
  { group: "시작하기", items: [
    { id: "introduction", label: "소개",         d: ["M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z","M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 0 3-3h7z"] },
    { id: "principles",  label: "원칙",          d: ["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"] },
  ]},
  { group: "기초", items: [
    { id: "colors",      label: "색상",          d: ["M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"] },
    { id: "typography",  label: "타이포그래피",  d: ["M4 7V4h16v3","M9 20h6","M12 4v16"] },
    { id: "spacing",     label: "간격 & 반경",   d: ["M21 10H3","M21 6H3","M21 14H3","M21 18H3"] },
    { id: "icons",       label: "아이콘",         d: ["M4 4h6v6H4z","M14 4h6v6h-6z","M4 14h6v6H4z","M14 14h6v6h-6z"] },
  ]},
  { group: "컴포넌트", items: [
    { id: "button",      label: "버튼",           d: ["M4 3h16a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z","M8 12h8","M12 8v8"] },
    { id: "link-button", label: "링크 버튼",     d: ["M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6","M15 3h6v6","M10 14L21 3"] },
    { id: "input",       label: "인풋",           d: ["M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7","M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4z"] },
    { id: "textarea",    label: "텍스트에어리아", d: ["M21 6H3","M15 12H3","M17 18H3"] },
    { id: "select",      label: "멀티선택기",     d: ["M9 11l3 3L22 4","M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"] },
    { id: "tabs",        label: "탭",             d: ["M12 2 2 7l10 5 10-5-10-5z","M2 17l10 5 10-5","M2 12l10 5 10-5"] },
    { id: "radius",      label: "모서리 반경",    d: ["M3 7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4z"] },
    { id: "badge",       label: "배지",           d: ["M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2z","M7 7h.01"] },
    { id: "card",        label: "카드",           d: ["M2 5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z","M2 10h20"] },
    { id: "table",       label: "테이블",         d: ["M3 3h18v18H3z","M3 9h18","M3 15h18","M9 3v18","M15 3v18"] },
  ]},
  { group: "패턴", items: [
    { id: "dashboard",   label: "대시보드",       d: ["M3 3h7v9H3z","M14 3h7v5h-7z","M14 12h7v9h-7z","M3 16h7v5H3z"] },
    { id: "empty-state", label: "빈 상태",        d: ["M22 12h-6l-2 3H10l-2-3H2","M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"] },
    { id: "container",   label: "페이지 컨테이너", d: ["M3 3h18v18H3z","M7 7h10v10H7z"] },
  ]},
];

const ACCENT_PRESETS = [
  { id: "cobalt",   label: "Gabia Cobalt", light: "204 100% 38%", dark: "207 56% 59%" },
  { id: "indigo",   label: "Indigo",       light: "239 84% 60%",  dark: "239 84% 74%" },
  { id: "violet",   label: "Violet",       light: "262 83% 58%",  dark: "263 80% 68%" },
  { id: "emerald",  label: "Emerald",      light: "160 84% 34%",  dark: "158 64% 52%" },
  { id: "orange",   label: "Orange",       light: "25 95% 48%",   dark: "25 95% 62%" },
  { id: "rose",     label: "Rose",         light: "346 77% 50%",  dark: "346 87% 65%" },
];

function NavIcon({ d }) {
  const paths = Array.isArray(d) ? d : [d];
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"
      style={{flexShrink:0, opacity:.7}}>
      {paths.map((p, i) => <path key={i} d={p}/>)}
    </svg>
  );
}

function applyTheme(dark, accentId) {
  const t = { ...window.OS_TOKENS.semantic[dark ? "dark" : "light"] };
  const accent = ACCENT_PRESETS.find(a => a.id === accentId) || ACCENT_PRESETS[0];
  const hsl = dark ? accent.dark : accent.light;
  // Override every primary/ring/sidebar-primary token with the chosen accent
  t["--primary"] = hsl;
  t["--ring"] = hsl;
  t["--sidebar-primary"] = hsl;
  t["--sidebar-ring"] = hsl;
  const root = document.documentElement;
  Object.entries(t).forEach(([k, v]) => root.style.setProperty(k, v));
  root.classList.toggle("dark", dark);
}

function useRoute() {
  const [r, setR] = React.useState(() => (location.hash.replace("#/", "") || "introduction"));
  React.useEffect(() => {
    const on = () => setR(location.hash.replace("#/", "") || "introduction");
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);
  return [r, (id) => { location.hash = "#/" + id; }];
}

function Shell() {
  const [dark, setDark] = React.useState(() => localStorage.getItem("os.theme") === "dark");
  const [accent, setAccent] = React.useState(() => localStorage.getItem("os.accent") || "cobalt");
  const [customHsl, setCustomHsl] = React.useState(() => localStorage.getItem("os.customHsl") || "");
  const [showAccent, setShowAccent] = React.useState(false);
  const [route, go] = useRoute();
  const [q, setQ] = React.useState("");

  React.useEffect(() => {
    // If custom hsl is set, inject it as an ad-hoc preset
    if (customHsl && accent === "custom") {
      const custom = { id: "custom", label: "Custom", light: customHsl, dark: customHsl };
      const existing = ACCENT_PRESETS.findIndex(a => a.id === "custom");
      if (existing >= 0) ACCENT_PRESETS[existing] = custom; else ACCENT_PRESETS.push(custom);
    }
    applyTheme(dark, accent);
    localStorage.setItem("os.theme", dark ? "dark" : "light");
    localStorage.setItem("os.accent", accent);
    if (customHsl) localStorage.setItem("os.customHsl", customHsl);
  }, [dark, accent, customHsl]);

  const Page = window.OS_PAGES?.[route] || window.OS_PAGES?.introduction;

  const filtered = PAGES.map(g => ({
    ...g,
    items: g.items.filter(i => !q || i.label.toLowerCase().includes(q.toLowerCase()))
  })).filter(g => g.items.length);

  return (
    <div className="os-root">
      <aside className="os-sidebar">
        <div className="os-brand">
          <div className="os-logo">◆</div>
          <div>
            <div className="os-brand-name">OneStack</div>
            <div className="os-brand-tag">디자인 시스템 · v0.1</div>
          </div>
        </div>

        <div className="os-search">
          <span className="os-search-icon">⌕</span>
          <input placeholder="검색" value={q} onChange={e => setQ(e.target.value)} />
          <span className="os-kbd">⌘K</span>
        </div>

        <nav className="os-nav">
          {filtered.map(g => (
            <div key={g.group} className="os-nav-group">
              <div className="os-nav-group-label">{g.group}</div>
              {g.items.map(i => (
                <a key={i.id}
                   className={"os-nav-item" + (route === i.id ? " active" : "")}
                   href={"#/" + i.id}
                   onClick={e => { e.preventDefault(); go(i.id); }}>
                  {i.d && <NavIcon d={i.d}/>}
                  {i.label}
                </a>
              ))}
            </div>
          ))}
        </nav>

        <div className="os-sidebar-footer">
          <button className="os-theme-toggle" onClick={() => setDark(d => !d)}>
            <span>{dark ? "☾" : "☀"}</span>
            <span>{dark ? "다크" : "라이트"}</span>
          </button>
          <button className="os-theme-toggle" onClick={() => setShowAccent(s => !s)} title="Accent color">
            <span className="os-accent-chip" style={{background:"hsl(var(--primary))"}}/>
            <span>강조색</span>
          </button>
        </div>

        {showAccent && (
          <div className="os-accent-panel">
            <div className="os-accent-panel-title">강조색</div>
            <div className="os-accent-grid">
              {ACCENT_PRESETS.filter(p => p.id !== "custom").map(p => (
                <button key={p.id}
                  className={"os-accent-opt" + (accent === p.id ? " active" : "")}
                  onClick={() => setAccent(p.id)}
                  title={p.label}>
                  <span className="os-accent-swatch" style={{background:`hsl(${dark ? p.dark : p.light})`}}/>
                  <span>{p.label}</span>
                </button>
              ))}
            </div>
            <div className="os-accent-custom">
              <label className="os-accent-custom-label">커스텀 HSL</label>
              <input
                className="os-input"
                placeholder="예) 280 90% 50%"
                value={customHsl}
                onChange={e => { setCustomHsl(e.target.value); setAccent("custom"); }}
              />
              <div className="os-accent-custom-hint">공백으로 구분: 색조 채도% 밝기%</div>
            </div>
          </div>
        )}
      </aside>

      <main className="os-main">
        <header className="os-header">
          <div className="os-crumbs">
            <span>디자인</span>
            <span className="os-crumb-sep">›</span>
            <span className="os-crumb-cur">{findLabel(route)}</span>
          </div>
          <div className="os-header-actions">
            <a className="os-btn os-btn-ghost" href="#/dashboard" onClick={e=>{e.preventDefault();go("dashboard");}}>대시보드 보기 →</a>
          </div>
        </header>

        <div className="os-content">
          {Page ? <Page /> : <div>페이지를 찾을 수 없습니다</div>}
        </div>
      </main>
    </div>
  );
}

function findLabel(id) {
  for (const g of PAGES) for (const i of g.items) if (i.id === id) return i.label;
  return "Introduction";
}

window.OS_Shell = Shell;
