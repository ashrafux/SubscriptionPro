import { Faces, Option, users } from './Option';

/* "1M+ / One smart platform…" strip — six quieter takes (less weight than the current 46px headline + icons + photo). */

const Buy = () => <img src="/assets/intro/icon-buy.svg" alt="" className="inline-block size-[0.9em] -translate-y-[0.08em] align-middle" />;
const Track = () => <img src="/assets/intro/icon-track.svg" alt="" className="inline-block size-[0.9em] -translate-y-[0.08em] align-middle" />;

/** A — one centred sentence, light weight, the proof as a small pill above it. */
function A() {
  return (
    <div className="px-5 py-20">
      <div className="mx-auto flex max-w-[860px] flex-col items-center text-center">
        <span className="flex items-center gap-3 rounded-full border border-black/10 bg-white py-[6px] pr-4 pl-[6px] shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
          <Faces size={28} plus={false} />
          <span className="ml-2 text-[14px] text-muted">
            <b className="font-semibold text-title">1M+</b> users worldwide
          </span>
        </span>
        <p className="mt-6 text-[30px] leading-[1.35] font-normal text-[#8a949c]">
          One smart platform to <span className="text-title">buy, track and renew</span> every SaaS tool your business depends on.
        </p>
      </div>
    </div>
  );
}

/** B — slim three-part strip with hairline dividers; nothing louder than 22px. */
function B() {
  return (
    <div className="px-5 py-16">
      <div className="mx-auto grid max-w-[1390px] grid-cols-[auto_1fr_auto] items-center divide-x divide-black/10 rounded-[20px] border border-black/10">
        <div className="flex items-center gap-4 px-8 py-7">
          <span className="text-[34px] leading-none font-bold text-title">1M+</span>
          <span className="w-[110px] text-[13px] leading-[1.35] text-muted">successful users worldwide</span>
        </div>
        <p className="px-10 text-[22px] leading-[1.45] text-title">
          One smart platform to buy, track, and renew every SaaS tool your business depends on.
        </p>
        <div className="flex items-center gap-4 px-8 py-5">
          <img src="/assets/intro/team-photo.png" alt="" className="h-[64px] w-[120px] rounded-[12px] object-cover" />
          <Faces size={34} />
        </div>
      </div>
    </div>
  );
}

/** C — editorial: thin grey copy with the key verbs inked in, small caption stats underneath. */
function C() {
  return (
    <div className="px-5 py-20">
      <div className="mx-auto grid max-w-[1390px] grid-cols-[1fr_340px] items-end gap-16">
        <p className="text-[40px] leading-[1.2] font-light tracking-[-0.01em] text-[#a3abb2]">
          One smart platform to <span className="font-medium text-title">buy</span>, <span className="font-medium text-title">track</span>, and{' '}
          <span className="font-medium text-title">renew</span> every SaaS tool your business depends on.
        </p>
        <div className="flex flex-col gap-4 border-l border-black/10 pl-8">
          <Faces size={36} />
          <p className="text-[15px] leading-[1.5] text-muted">
            <b className="text-[20px] font-bold text-title">1M+</b>
            <br />
            successful users worldwide trust SubscriptionPro with their SaaS stack.
          </p>
        </div>
      </div>
    </div>
  );
}

/** D — soft tinted card: compact copy left, photo as a rounded pill on the right. */
function D() {
  return (
    <div className="px-5 py-16">
      <div className="mx-auto flex max-w-[1390px] items-center justify-between gap-10 rounded-[24px] bg-[#f6f6f8] py-8 pr-8 pl-12">
        <div className="flex items-center gap-10">
          <div className="flex flex-col gap-2">
            <span className="text-[44px] leading-none font-bold text-title">1M+</span>
            <span className="text-[13px] text-muted">users worldwide</span>
          </div>
          <span className="h-14 w-px bg-black/10" />
          <p className="max-w-[560px] text-[24px] leading-[1.4] font-medium text-title">
            One smart platform <Buy /> to buy, <Track /> track and renew every SaaS tool your business depends on
          </p>
        </div>
        <div className="relative shrink-0">
          <img src="/assets/intro/team-photo.png" alt="" className="h-[120px] w-[260px] rounded-full object-cover" />
          <span className="absolute -bottom-3 left-6 rounded-full bg-white p-[3px] shadow-sm">
            <Faces size={30} />
          </span>
        </div>
      </div>
    </div>
  );
}

