import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { chapters } from '../data/chapters';

export default function ChapterPage({ children }: { children: ReactNode }) {
  const { pathname, state } = useLocation();
  const fromBook = Boolean((state as { fromBook?: boolean } | null)?.fromBook);
  const index = chapters.findIndex((chapter) => chapter.path === pathname);
  const prev = chapters[index - 1];
  const next = chapters[index + 1];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className={fromBook ? 'arrived-from-book' : undefined}>
      {fromBook && <div className="arrive-flash" aria-hidden="true" />}
      <Navbar />
      <main>{children}</main>
      <div className="chapter-nav" role="navigation" aria-label="Chapters">
        {prev ? <Link to={prev.path}>← {prev.title}</Link> : <Link to="/">← back to the cover</Link>}
        <Link to="/" className="chapter-nav-contents">📓 contents</Link>
        {next ? <Link to={next.path}>{next.title} →</Link> : <span />}
      </div>
      <Footer />
    </div>
  );
}
