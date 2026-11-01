import React from "react";
import { motion } from "motion/react";

/**
 * Premium Edge-Emerging Abstract Geometric Background Elements.
 * 
 * Design Direction:
 * - Oversized abstract geometric compositions emerging partially from left & right screen edges
 * - Semicircles, concentric curved rings, outlined geometric shapes, arcs, and layered forms
 * - Clear, noticeable visibility (opacity ~18-35% on strokes, 12-22% on gradient fills)
 * - Combinations of soft blue gradients (#60a5fa, #93c5fd, #38bdf8) and subtle grey/slate tones (#94a3b8, #cbd5e1)
 * - Responsive, lightweight SVG + CSS with zero layout shifts and pointer-events: none
 */

interface EdgeShapeProps {
  className?: string;
  size?: number;
  style?: React.CSSProperties;
}

// 1. Oversized Left-Edge Emerging Orbital & Concentric Ring Composition
export function EdgeEmergingLeft({
  className = "",
  size = 560,
  style,
}: EdgeShapeProps) {
  return (
    <motion.div
      className={`pointer-events-none select-none absolute -left-20 sm:-left-32 md:-left-44 lg:-left-56 -z-0 overflow-visible ${className}`}
      style={{ width: size, height: size, ...style }}
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 600 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <radialGradient
            id="leftGlow"
            cx="0"
            cy="300"
            r="380"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.18" />
            <stop offset="45%" stopColor="#60a5fa" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#93c5fd" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="leftStrokeGrad" x1="0" y1="100" x2="500" y2="500" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.45" />
            <stop offset="60%" stopColor="#93c5fd" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.10" />
          </linearGradient>
        </defs>

        {/* Soft Radial Ambient Depth Core */}
        <circle cx="0" cy="300" r="360" fill="url(#leftGlow)" />

        {/* Inner Solid Crescent Arc */}
        <path
          d="M 0 160 A 140 140 0 0 1 0 440"
          stroke="url(#leftStrokeGrad)"
          strokeWidth="2"
        />

        {/* Primary Concentric Ring with Light Blue Stroke */}
        <circle
          cx="0"
          cy="300"
          r="220"
          stroke="#60a5fa"
          strokeOpacity="0.32"
          strokeWidth="1.75"
        />

        {/* Secondary Dashed Ring in Soft Slate */}
        <circle
          cx="0"
          cy="300"
          r="290"
          stroke="#94a3b8"
          strokeOpacity="0.28"
          strokeWidth="1.25"
          strokeDasharray="8 8"
        />

        {/* Outer Fine Orbit Arc */}
        <circle
          cx="0"
          cy="300"
          r="380"
          stroke="#93c5fd"
          strokeOpacity="0.25"
          strokeWidth="1.5"
        />

        {/* Outermost Segmented Arc */}
        <path
          d="M 0 0 A 490 490 0 0 1 450 180"
          stroke="#38bdf8"
          strokeOpacity="0.22"
          strokeWidth="1.5"
          strokeDasharray="4 12"
        />
        <path
          d="M 450 420 A 490 490 0 0 1 0 600"
          stroke="#38bdf8"
          strokeOpacity="0.20"
          strokeWidth="1.5"
          strokeDasharray="4 12"
        />

        {/* Emerging Rounded Square Bracket Anchor */}
        <rect
          x="-20"
          y="230"
          width="140"
          height="140"
          rx="24"
          stroke="#93c5fd"
          strokeOpacity="0.24"
          strokeWidth="1.2"
        />

        {/* Radial Tick Lines radiating across the arc */}
        <line x1="220" y1="300" x2="245" y2="300" stroke="#60a5fa" strokeOpacity="0.4" strokeWidth="1.5" />
        <line x1="190" y1="190" x2="210" y2="175" stroke="#93c5fd" strokeOpacity="0.35" strokeWidth="1.5" />
        <line x1="190" y1="410" x2="210" y2="425" stroke="#93c5fd" strokeOpacity="0.35" strokeWidth="1.5" />
        <line x1="110" y1="110" x2="128" y2="92" stroke="#cbd5e1" strokeOpacity="0.3" strokeWidth="1.2" />
        <line x1="110" y1="490" x2="128" y2="508" stroke="#cbd5e1" strokeOpacity="0.3" strokeWidth="1.2" />

        {/* Accent Coordinate Crosses */}
        <g stroke="#60a5fa" strokeOpacity="0.45" strokeWidth="1.2">
          <path d="M 285 240 H 295 M 290 235 V 245" />
          <path d="M 375 350 H 385 M 380 345 V 355" />
        </g>

        {/* Orbital Node Points */}
        <circle cx="220" cy="300" r="3.5" fill="#60a5fa" fillOpacity="0.5" />
        <circle cx="205" cy="180" r="2.5" fill="#93c5fd" fillOpacity="0.45" />
        <circle cx="205" cy="420" r="2.5" fill="#93c5fd" fillOpacity="0.45" />
        <circle cx="380" cy="300" r="3" fill="#38bdf8" fillOpacity="0.4" />
      </svg>
    </motion.div>
  );
}

