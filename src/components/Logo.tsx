/** SubscriptionPro wordmark (Figma node 6697:4696), rebuilt from its 18 vector layers. */
const parts = [
  '25.85% 85.55% 0 0',
  '0 85% 46.98% 2.3%',
  '9.34% 85.25% 76.96% 12.26%',
  '31.15% 75.93% 22.48% 17.94%',
  '43.35% 69.79% 22.5% 25.15%',
  '29.29% 63.07% 22.45% 31.58%',
  '42.72% 57.15% 22.45% 37.81%',
  '42.72% 50.95% 22.5% 43.78%',
  '42.82% 46.72% 23.12% 50.08%',
  '30.5% 44.31% 23.12% 54.14%',
  '42.7% 37.57% 10.23% 57.07%',
  '35.21% 33.58% 22.5% 62.94%',
  '30.5% 31.03% 23.17% 67.43%',
  '42.68% 24.22% 22.55% 70.12%',
  '42.73% 18.04% 23.12% 76.92%',
  '31.76% 10.37% 23.12% 83.49%',
  '42.82% 6.06% 23.12% 90.73%',
  '42.68% 0 22.55% 94.33%',
];

/** `onDark`: the "Subscription" letters (layers 3–14) turn white; the mark and pink "Pro" stay as they are. */
export function Logo({ className = '', onDark = false }: { className?: string; onDark?: boolean }) {
  return (
    <a href="/" aria-label="SubscriptionPro home" className={`relative block aspect-[246/45] w-[246px] ${className}`}>
      {parts.map((inset, i) => (
        <span key={i} className={`absolute ${onDark && i >= 3 && i <= 14 ? 'brightness-0 invert' : ''}`} style={{ inset }}>
          <img src={`/assets/logo/v${i}.svg`} alt="" className="absolute inset-0 block size-full max-w-none" />
        </span>
      ))}
    </a>
  );
}

/** Just the "S" mark: the first three wordmark vectors, re-based onto their own 36.9×45 box. */
const markParts = [
  '25.85% 3.67% 0 0',
  '0 0 46.98% 15.33%',
  '9.34% 1.67% 76.96% 81.73%',
];

export function LogoMark({ height = 45, white = false, className = '' }: { height?: number; white?: boolean; className?: string }) {
  return (
    <span
      aria-hidden
      className={`relative block ${white ? 'brightness-0 invert' : ''} ${className}`}
      style={{ height, width: (height * 36.9) / 45 }}
    >
      {markParts.map((inset, i) => (
        <span key={i} className="absolute" style={{ inset }}>
          <img src={`/assets/logo/v${i}.svg`} alt="" className="absolute inset-0 block size-full max-w-none" />
        </span>
      ))}
    </span>
  );
}
