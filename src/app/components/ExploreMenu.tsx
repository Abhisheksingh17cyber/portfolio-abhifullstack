// ============================================================
// 🗺️ EXPLORE MENU COMPONENT
// ============================================================
// The "EXPLORE PORTFOLIO" button at the bottom-center of the
// map. Clicking it opens a dropdown list of all pins/sections.
// Exactly replicates the Primland "EXPLORE PRIMLAND" button.
// ============================================================

import { useState } from "react";
import { ChevronDown, ChevronUp, Home } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { PinData } from "../data/portfolio-data";

interface ExploreMenuProps {
  pins: PinData[];
  activePin: string | null;
  onSelectPin: (id: string) => void;
}

export function ExploreMenu({ pins, activePin, onSelectPin }: ExploreMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (id: string) => {
    onSelectPin(id);
    setIsOpen(false);
  };

  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center">

      {/* Dropdown list (opens upward) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scaleY: 0.9 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: 10, scaleY: 0.9 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="mb-2 overflow-hidden"
            style={{
              background: "rgba(30, 42, 32, 0.97)",
              backdropFilter: "blur(12px)",
              transformOrigin: "bottom center",
              minWidth: "240px",
            }}
          >
            {pins.map((pin, index) => (
              <button
                key={pin.id}
                onClick={() => handleSelect(pin.id)}
                className="w-full text-left px-6 py-3.5 transition-colors group"
                style={{
                  borderBottom: index < pins.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none",
                  background: activePin === pin.id ? "rgba(255,255,255,0.08)" : "transparent",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.08)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    activePin === pin.id ? "rgba(255,255,255,0.08)" : "transparent";
                }}
              >
                <span
                  className="flex items-center gap-3 text-white/80"
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: "11px",
                    fontWeight: 400,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                  }}
                >
                  {/* Active indicator dot */}
                  <span
                    className="flex-shrink-0 rounded-full transition-opacity"
                    style={{
                      width: 4,
                      height: 4,
                      background: "white",
                      opacity: activePin === pin.id ? 1 : 0.25,
                    }}
                  />
                  {pin.label}
                </span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main "EXPLORE PORTFOLIO" button */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="flex items-center gap-4 px-6 py-3.5 transition-all active:scale-95"
        style={{
          background: "rgba(30, 42, 32, 0.88)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        {/* House icon */}
        <Home
          size={15}
          strokeWidth={1.5}
          className="text-white/70"
        />

        {/* Label */}
        <span
          className="text-white tracking-[0.18em]"
          style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: "11px",
            fontWeight: 400,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          Explore Portfolio
        </span>

        {/* Chevron */}
        {isOpen ? (
          <ChevronUp size={14} strokeWidth={1.5} className="text-white/60" />
        ) : (
          <ChevronDown size={14} strokeWidth={1.5} className="text-white/60" />
        )}
      </button>
    </div>
  );
}
