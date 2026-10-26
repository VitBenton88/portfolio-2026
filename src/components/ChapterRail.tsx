import type { CSSProperties } from 'react';
import type { SectionId } from '../types';
import classes from './ChapterRail.module.css';

const CHAPTERS: { id: SectionId; color: string; label: string }[] = [
  { id: 'hero', color: 'var(--color-hero-indigo)', label: 'Home' },
  { id: 'about', color: 'var(--color-about-amber)', label: 'About' },
  { id: 'resume', color: 'var(--color-resume-teal)', label: 'Resume' },
  { id: 'contact', color: 'var(--color-contact-magenta)', label: 'Contact' },
];

interface ChapterRailProps {
  active: SectionId;
}

export function ChapterRail({ active }: ChapterRailProps) {
  const activeIndex = CHAPTERS.findIndex((chapter) => chapter.id === active);

  return (
    <nav className={classes.rail} aria-label="Section progress">
      {CHAPTERS.map((chapter, index) => (
        <a
          key={chapter.id}
          href={`#${chapter.id}`}
          className={classes.segment}
          style={{
            '--segment-color':
              index <= activeIndex
                ? chapter.color
                : 'color-mix(in srgb, var(--color-ink) 20%, transparent)',
          } as CSSProperties}
          aria-label={`Jump to ${chapter.label}`}
          aria-current={chapter.id === active ? 'location' : undefined}
        />
      ))}
    </nav>
  );
}
