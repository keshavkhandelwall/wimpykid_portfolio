import Reveal from './Reveal';
import { projects } from '../data/portfolio';

export default function Projects() {
  return <section id="projects">
    <Reveal className="section-title">Projects</Reveal>
    <div className="section-line" />
    <div className="projects-grid">{projects.map((project, index) => <Reveal key={project.num} className="project-card" delay={index * 80}>
      <div className="project-num">{project.num}</div><h3>{project.title}</h3><p>{project.description}</p>
      <div>{project.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}</div>
    </Reveal>)}</div>
  </section>;
}
