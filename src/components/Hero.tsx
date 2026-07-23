import { useEffect, useState } from 'react';
import { Stack, Title, Text } from '@mantine/core';
import { content } from '../content';
import { ResumeDownloadButton } from './ResumeDownloadButton';
import classes from './Hero.module.css';

export function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setLoaded(true), 50);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section id="hero" className={classes.hero}>
      <Stack gap="lg" align="center">
        <Title order={1} className={`${classes.name} ${loaded ? classes.in : classes.out}`}>
          {content.name}
        </Title>
        <Text size="xl" className={`${classes.tagline} ${loaded ? classes.in : classes.out}`}>
          {content.tagline}
        </Text>
        <ResumeDownloadButton
          variant="white"
          className={`${classes.cta} ${loaded ? classes.in : classes.out}`}
        />
      </Stack>
    </section>
  );
}
