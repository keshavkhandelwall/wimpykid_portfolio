import Reveal from './Reveal';
import { portfolio } from '../data/portfolio';

export default function About() {
  return <section id="about" className="lined-bg">
    <Reveal className="section-title"><span>About Me</span></Reveal><div className="section-line" />
    <div className="about-grid"><Reveal className="about-text">
      <p>Hi! I&apos;m a passionate developer and creative thinker who loves building things that actually work (most of the time).</p>
      <p>I enjoy collaborating with kind people, learning quickly, and adapting to a new challenge.</p>
      <p>I&apos;ve worked on tiny experiments and products used by real humans. Both are equally exciting.</p>
    </Reveal><Reveal className="notebook-box"><h3>Quick Facts 📋</h3><ul className="fact-list">
      {portfolio.quickFacts.map((fact) => <li key={fact}>{fact}</li>)}
    </ul></Reveal></div>
  </section>;
}
