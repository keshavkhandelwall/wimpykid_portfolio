import '../hero-badges.css';

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

      <h1 className="hero-title">Hey, I'm<br /><span style={{ color: 'green' }}>Keshav</span></h1>
      <p className="hero-sub">Protagonist · Engineer · Learner</p>

      <div className="hero-info-grid">
        <p className="hero-info-text">
          I'm currently orchestrating experiences, building software, and playing around with code. A developer with passion for thoughtful design to create delightful products that scale.
        </p>
        <p className="hero-info-text">
          Welcome to my diaryesque portfolio! Explore my projects, skills, and the story of how I turn caffeine and bugs into functioning applications.
        </p>
        <div className="hero-info-action" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px' }}>
          <a href="#projects" className="btn">See My Work ↓</a>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'Caveat', cursive", fontSize: '18px', color: 'var(--white)', textDecoration: 'underline', textUnderlineOffset: '4px' }}>View my Resume</a>
        </div>
      </div>

      <div className="showcase-container">
        <div className="showcase-wrapper">

          {/* torn-paper grid panel — flush on the left, jagged torn edge on the right */}
          <div className="hero-grid-capsule">
            <img
              src="/keshavwimpy.png"
              className="showcase-character"
              alt="Keshav Wimpy Character"
            />

            {/* Badge 1: Protagonist bottle cap */}
            <img
              src="/badges/protagonist-bottlecap.svg"
              className="sticker-img sticker-bottlecap"
              alt="Protagonist since 2005 — Keshav"
              title="My Design Philosophy"
            />

            {/* Badge 2: Jaipur postcard */}
            <img
              src="/badges/jaipur-postcard.svg"
              className="sticker-img sticker-postcard"
              alt="Greetings from Jaipur"
              title="Where I'm from"
            />

            {/* Badge 3: Certified Fresh Developer */}
            <img
              src="/badges/certified-fresh-dev.svg"
              className="sticker-img sticker-rating"
              alt="92% Certified Fresh Developer"
              title="Quality Assurance"
            />

            {/* Badge 4: Learner stamp */}
            <img
              src="/badges/learner-stamp.svg"
              className="sticker-img sticker-stamp"
              alt="Learner postage stamp"
              title="Always Learning"
            />
          </div>

          {/* duct tape strips pinning the page's top corners down —
              kept OUTSIDE .hero-grid-capsule so the clip-path torn shape doesn't cut them off */}
          <span className="badge-tape badge-tape-corner-tl" aria-hidden="true" />
          <span className="badge-tape badge-tape-corner-tr" aria-hidden="true" />

          {/* left side duct tape strips pinning the left edge of the page down */}
          <span className="page-tape-side page-tape-side-top" aria-hidden="true" />
          <span className="page-tape-side page-tape-side-mid" aria-hidden="true" />
          <span className="page-tape-side page-tape-side-bottom" aria-hidden="true" />

        </div>
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
