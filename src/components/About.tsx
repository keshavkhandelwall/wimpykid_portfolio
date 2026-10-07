import Reveal from './Reveal';
import { portfolio } from '../data/portfolio';

export default function About() {

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
          {portfolio.about.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </Reveal>
        <Reveal className="notebook-box">
          <h3>Quick Facts 📋</h3>
          <ul className="fact-list">
            {portfolio.quickFacts.map((fact) => <li key={fact}>{fact}</li>)}
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