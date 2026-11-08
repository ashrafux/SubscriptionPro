import type { ReactNode } from 'react';
import { RollIcon, RollText } from './Roll';

type Variant = 'dark' | 'light' | 'pink' | 'secondary';

const variants: Record<Variant, string> = {
  dark: 'bg-black text-white hover:bg-neutral-800',
  pink: 'bg-pink text-white hover:brightness-95',
  // outlined secondary for white sections (the white `light` pill disappears on white)
  secondary: 'group/btn border-2 border-black text-black transition-colors hover:bg-black hover:text-white',
  light:
    'bg-white text-black border border-[#fafafa] py-[15px] sm:py-[19px] drop-shadow-[0px_4px_5px_rgba(20,20,43,0.05)] hover:bg-neutral-50',
};

/** Figma "Frame 1171276228" pill: Roboto Bold 20 / 1.35, 46×20 padding, 67px tall. */
export function PillButton({
  children,
  href = '#',
  variant = 'dark',
  arrow = false,
  className = '',
}: {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  arrow?: boolean;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`btn-roll inline-flex items-center gap-[12px] rounded-full text-[17px] sm:gap-[15px] sm:text-[18px] leading-[1.35] font-bold tracking-[0.5909px] whitespace-nowrap md:text-[20px] ${
        arrow ? 'px-7 sm:px-[46px]' : 'px-8 sm:px-[56px]'
      } ${variant === 'light' ? '' : variant === 'secondary' ? 'py-[14px] sm:py-[18px]' : 'py-4 sm:py-5'} ${variants[variant]} ${className}`}
    >
      <RollText>{children}</RollText>
      {arrow && (
        <RollIcon size={24}>
          <img src="/assets/hero/arrow-up-right.svg" alt="" width={24} height={24} className={variant === 'light' ? 'invert' : variant === 'secondary' ? 'invert transition-[filter] group-hover/btn:invert-0' : ''} />
        </RollIcon>
      )}
    </a>
  );
}
