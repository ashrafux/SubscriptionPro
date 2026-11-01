import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';

gsap.registerPlugin(Draggable, InertiaPlugin);

const WORD = 'SubscriptionPro';

const tags = [
  { label: 'Smart Savings', className: 'bg-lime left-[14%] top-[-4%]', rot: -3 },
  { label: 'SaaS Management', className: 'bg-blush left-[61%] top-[30%]', rot: 2 },
  { label: 'Cost Optimization', className: 'bg-seafoam right-[2%] top-[60%]', rot: -2 },
];

/**
 * Footer wordmark as a tiny toy: the three tags can be grabbed and thrown (with momentum and soft walls),
 * and any letter a tag flies over hops out of the way. A counter keeps score; Reset puts everything back.
 */
export function TagPlayground() {
  const area = useRef<HTMLDivElement>(null);
  const [bumps, setBumps] = useState(0);
  const [played, setPlayed] = useState(false);

  useLayoutEffect(() => {
    const root = area.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      const tagEls = gsap.utils.toArray<HTMLElement>('[data-tag]', root);
      const letters = gsap.utils.toArray<HTMLElement>('[data-letter]', root);
      const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      tagEls.forEach((el, i) => gsap.set(el, { rotation: tags[i].rot }));

      const bump = (letter: HTMLElement) => {
        if (letter.dataset.busy) return;
        letter.dataset.busy = '1';
        setBumps((n) => n + 1);
        gsap
          .timeline({ onComplete: () => void delete letter.dataset.busy })
          .to(letter, { y: calm ? -6 : -34, rotation: calm ? 0 : gsap.utils.random(-14, 14), scale: 1.06, duration: 0.22, ease: 'power2.out' })
          .to(letter, { y: 0, rotation: 0, scale: 1, duration: 0.9, ease: 'elastic.out(1, 0.35)' });
      };

      Draggable.create(tagEls, {
        type: 'x,y',
        bounds: root,
        inertia: true,
        edgeResistance: 0.75,
        zIndexBoost: true,
        cursor: 'grab',
        activeCursor: 'grabbing',
        onPress() {
          setPlayed(true);
          gsap.to(this.target, { scale: 1.14, boxShadow: '0 18px 40px rgba(0,0,0,0.45)', duration: 0.2, ease: 'power2.out' });
        },
        onDrag() {
          // tilt with horizontal speed, like the tag is being swung
          const vx = InertiaPlugin.getVelocity(this.target, 'x');
          gsap.to(this.target, { rotation: gsap.utils.clamp(-28, 28, vx / 45), duration: 0.35, overwrite: 'auto' });
          letters.forEach((l) => this.hitTest(l, '35%') && bump(l));
        },
        onThrowUpdate() {
          letters.forEach((l) => this.hitTest(l, '35%') && bump(l));
        },
        onRelease() {
          gsap.to(this.target, { scale: 1, boxShadow: '0 0 0 rgba(0,0,0,0)', duration: 0.6, ease: 'elastic.out(1, 0.45)' });
        },
        onThrowComplete() {
          const i = tagEls.indexOf(this.target as HTMLElement);
          gsap.to(this.target, { rotation: tags[i].rot, duration: 1.1, ease: 'elastic.out(1, 0.3)' });
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const reset = () => {
    const root = area.current;
    if (!root) return;
    gsap.utils.toArray<HTMLElement>('[data-tag]', root).forEach((el, i) => {
      gsap.killTweensOf(el); // stop any throw still gliding, or it fights the reset
      gsap.to(el, { x: 0, y: 0, rotation: tags[i].rot, scale: 1, duration: 0.9, ease: 'elastic.out(1, 0.5)', onComplete: () => void Draggable.get(el)?.update() });
    });
    setBumps(0);
    setPlayed(false);
  };

  return (
    <div ref={area} className="relative mt-14 pt-8 pb-5 select-none md:mt-24 xl:mt-[149px] xl:pb-[35px]">
      <p
        aria-label={WORD}
        data-anim="stagger"
        data-stagger="0.03"
        className="text-center font-display text-[min(calc((100vw-80px)/7.1),218px)] leading-[1.09] font-bold tracking-[-0.01em] whitespace-nowrap"
      >
        {[...WORD].map((ch, i) => (
          <span key={i} data-letter aria-hidden className="inline-block will-change-transform">
            {ch}
          </span>
        ))}
      </p>

      {tags.map((t) => (
        <span
          key={t.label}
          data-tag
          className={`absolute touch-none rounded-full px-3 py-1 text-[12px] leading-[20px] whitespace-nowrap text-black sm:px-[21px] sm:py-[7px] sm:text-[16px] sm:leading-[22px] ${t.className}`}
        >
          {t.label}
        </span>
      ))}

      <div className="absolute bottom-0 left-0 flex items-center gap-3 text-[12px] text-white/45 sm:text-[13px]">
        {played ? (
          <>
            <span>
              Letters bumped: <b className="font-semibold text-white">{bumps}</b>
            </span>
            <button type="button" onClick={reset} className="rounded-full border border-white/25 px-2.5 py-0.5 text-white/70 hover:border-white/60 hover:text-white">
              Reset
            </button>
          </>
        ) : (
          <span>✦ Grab a tag and throw it at the letters</span>
        )}
      </div>
    </div>
  );
}
