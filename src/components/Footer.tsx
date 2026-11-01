import { useState } from 'react';
import { Band, BandInner } from './Container';
import { LogoMark } from './Logo';
import { RollText } from './Roll';
import { TagPlayground } from './TagPlayground';

const columns = [
  { title: 'Company', links: ['About', 'Blog', 'Career', 'Clients', 'Affiliate Partner'] },
  { title: 'Quick Links', links: ['Testimonials', 'Refund Policy', 'Deals', 'Contact Us', 'Submit Your Product'] },
  { title: 'Important', links: ['Product', 'Book a Demo Call', 'Get Started', 'Quick Video', 'Start Managing Free'] },
  { title: 'Support', links: ['Blog', 'Documentation', 'Create a Ticket', 'Privacy Policy', 'Terms of Service'] },
];

export function Footer() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <Band as="footer" outer="mt-5 pb-5" className="bg-forest text-white">
      <BandInner className="pt-16 md:pt-20 xl:pt-[125px]">
        <div data-anim="stagger" className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4 md:gap-x-8">
          {columns.map((c) => (
            <nav key={c.title} aria-label={c.title} className="2xl:[&:nth-child(2)]:ml-[64px] 2xl:[&:nth-child(3)]:ml-[86px] 2xl:[&:nth-child(4)]:ml-[118px]">
              <h3 className="text-[19px] leading-[28px] font-bold md:text-[22px] md:leading-[32px]">{c.title}</h3>
              <ul className="mt-5 flex flex-col gap-4 text-[15px] leading-[24px] text-white/85 md:mt-6 md:gap-5 md:text-[16px] md:leading-[26px]">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="inline-block transition-transform hover:translate-x-1 hover:text-white">{l}</a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <hr data-anim="draw" className="mt-14 border-white/12 md:mt-[95px]" />

        <div className="mt-10 flex flex-col gap-8 md:mt-[83px] lg:flex-row lg:items-start lg:justify-between">
          <div data-anim="fade-up">
            <div className="flex items-center gap-4 md:gap-[18px]">
              <span className="flex size-14 shrink-0 items-center justify-center rounded-[14px] bg-[linear-gradient(135deg,#f07ac4,#c94fa6)] md:size-[67px]">
                <LogoMark height={34} white />
              </span>
              <p className="max-w-[338px] font-display text-[20px] leading-[1.35] font-bold md:text-[24px] md:leading-[34px]">
                200,000 users registered since January 2026
              </p>
            </div>
            <p className="mt-5 max-w-[335px] text-[15px] leading-[24px] text-white/55 md:mt-6 md:text-[16px] md:leading-[26px]">
              We’ve created the product that will help your startup to look even better
            </p>
          </div>

          <form
            data-anim="fade-up"
            data-delay="0.1"
            className="flex h-[60px] w-full max-w-[375px] items-center rounded-full border border-white/70 bg-white p-[5px] pl-[18px]"
            onSubmit={(e) => {
              e.preventDefault();
              if (email) setSent(true);
            }}
          >
            <label className="sr-only" htmlFor="footer-email">Your email</label>
            <input
              id="footer-email"
              type="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setSent(false);
              }}
              placeholder={sent ? 'Thanks — you’re subscribed!' : 'Your email'}
              className="min-w-0 flex-1 bg-transparent text-[16px] text-black outline-none placeholder:text-[#9a9a9a]"
            />
            <button type="submit" className="btn-roll flex h-[50px] w-[112px] shrink-0 items-center justify-center rounded-full bg-pink text-[16px] font-semibold text-white hover:brightness-95 sm:w-[124px]">
              <RollText>Subscribe</RollText>
            </button>
          </form>
        </div>

        <TagPlayground />
      </BandInner>
    </Band>
  );
}
