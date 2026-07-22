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
  bio: string[];
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
  bio: [
    "I'm a full-stack web developer based in South Florida who loves building robust, user-centered web applications. Over 14+ years, I've shipped everything from sleek marketing sites and e-commerce platforms to complex, data-driven SaaS and GovTech applications used by local governments across the U.S.",
    'My core is front-end engineering with React and TypeScript. Most recently I owned the front end for heavy, multi-step submission forms — dynamic per-jurisdiction validation, file uploads, and dashboards on both the user and processor sides — built with React Hook Form, Zod, Ant Design, and GraphQL. I also bring a solid backend foundation in Node.js, PHP, MySQL, and MongoDB, plus deep CMS experience with WordPress, Drupal, and Magento, and cloud deployment on AWS.',
    "Whether I'm leading front-end architecture, hardening UI flows with integration and unit tests, or driving accessibility (WCAG) refactors, I bring a product-focused mindset, a love for clean code, and a real commitment to cross-functional collaboration. I'm also leaning into AI-assisted development to prototype and move faster without cutting corners.",
    "I'm currently open to new front-end or full-stack roles (React/TypeScript), remote-friendly — if you're working on something ambitious and want a reliable, quality-minded engineer, let's connect.",
  ],
  photoUrl: `${BASE}profile.jpg`,
  skills: [
    'TypeScript',
    'JavaScript (ES6+)',
    'HTML5',
    'CSS3',
    'React.js',
    'React Native',
    'Vue.js',
    'React Hook Form',
    'Zod',
    'Ant Design',
    'Tailwind CSS',
    'Node.js',
    'PHP',
    'GraphQL',
    'REST APIs',
    'MySQL',
    'MongoDB',
    'AWS',
    'Git',
    'CI/CD',
    'Jest',
    'Cypress',
    'Figma',
    'Agile (Scrum/Kanban)',
    'Accessibility (WCAG)',
    'Web Performance',
    'AI-Assisted Development',
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
