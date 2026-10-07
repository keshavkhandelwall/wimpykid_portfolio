import { useEffect, useRef, useState } from 'react';
import './BookLoader.css';

// images the hero needs, fetched while the loader is up
const preload = ['/keshavwimpy.png', '/badges/protagonist-bottlecap.svg', '/badges/jaipur-postcard.svg', '/badges/certified-fresh-dev.svg', '/badges/learner-stamp.svg'];

const loadImage = (src: string) => new Promise<void>((resolve) => {
  const img = new Image();
  img.onload = img.onerror = () => resolve();
  img.src = src;
});

// a pencil scribble: tight zig-zags with a little wobble, drawn twice for density
const scribble = (() => {
  let seed = 7;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const pass = (offset: number) => {
    let d = `M${offset} ${2 + rand() * 3}`;
    for (let x = offset - 8; x < 400; x += 3.2 + rand() * 1.6) {
      // slanted strokes: down-left, then back up to the right
      d += ` L${(x + rand() * 2).toFixed(1)} ${(21 + rand() * 4).toFixed(1)} L${(x + 7 + rand() * 2).toFixed(1)} ${(1 + rand() * 4).toFixed(1)}`;
    }
    return d;
  };
  return [pass(0), pass(1.6)];
})();

interface Props {
  minDuration?: number;
  // draw it on a page of the book instead of over the whole screen
  inline?: boolean;
  onDone: () => void;
}

export default function BookLoader({ minDuration = 2200, inline = false, onDone }: Props) {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const doneRef = useRef(onDone);

  useEffect(() => {
    doneRef.current = onDone;
  });

  useEffect(() => {
    let frame = 0;
    let ready = false;
    const start = performance.now();
    Promise.all([...preload.map(loadImage), document.fonts?.ready]).then(() => { ready = true; });

    const tick = (now: number) => {
      const t = Math.min((now - start) / minDuration, 1);
      // ease out, and hold at 92% until the assets are in
      const eased = 1 - (1 - t) ** 2;
      const p = ready ? eased : Math.min(eased, 0.92);
      setProgress(p);
      if (p >= 1) {
        setLeaving(true);
        window.setTimeout(() => doneRef.current(), 550);
        return;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [minDuration]);

  return (
    <div className={`book-loader${inline ? ' inline' : ''}${leaving ? ' leaving' : ''}`} role="status" aria-label={`Loading, ${Math.round(progress * 100)}%`}>
      <div className="loader-box">
        <div className="loader-bar">
          <div className="loader-fill" style={{ width: `${progress * 100}%` }}>
            <svg viewBox="0 0 400 26" preserveAspectRatio="none" aria-hidden="true">
              {scribble.map((d) => <path key={d} d={d} />)}
            </svg>
          </div>
        </div>
        <p className="loader-text">
          LOADING<span className="dot">.</span><span className="dot">.</span><span className="dot">.</span>
        </p>
        <span className="loader-shadow" aria-hidden="true" />
      </div>
    </div>
  );
}
