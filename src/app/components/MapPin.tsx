// ============================================================
// 📍 MAP PIN COMPONENT
// ============================================================
// Renders a single interactive pin on the aerial map.
// Each pin has a pulsing ring, center dot, and label below.
// ============================================================

import { motion } from "motion/react";
import type { PinData } from "../data/portfolio-data";

interface MapPinProps {
  pin: PinData;
  isActive: boolean;
  onClick: () => void;
}

export function MapPin({ pin, isActive, onClick }: MapPinProps) {
  return (
    <div
      className="absolute"
      style={{
        left: `${pin.x}%`,
        top: `${pin.y}%`,
        transform: "translate(-50%, -50%)",
        zIndex: isActive ? 20 : 10,
      }}
    >
      {/* Clickable pin button */}
      <div className="flex flex-col items-center gap-1.5 cursor-pointer group" onClick={onClick}>

        {/* Pin outer ring + inner dot */}
        <div className="relative flex items-center justify-center">

          {/* Pulsing outer ring (always visible, subtle) */}
          <motion.div
            className="absolute rounded-full border border-white/40"
            animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: 36, height: 36 }}
          />

          {/* Outer white circle */}
          <motion.div
            className={`relative rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
              isActive
                ? "bg-white border-white shadow-lg shadow-white/30"
                : "bg-white/10 border-white/80 backdrop-blur-sm group-hover:bg-white/20 group-hover:border-white"
            }`}
            style={{ width: 22, height: 22 }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Center dot */}
            <div
              className={`rounded-full transition-colors duration-300 ${
                isActive ? "bg-[#2D3E30]" : "bg-white group-hover:bg-white"
              }`}
              style={{ width: 6, height: 6 }}
            />
          </motion.div>
        </div>

        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 2 }}
          animate={{ opacity: 1, y: 0 }}
          className={`px-2 py-0.5 text-center transition-all duration-200 ${
            isActive ? "opacity-100" : "opacity-70 group-hover:opacity-100"
          }`}
        >
          <span
            className="text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)] whitespace-nowrap"
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: "9px",
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            {pin.label}
          </span>
        </motion.div>
      </div>
    </div>
  );
}
