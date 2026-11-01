import { useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { TiltBadge } from './Badge';
import { Chevron, Plus, Trash } from './Icons';
import { RollText } from './Roll';

const PRODUCTS = ['Google', 'ClickUp', 'Microsoft 365', 'Notion', 'Zoom', 'Adobe', 'ChatGPT', 'Canva'];
const DISCOUNT = 0.1;
type Cycle = 'Yearly' | 'Monthly';
type Row = { id: number; product: string; price: string; cycle: Cycle };

const initialRows: Row[] = [
  { id: 1, product: 'Google', price: '', cycle: 'Yearly' },
  { id: 2, product: 'ClickUp', price: '', cycle: 'Yearly' },
  { id: 3, product: 'Microsoft 365', price: '', cycle: 'Yearly' },
];
const PLACEHOLDER = 200;
const money = (n: number) => `$${n.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
const priceOf = (r: Row) => (r.price === '' ? PLACEHOLDER : Number(r.price) || 0);
const yearly = (r: Row) => priceOf(r) * (r.cycle === 'Monthly' ? 12 : 1);

function Select<T extends string>({ value, options, onChange, className = '', label }: {
  value: T; options: readonly T[]; onChange: (v: T) => void; className?: string; label: string;
}) {
  return (
    <label className={`relative block ${className}`}>
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className="h-[54px] w-full cursor-pointer appearance-none rounded-full bg-white pr-12 pl-6 font-poppins text-[15px] text-black outline-none focus-visible:ring-2 focus-visible:ring-indigo xl:h-[61px] xl:pl-[28px] xl:text-[16px]"
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
      <Chevron className="pointer-events-none absolute top-1/2 right-5 size-5 -translate-y-1/2 xl:right-6" />
    </label>
  );
}

function PriceInput({ row, onChange, className = '' }: { row: Row; onChange: (v: string) => void; className?: string }) {
  return (
    <label className={`flex h-[54px] items-center gap-3 rounded-full bg-card px-6 font-poppins text-[16px] xl:h-[61px] xl:px-[26px] ${className}`}>
      <span className="font-semibold">$</span>
      <input
        inputMode="decimal"
        value={row.price}
        placeholder={String(PLACEHOLDER)}
        onChange={(e) => onChange(e.target.value.replace(/[^\d.]/g, ''))}
        className="w-full min-w-0 bg-transparent outline-none placeholder:text-[#a5a5a5]"
        aria-label={`${row.product} official price`}
      />
    </label>
  );
}

function Discounted({ row }: { row: Row }) {
  const p = priceOf(row);
  return (
    <div className="flex h-[54px] items-center gap-3 xl:h-[61px] xl:gap-4">
      <span className="font-poppins text-[26px] font-semibold text-pink xl:text-[30px]">{money(p * (1 - DISCOUNT))}</span>
      <span className="rounded-full bg-[#2f7d45] px-3 py-[5px] font-poppins text-[11px] font-medium whitespace-nowrap text-[#bcfcc8]">
        {money(p * DISCOUNT)} ({DISCOUNT * 100}%)
      </span>
    </div>
  );
}

function Actions({ row, canRemove, onRemove, onAdd }: { row: Row; canRemove: boolean; onRemove: () => void; onAdd: () => void }) {
  return (
    <div className="flex h-[54px] w-[121px] items-center rounded-full bg-white xl:h-[61px]">
      <button type="button" onClick={onRemove} aria-label={`Remove ${row.product}`} disabled={!canRemove} className="flex h-full flex-1 items-center justify-center rounded-l-full hover:bg-neutral-50 disabled:opacity-40">
        <Trash className="size-6" />
      </button>
      <span className="h-8 w-px bg-neutral-200" />
      <button type="button" onClick={onAdd} aria-label="Add product" className="flex h-full flex-1 items-center justify-center rounded-r-full hover:bg-neutral-50">
        <Plus className="size-6" />
      </button>
    </div>
  );
}

export function Calculator() {
  const [rows, setRows] = useState<Row[]>(initialRows);
  const [shown, setShown] = useState<Row[]>(initialRows);
  const totalRef = useRef<HTMLParagraphElement>(null);

  const totals = useMemo(() => {
    const official = shown.reduce((s, r) => s + yearly(r), 0);
    return { official, discounted: official * (1 - DISCOUNT), savings: official * DISCOUNT };
  }, [shown]);

  const update = (id: number, patch: Partial<Row>) => setRows((rs) => rs.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  const remove = (id: number) => setRows((rs) => (rs.length > 1 ? rs.filter((r) => r.id !== id) : rs));
  const addAfter = (id: number) =>
    setRows((rs) => {
      const i = rs.findIndex((r) => r.id === id);
      const next = { id: Date.now(), product: PRODUCTS.find((p) => !rs.some((r) => r.product === p)) ?? PRODUCTS[0], price: '', cycle: 'Yearly' as Cycle };
      return [...rs.slice(0, i + 1), next, ...rs.slice(i + 1)];
    });
  const pulse = () => gsap.fromTo(totalRef.current, { scale: 0.92, color: '#e15aab' }, { scale: 1, color: '#1d1d2b', duration: 0.6, ease: 'back.out(2)' });
  const calculate = () => {
    setShown(rows);
    pulse();
  };
  const reset = () => {
    setRows(initialRows);
    setShown(initialRows);
    pulse();
  };

  const label = 'mb-[22px] block font-poppins text-[16px] whitespace-nowrap text-[#2b2b2b]';
  const small = 'mb-2 block font-poppins text-[13px] text-[#4b5b66]';

  return (
    <section className="px-5 py-16 md:py-24 xl:pt-[193px] xl:pb-[145px]">
      <div className="mx-auto flex max-w-[846px] flex-col items-center gap-5 text-center md:gap-7">
        <div className="relative flex flex-col items-center">
          <h2 data-split className="text-[34px] leading-[1.1] font-bold tracking-[0.5909px] sm:text-[44px] lg:text-[60px]">
            Calculate Your Recurring <br className="hidden lg:block" />
            Savings
          </h2>
          <span data-anim="scale-in" data-delay="0.5" className="order-first mb-3 sm:absolute sm:right-[-10px] sm:bottom-[-10px] sm:mb-0 lg:right-auto lg:bottom-[10px] lg:left-[calc(50%+128px)]">
            <TiltBadge className="bg-indigo !px-3 !py-1 !text-[12px] lg:!px-[18px] lg:!py-[6px] lg:!text-[16px]" angle={-5}>Best price</TiltBadge>
          </span>
        </div>
        <p data-anim="fade-up" className="max-w-[585px] text-[17px] leading-[1.5] text-muted md:text-[20px]">
          Every number here reflects our journey helping tech companies &amp; people grow smarter and faster.
        </p>
      </div>

      <div data-anim="fade-up" className="mx-auto mt-10 max-w-[1242px] overflow-hidden rounded-[20px] md:mt-[59px]">
        <div className="bg-calc px-4 pt-6 pb-8 sm:px-6 xl:px-[40px] xl:pt-[52px] xl:pb-[40px]">
          {/* Desktop table */}
          <div className="hidden grid-cols-[273px_452px_169px_121px] items-start justify-between xl:grid">
            <div className="pt-[31px]">
              <span className={label}>Products</span>
              <div className="flex flex-col gap-[23px]">
                {rows.map((r) => (
                  <Select key={r.id} label="Product" value={r.product} options={PRODUCTS} onChange={(v) => update(r.id, { product: v })} />
                ))}
              </div>
            </div>

            <div className="rounded-[20px] bg-[linear-gradient(160deg,#c45fb4_0%,#e7a5c9_45%,#f5c94e_100%)] p-[3px]">
              <div className="grid grid-cols-[165px_1fr] gap-x-[23px] gap-y-[23px] rounded-[17px] bg-white px-[30px] pt-[28px] pb-[30px]">
                <span className={`${label} !mb-0`}>Official Price</span>
                <span className={`${label} !mb-0`}>Discounted Price (Savings)</span>
                {rows.map((r) => (
                  <div key={r.id} className="contents">
                    <PriceInput row={r} onChange={(v) => update(r.id, { price: v })} />
                    <Discounted row={r} />
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-[31px]">
              <span className={label}>Billing Cycle</span>
              <div className="flex flex-col gap-[23px]">
                {rows.map((r) => (
                  <Select key={r.id} label="Billing cycle" value={r.cycle} options={['Yearly', 'Monthly'] as const} onChange={(v) => update(r.id, { cycle: v })} />
                ))}
              </div>
            </div>

            <div className="pt-[31px]">
              <span className={label}>Actions</span>
              <div className="flex flex-col gap-[23px]">
                {rows.map((r) => (
                  <Actions key={r.id} row={r} canRemove={rows.length > 1} onRemove={() => remove(r.id)} onAdd={() => addAfter(r.id)} />
                ))}
              </div>
            </div>
          </div>

          {/* Mobile / tablet: one card per product */}
          <ul className="grid gap-4 md:grid-cols-2 xl:hidden">
            {rows.map((r) => (
              <li key={r.id} className="rounded-[18px] bg-[linear-gradient(160deg,#c45fb4_0%,#e7a5c9_45%,#f5c94e_100%)] p-[2px]">
                <div className="flex h-full flex-col gap-4 rounded-[16px] bg-white/95 p-4 sm:p-5">
                  <div>
                    <span className={small}>Product</span>
                    <Select label="Product" value={r.product} options={PRODUCTS} onChange={(v) => update(r.id, { product: v })} className="[&_select]:bg-card" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className={small}>Official Price</span>
                      <PriceInput row={r} onChange={(v) => update(r.id, { price: v })} />
                    </div>
                    <div>
                      <span className={small}>Billing Cycle</span>
                      <Select label="Billing cycle" value={r.cycle} options={['Yearly', 'Monthly'] as const} onChange={(v) => update(r.id, { cycle: v })} className="[&_select]:bg-card" />
                    </div>
                  </div>
                  <div className="flex items-end justify-between gap-3">
                    <div>
                      <span className={small}>Discounted Price (Savings)</span>
                      <Discounted row={r} />
                    </div>
                    <div className="[&>div]:bg-card">
                      <Actions row={r} canRemove={rows.length > 1} onRemove={() => remove(r.id)} onAdd={() => addAfter(r.id)} />
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex justify-center gap-[39px] font-poppins text-[18px] font-semibold xl:mt-[44px] xl:text-[20px]">
            <button type="button" onClick={reset} className="btn-roll text-[#1d1d1d]"><RollText>Reset</RollText></button>
            <button type="button" onClick={calculate} className="btn-roll text-[#8fa3b0] hover:text-black"><RollText>Calculate</RollText></button>
          </div>
        </div>

        <div className="bg-white px-5 py-7 text-center xl:px-[40px] xl:py-[40px]">
          <p ref={totalRef} className="flex origin-center flex-wrap items-center justify-center gap-x-5 gap-y-2 font-poppins text-[24px] leading-[1.3] font-bold text-[#1d1d2b] sm:text-[28px] xl:text-[32px] xl:leading-[43px]">
            Total Savings - {money(totals.savings)}
            <span className="rounded-full bg-amber px-[10px] py-1 text-[14px] leading-[21px] font-medium text-white">Yearly</span>
          </p>
          <p className="mt-[7px] font-poppins text-[15px] leading-[1.6] text-[#3a3a3a] sm:text-[16px] xl:text-[18px] xl:leading-[30px]">
            Total Official Price {money(totals.official)} <span className="hidden sm:inline">|</span>
            <br className="sm:hidden" /> Total Discounted Price {money(totals.discounted)}
          </p>
        </div>
      </div>
    </section>
  );
}
