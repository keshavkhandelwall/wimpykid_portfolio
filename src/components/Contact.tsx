import Reveal from './Reveal';
import { portfolio } from '../data/portfolio';

export default function Contact() {
  return (
    <section id="contact" className="lined-bg">
      <Reveal className="section-title">
        <svg viewBox="0 0 48 48" fill="none">
          <rect x={4} y={10} width={40} height={28} rx={4} stroke="white" strokeWidth={2.5} />
          <path d="M4 14 L24 28 L44 14" stroke="white" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Say Hello!
      </Reveal>
      <div className="section-line"></div>
      <div className="contact-inner">
        <Reveal className="contact-text">
          Got a cool project?<br />
          A question?<br />
          Just want to chat?<br />
          <span style={{ opacity: 0.5, fontSize: '0.8em' }}>I don&apos;t bite.</span>
        </Reveal>
        <Reveal className="contact-links">
          <a href={`mailto:${portfolio.email}`} className="contact-link">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <rect x={2} y={4} width={18} height={14} rx={2} stroke="white" strokeWidth={2} />
              <path d="M2 6 L11 13 L20 6" stroke="white" strokeWidth={2} strokeLinecap="round" />
            </svg>
            {portfolio.email}
          </a>
          <a href={portfolio.social.github} className="contact-link" target="_blank" rel="noopener noreferrer">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <circle cx={11} cy={11} r={9} stroke="white" strokeWidth={2} />
              <path d="M8 17 C8 13 7 11 7 9 C7 7 8.5 5.5 11 5.5 C13.5 5.5 15 7 15 9 C15 11 14 13 14 17" stroke="white" strokeWidth={2} strokeLinecap="round" />
              <path d="M8 14 C6 14 5 13 5 11" stroke="white" strokeWidth={1.5} strokeLinecap="round" />
              <path d="M14 14 C16 14 17 13 17 11" stroke="white" strokeWidth={1.5} strokeLinecap="round" />
            </svg>
            GitHub
          </a>
          <a href={portfolio.social.linkedin} className="contact-link" target="_blank" rel="noopener noreferrer">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <rect x={2} y={2} width={18} height={18} rx={3} stroke="white" strokeWidth={2} />
              <line x1={7} y1={10} x2={7} y2={16} stroke="white" strokeWidth={2} strokeLinecap="round" />
              <circle cx={7} cy={7} r={1.5} fill="white" />
              <path d="M11 10 L11 16 M11 12 C11 10 16 9 16 13 L16 16" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            LinkedIn
          </a>
          <a href={portfolio.social.x} className="contact-link" target="_blank" rel="noopener noreferrer">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M4 16 L18 6 M4 6 L18 16" stroke="white" strokeWidth={2} strokeLinecap="round" />
              <circle cx={11} cy={11} r={9} stroke="white" strokeWidth={2} />
            </svg>
            Twitter / X
          </a>
        </Reveal>
      </div>
    </section>
  );
}