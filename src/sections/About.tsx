import React from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { MagneticButton } from "@/components/MagneticButton";
import {
  EdgeEmergingLeftArch,
  SoftDepthGradient,
} from "@/components/GeometricShapes";

export function About() {
  return (
    <section id="about" className="py-16 sm:py-24 bg-transparent border-t border-slate-200/60 dark:border-slate-900/50 overflow-hidden relative">
      {/* Edge-Emerging Geometric Shapes */}
      <EdgeEmergingLeftArch size={540} className="top-12" />
      <SoftDepthGradient
        size={440}
        color="blue"
        className="absolute bottom-10 right-1/4 -z-10 opacity-60 hidden sm:block"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-16 mb-12 sm:mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/4"
          >
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-wide uppercase flex items-center gap-4">
              ABOUT US
              <span className="h-px bg-brand/50 flex-grow" />
            </h2>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-3/4"
          >
            <p className="text-base sm:text-lg md:text-xl text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
              At <span className="text-brand font-semibold">Aurex Ventures</span>, we help businesses transform ideas into powerful digital experiences. From AI automation and custom web development to branding, UI/UX design, and digital marketing, we create innovative solutions that help businesses grow, scale, and succeed in a rapidly evolving digital world.
            </p>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="space-y-8 sm:space-y-12">
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="group"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3 sm:mb-4 flex items-center gap-2">
                Company core <span className="text-brand">mission</span>
                <ArrowUpRight size={20} className="text-brand opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0 transition-all" />
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm sm:text-base group-hover:text-slate-800 dark:group-hover:text-slate-300 transition-colors">
                Our mission is to help businesses grow through innovative technology, AI-powered automation, modern web development, and impactful digital strategies. We are committed to delivering solutions that create measurable results, lasting value, and sustainable success.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="group"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3 sm:mb-4 flex items-center gap-2">
                Company <span className="text-brand">vision & goal</span>
                <ArrowUpRight size={20} className="text-brand opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0 transition-all" />
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm sm:text-base group-hover:text-slate-800 dark:group-hover:text-slate-300 transition-colors">
                Our vision is to become a trusted global technology partner, helping businesses embrace innovation with confidence. We aim to build scalable digital solutions, foster long-term partnerships, and empower brands to achieve sustainable growth in the digital era.
              </p>
            </motion.div>

          </div>

          {/* Right Image (Clean, No Background Box) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full flex items-center justify-center relative group"
          >
            <img
              src="/about-image.jpeg"
              alt="About Aurex Ventures"
              className="w-full h-auto max-h-[460px] object-cover rounded-2xl drop-shadow-[0_20px_35px_rgba(0,0,0,0.35)] transition-transform duration-500 group-hover:scale-[1.02]"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (!target.src.includes('WhatsApp')) {
                  target.src = '/WhatsApp Image 2026-10-01 at 6.15.01 AM.jpeg';
                }
              }}
            />
          </motion.div>
        </div>

      </div>
    </section>
  );
}
