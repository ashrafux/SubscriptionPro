import type { ReactNode } from 'react';
import { ChatGptMark, ZoomMark } from '../Brand';
import { AppShell, Card, Pill } from './Shell';

/* Six SubscriptionPro screens, one per "What Sets Us Apart" feature. Drawn at 960×600 and scaled, so they stay sharp. */

export type Tool = 'clickup' | 'adobe' | 'zoom' | 'chatgpt' | 'notion' | 'google' | 'canva' | 'microsoft';

export function ToolLogo({ tool, size = 28 }: { tool: Tool; size?: number }) {
  const img = (src: string) => <img src={src} alt="" style={{ width: size, height: size }} className="object-contain" />;
  const map: Record<Tool, ReactNode> = {
    clickup: <img src="/assets/products/clickup.svg" alt="" style={{ height: size, width: size * 0.83 }} />,
    adobe: img('/assets/brands/adobe-cc.png'),
    zoom: <ZoomMark size={size} />,
    chatgpt: <ChatGptMark size={size} />,
    notion: img('/assets/brands/notion.png'),
    google: img('/assets/brands/google.png'),
    canva: img('/assets/brands/canva.png'),
    microsoft: img('/assets/brands/microsoft365.png'),
  };
  return (
    <span className="flex shrink-0 items-center justify-center rounded-[9px] border border-[#eef0f3] bg-white" style={{ width: size + 14, height: size + 14 }}>
      {map[tool]}
    </span>
  );
}

export const PrimaryBtn = ({ children }: { children: ReactNode }) => (
  <span className="rounded-full bg-pink px-3.5 py-[7px] text-[11.5px] font-semibold text-white">{children}</span>
);

