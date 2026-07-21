# Portfolio Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy a single-page React/TypeScript/Mantine portfolio site with a "chaptered by color" visual identity (Hero, About, Resume, Contact), publishing to GitHub Pages.

**Architecture:** Vite + React + TypeScript SPA, no router (smooth-scroll single page). Mantine supplies component primitives; a small custom CSS-variable palette and two font families layer the "chaptered by color" identity on top. A shared `useActiveSection` hook (IntersectionObserver-based) drives both nav-link highlighting and the `ChapterRail` signature element. Content lives in one typed data module so personal content can be swapped without touching component code.

**Tech Stack:** Vite, React 18, TypeScript (strict), Mantine (`@mantine/core`, `@mantine/hooks`), `@tabler/icons-react`, CSS Modules, GitHub Actions + `peaceiris/actions-gh-pages` for deployment.

## Global Constraints

- Repo name: `portfolio-2026`. Vite `base` must be `/portfolio-2026/`.
- No dedicated projects showcase, no contact form/email, no education section, no blog, no client-side routing, no animation library beyond CSS transitions — these are explicitly out of scope per the spec.
- Palette (exact hex, from spec section 5): Paper `#F7F7FA`, Ink `#1A1B23`, Hero·Indigo `#5B3DF5`, About·Amber `#FFB238`, Resume·Teal `#12B886`, Contact·Magenta `#F0529C`.
- Typography: display = Bricolage Grotesque, body = IBM Plex Sans, utility/labels = IBM Plex Mono. Loaded via Google Fonts `<link>` tags.
- Both light and dark color scheme must work (Mantine `defaultColorScheme="auto"`).
- Accessibility baseline: visible `:focus-visible` outlines, `prefers-reduced-motion` respected everywhere motion is used (scroll behavior and CSS transitions).
- **No automated test suite** (explicit spec decision). Every task's verification step is: `npm run type-check`, `npm run lint`, then a specific manual browser check — not a test file. Do not add a test runner or write test files.
- Every component task appends its component to `src/App.tsx` immediately, so the site is in a previewable, running state after every single task.

---

### Task 1: Scaffold the Vite + React + TypeScript project

**Files:**
- Create: `package.json`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, `vite.config.ts`, `index.html`, `src/main.tsx`, `src/App.tsx`, `eslint.config.js`, `.gitignore`
- (These are created by the Vite scaffolding command; some will be modified in later tasks.)

**Interfaces:**
- Produces: a running Vite dev server, `npm run build`/`npm run dev`/`npm run lint`/`npm run type-check` scripts, and a minimal `App` component that later tasks import components into.

- [ ] **Step 1: Scaffold with Vite's react-ts template**

Run in the project root (`/Users/vitbenton/Desktop/Repos/portfolio_2026`):

```bash
npm create vite@latest . -- --template react-ts
```

When prompted about the current directory not being empty, confirm to proceed (the `docs/` folder already exists and should be left alone).

- [ ] **Step 2: Install dependencies**

```bash
npm install
```

- [ ] **Step 3: Add `type-check` script**

Edit `package.json`, add to `"scripts"`:

```json
"type-check": "tsc --noEmit"
```

- [ ] **Step 4: Verify the dev server runs**

Run: `npm run dev`
Expected: Vite prints a local URL (e.g. `http://localhost:5173/`); opening it in a browser shows the default Vite+React starter page. Stop the server with Ctrl+C after confirming.

- [ ] **Step 5: Verify type-check and lint pass on the scaffold**

Run: `npm run type-check && npm run lint`
Expected: both commands exit with no errors.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "Scaffold Vite + React + TypeScript project"
```

---

### Task 2: Install Mantine, define the palette, and wire the theme

**Files:**
- Create: `postcss.config.cjs`, `src/theme/palette.ts`, `src/theme/theme.ts`, `src/styles/global.css`
- Modify: `src/main.tsx`

**Interfaces:**
- Produces: `palette` (exported from `src/theme/palette.ts`) — an object whose keys are CSS custom-property names (e.g. `'--color-hero-indigo'`) and whose values are the hex strings from Global Constraints. `theme` (exported from `src/theme/theme.ts`) — a Mantine `MantineThemeOverride` used by `MantineProvider`.
- Consumes: nothing (this is foundational).

- [ ] **Step 1: Install Mantine and PostCSS dependencies**

```bash
npm install @mantine/core @mantine/hooks @tabler/icons-react
npm install -D postcss postcss-preset-mantine postcss-simple-vars
```

- [ ] **Step 2: Create the PostCSS config Mantine requires**

Create `postcss.config.cjs`:

```js
module.exports = {
  plugins: {
    'postcss-preset-mantine': {},
    'postcss-simple-vars': {
      variables: {
        'mantine-breakpoint-xs': '36em',
        'mantine-breakpoint-sm': '48em',
        'mantine-breakpoint-md': '62em',
        'mantine-breakpoint-lg': '75em',
        'mantine-breakpoint-xl': '88em',
      },
    },
  },
};
```

- [ ] **Step 3: Define the palette as CSS custom properties**

Create `src/theme/palette.ts`:

```ts
export const palette = {
  '--color-paper': '#F7F7FA',
  '--color-ink': '#1A1B23',
  '--color-hero-indigo': '#5B3DF5',
  '--color-about-amber': '#FFB238',
  '--color-resume-teal': '#12B886',
  '--color-contact-magenta': '#F0529C',
} as const;
```

- [ ] **Step 4: Create the Mantine theme**

Create `src/theme/theme.ts`:

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
    aboutAmber: palette['--color-about-amber'],
    resumeTeal: palette['--color-resume-teal'],
    contactMagenta: palette['--color-contact-magenta'],
  },
});
```

