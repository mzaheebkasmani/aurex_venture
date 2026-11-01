import React from "react";
import { Button } from "@/components/Button";
import { motion } from "motion/react";

export function CTA() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-brand/5 mask-image:linear-gradient(to_bottom,transparent,black)" />
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-surface-950 rounded-[2.5rem] p-12 md:p-20 text-center shadow-2xl relative overflow-hidden"
        >
          {/* Decorative background in CTA */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-brand rounded-full mix-blend-screen filter blur-[80px] opacity-50" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-brand-light rounded-full mix-blend-screen filter blur-[80px] opacity-30" />
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight text-balance">
              Ready to build the next big thing?
            </h2>
            <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">
              We are constantly looking for visionary founders. If you have a disruptive idea 
              and the drive to execute it, we want to hear from you.
            </p>
            <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-lg">
              Submit Your Pitch
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
