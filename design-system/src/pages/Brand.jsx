import React, { useState, useEffect } from 'react';
import Section from './Section.jsx';

function useFontLoader(url) {
  useEffect(() => {
    const existing = document.querySelector(`link[href="${url}"]`);
    if (existing) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    document.head.appendChild(link);
  }, [url]);
}

const SYMBOL_SVG = `<svg width="100%" height="100%" viewBox="75 85 150 146" preserveAspectRatio="xMidYMid meet" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M150 85L225 135L150 185L75 135L150 85Z" fill="currentColor"/>
  <path d="M75 148L150 198L225 148V158L150 208L75 158V148Z" fill="currentColor"/>
  <path d="M75 171L150 221L225 171V181L150 231L75 181V171Z" fill="currentColor"/>
</svg>`;

function OsSymbol({ size = 40, color = 'currentColor', style = {} }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="75 85 150 146"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      <path d="M150 85L225 135L150 185L75 135L150 85Z" fill={color} />
      <path d="M75 148L150 198L225 148V158L150 208L75 158V148Z" fill={color} />
      <path d="M75 171L150 221L225 171V181L150 231L75 181V171Z" fill={color} />
    </svg>
  );
}

function FullLogo({ size = 40, color = 'currentColor' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: size * 0.2 }}>
      <OsSymbol size={size} color={color} />
      <span style={{
        fontSize: size * 0.58,
        fontWeight: 800,
        letterSpacing: '-0.05em',
        color,
        lineHeight: 1,
        fontFamily: "'Noto Sans', sans-serif",
      }}>
        Onestack
      </span>
    </div>
  );
}

function CopyButton({ text, label = '복사' }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      className="os-btn os-btn-secondary"
      style={{ fontSize: 12, padding: '5px 12px', gap: 6, display: 'flex', alignItems: 'center' }}
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
    >
      {copied ? '✓ 복사됨' : label}
    </button>
  );
}

function LogoCard({ bg, fg, label, border }) {
  return (
    <div style={{
      background: bg,
      border: border || 'none',
      borderRadius: 12,
      padding: '36px 32px',
      display: 'flex',
      flexDirection: 'column',
      gap: 28,
      alignItems: 'flex-start',
    }}>
      <FullLogo size={36} color={fg} />
      <OsSymbol size={28} color={fg} />
      <span style={{ fontSize: 11, color: fg, opacity: 0.45, letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 500 }}>{label}</span>
    </div>
  );
}

function DoCard({ ok, children }) {
  return (
    <div style={{
      borderRadius: 10,
      border: `1px solid ${ok ? 'hsl(160 84% 34% / 0.3)' : 'hsl(0 72% 51% / 0.3)'}`,
      background: ok ? 'hsl(160 84% 34% / 0.04)' : 'hsl(0 72% 51% / 0.04)',
      overflow: 'hidden',
    }}>
      <div style={{
        padding: '8px 14px',
        background: ok ? 'hsl(160 84% 34% / 0.08)' : 'hsl(0 72% 51% / 0.08)',
        borderBottom: `1px solid ${ok ? 'hsl(160 84% 34% / 0.15)' : 'hsl(0 72% 51% / 0.15)'}`,
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        fontSize: 12,
        fontWeight: 600,
        color: ok ? 'hsl(160 84% 30%)' : 'hsl(0 72% 45%)',
      }}>
        {ok ? '✓ Do' : '✕ Don\'t'}
      </div>
      <div style={{ padding: '20px 18px', fontSize: 13, lineHeight: 1.6, color: 'hsl(var(--muted-foreground))' }}>
        {children}
      </div>
    </div>
  );
}

