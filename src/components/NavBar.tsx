import { Anchor, Burger, Drawer, Group, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useActiveSection } from '../hooks/useActiveSection';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { content } from '../content';
import type { SectionId } from '../types';
import classes from './NavBar.module.css';

const LINKS: { id: SectionId; label: string }[] = [
  { id: 'about', label: 'About' },
  { id: 'resume', label: 'Resume' },
  { id: 'contact', label: 'Contact' },
];

const ALL_SECTION_IDS: SectionId[] = ['hero', 'about', 'resume', 'contact'];

export function NavBar() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const active = useActiveSection(ALL_SECTION_IDS);
  const prefersReducedMotion = usePrefersReducedMotion();

  const scrollTo = (id: SectionId) => {
    document.getElementById(id)?.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    close();
  };

  return (
    <header className={classes.header}>
      <Group justify="space-between" h="100%" px="md">
        <Anchor href="#hero" onClick={(e) => { e.preventDefault(); scrollTo('hero'); }} className={classes.brand} underline="never">
          {content.name}
        </Anchor>
        <Group component="nav" aria-label="Primary" gap="lg" visibleFrom="sm">
          {LINKS.map((link) => (
            <Anchor
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => { e.preventDefault(); scrollTo(link.id); }}
              underline="never"
              className={active === link.id ? classes.linkActive : classes.link}
              aria-current={active === link.id ? 'page' : undefined}
            >
              {link.label}
            </Anchor>
          ))}
        </Group>
        <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="sm"
          aria-label="Toggle navigation"
          aria-expanded={opened}
          aria-controls="mobile-nav"
        />
      </Group>
      <Drawer opened={opened} onClose={close} hiddenFrom="sm" padding="md" size="xs" title="Menu">
        <Stack id="mobile-nav" component="nav" aria-label="Primary">
          {LINKS.map((link) => (
            <Anchor
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => { e.preventDefault(); scrollTo(link.id); }}
              underline="never"
              aria-current={active === link.id ? 'page' : undefined}
            >
              {link.label}
            </Anchor>
          ))}
        </Stack>
      </Drawer>
    </header>
  );
}
