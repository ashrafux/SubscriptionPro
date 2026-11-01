import { LogoMark } from '../components/Logo';

/* Puffy (option 03) refined: smaller, softer icons and three non-pig savings icons. Generated with Higgsfield (GPT Image 2.5). */

const savings = [
  { key: 'coins', name: 'Coin stack', note: 'Three puffy coins with a $ sign.' },
  { key: 'bag', name: 'Money bag', note: 'A tied puffy money bag with a $ sign.' },
  { key: 'wallet', name: 'Wallet', note: 'A puffy wallet with a coin peeking out.' },
];

const OPACITY = 0.55;
const img = 'transition-opacity duration-300 hover:opacity-90';

function Small({ value, label, bg, src }: { value: string; label: string; bg: string; src: string }) {
  return (
    <div className={`relative h-[180px] overflow-hidden rounded-[20px] ${bg}`}>
      <div className="absolute top-1/2 left-[50px] flex -translate-y-1/2 flex-col gap-3">
        <p className="text-[40px] leading-[1.1] font-bold tracking-[0.5909px]">{value}</p>
        <p className="text-[18px] leading-[1.5] text-copy">{label}</p>
      </div>
      <img src={src} alt="" style={{ opacity: OPACITY }} className={`absolute right-[22px] bottom-[18px] size-[118px] object-contain ${img}`} />
    </div>
  );
}

export function StatsOptions() {
  return (
    <div className="min-h-screen bg-[#f4f4f6] px-5 py-12 font-sans">
      <div className="mx-auto max-w-[1280px]">
        <div className="flex items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3">
              <LogoMark height={34} />
              <h1 className="text-[34px] font-bold tracking-tight">Stat card illustrations · Puffy</h1>
            </div>
            <p className="mt-2 text-[16px] text-muted">
              Smaller icons at {Math.round(OPACITY * 100)}% opacity. Three savings icons to choose from; folder and % stay the same.
            </p>
          </div>
          <a href="/" className="rounded-full border border-neutral-300 bg-white px-4 py-2 text-[14px] font-semibold hover:border-black">← Back to site</a>
        </div>

        <ol className="mt-10 flex flex-col gap-10">
          {savings.map((o, i) => (
            <li key={o.key} className="rounded-[24px] bg-white p-6">
              <div className="mb-4 flex items-baseline gap-3">
                <span className="text-[14px] font-bold text-pink">{String(i + 1).padStart(2, '0')}</span>
                <h2 className="text-[20px] font-bold">{o.name}</h2>
                <p className="text-[14px] text-muted">{o.note}</p>
              </div>
              <div className="grid grid-cols-[353px_353px] gap-7">
                <div className="relative h-[388px] overflow-hidden rounded-[20px] bg-stat-blue">
                  <div className="absolute top-[50px] left-[50px] flex flex-col gap-3">
                    <p className="text-[60px] leading-[1.1] font-bold tracking-[0.5909px]">50k+</p>
                    <p className="text-[18px] leading-[1.5] text-copy">Premium Savings</p>
                  </div>
                  <img
                    src={`/assets/stats/options/c-${o.key}.png`}
                    alt=""
                    style={{ opacity: OPACITY }}
                    className={`absolute right-[28px] bottom-[26px] size-[175px] object-contain ${img}`}
                  />
                </div>
                <div className="grid gap-7">
                  <Small value="$2M+" label="Active projects" bg="bg-stat-lilac" src="/assets/stats/options/c-projects.png" />
                  <Small value="40%" label="Save Up to" bg="bg-stat-lime" src="/assets/stats/options/c-discount.png" />
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
