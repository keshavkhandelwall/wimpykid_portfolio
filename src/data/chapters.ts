export interface Chapter {
  path: string;
  title: string;
  page: number;
  doodle: string;
}

export const chapters: Chapter[] = [
  { path: '/hello', title: "Hey, I'm Keshav", page: 1, doodle: '👋' },
  { path: '/about-me', title: 'About Me', page: 7, doodle: '✏️' },
  { path: '/projects', title: 'Stuff I Built', page: 23, doodle: '🛠️' },
  { path: '/skills', title: 'Things I Know', page: 58, doodle: '✅' },
  { path: '/interests', title: 'When I’m Not Coding', page: 71, doodle: '☕' },
  { path: '/contact', title: 'Say Hello!', page: 89, doodle: '✉️' },
];