export default function Brand() {
  useFontLoader('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@800&display=swap');

  return (
    <>
      {/* ── Hero ── */}
      <div className="os-hero" style={{ paddingBottom: 0 }}>
        <span className="os-hero-badge">브랜드 가이드라인</span>
        <h1 className="os-h1">OneStack Brand</h1>
        <p className="os-lede" style={{ maxWidth: 520 }}>
          OneStack의 시각적 정체성. 심볼, 로고타입, 컬러 사용 원칙과 에셋 다운로드를 제공합니다.
        </p>
      </div>

      {/* ── Symbol ── */}
      <Section title="심볼">
        <p className="os-p">
          심볼은 세 개의 레이어가 쌓인 구조로, 인프라 위에 올라가는 서비스 계층을 상징합니다.
          독립적으로 사용하거나 로고타입과 함께 사용할 수 있습니다.
        </p>

        {/* Large display */}
        <div style={{
          borderRadius: 16,
          background: 'hsl(var(--muted) / 0.4)',
          border: '1px solid hsl(var(--border))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '64px 48px',
          marginBottom: 24,
        }}>
          <OsSymbol size={120} color="hsl(var(--foreground))" />
        </div>

        {/* Size scale */}
        <div style={{ marginBottom: 8, fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'hsl(var(--muted-foreground))' }}>크기 스케일</div>
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: 40,
          padding: '28px 32px',
          background: 'hsl(var(--muted) / 0.3)',
          borderRadius: 12,
          border: '1px solid hsl(var(--border))',
          flexWrap: 'wrap',
          marginBottom: 24,
        }}>
          {[80, 56, 40, 28, 20, 14].map(sz => (
            <div key={sz} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <OsSymbol size={sz} color="hsl(var(--foreground))" />
              <span style={{ fontSize: 11, color: 'hsl(var(--muted-foreground))' }}>{sz}px</span>
            </div>
          ))}
        </div>

        {/* SVG source */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: 'hsl(var(--muted-foreground))' }}>SVG 소스</span>
          <CopyButton text={SYMBOL_SVG} label="SVG 복사" />
        </div>
        <pre className="os-mono" style={{
          background: 'hsl(var(--muted) / 0.4)',
          border: '1px solid hsl(var(--border))',
          borderRadius: 8,
          padding: '14px 18px',
          fontSize: 12,
          lineHeight: 1.7,
          overflowX: 'auto',
          color: 'hsl(var(--foreground))',
          margin: 0,
        }}>{SYMBOL_SVG.trim()}</pre>
      </Section>

      {/* ── Full Logo ── */}
      <Section title="로고">
        <p className="os-p">
          심볼과 워드마크를 수평으로 조합한 기본 로고입니다. 공간이 허용되는 경우 항상 이 형태를 우선 사용합니다.
        </p>

        <div style={{
          borderRadius: 16,
          background: 'hsl(var(--muted) / 0.4)',
          border: '1px solid hsl(var(--border))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '56px 48px',
          marginBottom: 24,
        }}>
          <FullLogo size={56} color="hsl(var(--foreground))" />
        </div>

        {/* Size scale */}
        <div style={{ marginBottom: 8, fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'hsl(var(--muted-foreground))' }}>크기 스케일</div>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
          padding: '28px 32px',
          background: 'hsl(var(--muted) / 0.3)',
          borderRadius: 12,
          border: '1px solid hsl(var(--border))',
          marginBottom: 8,
        }}>
          {[48, 36, 28, 20].map(sz => (
            <div key={sz} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <FullLogo size={sz} color="hsl(var(--foreground))" />
              <span style={{ fontSize: 11, color: 'hsl(var(--muted-foreground))' }}>{sz}px</span>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Color Variations ── */}
      <Section title="컬러 변형">
        <p className="os-p">
          배경 컨텍스트에 따라 세 가지 컬러 버전을 사용합니다.
          로고의 가독성이 최우선이며, 배경과의 대비가 충분히 확보되어야 합니다.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 12 }}>
          <LogoCard bg="#ffffff" fg="#000000" label="라이트 배경" border="1px solid #e5e7eb" />
          <LogoCard bg="#000000" fg="#ffffff" label="다크 배경" />
          <LogoCard bg="#f4f4f5" fg="#18181b" label="뉴트럴 배경" border="1px solid #e4e4e7" />
          <LogoCard bg="hsl(204 100% 38%)" fg="#ffffff" label="브랜드 컬러 배경" />
        </div>
      </Section>

      {/* ── Clear Space ── */}
      <Section title="여백 규칙">
        <p className="os-p">
          로고 주변에는 항상 심볼 높이의 <strong>1/4</strong> 이상의 여백을 확보합니다.
          다른 요소가 이 영역을 침범해서는 안 됩니다.
        </p>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '48px',
          background: 'hsl(var(--muted) / 0.3)',
          border: '1px solid hsl(var(--border))',
          borderRadius: 12,
          position: 'relative',
        }}>
          <div style={{
            outline: '1.5px dashed hsl(var(--primary) / 0.5)',
            padding: 18,
            borderRadius: 4,
          }}>
            <FullLogo size={40} color="hsl(var(--foreground))" />
          </div>
          <div style={{
            position: 'absolute',
            bottom: 16,
            right: 20,
            fontSize: 11,
            color: 'hsl(var(--primary))',
            fontWeight: 500,
          }}>
            — 최소 여백 영역
          </div>
        </div>
      </Section>

      {/* ── Minimum Size ── */}
      <Section title="최소 크기">
        <p className="os-p">
          가독성을 보장하기 위한 최소 크기 기준입니다. 이보다 작을 경우 심볼만 단독으로 사용하세요.
        </p>
        <div style={{
          display: 'flex',
          gap: 40,
          padding: '32px',
          background: 'hsl(var(--muted) / 0.3)',
          border: '1px solid hsl(var(--border))',
          borderRadius: 12,
          flexWrap: 'wrap',
          alignItems: 'flex-end',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-start' }}>
            <FullLogo size={20} color="hsl(var(--foreground))" />
            <span style={{ fontSize: 11, color: 'hsl(var(--primary))', fontWeight: 500 }}>로고 최소 20px</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-start' }}>
            <OsSymbol size={16} color="hsl(var(--foreground))" />
            <span style={{ fontSize: 11, color: 'hsl(var(--primary))', fontWeight: 500 }}>심볼 최소 16px</span>
          </div>
        </div>
      </Section>

      {/* ── Do & Don't ── */}
      <Section title="사용 원칙">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
          <DoCard ok>심볼과 워드마크의 비율을 유지합니다.</DoCard>
          <DoCard ok>배경과의 충분한 명도 대비를 확보합니다.</DoCard>
          <DoCard ok>최소 여백 규칙을 준수합니다.</DoCard>
          <DoCard ok>원본 SVG 파일을 사용하여 선명도를 유지합니다.</DoCard>
          <DoCard>로고를 늘리거나 압축하지 마세요.</DoCard>
          <DoCard>심볼의 색상을 임의로 변경하지 마세요.</DoCard>
          <DoCard>배경과 대비가 낮은 색상 조합은 피하세요.</DoCard>
          <DoCard>그림자, 아웃라인 등 시각 효과를 추가하지 마세요.</DoCard>
        </div>
      </Section>

      {/* ── Assets ── */}
      <Section title="에셋 다운로드">
        <p className="os-p">
          SVG 소스 코드를 복사하거나, 직접 파일로 저장하여 사용하세요.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
          {[
            { label: '심볼 — 블랙', color: '#000000', bg: '#ffffff', border: '1px solid #e5e7eb' },
            { label: '심볼 — 화이트', color: '#ffffff', bg: '#18181b', border: 'none' },
            { label: '심볼 — 브랜드', color: 'hsl(204 100% 38%)', bg: 'hsl(204 100% 97%)', border: '1px solid hsl(204 100% 85%)' },
          ].map(item => (
            <div key={item.label} style={{
              borderRadius: 10,
              border: item.border || '1px solid hsl(var(--border))',
              background: item.bg,
              overflow: 'hidden',
            }}>
              <div style={{
                padding: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 100,
              }}>
                <OsSymbol size={48} color={item.color} />
              </div>
              <div style={{
                padding: '10px 14px',
                borderTop: `1px solid ${item.color === '#ffffff' ? 'rgba(255,255,255,0.1)' : 'hsl(var(--border))'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: item.color === '#ffffff' ? 'rgba(255,255,255,0.05)' : 'hsl(var(--muted) / 0.3)',
              }}>
                <span style={{ fontSize: 12, color: item.color === '#ffffff' ? 'rgba(255,255,255,0.6)' : 'hsl(var(--muted-foreground))' }}>{item.label}</span>
                <CopyButton
                  text={SYMBOL_SVG.replace(/currentColor/g, item.color)}
                  label="SVG"
                />
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
