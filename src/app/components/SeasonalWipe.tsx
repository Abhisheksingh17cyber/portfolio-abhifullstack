"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * SeasonalWipe Component
 * 
 * A seamless seasonal map transition component using Next.js (client component) 
 * and Tailwind CSS. It layers an Autumn map over a Summer map and reveals it
 * using a circular clip-path animation.
 */

interface SeasonalWipeProps {
    summerImage?: string;
    autumnImage?: string;
    autoPlay?: boolean;
    interval?: number;
}

export default function SeasonalWipe({
    summerImage = "https://images.unsplash.com/photo-1476231682828-37e571bc172f?auto=format&fit=crop&w=2400&q=85",
    autumnImage = "https://images.unsplash.com/photo-1542332213-9b5a5a3fab35?auto=format&fit=crop&w=2400&q=85",
    autoPlay = false,
    interval = 4000,
}: SeasonalWipeProps) {
    const [isAutumn, setIsAutumn] = useState(false);

    // Handle infinite loop if autoPlay is enabled
    useEffect(() => {
        if (!autoPlay) return;

        const timer = setInterval(() => {
            setIsAutumn((prev) => !prev);
        }, interval);

        return () => clearInterval(timer);
    }, [autoPlay, interval]);

    const toggleSeason = () => setIsAutumn((prev) => !prev);

    return (
        <div className="relative w-full h-screen overflow-hidden bg-zinc-900 group">
            {/* 
          BASE LAYER: Summer Map 
          This layer stays static and acts as the background.
      */}
            <div className="absolute inset-0 w-full h-full">
                <img
                    src={summerImage}
                    alt="Summer Landscape"
                    className="w-full h-full object-cover select-none"
                />
                {/* Subtle label */}
                <div className="absolute top-6 left-6 z-10 text-white/40 text-[10px] uppercase tracking-widest font-medium">
                    Summer Active
                </div>
            </div>

            {/* 
          TOP LAYER: Autumn Map 
          This layer is clipped and reveals itself via the mask expansion.
      */}
            <motion.div
                className="absolute inset-0 w-full h-full z-20 overflow-hidden pointer-events-none"
                initial={false}
                animate={{
                    clipPath: isAutumn
                        ? "circle(150% at 50% 50%)"
                        : "circle(0% at 50% 50%)",
                }}
                transition={{
                    duration: 1.5,
                    ease: [0.4, 0, 0.2, 1], // Custom cubic-bezier for smooth ease-in-out
                }}
            >
                <img
                    src={autumnImage}
                    alt="Autumn Landscape"
                    className="w-full h-full object-cover select-none"
                />
                {/* Subtle label */}
                <div className="absolute top-6 left-6 z-10 text-orange-200/60 text-[10px] uppercase tracking-widest font-medium">
                    Autumn Active
                </div>
            </motion.div>

            {/* 
          CONTROLS 
      */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-4">
                <button
                    onClick={toggleSeason}
                    className="px-8 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full text-white text-xs uppercase tracking-[0.2em] transition-all duration-300 hover:scale-105 active:scale-95 shadow-2xl"
                >
                    {isAutumn ? "Revert to Spring" : "Change Season"}
                </button>

                <p className="text-white/30 text-[9px] uppercase tracking-widest font-light">
                    Circular Mask Wipe Transition • 1.5s Ease
                </p>
            </div>

            {/* Atmospheric Vignette (Optional, adds cinematic feel) */}
            <div className="absolute inset-0 pointer-events-none z-25 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.4)_100%)] opacity-60" />
        </div>
    );
}
