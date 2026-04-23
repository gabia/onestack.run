import React from 'react';
import Section from './Section.jsx';
import { Rocket, RefreshCw, Trash2, Plus, Download, Settings } from 'lucide-react';

export default function ButtonPage() {
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

      <Section title="아이콘 조합">
        <div className="os-block">
          <div className="os-block-body" style={{display:"flex",flexDirection:"column",gap:16}}>
            <div>
              <div className="os-muted" style={{fontSize:12,marginBottom:8}}>아이콘 + 텍스트</div>
              <div className="os-row">
                <button className="os-btn os-btn-primary" style={{gap:6}}>
                  <Rocket size={14} strokeWidth={2}/> 배포
                </button>
                <button className="os-btn os-btn-secondary" style={{gap:6}}>
                  <RefreshCw size={14} strokeWidth={2}/> 재시작
                </button>
                <button className="os-btn os-btn-outline" style={{gap:6}}>
                  <Download size={14} strokeWidth={2}/> 내보내기
                </button>
                <button className="os-btn os-btn-danger" style={{gap:6}}>
                  <Trash2 size={14} strokeWidth={2}/> 삭제
                </button>
              </div>
            </div>
            <div>
              <div className="os-muted" style={{fontSize:12,marginBottom:8}}>아이콘 전용 (icon-only)</div>
              <div className="os-row">
                <button className="os-btn os-btn-primary os-btn-icon" title="배포"><Rocket size={15} strokeWidth={2}/></button>
                <button className="os-btn os-btn-secondary os-btn-icon" title="재시작"><RefreshCw size={15} strokeWidth={2}/></button>
                <button className="os-btn os-btn-outline os-btn-icon" title="설정"><Settings size={15} strokeWidth={2}/></button>
                <button className="os-btn os-btn-ghost os-btn-icon" title="추가"><Plus size={15} strokeWidth={2}/></button>
                <button className="os-btn os-btn-danger os-btn-icon" title="삭제"><Trash2 size={15} strokeWidth={2}/></button>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section title="비활성화">
        <div className="os-block">
          <div className="os-block-body">
            <div className="os-row">
              <button className="os-btn os-btn-primary" disabled>배포</button>
              <button className="os-btn os-btn-secondary" disabled>로그 보기</button>
              <button className="os-btn os-btn-outline" disabled>취소</button>
              <button className="os-btn os-btn-ghost" disabled>닫기</button>
              <button className="os-btn os-btn-danger" disabled>서비스 삭제</button>
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
