import { useEffect, useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import './KeshavDoodle.css';

// the drawing is cut into a body and a head layer (652 × 1336), so the head can turn on its own
const W = 652;
const H = 1336;
const NECK = { x: 320, y: 278 };
const EYES = [
  { x: 287.5, y: 187.5 },
  { x: 359.5, y: 178.5 },
];

const LINES = [
  'Hey! I said don’t touch anything!',
  'Okay, one more poke. Then I’m calling Mom.',
  'Fine. You can scroll now.',
  'Every bug here was fixed by me. Mostly.',
  'Stop! I just fixed my hair.',
];

interface Props {
  // first thing the speech bubble says
  greeting?: string;
  className?: string;
}

export default function KeshavDoodle({ greeting = 'Welcome to my diary. Don’t touch anything!', className = '' }: Props) {
  const [look, setLook] = useState({ x: 0, y: 0 });
  const [pokes, setPokes] = useState(0);
  const [hopping, setHopping] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  // the head turns a little towards the pointer, wherever it is on the page
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const box = root.current?.getBoundingClientRect();
      if (!box) return;
      const dx = (e.clientX - (box.left + box.width / 2)) / window.innerWidth;
      const dy = (e.clientY - (box.top + box.height * 0.18)) / window.innerHeight;
      setLook({ x: Math.max(-1, Math.min(1, dx * 2)), y: Math.max(-1, Math.min(1, dy * 2)) });
    };
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  const poke = (e: ReactPointerEvent) => {
    e.preventDefault();
    setPokes((n) => n + 1);
    setHopping(false);
    requestAnimationFrame(() => setHopping(true));
  };

  const line = pokes === 0 ? greeting : LINES[(pokes - 1) % LINES.length];

  return (
    <div ref={root} className={`keshav-doodle ${className}`}>
      <p className="keshav-bubble" key={pokes} aria-live="polite">{line}</p>
      <button
        type="button"
        className={`keshav-figure${hopping ? ' hop' : ''}`}
        onPointerDown={poke}
        onAnimationEnd={(e) => e.animationName === 'keshav-hop' && setHopping(false)}
        aria-label="Poke Keshav"
        style={{ aspectRatio: `${W} / ${H}` }}
      >
        <img className="keshav-body" src="/doodles/keshav-body.webp" alt="" draggable={false} />
        <span
          className="keshav-head"
          style={{
            transformOrigin: `${(NECK.x / W) * 100}% ${(NECK.y / H) * 100}%`,
            transform: `rotate(${look.x * 6}deg) translateY(${look.y * 4}px)`,
          }}
        >
          <img src="/doodles/keshav-head.webp" alt="" draggable={false} />
          {/* eyelids that close for a blink */}
          <svg className="keshav-lids" viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
            {EYES.map((eye) => (
              <g key={eye.x} transform={`translate(${eye.x} ${eye.y})`}>
                <ellipse rx="13" ry="16" />
                <path d="M-12 2 Q0 8 12 2" />
              </g>
            ))}
          </svg>
        </span>
      </button>
    </div>
  );
}
