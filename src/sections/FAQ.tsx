import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus } from "lucide-react";
import {
  EdgeEmergingLeft,
  SoftDepthGradient,
} from "@/components/GeometricShapes";

const faqs = [
  {
    question: "What services does Aurex Ventures offer?",
    answer: "We offer a comprehensive suite of digital services including custom web development, AI automation, UI/UX design, branding, and data-driven digital marketing strategies tailored to your business needs."
  },
  {
    question: "How long does a project take?",
    answer: "Project timelines vary depending on the scope and complexity. A typical web development project might take 4-8 weeks, while complex AI integrations could take longer. We provide detailed timelines during the discovery phase."
  },
  {
    question: "How do we get started?",
    answer: "Simply book a free meeting using the form below or the button in the navigation. We'll discuss your goals, analyze your current setup, and propose a tailored strategy to move forward."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-16 sm:py-24 bg-transparent relative overflow-hidden">
      {/* Edge-Emerging Geometric Shapes */}
      <EdgeEmergingLeft size={560} className="top-12" />
      <SoftDepthGradient
        size={440}
        color="blue"
        className="absolute top-1/3 left-10 -z-10 opacity-60 hidden md:block"
      />

      <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-10 sm:mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-4 sm:mb-6"
          >
            FAQ<span className="text-brand">s</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-600 dark:text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Find quick answers to the most common questions about our services, process, pricing, and project timelines.
          </motion.p>
        </div>

        <div className="space-y-3.5 sm:space-y-4">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-brand rounded-2xl sm:rounded-3xl overflow-hidden group shadow-lg hover:shadow-brand/20 transition-shadow duration-300 preserve-white"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-5 sm:px-8 py-4 sm:py-5 flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 cursor-pointer"
                aria-expanded={openIndex === index}
              >
                <span className="text-white font-medium text-sm sm:text-base pr-4 sm:pr-8">{faq.question}</span>
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-white/50 flex items-center justify-center text-white flex-shrink-0 group-hover:bg-white/10 transition-colors">
                  {openIndex === index ? <Minus size={15} /> : <Plus size={15} />}
                </div>
              </button>
              
              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                  >
                    <div className="px-5 sm:px-8 pb-5 sm:pb-6 text-sm sm:text-base text-white/90 leading-relaxed border-t border-white/15 pt-3.5 sm:pt-4 mt-1 sm:mt-2 mx-4 sm:mx-8">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
