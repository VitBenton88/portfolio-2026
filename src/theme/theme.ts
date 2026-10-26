import { createTheme } from '@mantine/core';
import type { CSSVariablesResolver } from '@mantine/core';

export const theme = createTheme({
  fontFamily: 'IBM Plex Sans, sans-serif',
  headings: { fontFamily: 'Bricolage Grotesque, sans-serif' },
  primaryColor: 'indigo',
});

export const cssVariablesResolver: CSSVariablesResolver = () => ({
  variables: {},
  light: { '--mantine-color-dimmed': 'var(--color-ink-muted)' },
  dark: {},
});
