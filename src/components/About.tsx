import { Container, Grid, Stack, Text, Title } from '@mantine/core';
import { content } from '../content';
import { Picture } from './Picture';
import classes from './About.module.css';

const BASE = import.meta.env.BASE_URL;

const photoSources = [
  {
    media: '(max-width: 47.9375em)' as const,
    srcset: `${BASE}headshot-mobile-1x.jpg 1x, ${BASE}headshot-mobile-2x.jpg 2x, ${BASE}headshot-mobile-3x.jpg 3x, ${BASE}headshot-mobile-4x.jpg 4x`,
  },
];

export function About() {
  return (
    <section id="about" className={classes.section}>
      <Container size="md">
        <Title order={2} className={classes.heading}>
          About
        </Title>
        <Grid gap="xl" align="start">
          <Grid.Col span={{ base: 12, sm: 4 }}>
            <Picture
              img={{ ...content.photo, alt: `Photo of ${content.name}` }}
              sources={photoSources}
              className={classes.photo}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 8 }}>
            <Stack gap="md" maw="65ch">
              {content.bio.map((paragraph) => (
                <Text key={paragraph} size="lg">
                  {paragraph}
                </Text>
              ))}
            </Stack>
          </Grid.Col>
        </Grid>
      </Container>
    </section>
  );
}