- [ ] **Step 5: Create the global stylesheet (reset, fonts, focus states, reduced motion)**

Create `src/styles/global.css`:

```css
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: 'IBM Plex Sans', sans-serif;
  background-color: var(--color-paper);
  color: var(--color-ink);
}

h1, h2, h3 {
  font-family: 'Bricolage Grotesque', sans-serif;
}

:focus-visible {
  outline: 3px solid var(--color-hero-indigo);
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

- [ ] **Step 6: Convert `App` to a named-export placeholder and remove unused scaffold CSS**

The Vite scaffold's `src/App.tsx` uses a default export and imports `src/App.css`; every later task in this plan replaces `App.tsx` with a named export (`export function App()`), so switch to that convention now to avoid an export-style mismatch. Replace the contents of `src/App.tsx`:

```tsx
export function App() {
  return null;
}
```

Delete `src/App.css` and `src/index.css` (no longer imported by anything — `src/styles/global.css` replaces them):

```bash
rm src/App.css src/index.css
```

- [ ] **Step 7: Wire the theme, global CSS, and palette variables into the app entrypoint**

Replace the contents of `src/main.tsx`:

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import './styles/global.css';
import { theme } from './theme/theme';
import { palette } from './theme/palette';
import { App } from './App';

Object.entries(palette).forEach(([property, value]) => {
  document.documentElement.style.setProperty(property, value);
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={theme} defaultColorScheme="auto">
      <App />
    </MantineProvider>
  </StrictMode>,
);
```

- [ ] **Step 8: Verify type-check, lint, and visual result**

Run: `npm run type-check && npm run lint`
Expected: no errors.

Run: `npm run dev`, open the printed URL.
Expected: page background is the Paper color (`#F7F7FA` in light mode), no console errors about missing Mantine styles.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "Install Mantine, define palette, and wire theme"
```

---

### Task 3: Shared types and the content module

**Files:**
- Create: `src/types.ts`, `src/content.ts`

**Interfaces:**
- Produces: `SectionId` type (`'hero' | 'about' | 'resume' | 'contact'`) from `src/types.ts`. `content: SiteContent` object from `src/content.ts`, with fields `name`, `tagline`, `bio`, `photoUrl`, `skills: string[]`, `experience: ExperienceEntry[]`, `socialLinks: SocialLink[]`, `resumeUrl`.
- Consumes: nothing.

- [ ] **Step 1: Define shared types**

Create `src/types.ts`:

```ts
export type SectionId = 'hero' | 'about' | 'resume' | 'contact';
```

- [ ] **Step 2: Create the typed content module with placeholder data**

Create `src/content.ts`:

```ts
export interface ExperienceEntry {
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  bullets: string[];
}

export interface SocialLink {
  label: 'LinkedIn' | 'GitHub';
  url: string;
}

export interface SiteContent {
  name: string;
  tagline: string;
  bio: string;
  photoUrl: string;
  skills: string[];
  experience: ExperienceEntry[];
  socialLinks: SocialLink[];
  resumeUrl: string;
}

const BASE = import.meta.env.BASE_URL;

export const content: SiteContent = {
  name: 'Jane Doe',
  tagline: 'Software engineer building things that work.',
  bio: 'Placeholder bio — replace with your real background, focus areas, and what you care about as an engineer.',
  photoUrl: `${BASE}profile.jpg`,
  skills: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'AWS', 'Python'],
  experience: [
    {
      title: 'Senior Software Engineer',
      company: 'Example Corp',
      startDate: '2022',
      endDate: 'Present',
      bullets: [
        'Placeholder bullet — replace with a real accomplishment with measurable impact.',
        'Placeholder bullet — replace with another concrete contribution.',
      ],
    },
    {
      title: 'Software Engineer',
      company: 'Prior Company',
      startDate: '2019',
      endDate: '2022',
      bullets: ['Placeholder bullet — replace with a real accomplishment with measurable impact.'],
    },
  ],
  socialLinks: [
    { label: 'LinkedIn', url: 'https://linkedin.com/in/yourprofile' },
    { label: 'GitHub', url: 'https://github.com/yourusername' },
  ],
  resumeUrl: `${BASE}resume.pdf`,
};
```

- [ ] **Step 3: Verify**

Run: `npm run type-check && npm run lint`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "Add shared types and placeholder content module"
```

