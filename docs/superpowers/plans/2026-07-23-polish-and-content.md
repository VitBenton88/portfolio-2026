# Polish & Content Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply 12 polish and content improvements across the portfolio: CSS fixes, Hero CTA button, grouped skill badges, and OG image update.

**Architecture:** All changes are isolated to existing files except one new `SkillGroup` type added to `content.ts`. No new components, no new dependencies. Tasks are ordered so each is independently reviewable — Task 3 (skill grouping) is the only one with a data-shape change that flows into a component.

**Tech Stack:** React 19, TypeScript 6, Mantine 9, CSS Modules, Vite 8

## Global Constraints

- No new npm dependencies
- No design changes beyond what is specified — do not alter colors, fonts, or layout outside the task scope
- `npm run build` must pass (tsc -b + vite build) after every task before committing
- Working directory: `/Users/vitbenton/Desktop/Repos/portfolio_2026`
- Commit messages must match exactly what the task specifies

---

### Task 1: CSS polish — seven one-liner fixes

Seven isolated CSS and prop changes. None affect component logic. All can be verified visually in the browser.

**Files:**
- Modify: `src/components/Hero.module.css`
- Modify: `src/components/ChapterRail.module.css`
- Modify: `src/components/Footer.module.css`
- Modify: `src/components/NavBar.module.css`
- Modify: `src/components/About.tsx`
- Modify: `src/components/About.module.css`
- Modify: `src/components/Resume.module.css`
- Modify: `src/components/Contact.module.css`

- [ ] **Step 1: Fix Hero `min-height` — `100vh` → `100svh`**

  In `src/components/Hero.module.css`, change:
  ```css
  .hero {
    min-height: 100vh;
  ```
  to:
  ```css
  .hero {
    min-height: 100svh;
  ```
  This makes the Hero fill the actual visible viewport on mobile browsers (excludes browser chrome height).

- [ ] **Step 2: Hide ChapterRail on mobile**

  Append to `src/components/ChapterRail.module.css`:
  ```css
  @media (max-width: 48em) {
    .rail {
      display: none;
    }
  }
  ```
  The 6px rail is invisible and untappable on small screens. Hiding it removes a WCAG 2.5.5 violation.

- [ ] **Step 3: Footer icon link hover state**

  Replace the existing `.iconLink` rule in `src/components/Footer.module.css` with:
  ```css
  .iconLink {
    color: var(--color-ink);
    display: inline-flex;
    transition: color 0.2s ease;
  }

  .iconLink:hover {
    color: var(--color-hero-indigo);
  }
  ```

- [ ] **Step 4: Nav active link — add `font-weight: 600` and `border-bottom`**

  In `src/components/NavBar.module.css`, replace the `.linkActive` rule with:
  ```css
  .linkActive {
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 600;
    color: var(--color-hero-indigo);
    border-bottom: 2px solid var(--color-hero-indigo);
    padding-bottom: 2px;
  }
  ```
  Note: weight 700 is NOT loaded in the Google Fonts URL — use 600 (which is loaded). The border-bottom provides a shape-based secondary indicator for color-blind users (WCAG 1.4.1).

- [ ] **Step 5: About bio — increase paragraph gap and constrain line length**

  In `src/components/About.tsx`, find the bio `Stack` and change both `gap` and add `maw`:
  ```tsx
  <Stack gap="md" maw="65ch">
    {content.bio.map((paragraph) => (
      <Text key={paragraph} size="lg">
        {paragraph}
      </Text>
    ))}
  </Stack>
  ```
  `maw="65ch"` constrains lines to ~65 characters — within the 60–80 char optimal reading range. `gap="md"` adds breathing room between paragraphs.

- [ ] **Step 6: Bump section `h2` heading sizes**

  The section headings use Mantine's default `Title order={2}` (~1.625rem) but sit inside `6rem` of vertical padding, making them feel small. Add explicit `font-size` to the `.heading` class in all three section CSS modules.

  In `src/components/About.module.css`, add `font-size` to `.heading`:
  ```css
  .heading {
    color: #995f00;
    margin-bottom: 2rem;
    font-size: 2rem;
  }
  ```

  In `src/components/Resume.module.css`, add `font-size` to `.heading`:
  ```css
  .heading {
    color: #0a7a56;
    margin-bottom: 2rem;
    font-size: 2rem;
  }
  ```

  In `src/components/Contact.module.css`, add `font-size` to `.heading`:
  ```css
  .heading {
    color: #b8226e;
    margin-bottom: 2rem;
    font-size: 2rem;
  }
  ```

- [ ] **Step 7: Build and verify**

  Run:
  ```bash
  npm run build
  ```
  Expected: clean build, no TypeScript or Vite errors.

  Start `npm run dev` and visually verify:
  - On mobile viewport (375px): ChapterRail is hidden, Hero fills visible viewport
  - Desktop: active nav link has both color AND a bottom border underline
  - Footer: hovering LinkedIn/GitHub icons changes color to indigo
  - About: bio text has more space between paragraphs and wraps before ~65 chars
  - About/Resume/Contact headings appear visibly larger