// 2. Oversized Right-Edge Emerging Layered Rings & Arcs Composition
export function EdgeEmergingRight({
  className = "",
  size = 560,
  style,
}: EdgeShapeProps) {
  return (
    <motion.div
      className={`pointer-events-none select-none absolute -right-20 sm:-right-32 md:-right-44 lg:-right-56 -z-0 overflow-visible ${className}`}
      style={{ width: size, height: size, ...style }}
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 600 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <radialGradient
            id="rightGlow"
            cx="600"
            cy="300"
            r="400"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#0284c7" stopOpacity="0.18" />
            <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#93c5fd" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="rightStrokeGrad" x1="600" y1="120" x2="100" y2="480" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.45" />
            <stop offset="60%" stopColor="#60a5fa" stopOpacity="0.30" />
            <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.15" />
          </linearGradient>
        </defs>

        {/* Ambient Depth Background */}
        <circle cx="600" cy="300" r="380" fill="url(#rightGlow)" />

        {/* Outermost sweeping arc */}
        <circle
          cx="600"
          cy="300"
          r="480"
          stroke="#94a3b8"
          strokeOpacity="0.22"
          strokeWidth="1.2"
          strokeDasharray="6 10"
        />

        {/* Primary Broad Arc */}
        <circle
          cx="600"
          cy="300"
          r="380"
          stroke="url(#rightStrokeGrad)"
          strokeWidth="1.75"
        />

        {/* Concentric Middle Ring */}
        <circle
          cx="600"
          cy="300"
          r="270"
          stroke="#60a5fa"
          strokeOpacity="0.32"
          strokeWidth="1.5"
        />

        {/* Concentric Tight Ring */}
        <circle
          cx="600"
          cy="300"
          r="170"
          stroke="#93c5fd"
          strokeOpacity="0.35"
          strokeWidth="1.5"
        />

        {/* Partial Arc Slice */}
        <path
          d="M 600 50 A 250 250 0 0 0 350 300"
          stroke="#38bdf8"
          strokeOpacity="0.38"
          strokeWidth="2"
        />

        {/* Emerging Diagonal Tangent Line */}
        <line
          x1="600"
          y1="180"
          x2="280"
          y2="500"
          stroke="#cbd5e1"
          strokeOpacity="0.25"
          strokeWidth="1"
          strokeDasharray="5 7"
        />

        {/* Outlined Diamond / Angled Box Accent */}
        <rect
          x="340"
          y="280"
          width="40"
          height="40"
          rx="8"
          transform="rotate(45 360 300)"
          stroke="#60a5fa"
          strokeOpacity="0.35"
          strokeWidth="1.2"
        />

        {/* Radial tick marks */}
        <line x1="380" y1="300" x2="355" y2="300" stroke="#38bdf8" strokeOpacity="0.4" strokeWidth="1.5" />
        <line x1="410" y1="180" x2="390" y2="165" stroke="#93c5fd" strokeOpacity="0.35" strokeWidth="1.5" />
        <line x1="410" y1="420" x2="390" y2="435" stroke="#93c5fd" strokeOpacity="0.35" strokeWidth="1.5" />

        {/* Cross Markers */}
        <g stroke="#93c5fd" strokeOpacity="0.45" strokeWidth="1.2">
          <path d="M 230 300 H 240 M 235 295 V 305" />
          <path d="M 310 190 H 320 M 315 185 V 195" />
          <path d="M 310 410 H 320 M 315 405 V 415" />
        </g>

        {/* Small Node Dots */}
        <circle cx="330" cy="300" r="3.5" fill="#38bdf8" fillOpacity="0.5" />
        <circle cx="430" cy="180" r="2.5" fill="#60a5fa" fillOpacity="0.45" />
        <circle cx="430" cy="420" r="2.5" fill="#60a5fa" fillOpacity="0.45" />
      </svg>
    </motion.div>
  );
}

