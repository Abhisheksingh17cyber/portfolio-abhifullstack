// ============================================================
// 🌤️❄️ SEASON TOGGLE COMPONENT
// ============================================================
// Inspired by ownprimland.com's seasonal switch.
// Positioned on the left side with a smooth vertical pill
// toggle between Summer and Winter. Triggers cross-fade
// background change + nature effect adjustments.
// ============================================================

import { motion } from "motion/react";
import { Sun, Snowflake } from "lucide-react";

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
            className="absolute left-7 z-30 flex flex-col items-center gap-3"
            style={{ top: "50%", transform: "translateY(-50%)" }}
        >
            {/* Season label */}
            <span
                className="text-white/60 tracking-[0.2em] uppercase"
                style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: "8px",
                    fontWeight: 400,
                    writingMode: "vertical-rl",
                    textOrientation: "mixed",
                    letterSpacing: "0.25em",
                }}
            >
                Season
            </span>

            {/* Toggle pill */}
            <button
                onClick={onToggle}
                className="relative flex flex-col items-center gap-0 overflow-hidden transition-all duration-300 hover:scale-105"
                style={{
                    width: "42px",
                    height: "90px",
                    borderRadius: "21px",
                    background: isSummer
                        ? "rgba(45, 62, 48, 0.85)"
                        : "rgba(40, 55, 75, 0.85)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    transition: "background 0.8s ease-in-out",
                }}
                aria-label={`Switch to ${isSummer ? "winter" : "summer"}`}
            >
                {/* Sliding indicator */}
                <motion.div
                    className="absolute rounded-full"
                    animate={{
                        top: isSummer ? "4px" : "46px",
                        background: isSummer
                            ? "rgba(255,200,50,0.9)"
                            : "rgba(180,210,240,0.9)",
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 28 }}
                    style={{
                        width: "34px",
                        height: "38px",
                        borderRadius: "17px",
                        left: "3px",
                    }}
                />

                {/* Sun icon (top) */}
                <div
                    className="relative z-10 flex items-center justify-center"
                    style={{ width: "42px", height: "45px" }}
                >
                    <Sun
                        size={16}
                        strokeWidth={1.8}
                        className="transition-colors duration-500"
                        style={{
                            color: isSummer ? "rgba(45,50,30,0.95)" : "rgba(255,255,255,0.4)",
                        }}
                    />
                </div>

                {/* Snowflake icon (bottom) */}
                <div
                    className="relative z-10 flex items-center justify-center"
                    style={{ width: "42px", height: "45px" }}
                >
                    <Snowflake
                        size={16}
                        strokeWidth={1.8}
                        className="transition-colors duration-500"
                        style={{
                            color: isSummer ? "rgba(255,255,255,0.4)" : "rgba(30,40,60,0.95)",
                        }}
                    />
                </div>
            </button>

            {/* Current season name */}
            <motion.span
                key={season}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-white/50 tracking-[0.15em] uppercase"
                style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: "8.5px",
                    fontWeight: 400,
                    writingMode: "vertical-rl",
                    textOrientation: "mixed",
                    letterSpacing: "0.2em",
                }}
            >
                {isSummer ? "Summer" : "Winter"}
            </motion.span>
        </motion.div>
    );
}
