import { useMemo, useState, type ReactNode } from 'react';
import { TiltBadge } from '../../components/Badge';
import { ChatGptMark, ZoomMark } from '../../components/Brand';
import { Option } from './Option';

/* "Calculate Your Recurring Savings" — six alternative layouts. All of them do live maths (10% off, like today). */

const DISCOUNT = 0.1;
type Cycle = 'Yearly' | 'Monthly';
type P = { name: string; price: number; logo: ReactNode };

const img = (src: string, s = 26) => <img src={src} alt="" className="object-contain" style={{ width: s, height: s }} />;
const CATALOG: P[] = [
  { name: 'Google', price: 168, logo: img('/assets/brands/google.png') },
  { name: 'ClickUp', price: 144, logo: img('/assets/products/clickup.svg', 22) },
  { name: 'Microsoft 365', price: 150, logo: img('/assets/brands/microsoft365.png') },
  { name: 'Notion', price: 120, logo: img('/assets/brands/notion.png', 24) },
  { name: 'Zoom', price: 160, logo: <ZoomMark size={26} /> },
  { name: 'Adobe', price: 660, logo: img('/assets/brands/adobe-cc.png') },
  { name: 'ChatGPT', price: 300, logo: <ChatGptMark size={26} /> },
  { name: 'Canva', price: 120, logo: img('/assets/brands/canva.png') },
];
const byName = (n: string) => CATALOG.find((p) => p.name === n)!;
const money = (n: number) => `$${Math.round(n).toLocaleString('en-US')}`;

type Row = { id: number; name: string; price: number; cycle: Cycle; seats: number };
const yearlyOf = (r: Row) => r.price * (r.cycle === 'Monthly' ? 12 : 1) * r.seats;

