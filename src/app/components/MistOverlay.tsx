// ============================================================
// 🌫️ MIST OVERLAY COMPONENT
// ============================================================
// Multiple semi-transparent gradient layers that drift
// horizontally at different speeds to simulate fog/mist
// rolling over the forest canopy.
//
// Season-aware:
//  Summer: warm, thin mist (low opacity, warm tint)
//  Winter: thick, cool fog (high opacity, blue-white tint)
// ============================================================

interface MistOverlayProps {
    season: "summer" | "winter";
}

interface MistLayerConfig {
    id: number;
    height: string;
    top: string;
    duration: number;
    opacity: number;
    opacityWinter: number;
    gradientSummer: string;
    gradientWinter: string;
    delay: number;
}

const MIST_LAYERS: MistLayerConfig[] = [
    {
        id: 1,
        height: "35%",
        top: "55%",
        duration: 45,
        opacity: 0.15,
        opacityWinter: 0.4,
        gradientSummer:
            "radial-gradient(ellipse 80% 50% at 30% 50%, rgba(200,210,195,0.5), transparent 70%)",
        gradientWinter:
            "radial-gradient(ellipse 80% 50% at 30% 50%, rgba(220,230,240,0.6), transparent 70%)",
        delay: 0,
    },
    {
        id: 2,
        height: "28%",
        top: "62%",
        duration: 55,
        opacity: 0.12,
        opacityWinter: 0.35,
        gradientSummer:
            "radial-gradient(ellipse 70% 45% at 60% 50%, rgba(190,200,185,0.45), transparent 65%)",
        gradientWinter:
            "radial-gradient(ellipse 70% 45% at 60% 50%, rgba(210,220,235,0.55), transparent 65%)",
        delay: -15,
    },
    {
        id: 3,
        height: "22%",
        top: "70%",
        duration: 38,
        opacity: 0.1,
        opacityWinter: 0.3,
        gradientSummer:
            "radial-gradient(ellipse 90% 60% at 50% 50%, rgba(180,195,175,0.4), transparent 75%)",
        gradientWinter:
            "radial-gradient(ellipse 90% 60% at 50% 50%, rgba(200,215,230,0.5), transparent 75%)",
        delay: -25,
    },
    {
        id: 4,
        height: "18%",
        top: "45%",
        duration: 60,
        opacity: 0.08,
        opacityWinter: 0.25,
        gradientSummer:
            "radial-gradient(ellipse 60% 40% at 40% 50%, rgba(210,215,200,0.35), transparent 60%)",
        gradientWinter:
            "radial-gradient(ellipse 60% 40% at 40% 50%, rgba(225,235,245,0.45), transparent 60%)",
        delay: -8,
    },
    {
        id: 5,
        height: "30%",
        top: "35%",
        duration: 50,
        opacity: 0.06,
        opacityWinter: 0.2,
        gradientSummer:
            "radial-gradient(ellipse 75% 55% at 70% 50%, rgba(195,205,190,0.3), transparent 70%)",
        gradientWinter:
            "radial-gradient(ellipse 75% 55% at 70% 50%, rgba(215,225,240,0.4), transparent 70%)",
        delay: -18,
    },
];

export function MistOverlay({ season }: MistOverlayProps) {
    const isWinter = season === "winter";

    return (
        <div className="absolute inset-0 pointer-events-none z-[4] overflow-hidden">
            {MIST_LAYERS.map((layer) => (
                <div
                    key={layer.id}
                    className="absolute mist-drift"
                    style={{
                        top: layer.top,
                        height: layer.height,
                        left: 0,
                        width: "250%",
                        background: isWinter ? layer.gradientWinter : layer.gradientSummer,
                        opacity: isWinter ? layer.opacityWinter : layer.opacity,
                        animationDuration: `${layer.duration}s`,
                        animationDelay: `${layer.delay}s`,
                        transition: "opacity 1.8s ease-in-out, background 1.8s ease-in-out",
                    }}
                />
            ))}

            {/* Extra bottom ground-fog layer */}
            <div
                className="absolute bottom-0 left-0 w-full"
                style={{
                    height: "20%",
                    background: isWinter
                        ? "linear-gradient(to top, rgba(200,215,230,0.35), transparent)"
                        : "linear-gradient(to top, rgba(180,195,175,0.15), transparent)",
                    transition: "background 1.8s ease-in-out",
                }}
            />
        </div>
    );
}
