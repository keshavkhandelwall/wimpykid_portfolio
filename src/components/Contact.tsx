import Reveal from './Reveal';
import { portfolio } from '../data/portfolio';

const links = [
  ['GitHub', portfolio.social.github],
  ['LinkedIn', portfolio.social.linkedin],
  ['Twitter / X', portfolio.social.x],
] as const;

export default function Contact() {
  return <section id="contact" className="lined-bg">
    <Reveal className="section-title">Say Hello!</Reveal><div className="section-line" />
    <div className="contact-inner"><Reveal className="contact-text">Got a cool project?<br />A question?<br />Just want to chat?<br /><span style={{ opacity: 0.5, fontSize: '0.8em' }}>I don&apos;t bite.</span></Reveal>
      <Reveal className="contact-links"><a href={`mailto:${portfolio.email}`} className="contact-link">{portfolio.email}</a>
      {links.map(([label, href]) => <a key={label} href={href} className="contact-link" target="_blank" rel="noopener noreferrer">{label}</a>)}</Reveal>
    </div>
  </section>;
}
