export const portfolio = {
  name: 'Your Name',
  role: 'Protagonist · Developer · Learner',
  email: 'hello@example.com',
  location: 'Your City, Your Country',
  resumeUrl: '/resume.pdf',
  social: {
    github: 'https://github.com/your-username',
    linkedin: 'https://www.linkedin.com/in/your-username',
    x: 'https://x.com/your-username',
  },
  intro: 'I build thoughtful digital experiences and turn curious ideas into useful products.',
  diaryIntro: 'Welcome to my diary-esque portfolio. Explore my projects, skills, and the story behind the things I make.',
  quickFacts: [
    'Based in Your City, Your Country',
    'Building useful things, one sketch at a time',
    'Always learning something new',
    'Open to interesting opportunities',
  ],
} as const;

export const projects = [
  { num: '01', title: 'Project One', description: 'A short, outcome-focused description of your first project.', tags: ['React', 'TypeScript', 'API'] },
  { num: '02', title: 'Project Two', description: 'A second project that shows a different skill or kind of work.', tags: ['Node.js', 'Database', 'Design'] },
  { num: '03', title: 'Project Three', description: 'A final project that gives visitors a reason to get in touch.', tags: ['Product', 'Web', 'Creative'] },
] as const;