/* 1 · Authorized Partner — partner catalog */
export function CatalogView() {
  const items: [Tool, string, number][] = [
    ['clickup', 'ClickUp', 300],
    ['adobe', 'Adobe CC', 540],
    ['zoom', 'Zoom', 180],
    ['chatgpt', 'ChatGPT', 300],
    ['notion', 'Notion', 120],
    ['google', 'Google Workspace', 216],
    ['canva', 'Canva', 150],
    ['microsoft', 'Microsoft 365', 264],
  ];
  return (
    <AppShell active="Products" title="Products" actions={<PrimaryBtn>Request a tool</PrimaryBtn>}>
      <div className="mb-4 flex gap-2">
        {['All', 'Productivity', 'Design', 'Communication', 'AI'].map((c, i) => (
          <span key={c} className={`rounded-full px-3 py-1.5 text-[11.5px] ${i === 0 ? 'bg-[#1d1d2b] text-white' : 'border border-[#e5e7eb] bg-white text-[#4b5563]'}`}>
            {c}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-4 gap-3">
        {items.map(([t, name, price]) => (
          <Card key={name} className="flex flex-col gap-2.5 p-3.5">
            <div className="flex items-start justify-between">
              <ToolLogo tool={t} />
              <Pill tone="blue">✓ Official partner</Pill>
            </div>
            <p className="text-[13px] font-semibold">{name}</p>
            <p className="flex items-baseline gap-1.5">
              <span className="text-[15px] font-bold text-pink">${Math.round(price * 0.8)}</span>
              <span className="text-[11px] text-[#9aa1ad] line-through">${price}</span>
              <span className="text-[10.5px] text-[#9aa1ad]">/yr</span>
            </p>
            <span className="rounded-full bg-[#1d1d2b] py-[6px] text-center text-[11px] font-semibold text-white">Buy license</span>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}

/* 2 · Recurring Discount — renewals table */
export function RenewalsView() {
  const rows: [Tool, string, string, string, number, number][] = [
    ['google', 'Google Workspace', 'Business Plus · 40 seats', 'Nov 14, 2026', 8640, 6912],
    ['clickup', 'ClickUp', 'Business · 25 seats', 'Nov 28, 2026', 3600, 2880],
    ['adobe', 'Adobe Creative Cloud', 'Teams · 8 seats', 'Dec 03, 2026', 7680, 5760],
    ['zoom', 'Zoom', 'Pro · 12 hosts', 'Dec 19, 2026', 2160, 1728],
    ['notion', 'Notion', 'Plus · 30 seats', 'Jan 06, 2027', 3600, 2952],
  ];
  return (
    <AppShell active="Billing" title="Upcoming renewals" actions={<Pill tone="green">Avg. discount 22%</Pill>}>
      <div className="mb-3 grid grid-cols-3 gap-3">
        {[
          ['Saved this year', '$4,860', 'pink'],
          ['Next renewal', 'Nov 14', ''],
          ['Renewals this quarter', '9', ''],
        ].map(([k, v, tone]) => (
          <Card key={k} className="p-3.5">
            <p className="text-[11px] text-[#6b7280]">{k}</p>
            <p className={`mt-1 text-[22px] font-bold ${tone ? 'text-pink' : ''}`}>{v}</p>
          </Card>
        ))}
      </div>
      <Card className="overflow-hidden">
        <div className="grid grid-cols-[1.7fr_1.1fr_0.9fr_0.9fr_0.7fr] bg-[#fafbfc] px-4 py-2 text-[10.5px] font-medium text-[#9aa1ad]">
          <span>Tool</span>
          <span>Renews on</span>
          <span>List price</span>
          <span>Your price</span>
          <span>Saving</span>
        </div>
        {rows.map(([t, name, plan, date, list, yours]) => (
          <div key={name} className="grid grid-cols-[1.7fr_1.1fr_0.9fr_0.9fr_0.7fr] items-center border-t border-[#f1f2f4] px-4 py-2.5 text-[12px]">
            <span className="flex items-center gap-2.5">
              <ToolLogo tool={t} size={18} />
              <span>
                <span className="block font-semibold">{name}</span>
                <span className="block text-[10.5px] text-[#9aa1ad]">{plan}</span>
              </span>
            </span>
            <span className="text-[#4b5563]">{date}</span>
            <span className="text-[#9aa1ad] line-through">${list.toLocaleString()}</span>
            <span className="font-bold text-pink">${yours.toLocaleString()}</span>
            <span>
              <Pill>-{Math.round((1 - yours / list) * 100)}%</Pill>
            </span>
          </div>
        ))}
      </Card>
    </AppShell>
  );
}

/* 3 · Convenient Payment — deposit fund + methods */
export function PaymentView() {
  return (
    <AppShell active="Deposit Fund" title="Deposit fund" actions={<PrimaryBtn>+ Add funds</PrimaryBtn>}>
      <div className="grid grid-cols-[1.05fr_1fr] gap-3">
        <div className="flex flex-col gap-3">
          <div className="rounded-[14px] bg-[linear-gradient(135deg,#e15aab,#8b5cf6)] p-5 text-white">
            <p className="text-[11.5px] opacity-80">Available balance</p>
            <p className="mt-1 text-[32px] font-bold tracking-tight">$12,450.00</p>
            <div className="mt-4 flex items-center justify-between text-[11px]">
              <span className="opacity-80">Covers the next 4 renewals</span>
              <span className="rounded-full bg-white/20 px-2.5 py-1 font-semibold">Auto-pay on</span>
            </div>
          </div>
          <Card className="p-4">
            <p className="mb-3 text-[12.5px] font-semibold">Payment methods</p>
            {[
              ['VISA', 'Visa ending 4242', 'Default', '#1a1f71'],
              ['MC', 'Mastercard ending 8812', '', '#eb001b'],
              ['BANK', 'Bank transfer (ACH)', '', '#0f8a5f'],
            ].map(([b, label, tag, color]) => (
              <div key={label} className="flex items-center gap-3 border-t border-[#f1f2f4] py-2.5 text-[12px] first:border-0 first:pt-0">
                <span className="flex h-6 w-9 items-center justify-center rounded-[5px] text-[8.5px] font-bold text-white" style={{ background: color }}>
                  {b}
                </span>
                <span className="flex-1">{label}</span>
                {tag && <Pill tone="gray">{tag}</Pill>}
              </div>
            ))}
          </Card>
        </div>
        <Card className="p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[12.5px] font-semibold">Recent transactions</p>
            <span className="text-[11px] text-pink">View all</span>
          </div>
          {[
            ['Deposit · Bank transfer', '+$5,000.00', 'Oct 28', true],
            ['Google Workspace renewal', '-$6,912.00', 'Oct 14', false],
            ['ClickUp renewal', '-$2,880.00', 'Oct 02', false],
            ['Deposit · Visa 4242', '+$8,000.00', 'Sep 30', true],
            ['Zoom renewal', '-$1,728.00', 'Sep 19', false],
            ['Notion renewal', '-$2,952.00', 'Sep 06', false],
          ].map(([label, amt, date, credit]) => (
            <div key={String(label)} className="flex items-center gap-3 border-t border-[#f1f2f4] py-[9px] text-[12px] first:border-0 first:pt-0">
              <span className={`flex size-7 items-center justify-center rounded-full text-[13px] ${credit ? 'bg-[#e7f8f1] text-[#0f8a5f]' : 'bg-[#f1f2f4] text-[#4b5563]'}`}>
                {credit ? '↓' : '↑'}
              </span>
              <span className="flex-1">
                <span className="block font-medium">{label}</span>
                <span className="block text-[10.5px] text-[#9aa1ad]">{date}</span>
              </span>
              <span className={`font-semibold ${credit ? 'text-[#0f8a5f]' : ''}`}>{amt}</span>
            </div>
          ))}
        </Card>
      </div>
    </AppShell>
  );
}

/* 4 · Centralized Management — overview dashboard */
export function DashboardView() {
  const bars = [42, 55, 48, 63, 58, 71, 66, 78, 74, 86, 80, 92];
  return (
    <AppShell active="Dashboard" title="Dashboard" actions={<Pill tone="gray">This year ▾</Pill>}>
      <div className="mb-3 grid grid-cols-4 gap-3">
        {[
          ['Active subscriptions', '32', 'blue'],
          ['Yearly spend', '$24,560', 'pink'],
          ['Renewals this month', '8', 'amber'],
          ['Seats in use', '214 / 240', 'green'],
        ].map(([k, v, tone]) => (
          <Card key={k} className="p-3.5">
            <p className="text-[10.5px] text-[#6b7280]">{k}</p>
            <p className="mt-1 text-[20px] font-bold">{v}</p>
            <span className={`mt-2 block h-1 rounded-full ${{ blue: 'bg-[#93b4ff]', pink: 'bg-[#f3a6d2]', amber: 'bg-[#fcd38d]', green: 'bg-[#8fe0bf]' }[tone as string]}`} />
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-[1.6fr_1fr] gap-3">
        <Card className="p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[12.5px] font-semibold">Spending overview</p>
            <span className="flex gap-3 text-[10.5px] text-[#6b7280]">
              <span className="flex items-center gap-1"><i className="size-2 rounded-full bg-pink" />Spend</span>
              <span className="flex items-center gap-1"><i className="size-2 rounded-full bg-[#c7d2fe]" />Saved</span>
            </span>
          </div>
          <div className="flex h-[200px] items-end gap-[10px] border-b border-[#eef0f3] pb-1">
            {bars.map((h, i) => (
              <div key={i} className="flex flex-1 flex-col justify-end gap-[2px]" style={{ height: '100%' }}>
                <span className="rounded-t-[4px] bg-[#c7d2fe]" style={{ height: `${h * 0.28}%` }} />
                <span className="rounded-b-[2px] bg-pink" style={{ height: `${h * 0.7}%` }} />
              </div>
            ))}
          </div>
          <div className="mt-1.5 flex justify-between text-[9.5px] text-[#9aa1ad]">
            {['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'].map((m, i) => (
              <span key={i} className="flex-1 text-center">{m}</span>
            ))}
          </div>
        </Card>
        <Card className="p-4">
          <p className="mb-2 text-[12.5px] font-semibold">Connected tools</p>
          {([
            ['google', 'Google Workspace', 'IT · 40 seats'],
            ['clickup', 'ClickUp', 'Ops · 25 seats'],
            ['adobe', 'Adobe CC', 'Design · 8 seats'],
            ['notion', 'Notion', 'All · 30 seats'],
            ['zoom', 'Zoom', 'Sales · 12 hosts'],
          ] as [Tool, string, string][]).map(([t, n, d]) => (
            <div key={n} className="flex items-center gap-2.5 border-t border-[#f1f2f4] py-[7px] first:border-0">
              <ToolLogo tool={t} size={16} />
              <span className="flex-1 text-[11.5px] font-medium">{n}</span>
              <span className="text-[10px] text-[#9aa1ad]">{d}</span>
            </div>
          ))}
        </Card>
      </div>
    </AppShell>
  );
}

/* 5 · Referral Reward — referral program */
export function ReferralView() {
  return (
    <AppShell active="Referrals" title="Referral rewards" actions={<PrimaryBtn>Invite a team</PrimaryBtn>}>
      <div className="mb-3 grid grid-cols-[1.4fr_1fr_1fr_1fr] gap-3">
        <Card className="p-3.5">
          <p className="text-[10.5px] text-[#6b7280]">Your referral link</p>
          <div className="mt-2 flex items-center gap-2 rounded-[8px] bg-[#f6f7f9] py-1.5 pr-1.5 pl-3">
            <span className="flex-1 truncate text-[11.5px] text-[#374151]">subscriptionpro.com/r/alexc</span>
            <span className="rounded-[6px] bg-[#1d1d2b] px-2.5 py-1 text-[10.5px] font-semibold text-white">Copy</span>
          </div>
        </Card>
        {[
          ['Teams invited', '18'],
          ['Joined', '11'],
          ['Credit earned', '$1,320'],
        ].map(([k, v], i) => (
          <Card key={k} className="p-3.5">
            <p className="text-[10.5px] text-[#6b7280]">{k}</p>
            <p className={`mt-1 text-[22px] font-bold ${i === 2 ? 'text-[#0f8a5f]' : ''}`}>{v}</p>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-[1.6fr_1fr] gap-3">
        <Card className="overflow-hidden">
          <div className="grid grid-cols-[1.5fr_1fr_0.8fr_0.8fr] bg-[#fafbfc] px-4 py-2 text-[10.5px] font-medium text-[#9aa1ad]">
            <span>Company</span>
            <span>Joined</span>
            <span>Status</span>
            <span>Reward</span>
          </div>
          {[
            ['Northwind Labs', 'Oct 21', 'Active', '$240'],
            ['Brightpath Studio', 'Oct 09', 'Active', '$180'],
            ['Kestrel Analytics', 'Sep 30', 'Pending', '$0'],
            ['Lumen Retail', 'Sep 12', 'Active', '$420'],
            ['Harbor & Co.', 'Aug 27', 'Active', '$300'],
          ].map(([c, d, s, r]) => (
            <div key={c} className="grid grid-cols-[1.5fr_1fr_0.8fr_0.8fr] items-center border-t border-[#f1f2f4] px-4 py-[9px] text-[12px]">
              <span className="flex items-center gap-2 font-medium">
                <span className="flex size-6 items-center justify-center rounded-full bg-[#eaf1ff] text-[10px] font-bold text-[#2557d6]">{c[0]}</span>
                {c}
              </span>
              <span className="text-[#4b5563]">{d}</span>
              <span>
                <Pill tone={s === 'Active' ? 'green' : 'amber'}>{s}</Pill>
              </span>
              <span className="font-semibold">{r}</span>
            </div>
          ))}
        </Card>
        <Card className="flex flex-col items-center justify-center p-4 text-center">
          <div className="relative flex size-[118px] items-center justify-center rounded-full bg-[conic-gradient(#14b8a6_0_66%,#e8f5f2_66%_100%)]">
            <span className="flex size-[88px] flex-col items-center justify-center rounded-full bg-white">
              <span className="text-[22px] font-bold">66%</span>
              <span className="text-[9.5px] text-[#9aa1ad]">to next tier</span>
            </span>
          </div>
          <p className="mt-3 text-[12.5px] font-semibold">Gold partner tier</p>
          <p className="mt-1 text-[10.5px] text-[#6b7280]">4 more teams to unlock 15% lifetime credit</p>
        </Card>
      </div>
    </AppShell>
  );
}

/* 6 · Active Support — ticket inbox + live chat */
export function SupportView() {
  return (
    <AppShell active="Support" title="Support" actions={<Pill tone="green">● Avg. reply 4 min</Pill>}>
      <div className="grid h-[430px] grid-cols-[0.85fr_1.4fr] gap-3">
        <Card className="overflow-hidden">
          {[
            ['License transfer to new admin', 'Open', 'pink', true],
            ['Adobe seats not syncing', 'In progress', 'amber', false],
            ['Invoice for Q3 renewals', 'Solved', 'green', false],
            ['Migrate from direct billing', 'Solved', 'green', false],
            ['Add bank transfer method', 'Solved', 'green', false],
          ].map(([t, s, tone, on]) => (
            <div key={String(t)} className={`border-b border-[#f1f2f4] px-3.5 py-3 ${on ? 'bg-[#fdf6fa]' : ''}`}>
              <p className="text-[12px] font-semibold">{t}</p>
              <div className="mt-1.5 flex items-center justify-between">
                <Pill tone={tone as 'pink'}>{s}</Pill>
                <span className="text-[10px] text-[#9aa1ad]">#{2400 + String(t).length}</span>
              </div>
            </div>
          ))}
        </Card>
        <Card className="flex flex-col">
          <div className="flex items-center gap-2.5 border-b border-[#f1f2f4] px-4 py-3">
            <span className="flex size-8 items-center justify-center rounded-full bg-[linear-gradient(135deg,#e15aab,#8b5cf6)] text-[11px] font-bold text-white">SR</span>
            <span className="flex-1">
              <span className="block text-[12.5px] font-semibold">Sara · SubscriptionPro support</span>
              <span className="block text-[10.5px] text-[#0f8a5f]">● Online</span>
            </span>
          </div>
          <div className="flex flex-1 flex-col gap-2.5 p-4 text-[12px] leading-[1.45]">
            <p className="max-w-[78%] self-end rounded-[12px] rounded-br-[4px] bg-[#1d1d2b] px-3 py-2 text-white">
              Hi! Our IT admin changed. Can we move all 40 Google Workspace licenses to the new account?
            </p>
            <p className="max-w-[78%] rounded-[12px] rounded-bl-[4px] bg-[#f3f4f6] px-3 py-2">
              Absolutely. I’ve started the transfer with Google. Your discount and renewal date stay the same.
            </p>
            <p className="max-w-[78%] rounded-[12px] rounded-bl-[4px] bg-[#f3f4f6] px-3 py-2">
              The new admin will get an invite within 10 minutes. Anything else I can help with?
            </p>
            <p className="max-w-[60%] self-end rounded-[12px] rounded-br-[4px] bg-[#1d1d2b] px-3 py-2 text-white">That was fast, thank you! 🙌</p>
          </div>
          <div className="m-3 flex items-center gap-2 rounded-full border border-[#e5e7eb] py-1.5 pr-1.5 pl-4">
            <span className="flex-1 text-[11.5px] text-[#9aa1ad]">Write a reply…</span>
            <span className="rounded-full bg-pink px-3.5 py-1.5 text-[11px] font-semibold text-white">Send</span>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
