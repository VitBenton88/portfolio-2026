# Hero Animated Background — Design

## Purpose

The Hero section currently uses a flat `background-color` block (`--color-hero-indigo`, `#5B3DF5`). This makes the first thing a visitor sees feel static and plain. The goal is a small, artistic, eye-catching animated treatment for the Hero background — simple to implement, and consistent with the site's existing "Chaptered by Color" identity and no-animation-library constraint.

## Approach

Replace the flat background with a **mesh gradient shift**: a layered `radial-gradient` background (three soft color blobs over the indigo base) whose `background-position` slowly animates via a CSS `@keyframes` rule. Pure CSS, no new dependencies — consistent with the existing design spec's decision not to introduce a dedicated animation library.

Three animated background styles were prototyped live (aurora blobs, mesh gradient shift, geometric line mesh, drifting constellation dots) and compared side by side; the mesh gradient shift was selected for its subtle, painterly feel that doesn't compete with the name/tagline text.

## Visual Details

- **Colors:** Stays within the Hero's existing Indigo chapter family so it doesn't clash with `ChapterRail`'s color legend (Indigo → Amber → Teal → Magenta). Base color remains `--color-hero-indigo` (`#5B3DF5`). Two new supporting palette tokens are added for the gradient stops:
  - `--color-hero-indigo-bright`: `#7C4DFF` (bright violet)
  - `--color-hero-indigo-deep`: `#3F51B5` (blue-indigo)
- **Gradient composition:** Three `radial-gradient` layers positioned at different points (e.g. 20/20, 80/30, 50/85) over the solid indigo base, each fading to transparent so they blend into one continuous field rather than reading as distinct shapes.
- **Animation:** `background-size` is enlarged (e.g. 180% 180%) and `background-position` shifts between two keyframe states, `ease-in-out infinite alternate`, over an **~18s cycle** — slow and ambient, easy to ignore while reading but noticeably alive.
- **Scope:** Hero section only. No changes to About/Resume/Contact chapter treatments, no new libraries, no layout or text changes — background only.

## Accessibility

Respects `prefers-reduced-motion: reduce`, matching the pattern already established elsewhere in the site (Hero's staggered fade-in, scroll-triggered reveals). Under reduced motion, the gradient renders as a static painterly background — the animation's first frame — rather than removing the gradient or falling back to the flat color.

## Dark Mode

No special handling needed. The Hero block is already a bold, self-contained color statement independent of the light/dark `paper`/`ink` tokens, and the mesh gradient inherits that same independence — it renders identically in both color schemes.

## Testing / Verification

Consistent with the site's existing "no formal test suite" approach (content-driven site, no complex logic):
- Manual verification in-browser: animation renders smoothly, text stays readable throughout the animation cycle, `prefers-reduced-motion` correctly freezes the animation, light/dark mode both look correct.

## Out of Scope

- Applying animated backgrounds to other chapters (About/Resume/Contact).
- Canvas/WebGL or JS-driven particle effects.
- Any new animation library or dependency.
