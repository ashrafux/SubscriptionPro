const users = ['/assets/intro/user1.png', '/assets/intro/user2.png', '/assets/intro/user3.png'];

/** Home Two's quiet take on the 1M+ strip: a hairline, one 20px sentence and a small faces chip. */
export function IntroKicker() {
  return (
    <section className="px-5 py-12 md:py-16 xl:pt-[88px] xl:pb-[96px]">
      <div className="mx-auto max-w-[1496px]">
        <hr data-anim="draw" className="border-black/10" />
        <div className="flex flex-col gap-6 pt-8 md:flex-row md:items-center md:justify-between md:gap-10">
          <p data-anim="fade-up" className="max-w-[720px] text-[18px] leading-[1.55] text-[#5d6b75] md:text-[20px]">
            <span className="font-semibold text-title">One smart platform</span> to buy, track, and renew every SaaS tool your business depends on.
          </p>
          <div data-anim="fade-up" data-delay="0.1" className="flex shrink-0 items-center gap-4">
            <span className="flex">
              {users.map((src) => (
                <img key={src} src={src} alt="" className="-mr-3 size-8 rounded-full border-[3px] border-white object-cover" />
              ))}
            </span>
            <span className="ml-2 text-[15px] text-muted">
              Joined by <b data-count className="font-semibold text-title">1M+</b> users
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
