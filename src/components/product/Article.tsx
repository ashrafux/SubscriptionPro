import type { ReactNode } from 'react';

const A = '/assets/product';

const compare = Array.from({ length: 9 }, () => ['Pricing Flexibility', 'Standard Pricing', 'Custom Business Pricing']);

const features = [
  ['HD Video Meetings', 'Host secure high-quality virtual meetings with reliable audio and video performance across devices and locations.'],
  ['Team Collaboration Tools', 'Collaborate through chat, screen sharing, file sharing, whiteboards, and real-time communication features.'],
  ['Webinar & Event Hosting', 'Run webinars, online events, training sessions, and virtual conferences with scalable participant support.'],
  ['Cross-Platform Accessibility', 'Access Zoom across desktops, laptops, tablets, mobile devices, and browser-based environments.'],
  ['Enterprise-Grade Security', 'Protect meetings and communication channels with encryption, access controls, waiting rooms, and admin-level security settings.'],
];

// The design repeats "Remote Teams" in the last two rows.
const audience = ['Remote Teams', 'Agencies', 'Startups', 'Education Platforms', 'Enterprises', 'Remote Teams', 'Remote Teams'];

function Block({ title, children, first = false }: { title: string; children: ReactNode; first?: boolean }) {
  return (
    <section data-anim="fade-up" className={first ? '' : 'mt-16 md:mt-[100px]'}>
      <h2 className="text-[28px] leading-[1.2] font-bold text-black md:text-[36px]">{title}</h2>
      {children}
    </section>
  );
}

const P = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <p className={`text-[16px] leading-[1.5] text-body md:text-[18px] ${className}`}>{children}</p>
);

/** Article photo slot (Figma 6812:1819 / 6812:1820, 732×414); shows a labelled placeholder when `src` is missing. */
function Photo({ src, alt, note }: { src?: string; alt: string; note: string }) {
  return (
    <div className={`relative mt-10 aspect-[732/414] w-full max-w-[732px] overflow-hidden rounded-[20px] ${src ? '' : 'bg-[linear-gradient(135deg,#e5ecfb,#f4e6f0)]'}`}>
      {src ? (
        <img src={src} alt={alt} className="absolute inset-0 size-full object-cover" />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center text-[14px] text-muted">
          <svg viewBox="0 0 24 24" className="size-8 opacity-60" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <circle cx="9" cy="10" r="1.6" />
            <path d="M21 16l-5-5-8 8" />
          </svg>
          <span>{alt}</span>
          <span className="text-[12px] opacity-70">{note}</span>
        </div>
      )}
    </div>
  );
}

/** Long-form product copy (Overview → Who Uses), held to the design's 738px reading column. */
export function Article() {
  return (
    <div className="mx-auto max-w-[778px] px-5 pt-20 md:pt-[142px]">
      <Block title="Overview" first>
        <P className="mt-5">
          Zoom is a cloud-based video communication and collaboration platform designed for businesses that need reliable virtual meetings, webinars, team
          collaboration, and remote communication tools. It helps startups, enterprises, educational institutions, agencies, and distributed teams
          communicate and collaborate more efficiently.
        </P>
        <Photo src={`${A}/overview.webp`} alt="Laptop showing the Zoom logo" note="Figma image 6812:1819" />
      </Block>

      <Block title="Why Buy from SubscriptionPro">
        <P className="mt-5">
          Get Zoom subscriptions at competitive business pricing through SubscriptionPro and enjoy recurring discounts throughout your subscription cycle.
          Manage renewals more easily, simplify billing from a centralized dashboard, and keep your business communication tools organized under one
          procurement workflow.
        </P>
        <P className="mt-[27px]">Take a quick look at the plus points of buying directly vs buying from SubscriptionPro.</P>

        <div className="mt-[42px] overflow-x-auto [scrollbar-width:thin]">
          <table className="w-full min-w-[560px] border-separate border-spacing-y-[5px] text-left text-black">
            <thead>
              <tr className="text-[16px] font-semibold md:text-[18px]">
                {['Features', 'Direct Vendor', 'SubscriptionPro'].map((h, i) => (
                  <th
                    key={h}
                    scope="col"
                    className={`h-[66px] bg-[#f7cee6] font-semibold ${i === 0 ? 'w-[33%] rounded-l-[8px] pl-[30px]' : i === 1 ? 'w-[32%]' : 'rounded-r-[8px] pr-5'}`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-[14px] md:text-[16px]">
              {compare.map((row, r) => (
                <tr key={r} className="transition-colors [&>td]:bg-[#f2f3f5] hover:[&>td]:bg-[#eaebee]">
                  {row.map((c, i) => (
                    <td key={i} className={`h-[66px] ${i === 0 ? 'rounded-l-[8px] pl-[30px]' : i === 2 ? 'rounded-r-[8px] pr-5' : ''}`}>
                      {c}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Block>

      <Block title="Core Zoom Features">
        <P className="mt-5">Let’s take a look at the core features of Zoom that can help businesses improve communication and collaboration workflows.</P>
        <Photo src={`${A}/core-features.webp`} alt="Team video call on a laptop" note="Figma image 6812:1820" />
        <dl className="mt-10 flex flex-col gap-[30px]">
          {features.map(([t, d]) => (
            <div key={t}>
              <dt className="text-[18px] leading-[1.35] font-medium text-black md:text-[20px]">{t}</dt>
              <dd className="mt-[2px] text-[16px] leading-[1.5] text-body md:text-[18px]">{d}</dd>
            </div>
          ))}
        </dl>
      </Block>

      <Block title="Who Uses Zoom?">
        <P className="mt-5">
          Whether you’re managing remote teams or hosting enterprise-level virtual collaboration, Zoom helps businesses maintain reliable and scalable
          communication workflows.
        </P>
        <ul className="mt-8 flex flex-col gap-[14px]">
          {audience.map((a, i) => (
            <li key={i} className="flex items-center gap-[24px] text-[16px] leading-[1.5] text-body md:text-[18px]">
              <img src={`${A}/check-circle.svg`} alt="" width={20} height={20} className="shrink-0" />
              {a}
            </li>
          ))}
        </ul>
      </Block>
    </div>
  );
}
