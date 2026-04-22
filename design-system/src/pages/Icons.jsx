import React from 'react';
import {
  // 인프라 & 배포
  Server, Database, Rocket, Container, Cloud, Globe, Network, Layers, Box, Package,
  HardDrive, Cpu, Wifi, Monitor, Power,
  // 코드 & 개발
  Terminal, GitBranch, GitCommit, GitMerge, GitPullRequest, Code, Code2, FileCode,
  ScrollText, History,
  // 모니터링 & 상태
  Activity, BarChart2, LineChart, Flame, Timer, Clock,
  // 알림 & 상태 표시
  CheckCircle, CheckCircle2, XCircle, AlertTriangle, AlertCircle, Info, Bell, Loader2,
  // 보안
  Shield, Key, Lock, Unlock, Eye, EyeOff,
  // 액션
  Play, Pause, Square, RefreshCw, RefreshCcw, RotateCcw, Plus, Trash2, Edit2,
  Copy, Download, Upload, ExternalLink, Link,
  // 파일 & 폴더
  File, FileText, Folder, FolderOpen, Archive,
  // 네비게이션 & UI
  Search, Settings, Home, User, Users, Tag, Star, Hash, List,
  ChevronDown, ChevronRight, ArrowUp, ArrowDown, ArrowRight,
} from 'lucide-react';

const CATEGORIES = [
  {
    label: "인프라 & 배포",
    icons: [
      { name: "server",     Icon: Server },
      { name: "database",   Icon: Database },
      { name: "deploy",     Icon: Rocket },
      { name: "container",  Icon: Container },
      { name: "cloud",      Icon: Cloud },
      { name: "globe",      Icon: Globe },
      { name: "network",    Icon: Network },
      { name: "layers",     Icon: Layers },
      { name: "box",        Icon: Box },
      { name: "package",    Icon: Package },
      { name: "disk",       Icon: HardDrive },
      { name: "cpu",        Icon: Cpu },
      { name: "wifi",       Icon: Wifi },
      { name: "monitor",    Icon: Monitor },
      { name: "power",      Icon: Power },
    ],
  },
  {
    label: "코드 & 개발",
    icons: [
      { name: "terminal",   Icon: Terminal },
      { name: "branch",     Icon: GitBranch },
      { name: "commit",     Icon: GitCommit },
      { name: "merge",      Icon: GitMerge },
      { name: "pr",         Icon: GitPullRequest },
      { name: "code",       Icon: Code },
      { name: "code2",      Icon: Code2 },
      { name: "file-code",  Icon: FileCode },
      { name: "logs",       Icon: ScrollText },
      { name: "history",    Icon: History },
    ],
  },
  {
    label: "모니터링",
    icons: [
      { name: "activity",   Icon: Activity },
      { name: "bar-chart",  Icon: BarChart2 },
      { name: "line-chart", Icon: LineChart },
      { name: "flame",      Icon: Flame },
      { name: "timer",      Icon: Timer },
      { name: "clock",      Icon: Clock },
    ],
  },
  {
    label: "상태 & 알림",
    icons: [
      { name: "success",    Icon: CheckCircle },
      { name: "check2",     Icon: CheckCircle2 },
      { name: "error",      Icon: XCircle },
      { name: "warning",    Icon: AlertTriangle },
      { name: "info-circ",  Icon: AlertCircle },
      { name: "info",       Icon: Info },
      { name: "bell",       Icon: Bell },
      { name: "loading",    Icon: Loader2 },
    ],
  },
  {
    label: "보안",
    icons: [
      { name: "shield",     Icon: Shield },
      { name: "key",        Icon: Key },
      { name: "lock",       Icon: Lock },
      { name: "unlock",     Icon: Unlock },
      { name: "eye",        Icon: Eye },
      { name: "eye-off",    Icon: EyeOff },
    ],
  },
  {
    label: "액션",
    icons: [
      { name: "play",       Icon: Play },
      { name: "pause",      Icon: Pause },
      { name: "stop",       Icon: Square },
      { name: "refresh",    Icon: RefreshCw },
      { name: "refresh2",   Icon: RefreshCcw },
      { name: "rotate",     Icon: RotateCcw },
      { name: "plus",       Icon: Plus },
      { name: "delete",     Icon: Trash2 },
      { name: "edit",       Icon: Edit2 },
      { name: "copy",       Icon: Copy },
      { name: "download",   Icon: Download },
      { name: "upload",     Icon: Upload },
      { name: "external",   Icon: ExternalLink },
      { name: "link",       Icon: Link },
    ],
  },
  {
    label: "파일 & 폴더",
    icons: [
      { name: "file",       Icon: File },
      { name: "file-text",  Icon: FileText },
      { name: "folder",     Icon: Folder },
      { name: "folder-open",Icon: FolderOpen },
      { name: "archive",    Icon: Archive },
    ],
  },
  {
    label: "네비게이션 & UI",
    icons: [
      { name: "search",     Icon: Search },
      { name: "settings",   Icon: Settings },
      { name: "home",       Icon: Home },
      { name: "user",       Icon: User },
      { name: "users",      Icon: Users },
      { name: "tag",        Icon: Tag },
      { name: "star",       Icon: Star },
      { name: "hash",       Icon: Hash },
      { name: "list",       Icon: List },
      { name: "chevron-dn", Icon: ChevronDown },
      { name: "chevron-rt", Icon: ChevronRight },
      { name: "arrow-up",   Icon: ArrowUp },
      { name: "arrow-dn",   Icon: ArrowDown },
      { name: "arrow-rt",   Icon: ArrowRight },
    ],
  },
];

export default function Icons() {
  return (
    <>
      <h1 className="os-h1">아이콘</h1>
      <p className="os-lede">
        Lucide가 기본 아이콘 세트입니다 — 1.5px 선폭, 16px 및 20px 그리드.
        운영 아이콘(배포, 컨테이너, 노드)도 일관성을 위해 동일한 선폭을 사용합니다.
      </p>

      {CATEGORIES.map(cat => (
        <div key={cat.label} style={{marginBottom:32}}>
          <div style={{fontSize:12,fontWeight:600,textTransform:"uppercase",letterSpacing:".06em",color:"hsl(var(--muted-foreground))",marginBottom:10}}>{cat.label}</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(8,1fr)",gap:8}}>
            {cat.icons.map(({ name, Icon }) => (
              <div key={name} style={{padding:14,border:"1px solid hsl(var(--border))",borderRadius:6,textAlign:"center"}}>
                <div style={{display:"flex",justifyContent:"center",marginBottom:8,color:"hsl(var(--foreground))"}}>
                  <Icon size={20} strokeWidth={1.5}/>
                </div>
                <div className="os-muted" style={{fontSize:10,fontFamily:"'JetBrains Mono',monospace",wordBreak:"break-all"}}>{name}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
