# Hero Animated Background Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Hero section's flat indigo background with a slow, animated mesh-gradient background, using pure CSS.

**Architecture:** Add two new indigo-family color tokens to the existing palette module, then swap the Hero's `background-color` for a layered `radial-gradient` background animated via a CSS `@keyframes` rule on `background-position`. No new dependencies, no JS changes.

**Tech Stack:** Vite, React, TypeScript, CSS Modules (no animation library — matches existing project constraint).

## Global Constraints

- No new npm dependencies (project's existing design spec rules out a dedicated animation library for v1).
- Colors must stay within the Hero's existing Indigo chapter family (base `#5B3DF5`) so `ChapterRail`'s Indigo → Amber → Teal → Magenta legend isn't confused by an unrelated hue.
- Animation cycle is ~18s, `ease-in-out infinite alternate` (approved pace — slow/ambient, not distracting).
- Must respect `prefers-reduced-motion: reduce`.
- Identical appearance in light and dark color scheme (Hero background is scheme-independent today; must stay that way).
- No automated test suite in this project (see `docs/superpowers/specs/2026-07-21-portfolio-site-design.md` §9) — verification is via `npm run type-check`, `npm run lint`, and manual browser checks, not unit tests.

---

### Task 1: Animated mesh-gradient Hero background

**Files:**
- Modify: `src/theme/palette.ts`
- Modify: `src/theme/theme.ts`
- Modify: `src/components/Hero.module.css`

**Interfaces:**
- Produces: two new CSS custom properties, `--color-hero-indigo-bright` (`#7C4DFF`) and `--color-hero-indigo-deep` (`#3F51B5`), set on `document.documentElement` at startup by the existing loop in `src/main.tsx:10-12` (no changes needed there — it iterates `Object.entries(palette)` generically).
- Consumes: existing `--color-hero-indigo` (`#5B3DF5`) from `src/theme/palette.ts:4`.

- [ ] **Step 1: Add the two new color tokens to the palette**

Edit `src/theme/palette.ts` — add two entries after `--color-hero-indigo`:

```ts
export const palette = {
  '--color-paper': '#F7F7FA',
  '--color-ink': '#1A1B23',
  '--color-hero-indigo': '#5B3DF5',
  '--color-hero-indigo-bright': '#7C4DFF',
  '--color-hero-indigo-deep': '#3F51B5',
  '--color-about-amber': '#FFB238',
  '--color-resume-teal': '#12B886',
  '--color-contact-magenta': '#F0529C',
} as const;
```

- [ ] **Step 2: Mirror the new tokens in the theme's `other` map**

Edit `src/theme/theme.ts` — add two entries after `heroIndigo`, following the existing 1:1 naming pattern (`--color-x-y` → `xY`):

```ts
import { createTheme } from '@mantine/core';
import { palette } from './palette';

export const theme = createTheme({
  fontFamily: 'IBM Plex Sans, sans-serif',
  headings: { fontFamily: 'Bricolage Grotesque, sans-serif' },
  primaryColor: 'indigo',
  other: {
    paper: palette['--color-paper'],
    ink: palette['--color-ink'],
    heroIndigo: palette['--color-hero-indigo'],
    heroIndigoBright: palette['--color-hero-indigo-bright'],
    heroIndigoDeep: palette['--color-hero-indigo-deep'],
    aboutAmber: palette['--color-about-amber'],
    resumeTeal: palette['--color-resume-teal'],
    contactMagenta: palette['--color-contact-magenta'],
  },
});
```

- [ ] **Step 3: Run type-check to confirm the token changes compile cleanly**

Run: `npm run type-check`
Expected: exits with no errors (this project has no automated tests, so this is the closest thing to a fast automated check for this kind of change).

- [ ] **Step 4: Replace the Hero's flat background with the animated mesh gradient**

Edit `src/components/Hero.module.css` — replace the `.hero` rule and add a new `@keyframes` rule:

```css
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 1.5rem;
  background:
    radial-gradient(circle at 20% 20%, var(--color-hero-indigo-bright) 0%, transparent 55%),
    radial-gradient(circle at 80% 30%, var(--color-hero-indigo-deep) 0%, transparent 55%),
    radial-gradient(circle at 50% 85%, var(--color-hero-indigo-bright) 0%, transparent 55%),
    var(--color-hero-indigo);
  background-size: 180% 180%;
  animation: heroMeshShift 18s ease-in-out infinite alternate;
}

@keyframes heroMeshShift {
  0% {
    background-position: 0% 0%, 100% 0%, 50% 100%, 0 0;
  }
  100% {
    background-position: 20% 30%, 70% 40%, 30% 70%, 0 0;
  }
}
```

The rest of `Hero.module.css` (`.out`, `.in`, `.name`, `.tagline` rules) is unchanged.

`prefers-reduced-motion` needs no extra code here: `src/styles/global.css:21-28` already forces `animation-duration: 0.01ms !important` and `animation-iteration-count: 1 !important` globally, so under reduced motion this animation will settle on its `100%` keyframe almost instantly and stay there — a static (but still painterly) gradient, matching the spec's accessibility requirement.

- [ ] **Step 5: Run lint and type-check**

Run: `npm run lint && npm run type-check`
Expected: both exit with no errors.

- [ ] **Step 6: Manually verify in the browser**

Run: `npm run dev`, open the printed local URL, and check:
1. The Hero background visibly, slowly shifts/reshapes over roughly 18 seconds (watch for at least one full cycle).
2. The gradient stays within indigo/violet/blue tones — no color reads as a different `ChapterRail` chapter color (amber/teal/magenta).
3. The name and tagline text remain clearly readable against the background throughout the animation cycle.
4. No layout shift, scrollbar, or overflow is introduced (the gradient must stay contained within the Hero section).
5. Resize the window (mobile/tablet/desktop widths) — background still fills the section with no gaps or seams.

- [ ] **Step 7: Manually verify `prefers-reduced-motion` behavior**

In Chrome/Edge DevTools: open the Command Menu (Cmd+Shift+P on Mac), run "Show Rendering", then set "Emulate CSS media feature prefers-reduced-motion" to "reduce". Reload the page and check:
1. The Hero background is static (no visible motion).
2. It still shows the gradient (blobs of color), not a flat single color and not a broken/empty background.

Turn the emulation back off afterward.

- [ ] **Step 8: Commit**

```bash
git add src/theme/palette.ts src/theme/theme.ts src/components/Hero.module.css
git commit -m "Animate Hero background with a shifting indigo mesh gradient"
```

---

## Definition of Done

- [ ] All steps above checked off.
- [ ] `npm run lint` and `npm run type-check` both pass.
- [ ] Hero background animates slowly and stays readable, verified manually in-browser.
- [ ] `prefers-reduced-motion: reduce` verified to freeze the animation into a static gradient.
- [ ] Change committed.
