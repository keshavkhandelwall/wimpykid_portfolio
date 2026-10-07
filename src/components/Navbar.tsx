import { portfolio } from '../data/portfolio';

export default function Navbar() {
  return (
    <nav>
      <a href="#hero" className="logo">📓 {portfolio.siteTitle}</a>
      <ul>
        <li><a href="#about">About</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#skills">Skills</a></li>
        <li><a href="#interests">Interests</a></li>
        <li><a href="#contact">Contact</a></li>
        <li><a href={portfolio.resumeUrl} download style={{ border: '1.5px dashed var(--white)', padding: '3px 10px', borderRadius: '4px' }}>Resume 📥</a></li>
      </ul>
    </nav>
  );
}