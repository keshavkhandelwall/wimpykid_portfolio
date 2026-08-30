import { useEffect, useRef, useState } from 'react';
import Reveal from './Reveal';

interface Skill {
  name: string;
}

function SkillItem({ name, isVisible, index }: Skill & { isVisible: boolean; index: number }) {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setIsChecked(true);
      }, index * 40 + 100); // Shorter stagger delay for larger list
      return () => clearTimeout(timer);
    }
  }, [isVisible, index]);

  return (
    <div className="skill-item">
      <div className="skill-checkbox-wrap">
        <div className={`skill-checkbox ${isChecked ? 'checked' : ''}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <div className="skill-label-text">
          <span className="skill-name">{name}</span>
        </div>
      </div>
    </div>
  );
}

export default function Skills() {
  const skillsList: string[] = [
    "Python", "C/C++", "Java", "JavaScript", "TypeScript", 
    "REST APIs", "Mongo DB", "Node.js", "Express.js", 
    "Data Structures And Algorithms", "AI & Data Analytics", 
    "Machine Learning Fundamentals", "Data and Trend Analysis", "JVM", 
    "GoLang", "SpringBoot", "Firebase", "Kong API Gateway", 
    "Strategic Planning", "Leadership", "Brand Development", 
    "Kubernetes", "Rabbit MQ", "Marketing & Outreach", 
    "Team Collaboration", "Product Management", 
    "Client Orientation and Coordination"
  ];

  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (ref.current) {
            observer.unobserve(ref.current);
          }
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section id="skills" className="lined-bg">
      <Reveal className="section-title">
        <svg viewBox="0 0 48 48" fill="none">
          <path d="M24 6 L38 14 L38 30 L24 42 L10 30 L10 14 Z" stroke="white" strokeWidth={2.5} strokeLinejoin="round" />
          <circle cx="24" cy="24" r="6" stroke="white" strokeWidth={2} />
        </svg>
        Skills
      </Reveal>
      <div className="section-line"></div>
      
      <div ref={ref} className="skills-grid-flat">
        {skillsList.map((skillName, index) => (
          <SkillItem
            key={skillName}
            name={skillName}
            isVisible={isVisible}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}