---

### Task 4: Shared hooks — active section tracking and reduced-motion detection

**Files:**
- Create: `src/hooks/useActiveSection.ts`, `src/hooks/usePrefersReducedMotion.ts`

**Interfaces:**
- Produces: `useActiveSection(sectionIds: readonly SectionId[]): SectionId` — returns the id of the section currently most in view. `usePrefersReducedMotion(): boolean` — reactive read of the `prefers-reduced-motion` media query.
- Consumes: `SectionId` from `src/types.ts` (Task 3).

- [ ] **Step 1: Implement `useActiveSection`**

Create `src/hooks/useActiveSection.ts`:

```ts
import { useEffect, useState } from 'react';
import type { SectionId } from '../types';

export function useActiveSection(sectionIds: readonly SectionId[]): SectionId {
  const [active, setActive] = useState<SectionId>(sectionIds[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (mostVisible) {
          setActive(mostVisible.target.id as SectionId);
        }
      },
      { threshold: [0.3, 0.5, 0.7], rootMargin: '-64px 0px -40% 0px' },
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  return active;
}
```

- [ ] **Step 2: Implement `usePrefersReducedMotion`**

Create `src/hooks/usePrefersReducedMotion.ts`:

```ts
import { useEffect, useState } from 'react';

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return reduced;
}
```

- [ ] **Step 3: Verify**

Run: `npm run type-check && npm run lint`
Expected: no errors (these hooks aren't consumed yet, so this only checks they compile cleanly).

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "Add useActiveSection and usePrefersReducedMotion hooks"
```

---

### Task 5: NavBar component

**Files:**
- Create: `src/components/NavBar.tsx`, `src/components/NavBar.module.css`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `useActiveSection`, `usePrefersReducedMotion` (Task 4), `content` (Task 3), `SectionId` (Task 3).
- Produces: `NavBar` component, rendered first in `App`.

- [ ] **Step 1: Implement NavBar**

Create `src/components/NavBar.tsx`:

```tsx
import { Anchor, Burger, Drawer, Group, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useActiveSection } from '../hooks/useActiveSection';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { content } from '../content';
import type { SectionId } from '../types';
import classes from './NavBar.module.css';

const LINKS: { id: SectionId; label: string }[] = [
  { id: 'about', label: 'About' },
  { id: 'resume', label: 'Resume' },
  { id: 'contact', label: 'Contact' },
];

const ALL_SECTION_IDS: SectionId[] = ['hero', 'about', 'resume', 'contact'];

export function NavBar() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const active = useActiveSection(ALL_SECTION_IDS);
  const prefersReducedMotion = usePrefersReducedMotion();

  const scrollTo = (id: SectionId) => {
    document.getElementById(id)?.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    close();
  };

  return (
    <header className={classes.header}>
      <Group justify="space-between" h="100%" px="md">
        <Anchor component="button" onClick={() => scrollTo('hero')} className={classes.brand} underline="never">
          {content.name}
        </Anchor>
        <Group gap="lg" visibleFrom="sm">
          {LINKS.map((link) => (
            <Anchor
              key={link.id}
              component="button"
              onClick={() => scrollTo(link.id)}
              underline="never"
              className={active === link.id ? classes.linkActive : classes.link}
            >
              {link.label}
            </Anchor>
          ))}
        </Group>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" aria-label="Toggle navigation" />
      </Group>
      <Drawer opened={opened} onClose={close} hiddenFrom="sm" padding="md" size="xs" title="Menu">
        <Stack>
          {LINKS.map((link) => (
            <Anchor key={link.id} component="button" onClick={() => scrollTo(link.id)} underline="never">
              {link.label}
            </Anchor>
          ))}
        </Stack>
      </Drawer>
    </header>
  );
}
```

- [ ] **Step 2: Add NavBar styles**

Create `src/components/NavBar.module.css`:

```css
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 64px;
  background-color: var(--color-paper);
  border-bottom: 1px solid rgba(26, 27, 35, 0.08);
  z-index: 100;
}

.brand {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-weight: 700;
  color: var(--color-ink);
}

.link {
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 500;
  color: var(--color-ink);
}

