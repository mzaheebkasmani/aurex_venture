import React from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Palette, Code, BookOpen, Bot, Smartphone, Megaphone } from "lucide-react";
import {
  EdgeEmergingRight,
  SoftDepthGradient,
} from "@/components/GeometricShapes";

const services = [
  {
    title: "Graphic design & ui/x",
    description: "We create visually compelling designs that communicate your brand's identity, capture attention, and leave a lasting impression across digital and print platforms.",
    icon: Palette
  },
  {
    title: "Web Development",
    description: "We build fast, secure, and responsive websites that combine modern design with powerful functionality to help your business grow online.",
    icon: Code
  },
  {
    title: "E book writing & designing",
    description: "We create professionally written and beautifully designed eBooks that educate, engage, and strengthen your brand's authority.",
    icon: BookOpen
  },
  {
    title: "AI automation & Agents",
    description: "We build intelligent AI automations and custom AI agents that streamline workflows, reduce manual tasks, and improve business efficiency.",
    icon: Bot
  },
  {
    title: "Mobile App development",
    description: "We develop high-performance mobile applications for iOS and Android, delivering seamless user experiences with modern design and scalable functionality.",
    icon: Smartphone
  },
  {
    title: "Marketing",
    description: "We create data-driven marketing strategies that increase brand visibility, attract the right audience, and drive measurable business growth.",
    icon: Megaphone
  }
];

export function Services() {
  return (
    <section id="services" className="py-16 sm:py-24 bg-transparent relative overflow-hidden">
      {/* Edge-Emerging Geometric Shapes */}
      <EdgeEmergingRight size={560} className="top-12" />
      <SoftDepthGradient
        size={440}
        color="blue"
        className="absolute bottom-10 -left-20 -z-10 opacity-60 hidden md:block"
      />
      
      {/* Decorative gradient */}
      <div className="absolute top-1/2 left-0 w-1/3 h-[40rem] bg-brand/10 blur-[120px] rounded-full pointer-events-none -translate-y-1/2" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10 sm:mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white uppercase tracking-tight"
          >
            OUR <span className="text-brand">SERVICES</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative p-6 sm:p-8 rounded-2xl bg-surface-900 border border-brand/20 hover:border-brand/50 shadow-sm hover:shadow-[0_0_30px_-5px_rgba(155,81,224,0.2)] transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center text-brand group-hover:scale-110 group-hover:bg-brand group-hover:text-white transition-all duration-300">
                    <service.icon size={24} />
                  </div>
                  <div className="w-10 h-10 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-500 dark:text-white/50 group-hover:text-brand group-hover:border-brand/40 group-hover:bg-brand/10 transition-colors duration-300">
                    <ArrowUpRight size={20} className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                  </div>
                </div>
                
                <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4 group-hover:text-brand transition-colors">{service.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed group-hover:text-slate-800 dark:group-hover:text-slate-300 transition-colors">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
