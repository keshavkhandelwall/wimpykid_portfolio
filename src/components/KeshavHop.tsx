import { useCallback, useEffect, useRef, useState } from 'react';
import KeshavRig from './KeshavRig';
import type { Pose } from './KeshavRig';
import './KeshavHop.css';

const SIZE = 78; // px, width of the little Keshav
const SPEED = 0.2; // px per ms while walking

interface Props {
  caption?: string;
  // the word lying on his path: he runs up to it and jumps over
  word: string;
}

// a Keshav who walks along the ground, jumps over a word lying in his way, and waves at the end
export default function KeshavHop({ caption = '', word }: Props) {
  const track = useRef<HTMLDivElement>(null);
  const wordEl = useRef<HTMLButtonElement>(null);
  const walker = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  const live = useRef(true);
  const [pose, setPose] = useState<Pose>('idle');
  const [back, setBack] = useState(false);

  useEffect(() => {
    live.current = true;
    return () => { live.current = false; };
  }, []);

  const run = useCallback(async () => {
    const box = track.current;
    const target = wordEl.current;
    const el = walker.current;
    if (!box || !target || !el || busy.current) return;
    busy.current = true;

    const left = box.getBoundingClientRect().left;
    const t = target.getBoundingClientRect();
    const mid = t.left + t.width / 2 - left - SIZE / 2;
    const gap = t.width / 2 + SIZE / 2 + 6;
    const startX = 0;
    const takeOff = Math.max(startX, mid - gap);
    const landing = Math.min(box.clientWidth - SIZE, mid + gap);
    const end = box.clientWidth - SIZE;

    const slide = (from: number, to: number) => el.animate(
      [{ transform: `translateX(${from}px)` }, { transform: `translateX(${to}px)` }],
      { duration: Math.max(1, Math.abs(to - from) / SPEED), easing: 'linear', fill: 'forwards' },
    ).finished;

    try {
      el.getAnimations().forEach((a) => a.cancel());
      setPose('walk');
      await slide(startX, takeOff);
      if (!live.current) return;
      // the jump is an arc over the word, and the rig squashes and tucks while it does
      setPose('jump');
      await el.animate(
        [
          { transform: `translate(${takeOff}px, 0)` },
          { transform: `translate(${(takeOff + landing) / 2}px, -${SIZE * 0.55}px)`, offset: 0.5 },
          { transform: `translate(${landing}px, 0)` },
        ],
        { duration: 750, easing: 'ease-in-out', fill: 'forwards' },
      ).finished;
      if (!live.current) return;
      setPose('walk');
      await slide(landing, end);
      if (!live.current) return;
      setPose('wave');
      await new Promise((r) => window.setTimeout(r, 1900));
      if (!live.current) return;
      // and back to where he started, turned around
      setBack(true);
      setPose('walk');
      await slide(end, startX);
      if (!live.current) return;
      setBack(false);
      setPose('idle');
      el.getAnimations().forEach((a) => a.cancel());
    } catch {
      // cancelled by a re-run or an unmount
    } finally {
      busy.current = false;
    }
  }, []);

  // starts by itself the first time the line scrolls into view
  useEffect(() => {
    const el = track.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        io.disconnect();
        window.setTimeout(run, 600);
      }
    }, { threshold: 0.8 });
    io.observe(el);
    return () => io.disconnect();
  }, [run]);

  return (
    <div className="keshav-hop">
      {caption && <p className="keshav-hop-line">{caption}</p>}
      <div className="keshav-hop-track" ref={track}>
        <button type="button" ref={wordEl} className="keshav-hop-word" onClick={run} title="Watch him jump over it">
          {word}
        </button>
        <div className="keshav-hop-walker" ref={walker} style={{ width: SIZE }}>
          <div className={back ? 'keshav-hop-flip' : undefined}>
            <KeshavRig pose={pose} />
          </div>
        </div>
      </div>
    </div>
  );
}
