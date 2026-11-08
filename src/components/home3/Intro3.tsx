import { ZoomMark } from '../Brand';

/* Home Three 1M+ strip (review row 7): simple, clean sentence — no bold words, no inline icons — and the team photo
   replaced by a visual that says what the sentence says: a small buy → track → renew card in the portal's style. */

const users = ['/assets/intro/user1.png', '/assets/intro/user2.png', '/assets/intro/user3.png'];

const steps = [
  { tag: 'Buy', tone: 'bg-[#fdeff7] text-[#c2398b]', logo: <img src="/assets/brands/notion.png" alt="" className="size-6 object-contain" />, name: 'Notion Business', note: '5 seats added', value: '$480/yr' },
  { tag: 'Track', tone: 'bg-[#eaf1ff] text-[#2557d6]', logo: <ZoomMark size={24} />, name: 'Zoom Pro', note: 'Renews in 5 days', value: '$144/yr' },
  { tag: 'Renew', tone: 'bg-[#e7f8f1] text-[#0f8a5f]', logo: <img src="/assets/brands/adobe-cc.png" alt="" className="size-6 object-contain" />, name: 'Adobe Creative Cloud', note: 'Auto-renewed, saved $72', value: '$648/yr' },
];

function RenewalCard() {
  return (
    <div className="relative overflow-hidden rounded-[24px] bg-[linear-gradient(135deg,#f3f1ff,#fdf1f8_55%,#fff6e9)] p-5 sm:p-6">
      <div className="rounded-[18px] bg-white p-5 shadow-[0_24px_50px_-28px_rgba(30,40,120,0.35)] ring-1 ring-[#eef0f6]">
        <div className="flex items-center justify-between">
          <p className="text-[14px] font-semibold text-[#14141f]">This month</p>
          <span className="rounded-full bg-[#e7f8f1] px-2.5 py-1 text-[12px] font-semibold text-[#0f8a5f]">Saved $412</span>
        </div>
        <ul data-anim="stagger" data-stagger="0.12" className="mt-4 flex flex-col gap-2.5">
          {steps.map((s) => (
            <li key={s.tag} className="flex items-center gap-3 rounded-[12px] bg-[#f8f9fc] px-3 py-2.5">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-[10px] bg-white shadow-[0_2px_6px_rgba(20,20,60,0.08)]">{s.logo}</span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[13.5px] font-semibold text-[#14141f]">{s.name}</span>
                <span className="block truncate text-[12px] text-[#7b8794]">{s.note}</span>
              </span>
              <span className={`rounded-full px-2.5 py-1 text-[11.5px] font-semibold ${s.tone}`}>{s.tag}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function Intro3() {
  return (
    <section className="px-5 py-14 md:py-20 xl:pt-[110px] xl:pb-[110px]">
      <div className="mx-auto grid max-w-[1390px] items-center gap-10 md:grid-cols-[auto_minmax(0,1fr)] md:gap-x-14 xl:grid-cols-[auto_minmax(0,1fr)_420px] xl:gap-x-[72px]">
        <div data-anim="fade-up" className="flex flex-col gap-4">
          <p data-count className="font-display text-[56px] leading-none font-bold text-title md:text-[68px]">1M+</p>
          <div className="flex items-center gap-3">
            <span className="flex">
              {users.map((src) => (
                <img key={src} src={src} alt="" className="-mr-3 size-10 rounded-full border-[3px] border-white object-cover shadow-[0_1px_3px_rgba(0,0,0,0.08)]" />
              ))}
            </span>
            <span className="ml-3 max-w-[180px] text-[14px] leading-[1.35] text-balance text-muted">users worldwide manage their SaaS with us</span>
          </div>
        </div>

        <p data-anim="fade-up" data-delay="0.1" className="max-w-[640px] font-display text-[26px] leading-[1.3] font-medium text-balance text-title sm:text-[32px] xl:text-[38px]">
          One smart platform to buy, track, and renew every SaaS tool your business depends on.
        </p>

        <div data-anim="reveal" className="md:col-span-2 xl:col-span-1">
          <RenewalCard />
        </div>
      </div>
    </section>
  );
}
