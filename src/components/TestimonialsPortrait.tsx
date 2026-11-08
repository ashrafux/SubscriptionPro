import { TiltBadge } from './Badge';
import { Band, BandInner } from './Container';

/* Home Two testimonials: rich-black band with logo-colour glows, four portrait cards (photo on top, product badge, quote). */

type T = { quote: string; name: string; role: string; logo: string; photo: string; pos?: string };

const items: T[] = [
  { quote: 'We moved 14 renewals onto SubscriptionPro and cut our yearly SaaS bill by almost a third. Finance finally has one invoice to reconcile.', name: 'Martin Iyooh', role: 'Tech Influencer, South Africa', logo: '/assets/products/clickup.svg', photo: '/assets/intro/user2.png' },
  { quote: 'Same Google Workspace licenses, same support — just cheaper every single year.', name: 'Sara Lindqvist', role: 'Ops Lead, Nordlab', logo: '/assets/brands/google.png', photo: '/assets/intro/user1.png' },
  { quote: 'The renewal alerts alone paid for themselves. No more surprise charges on a card nobody remembers.', name: 'Daniel Okafor', role: 'Founder, Brightdesk', logo: '/assets/brands/canva.png', photo: '/assets/intro/user3.png' },
  { quote: 'Buying Adobe seats for a 40-person studio used to take a week of back-and-forth. Now it is two clicks.', name: 'Priya Raman', role: 'Studio Manager, Fold', logo: '/assets/brands/adobe-cc.png', photo: '/assets/testimonials/priya.jpg', pos: '50% 30%' },
];

// Rich black with soft glows in the logo's colours (blue, pink, orange) over a faint grid.
const bg = {
  backgroundColor: '#0b0b12',
  backgroundImage: [
    'radial-gradient(45% 55% at 8% 0%, rgba(225,90,171,0.28), transparent 70%)',
    'radial-gradient(40% 50% at 95% 8%, rgba(99,135,255,0.24), transparent 70%)',
    'radial-gradient(50% 45% at 85% 105%, rgba(245,166,91,0.18), transparent 70%)',
    'linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px)',
    'linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)',
  ].join(', '),
  backgroundSize: '100% 100%, 100% 100%, 100% 100%, 92px 92px, 92px 92px',
  backgroundPosition: '0 0, 0 0, 0 0, -34px -22px, -34px -22px',
};

export function TestimonialsPortrait() {
  return (
    <Band outer="mt-5" className="py-16 md:py-24 xl:pt-[150px] xl:pb-[170px]" style={bg}>
      <BandInner>
        <div className="flex flex-col items-center text-center">
          <span data-anim="scale-in">
            <TiltBadge className="bg-mint" angle={-7}>Testimonials</TiltBadge>
          </span>
          <h2 data-split className="mt-2 max-w-[684px] text-[34px] leading-[1.1] font-bold tracking-[0.5909px] text-white sm:text-[44px] lg:text-[60px] lg:leading-[68px]">
            Globally Brilliant always wants to save cost by us
          </h2>
        </div>

        <div data-anim="stagger" data-stagger="0.1" className="mx-auto mt-10 grid max-w-[1418px] gap-5 sm:grid-cols-2 md:mt-[61px] lg:gap-6 xl:grid-cols-4">
          {items.map((t) => (
            <div key={t.name} data-anim-item>
              <figure className="group flex h-full flex-col overflow-hidden rounded-[22px] bg-white transition-[transform,box-shadow] duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_30px_60px_-24px_rgba(8,18,90,0.55)]">
                <div className="relative h-[230px] overflow-hidden sm:h-[250px] xl:h-[230px] 2xl:h-[250px]">
                  <img
                    src={t.photo}
                    alt={t.name}
                    className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                    style={{ objectPosition: t.pos ?? '50% 25%' }}
                  />
                  <span className="absolute bottom-4 left-4 flex size-12 items-center justify-center rounded-[14px] bg-white shadow-[0_6px_16px_rgba(0,0,0,0.12)] transition-transform duration-500 group-hover:-rotate-6">
                    <img src={t.logo} alt="" className="size-7 object-contain" />
                  </span>
                </div>
                <div className="flex flex-1 flex-col justify-between gap-7 p-7">
                  <blockquote className="text-[16px] leading-[1.6] text-copy">“{t.quote}”</blockquote>
                  <figcaption>
                    <p className="font-poppins text-[16px] font-semibold">{t.name}</p>
                    <p className="font-poppins text-[12px] text-muted">{t.role}</p>
                  </figcaption>
                </div>
              </figure>
            </div>
          ))}
        </div>
      </BandInner>
    </Band>
  );
}
