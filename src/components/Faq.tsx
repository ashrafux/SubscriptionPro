import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Chevron } from './Icons';

const tabs = ['General', 'Features', 'Resources'] as const;

// The design repeats one placeholder question; answers are not in the design and need real copy.
const q = 'What payment methods are accepted on SubscriptionPro?';
const a =
  'You can pay with all major credit and debit cards, and selected local payment methods. Every purchase is billed through your SubscriptionPro wallet so renewals stay in one place.';
const faqs: Record<(typeof tabs)[number], { q: string; a: string }[]> = {
  General: Array.from({ length: 7 }, () => ({ q, a })),
  Features: Array.from({ length: 7 }, () => ({ q, a })),
  Resources: Array.from({ length: 7 }, () => ({ q, a })),
};

const LIMIT = 5;

/** `seeMore`: Home Two — same design, but only the first five questions show until "See more" is pressed. */
export function Faq({ seeMore = false }: { seeMore?: boolean }) {
  const [tab, setTab] = useState<(typeof tabs)[number]>('General');
  const [open, setOpen] = useState<number | null>(null);
  const [all, setAll] = useState(false);
  const list = useRef<HTMLUListElement>(null);
  const shown = seeMore && !all ? faqs[tab].slice(0, LIMIT) : faqs[tab];
  const hidden = faqs[tab].length - LIMIT;

  // newly revealed questions rise in one by one
  useLayoutEffect(() => {
    if (!seeMore || !all || !list.current) return;
    const extra = Array.from(list.current.children).slice(LIMIT);
    gsap.from(extra, { y: 24, autoAlpha: 0, duration: 0.5, stagger: 0.07, ease: 'power3.out' });
  }, [all, seeMore]);

  return (
    <section className="px-5 py-16 md:py-24 xl:pt-[145px] xl:pb-[192px]">
      <div className="mx-auto max-w-[989px]">
        <h2 data-split className="text-center text-[34px] leading-[1.1] font-bold tracking-[0.5909px] sm:text-[44px] lg:text-[60px]">
          Frequently Asked Question
        </h2>

        <div data-anim="fade-up" className="mt-8 flex justify-center md:mt-12">
          <div role="tablist" className="flex gap-1 rounded-full border border-[#ececec] p-[5px] md:gap-2">
            {tabs.map((t) => (
              <button
                key={t}
                role="tab"
                aria-selected={tab === t}
                onClick={() => {
                  setTab(t);
                  setOpen(null);
                  setAll(false);
                }}
                className={`rounded-full px-5 py-[8.5px] text-[16px] leading-[1.5] whitespace-nowrap transition md:px-7 md:text-[20px] ${
                  tab === t ? 'bg-black text-white' : 'text-[#8b8b8b] hover:text-black'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <ul ref={list} data-anim="stagger" data-stagger="0.06" className="mt-10 flex flex-col gap-[10px] md:mt-[60px]">
          {shown.map((f, i) => {
            const isOpen = open === i;
            return (
              <li key={`${tab}-${i}`} className="group rounded-[16px] bg-card transition-colors hover:bg-[#ebebeb]">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex min-h-[84px] w-full items-center justify-between gap-4 px-5 py-4 text-left md:min-h-[117px] md:gap-6 md:px-[30px]"
                >
                  <span className="text-[16px] leading-[1.35] font-semibold md:text-[20px]">{f.q}</span>
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white text-black transition-colors duration-300 group-hover:bg-pink group-hover:text-white group-has-[:focus-visible]:bg-pink group-has-[:focus-visible]:text-white md:size-[57px]">
                    <Chevron className={`size-[23px] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </span>
                </button>
                {isOpen && (
                  <p
                    ref={(el) => {
                      if (el) gsap.from(el, { height: 0, autoAlpha: 0, duration: 0.45, ease: 'power2.out' });
                    }}
                    className="-mt-2 max-w-[860px] overflow-hidden px-5 pb-6 text-[16px] leading-[1.6] text-muted md:-mt-4 md:px-[30px] md:pb-8 md:text-[17px]"
                  >
                    {f.a}
                  </p>
                )}
              </li>
            );
          })}
        </ul>

        {seeMore && hidden > 0 && (
          <div className="mt-8 flex justify-center md:mt-10">
            <button
              type="button"
              onClick={() => setAll((v) => !v)}
              className="flex items-center gap-2 rounded-full border-[1.5px] border-[#14141f] px-7 py-3.5 text-[16px] font-semibold transition hover:bg-[#14141f] hover:text-white"
            >
              {all ? 'See less' : `See more (${hidden})`}
              <Chevron className={`size-5 transition-transform duration-300 ${all ? 'rotate-180' : ''}`} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
