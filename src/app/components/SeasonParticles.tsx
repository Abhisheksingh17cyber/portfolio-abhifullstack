// ============================================================
// ❄️🍂 SEASON PARTICLES — Canvas-based snow / falling leaves
// ============================================================
// Realistic particle system using Canvas:
//  Winter: Dense snowflakes with wind drift, varying sizes
//  Summer: Gentle falling leaves with rotation and tumbling
// ============================================================

import { useRef, useEffect, useCallback } from "react";

interface SeasonParticlesProps {
    season: "summer" | "winter";
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
    type: "snow" | "leaf";
    leafColor?: string;
}

const LEAF_COLORS = [
    "rgba(160,110,40,0.7)",
    "rgba(140,90,30,0.6)",
    "rgba(180,130,50,0.65)",
    "rgba(120,80,25,0.55)",
    "rgba(170,100,35,0.6)",
];

function createParticles(count: number, w: number, h: number, type: "snow" | "leaf"): Particle[] {
    return Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h - h, // Start above viewport
        size: type === "snow" ? 1.5 + Math.random() * 3.5 : 3 + Math.random() * 5,
        speedY: type === "snow" ? 0.5 + Math.random() * 1.5 : 0.3 + Math.random() * 0.8,
        speedX: type === "snow" ? (Math.random() - 0.5) * 0.5 : (Math.random() - 0.3) * 0.4,
        opacity: 0.3 + Math.random() * 0.6,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.03,
        wobblePhase: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.02 + Math.random() * 0.03,
        wobbleAmp: type === "snow" ? 0.3 + Math.random() * 0.6 : 0.5 + Math.random() * 1.0,
        type,
        leafColor: type === "leaf" ? LEAF_COLORS[Math.floor(Math.random() * LEAF_COLORS.length)] : undefined,
    }));
}

function drawSnowflake(ctx: CanvasRenderingContext2D, p: Particle) {
    ctx.save();
    ctx.globalAlpha = p.opacity;
    ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();

    // Subtle glow
    if (p.size > 2.5) {
        ctx.globalAlpha = p.opacity * 0.3;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
        grad.addColorStop(0, `rgba(255,255,255,${p.opacity * 0.4})`);
        grad.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = grad;
        ctx.fill();
    }
    ctx.restore();
}

function drawLeaf(ctx: CanvasRenderingContext2D, p: Particle) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);
    ctx.globalAlpha = p.opacity;
    ctx.fillStyle = p.leafColor || "rgba(150,100,30,0.6)";

    // Leaf shape — a simple elliptical leaf
    ctx.beginPath();
    ctx.ellipse(0, 0, p.size * 0.4, p.size, 0, 0, Math.PI * 2);
    ctx.fill();

    // Leaf vein
    ctx.strokeStyle = `rgba(100,70,20,${p.opacity * 0.4})`;
    ctx.lineWidth = 0.3;
    ctx.beginPath();
    ctx.moveTo(0, -p.size);
    ctx.lineTo(0, p.size);
    ctx.stroke();

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

        // Recreate particles if season changed
        if (prevSeasonRef.current !== currentSeason) {
            prevSeasonRef.current = currentSeason;
            const type = currentSeason === "winter" ? "snow" : "leaf";
            const count = currentSeason === "winter" ? 120 : 25;
            particlesRef.current = createParticles(count, w, h, type);
        }

        ctx.clearRect(0, 0, w, h);

        for (const p of particlesRef.current) {
            // Movement
            p.wobblePhase += p.wobbleSpeed;
            p.x += p.speedX + Math.sin(p.wobblePhase) * p.wobbleAmp;
            p.y += p.speedY;
            p.rotation += p.rotationSpeed;

            // Wind effect for snow
            if (p.type === "snow") {
                p.x += Math.sin(p.y * 0.003) * 0.3;
            }

            // Wrap around
            if (p.y > h + 20) {
                p.y = -10 - Math.random() * 40;
                p.x = Math.random() * w;
            }
            if (p.x > w + 20) p.x = -10;
            if (p.x < -20) p.x = w + 10;

            // Draw
            if (p.type === "snow") {
                drawSnowflake(ctx, p);
            } else {
                drawLeaf(ctx, p);
            }
        }

        animRef.current = requestAnimationFrame(draw);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            const type = seasonRef.current === "winter" ? "snow" : "leaf";
            const count = seasonRef.current === "winter" ? 120 : 25;
            particlesRef.current = createParticles(count, canvas.width, canvas.height, type);
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