.linkActive {
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 500;
  color: var(--color-hero-indigo);
}
```

- [ ] **Step 3: Render NavBar in App**

Replace the contents of `src/App.tsx`:

```tsx
import { NavBar } from './components/NavBar';

export function App() {
  return (
    <>
      <NavBar />
      <main>
        <section id="hero" style={{ minHeight: '100vh' }} />
        <section id="about" style={{ minHeight: '50vh' }} />
        <section id="resume" style={{ minHeight: '50vh' }} />
        <section id="contact" style={{ minHeight: '50vh' }} />
      </main>
    </>
  );
}
```

(The empty sections are scroll-anchor placeholders; each gets replaced with its real component in Tasks 6–9.)

- [ ] **Step 4: Verify**

Run: `npm run type-check && npm run lint`
Expected: no errors.

Run: `npm run dev`, open the browser.
Expected: a fixed top nav showing the name and About/Resume/Contact links; clicking a link smooth-scrolls to the matching empty section and that link turns Indigo while its section is in view. Shrinking the window below ~768px replaces the links with a burger icon that opens a drawer with the same links.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "Add NavBar with active-section highlighting and mobile drawer"
```

---

### Task 6: Hero component

**Files:**
- Create: `src/components/Hero.tsx`, `src/components/Hero.module.css`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `content` (Task 3).
- Produces: `Hero` component, replaces the `#hero` placeholder section in `App`.

- [ ] **Step 1: Implement Hero**

Create `src/components/Hero.tsx`:

```tsx
import { useEffect, useState } from 'react';
import { Stack, Title, Text } from '@mantine/core';
import { content } from '../content';
import classes from './Hero.module.css';

export function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setLoaded(true), 50);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section id="hero" className={classes.hero}>
      <Stack gap="sm" align="center">
        <Title order={1} className={`${classes.name} ${loaded ? classes.in : classes.out}`}>
          {content.name}
        </Title>
        <Text size="xl" className={`${classes.tagline} ${loaded ? classes.in : classes.out}`}>
          {content.tagline}
        </Text>
      </Stack>
    </section>
  );
}
```

- [ ] **Step 2: Add Hero styles with staggered fade-in**

Create `src/components/Hero.module.css`:

```css
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: var(--color-hero-indigo);
  padding: 0 1.5rem;
}

.out {
  opacity: 0;
  transform: translateY(16px);
}

.in {
  opacity: 1;
  transform: translateY(0);
}

.name.in {
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.tagline.in {
  transition: opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s;
}

.name {
  font-family: 'Bricolage Grotesque', sans-serif;
  color: var(--color-paper);
  font-size: clamp(2.5rem, 8vw, 5rem);
}

.tagline {
  color: var(--color-paper);
  opacity: 0.85;
}
```

- [ ] **Step 3: Replace the `#hero` placeholder in App**

In `src/App.tsx`, add the import and replace the placeholder section:

```tsx
import { NavBar } from './components/NavBar';
import { Hero } from './components/Hero';

export function App() {
  return (
    <>
      <NavBar />
      <main>
        <Hero />
        <section id="about" style={{ minHeight: '50vh' }} />
        <section id="resume" style={{ minHeight: '50vh' }} />
        <section id="contact" style={{ minHeight: '50vh' }} />
      </main>
    </>
  );
}
```

- [ ] **Step 4: Verify**

Run: `npm run type-check && npm run lint`
Expected: no errors.

Run: `npm run dev`, open the browser.
Expected: full-viewport Indigo block with the name fading/sliding in first, tagline following ~150ms later. In Chrome DevTools, enable "Emulate CSS prefers-reduced-motion: reduce" (Rendering tab) and reload — text should appear instantly with no animation.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "Add Hero section with staggered fade-in, respecting reduced motion"
```

---

### Task 7: About component

**Files:**
- Create: `src/components/About.tsx`, `src/components/About.module.css`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `content` (Task 3).
- Produces: `About` component, replaces the `#about` placeholder section in `App`.

- [ ] **Step 1: Implement About**

Create `src/components/About.tsx`:

```tsx
import { Container, Grid, Image, Text, Title } from '@mantine/core';
import { content } from '../content';
import classes from './About.module.css';

export function About() {
  return (
    <section id="about" className={classes.section}>
      <Container size="md">
        <Title order={2} className={classes.heading}>
          About
        </Title>
        <Grid gutter="xl" align="center">
          <Grid.Col span={{ base: 12, sm: 4 }}>
            <Image src={content.photoUrl} alt={`Photo of ${content.name}`} radius="md" />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 8 }}>
            <Text size="lg">{content.bio}</Text>
          </Grid.Col>
        </Grid>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Add About styles**

Create `src/components/About.module.css`:

```css
.section {
  padding: 6rem 1.5rem;
}

.heading {
  color: var(--color-about-amber);
  margin-bottom: 2rem;
}
```

- [ ] **Step 3: Replace the `#about` placeholder in App**

