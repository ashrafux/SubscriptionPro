import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Glance, tabs } from './Glance';
import { PillButton } from './PillButton';
import { CheckCircle } from './Icons';
import { ScaledScreen } from './apart/Shell';

gsap.registerPlugin(ScrollTrigger);

/** Must match the `pin:` variant in index.css. */
const PIN_QUERY = '(min-width: 1024px) and (min-height: 680px)';
const STEPS = tabs.length - 1;

/**
 * Home Two "Screenshot at a glance": on wide, tall screens the tabs + slides pin once the heading has scrolled away;
 * then every scroll step moves to the next tab while the slides travel right → left (scrubbed + snapped).
 * Narrow / short screens get the regular click-to-switch Glance section.
 */
export function GlanceScroll() {
  const [pinnable, setPinnable] = useState(() => typeof window !== 'undefined' && window.matchMedia(PIN_QUERY).matches);
  useEffect(() => {
    const mq = window.matchMedia(PIN_QUERY);
    const on = () => setPinnable(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return pinnable ? <PinnedGlance /> : <Glance centered />;
}

function PinnedGlance() {
  const [active, setActive] = useState(0);
  const sec = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const tablist = useRef<HTMLDivElement>(null);
  const pill = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const st = useRef<ScrollTrigger | null>(null);
  const activeRef = useRef(0);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const slides = gsap.utils.toArray<HTMLElement>('[data-slide]', track.current);
      const stepX = () => slides[1].offsetLeft - slides[0].offsetLeft;

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: sec.current,
          start: 'top top',
          end: () => `+=${window.innerHeight * (0.6 + 0.85 * STEPS)}`,
          pin: true,
          scrub: 0.9,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          // One tab per scroll gesture: settle on the nearest label if we're already on one, otherwise the next
          // label in the scroll direction (GSAP's built-in directional snap adds velocity and can skip a tab).
          snap: {
            snapTo: (value, self) => {
              const d = tl.duration();
              const marks = Object.values(tl.labels).map((t) => t / d).sort((x, y) => x - y);
              const cur = self?.progress ?? value;
              const near = marks.find((m) => Math.abs(m - cur) < 0.006);
              if (near !== undefined) return near;
              if ((self?.direction ?? 1) > 0) return marks.find((m) => m > cur) ?? 1;
              return [...marks].reverse().find((m) => m < cur) ?? 0;
            },
            duration: { min: 0.3, max: 0.8 },
            delay: 0.08,
            ease: 'power2.inOut',
          },
        },
        onUpdate: () => {
          const i = Math.max(0, Math.min(STEPS, Math.round(-Number(gsap.getProperty(track.current, 'x')) / stepX())));
          if (i !== activeRef.current) {
            activeRef.current = i;
            setActive(i);
          }
          gsap.set(bar.current, { scaleX: tl.progress() });
        },
      });
      st.current = tl.scrollTrigger ?? null;

      // short lead-in before the first stop, so scrolling into the pin settles on Dashboard instead of skipping to Products
      tl.to({}, { duration: 0.6 });
      tl.addLabel('s0');

      // one step per tab: the track slides left, the outgoing screen tips away, the incoming one swings in
      slides.forEach((slide, i) => {
        if (!i) return;
        const prev = slides[i - 1];
        const at = `s${i - 1}+=0.3`;
        tl.to(track.current, { x: () => -stepX() * i, duration: 1, ease: 'power2.inOut' }, at);
        tl.to(prev.querySelector('[data-win]'), { xPercent: -14, yPercent: 6, rotate: -4, scale: 0.88, duration: 1, ease: 'power2.in' }, at);
        tl.to(prev.querySelector('[data-copy]'), { x: -60, autoAlpha: 0.2, duration: 0.8, ease: 'power2.in' }, at);
        tl.fromTo(
          slide.querySelector('[data-win]'),
          { xPercent: 22, yPercent: 8, rotate: 5, scale: 0.84 },
          { xPercent: 0, yPercent: 0, rotate: 0, scale: 1, duration: 1.1, ease: 'power3.out' },
          `${at}+=0.15`,
        );
        tl.fromTo(
          slide.querySelectorAll('[data-line]'),
          { x: 90, autoAlpha: 0 },
          { x: 0, autoAlpha: 1, duration: 0.6, stagger: 0.07, ease: 'power3.out' },
          `${at}+=0.4`,
        );
        tl.addLabel(`s${i}`);
      });
      tl.to({}, { duration: 0.35 });
    }, sec);
    return () => {
      st.current = null;
      ctx.revert();
    };
  }, []);

  // White pill glides to the active tab (and follows layout changes).
  useLayoutEffect(() => {
    const list = tablist.current;
    if (!list) return;
    const place = (animate: boolean) => {
      const btn = list.querySelectorAll<HTMLButtonElement>('[role=tab]')[active];
      if (!btn) return;
      const vars = { x: btn.offsetLeft, width: btn.offsetWidth };
      if (animate) gsap.to(pill.current, { ...vars, duration: 0.55, ease: 'power3.out', overwrite: true });
      else gsap.set(pill.current, vars);
    };
    place(true);
    const ro = new ResizeObserver(() => place(false));
    ro.observe(list);
    return () => ro.disconnect();
  }, [active]);

  const goTo = (i: number) => {
    const s = st.current;
    if (!s) return;
    window.scrollTo({ top: s.labelToScroll(`s${i}`), behavior: 'smooth' });
  };

  return (
    <div className="pt-16 md:pt-24 xl:pt-[120px]">
      {/* Heading sits above the pinned area and simply scrolls away, so the pinned tabs + slides get the full screen */}
      <div className="mx-auto flex max-w-[760px] flex-col items-center gap-5 px-5 text-center md:gap-6">
        <h2 data-split className="text-[34px] leading-[1.1] font-bold tracking-[0.5909px] sm:text-[44px] lg:text-[60px]">
          Screenshot at a glance <br />
          with Prior Talks
        </h2>
        <p data-anim="fade-up" className="max-w-[560px] text-[17px] leading-[1.5] text-balance text-muted md:text-[20px]">
          Unlock partner-exclusive SaaS deals, save on renewals, and manage your stack from one dashboard.
        </p>
      </div>
      <section ref={sec} className="flex h-svh flex-col px-5 pt-[clamp(28px,7vh,80px)] pb-[clamp(20px,4vh,44px)]">
        <div className="mx-auto flex min-h-0 w-full max-w-[1496px] flex-1 flex-col">
          <div className="flex min-h-0 flex-1 flex-col justify-center">
            <div className="flex shrink-0 justify-center">
              <div ref={tablist} role="tablist" aria-label="SubscriptionPro screens" className="relative flex gap-2 rounded-full bg-[#ececec] p-[5px]">
                <span ref={pill} aria-hidden className="absolute top-[5px] bottom-[5px] left-0 rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.1)]" />
                {tabs.map((t, i) => (
                  <button
                    key={t.label}
                    role="tab"
                    aria-selected={active === i}
                    onClick={() => goTo(i)}
                    className={`relative rounded-full px-6 py-[8.5px] text-[min(20px,2.4vh)] leading-[1.5] whitespace-nowrap transition-colors duration-300 ${
                      active === i ? 'text-black' : 'text-[#8b8b8b] hover:text-black'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative mt-[clamp(20px,4.5vh,56px)] min-h-0 max-h-[660px] flex-1">
              <div ref={track} className="flex h-full gap-7 will-change-transform">
                {tabs.map((t, i) => {
                  const { View } = t;
                  return (
                    <div key={t.label} data-slide aria-hidden={i !== active} className="grid h-full w-full shrink-0 grid-cols-[607fr_861fr] gap-7">
                      <div className="overflow-hidden rounded-[20px] bg-stat-lime">
                        <div data-copy className="flex h-full flex-col justify-center px-[clamp(32px,4vw,60px)] py-[clamp(24px,4.5vh,58px)]">
                          <span data-line className="font-poppins text-[13px] font-semibold tracking-[0.12em] text-[#6d8a3a] uppercase">
                            {String(i + 1).padStart(2, '0')} / {String(tabs.length).padStart(2, '0')} · {t.label}
                          </span>
                          <h3 data-line className="mt-3 max-w-[468px] text-[min(32px,3.6vh)] leading-[1.3] font-bold">{t.title}</h3>
                          <p data-line className="mt-[min(24px,2.4vh)] max-w-[422px] font-lato text-[min(18px,2.1vh)] leading-[1.45] text-[#6b6b6b]">{t.intro}</p>
                          <ul className="mt-[min(28px,2.8vh)] flex max-w-[422px] flex-col gap-[min(18px,1.8vh)]">
                            {t.points.map((p) => (
                              <li key={p} data-line className="flex gap-3 font-lato text-[min(18px,2.1vh)] leading-[1.4] text-[#3c3c3c]">
                                <CheckCircle className="mt-[3px] size-5 shrink-0 text-black" />
                                {p}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="relative overflow-hidden rounded-[20px]">
                        <img src={t.bg} alt="" className="absolute inset-0 size-full object-cover" />
                        <div data-win className="absolute top-[11%] left-[8%] w-[84%] origin-bottom-left shadow-[0_30px_60px_-20px_rgba(40,20,80,0.35)]">
                          <ScaledScreen>
                            <View />
                          </ScaledScreen>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="mx-auto mt-[clamp(14px,2.5vh,28px)] h-[3px] w-[min(320px,40%)] shrink-0 overflow-hidden rounded-full bg-black/10">
              <span ref={bar} className="block h-full origin-left scale-x-0 rounded-full bg-pink" />
            </div>
          </div>
        </div>
      </section>

      <div data-anim="fade-up" className="mt-10 flex justify-center px-5 pb-16 md:pb-24 xl:pb-[144px]">
        <PillButton variant="pink" arrow>
          Try Subscription Pro for Free
        </PillButton>
      </div>
    </div>
  );
}
