// ============================================================
// 🐦 FLYING BIRDS COMPONENT
// ============================================================
// Renders animated SVG bird silhouettes that fly across the map.
// Birds have randomized sizes, altitudes, speeds, and delays for
// a natural, organic feel. Hidden during winter season.
// ============================================================

import { useMemo } from "react";

interface FlyingBirdsProps {
  season: "summer" | "winter";
}

interface BirdConfig {
  id: number;
  size: number;
  top: number;
  duration: number;
  delay: number;
  opacity: number;
  flipY: boolean;
}

export function FlyingBirds({ season }: FlyingBirdsProps) {
  // Generate random bird configs once
  const birds = useMemo<BirdConfig[]>(() => {
    return Array.from({ length: 10 }, (_, i) => ({
      id: i,
      size: 14 + Math.random() * 18,
      top: 5 + Math.random() * 40,
      duration: 18 + Math.random() * 22,
      delay: Math.random() * 15,
      opacity: 0.3 + Math.random() * 0.5,
      flipY: Math.random() > 0.5,
    }));
  }, []);

  return (
    <div
      className="absolute inset-0 pointer-events-none z-[5] overflow-hidden"
      style={{
        opacity: season === "winter" ? 0 : 1,
        transition: "opacity 1.5s ease-in-out",
      }}
    >
      {birds.map((bird) => (
        <div
          key={bird.id}
          className="absolute bird-fly"
          style={{
            top: `${bird.top}%`,
            left: "-60px",
            animationDuration: `${bird.duration}s`,
            animationDelay: `${bird.delay}s`,
          }}
        >
          <svg
            width={bird.size}
            height={bird.size * 0.5}
            viewBox="0 0 40 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="bird-flap"
            style={{
              opacity: bird.opacity,
              transform: bird.flipY ? "scaleY(-1)" : "none",
              animationDuration: `${0.4 + Math.random() * 0.3}s`,
            }}
          >
            {/* Bird silhouette — two curved wings */}
            <path
              d="M20 10 Q10 0 0 4"
              stroke="rgba(20,20,20,0.85)"
              strokeWidth="1.8"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M20 10 Q30 0 40 4"
              stroke="rgba(20,20,20,0.85)"
              strokeWidth="1.8"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
