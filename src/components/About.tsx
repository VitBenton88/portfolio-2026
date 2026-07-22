import { Container, Grid, Stack, Text, Title } from '@mantine/core';
import { content } from '../content';
import { Picture } from './Picture';
import classes from './About.module.css';

export function About() {
  return (
    <section id="about" className={classes.section}>
      <Container size="md">
        <Title order={2} className={classes.heading}>
          About
        </Title>
        <Grid gap="xl" align="center">
          <Grid.Col span={{ base: 12, sm: 4 }}>
            <Picture img={{ ...content.photo, alt: `Photo of ${content.name}` }} className={classes.photo} />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 8 }}>
            <Stack gap="sm">
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