// 3. Left Edge Architectural Wave / Nested Frames
export function EdgeEmergingLeftArch({
  className = "",
  size = 520,
  style,
}: EdgeShapeProps) {
  return (
    <motion.div
      className={`pointer-events-none select-none absolute -left-16 sm:-left-28 md:-left-40 lg:-left-48 -z-0 overflow-visible ${className}`}
      style={{ width: size, height: size, ...style }}
      initial={{ opacity: 0, x: -25 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="leftArchGrad" x1="0" y1="0" x2="400" y2="400" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#93c5fd" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Nested Rounded Frames emerging from border */}
        <rect
          x="-60"
          y="80"
          width="320"
          height="340"
          rx="40"
          stroke="url(#leftArchGrad)"
          strokeWidth="1.5"
        />
        <rect
          x="-80"
          y="130"
          width="260"
          height="240"
          rx="32"
          stroke="#94a3b8"
          strokeOpacity="0.22"
          strokeWidth="1"
          strokeDasharray="6 6"
        />
        <rect
          x="-100"
          y="180"
          width="200"
          height="140"
          rx="24"
          stroke="#38bdf8"
          strokeOpacity="0.32"
          strokeWidth="1.5"
        />

        {/* Outer Circular Arc slicing across the frames */}
        <circle
          cx="0"
          cy="250"
          r="380"
          stroke="#60a5fa"
          strokeOpacity="0.3"
          strokeWidth="1.5"
        />

        {/* Horizontal Technical Measurement lines */}
        <line x1="260" y1="120" x2="380" y2="120" stroke="#cbd5e1" strokeOpacity="0.25" strokeWidth="1" />
        <line x1="260" y1="380" x2="400" y2="380" stroke="#93c5fd" strokeOpacity="0.3" strokeWidth="1" strokeDasharray="4 6" />

        {/* Dot Cluster Accent */}
        <circle cx="380" cy="120" r="3" fill="#60a5fa" fillOpacity="0.45" />
        <circle cx="400" cy="380" r="3" fill="#38bdf8" fillOpacity="0.45" />
        <circle cx="260" cy="250" r="4" fill="#93c5fd" fillOpacity="0.4" />
      </svg>
    </motion.div>
  );
}

// 4. Right Edge Modern Semicircular Radar / Halo
export function EdgeEmergingRightHalo({
  className = "",
  size = 520,
  style,
}: EdgeShapeProps) {
  return (
    <motion.div
      className={`pointer-events-none select-none absolute -right-16 sm:-right-28 md:-right-40 lg:-right-48 -z-0 overflow-visible ${className}`}
      style={{ width: size, height: size, ...style }}
      initial={{ opacity: 0, x: 25 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <radialGradient id="haloGlow" cx="500" cy="250" r="350" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.16" />
            <stop offset="70%" stopColor="#93c5fd" stopOpacity="0.04" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        <circle cx="500" cy="250" r="320" fill="url(#haloGlow)" />

        {/* Concentric Semicircles */}
        <path
          d="M 500 50 A 200 200 0 0 0 500 450"
          stroke="#60a5fa"
          strokeOpacity="0.35"
          strokeWidth="1.75"
        />
        <path
          d="M 500 120 A 130 130 0 0 0 500 380"
          stroke="#93c5fd"
          strokeOpacity="0.3"
          strokeWidth="1.5"
          strokeDasharray="6 8"
        />
        <path
          d="M 500 190 A 60 60 0 0 0 500 310"
          stroke="#38bdf8"
          strokeOpacity="0.4"
          strokeWidth="1.5"
        />
        <path
          d="M 500 -20 A 270 270 0 0 0 500 520"
          stroke="#cbd5e1"
          strokeOpacity="0.22"
          strokeWidth="1.2"
        />

        {/* Tangent Guide lines */}
        <line x1="300" y1="250" x2="160" y2="250" stroke="#93c5fd" strokeOpacity="0.28" strokeWidth="1" strokeDasharray="4 6" />
        <circle cx="160" cy="250" r="2.5" fill="#60a5fa" fillOpacity="0.45" />

        {/* Perimeter Cross */}
        <g stroke="#60a5fa" strokeOpacity="0.4" strokeWidth="1.2">
          <path d="M 295 245 V 255 M 290 250 H 300" />
          <path d="M 230 150 V 160 M 225 155 H 235" />
          <path d="M 230 340 V 350 M 225 345 H 235" />
        </g>
      </svg>
    </motion.div>
  );
}

// Retain and enhance existing components for subtle secondary accents:
interface ShapeProps {
  className?: string;
  size?: number;
  style?: React.CSSProperties;
}

export function GeometricRing({ className = "", size = 130, style }: ShapeProps) {
  return (
    <motion.div
      className={`pointer-events-none select-none ${className}`}
      style={style}
      animate={{ rotate: 360 }}
      transition={{ duration: 140, repeat: Infinity, ease: "linear" }}
      aria-hidden="true"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <circle
          cx="60"
          cy="60"
          r="54"
          stroke="#60a5fa"
          strokeOpacity="0.24"
          strokeWidth="1.5"
        />
        <circle
          cx="60"
          cy="60"
          r="38"
          stroke="#94a3b8"
          strokeOpacity="0.22"
          strokeWidth="1.2"
          strokeDasharray="4 6"
        />
        <circle
          cx="60"
          cy="60"
          r="3.5"
          fill="#38bdf8"
          fillOpacity="0.35"
        />
      </svg>
    </motion.div>
  );
}

export function GeometricSquare({
  className = "",
  size = 110,
  rounded = 18,
  rotation = 15,
  style,
}: ShapeProps & { rounded?: number; rotation?: number }) {
  return (
    <motion.div
      className={`pointer-events-none select-none ${className}`}
      style={{ transform: `rotate(${rotation}deg)`, ...style }}
      animate={{
        y: [0, -6, 0],
        rotate: [rotation, rotation + 3, rotation],
      }}
      transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden="true"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <rect
          x="6"
          y="6"
          width="88"
          height="88"
          rx={rounded}
          stroke="#cbd5e1"
          strokeOpacity="0.22"
          strokeWidth="1.5"
        />
        <rect
          x="22"
          y="22"
          width="56"
          height="56"
          rx={Math.max(4, rounded - 8)}
          stroke="#93c5fd"
          strokeOpacity="0.25"
          strokeWidth="1.2"
        />
      </svg>
    </motion.div>
  );
}

export function GeometricArc({ className = "", size = 120, style }: ShapeProps) {
  return (
    <motion.div
      className={`pointer-events-none select-none ${className}`}
      style={style}
      animate={{
        rotate: [0, 8, 0],
      }}
      transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden="true"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 110 110"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <path
          d="M 15 95 A 80 80 0 0 1 95 15"
          stroke="#60a5fa"
          strokeOpacity="0.30"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
        <path
          d="M 32 95 A 63 63 0 0 1 95 32"
          stroke="#94a3b8"
          strokeOpacity="0.22"
          strokeWidth="1.2"
          strokeDasharray="4 6"
          strokeLinecap="round"
        />
        <circle cx="95" cy="15" r="3" fill="#38bdf8" fillOpacity="0.4" />
      </svg>
    </motion.div>
  );
}

export function GeometricLines({
  className = "",
  width = 150,
  height = 70,
  style,
}: {
  className?: string;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`pointer-events-none select-none ${className}`}
      style={style}
      aria-hidden="true"
    >
      <svg
        width={width}
        height={height}
        viewBox="0 0 140 70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <line
          x1="0"
          y1="15"
          x2="140"
          y2="15"
          stroke="#cbd5e1"
          strokeOpacity="0.2"
          strokeWidth="1.2"
        />
        <line
          x1="25"
          y1="35"
          x2="120"
          y2="35"
          stroke="#93c5fd"
          strokeOpacity="0.28"
          strokeWidth="1.2"
          strokeDasharray="6 8"
        />
        <line
          x1="45"
          y1="55"
          x2="140"
          y2="55"
          stroke="#94a3b8"
          strokeOpacity="0.2"
          strokeWidth="1.2"
        />
      </svg>
    </div>
  );
}

export function GeometricCrossCluster({ className = "", style }: ShapeProps) {
  return (
    <div
      className={`pointer-events-none select-none ${className}`}
      style={style}
      aria-hidden="true"
    >
      <svg
        width="64"
        height="64"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 12 8 V 16 M 8 12 H 16"
          stroke="#93c5fd"
          strokeOpacity="0.26"
          strokeWidth="1.2"
        />
        <path
          d="M 52 8 V 16 M 48 12 H 56"
          stroke="#94a3b8"
          strokeOpacity="0.22"
          strokeWidth="1.2"
        />
        <path
          d="M 12 48 V 56 M 8 52 H 16"
          stroke="#cbd5e1"
          strokeOpacity="0.22"
          strokeWidth="1.2"
        />
        <path
          d="M 52 48 V 56 M 48 52 H 56"
          stroke="#93c5fd"
          strokeOpacity="0.28"
          strokeWidth="1.2"
        />
        <circle cx="32" cy="32" r="2.5" fill="#60a5fa" fillOpacity="0.3" />
      </svg>
    </div>
  );
}

export function SoftDepthGradient({
  className = "",
  size = 420,
  color = "blue",
  style,
}: ShapeProps & { color?: "blue" | "grey" }) {
  const gradientColor =
    color === "blue" ? "rgba(96, 165, 250, 0.16)" : "rgba(148, 163, 184, 0.12)";

  return (
    <div
      className={`pointer-events-none select-none rounded-full blur-[90px] ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${gradientColor} 0%, transparent 70%)`,
        ...style,
      }}
      aria-hidden="true"
    />
  );
}
