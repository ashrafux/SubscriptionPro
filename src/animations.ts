import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

/**
 * Declarative scroll animations. Components opt in with data attributes:
 *
 *  data-anim="fade-up | fade-in | scale-in | slide-left | slide-right | reveal"
 *  data-anim="stagger"        children with [data-anim-item] (or direct children) enter one by one
 *  data-anim="card"           full-width colour cards widen from a narrower clip as they scroll in (scrubbed)
 *  data-split                 heading words rise out of a mask
 *  data-count                 number inside the text counts up ("$2M+", "40%", "1M+")
 *  data-speed="0.1"           parallax drift while scrolling (scrubbed)
 *  data-float                 idle drift: bob + sway + tilt (hero logos)
 *  data-delay="0.2"           extra delay for any of the above
 *
 * Scroll animations replay every time an element re-enters the viewport, in either direction.
 * Everything sits inside a reduced-motion media query, so users who opt out get a static page.
 */
export function initAnimations(root: HTMLElement) {
  const mm = gsap.matchMedia();

  mm.add('(prefers-reduced-motion: no-preference)', (context) => {
    let cancelled = false;
    const q = <T extends Element = HTMLElement>(sel: string) => gsap.utils.toArray<T>(root.querySelectorAll(sel));
    const delay = (el: Element) => Number((el as HTMLElement).dataset.delay ?? 0);
    // Replays every time: plays entering from either direction, reverses out when the element leaves the viewport.
    // Inside a pinned section the element never scrolls away while the pin holds, so it only reverses when
    // the reader scrolls back above it; everywhere else it reverses out and replays from either direction.
    const trigger = (el: Element, start = 'top 85%'): ScrollTrigger.Vars =>
      el.closest('[data-pin]')
        ? { trigger: el, start, toggleActions: 'play none none reverse' }
        : { trigger: el, start, end: 'bottom 8%', toggleActions: 'play reverse play reverse' };
    // Once an entrance finishes, drop GSAP's inline transform so CSS :hover lifts/tilts work again.
    const releaseTransform = (targets: gsap.TweenTarget) => () => {
      gsap.set(targets, { clearProps: 'transform' });
    };

    // Hero intro (runs once on load). Start states are set synchronously, before first paint, so nothing flashes;
    // the timeline plays once the web fonts are in, so the headline splits on its final line breaks.
    const hero = root.querySelector<HTMLElement>('[data-hero]');
    if (hero) {
      const card = hero.querySelector('[data-hero-card]');
      const bg = hero.querySelector('[data-hero-card] > [aria-hidden] img');
      const h1 = hero.querySelector('h1');
      const sub = hero.querySelector('h1 + p');
      const buttons = hero.querySelector('[data-hero-item]:not(h1):not(p)');
      const floats = gsap.utils.toArray<HTMLElement>(hero.querySelectorAll('[data-float]')).map((f) => f.parentElement!);
      const shot = hero.querySelector('[data-hero-shot]');

      gsap.set([h1, sub], { autoAlpha: 0 });
      gsap.set(buttons, { autoAlpha: 0, y: 28 });
      gsap.set(floats, { autoAlpha: 0, y: 46, filter: 'blur(10px)' });
      gsap.set(shot, { autoAlpha: 0, y: 160, rotationX: 24, scale: 0.94, transformPerspective: 1800, transformOrigin: '50% 0%' });
      // Card opens from a smaller rounded window. Edges are driven from one progress value: browsers shorten
      // inset() strings when left == right, which would make a direct clipPath tween interpolate lopsided.
      const reveal = { p: 0 };
      const paintClip = () => {
        const k = 1 - reveal.p;
        gsap.set(card, { clipPath: `inset(${6 * k}% ${7 * k}% ${12 * k}% ${7 * k}% round ${20 + 24 * k}px)` });
      };
      paintClip();
      gsap.set(bg, { scale: 1.14 });
      gsap.set('[data-header-item]', { autoAlpha: 0, y: -22 });

      let split: SplitText[] = [];
      // context.add: anything created later still belongs to this matchMedia context and is reverted with it
      const play = context.add('heroIntro', () => {
        if (cancelled) return;
        const words = SplitText.create(h1!, { type: 'words', mask: 'words' });
        const subWords = SplitText.create(sub!, { type: 'words' });
        split = [words, subWords];
        gsap.set([h1, sub], { autoAlpha: 1 });

        gsap
          .timeline({ defaults: { ease: 'power3.out' } })
          .to(reveal, { p: 1, duration: 1.5, ease: 'expo.inOut', onUpdate: paintClip }, 0)
          .to(bg, { scale: 1, duration: 2.2, ease: 'power2.out' }, 0)
          .to('[data-header-item]', { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.09 }, 0.1)
          .from(words.words, { yPercent: 115, rotate: 4, filter: 'blur(6px)', duration: 1.05, stagger: 0.055, ease: 'power4.out' }, 0.3)
          .from(subWords.words, { autoAlpha: 0, y: 14, filter: 'blur(6px)', duration: 0.7, stagger: 0.014 }, 0.8)
          .to(buttons, { autoAlpha: 1, y: 0, duration: 0.9, ease: 'back.out(1.7)' }, 1.05)
          .to(floats, { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 1.2, stagger: { each: 0.08, from: 'random' }, ease: 'power2.out' }, 1.1)
          .to(shot, { autoAlpha: 1, y: 0, rotationX: 0, scale: 1, duration: 1.6, ease: 'expo.out' }, 1.0)
          .add(() => {
            // put the plain text back so layout/resizes behave like normal text afterwards
            split.forEach((sp) => sp.revert());
            gsap.set([card, bg, floats, shot], { clearProps: 'clipPath,filter,transform' });
          });
      });
      const fontsReady = document.fonts?.ready ?? Promise.resolve();
      // never hold the intro back more than 1.2s for slow fonts
      Promise.race([fontsReady, new Promise((r) => setTimeout(r, 1200))]).then(() => play());
    }

    // Idle float for the hero logo badges: three independent sine loops (bob, sway, tilt) with
    // different periods per badge, so the motion never lines up into a visible pattern.
    q('[data-float]').forEach((el, i) => {
      const dir = i % 2 ? -1 : 1;
      const loop = { ease: 'sine.inOut', yoyo: true, repeat: -1 } as const;
      gsap.to(el, { y: 16 * dir, duration: 2.4 + (i % 3) * 0.45, delay: i * 0.18, ...loop });
      gsap.to(el, { x: 7 * -dir, duration: 3.3 + (i % 4) * 0.4, delay: i * 0.27, ...loop });
      gsap.to(el, { rotate: 7 * dir, duration: 2.9 + (i % 2) * 0.6, delay: i * 0.12, ...loop });
    });

    // Headings: words rise from a mask
    q('[data-split]').forEach((el) => {
      SplitText.create(el, {
        type: 'words',
        mask: 'words',
        autoSplit: true,
        onSplit: (self) =>
          gsap.from(self.words, {
            yPercent: 110,
            duration: 0.9,
            ease: 'power4.out',
            stagger: 0.05,
            delay: delay(el),
            scrollTrigger: trigger(el, 'top 88%'),
          }),
      });
    });

    const presets: Record<string, gsap.TweenVars> = {
      'fade-up': { y: 48, autoAlpha: 0 },
      'fade-in': { autoAlpha: 0 },
      'scale-in': { scale: 0.9, autoAlpha: 0 },
      'slide-left': { x: -60, autoAlpha: 0 },
      'slide-right': { x: 60, autoAlpha: 0 },
      reveal: { clipPath: 'inset(14% 14% 14% 14% round 20px)', scale: 1.06 },
    };

    q('[data-anim]').forEach((el) => {
      const kind = el.dataset.anim!;
      if (kind === 'stagger') {
        const found = el.querySelectorAll('[data-anim-item]');
        const items = found.length ? found : el.children;
        gsap.from(items, {
          y: 40,
          autoAlpha: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: Number(el.dataset.stagger ?? 0.08),
          delay: delay(el),
          scrollTrigger: trigger(el),
          onComplete: releaseTransform(items),
        });
      } else if (kind === 'card') {
        // Starts noticeably narrower (6% in from each side) and widens to full width as it scrolls in.
        // Clipping the sides instead of scaling keeps the content inside crisp and undistorted.
        gsap.fromTo(
          el,
          { clipPath: 'inset(0% 6% 0% 6% round 48px)', scale: 0.98 },
          {
            clipPath: 'inset(0% 0% 0% 0% round 20px)',
            scale: 1,
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top bottom', end: 'top 40%', scrub: 0.6 },
          },
        );
      } else if (kind === 'draw') {
        gsap.from(el, { scaleX: 0, transformOrigin: 'left center', duration: 1.2, ease: 'power2.inOut', scrollTrigger: trigger(el, 'top 95%') });
      } else if (presets[kind]) {
        gsap.from(el, {
          ...presets[kind],
          duration: kind === 'reveal' ? 1.4 : 0.9,
          ease: kind === 'reveal' ? 'expo.out' : 'power3.out',
          delay: delay(el),
          scrollTrigger: trigger(el),
        });
      }
    });

    // Count-up numbers, keeping prefix/suffix ("$2M+", "40%")
    q('[data-count]').forEach((el) => {
      // Keep the real value on the element: a re-init (React StrictMode, HMR) must not read back a mid-count "0".
      const text = (el.dataset.countTo ??= el.textContent ?? '');
      const m = text.match(/^(\D*)([\d.,]+)(.*)$/);
      if (!m) return;
      const [, pre, num, post] = m;
      const target = parseFloat(num.replace(/,/g, ''));
      const obj = { v: 0 };
      const render = () => {
        el.textContent = `${pre}${Math.round(obj.v).toLocaleString('en-US')}${post}`;
      };
      const count = gsap.to(obj, { v: target, duration: 1.6, ease: 'power2.out', paused: true, onUpdate: render });
      // Count up again every time the number scrolls into view; rest at 0 while it's off-screen.
      const reset = () => {
        count.pause(0);
      };
      ScrollTrigger.create({
        trigger: el,
        start: 'top 90%',
        end: 'bottom 8%',
        onEnter: () => count.restart(),
        onEnterBack: () => count.restart(),
        onLeave: reset,
        onLeaveBack: reset,
      });
    });

    // Parallax drift
    q('[data-speed]').forEach((el) => {
      const speed = Number(el.dataset.speed);
      gsap.to(el, {
        yPercent: -100 * speed,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
      });
    });
    return () => {
      cancelled = true;
    };
  });

  // Late-loading images/fonts change the page height; re-measure once they settle.
  const refresh = () => ScrollTrigger.refresh();
  window.addEventListener('load', refresh);
  document.fonts?.ready.then(refresh);

  return () => {
    window.removeEventListener('load', refresh);
    mm.revert();
  };
}
