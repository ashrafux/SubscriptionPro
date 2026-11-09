import { useEffect, useState } from 'react';

/** Home Two: floating arrow in the bottom-right corner (chat-bubble style) that appears once the page is scrolled and returns to the top. Tablet and up only. */
export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const on = () => setShow(window.scrollY > 600);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  const toTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="Back to top"
      tabIndex={show ? 0 : -1}
      className={`group fixed right-7 bottom-7 z-50 hidden size-11 items-center justify-center rounded-full bg-pink text-white shadow-[0_10px_22px_-8px_rgba(225,90,171,0.65)] ring-2 ring-white transition-[opacity,transform,visibility] duration-300 ease-out hover:-translate-y-1 md:flex ${
        show ? 'visible translate-y-0 scale-100 opacity-100' : 'invisible translate-y-4 scale-75 opacity-0'
      }`}
    >
      <svg viewBox="0 0 24 24" className="size-[18px] transition-transform duration-300 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M12 19V5M6 11l6-6 6 6" />
      </svg>
    </button>
  );
}
