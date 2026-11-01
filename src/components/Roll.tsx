import type { ReactNode } from 'react';

/** Label that rolls up on hover of the nearest `.btn-roll` (see index.css). */
export function RollText({ children }: { children: ReactNode }) {
  return (
    <span className="roll">
      <span>{children}</span>
      <span aria-hidden>{children}</span>
    </span>
  );
}

/** Icon that rolls up just after the label. `size` is the icon box in px. */
export function RollIcon({ children, size }: { children: ReactNode; size: number }) {
  return (
    <span className="roll-ico" style={{ width: size, height: size }} aria-hidden>
      <i>{children}</i>
      <i>{children}</i>
    </span>
  );
}
