import type { ReactNode } from 'react';

/*
  Two trust cards above the CTA. The client logos (Figma images 1794–1805) and the payment logos could not be
  downloaded — the Figma MCP limit was reached — so both rows use plain-text stand-ins until the files are exported
  into /public/assets/product/ and swapped in here.
*/
const clients = ['World Bank Group', 'Eastern Bank PLC', 'brac', 'LightCastle', 'vivasoft', 'shoeba', 'syngenta', 'BYLC', 'vivasoft', 'shoeba', 'syngenta', 'BYLC'];

const ico = (d: ReactNode) => (
  <svg viewBox="0 0 24 24" className="size-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    {d}
  </svg>
);
const chips: [string, ReactNode][] = [
  ['SSL Encrypted', ico(<><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></>)],
  ['Secure Payments', ico(<><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 10h18" /></>)],
  ['Privacy Protected', ico(<><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></>)],
  ['Fraud Protection', ico(<><circle cx="12" cy="12" r="9" /><path d="M8.5 12.5l2.3 2.3 4.7-5" /></>)],
];

const payments = [
  { name: 'VISA', cls: 'font-bold italic text-[22px] text-[#1a1f71] tracking-tight' },
  { name: 'Mastercard', mark: true },
  { name: 'AMERICAN EXPRESS', cls: 'font-bold text-[11px] leading-[1] text-[#2e77bc] w-[64px] text-center' },
  { name: 'bKash', cls: 'font-semibold text-[17px] text-[#3a3a3a]' },
  { name: 'Nagad', cls: 'font-bold text-[17px] text-[#ec1c24]' },
];

export function Trust() {
  return (
    <section className="px-5">
      <div className="mx-auto grid max-w-[1880px] gap-5 [&>*]:min-w-0 lg:grid-cols-[806fr_795fr] lg:gap-[28px]">
        <div data-anim="fade-up" className="rounded-[20px] bg-card px-6 py-10 sm:px-[72px] sm:pt-[73px] sm:pb-[60px]">
          <h2 className="max-w-[405px] text-[22px] leading-[1.35] font-medium text-title md:text-[24px]">Loved by individual and businesses from around the world</h2>
          <ul className="mt-9 flex max-w-[674px] flex-wrap items-center gap-x-[26px] gap-y-[22px]">
            {clients.map((c, i) => (
              <li key={i} className="text-[17px] font-bold tracking-tight whitespace-nowrap text-[#8a93a0]">
                {c}
              </li>
            ))}
          </ul>
        </div>

        <div data-anim="fade-up" className="rounded-[20px] bg-card px-6 py-10 sm:px-[75px] sm:pt-[63px] sm:pb-[35px]">
          <h2 className="text-[30px] leading-[1.2] font-bold text-title md:text-[36px]">
            Safe checkout.
            <br />
            100% protected.
          </h2>
          <ul className="mt-7 grid max-w-[391px] grid-cols-[auto_auto] justify-start gap-x-[10px] gap-y-[10px]">
            {chips.map(([label, icon]) => (
              <li key={label} className="flex items-center gap-2 rounded-full bg-white px-4 py-[10px] text-[14px] whitespace-nowrap text-[#3a3f47]">
                {icon}
                {label}
              </li>
            ))}
          </ul>
          <ul className="mt-12 flex flex-wrap items-center gap-x-7 gap-y-4" aria-label="Accepted payment methods">
            {payments.map((p) => (
              <li key={p.name} className={p.cls} aria-label={p.mark ? p.name : undefined}>
                {p.mark ? (
                  <span className="relative block h-[26px] w-[42px]" aria-hidden>
                    <span className="absolute top-0 left-0 size-[26px] rounded-full bg-[#eb001b]" />
                    <span className="absolute top-0 right-0 size-[26px] rounded-full bg-[#f79e1b] mix-blend-multiply" />
                  </span>
                ) : (
                  p.name
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
