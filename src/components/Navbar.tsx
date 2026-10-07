import { Link, NavLink } from 'react-router-dom';
import { portfolio } from '../data/portfolio';

const links = [
  ['/about-me', 'About'],
  ['/projects', 'Projects'],
  ['/skills', 'Skills'],
  ['/interests', 'Interests'],
  ['/contact', 'Contact'],
] as const;

export default function Navbar() {
  return (
    <nav>
      <Link to="/" className="logo">📓 {portfolio.siteTitle}</Link>
      <ul>
        {links.map(([to, label]) => <li key={to}><NavLink to={to}>{label}</NavLink></li>)}
        <li><a href={portfolio.resumeUrl} download style={{ border: '1.5px dashed var(--white)', padding: '3px 10px', borderRadius: '4px' }}>Resume 📥</a></li>
      </ul>
    </nav>
  );
}
