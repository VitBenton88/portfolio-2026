# Professional Portfolio Site — Design

## Purpose

A personal portfolio site for a software engineer, serving two goals: landing a job (recruiters/hiring managers as primary audience) and serving as a general professional presence (linkable from LinkedIn, email signatures, etc.). No dedicated projects showcase — the site focuses on who the person is, their experience, and how to reach them.

## 1. Architecture & Stack

- **Vite + React + TypeScript** — pure client-side SPA, no Next.js, no SSR.
- **Mantine** (`@mantine/core`, `@mantine/hooks`) for components and theming.
- No React Router — the site is a single scrolling page; navigation is smooth-scroll anchor links between sections.
- **GitHub Pages** deployment via a GitHub Actions workflow that builds the Vite app and publishes `dist/` to the `gh-pages` branch. `vite.config.ts` sets `base: '/<repo-name>/'` for correct asset paths under Pages.

## 2. Page Structure

One scrolling page with a persistent top nav (name + section links: About, Resume, Contact) that smooth-scrolls to sections and highlights the active section as the user scrolls. Sections in order:

1. **Hero** — name, title/tagline, bold color-block treatment.
2. **About** — bio text, photo.
3. **Resume** — skills list, work-history timeline, download-PDF button. No education section.
4. **Contact** — LinkedIn and GitHub links only (no email, no contact form).

A simple footer repeats the social links plus a copyright line.

## 3. Components

- `NavBar` — sticky header, name, section links, active-link highlight on scroll, mobile hamburger menu (Mantine `Burger` + `Drawer`).
- `Hero` — full-viewport intro, Indigo color-block background, bold reversed-color type, staggered fade-in on page load, scroll-down cue.
- `About` — photo + bio text (Mantine `Grid`/`Group`).
- `Resume` — `SkillBadges` (Mantine `Badge` list, optionally grouped by category) + `ExperienceTimeline` (Mantine `Timeline` for work history: title, company, dates, bullet points) + a "Download Resume" `Button` linking to a static PDF.
- `Contact` — icon-linked cards/buttons for LinkedIn and GitHub.
- `Footer` — repeated social icons + copyright line.
- `ChapterRail` — signature element: a slim fixed vertical scroll-progress rail. It fills and recolors to match the section currently in view (Indigo → Amber → Teal → Magenta), and clicking a segment jumps to that section. Doubles as scroll progress indicator, section-color legend, and secondary nav.

Each section component takes its content as props/data from a single typed content module (see below), so component logic stays separate from the content itself.

## 4. Content/Data Approach

Real content (bio, work history, skills, links) will be supplied and structured as a typed content file, `src/content.ts`, exporting typed objects/arrays:
- `bio: { text: string; photoUrl: string }`
- `skills: string[]` (or grouped by category)
- `experience: { title: string; company: string; startDate: string; endDate: string | 'Present'; bullets: string[] }[]`
- `socialLinks: { label: 'LinkedIn' | 'GitHub'; url: string }[]`

Components import from this single source, so future content edits don't touch component code. The downloadable resume PDF lives as a static file in `public/` and is linked directly from the Resume section.

## 5. Styling & Theme — "Chaptered by Color"

Concept: since the site has no projects showcase, it's structured as three chapters about the person — About, Resume, Contact — each carrying its own accent color. The `ChapterRail` signature element ties this together by recoloring as the user scrolls, making section order and identity legible at a glance.

**Palette:**
| Name | Hex | Use |
|---|---|---|
| Paper | `#F7F7FA` | Background |
| Ink | `#1A1B23` | Text |
| Hero · Indigo | `#5B3DF5` | Hero full-bleed block |
| About · Amber | `#FFB238` | About chapter accent |
| Resume · Teal | `#12B886` | Resume chapter accent |
| Contact · Magenta | `#F0529C` | Contact chapter accent |

**Typography:**
- Display: **Bricolage Grotesque** — bold headline/name treatment, used sparingly.
- Body: **IBM Plex Sans** — bio text, descriptions, general copy.
- Utility: **IBM Plex Mono** — small labels, dates, skill tags.

**Layout:** Hero is a full-bleed Indigo color block with bold reversed type and a staggered fade-in on load. About/Resume/Contact sit on the Paper background, using their chapter color for headings, badges, icons, and dividers rather than full-bleed blocks, to keep the page from feeling heavy. The `ChapterRail` sits fixed along the viewport edge throughout.

**Motion:** Light and purposeful — the Hero's staggered load-in animation, plus Mantine's built-in `Transition`/hover effects for scroll-based section reveals and button/card hover states. No dedicated animation library (e.g. Framer Motion) for v1.

**Color scheme:** Both light and dark mode supported via Mantine's color-scheme toggle (low cost given Mantine's theming, and expected on modern sites).

## 6. Deployment

- `vite.config.ts`: `base: '/<repo-name>/'`.
- `.github/workflows/deploy.yml`: builds on push to `main`, publishes `dist/` to the `gh-pages` branch.
- Repo's GitHub Pages settings point at the `gh-pages` branch.

## 7. Testing / Verification

No formal automated test suite — this is a content-driven site with no complex logic. Instead:
- TypeScript strict mode across content and components.
- ESLint for code quality.
- Manual verification in-browser before considering work done: responsive check (mobile/tablet/desktop), light/dark mode, nav scroll + active-section highlighting, `ChapterRail` behavior.

## Out of Scope (v1)

- Projects showcase.
- Contact form / email link.
- Education section.
- Blog/writing section.
- Multi-page routing.
- Dedicated animation library.
