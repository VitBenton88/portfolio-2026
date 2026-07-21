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
