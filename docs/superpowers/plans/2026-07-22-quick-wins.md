# Quick Wins Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply 10 high-impact, low-effort fixes from the UI/UX and frontend engineering reviews — covering accessibility bugs, CSS correctness, performance, and meta polish.

**Architecture:** All changes are confined to existing files. No new npm dependencies. Each task is independently committable and visually verifiable in the dev server.

**Tech Stack:** React 19, TypeScript 6, Mantine 9, CSS Modules, Vite 8

## Global Constraints

- No new npm dependencies
- No design changes — layout, colors, and content stay as-is unless a task explicitly states otherwise
- Run `npm run build` after each task to catch TypeScript and Vite errors before committing
- Dev server: `npm run dev` (Vite, default port 5173)

---

### Task 1: Move CSS custom properties from JS to `:root`

Palette values injected via `document.documentElement.style.setProperty` in `main.tsx` aren't available until JS executes, causing a first-paint flash for any element reading `var(--color-*)`. Moving them into `:root {}` in `global.css` (which loads before paint) fixes this. Also removes the unused `theme.other` block from `theme.ts`.

**Files:**
- Modify: `src/styles/global.css` — add `:root {}` block
- Modify: `src/main.tsx` — remove `palette` import and `Object.entries` call
- Modify: `src/theme/theme.ts` — remove `other` block and `palette` import

- [ ] **Step 1: Add `:root` block to `global.css`**

  Add this block at the top of `src/styles/global.css`, before the `* {}` rule:

  ```css
  :root {
    --color-paper: #F7F7FA;
    --color-ink: #1A1B23;
    --color-hero-indigo: #5B3DF5;
    --color-hero-indigo-bright: #7C4DFF;
    --color-hero-indigo-deep: #3F51B5;
    --color-about-amber: #FFB238;
    --color-resume-teal: #12B886;
    --color-contact-magenta: #F0529C;
  }
  ```

- [ ] **Step 2: Remove JS palette injection from `main.tsx`**

  Remove lines 7, 10–12 so the file reads:

  ```tsx
  import { StrictMode } from 'react';
  import { createRoot } from 'react-dom/client';
  import { MantineProvider } from '@mantine/core';
  import '@mantine/core/styles.css';
  import './styles/global.css';
  import { theme } from './theme/theme';
  import { App } from './App';

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <MantineProvider theme={theme} defaultColorScheme="light" forceColorScheme="light">
        <App />
      </MantineProvider>
    </StrictMode>,
  );
  ```

- [ ] **Step 3: Remove dead `other` block and `palette` import from `theme.ts`**

  Replace the full file with:

  ```ts
  import { createTheme } from '@mantine/core';

  export const theme = createTheme({
    fontFamily: 'IBM Plex Sans, sans-serif',
    headings: { fontFamily: 'Bricolage Grotesque, sans-serif' },
    primaryColor: 'indigo',
  });
  ```

- [ ] **Step 4: Verify**

  Run `npm run build`. Should complete with no errors.
  Start `npm run dev`. Background color and text should appear immediately on load with no white flash.

- [ ] **Step 5: Commit**

  ```bash
  git add src/styles/global.css src/main.tsx src/theme/theme.ts
  git commit -m "perf: move CSS custom properties to :root, remove dead theme.other"
  ```

---

### Task 2: Replace Mantine barrel CSS import with granular imports

`import '@mantine/core/styles.css'` ships every Mantine component's CSS (~263 KB uncompressed / ~34 KB gzipped). The site uses 13 components. Granular imports drop the CSS payload by ~91%.

**Files:**
- Modify: `src/main.tsx`

Components used: `Anchor`, `Badge`, `Burger`, `Button`, `Container`, `Drawer`, `Grid`, `Group`, `List` (added in Task 5), `Stack`, `Text`, `Timeline`, `Title`.

- [ ] **Step 1: Replace the barrel import in `main.tsx`**

  Replace `import '@mantine/core/styles.css';` with:

  ```ts
  import '@mantine/core/styles/global.css';
  import '@mantine/core/styles/baseline.css';
  import '@mantine/core/styles/Anchor.css';
  import '@mantine/core/styles/Badge.css';
  import '@mantine/core/styles/Burger.css';
  import '@mantine/core/styles/Button.css';
  import '@mantine/core/styles/Container.css';
  import '@mantine/core/styles/Drawer.css';
  import '@mantine/core/styles/Grid.css';
  import '@mantine/core/styles/Group.css';
  import '@mantine/core/styles/List.css';
  import '@mantine/core/styles/Stack.css';
  import '@mantine/core/styles/Text.css';
  import '@mantine/core/styles/Timeline.css';
  import '@mantine/core/styles/Title.css';
  ```

