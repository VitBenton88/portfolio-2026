import { Stack, Title, Text } from '@mantine/core';
import { content } from '../content';
import { ResumeDownloadButton } from './ResumeDownloadButton';
import classes from './Hero.module.css';

export function Hero() {
  return (
    <section id="hero" className={classes.hero} aria-labelledby="hero-title">
      <div className={classes.blobField} aria-hidden="true">
        <div className={classes.blobCircle} />
        <svg
          className={classes.blobSvg}
          viewBox="0 0 456.693 403.543"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              id="heroBlobGradient"
              x1="0.188"
              y1="0.12"
              x2="0.821"
              y2="0.902"
              gradientUnits="objectBoundingBox"
            >
              <stop offset="0%" style={{ stopColor: 'var(--color-hero-indigo-bright)' }} />
              <stop offset="100%" style={{ stopColor: 'var(--color-hero-indigo)' }} />
            </linearGradient>
          </defs>
          <path
            fill="url(#heroBlobGradient)"
            d="M113.9,32c83.5-47.1,150-38.5,221.1,15.9c58.1,44.4,77,102,63,187
              c-26.2,102.9-97,166.6-172.3,166.3c-78.5-4.6-130.9-52.1-151.8-71.8C46.7,303.8-0.4,261.9,1,197.9c1.1-48.2,28.8-88.3,43.3-106.8
              C63.3,66.9,87,46.9,113.9,32z"
          />
        </svg>
      </div>
      <Stack gap="lg" align="center" className={classes.content}>
        <Title order={1} id="hero-title" className={classes.name}>
          {content.name}
        </Title>
        <Text size="xl" className={classes.tagline}>
          {content.tagline}
        </Text>
        <ResumeDownloadButton
          variant="white"
          className={classes.cta}
        />
      </Stack>
    </section>
  );
}
