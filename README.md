# SubscriptionPro — marketing site

Home page for SubscriptionPro, built from the Figma design with Vite, React, TypeScript, Tailwind CSS v4 and GSAP.

## Run locally

```bash
npm install
npm run dev      # http://127.0.0.1:4370
npm run build    # production build in dist/
```

## Pages

- `/` — home page
- `/variations.html` — header/menu design variations
- `/stats-options.html` — stat card illustration options

## Notes

- Section components live in `src/components/`; scroll animations are declared with `data-anim` / `data-split` / `data-count` attributes and run from `src/animations.ts`.
- Dashboard screens inside the page are drawn in HTML (`src/components/apart`, `glance`, `trusted`) so they stay sharp at any size.
- Background and 3D illustrations in `public/assets/glance`, `trusted` and `stats` were generated with Higgsfield.
- Deployed on Vercel (`vercel.json`): every push to `main` rebuilds the site.
