import type { ImageData } from './types';

export interface ExperienceEntry {
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  bullets: string[];
}

export interface SocialLink {
  label: 'LinkedIn' | 'GitHub' | 'npm';
  url: string;
}

export interface SkillGroup {
  category: string;
  items: { name: string; color: string }[];
}

export interface SiteContent {
  name: string;
  tagline: string;
  bio: string[];
  photo: ImageData;
  skills: SkillGroup[];
  experience: ExperienceEntry[];
  socialLinks: SocialLink[];
  resumeUrl: string;
}

const BASE = import.meta.env.BASE_URL;

export const content: SiteContent = {
  name: 'Vit Benton',
  tagline: 'Full-stack web developer specializing in React & TypeScript — 14+ years building for the web.',
  bio: [
    "I'm a full-stack web developer based in South Florida. Over 14+ years I've shipped marketing sites and e-commerce platforms, plus data-heavy SaaS and GovTech applications used by local governments across the U.S.",
    'My core is front-end engineering with React and TypeScript. Most recently I owned the front end for heavy, multi-step submission forms (dynamic per-jurisdiction validation, file uploads, and dashboards on both the user and processor sides) built with React Hook Form, Zod, Ant Design, and GraphQL. I also bring a solid backend foundation in Node.js, PHP, MySQL, and MongoDB, plus deep CMS experience with WordPress, Drupal, and Magento, and cloud deployment on AWS.',
    "I've led front-end architecture, hardened UI flows with integration and unit tests, and driven accessibility (WCAG) refactors. I care about clean code and work well across design, product, and engineering, and I'm leaning into AI-assisted development to prototype and move faster without cutting corners.",
    "I'm currently open to new front-end or full-stack roles (React/TypeScript), remote-friendly. If you're working on something ambitious and need a reliable engineer, reach out.",
  ],
  photo: {
    src: `${BASE}headshot-350.jpg`,
    srcset: `${BASE}headshot-350.jpg 350w, ${BASE}headshot-700.jpg 700w, ${BASE}headshot-1050.jpg 1050w, ${BASE}headshot-1400.jpg 1400w`,
    width: '350',
    height: '341',
    loadingStrategy: 'lazy',
    // Rendered width of the photo column: full width minus gutters on
    // mobile, a third of the container on tablet, capped at 282px.
    sizes: '(max-width: 47.9375em) calc(100vw - 6.25rem), (max-width: 63.9375em) calc((100vw - 11rem) / 3), 282px',
  },
  skills: [
    {
      category: 'Core',
      items: [
        { name: 'TypeScript', color: '#3178C6' },
        { name: 'JavaScript (ES6+)', color: '#F7DF1E' },
        { name: 'HTML5', color: '#E34F26' },
        { name: 'CSS3', color: '#1572B6' },
      ],
    },
    {
      category: 'Frontend',
      items: [
        { name: 'React.js', color: '#61DAFB' },
        { name: 'React Native', color: '#61DAFB' },
        { name: 'Vue.js', color: '#4FC08D' },
        { name: 'Next.js', color: '#000000' },
        { name: 'React Hook Form', color: '#EC5990' },
        { name: 'Zod', color: '#3068B7' },
        { name: 'Ant Design', color: '#0170FE' },
        { name: 'Tailwind CSS', color: '#06B6D4' },
      ],
    },
    {
      category: 'Backend',
      items: [
        { name: 'Node.js', color: '#339933' },
        { name: 'PHP', color: '#777BB4' },
        { name: 'Go', color: '#00ADD8' },
        { name: 'GraphQL', color: '#E10098' },
        { name: 'REST APIs', color: '#5B3DF5' },
        { name: 'MySQL', color: '#4479A1' },
        { name: 'MongoDB', color: '#47A248' },
        { name: 'AWS', color: '#FF9900' },
      ],
    },
    {
      category: 'Testing & Tools',
      items: [
        { name: 'Git', color: '#F05032' },
        { name: 'CI/CD', color: '#5B3DF5' },
        { name: 'Jest', color: '#C21325' },
        { name: 'Cypress', color: '#69D3A7' },
      ],
    },
    {
      category: 'Craft & Process',
      items: [
        { name: 'Figma', color: '#F24E1E' },
        { name: 'Agile (Scrum/Kanban)', color: '#5B3DF5' },
        { name: 'Accessibility (WCAG)', color: '#5B3DF5' },
        { name: 'Web Performance', color: '#5B3DF5' },
      ],
    },
    {
      category: 'AI-Assisted Development',
      items: [
        { name: 'Claude Code', color: '#D97757' },
        { name: 'MCP', color: '#5B3DF5' },
        { name: 'Subagents', color: '#5B3DF5' },
        { name: 'Custom Skills & Slash Commands', color: '#5B3DF5' },
        { name: 'Context Engineering', color: '#5B3DF5' },
        { name: 'Agentic Code Review', color: '#5B3DF5' },
        { name: 'Playwright MCP', color: '#2EAD33' },
        { name: 'LLM Feature Integration', color: '#5B3DF5' },
      ],
    },
  ],
  experience: [
    {
      title: 'Software Engineer',
      company: 'Alltus (Formerly Just Appraised Inc.)',
      startDate: 'Sep 2025',
      endDate: 'Jun 2026',
      bullets: [
        'Owned the front end for taxpayer- and processor-facing submission forms on a GovTech platform serving multiple U.S. county governments, using React, TypeScript, React Hook Form, Zod, and Ant Design over a GraphQL API.',
        'Extended the Node.js backend, updating SQL queries to supply the data the forms needed, finishing features end-to-end instead of handing off backend gaps.',
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
        'Led a Vue 2 to 3 migration: introduced TypeScript and Pinia, established typed contracts for micro-frontend compatibility, and reached ~90% test coverage across the migrated modules.',
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
        'Led remote front-end development with UI/UX designers under Scrum, delivering responsive web applications for startups and enterprise clients.',
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
        'Introduced React and modern JavaScript practices to the interactive team, moving projects toward component-based frontends.',
        'Developed full-stack web applications with PHP, Node.js, and MySQL, plus CMS builds on WordPress, Drupal, and Magento.',
        'Deployed and configured AWS EC2 servers and RDS databases for scalable client infrastructure.',
      ],
    },
    {
      title: 'Web Developer & Content Manager',
      company: 'OutstandingEyewear',
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
    { label: 'npm', url: 'https://www.npmjs.com/~vbenton' },
  ],
  resumeUrl: `${BASE}resume.pdf`,
};
