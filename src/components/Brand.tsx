import type { CSSProperties } from 'react';

/** ChatGPT mark lives in a wider sprite; Figma crops it with these offsets. */
export function ChatGptMark({ size }: { size: number }) {
  return (
    <span className="relative block overflow-hidden rounded-full" style={{ width: size, height: size }}>
      <img
        src="/assets/brands/chatgpt.png"
        alt="ChatGPT"
        className="absolute max-w-none"
        style={{ height: '109.82%', left: '-47.62%', top: '-4.91%', width: '195.24%' }}
      />
    </span>
  );
}

/** Zoom mark = two masked vector layers (Figma node 6697:4668). Drawn at 40.83px, scaled to `size`. */
export function ZoomMark({ size = 40.83 }: { size?: number }) {
  const s = size / 40.83;
  const layer = (src: string, mask: string, style: CSSProperties) => (
    <span
      className="absolute"
      style={{
        ...style,
        maskImage: `url(${mask})`,
        WebkitMaskImage: `url(${mask})`,
        maskRepeat: 'no-repeat',
        WebkitMaskRepeat: 'no-repeat',
      }}
    >
      <img src={src} alt="" className="absolute inset-0 block size-full max-w-none" />
    </span>
  );
  return (
    <span className="relative block" style={{ width: size, height: size }} aria-label="Zoom">
      <span className="absolute top-0 left-0 origin-top-left" style={{ width: 40.83, height: 40.83, transform: `scale(${s})` }}>
        {layer('/assets/hero/zoom-1.svg', '/assets/hero/zoom-mask1.svg', {
          left: 0, top: 0, width: 40.8347, height: 40.8347,
          maskPosition: '1.052px 1.052px', WebkitMaskPosition: '1.052px 1.052px',
          maskSize: '38.73px 38.73px', WebkitMaskSize: '38.73px 38.73px',
        })}
        {layer('/assets/hero/zoom-2.svg', '/assets/hero/zoom-mask2.svg', {
          left: 6.72, top: 12.65, width: 26.9425, height: 15.5761,
          maskPosition: '1.053px 1.048px', WebkitMaskPosition: '1.053px 1.048px',
          maskSize: '24.838px 13.478px', WebkitMaskSize: '24.838px 13.478px',
        })}
      </span>
    </span>
  );
}