- [ ] **Step 8: Commit**

  ```bash
  git add \
    src/components/Hero.module.css \
    src/components/ChapterRail.module.css \
    src/components/Footer.module.css \
    src/components/NavBar.module.css \
    src/components/About.tsx \
    src/components/About.module.css \
    src/components/Resume.module.css \
    src/components/Contact.module.css
  git commit -m "polish: css fixes — svh, mobile rail, footer hover, nav active, about spacing, heading sizes"
  ```

---

### Task 2: Hero CTA button — Download Resume

Adds a "Download Resume" button below the tagline in the Hero section. The button links directly to `content.resumeUrl` with a `download` attribute, consistent with the existing Resume section button.

**Files:**
- Modify: `src/components/Hero.tsx`
- Modify: `src/components/Hero.module.css`

- [ ] **Step 1: Update `Hero.tsx` to add the CTA button**

  Replace the full `src/components/Hero.tsx` with:

  ```tsx
  import { useEffect, useState } from 'react';
  import { Button, Stack, Title, Text } from '@mantine/core';
  import { IconDownload } from '@tabler/icons-react';
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
        <Stack gap="lg" align="center">
          <Title order={1} className={`${classes.name} ${loaded ? classes.in : classes.out}`}>
            {content.name}
          </Title>
          <Text size="xl" className={`${classes.tagline} ${loaded ? classes.in : classes.out}`}>
            {content.tagline}
          </Text>
          <Button
            component="a"
            href={content.resumeUrl}
            download
            leftSection={<IconDownload size={16} />}
            variant="white"
            size="md"
            className={`${classes.cta} ${loaded ? classes.in : classes.out}`}
          >
            Download Resume
          </Button>
        </Stack>
      </section>
    );
  }
  ```

  Changes from the original:
  - Added `Button` and `IconDownload` imports
  - Changed `Stack gap="sm"` to `gap="lg"` to give more space between name, tagline, and button
  - Added the `Button` after the tagline with `variant="white"` (white fill on the indigo background) and `download` attribute
  - The button gets the same `loaded ? classes.in : classes.out` fade-in treatment as the tagline, with an additional delay via `.cta` CSS

- [ ] **Step 2: Add `.cta` animation rules to `Hero.module.css`**

  Append to `src/components/Hero.module.css`:

  ```css
  .cta.out {
    opacity: 0;
    transform: translateY(16px);
  }

  .cta.in {
    opacity: 1;
    transition: opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s;
  }
  ```

  The `0.3s` delay staggers the button entry after the tagline (which uses `0.15s`): name at 0s, tagline at 0.15s, button at 0.3s.

