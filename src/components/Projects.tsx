import Reveal from './Reveal';
import { projects } from '../data/portfolio';

export default function Projects() {

  return (
    <section id="projects">
      <Reveal className="section-title">
        <svg viewBox="0 0 48 48" fill="none">
          <rect x="6" y="10" width="36" height="28" rx="3" stroke="white" strokeWidth={2.5} />
          <path d="M16 22 L22 28 L32 18" stroke="white" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Projects
      </Reveal>
      <div className="section-line"></div>
      <div className="projects-grid">
        {projects.map((proj, i) => (
          <Reveal key={proj.num} className="project-card" delay={i * 80}>
            <div className="project-num">{proj.num}</div>
            <h3>{proj.title}</h3>
            <p>{proj.description}</p>
            <div>
              {proj.tags.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}