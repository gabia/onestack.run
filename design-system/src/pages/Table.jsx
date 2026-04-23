import React from 'react';

const ROWS = [
  {name:"onestack-api",    status:"실행 중",  env:"prod",  branch:"main",         replicas:"3/3", cpu:"12%", age:"4일"},
  {name:"onestack-web",    status:"배포 중",  env:"prod",  branch:"release/1.4",  replicas:"2/3", cpu:"—",   age:"2분"},
  {name:"metrics-ingest",  status:"실패",     env:"stage", branch:"fix/oom",      replicas:"0/2", cpu:"—",   age:"12분"},
  {name:"auth-gateway",    status:"실행 중",  env:"prod",  branch:"main",         replicas:"4/4", cpu:"8%",  age:"14일"},
  {name:"image-registry",  status:"성능 저하", env:"prod",  branch:"main",         replicas:"2/3", cpu:"34%", age:"21일"},
];

const cls = (s) => s==="실행 중"?"success":s==="배포 중"?"info":s==="실패"?"danger":s==="성능 저하"?"warning":"";

export function TableEmbed({ extraRows = false }) {
  const rows = extraRows
    ? [...ROWS, {name:"worker-jobs", status:"실행 중", env:"prod", branch:"main", replicas:"6/6", cpu:"21%", age:"8일"}]
    : ROWS;
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

export default function TablePage() {
  return (
    <>
      <h1 className="os-h1">테이블</h1>
      <p className="os-lede">운영 화면의 핵심 컴포넌트. 좁은 행 높이, 대문자 마이크로 레이블, 표형 숫자.</p>
      <TableEmbed />
    </>
  );
}
