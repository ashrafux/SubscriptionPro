import { PillButton } from './PillButton';
import { Analytics, Coffee, MoneyStack } from './Icons';
import { RollText } from './Roll';
import { ScaledScreen } from './apart/Shell';
import { AnalyticsCard } from './trusted/AnalyticsCard';

const items = [
  {
    Icon: MoneyStack,
    title: ['Save More with Exclusive', 'Partner Pricing'],
    body: 'Access official partner discounts on leading SaaS products and reduce software expenses without compromising on the tools your team relies on.',
  },
  {
    Icon: Analytics,
    title: ['Manage Every', 'Subscription in One Place'],
    body: 'Track renewals, billing, licenses, and invoices from a single dashboard to eliminate manual work and avoid missed renewals.',
  },
  {
    Icon: Coffee,
    title: ['Scale with Confidence'],
    body: 'From startups to enterprise organizations, businesses streamline SaaS procurement, improve visibility, and gain complete control over their software stack.',
  },
];

/** `centered`: Home Two centres the heading with a two-line description under it and uses a secondary pill button. */
export function Trusted({ centered = false }: { centered?: boolean }) {
  return (
    <section className="px-5 py-16 md:py-24 xl:pt-[144px] xl:pb-[192px]">
      <div className="mx-auto max-w-[1496px]">
        <div
          className={
            centered
              ? 'mx-auto flex max-w-[960px] flex-col items-center gap-5 text-center md:gap-6'
              : 'flex flex-col gap-5 lg:flex-row lg:justify-between lg:gap-10'
          }
        >
          <h2 data-split className="max-w-[929px] text-[34px] leading-[1.1] font-bold tracking-[0.5909px] sm:text-[44px] lg:text-[60px]">
            Trusted by Teams That <br className="hidden lg:block" />
            Save More Every Renewal
          </h2>
          <p
            data-anim="fade-up"
            className={`text-[17px] leading-[1.5] text-muted md:text-[20px] ${centered ? 'max-w-[700px] text-balance' : 'max-w-[352px] lg:pt-3 2xl:mr-[154px]'}`}
          >
            Thousands of businesses reduce software costs, simplify subscription management, and unlock exclusive
            partner pricing with SubscriptionPro.
          </p>
        </div>

        <div className="mt-10 grid items-start gap-10 md:mt-14 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-14 2xl:grid-cols-[861px_1fr] 2xl:gap-[130px]">
          <div data-anim="reveal" className="relative aspect-[861/700] overflow-hidden rounded-[20px]">
            {/* background generated with Higgsfield (GPT Image 2.5, 2K) */}
            <img src="/assets/trusted/bg.jpg" alt="" data-speed="0.06" className="absolute inset-0 size-full scale-110 object-cover" />
            {/* frosted frame + the analytics window, drawn in HTML so it stays sharp at any size */}
            <div
              data-speed="-0.05"
              className="absolute top-[14%] left-[9%] w-[84%] rounded-[3.2%/4.2%] bg-[#e7e5fc]/80 px-[7.6%] py-[2.6%] shadow-[0_30px_60px_rgba(20,20,70,0.25)] backdrop-blur-md"
              role="img"
              aria-label="Subscription analytics: total subscriptions, savings, upcoming renewals, spending overview, top subscriptions"
            >
              <ScaledScreen width={1000} height={740}>
                <AnalyticsCard />
              </ScaledScreen>
            </div>
          </div>

          <div className="flex flex-col lg:pt-5 min-[1600px]:mr-[-50px]">
            <ul data-anim="stagger" data-stagger="0.12" className="flex flex-col gap-8 md:gap-[30px]">
              {items.map(({ Icon, title, body }) => (
                <li key={title[0]} className="flex gap-5 md:gap-[26px]">
                  <Icon className="size-12 shrink-0 md:size-[61px]" />
                  <div className="max-w-[468px]">
                    <h3 className="text-[22px] leading-[1.3] font-bold md:text-[28px]">
                      {title.map((t, i) => (
                        <span key={t}>
                          {i > 0 && <br className="hidden lg:block" />} {t}
                        </span>
                      ))}
                    </h3>
                    <p className="mt-4 font-lato text-[16px] leading-[1.5] text-[#6b6b6b]">{body}</p>
                  </div>
                </li>
              ))}
            </ul>
            {centered ? (
              <div data-anim="fade-up" className="mt-10 ml-[68px] md:mt-[52px] md:ml-[87px]">
                <PillButton href="#clients" variant="secondary" arrow>
                  See the client
                </PillButton>
              </div>
            ) : (
              <a data-anim="fade-up" href="#clients" className="btn-roll mt-10 ml-[68px] inline-flex self-start border-b-2 border-current text-[22px] leading-[1.35] font-bold md:mt-[52px] md:ml-[87px] md:text-[28px]">
                <RollText>See the client →</RollText>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
