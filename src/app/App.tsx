// ============================================================
// 🗺️ PORTFOLIO MAP — Main App
// ============================================================
// Interactive full-screen aerial map portfolio inspired by
// explore.ownprimland.com
//
// HOW IT WORKS:
//  • Full-screen landscape image fills the viewport
//  • Interactive pins mark each portfolio section
//  • Clicking a pin slides in a detail panel from the right
//  • "EXPLORE PORTFOLIO" button at the bottom lists all sections
//  • CONTACT link top-right opens your email
//
// ✏️ TO EDIT CONTENT:
//   Open /src/app/data/portfolio-data.ts
//   - Change ownerInfo for your name/details
//   - Edit mapPins array to update each section's content
//   - Change x/y percentage values to reposition pins
// ============================================================

import { useState, useCallback } from "react";
import { motion } from "motion/react";
import { mapPins, mapBackground, ownerInfo } from "./data/portfolio-data";
import { MapPin } from "./components/MapPin";
import { SidePanel } from "./components/SidePanel";
import { CompassRose } from "./components/CompassRose";
import { ExploreMenu } from "./components/ExploreMenu";

export default function App() {
  const [activePinId, setActivePinId] = useState<string | null>(null);

  const activePin = mapPins.find((p) => p.id === activePinId) ?? null;

  const handlePinClick = useCallback((id: string) => {
    setActivePinId((prev) => (prev === id ? null : id));
  }, []);

  const handleClose = useCallback(() => {
    setActivePinId(null);
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#1a1f18]">

      {/* ── AERIAL MAP BACKGROUND ── */}
      <div className="absolute inset-0">
        <img
          src={mapBackground}
          alt="Aerial landscape map"
          className="w-full h-full object-cover"
          style={{
            objectPosition: "center center",
            // Slightly shift map left when panel is open to keep pins centered
            transform: activePinId ? "scale(1.02) translateX(-3%)" : "scale(1)",
            transition: "transform 0.6s cubic-bezier(0.32, 0.72, 0, 1)",
          }}
        />

        {/* Edge fog / vignette (matches Primland's misty edges) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 45%, rgba(15,20,14,0.45) 80%, rgba(10,14,9,0.75) 100%)",
          }}
        />
        {/* Left fog */}
        <div
          className="absolute inset-y-0 left-0 w-40 pointer-events-none"
          style={{
            background: "linear-gradient(to right, rgba(15,20,14,0.6), transparent)",
          }}
        />
        {/* Right fog */}
        <div
          className="absolute inset-y-0 right-0 w-40 pointer-events-none"
          style={{
            background: "linear-gradient(to left, rgba(15,20,14,0.6), transparent)",
          }}
        />
        {/* Top fade */}
        <div
          className="absolute inset-x-0 top-0 h-28 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, rgba(12,17,11,0.55), transparent)",
          }}
        />
        {/* Bottom fade */}
        <div
          className="absolute inset-x-0 bottom-0 h-28 pointer-events-none"
          style={{
            background: "linear-gradient(to top, rgba(12,17,11,0.6), transparent)",
          }}
        />
      </div>

      {/* ── TOP NAVIGATION BAR ── */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-7 pt-6"
        style={{
          // Shift header when panel is open so it doesn't overlap
          paddingRight: activePinId ? "calc(clamp(320px, 38vw, 480px) + 28px)" : "28px",
          transition: "padding-right 0.4s cubic-bezier(0.32, 0.72, 0, 1)",
        }}
      >
        {/* Left: Initials / Logo */}
        <div>
          <span
            className="text-white/80 tracking-[0.18em] uppercase"
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: "11px",
              fontWeight: 400,
              letterSpacing: "0.22em",
            }}
          >
            {ownerInfo.initials}
          </span>
        </div>

        {/* Center: Name + icon + subtitle */}
        <div className="absolute left-1/2 top-5 -translate-x-1/2 flex flex-col items-center gap-1">
          {/* Decorative leaf/diamond icon */}
          <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M7 0C7 0 13 5.5 13 10.5C13 13.8 10.3 16.5 7 16.5C3.7 16.5 1 13.8 1 10.5C1 5.5 7 0 7 0Z"
              stroke="white"
              strokeWidth="0.8"
              strokeOpacity="0.8"
              fill="none"
            />
            <line x1="7" y1="3" x2="7" y2="16" stroke="white" strokeWidth="0.6" strokeOpacity="0.5" />
            <line x1="3.5" y1="8.5" x2="10.5" y2="8.5" stroke="white" strokeWidth="0.6" strokeOpacity="0.5" />
          </svg>

          {/* Name */}
          <h1
            className="text-white text-center leading-none"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(22px, 2.8vw, 32px)",
              fontWeight: 400,
              letterSpacing: "0.05em",
              lineHeight: 1,
            }}
          >
            {ownerInfo.name}
          </h1>

          {/* Subtitle */}
          <p
            className="text-white/65 text-center tracking-[0.25em] uppercase"
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: "8.5px",
              fontWeight: 400,
              letterSpacing: "0.25em",
            }}
          >
            {ownerInfo.subtitle}
          </p>
        </div>

        {/* Right: Contact link */}
        <div>
          <a
            href={`mailto:${ownerInfo.contactEmail}`}
            className="text-white/80 hover:text-white transition-colors tracking-[0.2em] uppercase"
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: "11px",
              fontWeight: 400,
              letterSpacing: "0.2em",
            }}
          >
            Contact
          </a>
        </div>
      </motion.header>

      {/* ── MAP PINS ── */}
      {mapPins.map((pin) => (
        <MapPin
          key={pin.id}
          pin={pin}
          isActive={activePinId === pin.id}
          onClick={() => handlePinClick(pin.id)}
        />
      ))}

      {/* ── BOTTOM LEFT: COMPASS ROSE ── */}
      <CompassRose />

      {/* ── BOTTOM CENTER: EXPLORE MENU ── */}
      <ExploreMenu
        pins={mapPins}
        activePin={activePinId}
        onSelectPin={handlePinClick}
      />

      {/* ── BOTTOM RIGHT: BADGE ICON ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.5 }}
        className="absolute bottom-7 right-7 z-20"
      >
        {/* Small decorative badge — like Primland's leaf icon bottom-right */}
        <div
          className="w-10 h-10 flex items-center justify-center border border-white/30 rounded-sm"
          style={{ background: "rgba(30, 42, 32, 0.7)", backdropFilter: "blur(8px)" }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M8 1C8 1 14 5.5 14 10C14 12.8 11.3 15 8 15C4.7 15 2 12.8 2 10C2 5.5 8 1 8 1Z"
              stroke="white"
              strokeWidth="0.8"
              strokeOpacity="0.7"
              fill="none"
            />
            <line x1="8" y1="3.5" x2="8" y2="14" stroke="white" strokeWidth="0.7" strokeOpacity="0.4" />
          </svg>
        </div>
      </motion.div>

      {/* ── SIDE PANEL ── */}
      <SidePanel pin={activePin} onClose={handleClose} />

      {/* ── CLICK MAP TO CLOSE PANEL ── */}
      {activePinId && (
        <div
          className="absolute inset-0 z-10"
          style={{ cursor: "default" }}
          onClick={(e) => {
            // Only close if clicking directly on the backdrop (not on a pin)
            if (e.target === e.currentTarget) handleClose();
          }}
        />
      )}
    </div>
  );
}
