import { useEffect, useRef, useState } from 'react';
import type { SectionId } from '../types';

export function useActiveSection(sectionIds: readonly SectionId[]): SectionId {
  const [active, setActive] = useState<SectionId>(sectionIds[0]);
  const ratios = useRef(new Map<SectionId, number>());
  const key = sectionIds.join(',');

  useEffect(() => {
    // Reset persisted ratios whenever the observed section set changes
    // (key changes) so stale entries from a previous section list can't
    // skew the "most visible" computation below.
    ratios.current.clear();

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

    return () => observer.disconnect();
    // sectionIds is intentionally excluded: `key` is its stable string
    // representation, used so the effect doesn't re-run on every render
    // when callers pass a new array reference (e.g. an inline `.map()`).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return active;
}
