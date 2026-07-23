import { Badge, Container, Group, List, Stack, Text, Timeline, Title } from '@mantine/core';
import { content } from '../content';
import { ResumeDownloadButton } from './ResumeDownloadButton';
import classes from './Resume.module.css';

export function Resume() {
  return (
    <section id="resume" className={classes.section}>
      <Container size="md">
        <Title order={2} className={classes.heading}>
          Resume
        </Title>

        <Stack gap="xs" mb="xl">
          {content.skills.map((group) => (
            <div key={group.category}>
              <Text size="xs" fw={600} tt="uppercase" c="dimmed" mb={6} className={classes.skillCategory}>
                {group.category}
              </Text>
              <Group gap="xs">
                {group.items.map((skill) => (
                  <Badge key={skill.name} variant="filled" color={skill.color} autoContrast className={classes.badge}>
                    {skill.name}
                  </Badge>
                ))}
              </Group>
            </div>
          ))}
        </Stack>

        <Timeline active={content.experience.length} bulletSize={16} lineWidth={2} color="teal">
          {content.experience.map((entry) => (
            <Timeline.Item key={`${entry.company}-${entry.startDate}`} title={entry.title}>
              <Text size="sm" c="dimmed" className={classes.dates}>
                {entry.company} · {entry.startDate}–{entry.endDate}
              </Text>
              <List size="sm" mt="xs" className={classes.bullets}>
                {entry.bullets.map((bullet) => (
                  <List.Item key={bullet}>{bullet}</List.Item>
                ))}
              </List>
            </Timeline.Item>
          ))}
        </Timeline>

        <ResumeDownloadButton color="teal" mt="xl" />
      </Container>
    </section>
  );
}
