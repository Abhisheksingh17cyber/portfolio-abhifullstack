// ============================================================
// 🌫️ MIST OVERLAY — Canvas-based volumetric cloud wisps
// ============================================================
// Renders realistic drifting cloud/mist wisps using HTML Canvas.
// Each wisp is a soft radial gradient blob that drifts across
// the viewport at varying speeds, sizes, and opacities.
// Matches the Primland "clouds rolling over forest" aesthetic.
// ============================================================

import { useRef, useEffect, useCallback } from "react";

interface MistOverlayProps {
    season: "summer" | "winter";
}

interface CloudWisp {
    x: number;
    y: number;
    radius: number;
    speedX: number;
    speedY: number;
    opacity: number;
    baseOpacity: number;
    stretchX: number;
    stretchY: number;
    phase: number;       // For breathing / pulsing
    phaseSpeed: number;
}

function createWisps(count: number, width: number, height: number): CloudWisp[] {
    const wisps: CloudWisp[] = [];
    for (let i = 0; i < count; i++) {
        const radius = 80 + Math.random() * 250;
        wisps.push({
            x: Math.random() * (width + 400) - 200,
            y: height * 0.2 + Math.random() * height * 0.65,
            radius,
            speedX: 0.15 + Math.random() * 0.45,
            speedY: (Math.random() - 0.5) * 0.08,
            opacity: 0,
            baseOpacity: 0.06 + Math.random() * 0.18,
            stretchX: 1.8 + Math.random() * 1.5,
            stretchY: 0.5 + Math.random() * 0.4,
            phase: Math.random() * Math.PI * 2,
            phaseSpeed: 0.003 + Math.random() * 0.006,
        });
    }
    return wisps;
}

export function MistOverlay({ season }: MistOverlayProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const wispsRef = useRef<CloudWisp[]>([]);
    const animRef = useRef<number>(0);
    const seasonRef = useRef(season);

    seasonRef.current = season;

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const w = canvas.width;
        const h = canvas.height;
        const isWinter = seasonRef.current === "winter";

        // Target multiplier for season
        const seasonMul = isWinter ? 2.2 : 1.0;

        ctx.clearRect(0, 0, w, h);

        for (const wisp of wispsRef.current) {
            // Move
            wisp.x += wisp.speedX;
            wisp.y += wisp.speedY + Math.sin(wisp.phase) * 0.04;
            wisp.phase += wisp.phaseSpeed;

            // Breathing opacity
            const breathe = 0.85 + Math.sin(wisp.phase) * 0.15;
            const targetOpacity = wisp.baseOpacity * seasonMul * breathe;
            wisp.opacity += (targetOpacity - wisp.opacity) * 0.02;

            // Wrap around
            const wispWidth = wisp.radius * wisp.stretchX;
            if (wisp.x - wispWidth > w + 100) {
                wisp.x = -wispWidth - 50;
                wisp.y = h * 0.15 + Math.random() * h * 0.7;
            }

            // Draw radial gradient blob
            ctx.save();
            ctx.translate(wisp.x, wisp.y);
            ctx.scale(wisp.stretchX, wisp.stretchY);

            const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, wisp.radius);
            if (isWinter) {
                grad.addColorStop(0, `rgba(220, 230, 240, ${wisp.opacity * 0.9})`);
                grad.addColorStop(0.3, `rgba(210, 220, 235, ${wisp.opacity * 0.6})`);
                grad.addColorStop(0.6, `rgba(200, 215, 230, ${wisp.opacity * 0.3})`);
                grad.addColorStop(1, `rgba(195, 210, 225, 0)`);
            } else {
                grad.addColorStop(0, `rgba(240, 240, 235, ${wisp.opacity * 0.85})`);
                grad.addColorStop(0.3, `rgba(230, 235, 225, ${wisp.opacity * 0.55})`);
                grad.addColorStop(0.6, `rgba(220, 225, 215, ${wisp.opacity * 0.25})`);
                grad.addColorStop(1, `rgba(210, 215, 205, 0)`);
            }

            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(0, 0, wisp.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }

        animRef.current = requestAnimationFrame(draw);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            if (wispsRef.current.length === 0) {
                wispsRef.current = createWisps(18, canvas.width, canvas.height);
            }
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
            className="absolute inset-0 pointer-events-none z-[4]"
            style={{ mixBlendMode: "screen" }}
        />
    );
}
