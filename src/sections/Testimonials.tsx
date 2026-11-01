import React from "react";
import { motion } from "motion/react";
import { Quote } from "lucide-react";
import {
  EdgeEmergingRight,
  SoftDepthGradient,
} from "@/components/GeometricShapes";

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Marketing Director, NovaTech",
    text: '"Aurex Ventures transformed our vision into a modern, high-performing website. Their attention to detail and communication made the entire process seamless."',
    rating: 5
  },
  {
    name: "David Carter",
    role: "Founder, Elevate Solutions",
    text: '"From UI/UX design to development, the team delivered exceptional work on time. We couldn\'t be happier with the final product."',
    rating: 5
  },
  {
    name: "Emily Rodriguez",
    role: "CEO, BrightLabs",
    text: '"Professional, creative, and highly responsive. Aurex Ventures exceeded our expectations and helped us launch with confidence."',
    rating: 5
  }
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? "text-[#f59e0b]" : "text-slate-600"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section id="testimonials" className="py-16 sm:py-24 bg-transparent relative overflow-hidden">
      {/* Edge-Emerging Geometric Shapes */}
      <EdgeEmergingRight size={540} className="top-10" />
      <SoftDepthGradient
        size={440}
        color="blue"
        className="absolute top-1/3 -left-20 -z-10 opacity-60 hidden md:block"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-10 sm:mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white uppercase tracking-tight mb-3 sm:mb-4"
          >
            TESTIMONIALS
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-700 dark:text-slate-300 text-base sm:text-lg font-medium"
          >
            What clients says about <span className="text-brand">Aurex</span>
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="border border-brand/30 rounded-2xl sm:rounded-[2rem] p-4 sm:p-8 md:p-12 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand/5 blur-[100px] rounded-full pointer-events-none" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 relative z-10">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="bg-brand rounded-2xl p-6 sm:p-8 relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300 shadow-xl preserve-white"
              >
                <div className="absolute top-4 right-4 text-white/10 group-hover:text-white/20 transition-colors">
                  <Quote className="w-8 h-8 sm:w-10 sm:h-10" />
                </div>
                
                <h3 className="text-white font-bold text-sm mb-1">— {testimonial.name}</h3>
                <p className="text-white/80 text-xs font-medium mb-3 sm:mb-4">{testimonial.role}</p>
                <StarRating rating={testimonial.rating} />
                <p className="text-white/90 text-xs sm:text-sm leading-relaxed relative z-10">
                  {testimonial.text}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
