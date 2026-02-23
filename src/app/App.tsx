// ============================================================
// 🗺️ PORTFOLIO MAP — Main App
// ============================================================
// Primland-inspired interactive aerial map portfolio.
//
// FLOW:
//  1. Landing hero — name, clouds, "EXPLORE THE MAP" button
//  2. Click Explore → clouds part, camera dives/zooms into map
//  3. Map view — pins, explore menu, season toggle, nature effects
//
// SEASONS: Summer ↔ Fall (toggle on left side)
// ============================================================

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { mapPins, mapBackground, ownerInfo } from "./data/portfolio-data";
import { MapPin } from "./components/MapPin";
import { SidePanel } from "./components/SidePanel";
import { CompassRose } from "./components/CompassRose";
import { ExploreMenu } from "./components/ExploreMenu";
import { FlyingBirds } from "./components/FlyingBirds";
import { MistOverlay } from "./components/MistOverlay";
import { SeasonToggle } from "./components/SeasonToggle";
import { SeasonParticles } from "./components/SeasonParticles";
import { LandingHero } from "./components/LandingHero";

type AppPhase = "landing" | "transitioning" | "map";
type Season = "summer" | "fall";

export default function App() {
  const [phase, setPhase] = useState<AppPhase>("landing");
  const [activePinId, setActivePinId] = useState<string | null>(null);
  const [season, setSeason] = useState<Season>("summer");

  const activePin = mapPins.find((p) => p.id === activePinId) ?? null;
  const isFall = season === "fall";

  const handleExplore = useCallback(() => {
    setPhase("transitioning");
    // After the dive animation completes, switch to map
    setTimeout(() => setPhase("map"), 2400);
  }, []);

  const handlePinClick = useCallback((id: string) => {
    setActivePinId((prev) => (prev === id ? null : id));
  }, []);

  const handleClose = useCallback(() => {
    setActivePinId(null);
  }, []);

  const handleSeasonToggle = useCallback(() => {
    setSeason((prev) => (prev === "summer" ? "fall" : "summer"));
  }, []);


  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#0d1208]" style={{ cursor: phase === "map" ? "grab" : "default" }}>

      {/* ══════════════════════════════════════════════
          BACKGROUND — Single image with CSS filter season transform
          The same base image shifts from green (summer) to warm autumn
          tones via hue-rotate + sepia + saturate filter animation.
          ══════════════════════════════════════════════ */}
      <motion.div
        className="absolute inset-0"
        animate={{
          scale: phase === "landing" ? 1.0 : phase === "transitioning" ? 1.15 : 1.0,
        }}
        transition={{ duration: 2.8, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <img
          src={mapBackground}
          alt="Aerial satellite view of forested mountains"
          className="w-full h-full object-cover"
          style={{
            objectPosition: "center center",
            transform: activePinId ? "scale(1.05) translateX(-2%)" : "scale(1.02)",
            transition: "transform 0.8s cubic-bezier(0.32, 0.72, 0, 1), filter 3s cubic-bezier(0.4, 0, 0.2, 1)",
            filter: isFall
              ? "saturate(1.3) sepia(0.35) hue-rotate(-10deg) brightness(0.88) contrast(1.1)"
              : "saturate(1.15) brightness(1.0) contrast(1.05)",
          }}
        />
      </motion.div>

      {/* ══════════════════════════════════════════════
          SEASON COLOR WASH — Animated overlay that washes
          warm autumn tones over the map during fall season
          ══════════════════════════════════════════════ */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background: isFall
            ? "linear-gradient(160deg, rgba(120,60,10,0.18) 0%, rgba(80,40,5,0.12) 40%, rgba(140,70,15,0.15) 100%)"
            : "transparent",
          mixBlendMode: "overlay",
          transition: "background 3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      />

      {/* ══════════════════════════════════════════════
          VIGNETTE / FOG EDGES — Atmospheric depth framing
          ══════════════════════════════════════════════ */}
      <div className="absolute inset-0 pointer-events-none z-[2]">
        {/* Center vignette */}
        <div
          className="absolute inset-0"
          style={{
            background: isFall
              ? "radial-gradient(ellipse at center, transparent 40%, rgba(30,20,10,0.5) 75%, rgba(15,10,5,0.82) 100%)"
              : "radial-gradient(ellipse at center, transparent 40%, rgba(12,18,10,0.5) 75%, rgba(6,10,5,0.82) 100%)",
            transition: "background 3s ease-in-out",
          }}
        />
        {/* Left fog */}
        <div
          className="absolute inset-y-0 left-0 w-48"
          style={{
            background: isFall
              ? "linear-gradient(to right, rgba(25,15,5,0.7), transparent)"
              : "linear-gradient(to right, rgba(10,15,8,0.7), transparent)",
            transition: "background 3s ease-in-out",
          }}
        />
        {/* Right fog */}
        <div
          className="absolute inset-y-0 right-0 w-48"
          style={{
            background: isFall
              ? "linear-gradient(to left, rgba(25,15,5,0.7), transparent)"
              : "linear-gradient(to left, rgba(10,15,8,0.7), transparent)",
            transition: "background 3s ease-in-out",
          }}
        />
        {/* Top fog */}
        <div
          className="absolute inset-x-0 top-0 h-36"
          style={{
            background: isFall
              ? "linear-gradient(to bottom, rgba(20,12,4,0.65), transparent)"
              : "linear-gradient(to bottom, rgba(8,12,6,0.65), transparent)",
            transition: "background 3s ease-in-out",
          }}
        />
        {/* Bottom fog */}
        <div
          className="absolute inset-x-0 bottom-0 h-36"
          style={{
            background: isFall
              ? "linear-gradient(to top, rgba(20,12,4,0.72), transparent)"
              : "linear-gradient(to top, rgba(8,12,6,0.72), transparent)",
            transition: "background 3s ease-in-out",
          }}
        />
      </div>

      {/* ══════════════════════════════════════════════
          NATURE EFFECTS (always rendered, behind landing)
          ══════════════════════════════════════════════ */}
      <MistOverlay season={season} />
      <FlyingBirds season={season} />
      <SeasonParticles season={season} />

      {/* ══════════════════════════════════════════════
          LANDING HERO (Phase 1)
          ══════════════════════════════════════════════ */}
      <AnimatePresence>
        {(phase === "landing" || phase === "transitioning") && (
          <LandingHero
            onExplore={handleExplore}
            isTransitioning={phase === "transitioning"}
            ownerName={ownerInfo.name}
            ownerSubtitle={ownerInfo.subtitle}
          />
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════
          MAP UI (Phase 3 — fades in after transition)
          ══════════════════════════════════════════════ */}
      {phase === "map" && (
        <motion.div
          key="map-ui"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0"
        >
          {/* ── TOP NAVIGATION BAR ── */}
          <motion.header
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-7 pt-6"
            style={{
              paddingRight: activePinId ? "calc(clamp(320px, 38vw, 480px) + 28px)" : "28px",
              transition: "padding-right 0.4s cubic-bezier(0.32, 0.72, 0, 1)",
            }}
          >
            {/* Left: Initials */}
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
              <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7 0C7 0 13 5.5 13 10.5C13 13.8 10.3 16.5 7 16.5C3.7 16.5 1 13.8 1 10.5C1 5.5 7 0 7 0Z"
                  stroke="white" strokeWidth="0.8" strokeOpacity="0.8" fill="none"
                />
                <line x1="7" y1="3" x2="7" y2="16" stroke="white" strokeWidth="0.6" strokeOpacity="0.5" />
                <line x1="3.5" y1="8.5" x2="10.5" y2="8.5" stroke="white" strokeWidth="0.6" strokeOpacity="0.5" />
              </svg>

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

            {/* Right: Contact */}
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
          {mapPins.map((pin, index) => (
            <motion.div
              key={pin.id}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.08 }}
            >
              <MapPin
                pin={pin}
                isActive={activePinId === pin.id}
                onClick={() => handlePinClick(pin.id)}
              />
            </motion.div>
          ))}

          {/* ── SEASON TOGGLE ── */}
          <SeasonToggle season={season} onToggle={handleSeasonToggle} />

          {/* ── COMPASS ROSE ── */}
          <CompassRose />

          {/* ── EXPLORE MENU ── */}
          <ExploreMenu
            pins={mapPins}
            activePin={activePinId}
            onSelectPin={handlePinClick}
          />

          {/* ── BOTTOM RIGHT BADGE ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="absolute bottom-7 right-7 z-20"
          >
            <div
              className="w-10 h-10 flex items-center justify-center border border-white/30 rounded-sm"
              style={{ background: "rgba(30, 42, 32, 0.7)", backdropFilter: "blur(8px)" }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M8 1C8 1 14 5.5 14 10C14 12.8 11.3 15 8 15C4.7 15 2 12.8 2 10C2 5.5 8 1 8 1Z"
                  stroke="white" strokeWidth="0.8" strokeOpacity="0.7" fill="none"
                />
                <line x1="8" y1="3.5" x2="8" y2="14" stroke="white" strokeWidth="0.7" strokeOpacity="0.4" />
              </svg>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* ── SIDE PANEL (always mounted for AnimatePresence) ── */}
      <SidePanel pin={activePin} onClose={handleClose} />

      {/* ── CLICK MAP TO CLOSE PANEL ── */}
      {activePinId && (
        <div
          className="absolute inset-0 z-10"
          style={{ cursor: "default" }}
          onClick={(e) => {
            if (e.target === e.currentTarget) handleClose();
          }}
        />
      )}
    </div>
  );
}
