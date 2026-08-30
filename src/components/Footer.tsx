import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <p>
        Made with a sip of diet coke, late nights, and questionable life decisions &nbsp;·&nbsp; <span>{currentYear}</span>
      </p>
      <p style={{ marginTop: '8px', fontSize: '15px', opacity: 0.5 }}>
        Inspired by a book close to my heart: Diary of a Wimpy Kid
        <Link to="/about" className="secret-lock" title="Keep out!">🔒</Link>
      </p>
    </footer>
  );
}