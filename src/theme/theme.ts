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
