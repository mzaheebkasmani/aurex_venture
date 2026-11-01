import React from "react";
import { motion } from "motion/react";
import { Linkedin } from "lucide-react";
import { MagneticButton } from "@/components/MagneticButton";

const team = [
  {
    name: "AHMED ALI",
    role: "Founder and CEO",
    image: "/team-1.png",
    linkedin: "https://linkedin.com",
  },
  {
    name: "ALI KHAN",
    role: "Graphic & UI/UX designer",
    image: "/team-2.png",
    linkedin: "https://linkedin.com",
  },
  {
    name: "WALEED KHAN",
    role: "AI Automation Engineer",
    image: "/team-3.png",
    linkedin: "https://linkedin.com",
  },
  {
    name: "MUBASHIR",
    role: "Full Stack Developer",
    image: "/team-4.png",
    linkedin: "https://linkedin.com",
  }
];

import {
  EdgeEmergingLeft,
  SoftDepthGradient,
} from "@/components/GeometricShapes";

export function Team() {
  return (
    <section id="team" className="py-16 sm:py-24 bg-transparent relative overflow-hidden">
      {/* Edge-Emerging Geometric Shapes */}
      <EdgeEmergingLeft size={560} className="top-12" />
      <SoftDepthGradient
        size={460}
        color="blue"
        className="absolute bottom-12 -right-24 -z-10 opacity-60 hidden md:block"
      />

      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-brand/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 gap-4 sm:gap-6">
          <div>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white uppercase tracking-tight"
            >
              THE PEOPLES <br />
              <span className="text-brand">Behind Aurex</span>
            </motion.h2>
          </div>
          <MagneticButton>
            <button className="text-slate-900 dark:text-white font-medium flex items-center gap-2 hover:text-brand transition-colors text-sm group">
              View full portfolio <span aria-hidden="true" className="transform group-hover:translate-x-1 transition-transform">&rarr;</span>
            </button>
          </MagneticButton>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col group rounded-xl overflow-hidden border border-slate-800/80 hover:border-brand/50 transition-all duration-500 shadow-xl shadow-black/40 hover:shadow-brand/10 hover:-translate-y-1.5 cursor-pointer bg-slate-900/60 backdrop-blur-sm"
            >
              {/* Portrait Container with Studio Styling */}
              <div className="w-full aspect-[3/4] bg-gradient-to-b from-[#141a2e] via-[#0f1424] to-[#090c17] relative overflow-hidden flex items-end justify-center">
                {/* Top Subtle Edge Rim Highlight */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent z-20" />

                {/* Overhead Studio Ambient Glow */}
                <div className="absolute -top-14 left-1/2 -translate-x-1/2 w-44 h-44 rounded-full bg-brand/25 blur-3xl pointer-events-none group-hover:bg-brand/40 transition-colors duration-500 z-0" />

                {/* Studio Spotlight Halo behind Head & Shoulders */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,rgba(155,81,224,0.35)_0%,rgba(99,42,160,0.12)_45%,transparent_75%)] group-hover:opacity-100 opacity-90 transition-opacity duration-500 z-0" />

                {/* Cinematic Vignette */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_55%,rgba(5,7,14,0.65)_100%)] pointer-events-none z-0" />

                {/* Portrait Cutout Photo */}
                <img
                  src={member.image}
                  alt={member.name}
                  className="relative z-10 w-full h-full object-cover object-top filter brightness-[1.02] contrast-[1.03] group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />

                {/* Bottom Fade to blend suit cleanly into banner */}
                <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#090c17] via-[#090c17]/40 to-transparent z-10 pointer-events-none" />
              </div>

              {/* Purple Footer Bar matching design */}
              <div className="bg-brand px-5 py-4 flex items-center justify-between relative overflow-hidden z-20 preserve-white">
                {/* Subtle Hover Sheen */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />

                <div className="relative z-10 min-w-0 pr-2">
                  <h3 className="text-white font-extrabold text-base sm:text-lg leading-tight uppercase tracking-tight truncate">
                    {member.name}
                  </h3>
                  <p className="text-white/85 text-xs font-medium mt-0.5 tracking-wide truncate">
                    {member.role}
                  </p>
                </div>
                <a 
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative z-10 w-8 h-8 rounded-md bg-[#0077b5] flex items-center justify-center text-white hover:bg-[#006097] hover:scale-110 active:scale-95 transition-all duration-300 shadow-md shadow-[#0077b5]/30 shrink-0" 
                  aria-label={`LinkedIn profile for ${member.name}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Linkedin size={15} fill="currentColor" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
