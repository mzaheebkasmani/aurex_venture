import React from "react";
import { motion } from "motion/react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { MagneticButton } from "@/components/MagneticButton";
import {
  EdgeEmergingLeftArch,
  SoftDepthGradient,
} from "@/components/GeometricShapes";

const whyFeatures = [
  {
    title: "Innovative Solutions",
    description: "We create modern, scalable digital solutions tailored to your business goals"
  },
  {
    title: "Expert Team",
    description: "Our experienced designers, developers, and strategists deliver high-quality results"
  },
  {
    title: "Client-First Approach",
    description: "We prioritize clear communication, transparency, and long-term partnerships"
  },
  {
    title: "Reliable Support",
    description: "From planning to post-launch, we provide continuous support for lasting success"
  }
];

const processes = [
  {
    num: "01",
    title: "Discovery",
    description: "We understand your business, goals, and project requirements."
  },
  {
    num: "02",
    title: "Strategy",
    description: "We create a clear roadmap and define the best solution."
  },
  {
    num: "03",
    title: "Design",
    description: "We craft intuitive, modern, and user-focused designs."
  },
  {
    num: "04",
    title: "Help & support",
    description: "We launch your project and provide ongoing maintenance and support."
  }
];

export function WhyChooseUs() {
  return (
    <section id="why-us" className="py-16 sm:py-24 bg-transparent overflow-hidden relative">
      {/* Edge-Emerging Geometric Shapes */}
      <EdgeEmergingLeftArch size={580} className="top-1/4" />
      <SoftDepthGradient
        size={460}
        color="blue"
        className="absolute top-1/2 left-8 -z-10 opacity-60 hidden md:block"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24 md:space-y-32 relative z-10">
        
        {/* Why Choose Us */}
        <div className="relative">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-brand rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-12 md:p-20 pb-20 sm:pb-32 md:pb-40 text-center relative overflow-hidden mb-12 sm:mb-24 group preserve-white shadow-2xl"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-3 sm:mb-6 tracking-tight uppercase relative z-10">
              WHY CHOOSE US
            </h2>
            <p className="text-white/90 max-w-3xl mx-auto text-sm sm:text-base md:text-lg relative z-10 leading-relaxed">
              We combine creativity, strategy, and cutting-edge technology to build digital solutions that help businesses grow, scale, and stand out in today's competitive market.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 -mt-14 sm:-mt-24 md:-mt-36 px-2 sm:px-4 md:px-8 relative z-10">
            {whyFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-surface-900 p-5 sm:p-8 rounded-2xl border border-brand/20 shadow-xl hover:border-brand/60 hover:-translate-y-2 transition-all duration-300 group"
              >
                <CheckCircle2 className="text-brand mb-3 sm:mb-4 group-hover:scale-110 transition-transform" size={24} />
                <h3 className="text-brand dark:text-brand-light font-bold mb-2 sm:mb-4 text-base sm:text-lg">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed group-hover:text-slate-800 dark:group-hover:text-slate-300 transition-colors">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Book Meeting Banner */}
        <div className="pt-4 sm:pt-6">
          <motion.a 
            href="#contact"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="meeting-banner-capsule rounded-2xl sm:rounded-full p-4 sm:p-3.5 px-5 sm:pl-10 flex flex-col sm:flex-row items-center justify-between gap-4 cursor-pointer group shadow-2xl shadow-purple-500/30 border border-purple-400/30 transition-transform"
          >
             <span className="text-white font-bold text-lg sm:text-xl md:text-2xl tracking-tight select-none text-center sm:text-left drop-shadow-sm">
               Book your free meeting
             </span>
             <span className="w-full sm:w-auto bg-white text-slate-950 rounded-full px-6 sm:px-8 py-3 sm:py-3.5 font-black text-xs sm:text-sm flex items-center justify-center gap-2.5 group-hover:bg-slate-100 group-hover:shadow-lg transition-all uppercase tracking-wider shrink-0 shadow-md">
               <span className="text-slate-950 font-black">STARTS NOW</span>
               <ArrowRight size={18} className="text-slate-950 transform group-hover:translate-x-1.5 transition-transform" />
             </span>
          </motion.a>
        </div>

      </div>
    </section>
  );
}
