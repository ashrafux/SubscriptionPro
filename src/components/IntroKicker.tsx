const users = ['/assets/intro/user1.png', '/assets/intro/user2.png', '/assets/intro/user3.png'];

/** Home Two's quiet take on the 1M+ strip: one two-line sentence on the left, faces with "Joined by 1M+ users" left-aligned under them on the right. */
export function IntroKicker() {
  return (
    <section className="px-5 py-12 md:py-16 xl:pt-[88px] xl:pb-[96px]">
      <div className="mx-auto flex max-w-[1496px] flex-col gap-7 md:flex-row md:items-center md:justify-between md:gap-10 lg:px-[60px] min-[1600px]:!px-0">
        <p data-anim="fade-up" className="text-[18px] leading-[1.55] text-[#5d6b75] md:text-[20px]">
          <span className="font-semibold text-title">One smart platform</span> to buy, track, <br className="hidden md:block" />
          and renew every SaaS tool your business depends on.
        </p>
        <div data-anim="fade-up" data-delay="0.1" className="flex shrink-0 flex-col items-start gap-3">
          <span className="flex">
            {users.map((src) => (
              <img key={src} src={src} alt="" className="-mr-3 size-11 rounded-full border-[3px] border-white object-cover shadow-[0_1px_3px_rgba(0,0,0,0.08)]" />
            ))}
          </span>
          <span className="text-[15px] text-muted">
            Joined by <b data-count className="font-semibold text-title">1M+</b> users
          </span>
        </div>
      </div>
    </section>
  );
}