- [ ] **Step 3: Build and verify**

  Run:
  ```bash
  npm run build
  ```
  Expected: clean build. Confirm `IconDownload` from `@tabler/icons-react` is already a dependency (it's used in `Resume.tsx`) — no new package needed.

  Start `npm run dev` and verify:
  - "Download Resume" button appears below the tagline in the Hero
  - Button is white (white fill, dark text) on the indigo gradient background
  - Button fades in after the tagline (small stagger)
  - Clicking the button triggers a PDF download (if `resume.pdf` exists in `public/`)

- [ ] **Step 4: Commit**

  ```bash
  git add src/components/Hero.tsx src/components/Hero.module.css
  git commit -m "feat: add Download Resume CTA button to Hero section"
  ```

---

### Task 3: Resume — grouped skill badges

Restructures `content.skills` from a flat `string[]` into grouped categories, and updates `Resume.tsx` to render each group with a label. The `SiteContent` interface in `content.ts` is updated to match.

**Files:**
- Modify: `src/content.ts` — new `SkillGroup` interface, restructured `skills` field
- Modify: `src/components/Resume.tsx` — render groups with category headings

**Interfaces:**
- Produces: `SkillGroup` type `{ category: string; items: string[] }` consumed by `Resume.tsx`

- [ ] **Step 1: Update `content.ts` — add `SkillGroup` type and restructure `skills`**

  In `src/content.ts`, add the `SkillGroup` interface after the `SocialLink` interface (around line 15), and update `SiteContent.skills` from `string[]` to `SkillGroup[]`. Then replace the `skills` data with grouped arrays.

  The full updated relevant section of `content.ts`:

  ```ts
  export interface SkillGroup {
    category: string;
    items: string[];
  }

  export interface SiteContent {
    name: string;
    tagline: string;
    bio: string[];
    photo: ImageData;
    skills: SkillGroup[];
    experience: ExperienceEntry[];
    socialLinks: SocialLink[];
    resumeUrl: string;
  }
  ```

  Replace the `skills` array in the `content` object with:

  ```ts
  skills: [
    {
      category: 'Core',
      items: ['TypeScript', 'JavaScript (ES6+)', 'HTML5', 'CSS3'],
    },
    {
      category: 'Frontend',
      items: ['React.js', 'React Native', 'Vue.js', 'React Hook Form', 'Zod', 'Ant Design', 'Tailwind CSS'],
    },
    {
      category: 'Backend',
      items: ['Node.js', 'PHP', 'GraphQL', 'REST APIs', 'MySQL', 'MongoDB', 'AWS'],
    },
    {
      category: 'Testing & Tools',
      items: ['Git', 'CI/CD', 'Jest', 'Cypress'],
    },
    {
      category: 'Craft & Process',
      items: ['Figma', 'Agile (Scrum/Kanban)', 'Accessibility (WCAG)', 'Web Performance', 'AI-Assisted Development'],
    },
  ],
  ```

- [ ] **Step 2: Update `Resume.tsx` — render skill groups**

  Replace the full `src/components/Resume.tsx` with:

  ```tsx
  import { Badge, Button, Container, Group, List, Stack, Text, Timeline, Title } from '@mantine/core';
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

          <Stack gap="xs" mb="xl">
            {content.skills.map((group) => (
              <div key={group.category}>
                <Text size="xs" fw={600} tt="uppercase" c="dimmed" mb={6} className={classes.skillCategory}>
                  {group.category}
                </Text>
                <Group gap="xs">
                  {group.items.map((skill) => (
                    <Badge key={skill} variant="light" color="teal" className={classes.badge}>
                      {skill}
                    </Badge>
                  ))}
                </Group>
              </div>
            ))}
          </Stack>

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

- [ ] **Step 3: Add `.skillCategory` rule to `Resume.module.css`**

  Append to `src/components/Resume.module.css`:

  ```css
  .skillCategory {
    letter-spacing: 0.05em;
  }
  ```

  This gives the category labels a subtle uppercase tracking to visually distinguish them from the badge content.

- [ ] **Step 4: Build and verify**

  Run:
  ```bash
  npm run build
  ```
  Expected: clean build with no TypeScript errors. The `SkillGroup` type is correctly consumed by `Resume.tsx` — TypeScript will catch any mismatch.

  Start `npm run dev` and scroll to Resume:
  - Skills section shows 5 labeled groups (Core, Frontend, Backend, Testing & Tools, Craft & Process)
  - Each group label is small, uppercase, dimmed
  - Badges within each group are teal as before
  - All 27 skills are present — verify count in browser

- [ ] **Step 5: Commit**

  ```bash
  git add src/content.ts src/components/Resume.tsx src/components/Resume.module.css
  git commit -m "feat: group resume skill badges by category"
  ```

---

### Task 4: OG image — point to headshot

Updates the `og:image` and `twitter:image` meta tags in `index.html` to reference the existing `headshot-4x.jpg` asset (already deployed to GitHub Pages) instead of the non-existent `og-image.png`. Changes `twitter:card` from `summary_large_image` (expects 2:1 landscape) to `summary` (expects square, matching the headshot's ~1:1 ratio).

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Update meta tags in `index.html`**

  In `index.html`, replace:
  ```html
  <meta property="og:image" content="https://vitbenton88.github.io/portfolio-2026/og-image.png" />
  ```
  with:
  ```html
  <meta property="og:image" content="https://vitbenton88.github.io/portfolio-2026/headshot-4x.jpg" />
  ```

  Replace:
  ```html
  <meta name="twitter:card" content="summary_large_image" />
  ```
  with:
  ```html
  <meta name="twitter:card" content="summary" />
  ```

  Replace:
  ```html
  <meta name="twitter:image" content="https://vitbenton88.github.io/portfolio-2026/og-image.png" />
  ```
  with:
  ```html
  <meta name="twitter:image" content="https://vitbenton88.github.io/portfolio-2026/headshot-4x.jpg" />
  ```

- [ ] **Step 2: Build and verify**

  Run:
  ```bash
  npm run build
  ```
  Expected: clean build.

  Open `dist/index.html` and confirm the three updated meta tag values appear correctly.

- [ ] **Step 3: Commit**

  ```bash
  git add index.html
  git commit -m "fix: point og:image and twitter:image to headshot, use summary card type"
  ```

---

## Self-Review

**Spec coverage:**
- ✅ `100vh` → `100svh` (Task 1)
- ✅ Hide ChapterRail on mobile (Task 1)
- ✅ Footer hover states (Task 1)
- ✅ Active nav: `font-weight: 600` + `border-bottom` (Task 1)
- ✅ About `gap="sm"` → `gap="md"` (Task 1)
- ✅ About `maw="65ch"` on bio Stack (Task 1)
- ✅ Section heading size bump to `2rem` (Task 1)
- ✅ Hero CTA "Download Resume" button (Task 2)
- ✅ Grouped skill badges with category labels (Task 3)
- ✅ OG image → headshot, twitter:card → summary (Task 4)

**Skipped (user decision):**
- Email in Contact — skip (spam concern)
- "Open to work" badge — skip for now
- OG image PNG creation — replaced with headshot reference

**Placeholder scan:** No TBDs. All code blocks are complete.

**Type consistency:** `SkillGroup` defined in Task 3 Step 1 (`content.ts`) and consumed in Task 3 Step 2 (`Resume.tsx`). The `items` field (not `skills`) is used consistently in both.
