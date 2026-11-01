import type { ReactNode } from 'react';

/** Content column: 1496px max (fits a 1920 screen with the design's 212px side space), 20px gutters below that. */
export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1536px] px-5 ${className}`}>{children}</div>;
}

export function Divider() {
  return (
    <Container>
      <hr data-anim="draw" className="border-divider" />
    </Container>
  );
}

/**
 * Full-width colour card. Keeps a 20px gap to the viewport on every side up to 1920px
 * (so it caps at 1880px wide), with the inner content held to the same 1496px column.
 */
export function Band({
  children,
  className = '',
  as: Tag = 'section',
  id,
  animate = true,
  style,
  outer = '',
}: {
  children: ReactNode;
  className?: string;
  as?: 'section' | 'footer' | 'div';
  id?: string;
  animate?: boolean;
  style?: React.CSSProperties;
  outer?: string;
}) {
  return (
    <Tag id={id} className={`px-5 ${outer}`}>
      <div
        data-anim={animate ? 'card' : undefined}
        className={`relative mx-auto max-w-[1880px] overflow-hidden rounded-[20px] ${className}`}
        style={style}
      >
        {children}
      </div>
    </Tag>
  );
}

/** Inner content column for use inside a Band. */
export function BandInner({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`relative mx-auto w-full max-w-[1536px] px-5 ${className}`}>{children}</div>;
}
