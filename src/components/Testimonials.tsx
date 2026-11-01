import type { ReactNode } from 'react';
import { TiltBadge } from './Badge';
import { Band, BandInner } from './Container';

type Testimonial = { quote: string; name: string; role: string; logo: ReactNode };

const quote = 'Lorem ipsum dolor sit amet consectetur. Lectus justo donec justo lectus condimentum adipiscing tempor. Et adipiscing habitant sceler.';
const logo = (src: string, alt: string, size = 40) => <img src={src} alt={alt} style={{ width: size, height: size }} className="object-contain" />;

const items: Testimonial[] = [
  { quote, name: 'Martin Iyooh', role: 'Tech Influencer, South Africa', logo: <img src="/assets/products/clickup.svg" alt="ClickUp" width={27} height={32} /> },
  { quote, name: 'Martin Iyooh', role: 'Tech Influencer, South Africa', logo: logo('/assets/brands/google.png', 'Google') },
  { quote, name: 'Martin Iyooh', role: 'Tech Influencer, South Africa', logo: logo('/assets/brands/canva.png', 'Canva') },
  { quote, name: 'Martin Iyooh', role: 'Tech Influencer, South Africa', logo: logo('/assets/brands/adobe-cc.png', 'Adobe', 41) },
  { quote, name: 'Martin Iyooh', role: 'Tech Influencer, South Africa', logo: logo('/assets/brands/notion.png', 'Notion', 36) },
];

function Card({ t }: { t: Testimonial }) {
  return (
    <figure
      data-anim-item
      className="flex min-h-[260px] w-full flex-col justify-between rounded-[16px] bg-white px-6 pt-8 pb-6 transition-transform duration-500 hover:-translate-y-2 hover:rotate-[-0.6deg] sm:w-[calc(50%-12px)] sm:px-[31px] sm:pt-[37px] sm:pb-[28px] lg:min-h-[295px] lg:w-[calc(33.333%-22px)] lg:max-w-[451px]"
    >
      <blockquote className="max-w-[366px] text-[17px] leading-[26px] text-copy sm:text-[18px]">{t.quote}</blockquote>
      <figcaption className="mt-8 flex items-center gap-4">
        <img src="/assets/intro/user2.png" alt="" className="size-12 rounded-full object-cover" />
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="font-poppins text-[16px] leading-[1.5] font-semibold">{t.name}</span>
          <span className="font-poppins text-[12px] leading-[1.5] text-muted">{t.role}</span>
        </span>
        <span className="flex size-10 shrink-0 items-center justify-center">{t.logo}</span>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  return (
    <Band
      outer="mt-5 pin:mt-0"
      className="bg-testimonial py-16 md:py-24 xl:pt-[161px] xl:pb-[200px]"
      style={{
        backgroundImage:
          'linear-gradient(rgba(255,255,255,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.09) 1px, transparent 1px)',
        backgroundSize: '92px 92px',
        backgroundPosition: '-34px -22px',
      }}
    >
      <BandInner>
        <div className="flex flex-col items-center text-center">
          <span data-anim="scale-in">
            <TiltBadge className="bg-mint" angle={-7}>Testimonials</TiltBadge>
          </span>
          <h2 data-split className="mt-2 max-w-[684px] text-[34px] leading-[1.1] font-bold tracking-[0.5909px] text-white sm:text-[44px] lg:text-[60px] lg:leading-[68px]">
            Globally Brilliant always wants to save cost by us
          </h2>
        </div>

        <div
          data-anim="stagger"
          data-stagger="0.1"
          className="mx-auto mt-10 flex max-w-[1418px] flex-wrap justify-center gap-6 md:mt-[61px] lg:gap-x-[32px] lg:gap-y-[37px]"
        >
          {items.map((t, i) => (
            <Card key={i} t={t} />
          ))}
        </div>
      </BandInner>
    </Band>
  );
}
