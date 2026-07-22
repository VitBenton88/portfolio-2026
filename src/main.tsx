import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
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
