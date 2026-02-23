// ============================================================
// ❄️🍂 SEASON PARTICLES COMPONENT
// ============================================================
// Renders falling snowflakes in winter or drifting leaves in
// summer for added ambient realism.
// ============================================================

import { useMemo } from "react";

interface SeasonParticlesProps {
    season: "summer" | "winter";
}

interface ParticleConfig {
    id: number;
    left: number;
    size: number;
    duration: number;
    delay: number;
    opacity: number;
}

export function SeasonParticles({ season }: SeasonParticlesProps) {
    const particles = useMemo<ParticleConfig[]>(() => {
        return Array.from({ length: 25 }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            size: 3 + Math.random() * 5,
            duration: 8 + Math.random() * 12,
            delay: Math.random() * 10,
            opacity: 0.2 + Math.random() * 0.5,
        }));
    }, []);

    const isWinter = season === "winter";

    return (
        <div className="absolute inset-0 pointer-events-none z-[6] overflow-hidden">
            {particles.map((p) => (
                <div
                    key={p.id}
                    className={isWinter ? "snowflake-particle" : "leaf-particle"}
                    style={{
                        position: "absolute",
                        left: `${p.left}%`,
                        top: "-10px",
                        width: `${p.size}px`,
                        height: `${p.size}px`,
                        borderRadius: isWinter ? "50%" : "2px",
                        background: isWinter
                            ? `rgba(255,255,255,${p.opacity})`
                            : `rgba(${140 + Math.floor(Math.random() * 60)},${80 + Math.floor(Math.random() * 40)},${20 + Math.floor(Math.random() * 30)},${p.opacity})`,
                        animationDuration: `${p.duration}s`,
                        animationDelay: `${p.delay}s`,
                    }}
                />
            ))}
        </div>
    );
}
