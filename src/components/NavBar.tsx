import { useState } from 'react';
import { Anchor, Burger, Drawer, Group, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useActiveSection } from '../hooks/useActiveSection';
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
  // Set when the drawer closes because a link was picked: the browser has
  // already moved to that section, so focus should stay there rather than
  // jump back to the burger (Escape and the close button still return it).
  const [jumpedToSection, setJumpedToSection] = useState(false);
  const active = useActiveSection(ALL_SECTION_IDS);

  return (
    <header className={classes.header}>
      <Group justify="space-between" h="100%" px="md">
        <Anchor href="#hero" className={classes.brand} underline="never">
          {content.name}
        </Anchor>
        <Group component="nav" aria-label="Primary" gap="lg" visibleFrom="sm">
          {LINKS.map((link) => (
            <Anchor
              key={link.id}
              href={`#${link.id}`}
              underline="never"
              className={active === link.id ? classes.linkActive : classes.link}
              aria-current={active === link.id ? 'location' : undefined}
            >
              {link.label}
            </Anchor>
          ))}
        </Group>
        <Burger
          opened={opened}
          onClick={() => {
            setJumpedToSection(false);
            toggle();
          }}
          hiddenFrom="sm"
          aria-label="Toggle navigation"
          aria-expanded={opened}
        />
      </Group>
      <Drawer
        opened={opened}
        onClose={close}
        hiddenFrom="sm"
        padding="md"
        size="xs"
        title="Menu"
        returnFocus={!jumpedToSection}
      >
        <Stack component="nav" aria-label="Primary">
          {LINKS.map((link) => (
            <Anchor
              key={link.id}
              href={`#${link.id}`}
              onClick={() => {
                setJumpedToSection(true);
                close();
              }}
              underline="never"
              aria-current={active === link.id ? 'location' : undefined}
            >
              {link.label}
            </Anchor>
          ))}
        </Stack>
      </Drawer>
    </header>
  );
}
