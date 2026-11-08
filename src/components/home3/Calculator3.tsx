import { useMemo, useRef, useState, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { TiltBadge } from '../Badge';
import { ChatGptMark, ZoomMark } from '../Brand';

/* Home Three calculator (review rows 15 + 22): cleaner UI, product logos in every row, a Monthly/Yearly toggle,
   totals update live (no separate Calculate step), no purchase button, and the total savings centred underneath. */

const DISCOUNT = 0.1;
type Cycle = 'Monthly' | 'Yearly';
const lg = (src: string, s = 22) => <img src={src} alt="" className="object-contain" style={{ width: s, height: s }} />;
const CATALOG: { name: string; logo: ReactNode }[] = [
  { name: 'Google', logo: lg('/assets/brands/google.png') },
  { name: 'ClickUp', logo: lg('/assets/products/clickup.svg', 19) },
  { name: 'Microsoft 365', logo: lg('/assets/brands/microsoft365.png') },
  { name: 'Notion', logo: lg('/assets/brands/notion.png', 20) },
  { name: 'Zoom', logo: <ZoomMark size={22} /> },
  { name: 'Adobe', logo: lg('/assets/brands/adobe-cc.png') },
  { name: 'ChatGPT', logo: <ChatGptMark size={21} /> },
  { name: 'Canva', logo: lg('/assets/brands/canva.png') },
];
const logoOf = (n: string) => CATALOG.find((c) => c.name === n)?.logo;
type Row = { id: number; product: string; price: string; cycle: Cycle };
const PLACEHOLDER = 200;
const initial: Row[] = [
  { id: 1, product: 'Google', price: '', cycle: 'Yearly' },
  { id: 2, product: 'ClickUp', price: '', cycle: 'Yearly' },
  { id: 3, product: 'Microsoft 365', price: '', cycle: 'Yearly' },
];
const priceOf = (r: Row) => (r.price === '' ? PLACEHOLDER : Number(r.price) || 0);
const yearly = (r: Row) => priceOf(r) * (r.cycle === 'Monthly' ? 12 : 1);
const money = (n: number) => `$${Math.round(n).toLocaleString('en-US')}`;

function CycleToggle({ value, onChange }: { value: Cycle; onChange: (c: Cycle) => void }) {
  return (
    <span className="inline-flex w-full rounded-full bg-[#f2f3f7] p-1 font-poppins text-[14px]">
      {(['Monthly', 'Yearly'] as const).map((c) => (
        <button
          key={c}
          type="button"
          onClick={() => onChange(c)}
          className={`flex-1 rounded-full px-3 py-[9px] transition ${value === c ? 'bg-white font-medium text-[#14141f] shadow-[0_2px_6px_rgba(20,20,60,0.1)]' : 'text-[#7b8794] hover:text-[#14141f]'}`}
        >
          {c}
        </button>
      ))}
    </span>
  );
}

export function Calculator3() {
  const [rows, setRows] = useState<Row[]>(initial);
  const totalRef = useRef<HTMLParagraphElement>(null);
  const totals = useMemo(() => {
    const official = rows.reduce((s, r) => s + yearly(r), 0);
    return { official, discounted: official * (1 - DISCOUNT), savings: official * DISCOUNT };
  }, [rows]);

  const pulse = () => gsap.fromTo(totalRef.current, { scale: 0.94 }, { scale: 1, duration: 0.5, ease: 'back.out(2)' });
  const update = (id: number, patch: Partial<Row>) => {
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, ...patch } : r)));
    pulse();
  };
  const remove = (id: number) => setRows((rs) => (rs.length > 1 ? rs.filter((r) => r.id !== id) : rs));
  const add = () =>
    setRows((rs) => [...rs, { id: Date.now(), product: CATALOG.find((p) => !rs.some((r) => r.product === p.name))?.name ?? 'Google', price: '', cycle: 'Yearly' }]);

  const label = 'font-poppins text-[13px] font-medium tracking-[0.02em] text-[#7b8794]';
  return (
    <section className="px-5 py-16 md:py-24 xl:pt-[150px] xl:pb-[130px]">
      <div className="mx-auto flex max-w-[846px] flex-col items-center gap-5 text-center md:gap-6">
        <span data-anim="scale-in">
          <TiltBadge className="bg-indigo !px-3 !py-1 !text-[12px] lg:!px-[18px] lg:!py-[6px] lg:!text-[14px]" angle={-4}>Best price</TiltBadge>
        </span>
        <h2 data-split className="text-[34px] leading-[1.1] font-bold tracking-[0.5909px] text-balance sm:text-[44px] lg:text-[56px]">Calculate Your Recurring Savings</h2>
        <p data-anim="fade-up" className="max-w-[560px] text-[17px] leading-[1.5] text-balance text-muted md:text-[19px]">
          Add the tools you pay for today and see what you would save every year with SubscriptionPro.
        </p>
      </div>

      <div data-anim="fade-up" className="mx-auto mt-10 max-w-[1180px] overflow-hidden rounded-[28px] border border-[#eceef4] bg-white shadow-[0_40px_80px_-50px_rgba(20,30,90,0.45)] md:mt-14">
        <div className="p-4 sm:p-6 xl:p-8">
          {/* column labels (desktop) */}
          <div className="hidden grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1.1fr)_minmax(0,1fr)_minmax(0,0.8fr)_44px] gap-4 px-4 pb-3 lg:grid">
            <span className={label}>Product</span>
            <span className={label}>Official price</span>
            <span className={label}>Billing cycle</span>
            <span className={label}>You pay</span>
            <span className={label}>You save</span>
            <span />
          </div>

          <ul className="flex flex-col gap-3">
            {rows.map((r) => {
              const y = yearly(r);
              return (
                <li key={r.id} className="grid grid-cols-2 items-center gap-3 rounded-[20px] bg-[#f8f9fc] p-4 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1.1fr)_minmax(0,1fr)_minmax(0,0.8fr)_44px] lg:gap-4">
                  <label className="relative col-span-2 flex h-[52px] items-center gap-3 rounded-full border border-[#e6e8ef] bg-white pr-10 pl-3 lg:col-span-1">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#f5f6fa]">{logoOf(r.product)}</span>
                    <select
                      value={r.product}
                      onChange={(e) => update(r.id, { product: e.target.value })}
                      aria-label="Product"
                      className="h-full w-full cursor-pointer appearance-none bg-transparent font-poppins text-[15px] font-medium text-[#14141f] outline-none"
                    >
                      {CATALOG.map((c) => (
                        <option key={c.name}>{c.name}</option>
                      ))}
                    </select>
                    <svg viewBox="0 0 24 24" className="pointer-events-none absolute right-4 size-4 text-[#7b8794]" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </label>
                  <label className="flex h-[52px] items-center gap-2 rounded-full border border-[#e6e8ef] bg-white px-4 font-poppins text-[15px]">
                    <span className="font-semibold text-[#14141f]">$</span>
                    <input
                      inputMode="decimal"
                      value={r.price}
                      placeholder={String(PLACEHOLDER)}
                      onChange={(e) => update(r.id, { price: e.target.value.replace(/[^\d.]/g, '') })}
                      aria-label={`${r.product} official price`}
                      className="w-full min-w-0 bg-transparent outline-none placeholder:text-[#a5abb5]"
                    />
                  </label>
                  <CycleToggle value={r.cycle} onChange={(c) => update(r.id, { cycle: c })} />
                  <span className="font-poppins">
                    <span className="block text-[11px] text-[#7b8794] lg:hidden">You pay / yr</span>
                    <span className="text-[24px] font-semibold text-pink">{money(y * (1 - DISCOUNT))}</span>
                    <span className="text-[13px] text-[#9aa1ad]">/yr</span>
                  </span>
                  <span className="flex items-center justify-between gap-2">
                    <span className="rounded-full bg-[#dcf6ea] px-3 py-1.5 font-poppins text-[13px] font-semibold whitespace-nowrap text-[#0f8a5f]">
                      {money(y * DISCOUNT)} · {DISCOUNT * 100}%
                    </span>
                    <button type="button" onClick={() => remove(r.id)} disabled={rows.length < 2} aria-label={`Remove ${r.product}`} className="flex size-10 items-center justify-center rounded-full text-[#7b8794] transition hover:bg-white hover:text-[#e11d48] disabled:opacity-30 lg:hidden">
                      ✕
                    </button>
                  </span>
                  <button type="button" onClick={() => remove(r.id)} disabled={rows.length < 2} aria-label={`Remove ${r.product}`} className="hidden size-11 items-center justify-center rounded-full text-[#7b8794] transition hover:bg-white hover:text-[#e11d48] disabled:opacity-30 lg:flex">
                    <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" />
                    </svg>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 px-1">
            <button type="button" onClick={add} className="flex items-center gap-2 rounded-full border-[1.5px] border-dashed border-[#c9ccd6] px-5 py-3 font-poppins text-[14px] font-medium text-[#14141f] transition hover:border-[#14141f]">
              <span className="text-[18px] leading-none">+</span> Add product
            </button>
            <button type="button" onClick={() => setRows(initial)} className="font-poppins text-[14px] font-medium text-[#7b8794] underline-offset-4 hover:text-[#14141f] hover:underline">
              Reset
            </button>
          </div>
        </div>

        {/* centred total */}
        <div className="border-t border-[#eceef4] bg-[linear-gradient(110deg,#fdf1f8,#f3f1ff_50%,#fff7ea)] px-5 py-9 text-center md:py-11">
          <p className="font-poppins text-[14px] font-medium tracking-[0.14em] text-[#7b8794] uppercase">Total savings</p>
          <p ref={totalRef} className="mt-2 flex origin-center items-center justify-center gap-3 font-poppins text-[44px] leading-none font-bold text-[#14141f] md:text-[56px]">
            {money(totals.savings)}
            <span className="rounded-full bg-amber px-3 py-1 text-[14px] leading-[1.4] font-medium text-white">Yearly</span>
          </p>
          <p className="mt-4 font-poppins text-[15px] text-[#5d6b75] md:text-[17px]">
            Official price <b className="font-semibold text-[#14141f]">{money(totals.official)}</b>
            <span className="mx-3 text-[#c9ccd6]">|</span>
            With SubscriptionPro <b className="font-semibold text-pink">{money(totals.discounted)}</b>
          </p>
        </div>
      </div>
    </section>
  );
}
