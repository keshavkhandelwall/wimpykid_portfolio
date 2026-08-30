// DoodleIcons.tsx
// Hand-drawn / sketchy line icons for the Interests section.
// Monochrome, uses currentColor so it inherits your ink/pencil text color
// and works in both light and dark notebook themes.
//
// Usage:
//   import { CoffeeIcon, ReadingIcon, ... } from "./DoodleIcons";
//   <CoffeeIcon size={28} />

import React from "react";

interface IconProps {
  size?: number;
  className?: string;
  strokeWidth?: number;
}

// Shared wrapper so every icon gets the same sketchy stroke treatment
const Doodle: React.FC<{ children: React.ReactNode } & IconProps> = ({
  children,
  size = 24,
  className = "",
  strokeWidth = 1.75,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {children}
  </svg>
);

export const CoffeeIcon: React.FC<IconProps> = (p) => (
  <Doodle {...p}>
    <path d="M4 9c-.3 3.8-.2 7 1.1 9.3.9 1.6 2.6 2.4 4.6 2.4h.6c2 0 3.7-.8 4.6-2.4C16.2 16 16.3 12.8 16 9H4Z" />
    <path d="M4.3 9H16c.3-2.3-.3-4.4-2-5.7-.5-.4-1.1.1-1 .7.2 1-.3 1.8-1.1 1.6-.6-.1-.8-.8-.5-1.4.4-.9-.4-1.5-1-1-1 .8-1.3 2-1 3.2" />
    <path d="M16.3 10.2c1.6-.4 3.4.3 3.7 2 .3 1.8-1.1 3.3-3.4 3.1" />
    <path d="M6 21.5h8" />
  </Doodle>
);

export const ReadingIcon: React.FC<IconProps> = (p) => (
  <Doodle {...p}>
    <path d="M12 6.5c-1.6-1.3-4-1.9-6.3-1.5-.5.1-.8.5-.8 1v11.8c0 .6.6 1 1.1.9 2-.4 4.1.1 5.6 1.3" />
    <path d="M12 6.5c1.6-1.3 4-1.9 6.3-1.5.5.1.8.5.8 1v11.8c0 .6-.6 1-1.1.9-2-.4-4.1.1-5.6 1.3" />
    <path d="M12 6.5v13" />
  </Doodle>
);

export const GamingIcon: React.FC<IconProps> = (p) => (
  <Doodle {...p}>
    <path d="M6.5 9.5h11c1.9 0 3.3 1.8 3 3.7l-.6 3.6c-.3 1.7-2.3 2.4-3.6 1.3l-1.7-1.5a2 2 0 0 0-1.3-.5h-5.6c-.5 0-1 .2-1.3.5l-1.7 1.5c-1.3 1.1-3.3.4-3.6-1.3l-.6-3.6c-.3-1.9 1.1-3.7 3-3.7Z" />
    <path d="M8.3 12v3M6.8 13.5h3" />
    <circle cx="17" cy="12.3" r="0.6" fill="currentColor" stroke="none" />
    <circle cx="15.3" cy="14" r="0.6" fill="currentColor" stroke="none" />
  </Doodle>
);

export const MusicIcon: React.FC<IconProps> = (p) => (
  <Doodle {...p}>
    <path d="M9.5 16.5V5.8c0-.4.3-.7.7-.8l7.3-1.4c.5-.1.9.3.9.8v10.6" />
    <ellipse cx="7.3" cy="17" rx="2.3" ry="1.8" />
    <ellipse cx="15.8" cy="15.2" rx="2.3" ry="1.8" />
  </Doodle>
);

export const DesignIcon: React.FC<IconProps> = (p) => (
  <Doodle {...p}>
    <path d="M12 3.5c-4.8 0-8.5 3.6-8.5 7.9 0 3.6 2.9 4.4 4.4 3.7.9-.4 1.9.1 2 1.1.1.9-.1 1.7 1 2.2 4.6 2 9.6-1.7 9.6-6.9 0-4.4-3.9-8-8.5-8Z" />
    <circle cx="8.3" cy="10.3" r="1" fill="currentColor" stroke="none" />
    <circle cx="12" cy="7.8" r="1" fill="currentColor" stroke="none" />
    <circle cx="15.8" cy="9.5" r="1" fill="currentColor" stroke="none" />
    <circle cx="16.3" cy="13.5" r="1" fill="currentColor" stroke="none" />
  </Doodle>
);

export const MoviesIcon: React.FC<IconProps> = (p) => (
  <Doodle {...p}>
    <path d="M3.5 8.2 5 4.5h3l-1.4 3.7h2.6L10 4.5h3l-1.3 3.7h2.6l1.4-3.7h2.8l-1.5 3.7h1.5c.5 0 1 .4 1 1v9.3c0 .5-.5 1-1 1H4c-.5 0-1-.5-1-1V9.2c0-.5.5-1 1-1h-.5Z" />
  </Doodle>
);

export const SciFiIcon: React.FC<IconProps> = (p) => (
  <Doodle {...p}>
    <ellipse cx="12" cy="12" rx="9.2" ry="3.6" />
    <ellipse cx="12" cy="12" rx="9.2" ry="3.6" transform="rotate(60 12 12)" />
    <circle cx="12" cy="12" r="1.7" fill="currentColor" stroke="none" />
  </Doodle>
);

export const AiMlIcon: React.FC<IconProps> = (p) => (
  <Doodle {...p}>
    <rect x="6" y="7" width="12" height="10" rx="2.5" />
    <path d="M12 7V4M9.2 4.5h5.6" />
    <circle cx="9.5" cy="12" r="1" fill="currentColor" stroke="none" />
    <circle cx="14.5" cy="12" r="1" fill="currentColor" stroke="none" />
    <path d="M9 15.3c.9.7 2.1 1 3 0" />
    <path d="M3.5 10.5h2.5M18 10.5h2.5M3.5 14h2.5M18 14h2.5" />
  </Doodle>
);

export const TravellingIcon: React.FC<IconProps> = (p) => (
  <Doodle {...p}>
    <path d="M12 3c-3.3 0-5.8 2.7-5.8 6.2 0 4.6 5.8 11.3 5.8 11.3s5.8-6.7 5.8-11.3C17.8 5.7 15.3 3 12 3Z" />
    <circle cx="12" cy="9.3" r="2.3" />
  </Doodle>
);

export const PhotographyIcon: React.FC<IconProps> = (p) => (
  <Doodle {...p}>
    <path d="M3.5 8.8c0-.7.5-1.2 1.2-1.2h2l1-1.8h8.6l1 1.8h2c.7 0 1.2.5 1.2 1.2v8.5c0 .7-.5 1.2-1.2 1.2H4.7c-.7 0-1.2-.5-1.2-1.2V8.8Z" />
    <circle cx="12" cy="13" r="3.2" />
    <path d="M7 9.5h1" />
  </Doodle>
);

export const PlantsIcon: React.FC<IconProps> = (p) => (
  <Doodle {...p}>
    <path d="M12 21V11" />
    <path d="M12 11C12 7.5 9.5 5.5 6 5.5 6 9 8.3 11 12 11Z" />
    <path d="M12 13c0-3 2.2-4.7 5.3-4.7.2 3-1.9 4.7-5.3 4.7Z" />
    <path d="M9 21h6" />
  </Doodle>
);

export const CatsIcon: React.FC<IconProps> = (p) => (
  <Doodle {...p}>
    <path d="M6 9.5 4.3 4.8 8 7.3" />
    <path d="M18 9.5l1.7-4.7L16 7.3" />
    <path d="M6 9.5c0-1.8 2.7-3.2 6-3.2s6 1.4 6 3.2c0 3.8-1.8 8.7-6 8.7s-6-4.9-6-8.7Z" />
    <path d="M9.5 11.3l.7.9M14.5 11.3l-.7.9" />
    <path d="M10 14.3c.6.5 1.4.5 2 0" />
    <path d="M6.5 13.3 3 12.8M17.5 13.3 21 12.8" />
  </Doodle>
);
