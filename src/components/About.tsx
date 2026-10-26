import { Container, Grid, Stack, Text, Title } from '@mantine/core';
import { content } from '../content';
import { Picture } from './Picture';
import type { PictureSource } from '../types';
import classes from './About.module.css';

const BASE = import.meta.env.BASE_URL;

const PHOTO_WIDTHS = [350, 700, 1050, 1400];

const photoSrcset = (ext: string) =>
  PHOTO_WIDTHS.map((width) => `${BASE}headshot-${width}.${ext} ${width}w`).join(', ');

// Modern formats first; the <img> keeps the JPEG srcset as the fallback.
const photoSources: PictureSource[] = [
  { type: 'image/avif', srcset: photoSrcset('avif'), sizes: content.photo.sizes },
  { type: 'image/webp', srcset: photoSrcset('webp'), sizes: content.photo.sizes },
];

export function About() {
  return (
    <section id="about" className={classes.section} aria-labelledby="about-title">
      <Container size="md">
        <Title order={2} id="about-title" className={classes.heading}>
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
