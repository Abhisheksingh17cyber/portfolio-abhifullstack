// ============================================================
// 🏔️ LANDING HERO — Primland-style intro screen
// ============================================================
// Full-screen hero with thick cloud overlays, owner name,
// and "EXPLORE THE MAP" button. Clicking launches a zoom-dive
// animation that parts the clouds and reveals the map below.
//
// Matches the exact look of explore.ownprimland.com:
//   "IN THE HEART of"
//   "The Blue Ridge Mountains"  (adapted → owner name)
//   "Journey to the ultimate adventure paradise."
//   [EXPLORE THE MAP ▾]
// ============================================================

import { motion } from "motion/react";
import { useRef, useEffect, useCallback } from "react";

interface LandingHeroProps {
    onExplore: () => void;
    isTransitioning: boolean;
    ownerName: string;
    ownerSubtitle: string;
}

// ─── Canvas cloud layer ────────────────────────────────────
// Creates thick, atmospheric cloud wisps that part left/right
// during the transition animation.
function useCloudCanvas(
    canvasRef: React.RefObject<HTMLCanvasElement | null>,
    isTransitioning: boolean,
) {
    const cloudsRef = useRef<
        {
            x: number;
            y: number;
            radius: number;
            stretchX: number;
            stretchY: number;
            speedX: number;
            baseOpacity: number;
            opacity: number;
            phase: number;
            side: "left" | "right" | "center"; // For cloud-parting
        }[]
    >([]);
    const animIdRef = useRef(0);
    const transRef = useRef(isTransitioning);
    const fadeRef = useRef(1);
    const partRef = useRef(0); // 0 = together, 1 = fully parted

    transRef.current = isTransitioning;

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        const w = canvas.width;
        const h = canvas.height;

        // Cloud-parting animation during transition
        if (transRef.current) {
            fadeRef.current = Math.max(0, fadeRef.current - 0.008);
            partRef.current = Math.min(1, partRef.current + 0.015);
        }

        ctx.clearRect(0, 0, w, h);
        if (fadeRef.current < 0.01) {
            animIdRef.current = requestAnimationFrame(draw);
            return;
        }

        for (const c of cloudsRef.current) {
            // Normal drift
            c.x += c.speedX;
            c.phase += 0.003;

            // Cloud-parting: push clouds left/right based on side
            let partOffset = 0;
            if (partRef.current > 0) {
                const partForce = partRef.current * w * 0.6;
                if (c.side === "left") partOffset = -partForce;
                else if (c.side === "right") partOffset = partForce;
                else partOffset = (c.x > w / 2 ? 1 : -1) * partForce * 0.5;
            }

            c.opacity =
                c.baseOpacity *
                (0.85 + Math.sin(c.phase) * 0.15) *
                fadeRef.current;

            // Wrap
            const drawX = c.x + partOffset;
            if (c.x - c.radius * c.stretchX > w + 50) {
                c.x = -c.radius * c.stretchX - 30;
                c.y = Math.random() * h;
            }

            ctx.save();
            ctx.translate(drawX, c.y);
            ctx.scale(c.stretchX, c.stretchY);
            const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, c.radius);
            grad.addColorStop(0, `rgba(220,225,215,${c.opacity})`);
            grad.addColorStop(0.35, `rgba(210,215,205,${c.opacity * 0.6})`);
            grad.addColorStop(0.65, `rgba(200,205,195,${c.opacity * 0.25})`);
            grad.addColorStop(1, `rgba(190,195,185,0)`);
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(0, 0, c.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }

        animIdRef.current = requestAnimationFrame(draw);
    }, [canvasRef]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            const w = canvas.width;
            const h = canvas.height;
            cloudsRef.current = [];

            // Thick atmospheric clouds
            for (let i = 0; i < 28; i++) {
                const radius = 140 + Math.random() * 320;
                const x = Math.random() * (w + 400) - 200;
                cloudsRef.current.push({
                    x,
                    y: Math.random() * h,
                    radius,
                    stretchX: 2.0 + Math.random() * 2.5,
                    stretchY: 0.35 + Math.random() * 0.5,
                    speedX: 0.06 + Math.random() * 0.18,
                    baseOpacity: 0.12 + Math.random() * 0.22,
                    opacity: 0,
                    phase: Math.random() * Math.PI * 2,
                    side: x < w * 0.4 ? "left" : x > w * 0.6 ? "right" : "center",
                });
            }
        };
        resize();
        window.addEventListener("resize", resize);
        animIdRef.current = requestAnimationFrame(draw);

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animIdRef.current);
        };
    }, [draw, canvasRef]);
}

