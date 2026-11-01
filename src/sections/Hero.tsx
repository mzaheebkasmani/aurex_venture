import React from "react";
import { Button } from "@/components/Button";
import { motion } from "motion/react";
import { TypewriterText } from "@/components/TypewriterText";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { MagneticButton } from "@/components/MagneticButton";
import {
  EdgeEmergingLeft,
  EdgeEmergingRight,
  SoftDepthGradient,
} from "@/components/GeometricShapes";
import { HeroVisual } from "@/components/HeroVisual";

export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center pt-32 pb-12 overflow-hidden bg-transparent">
      {/* Edge-Emerging Abstract Geometric Artwork */}
      <EdgeEmergingLeft size={640} className="top-16" />
      <EdgeEmergingRight size={600} className="top-24 hidden md:block" />
      <SoftDepthGradient
        size={460}
        color="blue"
        className="absolute top-20 right-1/4 -z-10 opacity-70 hidden md:block"
      />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-grow flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-left"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="hero-pill-badge inline-block py-1.5 px-4 rounded-full text-sm font-semibold mb-8 backdrop-blur-sm"
            >
              Empowering Modern Businesses
            </motion.div>
            
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-semibold text-slate-900 dark:text-white tracking-tight mb-4 leading-[1.12]">
              Your Partner in <br />
              <span className="text-brand">
                <TypewriterText text="Digital Growth" delay={0.5} />
              </span>
            </h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="hero-description mt-4 sm:mt-6 text-base sm:text-lg max-w-lg mb-8 sm:mb-10 leading-relaxed font-normal"
            >
              We help businesses grow with AI automation, modern web development, branding, and digital marketing—designed to deliver measurable results.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center gap-3.5 sm:gap-4"
            >
              <MagneticButton className="w-full sm:w-auto">
                <Button size="lg" variant="white" className="w-full font-semibold relative overflow-hidden group shadow-sm" asChild>
                  <a href="#services">
                    <span className="relative z-10">Explore Services</span>
                    <div className="absolute inset-0 h-full w-full bg-slate-200 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                  </a>
                </Button>
              </MagneticButton>
              
              <MagneticButton className="w-full sm:w-auto">
                <Button size="lg" className="w-full font-semibold relative overflow-hidden group preserve-white shadow-md shadow-brand/20" asChild>
                  <a href="#contact">
                    <span className="relative z-10 text-white">Book a Meeting</span>
                    <div className="absolute inset-0 h-full w-full bg-brand-light transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                  </a>
                </Button>
              </MagneticButton>
            </motion.div>
          </motion.div>

          {/* Right Hero Visual with Interactive 3D Holographic Showcase */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full flex items-center justify-center mt-6 lg:mt-0"
          >
            <HeroVisual />
          </motion.div>
        </div>
      </div>

      {/* Stats Bar */}
      <motion.div 
        id="hero-stats"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-20 w-full mt-12 sm:mt-20 preserve-white"
      >
        <div className="absolute inset-0 bg-brand/30 blur-[100px] -z-10 h-[150%]" />
        <div className="bg-gradient-to-r from-brand/95 via-brand to-brand/95 py-10 sm:py-16 backdrop-blur-md border-y border-white/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center divide-y-0 sm:divide-y-0 md:divide-x md:divide-white/20">
              <div className="flex flex-col gap-1 sm:gap-2">
                <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight"><AnimatedCounter value={100} suffix="+" /></span>
                <span className="text-white/90 font-medium text-xs sm:text-sm md:text-base">Projects Delivered</span>
              </div>
              <div className="flex flex-col gap-1 sm:gap-2 border-l border-white/20 md:border-l">
                <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight"><AnimatedCounter value={70} suffix="+" /></span>
                <span className="text-white/90 font-medium text-xs sm:text-sm md:text-base">Client Satisfaction</span>
              </div>
              <div className="flex flex-col gap-1 sm:gap-2 pt-4 sm:pt-0 border-t border-white/20 sm:border-t-0 md:border-l">
                <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight"><AnimatedCounter value={50} suffix="+" /></span>
                <span className="text-white/90 font-medium text-xs sm:text-sm md:text-base">Websites Launched</span>
              </div>
              <div className="flex flex-col gap-1 sm:gap-2 pt-4 sm:pt-0 border-t border-l border-white/20 sm:border-t-0 md:border-l md:border-r-0">
                <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">24/7</span>
                <span className="text-white/90 font-medium text-xs sm:text-sm md:text-base">Support Available</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
