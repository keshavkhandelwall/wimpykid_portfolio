import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './AboutPage.css';

function SafeImage({ src, alt, className, style }: { src: string; alt: string; className?: string; style?: React.CSSProperties }) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Reset loaded state when src changes
    setLoaded(false);
  }, [src]);

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      setLoaded(true);
    }
  }, [src]);

  return (
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      className={className}
      style={{
        ...style,
        display: loaded ? 'block' : 'none',
      }}
      onLoad={() => setLoaded(true)}
      onError={() => setLoaded(false)}
    />
  );
}

interface Track {
  title: string;
  yt: string;
}

const tracks: Track[] = [
  { title: 'Sweater Weather', yt: 'GCdkM6m_Fxk' },
  { title: 'Afraid', yt: 'u0tCl-lY1Oc' },
  { title: 'R.I.P. 2 My Youth', yt: 'b-5-eKFd6oE' },
  { title: 'W.D.Y.W.F.M.?', yt: 'LCuqR5TBIqA' },
  { title: 'Daddy Issues', yt: 'PYbmENFiAqU' },
  { title: 'Softcore', yt: 'k0yxPLEQaRE' },
];

interface Sticky {
  text: string;
  color: string;
}

interface PageData {
  side: 'left' | 'right';
  polaroidSlot: string;
  polaroidAlt: string;
  tilt: string;
  caption: string;
  heading: string;
  text: string;
  sticky: Sticky | null;
  stickers: string[];
}

const pages: PageData[] = [
  {
    side: 'left',
    polaroidSlot: 'photo-01.jpeg',
    polaroidAlt: 'Photo #1',
    tilt: '-3deg',
    caption: 'Once upon a time.\n(lies.)',
    heading: 'the beginning of the end',
    text: `He probably did not know he would end up becoming an engineer \n\nSpoiler: I was sleeping naked at that time.`,
    sticky: null,
    stickers: ['✏️', '⭐'],
  },
  {
    side: 'right',
    polaroidSlot: 'photo-02.jpeg',
    polaroidAlt: 'Photo #2',
    tilt: '2deg',
    caption: 'probably thinking about\ncode (or pizza)',
    heading: 'The origin story.',
    text: `It started when I first typed "Hello, World" and it actually worked. I stared at the screen for 10 seconds straight. Then I spent the next 6 hours breaking it and fixing it again.\n\nThat's basically what coding is.`,
    sticky: { text: 'NOTE TO SELF:\nnever skip sleep\nfor a deadline\n(I always skip it)', color: '' },
    stickers: ['🖥️'],
  },
  {
    side: 'left',
    polaroidSlot: 'photo-03.jpeg',
    polaroidAlt: 'Photo #3',
    tilt: '4deg',
    caption: 'peak debugging face',
    heading: 'Things I actually love.',
    text: `Building stuff that makes people go "oh that's actually useful." Also, dark mode. Always dark mode. Light mode is for people who want to summon a migraine.\n\nAlso coffee. So much coffee.`,
    sticky: { text: 'coffee count today:\n☕☕☕☕\n(it was a Monday)', color: 'blue' },
    stickers: ['☕', '🌙'],
  },
  {
    side: 'right',
    polaroidSlot: 'photo-04.jpeg',
    polaroidAlt: 'Photo #4',
    tilt: '-2deg',
    caption: 'existing, as one does',
    heading: 'The weird bits.',
    text: `I have a playlist for every mood including "4am and slightly unhinged" and "debugging at golden hour." The Neighbourhood goes on both.\n\nI once debugged a bug for 3 hours. It was a missing semicolon. I have not fully recovered.`,
    sticky: null,
    stickers: ['🎵', '🔍'],
  },
  {
    side: 'left',
    polaroidSlot: 'photo-05.jpeg',
    polaroidAlt: 'Photo #5',
    tilt: '-1deg',
    caption: 'somewhere nice.\ncan\'t remember where.',
    heading: 'What drives me.',
    text: `I want to build things that actually matter. Not just "works on my machine" things. Real, useful, thoughtful things.\n\nAlso I want to prove to my past self that the late nights were worth it. They were.`,
    sticky: { text: '★ goals:\n– ship cool stuff\n– learn always\n– eat more fruit', color: 'pink' },
    stickers: ['🚀'],
  },
  {
    side: 'right',
    polaroidSlot: 'photo-06.jpeg',
    polaroidAlt: 'Photo #6',
    tilt: '3deg',
    caption: 'this is the last page.\nfeel something.',
    heading: 'To whoever is reading this.',
    text: `Thanks for scrolling through my entire diary like a normal person. If you want to work together, say hello, or just tell me your favourite The Neighbourhood song — my inbox is open.\n\nThis is the end of the diary. There is no cheese at the end of this maze. Only my email.`,
    sticky: null,
    stickers: ['💌', '✨'],
  },
];

