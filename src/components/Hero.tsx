import { useEffect, useState } from 'react';
import { Stack, Title, Text } from '@mantine/core';
import { content } from '../content';
import classes from './Hero.module.css';

export function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setLoaded(true), 50);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section id="hero" className={classes.hero}>
      <Stack gap="sm" align="center">
        <Title order={1} className={`${classes.name} ${loaded ? classes.in : classes.out}`}>
          {content.name}
        </Title>
        <Text size="xl" className={`${classes.tagline} ${loaded ? classes.in : classes.out}`}>
          {content.tagline}
        </Text>
      </Stack>
    </section>
  );
}
