import { Badge, Button, Container, Group, Text, Timeline, Title } from '@mantine/core';
import { IconDownload } from '@tabler/icons-react';
import { content } from '../content';
import classes from './Resume.module.css';

export function Resume() {
  return (
    <section id="resume" className={classes.section}>
      <Container size="md">
        <Title order={2} className={classes.heading}>
          Resume
        </Title>

        <Group gap="xs" mb="xl">
          {content.skills.map((skill) => (
            <Badge key={skill} variant="light" color="teal" className={classes.badge}>
              {skill}
            </Badge>
          ))}
        </Group>

        <Timeline active={content.experience.length} bulletSize={16} lineWidth={2} color="teal">
          {content.experience.map((entry) => (
            <Timeline.Item key={`${entry.company}-${entry.startDate}`} title={entry.title}>
              <Text size="sm" c="dimmed" className={classes.dates}>
                {entry.company} · {entry.startDate}–{entry.endDate}
              </Text>
              <ul>
                {entry.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </Timeline.Item>
          ))}
        </Timeline>

        <Button
          component="a"
          href={content.resumeUrl}
          download
          leftSection={<IconDownload size={16} />}
          color="teal"
          mt="xl"
        >
          Download Resume
        </Button>
      </Container>
    </section>
  );
}
