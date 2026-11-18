# Santino Spelzini — Portfolio

One-page bilingual (EN/ES) portfolio. Vite + React + TypeScript + Tailwind CSS 3 + Framer Motion.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build to dist/
npm run preview    # serve dist/ on http://localhost:4173
npm run images     # regenerate public/og-image.png + apple-touch-icon.png
```

## Edit content

All copy (both languages), links and project data live in `src/data/content.ts`.
`es` must keep the same shape as `en` (TypeScript enforces it).

- CVs: `public/CV_Santino_Spelzini_EN.pdf` and `public/CV_Santino_Spelzini_ES.pdf` (phone removed on purpose).
- A project whose repo isn't public yet uses `code: 'TODO'` — the card shows "Repository coming soon" instead of links.
- Design tokens (colors, fonts, radii): `tailwind.config.js`.

## Deploy

### GitHub Pages (workflow included)

1. Create the repo `sxntnx/portfolio` (or `sxntnx/sxntnx.github.io`) and push to `main`.
2. Repo → Settings → Pages → Source: **GitHub Actions**.
3. `.github/workflows/deploy.yml` builds and deploys on every push. It sets the base path and
   `VITE_SITE_URL` automatically from the repo name.

### Vercel

Import the repo in Vercel — the Vite preset works as is (build `npm run build`, output `dist`).
Set the environment variable `VITE_SITE_URL` to the Vercel URL (no trailing slash) so canonical/OG tags point to it.