export function LandingHero({
    onExplore,
    isTransitioning,
    ownerName,
    ownerSubtitle,
}: LandingHeroProps) {
    const cloudCanvasRef = useRef<HTMLCanvasElement>(null);
    useCloudCanvas(cloudCanvasRef, isTransitioning);

    return (
        <motion.div
            className="absolute inset-0 z-40 flex flex-col items-center justify-center"
            animate={{
                opacity: isTransitioning ? 0 : 1,
                scale: isTransitioning ? 1.12 : 1,
            }}
            transition={{ duration: 2.4, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ pointerEvents: isTransitioning ? "none" : "auto" }}
        >
            {/* Dark overlay for contrast — darker at edges for cinematic feel */}
            <div
                className="absolute inset-0"
                style={{
                    background:
                        "radial-gradient(ellipse at center, rgba(8,12,6,0.35) 0%, rgba(8,12,6,0.55) 60%, rgba(8,12,6,0.75) 100%)",
                }}
            />

            {/* Cloud canvas (parts left/right during transition) */}
            <canvas
                ref={cloudCanvasRef}
                className="absolute inset-0 pointer-events-none"
                style={{ mixBlendMode: "screen" }}
            />

            {/* Content — matches Primland's typography hierarchy */}
            <div className="relative z-10 flex flex-col items-center gap-3 px-8 text-center">
                {/* Decorative 4-point star */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, delay: 0.2 }}
                    className="mb-2"
                >
                    <svg
                        width="14"
                        height="14"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M8 0L9.2 6.8L16 8L9.2 9.2L8 16L6.8 9.2L0 8L6.8 6.8L8 0Z"
                            fill="rgba(200,190,160,0.7)"
                        />
                    </svg>
                </motion.div>

                {/* Pre-headline — Primland style: "IN THE HEART of" */}
                <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="text-white/55"
                    style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "clamp(13px, 1.4vw, 18px)",
                        fontWeight: 300,
                        fontStyle: "italic",
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                    }}
                >
                    Welcome to the world of
                </motion.p>

                {/* Main heading — Large serif name (Primland: "The Blue Ridge Mountains") */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.4, delay: 0.6 }}
                    className="text-white leading-none"
                    style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "clamp(42px, 7.5vw, 100px)",
                        fontWeight: 300,
                        letterSpacing: "0.02em",
                        lineHeight: 1.0,
                    }}
                >
                    {ownerName}
                </motion.h1>

                {/* Subtitle — Primland: "Journey to the ultimate adventure paradise." */}
                <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.9 }}
                    className="text-white/50 mt-1"
                    style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "clamp(13px, 1.3vw, 18px)",
                        fontWeight: 300,
                        fontStyle: "italic",
                        letterSpacing: "0.06em",
                    }}
                >
                    {ownerSubtitle}
                </motion.p>

                {/* Explore the map button — matches Primland CTA */}
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1.3 }}
                    onClick={onExplore}
                    className="mt-8 group relative overflow-hidden flex items-center gap-3"
                    style={{
                        padding: "14px 36px",
                        border: "1px solid rgba(255,255,255,0.25)",
                        background: "rgba(255,255,255,0.04)",
                        backdropFilter: "blur(6px)",
                        cursor: "pointer",
                    }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                >
                    {/* Hover shine effect */}
                    <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                            background:
                                "linear-gradient(135deg, rgba(255,255,255,0.07), rgba(255,255,255,0.02))",
                        }}
                    />

                    {/* Button text */}
                    <span
                        className="relative text-white/90 tracking-[0.25em] uppercase"
                        style={{
                            fontFamily: "'Jost', sans-serif",
                            fontSize: "11px",
                            fontWeight: 400,
                            letterSpacing: "0.25em",
                        }}
                    >
                        Explore the Map
                    </span>

                    {/* Down arrow icon — Primland style */}
                    <svg
                        className="relative"
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                    >
                        <path
                            d="M2 3.5L5 6.5L8 3.5"
                            stroke="rgba(255,255,255,0.6)"
                            strokeWidth="1"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </motion.button>
            </div>

            {/* Bottom scroll hint */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2, duration: 1.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                {/* Animated down chevron */}
                <motion.svg
                    animate={{ y: [0, 4, 0] }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                >
                    <path
                        d="M3 5L7 9L11 5"
                        stroke="rgba(255,255,255,0.25)"
                        strokeWidth="1"
                        strokeLinecap="round"
                    />
                </motion.svg>
            </motion.div>
        </motion.div>
    );
}
