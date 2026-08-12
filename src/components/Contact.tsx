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
      <div className={classes.blobField} aria-hidden="true">
        <div className={classes.blobCircle} />
        <svg
          className={classes.blobSvg}
          viewBox="0 0 456.693 403.543"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              id="contactBlobGradient"
              x1="0.188"
              y1="0.12"
              x2="0.821"
              y2="0.902"
              gradientUnits="objectBoundingBox"
            >
              <stop offset="0%" style={{ stopColor: 'var(--color-contact-magenta-bright)' }} />
              <stop offset="100%" style={{ stopColor: 'var(--color-contact-magenta)' }} />
            </linearGradient>
          </defs>
          <path
            fill="url(#contactBlobGradient)"
            d="M113.9,32c83.5-47.1,150-38.5,221.1,15.9c58.1,44.4,77,102,63,187
              c-26.2,102.9-97,166.6-172.3,166.3c-78.5-4.6-130.9-52.1-151.8-71.8C46.7,303.8-0.4,261.9,1,197.9c1.1-48.2,28.8-88.3,43.3-106.8
              C63.3,66.9,87,46.9,113.9,32z"
          />
        </svg>
      </div>
      <Container size="md" className={classes.content}>
        <Title order={2} className={classes.heading}>
          Contact
        </Title>
        <Group gap="md" justify="center">
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
                variant="white"
                color="var(--color-contact-magenta-deep)"
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
