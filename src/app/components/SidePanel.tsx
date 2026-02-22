// ============================================================
// 📋 SIDE PANEL COMPONENT
// ============================================================
// The sliding panel that opens from the right when a pin is
// clicked. Matches the Primland panel aesthetic:
//  - Dark green header bar with title + close button
//  - Warm cream body with image, serif heading, body text
//  - Bullet detail list + CTA links at bottom
// ============================================================

import { X, ExternalLink, Download } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import type { PinData } from "../data/portfolio-data";

interface SidePanelProps {
  pin: PinData | null;
  onClose: () => void;
}

export function SidePanel({ pin, onClose }: SidePanelProps) {
  return (
    <AnimatePresence>
      {pin && (
        <motion.div
          key={pin.id}
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "tween", duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
          className="fixed top-0 right-0 h-full z-50 flex flex-col shadow-2xl"
          style={{ width: "clamp(320px, 38vw, 480px)" }}
        >
          {/* ── HEADER BAR (dark forest green) ── */}
          <div
            className="flex items-center justify-between px-7 py-5 flex-shrink-0"
            style={{ background: "#2D3E30" }}
          >
            <span
              className="text-white tracking-[0.18em] uppercase"
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.18em",
              }}
            >
              {pin.panelTitle}
            </span>
            <button
              onClick={onClose}
              className="text-white/60 hover:text-white transition-colors p-1"
              aria-label="Close panel"
            >
              <X size={18} strokeWidth={1.5} />
            </button>
          </div>

          {/* ── BODY (warm cream) ── */}
          <div
            className="flex-1 overflow-y-auto"
            style={{ background: "#EDE8DC" }}
          >
            {/* Hero image */}
            <div className="w-full overflow-hidden" style={{ height: "260px" }}>
              <img
                src={pin.image}
                alt={pin.heading}
                className="w-full h-full object-cover"
                style={{ display: "block" }}
              />
            </div>

            {/* Content */}
            <div className="px-8 py-8">

              {/* Serif heading */}
              <h2
                className="mb-4 text-[#1A1A18] leading-tight"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(26px, 3.5vw, 34px)",
                  fontWeight: 400,
                  letterSpacing: "-0.01em",
                }}
              >
                {pin.heading}
              </h2>

              {/* Body text */}
              <p
                className="text-[#4A4A42] leading-relaxed mb-7"
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: "13.5px",
                  fontWeight: 300,
                  lineHeight: 1.75,
                }}
              >
                {pin.body}
              </p>

              {/* Tags (if any) */}
              {pin.tags && pin.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-7">
                  {pin.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 border border-[#2D3E30]/30 text-[#2D3E30] rounded-sm"
                      style={{
                        fontFamily: "'Jost', sans-serif",
                        fontSize: "10px",
                        fontWeight: 500,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Divider */}
              {pin.details && pin.details.length > 0 && (
                <div className="w-8 h-px bg-[#2D3E30]/30 mb-6" />
              )}

              {/* Detail list */}
              {pin.details && pin.details.length > 0 && (
                <ul className="space-y-3 mb-8">
                  {pin.details.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-[#4A4A42]"
                      style={{
                        fontFamily: "'Jost', sans-serif",
                        fontSize: "13px",
                        fontWeight: 300,
                        lineHeight: 1.6,
                      }}
                    >
                      {/* Small green bullet */}
                      <span
                        className="flex-shrink-0 mt-2 rounded-full"
                        style={{
                          width: 4,
                          height: 4,
                          background: "#2D3E30",
                          opacity: 0.5,
                        }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {/* CTA Links */}
              {pin.links && pin.links.length > 0 && (
                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#2D3E30]/15">
                  {pin.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.url}
                      target={link.url.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 transition-all group"
                      style={
                        link.style === "primary"
                          ? {
                              padding: "10px 22px",
                              background: "#2D3E30",
                              color: "#EDE8DC",
                              fontFamily: "'Jost', sans-serif",
                              fontSize: "11px",
                              fontWeight: 500,
                              letterSpacing: "0.12em",
                              textTransform: "uppercase",
                            }
                          : {
                              padding: "9px 20px",
                              border: "1px solid #2D3E30",
                              color: "#2D3E30",
                              fontFamily: "'Jost', sans-serif",
                              fontSize: "11px",
                              fontWeight: 500,
                              letterSpacing: "0.12em",
                              textTransform: "uppercase",
                            }
                      }
                    >
                      {link.label.toLowerCase().includes("github") ||
                      link.label.toLowerCase().includes("demo") ||
                      link.label.toLowerCase().includes("view") ? (
                        <ExternalLink size={11} strokeWidth={1.5} />
                      ) : (
                        <Download size={11} strokeWidth={1.5} />
                      )}
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
