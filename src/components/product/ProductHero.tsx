import { useState } from 'react';
import { Container } from '../Container';
import { RollIcon, RollText } from '../Roll';

const A = '/assets/product';

/* Blue card's drafting grid (Figma "OBJECTS", 6812:1652): 39 vertical and 25 horizontal hairlines plus a frame,
   placed at the same percentages as the design so the grid scales with the card. */
const vLines = Array.from({ length: 39 }, (_, i) => 2.49 + i * 2.4366);
const hLines = Array.from({ length: 25 }, (_, i) => 3.77 + i * 3.6983);

function Grid() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 -top-[7px] h-[calc(100%+16px)] opacity-30">
      {vLines.map((x) => (
        <img key={`v${x}`} src={`${A}/grid-v.svg`} alt="" className="absolute top-[0.07%] bottom-[0.08%] h-[99.85%] w-px -translate-x-1/2 max-w-none" style={{ left: `${x}%` }} />
      ))}
      {hLines.map((y) => (
        <img key={`h${y}`} src={`${A}/grid-h.svg`} alt="" className="absolute right-[0.05%] left-[0.05%] h-px w-[99.9%] -translate-y-1/2 max-w-none" style={{ top: `${y}%` }} />
      ))}
      <img src={`${A}/grid-frame.svg`} alt="" className="absolute inset-[0.07%_0.05%_0.08%_0.05%] size-[99.9%] max-w-none" />
    </div>
  );
}

const tags = [
  { icon: 'sitemap', label: 'Remote Teams' },
  { icon: 'graduation-cap', label: 'Education Platforms' },
  { icon: 'video', label: 'HD Video Meetings' },
  { icon: 'chart-pie-alt', label: 'Marketing Teams' },
];

// Yearly is the design's plan; Quarterly and Monthly are placeholder prices so the carousel dots have slides to show.
const plans = [
  { period: 'Yearly', price: '$330.40', was: '$330.40', save: 'Save $10', off: 'Discounted 8%' },
  { period: 'Quarterly', price: '$89.90', was: '$97.70', save: 'Save $8', off: 'Discounted 8%' },
  { period: 'Monthly', price: '$31.90', was: '$34.70', save: 'Save $3', off: 'Discounted 8%' },
];

function BuyButton({ className = '' }: { className?: string }) {
  return (
    <a href="#pricing" className={`btn-roll inline-flex h-[60px] items-center justify-center gap-[15px] rounded-full bg-pink px-8 text-[18px] leading-[1.35] font-bold tracking-[0.5909px] whitespace-nowrap text-white hover:brightness-95 sm:h-[68px] sm:px-10 sm:text-[20px] ${className}`}>
      <RollIcon size={24}>
        <img src={`${A}/shopping-bag.svg`} alt="" width={24} height={24} />
      </RollIcon>
      <RollText>Buy Now</RollText>
    </a>
  );
}

function PriceCard() {
  const [i, setI] = useState(0);
  const p = plans[i];
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full max-w-[364px] rounded-[20px] border border-[#ebedf1] bg-white px-[39px] pt-[53px] pb-[40px] shadow-[0_10px_50px_rgba(0,0,0,0.08)]">
        <span className="absolute top-[10px] right-[10px] flex h-[27px] items-center rounded-[40px] bg-[#4640dd] px-5 text-[13px] font-semibold tracking-[0.1455px] text-white">{p.period}</span>
        <p className="text-[14.849px] leading-[1.2] text-muted">Starting from</p>
        <div className="mt-[3px] flex items-start justify-between gap-3">
          <div>
            <p className="text-[38px] leading-[1.35] font-bold tracking-[0.7312px] text-black sm:text-[44.547px]">{p.price}</p>
            <p className="text-[17.324px] leading-[1.2] text-muted line-through">{p.was}</p>
          </div>
          <div className="mt-[8px] flex w-[79px] shrink-0 flex-col gap-[10px]">
            <span className="flex h-[23px] items-center justify-center rounded-[5px] bg-green text-[12px] font-semibold tracking-[0.1455px] whitespace-nowrap text-white">{p.save}</span>
            <span className="text-[12px] leading-[1.2] text-muted">{p.off}</span>
          </div>
        </div>
        <ul className="mt-[30px] flex flex-col gap-[13px] text-[18px] text-muted">
          <li className="flex gap-[10px] leading-[1.3]">
            <img src={`${A}/check-circle.svg`} alt="" width={20} height={20} className="mt-[2px] size-5 shrink-0 self-start" />
            <span className="max-w-[240px]">Unlimited access to all Premium features with cloud storage option.</span>
          </li>
          <li className="flex items-center gap-[10px] leading-[1.5]">
            <img src={`${A}/check-circle.svg`} alt="" width={20} height={20} className="shrink-0" />
            Unlimited Zoom Meetings
          </li>
        </ul>
        <div className="mt-[67px] flex justify-center">
          <BuyButton />
        </div>
      </div>
      <div className="mt-[27px] flex gap-[10px]" role="tablist" aria-label="Plans">
        {plans.map((pl, k) => (
          <button
            key={pl.period}
            type="button"
            role="tab"
            aria-selected={k === i}
            aria-label={pl.period}
            onClick={() => setI(k)}
            className={`size-2 rounded-full transition-colors ${k === i ? 'bg-black' : 'bg-[#d0d0d0] hover:bg-[#a8a8a8]'}`}
          />
        ))}
      </div>
    </div>
  );
}

