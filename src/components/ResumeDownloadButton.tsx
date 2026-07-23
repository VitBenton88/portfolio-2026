import { Button } from '@mantine/core';
import type { ButtonProps } from '@mantine/core';
import { IconDownload } from '@tabler/icons-react';
import { content } from '../content';

type ResumeDownloadButtonProps = Pick<ButtonProps, 'variant' | 'color' | 'className' | 'mt'>;

export function ResumeDownloadButton({ variant, color, className, mt }: ResumeDownloadButtonProps) {
  return (
    <Button
      component="a"
      href={content.resumeUrl}
      download="Vit-Benton-Resume.pdf"
      leftSection={<IconDownload size={18} />}
      variant={variant}
      color={color}
      mt={mt}
      size="md"
      className={className}
    >
      Download Resume
    </Button>
  );
}
