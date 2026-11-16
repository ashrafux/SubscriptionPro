import { useEffect, useRef, useState } from 'react';
import { Container } from '../Container';

const A = '/assets/product';
// Thumbnail order from the design (the 3rd image repeats in the 5th slot).
const shots = ['shot-1', 'shot-2', 'shot-3', 'shot-4', 'shot-3', 'shot-5'].map((s) => `${A}/${s}.png`);

/** Screenshot gallery (Figma 6812:1768): large preview on a gradient frame, thumbnail strip with a next button. */
export function Gallery() {
  const [active, setActive] = useState(0);
  const strip = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const box = strip.current;
    const el = box?.children[active] as HTMLElement | undefined;
    if (!box || !el) return;
    // scroll the strip (never the page) only when the active thumb is cut off
    const left = el.offsetLeft - box.offsetLeft;
    const right = left + el.offsetWidth;
    if (left < box.scrollLeft || right > box.scrollLeft + box.clientWidth - 64) box.scrollTo({ left: active === 0 ? 0 : left - 20, behavior: 'smooth' });
  }, [active]);

  return (
    <section className="mt-[30px]">
      <Container>
        <div data-anim="card" className="rounded-[20px] bg-card px-4 py-8 sm:px-8 md:py-[100px]">
          <div className="mx-auto flex max-w-[1090px] flex-col gap-5 md:gap-[35px]">
            <div className="relative aspect-[1089.594/610.995] overflow-hidden rounded-[14px] md:rounded-[21.112px]">
              <img src={`${A}/gallery-bg.png`} alt="" className="absolute inset-0 size-full object-cover" />
              <img
                key={shots[active]}
                src={shots[active]}
                alt={`Zoom screenshot ${active + 1}`}
                className="absolute top-[9.6%] left-1/2 h-[99.76%] w-[87.64%] -translate-x-1/2 rounded-[9px] object-cover shadow-[0_10.556px_42.225px_rgba(0,0,0,0.2)] [animation:gallery-in_.45s_ease-out] md:rounded-[14.045px]"
              />
            </div>

            <div className="relative">
              <style>{'@keyframes gallery-in{from{opacity:.35}to{opacity:1}}'}</style>
              <div
                ref={strip}
                className="flex gap-[13.187px] overflow-x-auto pr-16 [scrollbar-width:none] [mask-image:linear-gradient(90deg,#000_calc(100%-220px),rgba(0,0,0,0.1)_calc(100%-24px))] [&::-webkit-scrollbar]:hidden"
              >
                {shots.map((src, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-label={`Show screenshot ${i + 1}`}
                    aria-current={i === active}
                    className="group relative aspect-[181.452/114.287] w-[120px] shrink-0 overflow-hidden rounded-[8.791px] shadow-[0_4.396px_8.791px_rgba(0,0,0,0.08)] sm:w-[181.452px]"
                  >
                    <img src={src} alt="" className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <span
                      aria-hidden
                      className={`absolute inset-0 rounded-[8.791px] border-[2.637px] transition-colors ${i === active ? 'border-black' : 'border-transparent'}`}
                    />
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setActive((a) => (a + 1) % shots.length)}
                aria-label="Next screenshot"
                className="absolute top-1/2 right-0 flex size-[43.077px] -translate-y-1/2 items-center justify-center rounded-full border-[1.758px] border-black bg-white/60 backdrop-blur-sm transition-colors hover:bg-black [&:hover_img]:invert"
              >
                <img src={`${A}/chevron-right.svg`} alt="" width={20.5507} height={20.5507} />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
