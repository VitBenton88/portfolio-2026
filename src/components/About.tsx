import { Container, Grid, Image, Stack, Text, Title } from '@mantine/core';
import { content } from '../content';
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
            <Image src={content.photoUrl} alt={`Photo of ${content.name}`} radius="md" />
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
