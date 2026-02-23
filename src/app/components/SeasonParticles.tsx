// ============================================================
// ❄️🍂 SEASON PARTICLES — Canvas-based environmental effects
// ============================================================
// Cinematic particle system for 4 seasons:
//  Spring: Floating pollen & pink cherry blossom petals
//  Summer: Subtle heat shimmer & golden sun motes
//  Autumn: Drifting orange/red/gold leaves
//  Winter: Soft, slow-falling snowflakes with glow
// ============================================================

import { useRef, useEffect, useCallback } from "react";

interface SeasonParticlesProps {
    season: "spring" | "summer" | "fall" | "winter";
}

interface Particle {
    x: number;
    y: number;
    size: number;
    speedY: number;
    speedX: number;
    opacity: number;
    rotation: number;
    rotationSpeed: number;
    wobblePhase: number;
    wobbleSpeed: number;
    wobbleAmp: number;
    type: "pollen" | "blossom" | "mote" | "leaf" | "snow";
    color?: string;
}

const COLORS = {
    springPollen: "rgba(230, 240, 180, 0.4)",
    springBlossom: ["rgba(255, 192, 203, 0.6)", "rgba(255, 182, 193, 0.5)", "rgba(255, 240, 245, 0.6)"],
    summerMote: "rgba(255, 245, 180, 0.35)",
    fallLeaf: [
        "rgba(160, 110, 40, 0.7)",
        "rgba(140, 90, 30, 0.6)",
        "rgba(180, 130, 50, 0.65)",
        "rgba(120, 80, 25, 0.55)",
        "rgba(170, 100, 35, 0.6)",
        "rgba(200, 80, 40, 0.65)",
    ],
    winterSnow: "rgba(255, 255, 255, 0.8)",
};

function createParticle(w: number, h: number, season: string): Particle {
    const isWinter = season === "winter";
    const isSpring = season === "spring";
    const isSummer = season === "summer";
    const isFall = season === "fall";

    let type: Particle["type"] = "leaf";
    if (isSpring) type = Math.random() > 0.3 ? "pollen" : "blossom";
    else if (isSummer) type = "mote";
    else if (isFall) type = "leaf";
    else if (isWinter) type = "snow";

    const size = type === "pollen" || type === "mote"
        ? 0.5 + Math.random() * 1.2
        : type === "snow"
            ? 1.2 + Math.random() * 3.0
            : 3 + Math.random() * 6;

    const speedY = type === "snow"
        ? 0.4 + Math.random() * 1.0
        : type === "leaf" || type === "blossom"
            ? 0.3 + Math.random() * 0.7
            : (Math.random() - 0.5) * 0.2; // Pollen/motes drift more freely

    const speedX = (Math.random() - 0.5) * 0.4;

    const color = type === "pollen"
        ? COLORS.springPollen
        : type === "blossom"
            ? COLORS.springBlossom[Math.floor(Math.random() * COLORS.springBlossom.length)]
            : type === "mote"
                ? COLORS.summerMote
                : type === "leaf"
                    ? COLORS.fallLeaf[Math.floor(Math.random() * COLORS.fallLeaf.length)]
                    : COLORS.winterSnow;

    return {
        x: Math.random() * w,
        y: Math.random() * h,
        size,
        speedY,
        speedX,
        opacity: 0.2 + Math.random() * 0.6,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.04,
        wobblePhase: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.01 + Math.random() * 0.03,
        wobbleAmp: type === "snow" || type === "pollen" ? 0.2 + Math.random() * 0.5 : 0.6 + Math.random() * 1.2,
        type,
        color,
    };
}

function drawParticle(ctx: CanvasRenderingContext2D, p: Particle) {
    const { type, x, y, size, color, opacity, rotation } = p;

    ctx.save();
    ctx.translate(x, y);
    ctx.globalAlpha = opacity;

    if (type === "pollen" || type === "mote") {
        ctx.fillStyle = color || "white";
        ctx.beginPath();
        ctx.arc(0, 0, size, 0, Math.PI * 2);
        ctx.fill();
    } else if (type === "snow") {
        ctx.fillStyle = "white";
        ctx.shadowBlur = 4;
        ctx.shadowColor = "white";
        ctx.beginPath();
        ctx.arc(0, 0, size, 0, Math.PI * 2);
        ctx.fill();
    } else if (type === "blossom" || type === "leaf") {
        ctx.rotate(rotation);
        ctx.fillStyle = color || "white";

        // Simple organic petal/leaf shape
        ctx.beginPath();
        ctx.ellipse(0, 0, size * 0.4, size, 0, 0, Math.PI * 2);
        ctx.fill();

        // Edge detail
        ctx.strokeStyle = "rgba(0,0,0,0.1)";
        ctx.lineWidth = 0.2;
        ctx.stroke();
    }

    ctx.restore();
}

export function SeasonParticles({ season }: SeasonParticlesProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const animRef = useRef<number>(0);
    const seasonRef = useRef(season);
    const prevSeasonRef = useRef(season);

    seasonRef.current = season;

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const w = canvas.width;
        const h = canvas.height;
        const currentSeason = seasonRef.current;

        // Transitions: Fade out old particles, fade in new ones
        if (prevSeasonRef.current !== currentSeason) {
            prevSeasonRef.current = currentSeason;
            const count = currentSeason === "fall" ? 50 : currentSeason === "winter" ? 60 : 35;
            particlesRef.current = Array.from({ length: count }, () => createParticle(w, h, currentSeason));
        }

        ctx.clearRect(0, 0, w, h);

        for (const p of particlesRef.current) {
            // Physics
            p.wobblePhase += p.wobbleSpeed;

            // Wind & Turbulence
            const wind = Math.sin(p.y * 0.002 + p.wobblePhase) * 0.4;
            p.x += p.speedX + wind + Math.sin(p.wobblePhase) * p.wobbleAmp;
            p.y += p.speedY;

            // Rotation
            p.rotation += p.rotationSpeed;

            // Summer heat shimmer logic: oscillate speedY slightly
            if (currentSeason === "summer") {
                p.speedY = -0.15 + Math.sin(p.wobblePhase) * 0.1;
                p.speedX *= 0.99; // Damping
            }

            // Wrap around
            if (p.y > h + 20) p.y = -10, p.x = Math.random() * w;
            if (p.y < -20) p.y = h + 10, p.x = Math.random() * w;
            if (p.x > w + 20) p.x = -10;
            if (p.x < -20) p.x = w + 10;

            drawParticle(ctx, p);
        }

        animRef.current = requestAnimationFrame(draw);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            const count = seasonRef.current === "fall" ? 50 : seasonRef.current === "winter" ? 60 : 35;
            particlesRef.current = Array.from({ length: count }, () => createParticle(canvas.width, canvas.height, seasonRef.current));
        };

        resize();
        window.addEventListener("resize", resize);
        animRef.current = requestAnimationFrame(draw);

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animRef.current);
        };
    }, [draw]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none z-[6]"
        />
    );
}
