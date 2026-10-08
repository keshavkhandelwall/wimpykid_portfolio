import { useCallback, useEffect, useRef, useState } from 'react';
import KeshavRig from './KeshavRig';
import type { Pose } from './KeshavRig';
import './KeshavDoodle.css';

// the name of the window event other parts of the page use to make him react,
// e.g. window.dispatchEvent(new CustomEvent(KESHAV_EVENT, { detail: 'shocked' }))
export const KESHAV_EVENT = 'keshav';

// how long each one-shot pose lasts before he goes back to idle
const DURATION: Partial<Record<Pose, number>> = { jump: 800, shocked: 1200, wave: 1900 };

const SLEEP_AFTER = 20000;

// each poke does something different, with its own line
const POKES: { pose: Pose; line: string }[] = [
  { pose: 'shocked', line: 'Hey! I said don’t touch anything!' },
  { pose: 'jump', line: 'Okay, one more poke. Then I’m calling Mom.' },
  { pose: 'wave', line: 'Fine. You can scroll now. Bye!' },
  { pose: 'jump', line: 'Every bug here was fixed by me. Mostly.' },
  { pose: 'shocked', line: 'Stop! I just fixed my hair.' },
];

const REACTIONS: Partial<Record<Pose, string>> = {
  shocked: 'Whoa! Was that a bug?!',
  wave: 'Hi! Write to me!',
  jump: 'Wheee!',
  sleep: 'zzz…',
};

interface Props {
  // first thing the speech bubble says
  greeting?: string;
  className?: string;
}

export default function KeshavDoodle({ greeting = 'Welcome to my diary. Don’t touch anything!', className = '' }: Props) {
  const [look, setLook] = useState({ x: 0, y: 0 });
  const [pose, setPose] = useState<Pose>('idle');
  const [line, setLine] = useState(greeting);
  const [said, setSaid] = useState(0);
  const pokes = useRef(0);
  const root = useRef<HTMLDivElement>(null);
  const reset = useRef(0);
  const sleepTimer = useRef(0);

  const say = useCallback((text: string) => {
    setLine(text);
    setSaid((n) => n + 1);
  }, []);

  const play = useCallback((next: Pose, text?: string) => {
    window.clearTimeout(reset.current);
    setPose(next);
    if (text) say(text);
    const ms = DURATION[next];
    if (ms) reset.current = window.setTimeout(() => setPose('idle'), ms);
  }, [say]);

  // falls asleep after a while without any activity, wakes on the next one
  useEffect(() => {
    const arm = () => {
      window.clearTimeout(sleepTimer.current);
      sleepTimer.current = window.setTimeout(() => play('sleep', REACTIONS.sleep), SLEEP_AFTER);
    };
    const onActivity = () => {
      setPose((p) => (p === 'sleep' ? 'idle' : p));
      arm();
    };
    arm();
    const events = ['pointermove', 'pointerdown', 'scroll', 'keydown', 'wheel', 'touchstart'] as const;
    events.forEach((e) => window.addEventListener(e, onActivity, { passive: true }));
    return () => {
      window.clearTimeout(sleepTimer.current);
      events.forEach((e) => window.removeEventListener(e, onActivity));
    };
  }, [play]);

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

  // anything on the page can make him react
  useEffect(() => {
    const onReact = (e: Event) => {
      const next = (e as CustomEvent<Pose>).detail;
      if (next) play(next, REACTIONS[next]);
    };
    window.addEventListener(KESHAV_EVENT, onReact);
    return () => {
      window.clearTimeout(reset.current);
      window.removeEventListener(KESHAV_EVENT, onReact);
    };
  }, [play]);

  const poke = () => {
    const next = POKES[pokes.current % POKES.length];
    pokes.current += 1;
    play(next.pose, next.line);
  };

  return (
    <div ref={root} className={`keshav-doodle ${className}`}>
      <p className="keshav-bubble" key={said} aria-live="polite">{line}</p>
      <button type="button" className="keshav-figure" onPointerDown={(e) => { e.preventDefault(); poke(); }} aria-label="Poke Keshav">
        <KeshavRig pose={pose} look={look} />
      </button>
    </div>
  );
}
