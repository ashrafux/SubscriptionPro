import { useState, type ComponentType } from 'react';
import { PillButton } from './PillButton';
import { CheckCircle } from './Icons';
import { ScaledScreen } from './apart/Shell';
import { GlanceBilling, GlanceDashboard, GlanceDeposit, GlanceIntegrations, GlanceProducts, GlanceStarterDeals } from './glance/GlanceViews';

type Tab = { label: string; title: string; intro: string; points: string[]; bg: string; View: ComponentType };

// Backgrounds: abstract gradients generated with Higgsfield (GPT Image 2.5), one per tab.
const tabs: Tab[] = [
  {
    label: 'Dashboard',
    title: 'Stay in Control with Our Free SaaS Tool Dashboard',
    intro: 'Manually handling SaaS tools takes too much effort. SubscriptionPro’s smart SaaS dashboard lets you:',
    points: [
      'Keep tabs on every active subscription (See renewal dates, costs, and usage at a glance)',
      'Get automatic renewal alerts (Say goodbye to surprise charges or missed cancellations.)',
      'Control your software spend (Track expenses in real time and make smarter budget decisions)',
      'One Dashboard. Total control. No surprises',
    ],
    bg: '/assets/glance/bg-1.jpg',
    View: GlanceDashboard,
  },
  {
    label: 'Products',
    title: 'Shop 100+ SaaS Tools at Partner Prices',
    intro: 'Browse official licenses across every category and buy in a couple of clicks:',
    points: [
      'Compare plans and partner pricing side by side',
      'Buy monthly or yearly, for one seat or a whole team',
      'Licenses activate straight into your workspace',
      'Pay up to 40% less than buying direct',
    ],
    bg: '/assets/glance/bg-2.jpg',
    View: GlanceProducts,
  },
  {
    label: 'Integrations',
    title: 'Connect Every Tool Your Team Already Uses',
    intro: 'Bring your existing subscriptions into SubscriptionPro so nothing slips through:',
    points: [
      'One-click connect for popular SaaS apps',
      'Seats, usage and renewal dates sync automatically',
      'Spot duplicate and unused tools across teams',
      'Request any tool we don’t list yet',
    ],
    bg: '/assets/glance/bg-3.jpg',
    View: GlanceIntegrations,
  },
  {
    label: 'Starter Deals',
    title: 'Kick Off with Exclusive Starter Deals',
    intro: 'New to a tool? Start for less with offers made for growing teams:',
    points: [
      'First-year discounts of up to 50%',
      'Extended free months on partner tools',
      'Starter bundles for small teams and startups',
      'Fresh deals added every week',
    ],
    bg: '/assets/glance/bg-4.jpg',
    View: GlanceStarterDeals,
  },
  {
    label: 'Deposit Fund',
    title: 'Top Up Once, Renew Without Thinking',
    intro: 'Keep a balance in your SubscriptionPro wallet and let renewals pay themselves:',
    points: [
      'Add funds by card, bank transfer or PayPal',
      'Auto-pay renewals so nothing ever lapses',
      'Low-balance alerts before every due date',
      'A full history of every deposit and charge',
    ],
    bg: '/assets/glance/bg-5.jpg',
    View: GlanceDeposit,
  },
  {
    label: 'Billing',
    title: 'All Your SaaS Billing in One Place',
    intro: 'No more hunting for invoices across a dozen vendor portals:',
    points: [
      'Download every invoice and receipt in one click',
      'One consolidated bill instead of many',
      'Tax-ready exports for your finance team',
      'See exactly how much you saved on each payment',
    ],
    bg: '/assets/glance/bg-6.jpg',
    View: GlanceBilling,
  },
];

const stateOf = (i: number, active: number) => (i === active ? 'active' : i < active ? 'past' : 'next');

export function Glance() {
  const [tab, setTab] = useState(0);

  return (
    <section className="px-5 pt-16 pb-16 md:pt-24 md:pb-24 xl:pt-[192px] xl:pb-[144px]">
      <div className="mx-auto max-w-[1496px]">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
          <h2 data-split className="max-w-[666px] text-[34px] leading-[1.1] font-bold tracking-[0.5909px] sm:text-[44px] lg:text-[60px]">
            Screenshot at a glance <br className="hidden lg:block" />
            with Prior Talks
          </h2>
          <p data-anim="fade-up" className="max-w-[352px] text-[17px] leading-[1.5] text-muted md:text-[20px] min-[1560px]:mr-[-27px]">
            Unlock partner-exclusive SaaS deals, save on renewals, and manage your stack from one dashboard.
          </p>
        </div>

        <div data-anim="fade-up" className="-mx-5 mt-10 flex px-5 md:mx-0 md:mt-[71px] md:justify-center md:px-0">
          <div
            role="tablist"
            aria-label="SubscriptionPro screens"
            className="flex max-w-full gap-1 overflow-x-auto rounded-full bg-[#ececec] p-[5px] [scrollbar-width:none] lg:gap-2"
          >
            {tabs.map((t, i) => (
              <button
                key={t.label}
                role="tab"
                aria-selected={tab === i}
                onClick={() => setTab(i)}
                className={`shrink-0 rounded-full px-4 py-[8.5px] text-[15px] leading-[1.5] whitespace-nowrap transition-[background-color,color,box-shadow] duration-300 md:text-[18px] lg:px-6 lg:text-[20px] ${
                  tab === i ? 'bg-white text-black shadow-[0_2px_6px_rgba(0,0,0,0.08)]' : 'text-[#8b8b8b] hover:text-black'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:mt-[60px] md:gap-7 xl:grid-cols-[607fr_861fr]">
          {/* left: copy for the active tab (all stacked in one cell, so the card keeps the tallest height) */}
          <div data-anim="slide-left" className="grid rounded-[20px] bg-stat-lime px-6 py-9 sm:px-10 md:py-12 xl:px-[60px] xl:py-[58px]">
            {tabs.map((t, i) => (
              <div key={t.label} className="apart-copy col-start-1 row-start-1" data-state={stateOf(i, tab)} aria-hidden={i !== tab}>
                <h3 className="max-w-[468px] text-[26px] leading-[1.3] font-bold md:text-[32px] md:leading-[1.35]">{t.title}</h3>
                <p className="mt-5 max-w-[422px] font-lato text-[17px] leading-[25px] text-[#6b6b6b] md:mt-6 md:text-[18px]">{t.intro}</p>
                <ul className="mt-6 flex max-w-[422px] flex-col gap-[18px] md:mt-7">
                  {t.points.map((p) => (
                    <li key={p} className="flex gap-3 font-lato text-[17px] leading-[25px] text-[#3c3c3c] md:text-[18px]">
                      <CheckCircle className="mt-[3px] size-5 shrink-0 text-black" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* right: the tab's screen on its own colourful background */}
          <div data-anim="reveal" className="relative aspect-[861/579] overflow-hidden rounded-[20px]">
            {tabs.map((t, i) => {
              const { View } = t;
              return (
                <div key={t.label} className="apart-panel absolute inset-0" data-state={stateOf(i, tab)} aria-hidden={i !== tab}>
                  <img src={t.bg} alt="" className="absolute inset-0 size-full object-cover" />
                  <div className="apart-win absolute top-[10.2%] left-[8%] w-[84%]">
                    <ScaledScreen>
                      <View />
                    </ScaledScreen>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div data-anim="fade-up" className="mt-10 flex justify-center md:mt-[60px]">
          <PillButton variant="pink" arrow>
            Try Subscription Pro for Free
          </PillButton>
        </div>
      </div>
    </section>
  );
}