export function ProductHero() {
  return (
    <section className="pt-5 lg:pt-10">
      <Container>
        <div className="grid grid-cols-[minmax(0,1fr)] gap-5 lg:grid-cols-[minmax(0,982fr)_minmax(0,484fr)] lg:gap-[30px]">
          <div data-anim="fade-up" className="relative min-w-0 overflow-hidden rounded-[20px] bg-[rgba(11,92,255,0.12)]">
            <Grid />
            <div className="relative flex flex-col gap-8 px-6 py-10 sm:px-10 xl:flex-row xl:gap-[58px] xl:px-[60px] xl:pt-[70px] xl:pb-[60px]">
              <div className="relative flex size-[132px] shrink-0 items-center justify-center rounded-[18px] bg-white shadow-[0_5px_10px_rgba(0,0,0,0.08)] sm:size-[186px] sm:rounded-[25.135px]">
                <div className="relative h-[60px] w-[62px] overflow-hidden sm:h-[84.898px] sm:w-[87.395px]" role="img" aria-label="Zoom">
                  <img src={`${A}/zoom-sprite.png`} alt="" className="absolute top-0 left-0 h-[99.6%] w-[371.43%] max-w-none" />
                </div>
              </div>

              <div className="flex min-w-0 flex-col gap-10 xl:mt-[6px] xl:gap-12">
                <div className="flex flex-col gap-[18px]">
                  <h1 className="text-[38px] leading-[1.2] font-bold text-black sm:text-[46px] xl:text-[52px]">Zoom Subscription</h1>
                  <p className="max-w-[444px] text-[17px] leading-[1.3] text-body sm:text-[18px]">
                    Run virtual meetings, webinars, and team calls effortlessly with Zoom’s secure and reliable platform.
                  </p>
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[17px] leading-[1.3] text-body sm:text-[18px]">
                    <span className="flex gap-[10px]">
                      <img src={`${A}/users-alt.svg`} alt="" width={24} height={24} />
                      33,000+ customers
                    </span>
                    <span className="flex gap-[10px]">
                      <img src={`${A}/chat.svg`} alt="" width={24} height={24} />
                      55+ testimonials
                    </span>
                  </div>
                </div>

                <ul className="flex max-w-[409px] flex-wrap gap-[7px] sm:grid sm:grid-cols-[auto_auto] sm:justify-start">
                  {tags.map((t) => (
                    <li key={t.label} className="flex items-center justify-center gap-[10px] rounded-full bg-white px-4 py-3 text-[15px] leading-[1.3] whitespace-nowrap text-black sm:px-5 sm:text-[16px]">
                      <img src={`${A}/${t.icon}.svg`} alt="" width={20} height={20} />
                      {t.label}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap items-center">
                  <BuyButton />
                  <a href="#contact" className="flex h-[55px] items-center px-8 text-[18px] leading-[1.35] font-medium tracking-[0.5909px] text-black underline underline-offset-4 hover:text-pink sm:px-[50px] sm:text-[20px]">
                    Contact
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div data-anim="fade-up" className="flex items-center justify-center rounded-[20px] bg-card px-5 py-10 lg:px-[60px] lg:pt-[60px] lg:pb-[50px]">
            <PriceCard />
          </div>
        </div>
      </Container>
    </section>
  );
}
