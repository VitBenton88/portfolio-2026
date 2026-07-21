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
        <Anchor component="button" onClick={() => scrollTo('hero')} className={classes.brand} underline="never">
          {content.name}
        </Anchor>
        <Group gap="lg" visibleFrom="sm">
          {LINKS.map((link) => (
            <Anchor
              key={link.id}
              component="button"
              onClick={() => scrollTo(link.id)}
              underline="never"
              className={active === link.id ? classes.linkActive : classes.link}
            >
              {link.label}
            </Anchor>
          ))}
        </Group>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" aria-label="Toggle navigation" />
      </Group>
      <Drawer opened={opened} onClose={close} hiddenFrom="sm" padding="md" size="xs" title="Menu">
        <Stack>
          {LINKS.map((link) => (
            <Anchor key={link.id} component="button" onClick={() => scrollTo(link.id)} underline="never">
              {link.label}
            </Anchor>
          ))}
        </Stack>
      </Drawer>
    </header>
  );
}
