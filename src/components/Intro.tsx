const users = ['/assets/intro/user1.png', '/assets/intro/user2.png', '/assets/intro/user3.png'];

export function Intro() {
  return (
    <section className="px-5 py-16 md:py-24 xl:pt-[138px] xl:pb-[144px]">
      <div className="mx-auto flex max-w-[1390px] flex-col gap-10 md:flex-row md:flex-wrap md:items-center md:gap-x-[60px] md:gap-y-12 xl:flex-nowrap 2xl:gap-x-[100px]">
        <div data-anim="fade-up" className="flex w-[136px] shrink-0 flex-col gap-[21px]">
          <p data-count className="font-display text-[56px] leading-[1.1] font-bold text-title md:text-[72px] md:leading-[80px]">1M+</p>
          <div className="flex flex-col gap-3">
            <div className="flex">
              {users.map((src) => (
                <img
                  key={src}
                  src={src}
                  alt=""
                  className="-mr-4 size-10 rounded-full border-3 border-white object-cover shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]"
                />
              ))}
              <span className="flex size-10 items-center justify-center rounded-full bg-royal pb-[1px] font-inter text-[29.333px] leading-none font-extralight text-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
                +
              </span>
            </div>
            <p className="w-[131px] font-display text-[14px] leading-[1.2] text-near-black opacity-70">
              Join 1M+ successful users worldwide
            </p>
          </div>
        </div>

        <h2
          data-anim="fade-up"
          data-delay="0.1"
          className="flex max-w-[637px] min-w-0 flex-1 flex-col gap-[7px] font-display text-[28px] leading-[1.08] font-bold text-title sm:text-[37px] xl:text-[46px] xl:leading-[1.02]"
        >
          <span>One smart platform</span>
          {/* each icon is paired with its word so they always wrap together */}
          <span className="flex flex-wrap items-end gap-x-[14px] gap-y-2 sm:gap-x-[22px] xl:gap-x-[30px]">
            <span className="inline-flex items-end gap-[9px] whitespace-nowrap sm:gap-[12px] xl:gap-[14px]">
              <img src="/assets/intro/icon-buy.svg" alt="" width={52} height={52} className="size-[28px] shrink-0 sm:size-[37px] xl:size-[46px]" />
              to buy,
            </span>
            <span className="inline-flex items-end gap-[9px] whitespace-nowrap sm:gap-[12px] xl:gap-[14px]">
              <img src="/assets/intro/icon-track.svg" alt="" width={52} height={52} className="size-[28px] shrink-0 sm:size-[37px] xl:size-[46px]" />
              track, and
            </span>
          </span>
          <span>renew every SaaS tool your business depends on</span>
        </h2>

        <div data-anim="reveal" className="w-full overflow-hidden rounded-[20px] xl:w-[417px] xl:shrink-0">
          <img
            src="/assets/intro/team-photo.png"
            alt="A team working together on laptops"
            className="aspect-[417/209] w-full object-cover md:aspect-[16/7] xl:aspect-[417/209]"
          />
        </div>
      </div>
    </section>
  );
}