- [ ] **Step 2: Verify**

  Run `npm run build`. Open the dev server and visually scan every section: NavBar, Hero, About (photo + bio), Resume (badges, timeline, button), Contact (buttons), Footer. Everything should look identical to before.

- [ ] **Step 3: Commit**

  ```bash
  git add src/main.tsx
  git commit -m "perf: replace Mantine barrel CSS import with granular per-component imports"
  ```

---

### Task 3: Accessibility — `aria-current`, skip link, nav hrefs

Three accessibility fixes in one task: an invalid ARIA attribute value, a missing WCAG 2.4.1 skip link, and nav anchors that should be `<a>` tags not `<button>` elements.

**Files:**
- Modify: `src/components/ChapterRail.tsx`
- Modify: `src/App.tsx`
- Modify: `src/styles/global.css`
- Modify: `src/components/NavBar.tsx`

- [ ] **Step 1: Fix `aria-current` in `ChapterRail.tsx`**

  On line 37, change:
  ```tsx
  aria-current={chapter.id === active}
  ```
  to:
  ```tsx
  aria-current={chapter.id === active ? 'step' : undefined}
  ```

- [ ] **Step 2: Add skip-to-content CSS to `global.css`**

  Append at the bottom of `src/styles/global.css`:

  ```css
  .skip-link {
    position: absolute;
    top: -100%;
    left: 1rem;
    padding: 0.5rem 1rem;
    background: var(--color-hero-indigo);
    color: var(--color-paper);
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 500;
    border-radius: 0 0 4px 4px;
    z-index: 200;
    text-decoration: none;
  }

  .skip-link:focus {
    top: 0;
  }
  ```

- [ ] **Step 3: Add skip-to-content link to `App.tsx`**

  Replace the `App.tsx` content with:

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
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <NavBar />
        <ChapterRail />
        <main id="main-content">
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

- [ ] **Step 4: Fix nav links in `NavBar.tsx` — use real `href` with `preventDefault`**

  The `scrollTo` function stays as-is. Change the nav link renders to use `href` instead of `component="button"`. Replace the two `Anchor` elements (desktop nav and Drawer nav) as follows.

  Desktop nav links (inside `<Group gap="lg" visibleFrom="sm">`), replace:
  ```tsx
  <Anchor
    key={link.id}
    component="button"
    onClick={() => scrollTo(link.id)}
    underline="never"
    className={active === link.id ? classes.linkActive : classes.link}
  >
    {link.label}
  </Anchor>
  ```
  with:
  ```tsx
  <Anchor
    key={link.id}
    href={`#${link.id}`}
    onClick={(e) => { e.preventDefault(); scrollTo(link.id); }}
    underline="never"
    className={active === link.id ? classes.linkActive : classes.link}
  >
    {link.label}
  </Anchor>
  ```

  Brand button (scrolls to hero), replace:
  ```tsx
  <Anchor component="button" onClick={() => scrollTo('hero')} className={classes.brand} underline="never">
    {content.name}
  </Anchor>
  ```
  with:
  ```tsx
  <Anchor href="#hero" onClick={(e) => { e.preventDefault(); scrollTo('hero'); }} className={classes.brand} underline="never">
    {content.name}
  </Anchor>
  ```

  Drawer links, replace:
  ```tsx
  <Anchor key={link.id} component="button" onClick={() => scrollTo(link.id)} underline="never">
    {link.label}
  </Anchor>
  ```
  with:
  ```tsx
  <Anchor key={link.id} href={`#${link.id}`} onClick={(e) => { e.preventDefault(); scrollTo(link.id); }} underline="never">
    {link.label}
  </Anchor>
  ```

- [ ] **Step 5: Verify**

  `npm run build`. In the browser:
  - Tab from the address bar — the skip link should appear at the top of the page on first Tab
  - Pressing Enter on the skip link should jump focus to the main content area
  - Right-click a nav link — "Open in new tab" should now be available
  - Visiting `http://localhost:5173/portfolio-2026/#resume` should scroll to the Resume section