In `src/App.tsx`:

```tsx
import { NavBar } from './components/NavBar';
import { Hero } from './components/Hero';
import { About } from './components/About';

export function App() {
  return (
    <>
      <NavBar />
      <main>
        <Hero />
        <About />
        <section id="resume" style={{ minHeight: '50vh' }} />
        <section id="contact" style={{ minHeight: '50vh' }} />
      </main>
    </>
  );
}
```

- [ ] **Step 4: Verify**

Run: `npm run type-check && npm run lint`
Expected: no errors.

Run: `npm run dev`, open the browser, scroll to About.
Expected: Amber "About" heading, photo (broken-image icon is fine since `profile.jpg` isn't supplied yet — see Task 13) alongside the placeholder bio text. The NavBar's "About" link should highlight Indigo→turn active-colored while this section is in view.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "Add About section"
```

---

### Task 8: Resume component

**Files:**
- Create: `src/components/Resume.tsx`, `src/components/Resume.module.css`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `content` (Task 3).
- Produces: `Resume` component, replaces the `#resume` placeholder section in `App`.

- [ ] **Step 1: Implement Resume**

Create `src/components/Resume.tsx`:

```tsx
import { Badge, Button, Container, Group, Text, Timeline, Title } from '@mantine/core';
import { IconDownload } from '@tabler/icons-react';
import { content } from '../content';
import classes from './Resume.module.css';

export function Resume() {
  return (
    <section id="resume" className={classes.section}>
      <Container size="md">
        <Title order={2} className={classes.heading}>
          Resume
        </Title>

        <Group gap="xs" mb="xl">
          {content.skills.map((skill) => (
            <Badge key={skill} variant="light" color="teal" className={classes.badge}>
              {skill}
            </Badge>
          ))}
        </Group>

        <Timeline active={content.experience.length} bulletSize={16} lineWidth={2} color="teal">
          {content.experience.map((entry) => (
            <Timeline.Item key={`${entry.company}-${entry.startDate}`} title={entry.title}>
              <Text size="sm" c="dimmed" className={classes.dates}>
                {entry.company} · {entry.startDate}–{entry.endDate}
              </Text>
              <ul>
                {entry.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </Timeline.Item>
          ))}
        </Timeline>

        <Button
          component="a"
          href={content.resumeUrl}
          download
          leftSection={<IconDownload size={16} />}
          color="teal"
          mt="xl"
        >
          Download Resume
        </Button>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Add Resume styles**

Create `src/components/Resume.module.css`:

```css
.section {
  padding: 6rem 1.5rem;
}

.heading {
  color: var(--color-resume-teal);
  margin-bottom: 2rem;
}

.badge {
  font-family: 'IBM Plex Mono', monospace;
}

.dates {
  font-family: 'IBM Plex Mono', monospace;
}
```

- [ ] **Step 3: Add a placeholder resume PDF**

Create `public/resume.pdf` — any placeholder PDF file works for now (e.g. export a blank page from any editor, or copy an existing PDF), since the real resume will be swapped in during Task 13.

- [ ] **Step 4: Replace the `#resume` placeholder in App**

In `src/App.tsx`:

```tsx
import { NavBar } from './components/NavBar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Resume } from './components/Resume';

export function App() {
  return (
    <>
      <NavBar />
      <main>
        <Hero />
        <About />
        <Resume />
        <section id="contact" style={{ minHeight: '50vh' }} />
      </main>
    </>
  );
}
```

- [ ] **Step 5: Verify**

Run: `npm run type-check && npm run lint`
Expected: no errors.

Run: `npm run dev`, open the browser, scroll to Resume.
Expected: Teal "Resume" heading, skill badges, a two-entry work-history timeline with bullet points, and a "Download Resume" button that downloads `resume.pdf`.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "Add Resume section with skills, timeline, and PDF download"
```

---

### Task 9: Contact component

**Files:**
- Create: `src/components/Contact.tsx`, `src/components/Contact.module.css`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `content` (Task 3).
- Produces: `Contact` component, replaces the `#contact` placeholder section in `App`.

- [ ] **Step 1: Implement Contact**

Create `src/components/Contact.tsx`:

```tsx
import { Button, Container, Group, Title } from '@mantine/core';
import { IconBrandGithub, IconBrandLinkedin } from '@tabler/icons-react';
import { content } from '../content';
import classes from './Contact.module.css';

const ICONS = {
  LinkedIn: IconBrandLinkedin,
  GitHub: IconBrandGithub,
} as const;

export function Contact() {
  return (
    <section id="contact" className={classes.section}>
      <Container size="md">
        <Title order={2} className={classes.heading}>
          Contact
        </Title>
        <Group gap="md">
          {content.socialLinks.map((link) => {
            const Icon = ICONS[link.label];
            return (
              <Button
                key={link.label}
                component="a"
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                leftSection={<Icon size={18} />}
                color="pink"
                variant="light"
                size="lg"
              >
                {link.label}
              </Button>
            );
          })}
        </Group>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Add Contact styles**

Create `src/components/Contact.module.css`:

```css
.section {
  padding: 6rem 1.5rem 8rem;
}

.heading {
  color: var(--color-contact-magenta);
  margin-bottom: 2rem;
}
```

- [ ] **Step 3: Replace the `#contact` placeholder in App**

In `src/App.tsx`:

```tsx
import { NavBar } from './components/NavBar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Resume } from './components/Resume';
import { Contact } from './components/Contact';

export function App() {
  return (
    <>
      <NavBar />
      <main>
        <Hero />
        <About />
        <Resume />
        <Contact />
      </main>
    </>
  );
}
```

- [ ] **Step 4: Verify**

Run: `npm run type-check && npm run lint`
Expected: no errors.

Run: `npm run dev`, open the browser, scroll to Contact.
Expected: Magenta "Contact" heading with LinkedIn and GitHub buttons that open the placeholder URLs in a new tab.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "Add Contact section"
```

---

### Task 10: Footer component

**Files:**
- Create: `src/components/Footer.tsx`, `src/components/Footer.module.css`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `content` (Task 3).
- Produces: `Footer` component, rendered after `<main>` in `App`.

- [ ] **Step 1: Implement Footer**

Create `src/components/Footer.tsx`:

```tsx
import { Group, Text } from '@mantine/core';
import { IconBrandGithub, IconBrandLinkedin } from '@tabler/icons-react';
import { content } from '../content';
import classes from './Footer.module.css';

const ICONS = {
  LinkedIn: IconBrandLinkedin,
  GitHub: IconBrandGithub,
} as const;

export function Footer() {
  return (
    <footer className={classes.footer}>
      <Group justify="space-between" px="md">
        <Text size="sm">
          © {new Date().getFullYear()} {content.name}
        </Text>
        <Group gap="sm">
          {content.socialLinks.map((link) => {
            const Icon = ICONS[link.label];
            return (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className={classes.iconLink}
              >
                <Icon size={20} />
              </a>
            );
          })}
        </Group>
      </Group>
    </footer>
  );
}
```

- [ ] **Step 2: Add Footer styles**

Create `src/components/Footer.module.css`:

```css
.footer {
  height: 64px;
  display: flex;
  align-items: center;
  border-top: 1px solid rgba(26, 27, 35, 0.08);
}

.iconLink {
  color: var(--color-ink);
  display: inline-flex;
}
```

- [ ] **Step 3: Render Footer in App**

In `src/App.tsx`:

```tsx
import { NavBar } from './components/NavBar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Resume } from './components/Resume';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export function App() {
  return (
    <>
      <NavBar />
      <main>
        <Hero />
        <About />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 4: Verify**

Run: `npm run type-check && npm run lint`
Expected: no errors.

Run: `npm run dev`, open the browser, scroll to the bottom.
Expected: footer with the current year, name, and LinkedIn/GitHub icon links.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "Add Footer"
```

---

### Task 11: ChapterRail component (signature element)

**Files:**
- Create: `src/components/ChapterRail.tsx`, `src/components/ChapterRail.module.css`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `useActiveSection`, `usePrefersReducedMotion` (Task 4).
- Produces: `ChapterRail` component, rendered alongside `NavBar` in `App`.

- [ ] **Step 1: Implement ChapterRail**

Create `src/components/ChapterRail.tsx`:

```tsx
import { useActiveSection } from '../hooks/useActiveSection';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import type { SectionId } from '../types';
import classes from './ChapterRail.module.css';

const CHAPTERS: { id: SectionId; color: string; label: string }[] = [
  { id: 'hero', color: 'var(--color-hero-indigo)', label: 'Home' },
  { id: 'about', color: 'var(--color-about-amber)', label: 'About' },
  { id: 'resume', color: 'var(--color-resume-teal)', label: 'Resume' },
  { id: 'contact', color: 'var(--color-contact-magenta)', label: 'Contact' },
];

const CHAPTER_IDS: SectionId[] = CHAPTERS.map((chapter) => chapter.id);

export function ChapterRail() {
  const active = useActiveSection(CHAPTER_IDS);
  const prefersReducedMotion = usePrefersReducedMotion();
  const activeIndex = CHAPTERS.findIndex((chapter) => chapter.id === active);

  const scrollTo = (id: SectionId) => {
    document.getElementById(id)?.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  };

  return (
    <nav className={classes.rail} aria-label="Section progress">
      {CHAPTERS.map((chapter, index) => (
        <button
          key={chapter.id}
          type="button"
          className={classes.segment}
          style={{
            backgroundColor: index <= activeIndex ? chapter.color : 'var(--color-ink)',
            opacity: index <= activeIndex ? 1 : 0.2,
          }}
          onClick={() => scrollTo(chapter.id)}
          aria-label={`Jump to ${chapter.label}`}
          aria-current={chapter.id === active}
        />
      ))}
    </nav>
  );
}
```

- [ ] **Step 2: Add ChapterRail styles**

Create `src/components/ChapterRail.module.css`:

```css
.rail {
  position: fixed;
  left: 0;
  top: 64px;
  bottom: 0;
  width: 6px;
  display: flex;
  flex-direction: column;
  z-index: 90;
}

.segment {
  flex: 1;
  width: 100%;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: background-color 0.3s ease, opacity 0.3s ease;
}

.segment:focus-visible {
  outline: 2px solid var(--color-hero-indigo);
  outline-offset: -2px;
}
```

- [ ] **Step 3: Render ChapterRail in App**

In `src/App.tsx`:

```tsx
import { NavBar } from './components/NavBar';
import { ChapterRail } from './components/ChapterRail';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Resume } from './components/Resume';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export function App() {
  return (
    <>
      <NavBar />
      <ChapterRail />
      <main>
        <Hero />
        <About />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 4: Verify**

Run: `npm run type-check && npm run lint`
Expected: no errors.

Run: `npm run dev`, open the browser.
Expected: a thin vertical rail on the left edge below the nav. As you scroll through Hero → About → Resume → Contact, the segments fill/recolor in order (Indigo, then +Amber, then +Teal, then +Magenta), and clicking any segment jumps to that section. Tabbing to a segment with the keyboard shows a visible focus outline.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "Add ChapterRail signature element"
```

---

### Task 12: Full-site manual QA pass

**Files:** none (verification only; fix any issues found in the files touched by Tasks 5–11).

**Interfaces:** none — this task validates the composed `App` from Tasks 1–11.

- [ ] **Step 1: Responsive check**

Run: `npm run dev`, open the browser's device toolbar (or resize the window) to test at ~375px (mobile), ~768px (tablet), and ~1440px (desktop) widths.
Expected: no horizontal scroll at any width; NavBar collapses to the burger/drawer below ~768px; Hero text stays readable at 375px; ChapterRail remains visible and usable at all widths.

- [ ] **Step 2: Light/dark mode check**

In the browser, toggle the OS-level color scheme (or DevTools Rendering tab → "Emulate CSS prefers-color-scheme") between light and dark.
Expected: Mantine components (Badge, Button, Timeline) adapt to dark mode; the custom Paper/Ink/chapter colors (set as raw CSS variables) remain legible in both — if any custom-colored text becomes hard to read in dark mode, adjust that component's CSS to add a dark-mode override using a `:global([data-mantine-color-scheme="dark"])` selector.

- [ ] **Step 3: Keyboard navigation check**

Using only Tab/Shift+Tab/Enter (no mouse), navigate from the top of the page through: NavBar links, ChapterRail segments, About/Resume/Contact interactive elements (image has no focusable role, buttons/links do), Footer icon links.
Expected: every interactive element receives a visible focus outline in the same tab order it's visually laid out; Enter activates links/buttons.

- [ ] **Step 4: Reduced-motion check**

Enable "Emulate CSS prefers-reduced-motion: reduce" in DevTools' Rendering tab, then reload and scroll through the whole page, clicking NavBar links and ChapterRail segments.
Expected: Hero's text appears without animation; clicking nav links or rail segments jumps instantly (no smooth scroll).

- [ ] **Step 5: Fix any issues found, then re-verify**

Run: `npm run type-check && npm run lint`
Expected: no errors, after any fixes from Steps 1–4.

- [ ] **Step 6: Commit** (only if fixes were made)

```bash
git add -A
git commit -m "Fix issues found in full-site QA pass"
```

---

### Task 13: SEO/social metadata and asset placeholders

**Files:**
- Create: `public/favicon.svg`
- Modify: `index.html`

**Interfaces:** none — this task only touches `index.html` head tags and static assets.

- [ ] **Step 1: Create a favicon matching the palette**

Create `public/favicon.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="6" fill="#5B3DF5"/>
  <text x="16" y="22" font-family="sans-serif" font-weight="700" font-size="16" fill="#F7F7FA" text-anchor="middle">J</text>
</svg>
```

(The "J" initial is a placeholder matching the placeholder name "Jane Doe" — update it to match your real name's initial when you swap in real content.)

- [ ] **Step 2: Add SEO and Open Graph tags, favicon link, and font loading to `index.html`**

Replace the contents of `index.html`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="%BASE_URL%favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Jane Doe — Software Engineer</title>
    <meta name="description" content="Jane Doe is a software engineer. View background, experience, and ways to connect." />

    <meta property="og:type" content="website" />
    <meta property="og:title" content="Jane Doe — Software Engineer" />
    <meta property="og:description" content="Jane Doe is a software engineer. View background, experience, and ways to connect." />
    <meta property="og:image" content="%BASE_URL%og-image.png" />

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,700&family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 3: Note remaining real-content assets**

The following are personal assets this plan cannot generate and must be supplied manually before the site is truly final (this is expected — same category as the placeholder bio/work-history text from Task 3):
- `public/profile.jpg` — a real photo, referenced by `content.photoUrl`.
- `public/resume.pdf` — replace the Task 8 placeholder with the real resume PDF.
- `public/og-image.png` (1200×630px) — a simple image using the Indigo background and Bricolage Grotesque name/tagline, for link-preview cards. Any design tool (Figma, Canva) works; export at 1200×630.
- Update `content.ts`'s placeholder values (name, tagline, bio, skills, experience, social links) and `index.html`'s `<title>`/description/OG tags to match.

- [ ] **Step 4: Verify**

Run: `npm run type-check && npm run lint`
Expected: no errors.

Run: `npm run build && npm run preview`, open the printed URL.
Expected: browser tab shows the favicon and the real `<title>`; view page source shows the OG meta tags present.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "Add SEO/Open Graph metadata and favicon"
```

---

### Task 14: GitHub Pages deployment

**Files:**
- Modify: `vite.config.ts`
- Create: `.github/workflows/deploy.yml`, `README.md`

**Interfaces:** none — this is deployment configuration only.

- [ ] **Step 1: Set the Vite base path**

Replace the contents of `vite.config.ts`:

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/portfolio-2026/',
});
```

- [ ] **Step 2: Verify the production build works with the base path**

Run: `npm run build && npm run preview`, open the printed URL (it will include `/portfolio-2026/`).
Expected: site loads correctly with all assets (fonts, favicon) resolving under that path — check the browser Network tab for any 404s.

- [ ] **Step 3: Create the deployment workflow**

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: write

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

- [ ] **Step 4: Write a short README with local dev and deployment instructions**

Create `README.md`:

```markdown
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

Live URL: https://<your-github-username>.github.io/portfolio-2026/
```

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "Configure GitHub Pages deployment"
```

- [ ] **Step 6: Push and create the GitHub repo (manual, one-time)**

This step requires the user's own GitHub account and is not something to automate without confirmation:
1. Create a new GitHub repo named `portfolio-2026`.
2. `git remote add origin <repo-url>`
3. `git push -u origin main`
4. In the repo's Settings → Pages, set the source to the `gh-pages` branch (it will appear after the first successful Actions run).
5. Confirm the site loads at `https://<username>.github.io/portfolio-2026/`.

---

## Self-Review Notes

- **Spec coverage:** every numbered section of the spec (architecture, page structure, components, content, styling/theme, deployment, SEO/social metadata, accessibility baseline, testing/verification) maps to a task above. Out-of-scope items (projects showcase, contact form, education, blog, routing, animation library) are not present in any task.
- **Type consistency:** `SectionId` (Task 3) is used identically by `useActiveSection`, `NavBar`, and `ChapterRail`. `content.socialLinks[].label` (`'LinkedIn' | 'GitHub'`) matches the `ICONS` lookup keys used in both `Contact.tsx` and `Footer.tsx`.
- **No placeholders in logic:** the only placeholder content is literal personal data (name/bio/photo/resume/OG image) that no plan can generate on the user's behalf — each is called out explicitly with the exact file/field to replace, not left vague.
- **Corrections made during self-review:** (1) Task 2 originally wired `main.tsx` to a named `{ App }` import while the Vite scaffold's `App.tsx` still used a default export — added a step converting `App.tsx` to a named-export placeholder first, and removed the now-unused scaffold `App.css`/`index.css`. (2) `NavBar` and `ChapterRail` originally passed a freshly-allocated array literal to `useActiveSection` on every render, causing its `useEffect` (keyed on that array) to disconnect/reconnect the `IntersectionObserver` every render — fixed by hoisting `ALL_SECTION_IDS`/`CHAPTER_IDS` to stable module-level constants. (3) `content.ts` originally hardcoded asset URLs with the `/portfolio-2026/` prefix that only becomes correct after Task 14 sets Vite's `base` — since Tasks 3–13 run before that, the placeholder `resume.pdf` download in Task 8 would have 404'd. Fixed by deriving paths from `import.meta.env.BASE_URL` at runtime, and switched `index.html`'s favicon/OG-image tags to Vite's `%BASE_URL%` placeholder for the same reason.
