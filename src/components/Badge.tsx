/** Small tilted label pill used next to section headings ("Why choose", "Testimonials", "Best price"). */
export function TiltBadge({ children, className = '', angle = -6 }: { children: string; className?: string; angle?: number }) {
  return (
    <span
      className={`inline-block rounded-full px-[18px] py-[6px] text-[14px] leading-[1.4] font-semibold whitespace-nowrap text-white ${className}`}
      style={{ transform: `rotate(${angle}deg)` }}
    >
      {children}
    </span>
  );
}
