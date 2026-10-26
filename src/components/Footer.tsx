import { Group, Text } from '@mantine/core';
import { IconBrandGithub, IconBrandLinkedin, IconBrandNpm } from '@tabler/icons-react';
import { content } from '../content';
import classes from './Footer.module.css';

const ICONS = {
  LinkedIn: IconBrandLinkedin,
  GitHub: IconBrandGithub,
  npm: IconBrandNpm,
} as const;

const YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className={classes.footer}>
      <Group justify="space-between" px="md">
        <Text size="sm">
          © {YEAR} {content.name}
        </Text>
        <Group component="ul" gap={0} className="list-reset">
          {content.socialLinks.map((link) => {
            const Icon = ICONS[link.label];
            return (
              <li key={link.label}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${link.label} (opens in new tab)`}
                  className={classes.iconLink}
                >
                  <Icon size={20} aria-hidden="true" />
                </a>
              </li>
            );
          })}
        </Group>
      </Group>
    </footer>
  );
}
