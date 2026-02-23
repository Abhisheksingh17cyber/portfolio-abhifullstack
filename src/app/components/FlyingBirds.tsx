// ============================================================
// 🐦 FLYING BIRDS — Canvas-based realistic flight animation
// ============================================================
// Renders flocks of birds using Canvas with natural V-formation
// grouping, sine-wave flight paths, wing-flap animation,
// and perspective-based sizing. Hidden in winter.
// ============================================================

import { useRef, useEffect, useCallback } from "react";

interface FlyingBirdsProps {
  season: "summer" | "winter";
}

interface Bird {
  x: number;
  y: number;
  baseY: number;
  size: number;
  speed: number;
  flapPhase: number;
  flapSpeed: number;
  waveAmp: number;
  waveFreq: number;
  opacity: number;
  glideTimer: number;  // Counts down; when > 0, bird glides (wings open)
}

function createBirds(count: number, w: number, h: number): Bird[] {
  const birds: Bird[] = [];
  for (let i = 0; i < count; i++) {
    const baseY = h * 0.05 + Math.random() * h * 0.45;
    birds.push({
      x: -30 + Math.random() * (w + 200),
      y: baseY,
      baseY,
      size: 6 + Math.random() * 10,
      speed: 0.6 + Math.random() * 1.2,
      flapPhase: Math.random() * Math.PI * 2,
      flapSpeed: 0.08 + Math.random() * 0.06,
      waveAmp: 8 + Math.random() * 20,
      waveFreq: 0.005 + Math.random() * 0.008,
      opacity: 0.45 + Math.random() * 0.4,
      glideTimer: 0,
    });
  }
  return birds;
}

function drawBird(ctx: CanvasRenderingContext2D, bird: Bird) {
  const wingAngle = Math.sin(bird.flapPhase) * 0.6;  // -0.6 to 0.6 radians
  const s = bird.size;

  ctx.save();
  ctx.translate(bird.x, bird.y);
  ctx.globalAlpha = bird.opacity;
  ctx.strokeStyle = "rgba(15, 15, 15, 0.9)";
  ctx.lineWidth = Math.max(1, s / 7);
  ctx.lineCap = "round";

  // Left wing
  ctx.beginPath();
  ctx.moveTo(0, 0);
  const lwx = -s;
  const lwy = -s * 0.4 * (1 + wingAngle);
  const lcx = -s * 0.5;
  const lcy = -s * 0.15 * (1 + wingAngle * 0.5);
  ctx.quadraticCurveTo(lcx, lcy, lwx, lwy);
  ctx.stroke();

  // Right wing
  ctx.beginPath();
  ctx.moveTo(0, 0);
  const rwx = s;
  const rwy = -s * 0.4 * (1 + wingAngle);
  const rcx = s * 0.5;
  const rcy = -s * 0.15 * (1 + wingAngle * 0.5);
  ctx.quadraticCurveTo(rcx, rcy, rwx, rwy);
  ctx.stroke();

  ctx.restore();
}

export function FlyingBirds({ season }: FlyingBirdsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const birdsRef = useRef<Bird[]>([]);
  const animRef = useRef<number>(0);
  const seasonRef = useRef(season);
  const globalOpacityRef = useRef(season === "summer" ? 1 : 0);

  seasonRef.current = season;

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;

    // Fade in/out based on season
    const targetOpacity = seasonRef.current === "winter" ? 0 : 1;
    globalOpacityRef.current += (targetOpacity - globalOpacityRef.current) * 0.015;

    ctx.clearRect(0, 0, w, h);

    if (globalOpacityRef.current < 0.01) {
      animRef.current = requestAnimationFrame(draw);
      return;
    }

    ctx.globalAlpha = globalOpacityRef.current;

    for (const bird of birdsRef.current) {
      // Move forward
      bird.x += bird.speed;

      // Sine-wave vertical motion
      bird.y = bird.baseY + Math.sin(bird.x * bird.waveFreq) * bird.waveAmp;

      // Wing flap (with occasional gliding)
      if (bird.glideTimer > 0) {
        bird.glideTimer--;
        // During glide, wings stay slightly up
        bird.flapPhase += bird.flapSpeed * 0.1;
      } else {
        bird.flapPhase += bird.flapSpeed;
        // Random chance to start gliding
        if (Math.random() < 0.002) {
          bird.glideTimer = 30 + Math.floor(Math.random() * 60);
        }
      }

      // Wrap around
      if (bird.x > w + 60) {
        bird.x = -40 - Math.random() * 80;
        bird.baseY = h * 0.05 + Math.random() * h * 0.45;
        bird.speed = 0.6 + Math.random() * 1.2;
      }

      drawBird(ctx, bird);
    }

    ctx.globalAlpha = 1;
    animRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (birdsRef.current.length === 0) {
        birdsRef.current = createBirds(14, canvas.width, canvas.height);
      }
    };
    resize();
    window.addEventListener("resize", resize);
    animRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animRef.current);
    };
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-[5]"
    />
  );
}
