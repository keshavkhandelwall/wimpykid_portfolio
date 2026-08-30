import Reveal from './Reveal';

interface Project {
  num: string;
  title: string;
  description: string;
  tags: string[];
}

export default function Projects() {
  const projects: Project[] = [
    {
      num: "01",
      title: "Sledgd",
      description: "Cricket commune build for the fans , of the fans and by the fans ",
      tags: ["React", "Node.js", "MongoDB", "Rest API's"]
    },
    {
      num: "02",
      title: "AccessRide",
      description: "Travelling made easy for disabled people",
      tags: ["Python", "Django", "PostgreSQL"]
    },
    {
      num: "03",
      title: "FleetPulse",
      description: "A real-time vehicle telemetry dashboard — live speed, fuel, engine diagnostics, and location feeds turned into maintenance alerts and driver behavior scores.",
      tags: ["React", "Node.js", "WebSocket"]
    }
  ];

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