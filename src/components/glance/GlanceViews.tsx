import type { ReactNode } from 'react';
import { AppShell, Card, Pill } from '../apart/Shell';
import { PrimaryBtn, ToolLogo, type Tool } from '../apart/Views';

/* One SubscriptionPro screen per tab of "Screenshot at a glance". 960×600, scaled by ScaledScreen. */

const Stat = ({ label, value, icon }: { label: string; value: string; icon: ReactNode }) => (
  <Card className="p-3.5">
    <div className="flex items-start justify-between">
      <p className="text-[11px] font-semibold">{label}</p>
      <span className="text-[12px] text-[#6b7280]">{icon}</span>
    </div>
    <p className="mt-2 text-[20px] font-bold">{value}</p>
  </Card>
);

/* Dashboard — mirrors the real SubscriptionPro dashboard layout */
export function GlanceDashboard() {
  const cats: [string, number, string][] = [
    ['Productivity', 46, '#e15aab'],
    ['Design', 24, '#8b5cf6'],
    ['Communication', 18, '#38bdf8'],
    ['AI tools', 12, '#f59e0b'],
  ];
  return (
    <AppShell active="Dashboard" title="Dashboard">
      <div className="grid grid-cols-[1.3fr_1fr_1fr] gap-3">
        <Card className="flex flex-col items-center justify-center py-6">
          <span className="flex size-11 items-center justify-center rounded-[10px] border-[2.5px] border-[#1d1d2b] text-[16px] font-bold">$</span>
          <p className="mt-3 text-[30px] font-bold">$2,450</p>
          <p className="text-[11px] text-[#6b7280]">Account Balance</p>
        </Card>
        {[
          ['$18,420', 'Total spending', 'linear-gradient(160deg,#5eead4 0%,#60a5fa 45%,#fff 92%)'],
          ['$1,320', 'Total earnings', 'linear-gradient(160deg,#fcd34d 0%,#c084fc 50%,#fff 92%)'],
        ].map(([v, l, bg]) => (
          <div key={l} className="flex flex-col justify-end rounded-[12px] border border-[#eef0f3] p-3.5" style={{ background: bg }}>
            <p className="text-[20px] font-bold">{v}</p>
            <p className="text-[11px] text-[#4b5563]">{l}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 grid grid-cols-4 gap-3">
        <Stat label="Spend With Us" value="$18,420" icon="➤" />
        <Stat label="Estimated Bill" value="$3,280" icon="▤" />
        <Stat label="Money Savings" value="$4,860" icon="◎" />
        <Stat label="Connected Tools" value="12" icon="▣" />
      </div>
      <div className="mt-3 grid grid-cols-[1fr_1.7fr] gap-3">
        <Card className="p-3.5">
          <p className="mb-2.5 text-[11.5px] font-semibold">Expense by category</p>
          {cats.map(([c, pct, col]) => (
            <div key={c} className="mb-2 last:mb-0">
              <div className="flex justify-between text-[10.5px] text-[#4b5563]">
                <span>{c}</span>
                <span>{pct}%</span>
              </div>
              <span className="mt-1 block h-1.5 rounded-full bg-[#f1f2f4]">
                <span className="block h-full rounded-full" style={{ width: `${pct * 2}%`, background: col }} />
              </span>
            </div>
          ))}
        </Card>
        <Card className="p-3.5">
          <div className="mb-2 flex justify-between">
            <p className="text-[11.5px] font-semibold">All Connected Tools</p>
            <span className="text-[10.5px] text-pink">View All</span>
          </div>
          {([
            ['google', 'Google Workspace', '40 seats', '$6,912', 'Nov 14'],
            ['clickup', 'ClickUp', '25 seats', '$2,880', 'Nov 28'],
            ['adobe', 'Adobe CC', '8 seats', '$5,760', 'Dec 03'],
          ] as [Tool, string, string, string, string][]).map(([t, n, lic, amt, ren]) => (
            <div key={n} className="grid grid-cols-[1.6fr_0.9fr_0.8fr_0.7fr] items-center border-t border-[#f1f2f4] py-[6px] text-[11px] first:border-0">
              <span className="flex items-center gap-2 font-medium">
                <ToolLogo tool={t} size={14} />
                {n}
              </span>
              <span className="text-[#6b7280]">{lic}</span>
              <span className="font-semibold">{amt}</span>
              <span className="text-[#6b7280]">{ren}</span>
            </div>
          ))}
        </Card>
      </div>
    </AppShell>
  );
}

/* Products — searchable catalogue table */
export function GlanceProducts() {
  const rows: [Tool, string, string, string, number][] = [
    ['notion', 'Notion', 'Productivity', 'Plus · Business', 96],
    ['canva', 'Canva', 'Design', 'Pro · Teams', 120],
    ['chatgpt', 'ChatGPT', 'AI', 'Team · Enterprise', 240],
    ['zoom', 'Zoom', 'Communication', 'Pro · Business', 144],
    ['microsoft', 'Microsoft 365', 'Productivity', 'Business Standard', 211],
    ['adobe', 'Adobe Creative Cloud', 'Design', 'Teams', 432],
  ];
  return (
    <AppShell active="Products" title="Products" actions={<PrimaryBtn>Request a tool</PrimaryBtn>}>
      <div className="mb-3 flex gap-2">
        <span className="flex flex-1 items-center gap-2 rounded-[8px] border border-[#e5e7eb] bg-white px-3 py-2 text-[11.5px] text-[#9aa1ad]">⌕ Search 100+ products…</span>
        <span className="rounded-[8px] border border-[#e5e7eb] bg-white px-3 py-2 text-[11.5px] text-[#4b5563]">All categories ▾</span>
        <span className="rounded-[8px] border border-[#e5e7eb] bg-white px-3 py-2 text-[11.5px] text-[#4b5563]">Sort: Popular ▾</span>
      </div>
      <Card className="overflow-hidden">
        <div className="grid grid-cols-[1.7fr_1fr_1.2fr_0.8fr_0.7fr] bg-[#fafbfc] px-4 py-2 text-[10.5px] font-medium text-[#9aa1ad]">
          <span>Product</span>
          <span>Category</span>
          <span>Plans</span>
          <span>From</span>
          <span />
        </div>
        {rows.map(([t, n, cat, plans, from]) => (
          <div key={n} className="grid grid-cols-[1.7fr_1fr_1.2fr_0.8fr_0.7fr] items-center border-t border-[#f1f2f4] px-4 py-[9px] text-[12px]">
            <span className="flex items-center gap-2.5 font-semibold">
              <ToolLogo tool={t} size={18} />
              {n}
            </span>
            <span>
              <Pill tone="gray">{cat}</Pill>
            </span>
            <span className="text-[#4b5563]">{plans}</span>
            <span>
              <b className="text-pink">${from}</b>
              <span className="text-[10.5px] text-[#9aa1ad]">/yr</span>
            </span>
            <span className="justify-self-end rounded-full bg-[#1d1d2b] px-3 py-1 text-[10.5px] font-semibold text-white">Buy</span>
          </div>
        ))}
      </Card>
    </AppShell>
  );
}

/* Integrations — connect existing tools */
export function GlanceIntegrations() {
  const apps: [Tool, string, boolean][] = [
    ['zoom', 'Zoom', true],
    ['microsoft', 'Microsoft 365', true],
    ['google', 'Google Workspace', true],
    ['clickup', 'ClickUp', false],
    ['notion', 'Notion', true],
    ['canva', 'Canva', false],
    ['adobe', 'Adobe CC', false],
    ['chatgpt', 'ChatGPT', true],
  ];
  return (
    <AppShell
      active="Integrations"
      title="Integrations"
      actions={<span className="rounded-full bg-pink px-3.5 py-[7px] text-[11.5px] font-semibold text-white">Request New Tools</span>}
    >
      <p className="-mt-2 mb-3 text-[12px] text-[#4b5563]">
        <b className="text-[#2557d6]">Manage</b>, track and optimize your entire <b className="text-pink">SaaS</b> ecosystem
      </p>
      <div className="grid grid-cols-4 gap-3">
        {apps.map(([t, n, on]) => (
          <Card key={n} className="flex flex-col items-center gap-2 px-3 py-4 text-center">
            <ToolLogo tool={t} size={30} />
            <p className="text-[12px] font-semibold">{n}</p>
            <span
              className={`rounded-full px-3 py-1 text-[10.5px] font-semibold ${on ? 'bg-[#e7f8f1] text-[#0f8a5f]' : 'bg-[#eaf1ff] text-[#2557d6]'}`}
            >
              {on ? '✓ Connected' : 'Connect'}
            </span>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}

/* Starter Deals — first-year offers */
export function GlanceStarterDeals() {
  const deals: [Tool, string, string, string, string, string][] = [
    ['notion', 'Notion Plus', '50% off first year', 'NOTION50', 'Ends in 3 days', 'pink'],
    ['canva', 'Canva Teams', '3 months free', 'CANVA3M', 'Ends in 6 days', 'blue'],
    ['zoom', 'Zoom Business', '40% off first year', 'ZOOM40', 'Ends in 9 days', 'green'],
    ['clickup', 'ClickUp Unlimited', '2 seats free', 'CLICK2', 'Ends in 12 days', 'amber'],
    ['chatgpt', 'ChatGPT Team', '30% off first year', 'GPTTEAM30', 'New this week', 'pink'],
    ['adobe', 'Adobe Express', '6 months free', 'EXPRESS6', 'Limited stock', 'blue'],
  ];
  return (
    <AppShell active="Starter Deals" title="Starter deals" actions={<Pill tone="pink">6 new deals</Pill>}>
      <div className="grid grid-cols-3 gap-3">
        {deals.map(([t, n, offer, code, ends, tone]) => (
          <Card key={n} className="flex flex-col gap-2.5 p-3.5">
            <div className="flex items-center justify-between">
              <ToolLogo tool={t} size={22} />
              <Pill tone={tone as 'pink'}>{ends}</Pill>
            </div>
            <div>
              <p className="text-[12.5px] font-semibold">{n}</p>
              <p className="text-[16px] font-bold text-pink">{offer}</p>
            </div>
            <div className="flex items-center justify-between rounded-[8px] border border-dashed border-[#d1d5db] bg-[#fafbfc] px-2.5 py-1.5">
              <span className="font-mono text-[11px] font-semibold tracking-wider">{code}</span>
              <span className="text-[10.5px] font-semibold text-[#2557d6]">Copy</span>
            </div>
            <span className="rounded-full bg-[#1d1d2b] py-[6px] text-center text-[11px] font-semibold text-white">Claim deal</span>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}

/* Deposit Fund — top-up form */
export function GlanceDeposit() {
  return (
    <AppShell active="Deposit Fund" title="Deposit fund">
      <div className="grid grid-cols-[1.4fr_1fr] gap-3">
        <Card className="p-4">
          <p className="text-[12.5px] font-semibold">Add funds to your wallet</p>
          <p className="mt-0.5 text-[11px] text-[#6b7280]">Renewals are paid automatically from this balance.</p>
          <p className="mt-4 text-[10.5px] text-[#6b7280]">Amount</p>
          <div className="mt-1.5 flex items-center rounded-[10px] border-2 border-pink bg-white px-3 py-2.5 text-[22px] font-bold">
            $1,000<span className="ml-0.5 animate-pulse text-pink">|</span>
          </div>
          <div className="mt-2.5 flex gap-2">
            {['$500', '$1,000', '$2,500', '$5,000'].map((a, i) => (
              <span key={a} className={`flex-1 rounded-[8px] py-1.5 text-center text-[11.5px] font-semibold ${i === 1 ? 'bg-[#fdeff7] text-[#c2398b]' : 'bg-[#f3f4f6] text-[#4b5563]'}`}>
                {a}
              </span>
            ))}
          </div>
          <p className="mt-4 mb-2 text-[10.5px] text-[#6b7280]">Pay with</p>
          {[
            ['VISA', 'Visa ending 4242', '#1a1f71', true],
            ['BANK', 'Bank transfer (ACH)', '#0f8a5f', false],
            ['PP', 'PayPal', '#1e40af', false],
          ].map(([b, l, c, on]) => (
            <div key={String(l)} className={`mb-2 flex items-center gap-3 rounded-[10px] border px-3 py-2 text-[12px] ${on ? 'border-pink bg-[#fff8fc]' : 'border-[#eef0f3]'}`}>
              <span className={`flex size-3.5 items-center justify-center rounded-full border-2 ${on ? 'border-pink' : 'border-[#d1d5db]'}`}>
                {on && <span className="size-1.5 rounded-full bg-pink" />}
              </span>
              <span className="flex h-5 w-8 items-center justify-center rounded-[4px] text-[8px] font-bold text-white" style={{ background: String(c) }}>
                {b}
              </span>
              {l}
            </div>
          ))}
        </Card>
        <Card className="flex flex-col p-4">
          <p className="text-[12.5px] font-semibold">Summary</p>
          {[
            ['Current balance', '$2,450.00'],
            ['Deposit', '+$1,000.00'],
            ['Processing fee', '$0.00'],
          ].map(([k, v]) => (
            <div key={k} className="mt-3 flex justify-between text-[12px]">
              <span className="text-[#6b7280]">{k}</span>
              <span className="font-medium">{v}</span>
            </div>
          ))}
          <div className="mt-3 flex justify-between border-t border-[#eef0f3] pt-3 text-[13px] font-bold">
            <span>New balance</span>
            <span>$3,450.00</span>
          </div>
          <div className="mt-4 rounded-[10px] bg-[#e7f8f1] p-3 text-[11px] text-[#0f8a5f]">Covers your next 5 renewals through Jan 2027.</div>
          <span className="mt-auto rounded-full bg-pink py-2.5 text-center text-[12.5px] font-semibold text-white">Deposit $1,000</span>
        </Card>
      </div>
    </AppShell>
  );
}

/* Billing — plan + invoices */
export function GlanceBilling() {
  const invoices: [string, string, string, string][] = [
    ['INV-2026-0142', 'Oct 14, 2026', '$6,912.00', 'Google Workspace'],
    ['INV-2026-0139', 'Oct 02, 2026', '$2,880.00', 'ClickUp'],
    ['INV-2026-0131', 'Sep 19, 2026', '$1,728.00', 'Zoom'],
    ['INV-2026-0127', 'Sep 06, 2026', '$2,952.00', 'Notion'],
    ['INV-2026-0118', 'Aug 21, 2026', '$5,760.00', 'Adobe CC'],
  ];
  return (
    <AppShell active="Billing" title="Billing" actions={<PrimaryBtn>Download all</PrimaryBtn>}>
      <div className="mb-3 grid grid-cols-3 gap-3">
        <div className="rounded-[12px] bg-[#1d1d2b] p-3.5 text-white">
          <p className="text-[10.5px] opacity-70">Current plan</p>
          <p className="mt-1 text-[18px] font-bold">Free forever</p>
          <p className="mt-1 text-[10.5px] opacity-70">Unlimited tools · 0% platform fee</p>
        </div>
        <Card className="p-3.5">
          <p className="text-[10.5px] text-[#6b7280]">Billed this year</p>
          <p className="mt-1 text-[20px] font-bold">$20,232</p>
        </Card>
        <Card className="p-3.5">
          <p className="text-[10.5px] text-[#6b7280]">Saved vs. list price</p>
          <p className="mt-1 text-[20px] font-bold text-[#0f8a5f]">$4,860</p>
        </Card>
      </div>
      <Card className="overflow-hidden">
        <div className="grid grid-cols-[1.2fr_1.2fr_1fr_0.9fr_0.7fr] bg-[#fafbfc] px-4 py-2 text-[10.5px] font-medium text-[#9aa1ad]">
          <span>Invoice</span>
          <span>For</span>
          <span>Date</span>
          <span>Amount</span>
          <span>Status</span>
        </div>
        {invoices.map(([no, forr, date, amt]) => (
          <div key={no} className="grid grid-cols-[1.2fr_1.2fr_1fr_0.9fr_0.7fr] items-center border-t border-[#f1f2f4] px-4 py-[9px] text-[12px]">
            <span className="font-mono text-[11px] font-semibold">{no}</span>
            <span>{forr}</span>
            <span className="text-[#6b7280]">{date}</span>
            <span className="font-semibold">{amt}</span>
            <span>
              <Pill>Paid</Pill>
            </span>
          </div>
        ))}
      </Card>
    </AppShell>
  );
}
