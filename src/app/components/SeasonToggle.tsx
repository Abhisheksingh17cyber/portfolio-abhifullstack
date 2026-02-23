// ============================================================
// 🌤️❄️ SEASON TOGGLE — Polished Primland-style side control
// ============================================================
// Positioned on the left edge, vertically centered.
// Two circular icons (sun/snowflake) with an animated
// selection indicator that slides between them.
// Matches the refined, minimal Primland aesthetic.
// ============================================================

import { motion } from "motion/react";

interface SeasonToggleProps {
    season: "summer" | "winter";
    onToggle: () => void;
}

export function SeasonToggle({ season, onToggle }: SeasonToggleProps) {
    const isSummer = season === "summer";

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="absolute left-6 z-30 flex flex-col items-center gap-2"
            style={{ top: "50%", transform: "translateY(-50%)" }}
        >
            {/* Vertical label */}
            <div
                className="text-white/40 mb-1"
                style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: "7.5px",
                    fontWeight: 400,
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    writingMode: "vertical-rl",
                    textOrientation: "mixed",
                }}
            >
                Season
            </div>

            {/* Toggle container */}
            <div
                className="relative flex flex-col items-center"
                style={{
                    width: "38px",
                    height: "84px",
                    borderRadius: "19px",
                    background: "rgba(0,0,0,0.35)",
                    backdropFilter: "blur(16px)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    cursor: "pointer",
                    overflow: "hidden",
                }}
                onClick={onToggle}
                role="button"
                tabIndex={0}
                aria-label={`Switch to ${isSummer ? "winter" : "summer"}`}
            >
                {/* Sliding highlight pill */}
                <motion.div
                    className="absolute"
                    animate={{
                        top: isSummer ? 3 : 43,
                    }}
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    style={{
                        left: "3px",
                        width: "32px",
                        height: "38px",
                        borderRadius: "16px",
                        background: isSummer
                            ? "linear-gradient(135deg, rgba(255,200,60,0.85), rgba(255,170,40,0.7))"
                            : "linear-gradient(135deg, rgba(160,200,240,0.7), rgba(130,175,220,0.6))",
                        boxShadow: isSummer
                            ? "0 2px 12px rgba(255,180,40,0.3)"
                            : "0 2px 12px rgba(140,180,220,0.3)",
                        transition: "background 0.6s ease, box-shadow 0.6s ease",
                    }}
                />

                {/* Summer icon (sun) */}
                <div
                    className="relative z-10 flex items-center justify-center"
                    style={{ width: "38px", height: "42px" }}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle
                            cx="12" cy="12" r="4"
                            stroke={isSummer ? "rgba(80,50,0,0.9)" : "rgba(255,255,255,0.35)"}
                            strokeWidth="1.5"
                            fill="none"
                            style={{ transition: "stroke 0.5s ease" }}
                        />
                        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
                            const rad = (angle * Math.PI) / 180;
                            const x1 = 12 + Math.cos(rad) * 6.5;
                            const y1 = 12 + Math.sin(rad) * 6.5;
                            const x2 = 12 + Math.cos(rad) * 8.5;
                            const y2 = 12 + Math.sin(rad) * 8.5;
                            return (
                                <line
                                    key={angle}
                                    x1={x1} y1={y1} x2={x2} y2={y2}
                                    stroke={isSummer ? "rgba(80,50,0,0.9)" : "rgba(255,255,255,0.35)"}
                                    strokeWidth="1.2"
                                    strokeLinecap="round"
                                    style={{ transition: "stroke 0.5s ease" }}
                                />
                            );
                        })}
                    </svg>
                </div>

                {/* Winter icon (snowflake) */}
                <div
                    className="relative z-10 flex items-center justify-center"
                    style={{ width: "38px", height: "42px" }}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {/* Main cross */}
                        <line x1="12" y1="2" x2="12" y2="22"
                            stroke={!isSummer ? "rgba(20,40,60,0.9)" : "rgba(255,255,255,0.35)"}
                            strokeWidth="1.3" strokeLinecap="round"
                            style={{ transition: "stroke 0.5s ease" }}
                        />
                        <line x1="2" y1="12" x2="22" y2="12"
                            stroke={!isSummer ? "rgba(20,40,60,0.9)" : "rgba(255,255,255,0.35)"}
                            strokeWidth="1.3" strokeLinecap="round"
                            style={{ transition: "stroke 0.5s ease" }}
                        />
                        {/* Diagonal arms */}
                        <line x1="5" y1="5" x2="19" y2="19"
                            stroke={!isSummer ? "rgba(20,40,60,0.9)" : "rgba(255,255,255,0.35)"}
                            strokeWidth="1" strokeLinecap="round"
                            style={{ transition: "stroke 0.5s ease" }}
                        />
                        <line x1="19" y1="5" x2="5" y2="19"
                            stroke={!isSummer ? "rgba(20,40,60,0.9)" : "rgba(255,255,255,0.35)"}
                            strokeWidth="1" strokeLinecap="round"
                            style={{ transition: "stroke 0.5s ease" }}
                        />
                        {/* Branch tips */}
                        {[
                            [12, 4, 10, 6], [12, 4, 14, 6],
                            [12, 20, 10, 18], [12, 20, 14, 18],
                            [4, 12, 6, 10], [4, 12, 6, 14],
                            [20, 12, 18, 10], [20, 12, 18, 14],
                        ].map(([x1, y1, x2, y2], i) => (
                            <line
                                key={i}
                                x1={x1} y1={y1} x2={x2} y2={y2}
                                stroke={!isSummer ? "rgba(20,40,60,0.9)" : "rgba(255,255,255,0.35)"}
                                strokeWidth="0.8" strokeLinecap="round"
                                style={{ transition: "stroke 0.5s ease" }}
                            />
                        ))}
                    </svg>
                </div>
            </div>

            {/* Season name */}
            <motion.div
                key={season}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-white/35 mt-1"
                style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: "7.5px",
                    fontWeight: 400,
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    writingMode: "vertical-rl",
                    textOrientation: "mixed",
                }}
            >
                {isSummer ? "Summer" : "Winter"}
            </motion.div>
        </motion.div>
    );
}
