export interface ExperienceEntry {
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  bullets: string[];
}

export interface SocialLink {
  label: 'LinkedIn' | 'GitHub';
  url: string;
}

export interface SiteContent {
  name: string;
  tagline: string;
  bio: string;
  photoUrl: string;
  skills: string[];
  experience: ExperienceEntry[];
  socialLinks: SocialLink[];
  resumeUrl: string;
}

const BASE = import.meta.env.BASE_URL;

export const content: SiteContent = {
  name: 'Jane Doe',
  tagline: 'Software engineer building things that work.',
  bio: 'Placeholder bio — replace with your real background, focus areas, and what you care about as an engineer.',
  photoUrl: `${BASE}profile.jpg`,
  skills: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'AWS', 'Python'],
  experience: [
    {
      title: 'Senior Software Engineer',
      company: 'Example Corp',
      startDate: '2022',
      endDate: 'Present',
      bullets: [
        'Placeholder bullet — replace with a real accomplishment with measurable impact.',
        'Placeholder bullet — replace with another concrete contribution.',
      ],
    },
    {
      title: 'Software Engineer',
      company: 'Prior Company',
      startDate: '2019',
      endDate: '2022',
      bullets: ['Placeholder bullet — replace with a real accomplishment with measurable impact.'],
    },
  ],
  socialLinks: [
    { label: 'LinkedIn', url: 'https://linkedin.com/in/yourprofile' },
    { label: 'GitHub', url: 'https://github.com/yourusername' },
  ],
  resumeUrl: `${BASE}resume.pdf`,
};
