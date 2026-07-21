import { useEffect, useRef, useState } from 'react';
import type { SectionId } from '../types';

export function useActiveSection(sectionIds: readonly SectionId[]): SectionId {
  const [active, setActive] = useState<SectionId>(sectionIds[0]);
  const ratios = useRef(new Map<SectionId, number>());
  // Tracks whether the document is currently scrolled to (or within a
  // couple pixels of) the bottom. Read by both the scroll handler and the
  // IntersectionObserver callback below so neither one can fight the
  // other's decision about whether the last section should be forced
  // active - see the comment near its declaration for why this is needed.
  const atBottomRef = useRef(false);
  const key = sectionIds.join(',');

  useEffect(() => {
    // Reset persisted ratios whenever the observed section set changes
    // (key changes) so stale entries from a previous section list can't
    // skew the "most visible" computation below.
    ratios.current.clear();
    atBottomRef.current = false;

    const lastId = sectionIds[sectionIds.length - 1];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratios.current.set(
            entry.target.id as SectionId,
            entry.isIntersecting ? entry.intersectionRatio : 0,
          );
        });

        let topId: SectionId | null = null;
        let topRatio = 0;
        ratios.current.forEach((ratio, id) => {
          if (ratio > topRatio) {
            topRatio = ratio;
            topId = id;
          }
        });

        // Bottom-of-page fallback: the observer's shrunk root
        // (rootMargin: '-40%' at the bottom) means a short last section
        // can never accumulate enough intersection ratio to cross even
        // the lowest threshold once there's no more room to scroll it
        // further into view. Meanwhile the *previous* section's ratio in
        // the map can go stale at a nonzero value (it only updates when
        // its ratio crosses a threshold boundary), so it would otherwise
        // keep "winning" this comparison forever. When we know from the
        // scroll handler that the page is at the bottom, force the last
        // id to win regardless of what the ratio map says.
        if (atBottomRef.current) {
          topId = lastId;
        }

        if (topId) {
          setActive(topId);
        }
      },
      { threshold: [0.3, 0.5, 0.7], rootMargin: '-64px 0px -40% 0px' },
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const handleScroll = () => {
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      atBottomRef.current = atBottom;
      if (atBottom) {
        setActive(lastId);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on mount in case the page loads already scrolled to the
    // bottom (e.g. a hash-link reload landing on the last section).
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
    // sectionIds is intentionally excluded: `key` is its stable string
    // representation, used so the effect doesn't re-run on every render
    // when callers pass a new array reference (e.g. an inline `.map()`).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return active;
}
