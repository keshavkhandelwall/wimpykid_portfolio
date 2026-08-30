import '../hero-badges.css';
import { portfolio } from '../data/portfolio';

export default function Hero() {
  return (
    <section id="hero">
      <div className="notebook-spiral" aria-hidden="true">
        {Array.from({ length: 10 }).map((_, i) => <span key={i} className="spiral-ring" />)}
      </div>
      <h1 className="hero-title">Hey, I&apos;m<br /><span style={{ color: 'green' }}>{portfolio.name}</span></h1>
      <p className="hero-sub">{portfolio.role}</p>
      <div className="hero-info-grid">
        <p className="hero-info-text">{portfolio.intro}</p>
        <p className="hero-info-text">{portfolio.diaryIntro}</p>
        <div className="hero-info-action" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px' }}>
          <a href="#projects" className="btn">See My Work ↓</a>
          <a href={portfolio.resumeUrl} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'Caveat', cursive", fontSize: '18px', color: 'var(--white)', textDecoration: 'underline', textUnderlineOffset: '4px' }}>View my Resume</a>
        </div>
      </div>
      <div className="showcase-container"><div className="showcase-wrapper"><div className="hero-grid-capsule">
        <img src="/keshavwimpy.png" className="showcase-character" alt={`${portfolio.name}'s illustrated character`} />
        <img src="/badges/protagonist-bottlecap.svg" className="sticker-img sticker-bottlecap" alt={`Protagonist badge — ${portfolio.name}`} />
        <img src="/badges/jaipur-postcard.svg" className="sticker-img sticker-postcard" alt="Location postcard" />
        <img src="/badges/certified-fresh-dev.svg" className="sticker-img sticker-rating" alt="Developer badge" />
        <img src="/badges/learner-stamp.svg" className="sticker-img sticker-stamp" alt="Learner stamp" />
      </div><span className="badge-tape badge-tape-corner-tl" aria-hidden="true" /><span className="badge-tape badge-tape-corner-tr" aria-hidden="true" /></div></div>
    </section>
  );
}
