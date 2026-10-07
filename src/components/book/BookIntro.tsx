import { useEffect, useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { portfolio } from '../../data/portfolio';
import { chapters } from '../../data/chapters';
import './BookIntro.css';

type Stage = 'closed' | 'acknowledgements' | 'contents';

const FRONT = 24;

// fold any angle into (-180, 180]
const normalize = (deg: number) => {
  const n = ((deg % 360) + 360) % 360;
  return n > 180 ? n - 360 : n;
};
const showsBack = (deg: number) => Math.abs(normalize(deg)) > 90;
const clamp = (n: number, max: number) => Math.max(-max, Math.min(max, n));

const blurb = [
  'Life was easier before deadlines. Or was it?',
  `That’s the question ${portfolio.name} keeps asking himself as he ships one side project after another. But modern life has its conveniences, and ${portfolio.name} isn’t cut out for a world where he doesn’t build something cool.`,
  `With bugs piling up inside and outside the codebase, will ${portfolio.name} find a way to survive? Or is being the protagonist just too hard for a kid like ${portfolio.name}?`,
];

function Heading({ month, day }: { month: string; day: string }) {
  return (
    <>
      <h2 className="diary-month">{month}</h2>
      <p className="diary-day">{day}</p>
    </>
  );
}

export default function BookIntro() {
  const [stage, setStage] = useState<Stage>('closed');
  const [rot, setRot] = useState(FRONT);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [mode, setMode] = useState<'idle' | 'tracking' | 'dragging' | 'instant'>('idle');
  const drag = useRef<{ x: number; y: number; rot: number; moved: boolean } | null>(null);
  const navigate = useNavigate();

  const isOpen = stage !== 'closed';
  const isBack = !isOpen && showsBack(rot);

  const open = () => {
    // snap the angle back into one turn without animating, then open
    setMode('instant');
    setTilt({ x: 0, y: 0 });
    setRot((r) => normalize(r));
    requestAnimationFrame(() => requestAnimationFrame(() => {
      setMode('idle');
      setRot(0);
      setStage('acknowledgements');
    }));
  };

  const close = () => {
    setStage('closed');
    setRot(FRONT);
  };

  // turn whichever side isn't showing towards the reader
  const flip = () => setRot((r) => (showsBack(r) ? r - normalize(r) + FRONT : r + 132));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Enter') {
        if (stage === 'closed') open();
        else if (stage === 'acknowledgements') setStage('contents');
      } else if (e.key === 'ArrowLeft') {
        if (stage === 'contents') setStage('acknowledgements');
        else if (stage === 'acknowledgements') close();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (isOpen || (e.target as HTMLElement).closest('a, button')) return;
    drag.current = { x: e.clientX, y: e.clientY, rot, moved: false };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (isOpen) return;
    const d = drag.current;
    if (d) {
      const dx = e.clientX - d.x;
      const dy = e.clientY - d.y;
      if (!d.moved && Math.hypot(dx, dy) > 5) {
        d.moved = true;
        setMode('dragging');
      }
      if (d.moved) {
        setRot(d.rot + dx * 0.6);
        setTilt({ x: clamp(-dy * 0.12, 20), y: 0 });
      }
      return;
    }
    const box = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - box.left) / box.width - 0.5;
    const ny = (e.clientY - box.top) / box.height - 0.5;
    if (mode !== 'tracking') setMode('tracking');
    setTilt({ x: clamp(-ny * 16, 10), y: clamp(nx * 22, 12) });
  };

  const onPointerUp = () => {
    const d = drag.current;
    drag.current = null;
    if (!d) return;
    if (d.moved) {
      setMode('tracking');
    } else if (showsBack(rot)) {
      flip();
    } else {
      open();
    }
  };

  const onPointerLeave = () => {
    if (drag.current) return;
    setMode('idle');
    setTilt({ x: 0, y: 0 });
  };

  const transform = isOpen
    ? 'translateX(var(--open-x)) rotateX(10deg) rotateY(0deg)'
    : `translateX(0px) rotateX(${4 + tilt.x}deg) rotateY(${rot + tilt.y}deg)`;

  const hint = isOpen
    ? (stage === 'acknowledgements' ? 'click the page to turn it' : 'pick a chapter')
    : isBack
      ? 'drag to spin it · click to flip it back'
      : 'drag to spin it · click the cover to open';

  return (
    <main className="book-intro">
      <div className="book-floor-shadow" aria-hidden="true" />
      <div
        className={`intro-book stage-${stage} mode-${mode}${isBack ? ' shows-back' : ''}`}
        style={{ transform }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onPointerLeave={onPointerLeave}
      >
        {/* back cover, facing away from the reader */}
        <div className="book-back-cover">
          <span className="binding-tape" aria-hidden="true" />
          <div className="back-panel">
            <img src="/keshav-ink.png" alt="" />
            <span className="back-sign">BUGS FIXED<br />5¢</span>
          </div>
          <div className="back-blurb">
            {blurb.map((p) => <p key={p}>{p}</p>)}
          </div>
          <ul className="back-series" aria-label="Chapters">
            {chapters.map((chapter, i) => (
              <li key={chapter.path} style={{ ['--hue' as string]: `${i * 52}deg` }}>
                <Link to={chapter.path} tabIndex={isBack ? 0 : -1} title={chapter.title}>
                  <span className="mini-diary">DIARY</span>
                  <span className="mini-title">{chapter.title}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="back-footer">
            <div className="back-quote">
              <strong>“HILARIOUS!”</strong>
              <span>Mom, probably</span>
              <span className="back-url">github.com/keshavkhandelwall</span>
            </div>
            <div className="back-barcode" aria-hidden="true">
              <span className="isbn">ISBN 978-0-2005-PROTAG-1</span>
              <span className="bars" />
              <span className="isbn-num">9 780200 512345</span>
            </div>
          </div>
        </div>

        {/* paper edges */}
        <div className="book-edge book-edge-right" aria-hidden="true" />
        <div className="book-edge book-edge-top" aria-hidden="true" />
        <div className="book-edge book-edge-bottom" aria-hidden="true" />

        {/* spine */}
        <div className="book-spine" aria-hidden="true">
          <span className="spine-stitches" />
          <span className="spine-title">
            Diary <small>of a</small> <b>Protagonist</b>
          </span>
          <span className="spine-author">{portfolio.name}</span>
          <span className="spine-logo">K</span>
        </div>

        {/* the page you land on once everything is turned: contents */}
        <div className="intro-page diary-page intro-page-contents">
          <Heading month="CONTENTS" day="" />
          <ol className="contents-list">
            {chapters.map((chapter, i) => (
              <li key={chapter.path} style={{ transitionDelay: `${0.9 + i * 0.08}s` }}>
                <Link to={chapter.path} tabIndex={stage === 'contents' ? 0 : -1}>
                  <span className="contents-title">{chapter.title}</span>
                  <span className="contents-dots" aria-hidden="true" />
                  <span className="contents-num">{chapter.page}</span>
                </Link>
              </li>
            ))}
          </ol>
          <Link to="/about" className="contents-secret" tabIndex={stage === 'contents' ? 0 : -1}>
            P.S. there are secret pages. keep out!
          </Link>
          <span className="page-number">3</span>
        </div>

        {/* leaf 2: acknowledgements on the front, a comic page on the back */}
        <div
          className="intro-leaf intro-leaf-ack"
          onClick={() => stage === 'acknowledgements' && setStage('contents')}
          role={stage === 'acknowledgements' ? 'button' : undefined}
          tabIndex={stage === 'acknowledgements' ? 0 : -1}
          aria-label="Turn the page to the contents"
        >
          <div className="leaf-face leaf-front intro-page diary-page">
            <Heading month="ACKNOWLEDGEMENTS" day="Monday" />
            <div className="diary-text">
              <p>First of all, I&apos;d like to thank nobody, because I built this whole thing MYSELF.</p>
              <p>Okay fine. Thanks to Mom for the adrak wali chai, to Stack Overflow for basically raising me, and to every bug that showed up at 2am.</p>
              <p>And thanks to YOU, for opening this diary instead of closing the tab.</p>
            </div>
            <span className="turn-hint">turn the page →</span>
            <span className="page-number">1</span>
          </div>
          <div className="leaf-face leaf-back intro-page diary-page">
            <Heading month="OCTOBER" day="Tuesday" />
            <div className="diary-text">
              <p>Grown-ups are always telling me to &ldquo;build a portfolio&rdquo; like it&apos;s some kind of school project.</p>
              <p>But I think they&apos;re just jealous because MY generation gets to put a whole 3D book on the internet.</p>
            </div>
            <div className="comic-panel">
              <img src="/keshav-ink.png" alt="" />
              <span className="speech-bubble">WELCOME TO MY DIARY. DON&apos;T TOUCH ANYTHING!</span>
            </div>
            <span className="page-number left">2</span>
          </div>
        </div>

        {/* leaf 1: the cover on the front, the inside cover on the back */}
        <div
          className="intro-leaf intro-leaf-cover"
          onKeyDown={(e) => e.key === ' ' && stage === 'closed' && open()}
          role={stage === 'closed' ? 'button' : undefined}
          tabIndex={stage === 'closed' && !isBack ? 0 : -1}
          aria-label={`Open the diary of ${portfolio.name}`}
        >
          <div className="leaf-face leaf-front intro-cover">
            <span className="binding-tape" aria-hidden="true" />
            <h1 className="cover-heading">
              <span className="cover-diary">DIARY</span>
              <span className="cover-ofa">of a</span>
              <span className="cover-title">Protagonist</span>
            </h1>
            <span className="cover-subtitle">THE BUG HUNT</span>
            <span className="cover-sticker">THE<br />OFFICIAL<br />PORTFOLIO<br />OF {portfolio.name.toUpperCase()}</span>
            <div className="cover-panel">
              <img src="/keshav-ink.png" alt={`${portfolio.name}, drawn as a cartoon`} />
            </div>
            <span className="cover-author">{portfolio.name}</span>
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
      <div className="intro-actions">
        {!isOpen && (
          <button type="button" onClick={flip}>
            {isBack ? '↺ flip to the front' : '↻ flip it over'}
          </button>
        )}
        {isOpen && (
          <button type="button" onClick={close}>✕ close the book</button>
        )}
      </div>
      <button type="button" className="intro-skip" onClick={() => (stage === 'contents' ? navigate('/hello') : setStage('contents'))}>
        {stage === 'contents' ? 'just show me everything →' : 'skip intro →'}
      </button>
    </main>
  );
}
