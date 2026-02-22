// ============================================================
// 🧭 COMPASS ROSE COMPONENT
// ============================================================
// Decorative compass shown in the bottom-left corner,
// exactly like the Primland site.
// ============================================================

export function CompassRose() {
  return (
    <div className="absolute bottom-8 left-8 z-20 flex flex-col items-center">
      {/* SVG Compass */}
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity: 0.85 }}
      >
        {/* Outer circle */}
        <circle cx="24" cy="24" r="22" stroke="white" strokeWidth="0.75" strokeOpacity="0.5" />
        <circle cx="24" cy="24" r="17" stroke="white" strokeWidth="0.5" strokeOpacity="0.3" />

        {/* North arrow (solid, pointing up) */}
        <path d="M24 4 L26.5 20 L24 18 L21.5 20 Z" fill="white" />

        {/* South arrow (outline/hollow) */}
        <path d="M24 44 L21.5 28 L24 30 L26.5 28 Z" fill="white" fillOpacity="0.4" />

        {/* East marker */}
        <line x1="38" y1="24" x2="34" y2="24" stroke="white" strokeWidth="0.75" strokeOpacity="0.5" />

        {/* West marker */}
        <line x1="10" y1="24" x2="14" y2="24" stroke="white" strokeWidth="0.75" strokeOpacity="0.5" />

        {/* Center dot */}
        <circle cx="24" cy="24" r="2" fill="white" fillOpacity="0.8" />
      </svg>

      {/* N label */}
      <span
        className="text-white mt-1"
        style={{
          fontFamily: "'Jost', sans-serif",
          fontSize: "9px",
          fontWeight: 400,
          letterSpacing: "0.15em",
          opacity: 0.7,
          textTransform: "uppercase",
        }}
      >
        N
      </span>
    </div>
  );
}
