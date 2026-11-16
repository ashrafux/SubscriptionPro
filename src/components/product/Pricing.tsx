import { useState, type ReactNode } from 'react';
import { Band, BandInner } from '../Container';
import { RollText } from '../Roll';

const A = '/assets/product';
const periods = ['Monthly', 'Quarterly', 'Yearly', 'Lifetime'] as const;
type Period = (typeof periods)[number];

// The design shows one price ($143.854 /Year) on every card; the other periods are placeholder figures.
const price: Record<Period, { amount: string; unit: string; save: string }> = {
  Monthly: { amount: '12.990', unit: '/Month', save: 'Save $1.440' },
  Quarterly: { amount: '37.490', unit: '/Quarter', save: 'Save $4.320' },
  Yearly: { amount: '143.854', unit: '/Year', save: 'Save $15.984' },
  Lifetime: { amount: '399.000', unit: '/Once', save: 'Save $60.000' },
};

const svg = (d: ReactNode) => (
  <svg viewBox="0 0 24 24" className="size-[42px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    {d}
  </svg>
);

const plans: { name: string; bg: string; icon: ReactNode; dark?: boolean }[] = [
  { name: 'Unlimited', bg: '#1681ff', icon: svg(<path d="M18.2 8.5c-1.9 0-3.4 1.6-6.2 3.5-2.8 1.9-4.3 3.5-6.2 3.5a3.5 3.5 0 0 1 0-7c1.9 0 3.4 1.6 6.2 3.5 2.8 1.9 4.3 3.5 6.2 3.5a3.5 3.5 0 0 0 0-7z" />) },
  {
    name: 'Business',
    bg: '#30dd88',
    dark: true,
    icon: svg(<><rect x="3.5" y="7" width="17" height="13" rx="2" /><path d="M8.5 7V5.5A1.5 1.5 0 0 1 10 4h4a1.5 1.5 0 0 1 1.5 1.5V7M3.5 12.5h17" /><circle cx="12" cy="13" r="1.3" /></>),
  },
  { name: 'Business Plus', bg: '#ff9900', icon: svg(<path d="M12 3.5l8.5 8.5-8.5 8.5L3.5 12z" />) },
];

const perks = ['Meetings up to 30 hours per meeting', 'Mail and Calendar Client & Service', 'AI Companion', 'Cloud Storage 5GB'];

/** "Our Pricing" band: period switch and three plan cards, the middle one dark and marked Popular. */
export function Pricing() {
  // The design highlights "Monthly" while the cards read "/Year"; Yearly is the default so the two agree.
  const [period, setPeriod] = useState<Period>('Yearly');
  const p = price[period];

  return (
    <Band id="pricing" outer="mt-20 md:mt-[192px]" className="bg-[#f6cde6] py-14 md:px-10 md:pt-[90px] md:pb-[90px] xl:pb-[92px]">
      <BandInner>
        <div className="mx-auto max-w-[1460px]">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 data-split className="text-[40px] leading-[1.1] font-bold tracking-[0.5909px] text-black sm:text-[48px] lg:text-[60px]">
              Our Pricing
            </h2>
            <p data-anim="fade-up" className="mt-[22px] max-w-[567px] text-[17px] leading-[1.5] text-black md:text-[20px]">
              Get Zoom Premium for Less with SubscriptionPro. Explore our tailored pricing plans designed to save you more.
            </p>
          </div>
          <div data-anim="fade-up" role="tablist" aria-label="Billing period" className="flex w-max max-w-full gap-1 overflow-x-auto rounded-full border border-[#ececec] bg-white p-[5px] md:gap-2">
            {periods.map((t) => (
              <button
                key={t}
                type="button"
                role="tab"
                aria-selected={period === t}
                onClick={() => setPeriod(t)}
                className={`rounded-full px-4 py-[8.5px] font-lato text-[16px] leading-[1.5] whitespace-nowrap transition sm:px-7 md:text-[20px] ${
                  period === t ? 'bg-black text-white' : 'text-[#8b8b8b] hover:text-black'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div data-anim="stagger" data-stagger="0.1" className="mt-14 grid gap-5 md:mt-[28px] md:grid-cols-2 md:pt-0 lg:grid-cols-3">
          {plans.map((pl) => (
            <div key={pl.name} data-anim-item className="relative pt-5">
              {pl.dark && (
                <span className="absolute top-0 left-1/2 z-10 flex h-[39px] -translate-x-1/2 items-center rounded-full bg-pink px-8 text-[18px] font-semibold text-white">Popular</span>
              )}
              <article
                className={`flex h-full flex-col rounded-[20px] p-[30px] transition-transform duration-500 hover:-translate-y-2 md:min-h-[625px] ${
                  pl.dark ? 'bg-black text-white' : 'bg-[#fefafd] text-black'
                }`}
              >
                <span className="flex size-[95px] items-center justify-center rounded-full text-white" style={{ background: pl.bg }}>
                  {pl.icon}
                </span>
                <h3 className="mt-5 text-[28px] leading-[1.35] font-bold md:text-[30px]">{pl.name}</h3>
                <p className={`mt-[3px] text-[14px] leading-[1.7] ${pl.dark ? 'text-white/70' : 'text-muted'}`}>Best Suited for Startup &amp; Personal use</p>

                <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2">
                  <p className="flex items-baseline gap-1">
                    <span className={`text-[22px] ${pl.dark ? 'text-white/70' : 'text-muted'}`}>$</span>
                    <span className="text-[30px] leading-none font-bold tracking-[0.5px] md:text-[32px]">{p.amount}</span>
                    <span className={`ml-1 text-[18px] ${pl.dark ? 'text-white/70' : 'text-muted'}`}>{p.unit}</span>
                  </p>
                  <span className="flex h-[26px] items-center rounded-full bg-green px-3 text-[12px] font-semibold tracking-[0.1455px] whitespace-nowrap text-white">{p.save}</span>
                </div>

                <ul className={`mt-10 flex flex-col gap-[14px] text-[15px] leading-[1.45] ${pl.dark ? 'text-white/75' : 'text-muted'}`}>
                  {perks.map((k) => (
                    <li key={k} className="flex items-center gap-[12px]">
                      <img src={`${A}/check-circle.svg`} alt="" width={20} height={20} className="shrink-0" />
                      {k}
                    </li>
                  ))}
                </ul>

                <a
                  href="#buy"
                  className={`btn-roll mt-auto inline-flex h-[57px] w-max items-center rounded-full px-[34px] pt-0 text-[18px] leading-[1.35] font-bold tracking-[0.5909px] whitespace-nowrap max-md:mt-12 md:text-[20px] ${
                    pl.dark ? 'bg-white text-black hover:bg-neutral-100' : 'bg-black text-white hover:bg-neutral-800'
                  }`}
                >
                  <RollText>Choose plan</RollText>
                </a>
              </article>
            </div>
          ))}
        </div>
        </div>
      </BandInner>
    </Band>
  );
}