- [ ] **Step 6: Commit**

  ```bash
  git add src/components/ChapterRail.tsx src/App.tsx src/styles/global.css src/components/NavBar.tsx
  git commit -m "a11y: fix aria-current, add skip link, convert nav buttons to anchor hrefs"
  ```

---

### Task 4: CSS fixes — `.tagline.out` and `scroll-margin-top`

Two CSS correctness fixes: an implicit specificity dependency in the Hero animation, and missing `scroll-margin-top` that causes smooth-scroll nav to land under the fixed header.

**Files:**
- Modify: `src/components/Hero.module.css`
- Modify: `src/styles/global.css`

- [ ] **Step 1: Fix `.tagline.out` in `Hero.module.css`**

  `.tagline.out` currently only sets `opacity: 0`, relying on the less-specific `.out` rule to supply `transform: translateY(16px)`. If class order or specificity ever changes, the tagline loses its starting position. Make the intent explicit.

  Change:
  ```css
  .tagline.out {
    opacity: 0;
  }
  ```
  to:
  ```css
  .tagline.out {
    opacity: 0;
    transform: translateY(16px);
  }
  ```

- [ ] **Step 2: Add `scroll-margin-top` to sections in `global.css`**

  Add this rule to `global.css` (after the `:root {}` block, before `* {}`):

  ```css
  section {
    scroll-margin-top: 64px;
  }
  ```

  This ensures smooth-scroll navigation lands with the section heading below the 64px fixed NavBar, not hidden beneath it.

- [ ] **Step 3: Verify**

  In the browser, click each nav link ("About", "Resume", "Contact"). The section heading should be clearly visible below the NavBar, not clipped behind it.
  On the Hero, reload the page and confirm the tagline still animates in (fade + slide up). Check that `prefers-reduced-motion` still suppresses the animation (DevTools → Rendering → Emulate CSS media feature).

- [ ] **Step 4: Commit**

  ```bash
  git add src/components/Hero.module.css src/styles/global.css
  git commit -m "fix: explicit tagline.out transform, add scroll-margin-top for fixed nav"
  ```

---

### Task 5: Resume section — bullet lists, button order, headshot `sizes`

