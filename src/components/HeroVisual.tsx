import React, { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { Sparkles, Cpu, Zap } from "lucide-react";

export function HeroVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Smooth 3D mouse parallax values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Dynamic spring physics for natural, fluid 3D tilt and snappy return
  const springConfig = { damping: 24, stiffness: 260, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Pronounced, engaging 3D rotation angles
  const rotateX = useTransform(smoothY, [-1, 1], [14, -14]);
  const rotateY = useTransform(smoothX, [-1, 1], [-16, 16]);

  // Handle mouse movement strictly within the visual container
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = (e.clientX - centerX) / (rect.width / 2);
    const y = (e.clientY - centerY) / (rect.height / 2);
    mouseX.set(Math.max(-1, Math.min(1, x)));
    mouseY.set(Math.max(-1, Math.min(1, y)));
  };

  // As soon as cursor leaves the picture area, immediately snap back to 0 (seedha)
  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-lg lg:max-w-2xl mx-auto flex items-center justify-center py-6 sm:py-8 select-none"
      style={{ perspective: 1100 }}
    >
      {/* Dynamic 3D Tilt Wrapper */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full flex items-center justify-center"
      >
        {/* ========================================================= */}
        {/* 1. SEAMLESS ISOMETRIC CYBER PEDESTAL (Behind the Core)     */}
        {/* Rendered with isometric SVG ellipses to avoid 3D plane cuts */}
        {/* ========================================================= */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10 translate-y-16 sm:translate-y-20"
          style={{ transform: "translateZ(-20px)" }}
        >
          {/* Neon Radial Gradient Glow */}
          <div className="absolute w-[380px] sm:w-[460px] h-[200px] rounded-full bg-gradient-to-tr from-violet-600/35 via-brand/25 to-cyan-400/20 blur-[50px] animate-pulse" />

          {/* Isometric Cyber Ellipses SVG */}
          <svg
            className="w-[360px] sm:w-[480px] lg:w-[520px] h-[220px] sm:h-[260px] overflow-visible"
            viewBox="0 0 500 260"
            fill="none"
          >
            <defs>
              <linearGradient id="pedestalStroke" x1="0" y1="0" x2="500" y2="260" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.6" />
                <stop offset="50%" stopColor="#a855f7" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.5" />
              </linearGradient>
              <radialGradient id="pedestalFloor" cx="250" cy="140" r="220" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.2" />
                <stop offset="60%" stopColor="#06b6d4" stopOpacity="0.05" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
            </defs>

            {/* Glowing Floor Base */}
            <ellipse cx="250" cy="140" rx="230" ry="90" fill="url(#pedestalFloor)" />

            {/* Outer Concentric Ellipse with dashes */}
            <ellipse
              cx="250"
              cy="140"
              rx="230"
              ry="90"
              stroke="#94a3b8"
              strokeOpacity="0.3"
              strokeWidth="1.2"
              strokeDasharray="6 8"
            />

            {/* Middle Glowing Ring */}
            <ellipse
              cx="250"
              cy="140"
              rx="180"
              ry="70"
              stroke="url(#pedestalStroke)"
              strokeWidth="1.75"
            />

            {/* Inner Ring */}
            <ellipse
              cx="250"
              cy="140"
              rx="125"
              ry="48"
              stroke="#38bdf8"
              strokeOpacity="0.5"
              strokeWidth="1.2"
              strokeDasharray="4 6"
            />

            {/* Micro Coordinate Crosshairs */}
            <g stroke="#60a5fa" strokeOpacity="0.5" strokeWidth="1">
              <line x1="250" y1="45" x2="250" y2="235" strokeDasharray="3 5" />
              <line x1="20" y1="140" x2="480" y2="140" strokeDasharray="3 5" />
              <circle cx="250" cy="140" r="3" fill="#a855f7" />
              <circle cx="70" cy="140" r="2.5" fill="#38bdf8" />
              <circle cx="430" cy="140" r="2.5" fill="#38bdf8" />
            </g>
          </svg>
        </div>

        {/* ========================================================= */}
        {/* 2. THE MAIN 3D ISOMETRIC TECH CUBE + CYBER LASER BEAM     */}
        {/* ========================================================= */}
        <motion.div
          animate={{
            y: [-8, 8, -8],
          }}
          transition={{
            repeat: Infinity,
            duration: 5,
            ease: "easeInOut",
          }}
          style={{ transform: "translateZ(30px)" }}
          className="relative z-10 w-full flex items-center justify-center"
        >
          {/* Ambient Brand Glow */}
          <div className="absolute w-64 sm:w-80 h-64 sm:h-80 bg-brand/25 blur-[80px] rounded-full pointer-events-none" />

          {/* The Motherboard Image & Laser Container */}
          <div className="relative group overflow-hidden rounded-3xl">
            <img
              src="/hero-asset.png"
              alt="Aurex Digital Tech Ecosystem"
              className="w-full h-auto max-h-[440px] lg:max-h-[480px] object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.65)] drop-shadow-[0_0_30px_rgba(147,51,234,0.3)] transition-transform duration-500 group-hover:scale-105"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (!target.src.includes("image-removebg-preview")) {
                  target.src = "/image-removebg-preview (8).png";
                }
              }}
            />

            {/* ========================================================= */}
            {/* ULTRA-SLEEK NEON CYBER LASER BEAM (No hard glass edges)   */}
            {/* A radiant 2px cyan/purple laser wire with glowing flare   */}
            {/* ========================================================= */}
            <motion.div
              animate={{
                top: ["-5%", "105%"],
                opacity: [0, 1, 1, 0.8, 0],
              }}
              transition={{
                duration: 3.2,
                repeat: Infinity,
                ease: "easeInOut",
                repeatDelay: 1.2,
              }}
              className="absolute left-0 right-0 pointer-events-none flex items-center justify-center"
            >
              {/* Diffused Glow Aura (tapered horizontally so zero rectangular edge) */}
              <div
                className="absolute w-full h-6 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(56, 189, 248, 0.4) 0%, rgba(168, 85, 247, 0.25) 45%, transparent 75%)",
                  filter: "blur(5px)",
                }}
              />

              {/* Needle-sharp 2px Luminous Laser Wire with Gradient Falloff */}
              <div
                className="relative w-full h-[2px]"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, rgba(56, 189, 248, 0.15) 15%, #38bdf8 38%, #ffffff 50%, #c084fc 62%, rgba(168, 85, 247, 0.15) 85%, transparent 100%)",
                  boxShadow:
                    "0 0 10px #38bdf8, 0 0 20px #a855f7, 0 0 30px rgba(56, 189, 248, 0.7)",
                }}
              >
                {/* Central High-Intensity Laser Spark Flare */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white blur-[2px] shadow-[0_0_15px_#38bdf8]" />
                <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-300 blur-[1px] shadow-[0_0_10px_#38bdf8]" />
                <div className="absolute top-1/2 left-2/3 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-violet-300 blur-[1px] shadow-[0_0_10px_#a855f7]" />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* ========================================================= */}
        {/* 3. FLOATING HUD TECH CARDS (Framed in Outer Margins)      */}
        {/* Placed clearly outside the motherboard circuits           */}
        {/* ========================================================= */}

        {/* Card 1: Top-Right "AI Core Active" */}
        <motion.div
          animate={{
            y: [-6, 6, -6],
          }}
          transition={{
            duration: 4.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          whileHover={{ scale: 1.05 }}
          style={{ transform: "translateZ(65px)" }}
          className="absolute -top-4 sm:-top-2 -right-1 sm:-right-4 lg:-right-8 z-20 pointer-events-auto"
        >
          <div className="p-2.5 sm:p-3.5 rounded-2xl bg-slate-900/90 dark:bg-slate-950/90 backdrop-blur-md border border-violet-500/40 shadow-xl shadow-black/40 flex items-center gap-3 preserve-white">
            {/* Glowing Icon */}
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-violet-600 to-brand flex items-center justify-center text-white shadow-md shadow-violet-500/30">
              <Cpu className="w-5 h-5 animate-pulse" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-950 animate-ping" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-950" />
            </div>

            {/* Information */}
            <div className="text-left pr-1 sm:pr-2">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-violet-400">AI Engine</span>
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-semibold">ACTIVE</span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-white tracking-tight">Smart Automation</p>
              <p className="text-[11px] text-slate-300 font-mono mt-0.5">99.8% Efficiency</p>
            </div>
          </div>
        </motion.div>

        {/* Card 2: Bottom-Left "Ultra-Fast Systems" (Shifted down so circuits are visible) */}
        <motion.div
          animate={{
            y: [6, -6, 6],
          }}
          transition={{
            duration: 4.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
          whileHover={{ scale: 1.05 }}
          style={{ transform: "translateZ(60px)" }}
          className="absolute -bottom-8 sm:-bottom-6 -left-1 sm:-left-4 lg:-left-8 z-20 pointer-events-auto"
        >
          <div className="p-2.5 sm:p-3.5 rounded-2xl bg-slate-900/90 dark:bg-slate-950/90 backdrop-blur-md border border-cyan-500/40 shadow-xl shadow-black/40 flex items-center gap-3 preserve-white">
            {/* Icon */}
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/30">
              <Zap className="w-5 h-5" />
            </div>

            {/* Information & Animated Equalizer */}
            <div className="text-left pr-1 sm:pr-2">
              <div className="flex items-center justify-between gap-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">Cloud Tech</span>
                {/* Live micro-bars */}
                <div className="flex items-end gap-0.5 h-2.5">
                  <motion.span
                    animate={{ height: ["30%", "100%", "40%"] }}
                    transition={{ duration: 0.7, repeat: Infinity }}
                    className="w-1 bg-cyan-400 rounded-full"
                  />
                  <motion.span
                    animate={{ height: ["80%", "20%", "90%"] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                    className="w-1 bg-violet-400 rounded-full"
                  />
                  <motion.span
                    animate={{ height: ["40%", "90%", "30%"] }}
                    transition={{ duration: 0.8, repeat: Infinity, delay: 0.3 }}
                    className="w-1 bg-cyan-300 rounded-full"
                  />
                </div>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-white tracking-tight">Ultra-Fast Systems</p>
              <p className="text-[11px] text-slate-300 font-mono mt-0.5">&lt; 100ms Latency</p>
            </div>
          </div>
        </motion.div>

        {/* Badge 3: Top-Left Floating Growth Pill */}
        <motion.div
          animate={{
            y: [-5, 5, -5],
          }}
          transition={{
            duration: 5.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ transform: "translateZ(50px)" }}
          className="absolute top-8 sm:top-10 -left-1 sm:-left-4 lg:-left-6 z-20 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 dark:bg-slate-950/90 backdrop-blur-md border border-brand/40 shadow-lg preserve-white"
        >
          <Sparkles className="w-3.5 h-3.5 text-brand-light animate-spin" style={{ animationDuration: "8s" }} />
          <span className="text-xs font-semibold text-white">10x Business Scaling</span>
        </motion.div>

        {/* Floating Digital Particles around the scene */}
        <div className="absolute inset-0 pointer-events-none z-15 overflow-hidden">
          {[
            { top: "25%", left: "15%", delay: 0, duration: 3.5, size: 4 },
            { top: "65%", left: "12%", delay: 1.2, duration: 4.2, size: 3 },
            { top: "30%", right: "18%", delay: 0.7, duration: 3.8, size: 4 },
            { top: "72%", right: "14%", delay: 1.8, duration: 4.5, size: 3 },
          ].map((spark, idx) => (
            <motion.div
              key={idx}
              animate={{
                y: [0, -25, 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: spark.duration,
                repeat: Infinity,
                delay: spark.delay,
                ease: "easeInOut",
              }}
              className="absolute rounded-full bg-gradient-to-tr from-cyan-400 to-violet-300 shadow-[0_0_8px_rgba(56,189,248,0.7)]"
              style={{
                top: spark.top,
                left: spark.left,
                right: (spark as { right?: string }).right,
                width: spark.size,
                height: spark.size,
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
