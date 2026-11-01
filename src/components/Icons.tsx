type P = { className?: string };

export const CheckCircle = ({ className = 'size-5' }: P) => (
  <svg viewBox="0 0 20 20" className={className} aria-hidden>
    <circle cx="10" cy="10" r="10" fill="currentColor" />
    <path d="M6 10.2l2.6 2.6L14 7.4" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Chevron = ({ className = 'size-4' }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M6 9l6 6 6-6" />
  </svg>
);

export const Trash = ({ className = 'size-5' }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v6M14 11v6" />
  </svg>
);

export const Plus = ({ className = 'size-5' }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const MoneyStack = ({ className = 'size-[61px]' }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden>
    <rect x="3" y="4" width="18" height="10" rx="1.5" />
    <circle cx="12" cy="9" r="2" />
    <path d="M6.5 9h.01M17.5 9h.01M3 17.5h18M3 20.5h18" />
  </svg>
);

export const Analytics = ({ className = 'size-[61px]' }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden>
    <path d="M5 20v-6M9.5 20V9M14 20V4M18.5 20v-9" />
  </svg>
);

export const Coffee = ({ className = 'size-[61px]' }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M4 10h13v5a5 5 0 01-5 5H9a5 5 0 01-5-5v-5zM17 11h1.5a2.5 2.5 0 010 5H17M8 3v3M11.5 3v3M15 3v3" />
  </svg>
);
