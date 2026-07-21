import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import './styles/global.css';
import { theme } from './theme/theme';
import { palette } from './theme/palette';
import { App } from './App';

Object.entries(palette).forEach(([property, value]) => {
  document.documentElement.style.setProperty(property, value);
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={theme} defaultColorScheme="auto">
      <App />
    </MantineProvider>
  </StrictMode>,
);
