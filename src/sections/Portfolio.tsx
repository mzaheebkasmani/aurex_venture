import React from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import {
  EdgeEmergingRightHalo,
  SoftDepthGradient,
} from "@/components/GeometricShapes";

// Portfolio companies data with high-resolution imagery and metadata
const portfolioItems = [
  { 
    id: 1, 
    category: "Fintech", 
    name: "Project Alpha",
    image: "/portfolio/fintech.jpg",
    description: "Next-generation decentralized payment gateway and real-time algorithmic treasury analytics platform."
  },
  { 
    id: 2, 
    category: "AI / ML", 
    name: "Project Beta",
    image: "/portfolio/aiml.jpg",
    description: "Enterprise foundation model reasoning engine powering autonomous enterprise workflows."
  },
  { 
    id: 3, 
    category: "SaaS", 
    name: "Project Gamma",
    image: "/portfolio/saas.jpg",
    description: "Cloud-native collaborative observability suite designed for high-velocity software engineering teams."
  },
  { 
    id: 4, 
    category: "Web3", 
    name: "Project Delta",
    image: "/portfolio/web3.jpg",
    description: "Zero-knowledge privacy protocol and institutional cross-chain liquidity network."
  },
  { 
    id: 5, 
    category: "Healthtech", 
    name: "Project Epsilon",
    image: "/portfolio/healthtech.jpg",
    description: "Biometric sensor intelligence and predictive clinical decision telemetry platform."
  },
  { 
    id: 6, 
    category: "E-commerce", 
    name: "Project Zeta",
    image: "/portfolio/ecommerce.jpg",
    description: "Next-gen headless commerce engine with hyper-personalized AI shopping journeys."
  },
];

export function Portfolio() {
  return (
    <section id="portfolio" className="py-16 sm:py-24 bg-transparent border-t border-slate-200/60 dark:border-white/5 relative overflow-hidden">
      {/* Edge-Emerging Geometric Shapes */}
      <EdgeEmergingRightHalo size={560} className="top-12" />
      <SoftDepthGradient
        size={460}
        color="blue"
        className="absolute top-1/2 -left-24 -z-10 opacity-60 hidden md:block"
      />

      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-brand/5 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 gap-4 sm:gap-6">
          <div className="max-w-2xl">
            <h2 className="text-xs sm:text-sm font-semibold text-brand tracking-widest uppercase mb-2 sm:mb-3">Our Portfolio</h2>
            <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
              Companies defining the future
            </p>
          </div>
          <button className="hidden md:flex items-center gap-2 text-brand font-medium hover:text-brand-light transition-colors group">
            View all companies <ArrowUpRight size={20} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {portfolioItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer flex flex-col"
            >
              {/* Image Container with high-end styling */}
              <div className="w-full aspect-[4/3] rounded-2xl bg-surface-900 mb-5 overflow-hidden relative border border-white/10 group-hover:border-brand/40 transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_-15px_rgba(155,81,224,0.25)] shadow-lg shadow-black/40">
                {/* Real High-Resolution Image */}
                <img
                  src={item.image}
                  alt={`${item.name} - ${item.category}`}
                  className="w-full h-full object-cover filter brightness-[0.95] contrast-[1.05] group-hover:scale-108 transition-transform duration-700 ease-out"
                  loading="lazy"
                />

                {/* Subtle dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-500" />

                {/* Category Pill Badge */}
                <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/20 text-[11px] font-semibold text-cyan-300 tracking-wider uppercase shadow-md preserve-white">
                  {item.category}
                </div>

                {/* Corner Glow Accent */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand mb-1.5">{item.category}</p>
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-brand transition-colors tracking-tight">
                      {item.name}
                    </h3>
                    <div className="w-8 h-8 rounded-full bg-surface-900 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-500 dark:text-slate-400 group-hover:bg-brand group-hover:text-white group-hover:border-brand transition-all duration-300 group-hover:rotate-45 shrink-0">
                      <ArrowUpRight size={16} />
                    </div>
                  </div>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-xs mt-2 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <button className="mt-12 w-full md:hidden flex items-center justify-center gap-2 text-brand font-medium hover:text-brand-dark transition-colors py-4 rounded-xl bg-brand/5 border border-brand/10">
          View all companies <ArrowUpRight size={20} />
        </button>
      </div>
    </section>
  );
}
