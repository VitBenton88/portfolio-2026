import { Button, Container, Group, Title } from '@mantine/core';
import { IconBrandGithub, IconBrandLinkedin } from '@tabler/icons-react';
import { content } from '../content';
import classes from './Contact.module.css';

const ICONS = {
  LinkedIn: IconBrandLinkedin,
  GitHub: IconBrandGithub,
} as const;

export function Contact() {
  return (
    <section id="contact" className={classes.section}>
      <Container size="md">
        <Title order={2} className={classes.heading}>
          Contact
        </Title>
        <Group gap="md">
          {content.socialLinks.map((link) => {
            const Icon = ICONS[link.label];
            return (
              <Button
                key={link.label}
                component="a"
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                leftSection={<Icon size={18} />}
                color="var(--color-contact-magenta)"
                variant="light"
                size="lg"
              >
                {link.label}
              </Button>
            );
          })}
        </Group>
      </Container>
    </section>
  );
}
