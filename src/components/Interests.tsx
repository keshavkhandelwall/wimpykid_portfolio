import Reveal from "./Reveal";
import {
  CoffeeIcon,
  ReadingIcon,
  GamingIcon,
  MusicIcon,
  DesignIcon,
  MoviesIcon,
  SciFiIcon,
  AiMlIcon,
  TravellingIcon,
  PhotographyIcon,
  PlantsIcon,
  CatsIcon,
} from "./DoodleIcons";

const interests = [
  { label: "Coffee", Icon: CoffeeIcon },
  { label: "Reading", Icon: ReadingIcon },
  { label: "Gaming", Icon: GamingIcon },
  { label: "Music", Icon: MusicIcon },
  { label: "Design", Icon: DesignIcon },
  { label: "Movies", Icon: MoviesIcon },
  { label: "Sci-Fi", Icon: SciFiIcon },
  { label: "AI / ML", Icon: AiMlIcon },
  { label: "Travelling", Icon: TravellingIcon },
  { label: "Photography", Icon: PhotographyIcon },
  { label: "Plants", Icon: PlantsIcon },
  { label: "Cats", Icon: CatsIcon },
];

export default function Interests() {
  return (
    <section id="interests">
      <Reveal className="section-title">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <svg viewBox="0 0 48 48" fill="none" style={{ width: '48px', height: '48px' }}>
            <path d="M24 8 C24 8 10 16 10 26 C10 33 16 38 24 38 C32 38 38 33 38 26 C38 16 24 8 24 8Z" stroke="white" strokeWidth={2.5} strokeLinejoin="round" />
            <path d="M24 38 L24 44" stroke="white" strokeWidth={2.5} strokeLinecap="round" />
          </svg>
          <span>Interests</span>
        </div>
      </Reveal>
      <div className="section-line"></div>
      <div className="interests-wrap">
        {interests.map(({ label, Icon }, i) => (
          <Reveal key={label} className="interest-bubble" delay={i * 50}>
            <Icon size={22} />
            <span>{label}</span>
          </Reveal>
        ))}
      </div>

      {/* big doodles */}
      <svg className="doodle-float" style={{ top: 0, right: 0, width: '120px', opacity: 0.07 }} viewBox="0 0 120 120" fill="none">
        <path d="M20 60 Q60 10 100 60 Q60 110 20 60Z" stroke="white" strokeWidth={3} />
        <path d="M35 60 Q60 30 85 60 Q60 90 35 60Z" stroke="white" strokeWidth={2} />
        <circle cx={60} cy={60} r={8} stroke="white" strokeWidth={2} />
      </svg>
    </section>
  );
}
