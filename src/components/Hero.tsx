import '../hero-badges.css';
import { Link } from 'react-router-dom';
import { portfolio } from '../data/portfolio';
import KeshavDoodle from './KeshavDoodle';

export default function Hero() {
  return (
    <section id="hero">
      {/* spiral notebook binding — left margin */}
      <div className="notebook-spiral" aria-hidden="true">
        {Array.from({ length: 10 }).map((_, i) => (
          <span key={i} className="spiral-ring" />
        ))}
      </div>

      {/* hand-drawn arrow pointing at name, with a scribbled star */}
      <svg className="hero-doodle doodle-arrow" style={{ top: '34%', left: '8%', width: '90px' }} viewBox="0 0 100 60" fill="none">
        <path d="M4 8 C 40 4, 70 20, 90 48" stroke="white" strokeWidth={2} strokeLinecap="round" />
        <path d="M78 40 L90 48 L80 54" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <svg className="hero-doodle doodle-star" style={{ top: '18%', right: '10%', width: '40px' }} viewBox="0 0 40 40" fill="none">
        <path d="M20 4 L23 17 L36 20 L23 23 L20 36 L17 23 L4 20 L17 17 Z" stroke="white" strokeWidth={1.5} strokeLinejoin="round" />
      </svg>

      {/* coffee ring stain, bottom-left, near desc text */}
      <svg className="hero-doodle doodle-stain" style={{ bottom: '18%', left: '4%', width: '110px' }} viewBox="0 0 110 110" fill="none">
        <circle cx={55} cy={55} r={48} stroke="white" strokeWidth={2} opacity={0.5} />
        <circle cx={55} cy={55} r={40} stroke="white" strokeWidth={1} opacity={0.3} />
      </svg>

      <h1 className="hero-title">Hey, I&apos;m<br /><span style={{ color: 'green' }}>{portfolio.name}</span></h1>
      <p className="hero-sub">{portfolio.role}</p>

      <div className="hero-info-grid">
        <p className="hero-info-text">{portfolio.intro}</p>
        <p className="hero-info-text">{portfolio.diaryIntro}</p>
        <div className="hero-info-action" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px' }}>
          <Link to="/projects" className="btn">See My Work →</Link>
          <a href={portfolio.resumeUrl} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'Caveat', cursive", fontSize: '18px', color: 'var(--white)', textDecoration: 'underline', textUnderlineOffset: '4px' }}>View my Resume</a>
        </div>
      </div>

      <div className="hero-keshav">
        <KeshavDoodle />
      </div>

      <div className="scroll-hint" style={{ marginTop: '40px', position: 'relative', bottom: 'auto' }}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 4 L10 16 M6 12 L10 16 L14 12" stroke="white" strokeWidth={2} strokeLinecap="round" />
        </svg>
        scroll down
      </div>
    </section>
  );
}
