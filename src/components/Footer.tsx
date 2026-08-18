import { Group, Text } from '@mantine/core';
import { IconBrandGithub, IconBrandLinkedin, IconBrandNpm } from '@tabler/icons-react';
import { content } from '../content';
import classes from './Footer.module.css';

const ICONS = {
  LinkedIn: IconBrandLinkedin,
  GitHub: IconBrandGithub,
  npm: IconBrandNpm,
} as const;

export function Footer() {
  return (
    <footer className={classes.footer}>
      <Group justify="space-between" px="md">
        <Text size="sm">
          © {new Date().getFullYear()} {content.name}
        </Text>
        <Group gap="sm">
          {content.socialLinks.map((link) => {
            const Icon = ICONS[link.label];
            return (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className={classes.iconLink}
              >
                <Icon size={20} />
              </a>
            );
          })}
        </Group>
      </Group>
    </footer>
  );
}