Three content-area fixes: replace native `<ul>/<li>` (which Mantine's CSS normalizer can strip) with Mantine's `List`, move the Download Resume button above the timeline so recruiters find it immediately, and add a `sizes` attribute to the headshot so browsers download the right srcset variant.

**Files:**
- Modify: `src/components/Resume.tsx`
- Modify: `src/content.ts`

- [ ] **Step 1: Update `Resume.tsx` — Mantine `List` and button position**

  Replace the full `Resume.tsx` content with:

  ```tsx
  import { Badge, Button, Container, Group, List, Text, Timeline, Title } from '@mantine/core';
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

          <Button
            component="a"
            href={content.resumeUrl}
            download
            leftSection={<IconDownload size={16} />}
            color="teal"
            mb="xl"
          >
            Download Resume
          </Button>

          <Timeline active={content.experience.length} bulletSize={16} lineWidth={2} color="teal">
            {content.experience.map((entry) => (
              <Timeline.Item key={`${entry.company}-${entry.startDate}`} title={entry.title}>
                <Text size="sm" c="dimmed" className={classes.dates}>
                  {entry.company} · {entry.startDate}–{entry.endDate}
                </Text>
                <List size="sm" mt="xs" className={classes.bullets}>
                  {entry.bullets.map((bullet) => (
                    <List.Item key={bullet}>{bullet}</List.Item>
                  ))}
                </List>
              </Timeline.Item>
            ))}
          </Timeline>
        </Container>
      </section>
    );
  }
  ```

- [ ] **Step 2: Add `.bullets` rule to `Resume.module.css`**

  Append to `src/components/Resume.module.css`:

  ```css
  .bullets {
    padding-left: 1rem;
  }
  ```

  This provides consistent left-indent for the list items within the Timeline's layout.

- [ ] **Step 3: Add `sizes` to the headshot in `content.ts`**

  In `src/content.ts`, update the `photo` object to add a `sizes` property:

  ```ts
  photo: {
    src: `${BASE}headshot-1x.jpg`,
    srcset: `${BASE}headshot-1x.jpg 1x, ${BASE}headshot-2x.jpg 2x, ${BASE}headshot-3x.jpg 3x, ${BASE}headshot-4x.jpg 4x`,
    width: '350',
    height: '341',
    loadingStrategy: 'lazy',
    sizes: '(max-width: 47.9375em) 100vw, 350px',
  },
  ```

- [ ] **Step 4: Verify**

  In the browser, scroll to Resume:
  - Download Resume button should appear immediately below the skill badges, before the job timeline
  - Job bullet points should render as a proper list with visible bullets and consistent indent, aligned within the Timeline layout
  - DevTools → Network → filter by Img: reload on a 375px simulated viewport and confirm a smaller headshot image is fetched

- [ ] **Step 5: Commit**

  ```bash
  git add src/components/Resume.tsx src/components/Resume.module.css src/content.ts
  git commit -m "fix: Mantine List for resume bullets, move download button above timeline, add headshot sizes"
  ```

---

### Task 6: Add Twitter/X Card meta tags to `index.html`

LinkedIn reads OG tags (already present). Twitter/X requires its own `twitter:*` tags — without them, link previews on X are blank or minimal.

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Add Twitter Card meta tags to `index.html`**

  Add the following four lines immediately after the closing `</meta og:url>` tag (after line 14):

  ```html
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Vit Benton — Full-Stack Web Developer" />
  <meta name="twitter:description" content="Vit Benton is a full-stack web developer specializing in React and TypeScript. View background, experience, and ways to connect." />
  <meta name="twitter:image" content="https://vitbenton88.github.io/portfolio-2026/og-image.png" />
  ```

  The full `<head>` should now look like:

  ```html
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="%BASE_URL%favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vit Benton — Full-Stack Web Developer</title>
    <meta name="description" content="Vit Benton is a full-stack web developer specializing in React and TypeScript. View background, experience, and ways to connect." />

    <meta property="og:type" content="website" />
    <meta property="og:title" content="Vit Benton — Full-Stack Web Developer" />
    <meta property="og:description" content="Vit Benton is a full-stack web developer specializing in React and TypeScript. View background, experience, and ways to connect." />
    <meta property="og:image" content="https://vitbenton88.github.io/portfolio-2026/og-image.png" />
    <meta property="og:url" content="https://vitbenton88.github.io/portfolio-2026/" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Vit Benton — Full-Stack Web Developer" />
    <meta name="twitter:description" content="Vit Benton is a full-stack web developer specializing in React and TypeScript. View background, experience, and ways to connect." />
    <meta name="twitter:image" content="https://vitbenton88.github.io/portfolio-2026/og-image.png" />

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,700&family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&display=swap"
      rel="stylesheet"
    />
  </head>
  ```

  Note: both OG and Twitter images still point to `og-image.png`, which does not yet exist in `public/`. This task wires up the tags; creating the actual image is a separate task outside this plan (requires a screenshot of the deployed hero at 1200×630).

- [ ] **Step 2: Verify**

  Run `npm run build`. Inspect `dist/index.html` to confirm all four `twitter:*` tags appear in the built output.

- [ ] **Step 3: Commit**

  ```bash
  git add index.html
  git commit -m "seo: add Twitter/X Card meta tags"
  ```

---

## Self-Review

**Spec coverage:**
- ✅ Palette to `:root` (Task 1)
- ✅ Mantine granular CSS imports (Task 2)
- ✅ `aria-current` fix (Task 3)
- ✅ Skip-to-content link (Task 3)
- ✅ Nav `href` fix (Task 3)
- ✅ `.tagline.out` CSS bug (Task 4)
- ✅ `scroll-margin-top: 64px` (Task 4)
- ✅ Resume `<ul>` → Mantine `List` (Task 5)
- ✅ Download Resume button above timeline (Task 5)
- ✅ Headshot `sizes` attribute (Task 5)
- ✅ Twitter Card meta tags (Task 6)

**Not in scope (require content/design decisions):**
- `og-image.png` creation (needs a deployed screenshot)
- Hero CTA button (design decision — separate session)
- Email in Contact section (content decision — separate session)
- Headshot in Hero (design decision — separate session)

**Placeholder scan:** No TBDs or TODOs. All code blocks are complete.

**Type consistency:** `List` and `List.Item` are Mantine components — no custom types introduced. `sizes` field already exists on `ImageData` in `types.ts` and is forwarded by `Picture.tsx`.
