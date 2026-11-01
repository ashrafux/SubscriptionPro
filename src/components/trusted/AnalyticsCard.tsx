import type { ReactNode } from 'react';
import { ChatGptMark, ZoomMark } from '../Brand';

/* The "Trusted by Teams" analytics window, drawn in HTML at 1000×740 (scaled by ScaledScreen) so it stays sharp. */

const Icon = ({ bg, children }: { bg: string; children: ReactNode }) => (
  <span className="flex size-[46px] shrink-0 items-center justify-center rounded-full text-white" style={{ background: bg }}>
    {children}
  </span>
);
const Tag = ({ bg, color, children }: { bg: string; color: string; children: ReactNode }) => (
  <span className="flex size-[40px] items-center justify-center rounded-[10px]" style={{ background: bg, color }}>
    {children}
  </span>
);
const svg = (d: ReactNode, size = 20) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {d}
  </svg>
);
const trend = svg(<path d="M3 17l6-6 4 4 8-8M15 7h6v6" />, 18);

const stats: { label: string; value: string; icon: ReactNode; iconBg: string; tag: ReactNode }[] = [
  {
    label: 'Total Subscriptions',
    value: '32',
    iconBg: '#8b5cf6',
    icon: svg(<path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" fill="currentColor" stroke="none" />),
    tag: <Tag bg="#ede9fe" color="#7c3aed">{trend}</Tag>,
  },
  {
    label: 'Total Savings',
    value: '$24,560',
    iconBg: '#10b981',
    icon: <span className="text-[22px] font-bold">$</span>,
    tag: <Tag bg="#d1fae5" color="#059669">{trend}</Tag>,
  },
  {
    label: 'Upcoming Renewals',
    value: '8',
    iconBg: '#f59e0b',
    icon: svg(<><rect x="4" y="5" width="16" height="15" rx="2.5" /><path d="M4 10h16M9 3v4M15 3v4" /></>),
    tag: <Tag bg="#ffedd5" color="#ea580c">{svg(<><circle cx="12" cy="12" r="8" /><path d="M12 8v8" /></>, 18)}</Tag>,
  },
  {
    label: 'Active Members',
    value: '12',
    iconBg: '#3b82f6',
    icon: svg(<><circle cx="9" cy="9" r="3.2" /><circle cx="16.5" cy="10" r="2.6" /><path d="M3.5 19c.6-3.2 3-5 5.5-5s4.9 1.8 5.5 5M14.5 14.6c2.4-.6 5 .8 5.8 4.4" /></>),
    tag: <Tag bg="#dbeafe" color="#2563eb">{svg(<><circle cx="12" cy="8.5" r="3.5" /><path d="M5 20c.8-3.8 3.6-6 7-6s6.2 2.2 7 6" /></>, 18)}</Tag>,
  },
];

// Spending overview: Jan–Jul, $0–$40K
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
const values = [9, 19, 10, 21, 28, 21, 38];
const CW = 860;
const CH = 170;
const pts = values.map((v, i) => [(i / (values.length - 1)) * CW, CH - (v / 40) * CH] as const);
const line = pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');
const area = `${line} L${CW} ${CH} L0 ${CH} Z`;

const img = (src: string, size = 26) => <img src={src} alt="" style={{ width: size, height: size }} className="object-contain" />;
const topSubs: [ReactNode, string, string, string][] = [
  [img('/assets/brands/microsoft365.png'), 'Microsoft 365', '$6,268 / year', 'Save 20%'],
  [img('/assets/brands/google.png'), 'Google Workspace', '$4,800 / year', 'Save 16%'],
  [img('/assets/brands/canva.png'), 'Canva Teams', '$2,880 / year', 'Save 15%'],
  [img('/assets/brands/adobe-cc.png'), 'Adobe Creative Cloud', '$2,400 / year', 'Save 20%'],
];
const renewals: [ReactNode, string, string, string][] = [
  [<ZoomMark key="z" size={30} />, 'Zoom', 'in 5 days', '$149.90'],
  [img('/assets/brands/notion.png', 28), 'Notion', 'in 12 days', '$96.00'],
  [<ChatGptMark key="g" size={28} />, 'ChatGPT Team', 'in 18 days', '$239.88'],
];

export function AnalyticsCard() {
  return (
    <div className="size-full rounded-[22px] bg-white p-6 font-sans text-[#111827] shadow-[0_30px_80px_rgba(40,40,110,0.25)]">
      <div className="flex gap-2">
        {['#ef4444', '#f59e0b', '#22c55e'].map((c) => (
          <span key={c} className="size-[13px] rounded-full" style={{ background: c }} />
        ))}
      </div>

      <div className="mt-5 grid grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="flex items-center gap-3.5 rounded-[16px] border border-[#eef0f4] bg-white p-4 shadow-[0_4px_14px_rgba(20,20,60,0.04)]">
            <Icon bg={s.iconBg}>{s.icon}</Icon>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[12.5px] text-[#6b7280]">{s.label}</p>
              <div className="mt-1 flex items-end justify-between gap-2">
                <p className="text-[25px] leading-none font-bold tracking-tight">{s.value}</p>
                {s.tag}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-[16px] border border-[#eef0f4] p-5">
        <div className="flex items-center justify-between">
          <p className="text-[15px] font-semibold">Spending Overview</p>
          <span className="rounded-[8px] border border-[#e5e7eb] px-3 py-1 text-[12.5px] text-[#4b5563]">This Year ▾</span>
        </div>
        <div className="mt-3 flex gap-3">
          <div className="flex h-[170px] flex-col justify-between text-right text-[11.5px] text-[#9ca3af]">
            {['$40K', '$30K', '$20K', '$10K', '$0'].map((l) => (
              <span key={l} className="leading-none">{l}</span>
            ))}
          </div>
          <div className="flex-1">
            <svg viewBox={`0 0 ${CW} ${CH}`} className="block h-[170px] w-full overflow-visible" preserveAspectRatio="none">
              <defs>
                <linearGradient id="spendFill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                </linearGradient>
              </defs>
              {[0, 1, 2, 3].map((i) => (
                <line key={i} x1="0" x2={CW} y1={(CH / 4) * i} y2={(CH / 4) * i} stroke="#f1f2f6" strokeWidth="1" />
              ))}
              <path d={area} fill="url(#spendFill)" />
              <path d={line} fill="none" stroke="#7c5cf2" strokeWidth="2.5" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
              {pts.map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r="5" fill="#fff" stroke="#7c5cf2" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
              ))}
            </svg>
            <div className="mt-2 flex justify-between text-[11.5px] text-[#9ca3af]">
              {months.map((m) => (
                <span key={m}>{m}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-[1.05fr_1fr] gap-4">
        <div className="rounded-[16px] border border-[#eef0f4] p-5">
          <p className="mb-2 text-[15px] font-semibold">Top Subscriptions</p>
          {topSubs.map(([icon, name, price, save]) => (
            <div key={name} className="flex items-center gap-3 border-t border-[#f3f4f6] py-[9px] text-[13px] first:border-0">
              <span className="flex size-[30px] items-center justify-center">{icon}</span>
              <span className="flex-1 font-medium">{name}</span>
              <span className="w-[100px] text-[12px] text-[#6b7280]">{price}</span>
              <span className="rounded-full bg-[#dcfce7] px-2.5 py-1 text-[11px] font-semibold text-[#15803d]">{save}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-col rounded-[16px] border border-[#eef0f4] p-5">
          <p className="mb-2 text-[15px] font-semibold">Upcoming Renewals</p>
          {renewals.map(([icon, name, when, amt]) => (
            <div key={name} className="flex items-center gap-3 border-t border-[#f3f4f6] py-[8px] text-[13px] first:border-0">
              <span className="flex size-[34px] items-center justify-center rounded-[9px] border border-[#eef0f4]">{icon}</span>
              <span className="flex-1">
                <span className="block font-medium">{name}</span>
                <span className="block text-[11.5px] text-[#9ca3af]">{when}</span>
              </span>
              <span className="text-[13px] font-semibold">{amt}</span>
            </div>
          ))}
          <span className="mt-auto pt-2 text-center text-[13px] font-semibold text-[#4f46e5]">View all renewals →</span>
        </div>
      </div>
    </div>
  );
}
