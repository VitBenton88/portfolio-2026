# Portfolio 2026

Personal portfolio site built with Vite, React, TypeScript, and Mantine.

## Local development

npm install
npm run dev

## Build

npm run build
npm run preview

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site
and publishes `dist/` to the `gh-pages` branch. In the GitHub repo settings under
Pages, set the source to the `gh-pages` branch (root).

The site is served from the custom domain `vitbenton.com` via the `public/CNAME`
file (copied into `dist/` on every build). DNS must point at GitHub Pages — see
below — and "Enforce HTTPS" should be enabled in the repo's Pages settings once
the certificate is issued.

Live URL: https://vitbenton.com/

### DNS setup (one-time, at your domain registrar)

Apex domain (`vitbenton.com`) — add four `A` records:

| Type | Host | Value |
| --- | --- | --- |
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |

Optional `www` redirect — add a `CNAME` record:

| Type | Host | Value |
| --- | --- | --- |
| CNAME | www | vitbenton88.github.io |

DNS changes can take up to 24 hours to propagate. Once they do, GitHub will
issue an HTTPS certificate automatically.
