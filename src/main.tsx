import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles/global.css';
import '@mantine/core/styles/baseline.css';
import '@mantine/core/styles/default-css-variables.css';
import '@mantine/core/styles/UnstyledButton.css';
import '@mantine/core/styles/VisuallyHidden.css';
import '@mantine/core/styles/Anchor.css';
import '@mantine/core/styles/Badge.css';
import '@mantine/core/styles/Burger.css';
import '@mantine/core/styles/Button.css';
import '@mantine/core/styles/Container.css';
import '@mantine/core/styles/ActionIcon.css';
import '@mantine/core/styles/CloseButton.css';
import '@mantine/core/styles/Overlay.css';
import '@mantine/core/styles/Paper.css';
import '@mantine/core/styles/ScrollArea.css';
import '@mantine/core/styles/ModalBase.css';
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
