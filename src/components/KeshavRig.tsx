import './KeshavRig.css';

// the character is nine layers of the same 652 × 1336 canvas, so they stack exactly and
// each limb can turn around its own joint (the pivots live in KeshavRig.css)
const W = 652;
const H = 1336;

export type Pose = 'idle' | 'walk' | 'jump' | 'shocked' | 'wave' | 'sleep';

const EYES = [
  { x: 287.5, y: 187.5 },
  { x: 359.5, y: 178.5 },
];

const part = (name: string, cls = '') => (
  <img className={`rig-part ${cls}`} src={`/doodles/rig/${name}.webp`} alt="" draggable={false} />
);

interface Props {
  pose?: Pose;
  // where the head is turned towards, each from -1 to 1
  look?: { x: number; y: number };
  className?: string;
}

export default function KeshavRig({ pose = 'idle', look = { x: 0, y: 0 }, className = '' }: Props) {
  return (
    <div className={`rig pose-${pose} ${className}`} style={{ aspectRatio: `${W} / ${H}` }} aria-hidden="true">
      <div className="rig-all">
        {part('ground', 'rig-ground')}
        <div className="rig-leg rig-leg-l">{part('leg-left')}{part('shoe-left')}</div>
        <div className="rig-leg rig-leg-r">{part('leg-right')}{part('shoe-right')}</div>
        <div className="rig-upper">
          {part('torso')}
          <div className="rig-arm rig-arm-l">{part('arm-left')}</div>
          <div className="rig-arm rig-arm-r">{part('arm-right')}</div>
          <div
            className="rig-look"
            style={{ transform: `rotate(${look.x * 6}deg) translateY(${look.y * 4}px)` }}
          >
            <div className="rig-head">
              {part('head')}
              {/* eyelids that close for a blink */}
              <svg className="rig-lids" viewBox={`0 0 ${W} ${H}`}>
                {EYES.map((eye) => (
                  <g key={eye.x} transform={`translate(${eye.x} ${eye.y})`}>
                    <ellipse rx="13" ry="16" />
                    <path d="M-12 2 Q0 8 12 2" />
                  </g>
                ))}
              </svg>
            </div>
          </div>
        </div>
      </div>
      <span className="rig-zzz">z<i>z</i><b>z</b></span>
    </div>
  );
}
