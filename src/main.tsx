import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
// Self-hosted fonts: same weights the old Google Fonts request asked for,
// latin subset only (all site copy is latin; Bricolage has no per-subset
// file, but its unicode-ranges still limit downloads to latin).
import '@fontsource-variable/bricolage-grotesque/opsz.css';
import '@fontsource/ibm-plex-sans/latin-400.css';
import '@fontsource/ibm-plex-sans/latin-500.css';
import '@fontsource/ibm-plex-sans/latin-600.css';
import '@fontsource/ibm-plex-mono/latin-400.css';
import '@fontsource/ibm-plex-mono/latin-500.css';
// Only the Mantine styles for components this site renders (the full
// styles.css is ~250 KB). Order matters: dependencies come first. Add the
// matching file here when using a new Mantine component.
import '@mantine/core/styles/baseline.css';
import '@mantine/core/styles/default-css-variables.css';
import '@mantine/core/styles/global.css';
import '@mantine/core/styles/UnstyledButton.css';
import '@mantine/core/styles/VisuallyHidden.css';
import '@mantine/core/styles/Paper.css';
import '@mantine/core/styles/Overlay.css';
import '@mantine/core/styles/ModalBase.css';
import '@mantine/core/styles/CloseButton.css';
import '@mantine/core/styles/Drawer.css';
import '@mantine/core/styles/Text.css';
import '@mantine/core/styles/Anchor.css';
import '@mantine/core/styles/Title.css';
import '@mantine/core/styles/Group.css';
import '@mantine/core/styles/Stack.css';
import '@mantine/core/styles/Container.css';
import '@mantine/core/styles/Grid.css';
import '@mantine/core/styles/Badge.css';
import '@mantine/core/styles/Button.css';
import '@mantine/core/styles/Burger.css';
import '@mantine/core/styles/List.css';
import '@mantine/core/styles/Timeline.css';
import './styles/global.css';
import { cssVariablesResolver, theme } from './theme/theme';
import { App } from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={theme} cssVariablesResolver={cssVariablesResolver} forceColorScheme="light">
      <App />
    </MantineProvider>
  </StrictMode>,
);
