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
  name: 'Vit Benton',
  tagline: 'Full-stack web developer specializing in React & TypeScript — 14+ years building for the web.',
  bio: 'Full-stack web developer with 14+ years building for the web, specializing in front-end engineering with React and TypeScript. Experienced across SaaS, GovTech, e-commerce, and startups — comfortable owning features end-to-end, from UX and architecture through testing and delivery. Thrives both independently and on cross-functional teams while consistently meeting deadlines.',
  photoUrl: `${BASE}profile.jpg`,
  skills: [
    'TypeScript',
    'JavaScript (ES6+)',
    'React.js',
    'React Native',
    'Vue.js',
    'Node.js',
    'GraphQL',
    'REST APIs',
    'Tailwind CSS',
    'Ant Design',
    'Jest',
    'Cypress',
    'AWS',
    'CI/CD',
    'Figma',
    'Agile (Scrum/Kanban)',
  ],
  experience: [
    {
      title: 'Software Engineer',
      company: 'Just Appraised (GovTech)',
      startDate: 'Sep 2025',
      endDate: 'Jun 2026',
      bullets: [
        'Owned the front end for taxpayer- and processor-facing submission forms on a GovTech platform serving multiple U.S. county governments, using React, TypeScript, React Hook Form, Zod, and Ant Design over a GraphQL API.',
        'Hired onto a stalled three-county project with both front ends incomplete; led a full UX redesign and front-end re-architecture, delivering all jurisdiction requirements within three months.',
        "Introduced the team's first integration tests and substantially raised unit-test coverage, eliminating recurring cross-jurisdiction regressions.",
      ],
    },
    {
      title: 'Software Engineer II',
      company: 'JumpCloud',
      startDate: 'Feb 2022',
      endDate: 'Feb 2025',
      bullets: [
        'Built and enhanced medium-to-large web applications in React.js and Vue.js, shipping new features and refactoring legacy code to modern TypeScript standards.',
        'Enhanced authentication flows with multi-factor (MFA) and passwordless login, and contributed to a micro-frontend architecture.',
        'Built reusable, accessible UI components meeting WCAG standards and translated Figma designs into pixel-perfect, responsive interfaces.',
      ],
    },
    {
      title: 'Web Developer II',
      company: 'System Soft Technologies',
      startDate: 'Feb 2021',
      endDate: 'Feb 2022',
      bullets: [
        'Led remote front-end development with UI/UX designers under Scrum, delivering responsive, user-centric web applications for startups and enterprise clients.',
        'Built and maintained custom WordPress themes and implemented PHP back-end functionality with WordPress API integrations.',
        'Maintained an internal time-keeping tool in React and TypeScript; mentored junior developers through code reviews.',
      ],
    },
    {
      title: 'Web Developer & Designer',
      company: 'Battle Medialab',
      startDate: 'Dec 2017',
      endDate: 'Feb 2021',
      bullets: [
        'Led web projects across web, video, and design teams, handling task delegation and direct client communication.',
        'Developed full-stack web applications with React.js, Node.js, and MySQL, plus CMS builds on WordPress, Drupal, and Magento.',
        'Deployed and configured AWS EC2 servers and RDS databases for scalable client infrastructure.',
      ],
    },
    {
      title: 'Web Developer & Content Manager',
      company: 'OutstandingEyewear.com',
      startDate: 'Jun 2012',
      endDate: 'Dec 2017',
      bullets: [
        'Solely managed BigCommerce store operations including SEO, web design, inventory control, and customer account management.',
        'Customized HTML, CSS, and JavaScript to align design and functionality with brand identity, optimizing for conversion and search visibility.',
      ],
    },
  ],
  socialLinks: [
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/vit-benton/' },
    { label: 'GitHub', url: 'https://github.com/VitBenton88' },
  ],
  resumeUrl: `${BASE}resume.pdf`,
};
