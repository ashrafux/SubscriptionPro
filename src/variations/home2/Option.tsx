import type { ReactNode } from 'react';

/** One labelled variation on the Home Two options page. */
export function Option({ id, code, name, note, children, bg = 'bg-white' }: { id: string; code: string; name: string; note: string; children: ReactNode; bg?: string }) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-black/10">
      <div className="mx-auto flex max-w-[1536px] items-baseline gap-4 px-5 pt-10 pb-6">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-black font-poppins text-[16px] font-semibold text-white">{code}</span>
        <div>
          <h3 className="text-[22px] font-bold">{name}</h3>
          <p className="mt-1 max-w-[760px] text-[15px] leading-[1.5] text-muted">{note}</p>
        </div>
      </div>
      <div className={bg}>{children}</div>
    </section>
  );
}

export const users = ['/assets/intro/user1.png', '/assets/intro/user2.png', '/assets/intro/user3.png'];

export function Faces({ size = 40, ring = 'border-white', plus = true }: { size?: number; ring?: string; plus?: boolean }) {
  return (
    <span className="flex">
      {users.map((src) => (
        <img key={src} src={src} alt="" className={`-mr-3 rounded-full border-[3px] object-cover ${ring}`} style={{ width: size, height: size }} />
      ))}
      {plus && (
        <span className={`flex items-center justify-center rounded-full border-[3px] bg-royal font-inter text-[20px] font-light text-white ${ring}`} style={{ width: size, height: size }}>
          +
        </span>
      )}
    </span>
  );
}
