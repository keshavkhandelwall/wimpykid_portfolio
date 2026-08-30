import Reveal from './Reveal';

export default function About() {
  const quickFacts = [
    "Based in Jaipur, India",
    "Calls himself protagonist",
    "treats leetcode like his dead wife ",
    "Known to drink too much adrak wali chai",
    "Has 18+ unfinished side projects (jk,lol)",
    "Open to cool opportunities"
  ];

  return (
    <section id="about" className="lined-bg">
      <Reveal className="section-title">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <svg viewBox="0 0 48 48" fill="none" style={{ width: '48px', height: '48px' }}>
            <circle cx="24" cy="16" r="10" stroke="white" strokeWidth={2.5} />
            <path d="M6 42 C6 30 42 30 42 42" stroke="white" strokeWidth={2.5} strokeLinecap="round" />
          </svg>
          <span>About Me</span>
        </div>
      </Reveal>
      <div className="section-line"></div>
      <div className="about-grid">
        <Reveal className="about-text">
          <p>Hi! I'm a passionate developer and creative thinker who loves building things that actually work (most of the time). When I'm not debugging code at 2am, I'm probably sketching ideas in a notebook.</p>
          <p>A leader by heart, i love managing teams,learning new things quickly and adapting to any environment.</p>
          <p>I've worked on everything from tiny side projects to things that actually got used by real humans. Both are equally terrifying.</p>
        </Reveal>
        <Reveal className="notebook-box">
          <h3>Quick Facts 📋</h3>
          <ul className="fact-list">
            {quickFacts.map((fact, index) => (
              <li key={index}>{fact}</li>
            ))}
          </ul>
        </Reveal>
      </div>

      {/* doodle floaters */}
      <svg className="doodle-float" style={{ top: '10%', right: '2%', width: '70px' }} viewBox="0 0 70 70" fill="none">
        <path d="M10 35 Q35 5 60 35 Q35 65 10 35Z" stroke="white" strokeWidth={2} />
      </svg>
      <svg className="doodle-float" style={{ bottom: '5%', left: '1%', width: '60px', animationDelay: '2s' }} viewBox="0 0 60 60" fill="none">
        <polygon points="30,4 56,52 4,52" stroke="white" strokeWidth={2} strokeLinejoin="round" />
      </svg>
    </section>
  );
}