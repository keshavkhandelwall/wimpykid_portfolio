import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { portfolio } from '../../data/portfolio';
import { chapters } from '../../data/chapters';
import './BookIntro.css';

type Stage = 'closed' | 'acknowledgements' | 'contents';

export default function BookIntro() {
  const [stage, setStage] = useState<Stage>('closed');
  const navigate = useNavigate();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Enter' || e.key === ' ') {
        setStage((s) => (s === 'closed' ? 'acknowledgements' : 'contents'));
      } else if (e.key === 'ArrowLeft') {
        setStage((s) => (s === 'contents' ? 'acknowledgements' : 'closed'));
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const hint = {
    closed: 'click the cover to open',
    acknowledgements: 'click the page to turn it',
    contents: 'pick a chapter',
  }[stage];

  return (
    <main className="book-intro">
      <div className={`intro-book stage-${stage}`}>
        {/* the page you land on once everything is turned: contents */}
        <div className="intro-page intro-page-contents">
          <h2 className="intro-page-title">Contents</h2>
          <ol className="contents-list">
            {chapters.map((chapter, i) => (
              <li key={chapter.path} style={{ transitionDelay: `${0.9 + i * 0.08}s` }}>
                <Link to={chapter.path} tabIndex={stage === 'contents' ? 0 : -1}>
                  <span className="contents-doodle" aria-hidden="true">{chapter.doodle}</span>
                  <span className="contents-title">{chapter.title}</span>
                  <span className="contents-dots" aria-hidden="true" />
                  <span className="contents-num">{chapter.page}</span>
                </Link>
              </li>
            ))}
          </ol>
          <Link to="/about" className="contents-secret" tabIndex={stage === 'contents' ? 0 : -1}>
            🔒 secret pages (keep out!)
          </Link>
          <span className="page-number">iii</span>
        </div>

        {/* leaf 2: acknowledgements on the front, a doodle page on the back */}
        <div
          className="intro-leaf intro-leaf-ack"
          onClick={() => stage === 'acknowledgements' && setStage('contents')}
          role={stage === 'acknowledgements' ? 'button' : undefined}
          tabIndex={stage === 'acknowledgements' ? 0 : -1}
          aria-label="Turn the page to the contents"
        >
          <div className="leaf-face leaf-front intro-page">
            <h2 className="intro-page-title">Acknowledgements</h2>
            <div className="ack-body">
              <p>First of all, I&apos;d like to thank nobody, because I built this whole thing myself.</p>
              <p>Okay fine. Thanks to Mom for the endless adrak wali chai, to Stack Overflow for basically raising me, and to every bug that showed up at 2am and taught me something.</p>
              <p>And thanks to <em>you</em>, for opening this diary instead of closing the tab.</p>
              <p className="ack-sign">— {portfolio.name}</p>
            </div>
            <span className="turn-hint">turn the page →</span>
            <span className="page-number">ii</span>
          </div>
          <div className="leaf-face leaf-back intro-page">
            <div className="doodle-page">
              <img src="/keshavwimpy.png" alt="" />
              <p>this page was supposed to be blank but I got bored.</p>
            </div>
            <span className="page-number left">iv</span>
          </div>
        </div>

        {/* leaf 1: the cover on the front, the inside cover on the back */}
        <div
          className="intro-leaf intro-leaf-cover"
          onClick={() => stage === 'closed' && setStage('acknowledgements')}
          role={stage === 'closed' ? 'button' : undefined}
          tabIndex={stage === 'closed' ? 0 : -1}
          aria-label={`Open the diary of ${portfolio.name}`}
        >
          <div className="leaf-face leaf-front intro-cover">
            <div className="cover-label">
              <span className="cover-the">The</span>
              <span className="cover-title">Diary of {portfolio.name}</span>
              <span className="cover-tagline">a portfolio in doodles</span>
            </div>
            <img className="cover-character" src="/keshavwimpy.png" alt="" />
            <span className="cover-scribble" aria-hidden="true">DO NOT READ<br /><small>(please read)</small></span>
          </div>
          <div className="leaf-face leaf-back intro-page inside-cover">
            <p className="inside-property">This book is the property of:</p>
            <p className="inside-name">{portfolio.name}</p>
            <p className="inside-address">{portfolio.location}</p>
            <p className="inside-warning">If found, please return.<br />Reward: one (1) chai.</p>
          </div>
        </div>
      </div>

      <p className="intro-hint" aria-live="polite">{hint}</p>
      <button type="button" className="intro-skip" onClick={() => (stage === 'contents' ? navigate('/hello') : setStage('contents'))}>
        {stage === 'contents' ? 'just show me everything →' : 'skip intro →'}
      </button>
    </main>
  );
}
