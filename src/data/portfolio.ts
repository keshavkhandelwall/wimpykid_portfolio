export const portfolio = {
  name: 'Keshav',
  siteTitle: "Keshav's Diary",
  role: 'Protagonist · Engineer · Learner',
  email: 'keshavsun@gmail.com',
  location: 'Jaipur, India',
  resumeUrl: '/resume.pdf',
  social: {
    github: 'https://github.com/keshavkhandelwall',
    linkedin: 'https://linkedin.com',
    x: 'https://twitter.com',
  },
  intro: "I'm currently orchestrating experiences, building software, and playing around with code. A developer with passion for thoughtful design to create delightful products that scale.",
  diaryIntro: 'Welcome to my diaryesque portfolio! Explore my projects, skills, and the story of how I turn caffeine and bugs into functioning applications.',
  about: [
    "Hi! I'm a passionate developer and creative thinker who loves building things that actually work (most of the time). When I'm not debugging code at 2am, I'm probably sketching ideas in a notebook.",
    'A leader by heart, i love managing teams,learning new things quickly and adapting to any environment.',
    "I've worked on everything from tiny side projects to things that actually got used by real humans. Both are equally terrifying.",
  ],
  quickFacts: [
    'Based in Jaipur, India',
    'Calls himself protagonist',
    'treats leetcode like his dead wife ',
    'Known to drink too much adrak wali chai',
    'Has 18+ unfinished side projects (jk,lol)',
    'Open to cool opportunities',
  ],
} as const;

export const projects = [
  { num: '01', title: 'Sledgd', description: 'Cricket commune build for the fans , of the fans and by the fans ', tags: ['React', 'Node.js', 'MongoDB', "Rest API's"] },
  { num: '02', title: 'AccessRide', description: 'Travelling made easy for disabled people', tags: ['Python', 'Django', 'PostgreSQL'] },
  { num: '03', title: 'FleetPulse', description: 'A real-time vehicle telemetry dashboard — live speed, fuel, engine diagnostics, and location feeds turned into maintenance alerts and driver behavior scores.', tags: ['React', 'Node.js', 'WebSocket'] },
] as const;