export default function AboutPage() {
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [turningDirection, setTurningDirection] = useState<'turning-next' | 'turning-prev' | null>(null);

  // Lock state
  const [isUnlocked, setIsUnlocked] = useState(() => sessionStorage.getItem('book_unlocked') === 'true');
  const [calcValue, setCalcValue] = useState('0');
  const [calcHistory, setCalcHistory] = useState('');
  const [isAccessGranted, setIsAccessGranted] = useState(false);

  // Music state
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.6);

  const ytPlayerRef = useRef<any>(null);
  const iframeContainerRef = useRef<HTMLDivElement>(null);

  const handleCalcKeyPress = (key: string) => {
    if (isAccessGranted) return;

    if (key === 'C') {
      setCalcValue('0');
      setCalcHistory('');
      return;
    }

    if (key === '=') {
      if (calcValue === '3107') {
        triggerUnlock();
        return;
      }
      try {
        const sanitized = (calcHistory + calcValue).replace(/[^0-9+\-*/.]/g, '');
        if (!sanitized) return;
        const result = new Function(`return ${sanitized}`)();
        const resultStr = String(result);
        if (resultStr === '3107') {
          triggerUnlock();
        } else {
          setCalcValue(resultStr);
          setCalcHistory('');
        }
      } catch (err) {
        setCalcValue('Error');
        setCalcHistory('');
      }
      return;
    }

    if (['+', '-', '*', '/'].includes(key)) {
      setCalcHistory(`${calcValue} ${key} `);
      setCalcValue('0');
      return;
    }

    if (key === '.') {
      if (!calcValue.includes('.')) {
        setCalcValue(calcValue + '.');
      }
      return;
    }

    const newVal = calcValue === '0' || calcValue === 'Error' ? key : calcValue + key;
    setCalcValue(newVal);

    if (newVal === '3107') {
      triggerUnlock();
    }
  };

  const triggerUnlock = () => {
    setIsAccessGranted(true);
    setCalcValue('ACCESS GRANTED');
    setCalcHistory('');
    setTimeout(() => {
      setIsUnlocked(true);
      sessionStorage.setItem('book_unlocked', 'true');
    }, 1200);
  };

  // Keyboard support for calculator
  useEffect(() => {
    if (isUnlocked) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (/[0-9]/.test(e.key)) {
        handleCalcKeyPress(e.key);
      } else if (['+', '-', '*', '/'].includes(e.key)) {
        handleCalcKeyPress(e.key);
      } else if (e.key === '.' || e.key === ',') {
        handleCalcKeyPress('.');
      } else if (e.key === 'Enter' || e.key === '=') {
        handleCalcKeyPress('=');
      } else if (e.key === 'Escape' || e.key === 'c' || e.key === 'C') {
        handleCalcKeyPress('C');
      } else if (e.key === 'Backspace') {
        setCalcValue(prev => {
          if (prev.length <= 1 || prev === 'Error') return '0';
          return prev.slice(0, -1);
        });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isUnlocked, calcValue, calcHistory, isAccessGranted]);

  // Load YouTube IFrame API
  useEffect(() => {
    // Check if the script is already loaded
    let script = document.getElementById('youtube-iframe-api-script');
    if (!script) {
      script = document.createElement('script');
      script.id = 'youtube-iframe-api-script';
      (script as HTMLScriptElement).src = 'https://www.youtube.com/iframe_api';
      document.head.appendChild(script);
    }

    // Set up global callback
    (window as any).onYouTubeIframeAPIReady = () => {
      initializePlayer();
    };

    // If API already loaded, initialize directly
    if ((window as any).YT && (window as any).YT.Player) {
      initializePlayer();
    }

    return () => {
      // Clean up player on unmount
      if (ytPlayerRef.current) {
        try {
          ytPlayerRef.current.destroy();
        } catch (e) {
          // ignore
        }
      }
    };
  }, []);

  const initializePlayer = () => {
    if (ytPlayerRef.current) return;

    const divId = 'yt-hidden-player';
    if (!document.getElementById(divId) && iframeContainerRef.current) {
      const div = document.createElement('div');
      div.id = divId;
      iframeContainerRef.current.appendChild(div);
    }

    try {
      ytPlayerRef.current = new (window as any).YT.Player(divId, {
        height: '0',
        width: '0',
        videoId: tracks[currentTrackIndex].yt,
        playerVars: {
          autoplay: 0,
          controls: 0,
          modestbranding: 1,
          rel: 0,
        },
        events: {
          onStateChange: (e: any) => {
            if (e.data === (window as any).YT.PlayerState.ENDED) {
              handleNextTrack();
            }
            if (e.data === (window as any).YT.PlayerState.PLAYING) {
              setIsPlaying(true);
            }
            if (
              e.data === (window as any).YT.PlayerState.PAUSED ||
              e.data === (window as any).YT.PlayerState.BUFFERING
            ) {
              setIsPlaying(false);
            }
          },
        },
      });
    } catch (err) {
      console.error('Error initializing YT Player:', err);
    }
  };

  // Sync volume
  useEffect(() => {
    if (ytPlayerRef.current && ytPlayerRef.current.setVolume) {
      ytPlayerRef.current.setVolume(Math.round(volume * 100));
    }
  }, [volume]);

  // Sync video source when track changes
  useEffect(() => {
    if (ytPlayerRef.current && ytPlayerRef.current.loadVideoById) {
      ytPlayerRef.current.loadVideoById(tracks[currentTrackIndex].yt);
      if (isPlaying) {
        ytPlayerRef.current.playVideo();
      } else {
        ytPlayerRef.current.pauseVideo();
      }
    }
  }, [currentTrackIndex]);

  const handlePlayPause = () => {
    if (!ytPlayerRef.current) return;
    if (isPlaying) {
      ytPlayerRef.current.pauseVideo();
      setIsPlaying(false);
    } else {
      ytPlayerRef.current.playVideo();
      setIsPlaying(true);
    }
  };

  const handlePrevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
  };

  const handleNextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
  };

  // Keyboard navigation for book
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isBookOpen) return;
      if (e.key === 'ArrowRight') {
        changePage(1);
      } else if (e.key === 'ArrowLeft') {
        changePage(-1);
      } else if (e.key === 'Escape') {
        closeBook();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isBookOpen, currentPageIndex]);

  const openBook = () => {
    setIsBookOpen(true);
    setCurrentPageIndex(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeBook = () => {
    setIsBookOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const changePage = (direction: number) => {
    const nextIdx = currentPageIndex + direction;
    if (nextIdx < 0 || nextIdx >= pages.length) return;

    setTurningDirection(direction === 1 ? 'turning-next' : 'turning-prev');
    setCurrentPageIndex(nextIdx);

    // Reset turning animation class after animation completes
    setTimeout(() => {
      setTurningDirection(null);
    }, 350);
  };

  const renderPolaroid = (page: PageData) => {
    return (
      <div className="polaroid" style={{ transform: `rotate(${page.tilt})` }}>
        <div className="tape"></div>
        <div className="polaroid-img">
          <SafeImage
            src={page.polaroidSlot}
            alt={page.polaroidAlt}
          />
          <div className="polaroid-placeholder">
            <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
              <rect x="4" y="10" width="48" height="38" rx="4" stroke="rgba(245,240,232,0.3)" strokeWidth="2" />
              <circle cx="28" cy="29" r="10" stroke="rgba(245,240,232,0.3)" strokeWidth="2" />
              <circle cx="28" cy="29" r="4" fill="rgba(245,240,232,0.15)" />
              <path d="M4 20 L16 30 L26 20 L36 32 L52 18" stroke="rgba(245,240,232,0.15)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="42" cy="16" r="4" stroke="rgba(245,240,232,0.3)" strokeWidth="2" />
            </svg>
            <span>add {page.polaroidAlt}</span>
          </div>
        </div>
        <div
          className="polaroid-caption"
          dangerouslySetInnerHTML={{ __html: page.caption.replace(/\n/g, '<br>') }}
        />
        <div className="tape right"></div>
      </div>
    );
  };

  const renderSticky = (sticky: Sticky | null) => {
    if (!sticky) return null;
    return (
      <div
        className={`sticky ${sticky.color}`}
        dangerouslySetInnerHTML={{ __html: sticky.text.replace(/\n/g, '<br>') }}
      />
    );
  };

  const renderStickers = (stickers: string[]) => {
    return stickers.map((s, idx) => (
      <span key={idx} style={{ fontSize: '22px', opacity: 0.6, margin: '0 4px' }}>
        {s}
      </span>
    ));
  };

  const holes = [80, 160, 240, 320].map((t) => (
    <div key={t} className="hole-punch" style={{ top: `${t}px` }} />
  ));

  const activePage = pages[currentPageIndex];
  const isLeft = activePage.side === 'left';
  const pageNum = currentPageIndex + 1;

  const leftPageContent = isLeft ? (
    <>
      {holes}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', width: '100%', paddingTop: '8px' }}>
        {renderPolaroid(activePage)}
        <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
          {renderStickers(activePage.stickers)}
        </div>
      </div>
      <span className="page-num">{pageNum}</span>
    </>
  ) : (
    <>
      {holes}
      <div className="page-content">
        <div className="page-heading">{activePage.heading}</div>
        {activePage.text.split('\n\n').map((paragraph, pIdx) => (
          <p
            key={pIdx}
            className="page-text"
            style={pIdx > 0 ? { marginTop: '14px' } : undefined}
            dangerouslySetInnerHTML={{ __html: paragraph.replace(/\n/g, '<br>') }}
          />
        ))}
      </div>
      {renderSticky(activePage.sticky)}
      <span className="page-num">{pageNum}</span>
    </>
  );

  const rightPageContent = !isLeft ? (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', width: '100%', paddingTop: '8px' }}>
        {renderPolaroid(activePage)}
        <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
          {renderStickers(activePage.stickers)}
        </div>
      </div>
      <span className="page-num" style={{ right: '24px' }}>{pageNum}</span>
    </>
  ) : (
    <>
      <div className="page-content">
        <div className="page-heading">{activePage.heading}</div>
        {activePage.text.split('\n\n').map((paragraph, pIdx) => (
          <p
            key={pIdx}
            className="page-text"
            style={pIdx > 0 ? { marginTop: '14px' } : undefined}
            dangerouslySetInnerHTML={{ __html: paragraph.replace(/\n/g, '<br>') }}
          />
        ))}
      </div>
      {renderSticky(activePage.sticky)}
      <span className="page-num" style={{ right: '24px' }}>{pageNum}</span>
    </>
  );

  if (!isUnlocked) {
    return (
      <div className="about-page-container">
        {/* NAV */}
        <nav className="about-nav">
          <Link to="/" className="about-nav-logo">📓 My Portfolio</Link>
          <Link to="/" className="about-nav-back">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12 4 L6 10 L12 16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back
          </Link>
        </nav>

        {/* CALCULATOR RETRO LOCK SCREEN */}
        <div className="calculator-lock-screen">
          <div className="calculator-wrapper">
            <div className="calculator-header">
              <div className="calculator-brand">K-CALC 3000</div>
              <div className="calculator-solar">
                <div className="solar-cell"></div>
                <div className="solar-cell"></div>
                <div className="solar-cell"></div>
                <div className="solar-cell"></div>
              </div>
            </div>
            
            <div className="calculator-display-container">
              <div className="calculator-history">{calcHistory}</div>
              <div className={`calculator-display-val ${isAccessGranted ? 'access-granted' : ''}`}>
                {calcValue}
              </div>
            </div>
            
            <div className="calculator-grid">
              <button className="calculator-key key-clear" onClick={() => handleCalcKeyPress('C')}>C</button>
              <button className="calculator-key key-op" onClick={() => handleCalcKeyPress('/')}>/</button>
              <button className="calculator-key key-op" onClick={() => handleCalcKeyPress('*')}>×</button>
              <button className="calculator-key key-op" onClick={() => handleCalcKeyPress('-')}>-</button>
              
              <button className="calculator-key key-num" onClick={() => handleCalcKeyPress('7')}>7</button>
              <button className="calculator-key key-num" onClick={() => handleCalcKeyPress('8')}>8</button>
              <button className="calculator-key key-num" onClick={() => handleCalcKeyPress('9')}>9</button>
              <button className="calculator-key key-op" onClick={() => handleCalcKeyPress('+')}>+</button>
              
              <button className="calculator-key key-num" onClick={() => handleCalcKeyPress('4')}>4</button>
              <button className="calculator-key key-num" onClick={() => handleCalcKeyPress('5')}>5</button>
              <button className="calculator-key key-num" onClick={() => handleCalcKeyPress('6')}>6</button>
              <button className="calculator-key key-num" onClick={() => handleCalcKeyPress('.')}>.</button>
              
              <button className="calculator-key key-num" onClick={() => handleCalcKeyPress('1')}>1</button>
              <button className="calculator-key key-num" onClick={() => handleCalcKeyPress('2')}>2</button>
              <button className="calculator-key key-num" onClick={() => handleCalcKeyPress('3')}>3</button>
              <button className="calculator-key key-num" onClick={() => handleCalcKeyPress('0')}>0</button>
              
              <button className="calculator-key key-equals" onClick={() => handleCalcKeyPress('=')}>=</button>
            </div>
          </div>
          
          <div className="calculator-hint">
            This area is restricted. Enter the <span>secret keyword</span> to unlock the diary.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="about-page-container">
      {/* NAV */}
      <nav className="about-nav">
        <Link to="/" className="about-nav-logo">📓 My Portfolio</Link>
        <Link to="/" className="about-nav-back">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12 4 L6 10 L12 16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </Link>
      </nav>

      {/* MUSIC PLAYER */}
      <div id="music-player">
        <div className="music-track">♪ Now Playing — The Neighbourhood</div>
        <div className="music-title">{tracks[currentTrackIndex].title}</div>
        <div className="music-controls">
          <button className="music-btn" onClick={handlePrevTrack} title="Previous">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <polygon points="15,3 5,9 15,15" fill="white" />
              <rect x="2" y="3" width="3" height="12" rx="1" fill="white" />
            </svg>
          </button>
          <button className="music-btn" onClick={handlePlayPause} title="Play / Pause">
            {!isPlaying ? (
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <polygon points="5,2 19,11 5,20" fill="white" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <rect x="4" y="2" width="5" height="18" rx="2" fill="white" />
                <rect x="13" y="2" width="5" height="18" rx="2" fill="white" />
              </svg>
            )}
          </button>
          <button className="music-btn" onClick={handleNextTrack} title="Next">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <polygon points="3,3 13,9 3,15" fill="white" />
              <rect x="13" y="3" width="3" height="12" rx="1" fill="white" />
            </svg>
          </button>
          <div className="music-waveform">
            {[...Array(7)].map((_, i) => (
              <div key={i} className={`wave-bar ${!isPlaying ? 'paused' : ''}`} />
            ))}
          </div>
          <input
            type="range"
            className="music-volume"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            title="Volume"
          />
        </div>
      </div>

      {/* Floating Music Notes */}
      <div className="music-note-float" style={{ left: '15%', bottom: '120px', animationDelay: '0s' }}>♩</div>
      <div className="music-note-float" style={{ left: '20%', bottom: '80px', animationDelay: '1.5s' }}>♪</div>
      <div className="music-note-float" style={{ left: '12%', bottom: '100px', animationDelay: '3s' }}>♫</div>

      {/* LANDING / CLOSED BOOK SECTION */}
      {!isBookOpen ? (
        <section id="landing">
          {/* bg doodles */}
          <svg className="bg-doodle" style={{ top: '12%', left: '4%', width: '100px' }} viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="2" strokeDasharray="8 5" />
            <circle cx="50" cy="50" r="18" stroke="white" strokeWidth="2" />
            <circle cx="50" cy="50" r="4" fill="white" />
          </svg>
          <svg className="bg-doodle" style={{ top: '20%', right: '5%', width: '120px' }} viewBox="0 0 120 120" fill="none">
            <path d="M10 60 Q60 10 110 60 Q60 110 10 60Z" stroke="white" strokeWidth="2" />
            <path d="M28 60 Q60 28 92 60 Q60 92 28 60Z" stroke="white" strokeWidth="1.5" />
          </svg>
          <svg className="bg-doodle" style={{ bottom: '20%', left: '3%', width: '80px' }} viewBox="0 0 80 80" fill="none">
            <polygon points="40,6 74,66 6,66" stroke="white" strokeWidth="2" strokeLinejoin="round" />
            <polygon points="40,20 62,56 18,56" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
          <svg className="bg-doodle" style={{ bottom: '15%', right: '4%', width: '90px' }} viewBox="0 0 90 90" fill="none">
            <rect x="10" y="10" width="70" height="70" rx="4" stroke="white" strokeWidth="2" />
            <rect x="22" y="22" width="46" height="46" rx="2" stroke="white" stroke-width="1.5" stroke-dasharray="5 4" />
            <circle cx="45" cy="45" r="10" stroke="white" stroke-width="2" />
          </svg>

          <h1 className="landing-title">My Story.</h1>
          <p className="landing-sub">click the diary to open it 👇</p>

          {/* 3D CLOSED BOOK */}
          <div id="book-closed" onClick={openBook}>
            <div className="book-3d-wrapper">
              {/* SPINE */}
              <div className="book-spine">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="spine-line" />
                ))}
              </div>

              {/* BACK COVER */}
              <div className="book-back">
                <div className="back-blurb-sketch">
                  <svg width="72" height="50" viewBox="0 0 72 50" fill="none">
                    <ellipse cx="20" cy="10" rx="6" ry="6" stroke="#333" strokeWidth="1.5" />
                    <line x1="20" y1="16" x2="20" y2="30" stroke="#333" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="20" y1="20" x2="12" y2="26" stroke="#333" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="20" y1="20" x2="28" y2="24" stroke="#333" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="20" y1="30" x2="15" y2="42" stroke="#333" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="20" y1="30" x2="25" y2="42" stroke="#333" strokeWidth="1.5" strokeLinecap="round" />
                    <rect x="30" y="28" width="30" height="18" rx="2" stroke="#333" strokeWidth="1.5" />
                    <line x1="28" y1="46" x2="62" y2="46" stroke="#333" strokeWidth="1.5" strokeLinecap="round" />
                    <rect x="33" y="31" width="24" height="12" rx="1" stroke="#333" strokeWidth="1" />
                    <text x="36" y="40" fontFamily="Patrick Hand,cursive" fontSize="5" fill="#555">SLEDGD</text>
                  </svg>
                </div>
                <div className="back-blurb-text">
                  <p>Is building a startup in college really worth it?</p>
                  <p>That's the question Keshav is asking himself as he juggles databases, cricket analytics, and deadlines — all at once.</p>
                  <p>But modern life has its conveniences, and Keshav isn't cut out for a world where he <em style={{ color: 'rgba(245,240,232,0.55)' }}>doesn't</em> ship something cool.</p>
                </div>
                <div className="back-series-strip">
                  {['#e8c44a', '#c0392b', '#2980b9', '#27ae60', '#8e44ad', '#e67e22', '#1abc9c', '#e74c3c', '#3498db', '#f39c12'].map((color, i) => (
                    <div key={i} className="back-series-book" style={{ background: color }} />
                  ))}
                </div>
                <div className="back-bottom-bar">
                  <div className="back-review">
                    <div className="back-review-quote">"Actually ships things."</div>
                    <div className="back-review-source">— his own git log</div>
                  </div>
                  <div className="back-barcode">
                    <div className="back-barcode-bars">
                      <span style={{ width: '1.5px' }}></span>
                      <span style={{ width: '1px', opacity: 0.4 }}></span>
                      <span style={{ width: '2px' }}></span>
                      <span style={{ width: '1px', opacity: 0.4 }}></span>
                      <span style={{ width: '1px' }}></span>
                      <span style={{ width: '2px', opacity: 0.5 }}></span>
                      <span style={{ width: '1.5px' }}></span>
                      <span style={{ width: '1px', opacity: 0.3 }}></span>
                      <span style={{ width: '2px' }}></span>
                      <span style={{ width: '1px', opacity: 0.4 }}></span>
                      <span style={{ width: '1.5px' }}></span>
                      <span style={{ width: '1px', opacity: 0.5 }}></span>
                      <span style={{ width: '1px' }}></span>
                      <span style={{ width: '2px' }}></span>
                      <span style={{ width: '1px', opacity: 0.4 }}></span>
                      <span style={{ width: '1.5px' }}></span>
                      <span style={{ width: '1px', opacity: 0.3 }}></span>
                      <span style={{ width: '2px' }}></span>
                      <span style={{ width: '1px' }}></span>
                    </div>
                    <div className="back-barcode-num">sledgd.io</div>
                  </div>
                </div>
              </div>

              {/* FRONT COVER */}
              <div className="book-cover">
                <div className="book-pages-peek"></div>
                <div className="book-cover-top">
                  <div className="book-cover-title">The Diary<br />of Keshav</div>
                  <div className="book-cover-sub">property of: K. Khandelwal<br />DO NOT READ (please read)</div>
                </div>
                <div className="cover-polaroid-slot">
                  <div className="cover-polaroid">
                    <div className="corner-tape tl"></div>
                    <div className="corner-tape tr"></div>
                    <div className="corner-tape bl"></div>
                    <div className="corner-tape br"></div>
                    <div className="cover-polaroid-img">
                      <SafeImage
                        src="/photo.jpeg"
                        alt="Keshav"
                      />
                      <div className="cover-polaroid-placeholder">
                        <svg width="40" height="40" viewBox="0 0 56 56" fill="none">
                          <rect x="4" y="10" width="48" height="38" rx="4" stroke="rgba(245,240,232,0.5)" strokeWidth="2" />
                          <circle cx="28" cy="29" r="10" stroke="rgba(245,240,232,0.5)" strokeWidth="2" />
                          <circle cx="28" cy="29" r="4" fill="rgba(245,240,232,0.2)" />
                          <circle cx="42" cy="16" r="4" stroke="rgba(245,240,232,0.5)" strokeWidth="2" />
                        </svg>
                        <span>your photo<br />goes here</span>
                      </div>
                    </div>
                    <div className="cover-polaroid-caption">me, probably.</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-hint">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 7 L8 11 L12 7" stroke="#888" strokeWidth="2" strokeLinecap="round" />
              </svg>
              tap to open
            </div>
          </div>
        </section>
      ) : (
        /* BOOK READER */
        <section id="book-reader" className="active">
          <div className="page-counter">Page {pageNum} of {pages.length}</div>
          <div className={`book-spread ${turningDirection || ''}`}>
            <div className="book-page left-page">{leftPageContent}</div>
            <div className="book-page right-page">{rightPageContent}</div>
          </div>
          <div className="spread-nav">
            <button className="spread-btn" onClick={() => changePage(-1)} disabled={currentPageIndex === 0}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M11 4 L5 9 L11 14" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
              Previous
            </button>
            <span className="spread-indicator">{pageNum} / {pages.length}</span>
            <button className="spread-btn" onClick={() => changePage(1)} disabled={currentPageIndex === pages.length - 1}>
              Next
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M7 4 L13 9 L7 14" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <button className="close-book-btn" onClick={closeBook}>✕ close book</button>
        </section>
      )}

      {/* Hidden container to hold YT Player iframe */}
      <div ref={iframeContainerRef} style={{ position: 'fixed', left: '-9999px', top: '-9999px' }} />
    </div>
  );
}
