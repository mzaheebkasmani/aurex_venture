import React from "react";
import { Logo } from "@/components/Logo";
import { ArrowUpRight, Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import { motion } from "motion/react";

export function Footer() {
  return (
    <footer className="bg-brand pt-12 sm:pt-20 pb-8 sm:pb-12 relative overflow-hidden preserve-white">
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-white/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 mb-10 sm:mb-16">
          
          {/* Left Column */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8 sm:space-y-12">
            <div>
              <a href="#hero" className="inline-block mb-6 sm:mb-8 hover:opacity-90 transition-opacity">
                <Logo variant="white" />
              </a>
              
              <div className="flex flex-wrap gap-3 sm:gap-4 text-white">
                <motion.a whileHover={{ y: -5 }} href="#" className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-brand transition-colors" aria-label="Facebook">
                  <Facebook size={17} />
                </motion.a>
                <motion.a whileHover={{ y: -5 }} href="#" className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-brand transition-colors" aria-label="Instagram">
                  <Instagram size={17} />
                </motion.a>
                <motion.a whileHover={{ y: -5 }} href="#" className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-brand transition-colors" aria-label="LinkedIn">
                  <Linkedin size={17} />
                </motion.a>
                <motion.a whileHover={{ y: -5 }} href="#" className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-brand transition-colors" aria-label="Twitter">
                  <Twitter size={17} />
                </motion.a>
                <motion.a whileHover={{ y: -5 }} href="#" className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-brand transition-colors" aria-label="YouTube">
                  <Youtube size={17} />
                </motion.a>
              </div>
            </div>

            <div>
              <h3 className="text-white font-bold text-xl sm:text-2xl mb-4 sm:mb-6">Book a meeting</h3>
              <form className="flex items-center border-b border-white/30 pb-2 max-w-sm" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  required
                  placeholder="enter your email" 
                  className="bg-transparent border-none text-white placeholder:text-white/70 focus:outline-none flex-grow text-sm sm:text-base"
                />
                <button type="submit" className="text-white hover:text-white/80 transition-transform hover:translate-x-1 hover:-translate-y-1 cursor-pointer">
                  <ArrowUpRight size={22} />
                </button>
              </form>
            </div>
          </div>

          {/* Spacer */}
          <div className="hidden lg:block lg:col-span-2"></div>

          {/* Right Columns */}
          <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8">
            
            <div className="space-y-3 sm:space-y-4">
              <h4 className="text-white font-bold mb-3 sm:mb-6 text-sm sm:text-base">Quick links</h4>
              <ul className="space-y-2.5 sm:space-y-4 text-white/90 text-sm">
                <li><a href="#about" className="hover:text-white hover:underline transition-all">About us</a></li>
                <li><a href="#services" className="hover:text-white hover:underline transition-all">Services</a></li>
                <li><a href="#testimonials" className="hover:text-white hover:underline transition-all">Testimonials</a></li>
                <li><a href="#team" className="hover:text-white hover:underline transition-all">Team</a></li>
              </ul>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <h4 className="text-white font-bold mb-3 sm:mb-6 text-sm sm:text-base">Support</h4>
              <ul className="space-y-2.5 sm:space-y-4 text-white/90 text-sm">
                <li><a href="#faq" className="hover:text-white hover:underline transition-all">FAQ</a></li>
                <li><a href="#contact" className="hover:text-white hover:underline transition-all">Contact Us</a></li>
              </ul>
            </div>

            <div className="space-y-3 sm:space-y-4 col-span-2 sm:col-span-1">
              <h4 className="text-white font-bold mb-3 sm:mb-6 text-sm sm:text-base">Legal</h4>
              <ul className="space-y-2.5 sm:space-y-4 text-white/90 text-sm">
                <li><a href="#" className="hover:text-white hover:underline transition-all">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white hover:underline transition-all">Terms of Service</a></li>
              </ul>
            </div>

          </div>
        </div>
        
        <div className="border-t border-white/20 pt-6 sm:pt-8 flex flex-col md:flex-row justify-center items-center gap-3 sm:gap-4 text-white/70 text-xs sm:text-sm text-center">
          <p>&copy; {new Date().getFullYear()} Aurex Ventures. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