function useRows(initial: string[]) {
  const [rows, setRows] = useState<Row[]>(() => initial.map((n, i) => ({ id: i + 1, name: n, price: byName(n).price, cycle: 'Yearly', seats: 1 })));
  const totals = useMemo(() => {
    const official = rows.reduce((s, r) => s + yearlyOf(r), 0);
    return { official, discounted: official * (1 - DISCOUNT), savings: official * DISCOUNT };
  }, [rows]);
  const update = (id: number, patch: Partial<Row>) => setRows((rs) => rs.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  const remove = (id: number) => setRows((rs) => (rs.length > 1 ? rs.filter((r) => r.id !== id) : rs));
  const add = (name?: string) =>
    setRows((rs) => {
      const n = name ?? CATALOG.find((p) => !rs.some((r) => r.name === p.name))?.name ?? CATALOG[0].name;
      return [...rs, { id: Date.now(), name: n, price: byName(n).price, cycle: 'Yearly', seats: 1 }];
    });
  const toggle = (name: string) => (rows.some((r) => r.name === name) ? setRows((rs) => rs.filter((r) => r.name !== name)) : add(name));
  return { rows, totals, update, remove, add, toggle };
}

function Heading({ align = 'center' }: { align?: 'center' | 'left' }) {
  return (
    <div className={align === 'center' ? 'mx-auto flex max-w-[760px] flex-col items-center text-center' : 'flex max-w-[520px] flex-col items-start'}>
      <TiltBadge className="mb-3 bg-indigo" angle={-5}>Best price</TiltBadge>
      <h2 className="text-[50px] leading-[1.1] font-bold tracking-[0.5px]">Calculate Your Recurring Savings</h2>
      <p className="mt-4 max-w-[585px] text-[18px] leading-[1.5] text-muted">Every number here reflects our journey helping tech companies &amp; people grow smarter and faster.</p>
    </div>
  );
}

const Wrap = ({ children, className = '' }: { children: ReactNode; className?: string }) => <div className={`px-5 py-20 ${className}`}><div className="mx-auto max-w-[1242px]">{children}</div></div>;
const Mark = ({ p, size = 44 }: { p: P; size?: number }) => (
  <span className="flex shrink-0 items-center justify-center rounded-[12px] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.08)]" style={{ width: size, height: size }}>
    {p.logo}
  </span>
);
function PriceField({ value, onChange, className = '' }: { value: number; onChange: (n: number) => void; className?: string }) {
  return (
    <label className={`flex items-center gap-2 rounded-full bg-card px-4 font-poppins text-[15px] ${className}`}>
      <span className="font-semibold">$</span>
      <input inputMode="decimal" value={value} onChange={(e) => onChange(Number(e.target.value.replace(/[^\d.]/g, '')) || 0)} className="w-full min-w-0 bg-transparent py-3 outline-none" />
    </label>
  );
}
function CycleToggle({ value, onChange, dark = false }: { value: Cycle; onChange: (c: Cycle) => void; dark?: boolean }) {
  return (
    <span className={`inline-flex rounded-full p-1 font-poppins text-[13px] ${dark ? 'bg-white/10' : 'bg-card'}`}>
      {(['Monthly', 'Yearly'] as const).map((c) => (
        <button key={c} type="button" onClick={() => onChange(c)} className={`rounded-full px-3 py-[6px] transition ${value === c ? (dark ? 'bg-white text-black' : 'bg-white text-black shadow-sm') : dark ? 'text-white/60' : 'text-muted'}`}>
          {c}
        </button>
      ))}
    </span>
  );
}

/** A — Pick your stack: tap logos to add tools; a dark result card keeps the total. */
function A() {
  const c = useRows(['Google', 'ClickUp', 'Adobe']);
  return (
    <Wrap>
      <Heading />
      <div className="mt-14 grid grid-cols-[minmax(0,1fr)_400px] gap-6">
        <div className="rounded-[24px] bg-calc p-8">
          <p className="font-poppins text-[14px] font-semibold text-[#4b5b66]">1 · Pick the tools you pay for</p>
          <div className="mt-4 grid grid-cols-4 gap-3">
            {CATALOG.map((p) => {
              const on = c.rows.some((r) => r.name === p.name);
              return (
                <button key={p.name} type="button" onClick={() => c.toggle(p.name)} className={`flex items-center gap-3 rounded-[16px] border-2 bg-white p-3 text-left font-poppins text-[14px] font-medium transition ${on ? 'border-pink' : 'border-transparent opacity-70 hover:opacity-100'}`}>
                  <Mark p={p} size={36} />
                  {p.name}
                </button>
              );
            })}
          </div>
          <p className="mt-8 font-poppins text-[14px] font-semibold text-[#4b5b66]">2 · What do you pay today?</p>
          <div className="mt-4 flex flex-col gap-3">
            {c.rows.map((r) => (
              <div key={r.id} className="flex items-center gap-4 rounded-[16px] bg-white p-3 pr-4">
                <Mark p={byName(r.name)} size={40} />
                <span className="flex-1 font-poppins text-[15px] font-medium">{r.name}</span>
                <PriceField value={r.price} onChange={(n) => c.update(r.id, { price: n })} className="w-[130px]" />
                <CycleToggle value={r.cycle} onChange={(v) => c.update(r.id, { cycle: v })} />
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-between rounded-[24px] bg-[#1d1d2b] p-9 text-white">
          <div>
            <p className="font-poppins text-[14px] text-white/60">You save every year</p>
            <p className="mt-3 font-poppins text-[64px] leading-none font-bold text-[#f6b3d9]">{money(c.totals.savings)}</p>
            <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 font-poppins text-[15px]">
              <p className="flex justify-between text-white/60"><span>Official price</span><span className="line-through">{money(c.totals.official)}</span></p>
              <p className="flex justify-between"><span>With SubscriptionPro</span><span className="font-semibold">{money(c.totals.discounted)}</span></p>
              <p className="flex justify-between text-white/60"><span>Tools</span><span>{c.rows.length}</span></p>
            </div>
          </div>
          <button className="mt-8 rounded-full bg-pink py-4 font-semibold">Start saving</button>
        </div>
      </div>
    </Wrap>
  );
}

/** B — Receipt: compact inputs on the left, a paper receipt with struck-through prices on the right. */
function B() {
  const c = useRows(['Google', 'ClickUp', 'Microsoft 365']);
  return (
    <Wrap>
      <div className="grid grid-cols-[minmax(0,1fr)_440px] items-start gap-14">
        <div>
          <Heading align="left" />
          <div className="mt-10 flex flex-col gap-3">
            {c.rows.map((r) => (
              <div key={r.id} className="grid grid-cols-[1fr_140px_auto_40px] items-center gap-3 rounded-[18px] border border-black/10 p-3">
                <select value={r.name} onChange={(e) => c.update(r.id, { name: e.target.value, price: byName(e.target.value).price })} className="rounded-full bg-card px-4 py-3 font-poppins text-[15px] outline-none">
                  {CATALOG.map((p) => <option key={p.name}>{p.name}</option>)}
                </select>
                <PriceField value={r.price} onChange={(n) => c.update(r.id, { price: n })} />
                <CycleToggle value={r.cycle} onChange={(v) => c.update(r.id, { cycle: v })} />
                <button onClick={() => c.remove(r.id)} className="text-[20px] text-muted hover:text-black">×</button>
              </div>
            ))}
            <button onClick={() => c.add()} className="self-start rounded-full border border-dashed border-black/25 px-5 py-3 font-poppins text-[14px] font-medium hover:border-black">+ Add a tool</button>
          </div>
        </div>
        <div className="relative rotate-[1.2deg] bg-white px-9 pt-9 pb-12 font-mono text-[14px] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.25)] [mask-image:radial-gradient(circle_at_10px_100%,transparent_9px,#000_10px)] [mask-position:-10px_0] [mask-size:20px_100%]">
          <p className="text-center text-[13px] tracking-[0.3em] text-muted">SUBSCRIPTIONPRO</p>
          <p className="mt-1 text-center text-[12px] text-muted">Yearly savings receipt</p>
          <div className="my-6 border-t border-dashed border-black/25" />
          {c.rows.map((r) => (
            <div key={r.id} className="mb-4">
              <p className="flex justify-between"><span>{r.name}</span><span>{money(yearlyOf(r) * (1 - DISCOUNT))}</span></p>
              <p className="flex justify-between text-[12px] text-muted"><span>list {r.cycle.toLowerCase()}</span><span className="line-through">{money(yearlyOf(r))}</span></p>
            </div>
          ))}
          <div className="my-6 border-t border-dashed border-black/25" />
          <p className="flex justify-between text-muted"><span>Official total</span><span>{money(c.totals.official)}</span></p>
          <p className="mt-2 flex justify-between"><span>You pay</span><span>{money(c.totals.discounted)}</span></p>
          <p className="mt-5 flex items-baseline justify-between rounded-[10px] bg-[#f1fadf] px-4 py-3 font-poppins">
            <span className="text-[14px] font-semibold">You save</span>
            <span className="text-[30px] font-bold text-[#2f7d45]">{money(c.totals.savings)}</span>
          </p>
        </div>
      </div>
    </Wrap>
  );
}

/** C — Two sliders: team size and spend per person; the answer is one big number and two bars. */
function C() {
  const [team, setTeam] = useState(25);
  const [spend, setSpend] = useState(120);
  const official = team * spend * 12;
  const ours = official * (1 - DISCOUNT);
  // plain function, not a component: a component declared in render would remount the range input mid-drag
  const slider = ({ label, value, min, max, step, onChange, fmt }: { label: string; value: number; min: number; max: number; step: number; onChange: (n: number) => void; fmt: (n: number) => string }) => (
    <label className="block">
      <span className="flex items-baseline justify-between font-poppins">
        <span className="text-[15px] text-[#4b5b66]">{label}</span>
        <span className="text-[26px] font-bold">{fmt(value)}</span>
      </span>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="mt-3 w-full accent-[#e15aab]" />
    </label>
  );
  return (
    <Wrap>
      <Heading />
      <div className="mx-auto mt-14 grid max-w-[1060px] grid-cols-2 overflow-hidden rounded-[28px] bg-calc">
        <div className="flex flex-col justify-center gap-10 p-12">
          {slider({ label: 'Team size', value: team, min: 1, max: 200, step: 1, onChange: setTeam, fmt: (n) => `${n} people` })}
          {slider({ label: 'SaaS spend per person / month', value: spend, min: 10, max: 500, step: 5, onChange: setSpend, fmt: money })}
        </div>
        <div className="m-3 flex flex-col justify-between rounded-[22px] bg-white p-10">
          <div>
            <p className="font-poppins text-[15px] text-muted">Estimated yearly savings</p>
            <p className="mt-2 font-poppins text-[72px] leading-none font-bold text-pink">{money(official - ours)}</p>
          </div>
          <div className="mt-10 flex flex-col gap-4 font-poppins text-[14px]">
            <div>
              <p className="flex justify-between text-muted"><span>Buying direct</span><span>{money(official)}</span></p>
              <div className="mt-2 h-3 rounded-full bg-[#d9dde1]" />
            </div>
            <div>
              <p className="flex justify-between"><span className="font-semibold">With SubscriptionPro</span><span className="font-semibold">{money(ours)}</span></p>
              <div className="mt-2 h-3 rounded-full bg-[linear-gradient(90deg,#c45fb4,#f5c94e)]" style={{ width: `${(1 - DISCOUNT) * 100}%` }} />
            </div>
          </div>
        </div>
      </div>
    </Wrap>
  );
}

/** D — Bar rows: every tool shows its official vs discounted bar, so the gap is visible at a glance. */
function D() {
  const c = useRows(['Adobe', 'ChatGPT', 'Google', 'Notion']);
  const max = Math.max(...c.rows.map(yearlyOf), 1);
  return (
    <Wrap>
      <Heading />
      <div className="mt-14 rounded-[28px] bg-calc p-8">
        <div className="flex flex-col gap-3">
          {c.rows.map((r) => {
            const y = yearlyOf(r);
            return (
              <div key={r.id} className="grid grid-cols-[220px_minmax(0,1fr)_150px] items-center gap-6 rounded-[18px] bg-white p-4 pr-6">
                <span className="flex items-center gap-3">
                  <Mark p={byName(r.name)} size={42} />
                  <span>
                    <span className="block font-poppins text-[15px] font-semibold">{r.name}</span>
                    <button onClick={() => c.update(r.id, { cycle: r.cycle === 'Yearly' ? 'Monthly' : 'Yearly' })} className="font-poppins text-[12px] text-muted underline decoration-dotted">
                      ${r.price} · {r.cycle.toLowerCase()}
                    </button>
                  </span>
                </span>
                <span className="flex flex-col gap-[6px]">
                  <span className="h-[10px] rounded-full bg-[#d9dde1]" style={{ width: `${(y / max) * 100}%` }} />
                  <span className="h-[10px] rounded-full bg-pink transition-[width] duration-500" style={{ width: `${((y * (1 - DISCOUNT)) / max) * 100}%` }} />
                </span>
                <span className="text-right font-poppins">
                  <span className="block text-[22px] font-bold text-pink">{money(y * (1 - DISCOUNT))}</span>
                  <span className="text-[12px] text-muted line-through">{money(y)}</span>
                </span>
              </div>
            );
          })}
        </div>
        <div className="mt-6 flex items-center justify-between rounded-[18px] bg-[#1d1d2b] px-8 py-6 text-white">
          <span className="flex items-center gap-6 font-poppins text-[14px] text-white/70">
            <span className="flex items-center gap-2"><span className="size-3 rounded-full bg-[#d9dde1]" />Official</span>
            <span className="flex items-center gap-2"><span className="size-3 rounded-full bg-pink" />SubscriptionPro</span>
          </span>
          <span className="font-poppins text-[26px] font-bold">Total savings {money(c.totals.savings)} <span className="ml-2 rounded-full bg-amber px-3 py-1 align-middle text-[13px] font-medium">Yearly</span></span>
        </div>
      </div>
    </Wrap>
  );
}

/** E — Spreadsheet: a clean editable table with a gradient totals footer. */
function E() {
  const c = useRows(['Google', 'ClickUp', 'Microsoft 365']);
  const cell = 'border-b border-black/8 px-5 py-4';
  return (
    <Wrap>
      <Heading />
      <div className="mt-14 overflow-hidden rounded-[24px] border border-black/10 bg-white shadow-[0_30px_60px_-30px_rgba(0,0,0,0.2)]">
        <table className="w-full font-poppins text-[15px]">
          <thead className="bg-[#f6f8fa] text-left text-[13px] text-[#4b5b66]">
            <tr>
              {['Product', 'Seats', 'Official price', 'Billing', 'You pay / yr', 'Savings', ''].map((h) => <th key={h} className={`${cell} font-medium`}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {c.rows.map((r) => (
              <tr key={r.id} className="hover:bg-[#fafbfc]">
                <td className={cell}><span className="flex items-center gap-3"><Mark p={byName(r.name)} size={34} />{r.name}</span></td>
                <td className={cell}>
                  <span className="inline-flex items-center gap-3 rounded-full bg-card px-2 py-1">
                    <button onClick={() => c.update(r.id, { seats: Math.max(1, r.seats - 1) })} className="size-7 rounded-full bg-white">−</button>
                    {r.seats}
                    <button onClick={() => c.update(r.id, { seats: r.seats + 1 })} className="size-7 rounded-full bg-white">+</button>
                  </span>
                </td>
                <td className={cell}><PriceField value={r.price} onChange={(n) => c.update(r.id, { price: n })} className="w-[120px]" /></td>
                <td className={cell}><CycleToggle value={r.cycle} onChange={(v) => c.update(r.id, { cycle: v })} /></td>
                <td className={`${cell} text-[18px] font-semibold text-pink`}>{money(yearlyOf(r) * (1 - DISCOUNT))}</td>
                <td className={cell}><span className="rounded-full bg-[#2f7d45] px-3 py-1 text-[12px] text-[#bcfcc8]">{money(yearlyOf(r) * DISCOUNT)}</span></td>
                <td className={`${cell} text-right`}><button onClick={() => c.remove(r.id)} className="text-muted hover:text-black">Remove</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-between bg-[linear-gradient(110deg,#c45fb4_0%,#e7a5c9_50%,#f5c94e_100%)] px-6 py-6">
          <button onClick={() => c.add()} className="rounded-full bg-white/80 px-5 py-3 font-poppins text-[14px] font-semibold">+ Add product</button>
          <span className="font-poppins text-white">
            <span className="mr-6 text-[15px] opacity-90">Official {money(c.totals.official)} · You pay {money(c.totals.discounted)}</span>
            <span className="text-[30px] font-bold">Save {money(c.totals.savings)}/yr</span>
          </span>
        </div>
      </div>
    </Wrap>
  );
}

/** F — Big answer first: savings + ring on the left, tool cards with seat steppers on the right. */
function F() {
  const c = useRows(['ChatGPT', 'Zoom', 'Canva', 'Notion']);
  const pct = c.totals.official ? c.totals.savings / c.totals.official : 0;
  const R = 74;
  const C2 = 2 * Math.PI * R;
  return (
    <Wrap className="bg-[#f7f9fb]">
      <div className="grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] items-center gap-14">
        <div>
          <Heading align="left" />
          <div className="mt-10 flex items-center gap-8 rounded-[24px] bg-white p-8">
            <svg viewBox="0 0 180 180" className="size-[150px] shrink-0 -rotate-90">
              <circle cx="90" cy="90" r={R} fill="none" stroke="#eef0f3" strokeWidth="18" />
              <circle cx="90" cy="90" r={R} fill="none" stroke="#e15aab" strokeWidth="18" strokeLinecap="round" strokeDasharray={`${C2 * pct} ${C2}`} />
            </svg>
            <div>
              <p className="font-poppins text-[14px] text-muted">Total savings · yearly</p>
              <p className="font-poppins text-[56px] leading-[1.1] font-bold">{money(c.totals.savings)}</p>
              <p className="mt-1 font-poppins text-[14px] text-muted">{money(c.totals.official)} → <b className="text-black">{money(c.totals.discounted)}</b></p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {c.rows.map((r) => {
            const p = byName(r.name);
            return (
              <div key={r.id} className="flex flex-col gap-5 rounded-[22px] bg-white p-6">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-3"><Mark p={p} size={42} /><span className="font-poppins text-[16px] font-semibold">{r.name}</span></span>
                  <button onClick={() => c.remove(r.id)} className="text-muted hover:text-black">×</button>
                </div>
                <CycleToggle value={r.cycle} onChange={(v) => c.update(r.id, { cycle: v })} />
                <div className="flex items-end justify-between">
                  <span className="inline-flex items-center gap-3 rounded-full bg-card px-2 py-1 font-poppins text-[14px]">
                    <button onClick={() => c.update(r.id, { seats: Math.max(1, r.seats - 1) })} className="size-7 rounded-full bg-white">−</button>
                    {r.seats} seat{r.seats > 1 ? 's' : ''}
                    <button onClick={() => c.update(r.id, { seats: r.seats + 1 })} className="size-7 rounded-full bg-white">+</button>
                  </span>
                  <span className="text-right font-poppins">
                    <span className="block text-[22px] font-bold text-pink">{money(yearlyOf(r) * (1 - DISCOUNT))}</span>
                    <span className="text-[12px] text-muted line-through">{money(yearlyOf(r))}</span>
                  </span>
                </div>
              </div>
            );
          })}
          <button onClick={() => c.add()} className="col-span-2 rounded-[22px] border-2 border-dashed border-black/15 py-5 font-poppins text-[15px] font-medium text-muted hover:border-black hover:text-black">+ Add another tool</button>
        </div>
      </div>
    </Wrap>
  );
}

export const calculatorOptions = [
  { code: 'A', name: 'Pick your stack', note: 'Tap brand tiles to add tools, set what you pay, and a dark result card keeps the yearly saving. Most visual.', C: A },
  { code: 'B', name: 'Receipt', note: 'Compact inputs on the left; a tilted paper receipt on the right with struck-through list prices and a green “You save”.', C: B },
  { code: 'C', name: 'Two sliders', note: 'No product list at all — team size × spend per person, one big pink number and two comparison bars. Simplest.', C: C },
  { code: 'D', name: 'Bar rows', note: 'Each tool shows an official vs SubscriptionPro bar so the gap is visible; dark totals strip underneath.', C: D },
  { code: 'E', name: 'Spreadsheet', note: 'Clean editable table with seats, billing toggle and per-row savings; gradient footer carries the totals.', C: E },
  { code: 'F', name: 'Answer first', note: 'Big saving with a progress ring on the left; tool cards with seat steppers and cycle toggles on the right.', C: F },
];

export function CalculatorOptions() {
  return (
    <>
      {calculatorOptions.map(({ code, name, note, C }) => (
        <Option key={code} id={`calculator-${code.toLowerCase()}`} code={code} name={name} note={note}>
          <C />
        </Option>
      ))}
    </>
  );
}
