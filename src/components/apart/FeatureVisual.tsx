import type { Feature } from './features';
import { ScaledScreen } from './Shell';

/** Blurred mesh-gradient card with the feature's SubscriptionPro screen floating on it. */
export function FeatureVisual({ feature }: { feature: Feature }) {
  const { base, a, b, c } = feature.gradient;
  const { View } = feature;
  return (
    <div
      className="relative size-full overflow-hidden rounded-[20px]"
      style={{
        backgroundColor: base,
        backgroundImage: `radial-gradient(55% 75% at 12% 18%, ${a} 0%, transparent 62%),
          radial-gradient(50% 70% at 88% 22%, ${b} 0%, transparent 60%),
          radial-gradient(65% 80% at 60% 105%, ${c} 0%, transparent 62%),
          radial-gradient(40% 50% at 95% 95%, ${a} 0%, transparent 70%)`,
      }}
    >
      {/* soft grain so the gradient doesn't band */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.12] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />
      <div className="apart-win absolute top-[9%] left-[8.5%] w-[83%]">
        <ScaledScreen>
          <View />
        </ScaledScreen>
      </div>
    </div>
  );
}
