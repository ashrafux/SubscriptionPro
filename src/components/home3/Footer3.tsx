import { useState, type ReactNode } from 'react';
import { Band, BandInner } from '../Container';
import { Logo } from '../Logo';
import { RollText } from '../Roll';

/* Home Three footer (review row 18): cleaner structure — brand + social icons and the newsletter on top,
   link columns in the middle, a legal bar at the bottom, and a calm gradient wordmark instead of the tag toy. */

const columns = [
  { title: 'Company', links: ['About', 'Blog', 'Career', 'Clients', 'Affiliate Partner'] },
  { title: 'Quick Links', links: ['Testimonials', 'Refund Policy', 'Deals', 'Contact Us', 'Submit Your Product'] },
  { title: 'Important', links: ['Product', 'Book a Demo Call', 'Get Started', 'Quick Video', 'Start Managing Free'] },
  { title: 'Support', links: ['Documentation', 'Create a Ticket', 'Privacy Policy', 'Terms of Service'] },
];

const I = (d: ReactNode) => (
  <svg viewBox="0 0 24 24" className="size-[18px]" fill="currentColor" aria-hidden>
    {d}
  </svg>
);
const socials: { name: string; href: string; icon: ReactNode }[] = [
  { name: 'Facebook', href: '#facebook', icon: I(<path d="M14 8.5V6.8c0-.8.5-1 .9-1H17V2.1L14.2 2C11 2 10.3 4.4 10.3 5.9v2.6H8V12h2.3v10H14V12h2.7l.4-3.5z" />) },
  { name: 'X', href: '#x', icon: I(<path d="M17.8 3h3.1l-6.8 7.8L22 21h-6.2l-4.9-6.4L5.3 21H2.2l7.3-8.3L2 3h6.3l4.4 5.8zm-1.1 16.2h1.7L7.4 4.7H5.6z" />) },
  { name: 'LinkedIn', href: '#linkedin', icon: I(<path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3zM9.5 9.5h3.8v1.6h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.1c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V21h-4z" />) },
  {
    name: 'Instagram',
    href: '#instagram',
    icon: (
      <svg viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  { name: 'YouTube', href: '#youtube', icon: I(<path d="M21.6 7.2a2.6 2.6 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.6 2.6 0 0 0 2.4 7.2 27 27 0 0 0 2 12a27 27 0 0 0 .4 4.8 2.6 2.6 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.6 2.6 0 0 0 1.8-1.8A27 27 0 0 0 22 12a27 27 0 0 0-.4-4.8zM10 15V9l5.2 3z" />) },
];

export function Footer3() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <Band as="footer" outer="mt-5 pb-5" className="bg-forest text-white">
      <BandInner className="pt-16 md:pt-20 xl:pt-[100px]">
        {/* brand + socials | newsletter */}
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
          <div data-anim="fade-up">
            <Logo onDark className="w-[200px] md:w-[230px]" />
            <p className="mt-5 max-w-[420px] text-[16px] leading-[1.6] text-white/65">
              One smart platform to buy, track and renew every SaaS tool your business depends on — at partner prices.
            </p>
            <ul className="mt-6 flex gap-3" aria-label="SubscriptionPro on social media">
              {socials.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.href}
                    aria-label={s.name}
                    className="flex size-11 items-center justify-center rounded-full bg-white/[0.08] text-white/80 ring-1 ring-white/10 transition duration-300 hover:-translate-y-1 hover:bg-pink hover:text-white hover:ring-pink"
                  >
                    {s.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div data-anim="fade-up" data-delay="0.1" className="rounded-[22px] bg-white/[0.06] p-6 ring-1 ring-white/10 md:p-8">
            <p className="font-display text-[22px] leading-[1.3] font-bold md:text-[26px]">Get the best SaaS deals in your inbox</p>
            <p className="mt-2 text-[15px] text-white/60">One short email a month. No spam, unsubscribe any time.</p>
            <form
              className="mt-5 flex h-[58px] w-full items-center rounded-full bg-white p-[5px] pl-5"
              onSubmit={(e) => {
                e.preventDefault();
                if (email) setSent(true);
              }}
            >
              <label className="sr-only" htmlFor="footer3-email">Your email</label>
              <input
                id="footer3-email"
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setSent(false);
                }}
                placeholder={sent ? 'Thanks — you’re subscribed!' : 'Your work email'}
                className="min-w-0 flex-1 bg-transparent text-[16px] text-black outline-none placeholder:text-[#9a9a9a]"
              />
              <button type="submit" className="btn-roll flex h-[48px] shrink-0 items-center justify-center rounded-full bg-pink px-6 text-[15px] font-semibold text-white hover:brightness-95">
                <RollText>Subscribe</RollText>
              </button>
            </form>
          </div>
        </div>

        <hr data-anim="draw" className="mt-12 border-white/10 md:mt-16" />

        {/* link columns + highlight */}
        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 md:mt-14 md:grid-cols-4 lg:grid-cols-[repeat(4,minmax(0,1fr))_minmax(0,1.2fr)]">
          {columns.map((c) => (
            <nav key={c.title} aria-label={c.title}>
              <h3 className="text-[13px] font-semibold tracking-[0.14em] text-white/50 uppercase">{c.title}</h3>
              <ul className="mt-5 flex flex-col gap-3.5 text-[15.5px] text-white/85">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="group inline-flex items-center transition-colors hover:text-white">
                      <span className="h-px w-0 bg-pink transition-all duration-300 group-hover:mr-1.5 group-hover:w-3" />
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <div className="col-span-2 flex flex-col justify-between gap-5 rounded-[22px] bg-[linear-gradient(135deg,#f07ac4,#c94fa6_55%,#8b5cf6)] p-6 md:col-span-4 lg:col-span-1">
            <p className="font-display text-[34px] leading-none font-bold">200,000+</p>
            <p className="text-[15px] leading-[1.5] text-white/90">users registered since January 2026 — and saving on every renewal.</p>
            <a href="#get-started" className="btn-roll self-start rounded-full bg-white px-5 py-2.5 text-[14px] font-semibold text-[#14141f]">
              <RollText>Start managing free →</RollText>
            </a>
          </div>
        </div>

        {/* legal bar */}
        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 py-7 text-[14px] text-white/55 md:mt-16 md:flex-row md:items-center md:justify-between">
          <p>© 2026 SubscriptionPro. All rights reserved.</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {['Privacy Policy', 'Terms of Service', 'Refund Policy', 'Cookies'].map((l) => (
              <li key={l}>
                <a href="#" className="transition-colors hover:text-white">{l}</a>
              </li>
            ))}
          </ul>
        </div>
      </BandInner>

      {/* calm gradient wordmark, clipped at the bottom edge */}
      <div aria-hidden className="pointer-events-none relative -mt-4 overflow-hidden px-5">
        <p className="translate-y-[18%] text-center font-display text-[11vw] leading-[0.9] font-bold tracking-[-0.04em] text-transparent select-none [-webkit-background-clip:text] [background-clip:text] [background-image:linear-gradient(180deg,rgba(255,255,255,0.16),rgba(255,255,255,0.02))] min-[1920px]:text-[208px]">
          SubscriptionPro
        </p>
      </div>
    </Band>
  );
}
