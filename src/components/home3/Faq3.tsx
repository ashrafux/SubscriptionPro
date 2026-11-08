import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Chevron } from '../Icons';

/* Home Three FAQ (review row 16): smooth expand AND collapse, one open at a time, and only the first
   five questions show until "See more" reveals the rest. Answers are draft copy for review. */

const tabs = ['General', 'Features', 'Resources'] as const;
type Tab = (typeof tabs)[number];
const LIMIT = 5;

const faqs: Record<Tab, { q: string; a: string }[]> = {
  General: [
    { q: 'What is SubscriptionPro?', a: 'SubscriptionPro is a marketplace and dashboard for business software. You buy official licenses for 100+ SaaS tools at partner prices, then track seats, costs and renewal dates in one place.' },
    { q: 'What payment methods are accepted on SubscriptionPro?', a: 'All major credit and debit cards, bank transfer and PayPal. You can also top up a SubscriptionPro wallet so renewals are paid automatically.' },
    { q: 'Are the licenses official?', a: 'Yes. Every license is issued through the vendor’s official partner channel, so warranty, updates and vendor support stay exactly the same.' },
    { q: 'How much can I save?', a: 'Discounts vary by tool and plan, typically 10–40% on every renewal — not just the first year.' },
    { q: 'Is there a fee to use the dashboard?', a: 'No. The dashboard is free forever; you only pay for the tools you buy.' },
    { q: 'Can I move subscriptions I already pay for?', a: 'Yes. Connect existing subscriptions and we’ll help transfer eligible ones at your next renewal date, without downtime.' },
    { q: 'Do you offer refunds?', a: 'Unused licenses can be refunded within the vendor’s refund window. See our refund policy for the details per tool.' },
  ],
  Features: [
    { q: 'How do renewal alerts work?', a: 'You get an email and an in-app alert before every renewal, with the amount and the date, so nothing renews by surprise.' },
    { q: 'Can I manage seats for my team?', a: 'Yes — add, remove and reassign seats per tool, and see who uses what from the same screen.' },
    { q: 'What is the deposit fund?', a: 'A wallet you top up once. Renewals are paid from it automatically, and you’re warned before the balance runs low.' },
    { q: 'Can I export invoices?', a: 'Download every invoice individually or as one tax-ready export for your finance team.' },
    { q: 'Does it integrate with my tools?', a: 'Popular apps connect in one click so seats, usage and renewal dates sync automatically.' },
    { q: 'How do referral rewards work?', a: 'Share your link; you earn credit for every team that joins, on their renewals too.' },
  ],
  Resources: [
    { q: 'Where can I find setup guides?', a: 'In the Help Center — step-by-step guides for buying, connecting and transferring subscriptions.' },
    { q: 'Do you have a product demo?', a: 'Yes, book a demo call and we’ll walk your team through the dashboard in 20 minutes.' },
    { q: 'How do I contact support?', a: 'Live chat and email, with a typical first reply in a few minutes during business hours.' },
    { q: 'Is there an API?', a: 'An API for spend and renewal data is available on request for teams that want it in their own tools.' },
    { q: 'Where is the product roadmap?', a: 'We publish upcoming tools and features in the changelog every month.' },
    { q: 'Can I submit my product?', a: 'SaaS vendors can apply through “Submit Your Product” to be listed with partner pricing.' },
  ],
};

function Item({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  return (
    <li className={`group rounded-[18px] transition-colors duration-300 ${open ? 'bg-white shadow-[0_20px_50px_-30px_rgba(20,20,60,0.35)] ring-1 ring-[#eceef4]' : 'bg-card hover:bg-[#ebebeb]'}`}>
      <button type="button" aria-expanded={open} onClick={onToggle} className="flex min-h-[78px] w-full items-center justify-between gap-4 px-5 py-4 text-left md:min-h-[96px] md:gap-6 md:px-[30px]">
        <span className="text-[16px] leading-[1.35] font-semibold md:text-[19px]">{q}</span>
        <span
          className={`flex size-11 shrink-0 items-center justify-center rounded-full transition-colors duration-300 md:size-[52px] ${
            open ? 'bg-pink text-white' : 'bg-white text-black group-hover:bg-pink group-hover:text-white'
          }`}
        >
          <Chevron className={`size-[22px] transition-transform duration-500 ease-[cubic-bezier(.62,.05,.32,1)] ${open ? 'rotate-180' : ''}`} />
        </span>
      </button>
      {/* grid-rows 0fr → 1fr animates both opening and closing */}
      <div className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(.62,.05,.32,1)] ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <div className="min-h-0 overflow-hidden">
          <p className={`max-w-[820px] px-5 pb-6 text-[16px] leading-[1.65] text-muted transition-[opacity,transform] duration-500 md:px-[30px] md:pb-8 md:text-[17px] ${open ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'}`}>
            {a}
          </p>
        </div>
      </div>
    </li>
  );
}

export function Faq3() {
  const [tab, setTab] = useState<Tab>('General');
  const [open, setOpen] = useState<number | null>(0);
  const [all, setAll] = useState(false);
  const extra = useRef<HTMLUListElement>(null);
  const list = faqs[tab];

  useLayoutEffect(() => {
    if (all && extra.current) gsap.from(extra.current.children, { y: 24, autoAlpha: 0, duration: 0.5, stagger: 0.07, ease: 'power3.out' });
  }, [all]);

  return (
    <section className="px-5 py-16 md:py-24 xl:pt-[140px] xl:pb-[170px]">
      <div className="mx-auto max-w-[989px]">
        <h2 data-split className="text-center text-[34px] leading-[1.1] font-bold tracking-[0.5909px] sm:text-[44px] lg:text-[56px]">Frequently Asked Questions</h2>

        <div data-anim="fade-up" className="mt-8 flex justify-center md:mt-12">
          <div role="tablist" className="flex gap-1 rounded-full border border-[#ececec] p-[5px] md:gap-2">
            {tabs.map((t) => (
              <button
                key={t}
                role="tab"
                aria-selected={tab === t}
                onClick={() => {
                  setTab(t);
                  setOpen(0);
                  setAll(false);
                }}
                className={`rounded-full px-5 py-[8.5px] text-[16px] leading-[1.5] whitespace-nowrap transition md:px-7 md:text-[18px] ${tab === t ? 'bg-black text-white' : 'text-[#8b8b8b] hover:text-black'}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <ul data-anim="stagger" data-stagger="0.06" className="mt-10 flex flex-col gap-[10px] md:mt-[56px]">
          {list.slice(0, LIMIT).map((f, i) => (
            <Item key={`${tab}-${i}`} {...f} open={open === i} onToggle={() => setOpen(open === i ? null : i)} />
          ))}
        </ul>
        {all && list.length > LIMIT && (
          <ul ref={extra} className="mt-[10px] flex flex-col gap-[10px]">
            {list.slice(LIMIT).map((f, j) => {
              const i = j + LIMIT;
              return <Item key={`${tab}-${i}`} {...f} open={open === i} onToggle={() => setOpen(open === i ? null : i)} />;
            })}
          </ul>
        )}

        {list.length > LIMIT && (
          <div className="mt-8 flex justify-center md:mt-10">
            <button
              type="button"
              onClick={() => setAll((v) => !v)}
              className="flex items-center gap-2 rounded-full border-[1.5px] border-[#14141f] px-7 py-3.5 text-[16px] font-semibold transition hover:bg-[#14141f] hover:text-white"
            >
              {all ? 'See less' : `See more (${list.length - LIMIT})`}
              <Chevron className={`size-5 transition-transform duration-300 ${all ? 'rotate-180' : ''}`} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
