import { useEffect, useState } from 'react';
import type { SectionId } from '../types';

// Distance (px) from the top of the viewport that counts as "reached" a
// section. Roughly the sticky nav's height plus a little breathing room.
const ACTIVATION_LINE = 96;

export function useActiveSection(sectionIds: readonly SectionId[]): SectionId {
  const [active, setActive] = useState<SectionId>(sectionIds[0]);
  const key = sectionIds.join(',');

  useEffect(() => {
    const lastId = sectionIds[sectionIds.length - 1];

    // Position-based scrollspy: the active section is the last one (in DOM
    // order) whose top has scrolled above the activation line. Unlike an
    // IntersectionObserver ratio comparison, this is agnostic to how tall
    // any given section is - a section several viewports tall activates
    // exactly the same way a short one does, because we only ever look at
    // where its *top* edge is, never how much of it is currently visible.
    const computeActive = (): SectionId => {
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom) return lastId;

      let current = sectionIds[0];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= ACTIVATION_LINE) {
          current = id;
        }
      }
      return current;
    };

    const handleScroll = () => setActive(computeActive());

    // Run once on mount in case the page loads already scrolled (e.g. a
    // hash-link reload landing mid-page or at the bottom).
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
    // sectionIds is intentionally excluded: `key` is its stable string
    // representation, used so the effect doesn't re-run on every render
    // when callers pass a new array reference (e.g. an inline `.map()`).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return active;
}
