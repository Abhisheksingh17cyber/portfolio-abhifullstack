// ============================================================
// 🌤️❄️ SEASON TOGGLE — 4-Season Cinematic Cycle
// ============================================================
// Positioned on the left edge, vertically centered.
// Four icons (spring/summer/autumn/winter) with an animated
// selection indicator that slides between them.
// Seasons: Spring → Summer → Autumn → Winter
// ============================================================

import { motion } from "motion/react";

interface SeasonToggleProps {
    season: "spring" | "summer" | "fall" | "winter";
    onToggle: () => void;
}

export function SeasonToggle({ season, onToggle }: SeasonToggleProps) {
    const seasons = ["spring", "summer", "fall", "winter"];
    const currentIndex = seasons.indexOf(season);

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
                    height: "168px", // Taller for 4 seasons
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
                aria-label={`Switch to next season (currently ${season})`}
            >
                {/* Sliding highlight pill */}
                <motion.div
                    className="absolute"
                    animate={{
                        top: 3 + currentIndex * 41,
                    }}
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    style={{
                        left: "3px",
                        width: "32px",
                        height: "38px",
                        borderRadius: "16px",
                        background:
                            season === "spring" ? "linear-gradient(135deg, rgba(160,255,100,0.85), rgba(100,200,60,0.7))" :
                                season === "summer" ? "linear-gradient(135deg, rgba(255,200,60,0.85), rgba(255,170,40,0.7))" :
                                    season === "fall" ? "linear-gradient(135deg, rgba(200,130,50,0.85), rgba(180,100,30,0.7))" :
                                        "linear-gradient(135deg, rgba(180,220,255,0.85), rgba(140,180,240,0.7))",
                        boxShadow:
                            season === "spring" ? "0 2px 12px rgba(120,255,80,0.3)" :
                                season === "summer" ? "0 2px 12px rgba(255,180,40,0.3)" :
                                    season === "fall" ? "0 2px 12px rgba(190,120,40,0.3)" :
                                        "0 2px 12px rgba(140,200,255,0.3)",
                        transition: "background 0.6s ease, box-shadow 0.6s ease",
                    }}
                />

                {/* Spring Icon (Sakura/Flower) */}
                <div className="relative z-10 flex items-center justify-center" style={{ width: "38px", height: "42px" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 8C12 8 13.5 4 16 4C18.5 4 20 6 20 8.5C20 11 16 12 12 12C12 12 8 11 4 8.5C4 6 5.5 4 8 4C10.5 4 12 8 12 8Z"
                            stroke={season === "spring" ? "rgba(40,60,20,0.9)" : "rgba(255,255,255,0.35)"} strokeWidth="1.2" style={{ transition: "stroke 0.5s ease" }} />
                        <path d="M12 16C12 16 13.5 20 16 20C18.5 20 20 18 20 15.5C20 13 16 12 12 12C12 12 8 13 4 15.5C4 18 5.5 20 8 20C10.5 20 12 16 12 16Z"
                            stroke={season === "spring" ? "rgba(40,60,20,0.9)" : "rgba(255,255,255,0.35)"} strokeWidth="1.2" style={{ transition: "stroke 0.5s ease" }} />
                    </svg>
                </div>

                {/* Summer Icon (Sun) */}
                <div className="relative z-10 flex items-center justify-center" style={{ width: "38px", height: "42px" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="4" stroke={season === "summer" ? "rgba(80,50,0,0.9)" : "rgba(255,255,255,0.35)"} strokeWidth="1.5" style={{ transition: "stroke 0.5s ease" }} />
                        {[0, 90, 180, 270].map(angle => (
                            <line key={angle} x1={12 + Math.cos(angle * Math.PI / 180) * 6.5} y1={12 + Math.sin(angle * Math.PI / 180) * 6.5}
                                x2={12 + Math.cos(angle * Math.PI / 180) * 8.5} y2={12 + Math.sin(angle * Math.PI / 180) * 8.5}
                                stroke={season === "summer" ? "rgba(80,50,0,0.9)" : "rgba(255,255,255,0.35)"} strokeWidth="1.5" strokeLinecap="round" />
                        ))}
                    </svg>
                </div>

                {/* Autumn Icon (Leaf) */}
                <div className="relative z-10 flex items-center justify-center" style={{ width: "38px", height: "42px" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17 3C17 3 12 8 7 13C5 15 4 18 6 20C8 22 11 21 13 19C18 14 23 9 23 9C23 9 18 10 15 11"
                            stroke={season === "fall" ? "rgba(60,30,10,0.9)" : "rgba(255,255,255,0.35)"} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M2 22L9.5 14.5" stroke={season === "fall" ? "rgba(60,30,10,0.9)" : "rgba(255,255,255,0.35)"} strokeWidth="1.3" strokeLinecap="round" />
                    </svg>
                </div>

                {/* Winter Icon (Snowflake) */}
                <div className="relative z-10 flex items-center justify-center" style={{ width: "38px", height: "42px" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2V22M2 12H22M4 4L20 20M20 4L4 20"
                            stroke={season === "winter" ? "rgba(20,40,70,0.9)" : "rgba(255,255,255,0.35)"} strokeWidth="1.2" strokeLinecap="round" />
                        <circle cx="12" cy="12" r="2.5" stroke={season === "winter" ? "rgba(20,40,70,0.9)" : "rgba(255,255,255,0.35)"} strokeWidth="1.2" />
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
                {season}
            </motion.div>
        </motion.div>
    );
}
