import { LogoMark } from '../../components/Logo';
import { IntroOptions } from './IntroOptions';
import { ApartOptions } from './ApartOptions';
import { TestimonialOptions } from './TestimonialOptions';
import { CalculatorOptions } from './CalculatorOptions';
import { CtaOptions } from './CtaOptions';

const groups = [
  { id: 'intro', title: '1M+ strip', sub: 'Quieter versions of the “One smart platform…” strip', C: IntroOptions },
  { id: 'apart', title: 'What Sets SubscriptionPro Apart', sub: 'Totally different layouts for the six features', C: ApartOptions },
  { id: 'calculator', title: 'Calculator', sub: 'Six new ways to show the recurring-savings calculator (all live)', C: CalculatorOptions },
  { id: 'testimonials', title: 'Testimonials', sub: 'Same blue background, new layouts', C: TestimonialOptions },
  { id: 'cta', title: 'CTA', sub: 'Six totally different layouts for “Get the Best of SaaS…”', C: CtaOptions },
];

export function Home2Options() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <header className="sticky top-0 z-50 border-b border-black/10 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1536px] items-center justify-between gap-6 px-5 py-4">
          <div className="flex items-center gap-3">
            <LogoMark height={28} />
            <span className="text-[18px] font-bold">Home Two · section options</span>
          </div>
          <nav className="flex gap-2 text-[14px] font-semibold">
            {groups.map((g) => (
              <a key={g.id} href={`#${g.id}`} className="rounded-full bg-card px-4 py-2 hover:bg-black hover:text-white">
                {g.title}
              </a>
            ))}
            <a href="/home-2.html" className="rounded-full border border-black/15 px-4 py-2 hover:border-black">← Home Two</a>
          </nav>
        </div>
      </header>
      {groups.map(({ id, title, sub, C }) => (
        <div key={id} id={id} className="scroll-mt-16">
          <div className="bg-[#f4f4f6] px-5 py-14">
            <div className="mx-auto max-w-[1536px]">
              <h2 className="text-[40px] font-bold">{title}</h2>
              <p className="mt-2 text-[17px] text-muted">{sub} — pick a letter (e.g. “{title.split(' ')[0]} C”).</p>
            </div>
          </div>
          <C />
        </div>
      ))}
    </div>
  );
}