/** E — two-line caption under a thin rule, like a section kicker. Lowest weight of the six. */
function E() {
  return (
    <div className="px-5 py-14">
      <div className="mx-auto max-w-[1390px]">
        <div className="h-px bg-black/10" />
        <div className="flex items-center justify-between gap-10 pt-8">
          <p className="max-w-[720px] text-[20px] leading-[1.55] text-[#5d6b75]">
            <span className="font-semibold text-title">One smart platform</span> to buy, track, and renew every SaaS tool your business depends on.
          </p>
          <div className="flex items-center gap-4">
            <Faces size={32} plus={false} />
            <span className="ml-2 text-[15px] text-muted">
              Joined by <b className="font-semibold text-title">1M+</b> users
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/** F — centred avatar cluster with the stat inside it, short line underneath; photo dropped. */
function F() {
  const ring = [
    { src: users[0], x: -120, y: 8, s: 52 },
    { src: users[1], x: -64, y: -14, s: 60 },
    { src: users[2], x: 64, y: -14, s: 60 },
    { src: users[0], x: 120, y: 8, s: 52 },
  ];
  return (
    <div className="px-5 py-20">
      <div className="mx-auto flex max-w-[760px] flex-col items-center text-center">
        <div className="relative flex h-[90px] w-[320px] items-center justify-center">
          {ring.map((r, i) => (
            <img
              key={i}
              src={r.src}
              alt=""
              className="absolute rounded-full border-4 border-white object-cover shadow-[0_6px_16px_rgba(0,0,0,0.08)]"
              style={{ width: r.s, height: r.s, transform: `translate(${r.x}px, ${r.y}px)` }}
            />
          ))}
          <span className="relative z-10 flex size-[78px] items-center justify-center rounded-full bg-royal text-[22px] font-bold text-white ring-4 ring-white">1M+</span>
        </div>
        <p className="mt-6 text-[24px] leading-[1.4] text-title">One smart platform to buy, track and renew every SaaS tool.</p>
        <p className="mt-2 text-[15px] text-muted">Trusted by over a million users worldwide.</p>
      </div>
    </div>
  );
}

export const introOptions = [
  { code: 'A', name: 'Centred sentence', note: 'Light grey line with the verbs in ink; the 1M+ proof shrinks to a small avatar pill. No icons, no photo.', C: A },
  { code: 'B', name: 'Slim divided strip', note: 'One outlined row in three parts — stat, sentence, small photo + faces. Max 34px, everything sits at the same height.', C: B },
  { code: 'C', name: 'Editorial grey', note: 'Thin 40px grey copy with only buy / track / renew inked. Stat moves into a quiet caption column.', C: C },
  { code: 'D', name: 'Soft tinted card', note: 'Everything inside a pale grey card; smaller copy keeps the two icons; photo becomes a pill on the right.', C: D },
  { code: 'E', name: 'Kicker line', note: 'Just a rule and one 20px line with a faces chip on the right — the lightest option.', C: E },
  { code: 'F', name: 'Avatar cluster', note: 'Centred faces orbit a royal-blue 1M+ badge, with one short line under it. Photo dropped.', C: F },
];

export function IntroOptions() {
  return (
    <>
      {introOptions.map(({ code, name, note, C }) => (
        <Option key={code} id={`intro-${code.toLowerCase()}`} code={code} name={name} note={note}>
          <C />
        </Option>
      ))}
    </>
  );
}
