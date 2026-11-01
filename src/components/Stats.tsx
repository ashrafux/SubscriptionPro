import type { ReactNode } from 'react';
import { ChatGptMark, ZoomMark } from './Brand';

/** A white rounded tile + logo, rotated together. `box` is the Figma bounding box inside the 734×388 card. */
function Tile({ x, y, box, tile, radius, angle, children }: {
  x: number; y: number; box: number; tile: number; radius: number; angle: number; children: ReactNode;
}) {
  return (
    <div className="absolute flex items-center justify-center" style={{ left: x, top: y, width: box, height: box }}>
      <div
        className="flex shrink-0 items-center justify-center bg-white"
        style={{ width: tile, height: tile, borderRadius: radius, transform: `rotate(${angle}deg)` }}
      >
        {children}
      </div>
    </div>
  );
}

function ProductsCard() {
  return (
    <div data-anim-item className="relative h-[340px] overflow-hidden rounded-[20px] bg-stat-indigo sm:h-[388px] md:order-last md:col-span-2 lg:order-none lg:col-span-1">
      <div className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 sm:block" style={{ width: 734, height: 388 }}>
        {/* Orbit rings */}
        <div data-speed="0.08" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <img
            src="/assets/stats/orbits.svg"
            alt=""
            width={483.223}
            height={746.531}
            className="block max-w-none"
            style={{ transform: 'rotate(-42.32deg) skewX(30.8deg)' }}
          />
        </div>

        <Tile x={117} y={96} box={66.564} tile={54.274} radius={12.158} angle={15.14}>
          <img src="/assets/brands/canva.png" alt="Canva" className="size-[44.373px] object-cover" />
        </Tile>
        <Tile x={559} y={214} box={70.28} tile={58.501} radius={13.105} angle={-13.15}>
          <img src="/assets/stats/clickup.svg" alt="ClickUp" width={33.5623} height={40.1966} />
        </Tile>
        <div className="absolute flex items-center justify-center" style={{ left: 123, top: 265, width: 72.542, height: 71.909 }}>
          <img
            src="/assets/brands/adobe-cc.png"
            alt="Adobe Creative Cloud"
            className="h-[53.638px] w-[54.957px] max-w-none object-cover"
            style={{ transform: 'rotate(-25.15deg)' }}
          />
        </div>
        <Tile x={513} y={90} box={78.675} tile={58.364} radius={13.074} angle={-27.4}>
          <img src="/assets/brands/notion.png" alt="Notion" className="size-[39.77px]" />
        </Tile>
        <Tile x={367} y={43} box={59.147} tile={47.66} radius={10.676} angle={-16.35}>
          <img src="/assets/brands/google.png" alt="Google" className="size-[36.235px] object-cover" />
        </Tile>
        <Tile x={375.23} y={311.09} box={42.994} tile={34.69} radius={7.771} angle={-16.21}>
          <ChatGptMark size={25.046} />
        </Tile>
        <Tile x={27} y={220} box={32.068} tile={32.068} radius={7.184} angle={0}>
          <img src="/assets/brands/microsoft365.png" alt="Microsoft 365" className="h-[24.219px] w-[22.017px] -scale-y-100 object-cover" />
        </Tile>
        <Tile x={676.99} y={198.46} box={27.685} tile={21.706} radius={4.862} angle={-19.41}>
          <ZoomMark size={14.77} />
        </Tile>
      </div>

      <div className="absolute top-[calc(50%+0.5px)] left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-3 text-center whitespace-nowrap text-white">
        <p data-count className="text-[56px] leading-[1.1] font-bold tracking-[0.5909px] md:text-[70px]">100+</p>
        <p className="text-[18px] leading-[1.5] opacity-70">
          SaaS Products that empowers
          <br />
          your digital Journey
        </p>
      </div>
    </div>
  );
}

/** Puffy 3D icons (Higgsfield, GPT Image 2.5), pinned bottom-right of each card at a soft 55% opacity. */
const ICON = 'pointer-events-none absolute right-6 bottom-6 object-contain opacity-55 transition-opacity duration-300 group-hover:opacity-80 sm:right-7 sm:bottom-7';

function SmallStat({ value, label, bg, icon }: { value: string; label: string; bg: string; icon: string }) {
  return (
    <div className={`group relative flex h-[180px] flex-col justify-center gap-3 overflow-hidden rounded-[20px] px-8 sm:px-[50px] ${bg}`}>
      <p data-count className="relative text-[40px] leading-[1.1] font-bold tracking-[0.5909px]">{value}</p>
      <p className="relative text-[18px] leading-[1.5] text-copy">{label}</p>
      <img src={icon} alt="" width={118} height={118} className={`${ICON} size-[96px] sm:size-[110px]`} />
    </div>
  );
}

export function Stats() {
  return (
    <section className="px-5 py-16 md:py-24 xl:py-[144px]">
      <div className="mx-auto flex max-w-[846px] flex-col items-center gap-5 text-center md:gap-7">
        <h2 data-split className="text-[34px] leading-[1.1] font-bold tracking-[0.5909px] sm:text-[44px] lg:text-[60px]">
          Number comes after hardwork &amp; it doesn’t Tell a Lie
        </h2>
        <p data-anim="fade-up" className="max-w-[585px] text-[17px] leading-[1.5] text-muted md:text-[20px]">
          Every number here reflects our journey helping tech companies &amp; people grow smarter and faster.
        </p>
      </div>

      <div data-anim="stagger" data-stagger="0.12" className="mx-auto mt-10 grid max-w-[1496px] gap-5 md:mt-[60px] md:grid-cols-2 md:gap-7 lg:grid-cols-[353fr_734fr_353fr]">
        <div data-anim-item className="group relative h-[340px] overflow-hidden rounded-[20px] bg-stat-blue sm:h-[388px]">
          <div className="absolute top-8 left-8 flex w-[272px] flex-col gap-3 sm:top-[50px] sm:left-[50px]">
            <p data-count className="text-[52px] leading-[1.1] font-bold tracking-[0.5909px] sm:text-[60px]">50k+</p>
            <p className="text-[18px] leading-[1.5] text-copy">Premium Savings</p>
          </div>
          <img src="/assets/stats/savings-wallet.png" alt="" width={175} height={175} className={`${ICON} size-[140px] sm:size-[175px]`} />
        </div>

        <ProductsCard />

        <div data-anim-item className="grid gap-5 md:gap-7">
          <SmallStat value="$2M+" label="Active projects" bg="bg-stat-lilac" icon="/assets/stats/projects-folder.png" />
          <SmallStat value="40%" label="Save Up to" bg="bg-stat-lime" icon="/assets/stats/discount-percent.png" />
        </div>
      </div>
    </section>
  );
}
