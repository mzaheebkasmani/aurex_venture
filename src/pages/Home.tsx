import React from "react";
import { Toaster } from "sonner";
import { Navbar } from "@/sections/Navbar";
import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Services } from "@/sections/Services";
import { Process } from "@/sections/Process";
import { WhyChooseUs } from "@/sections/WhyChooseUs";
import { Portfolio } from "@/sections/Portfolio";
import { Team } from "@/sections/Team";
import { Testimonials } from "@/sections/Testimonials";
import { FAQ } from "@/sections/FAQ";
import { Contact } from "@/sections/Contact";
import { Footer } from "@/sections/Footer";
import { Preloader } from "@/components/Preloader";
import { ScrollProgress } from "@/components/ScrollProgress";
import { ScrollToTop } from "@/components/ScrollToTop";
import { AIChatbot } from "@/components/AIChatbot";
import { CustomCursor } from "@/components/CustomCursor";
import { BackgroundElements } from "@/components/BackgroundElements";

export default function Home() {
  return (
    <div className="min-h-screen bg-surface-950 font-sans overflow-x-hidden">
      <CustomCursor />
      <BackgroundElements />
      <Preloader />
      <ScrollProgress />
      <Toaster position="bottom-right" theme="dark" />
      
      <Navbar />
      
      <main className="relative z-10">
        <Hero />
        <About />
        <Services />
        <Process />
        <WhyChooseUs />
        <Portfolio />
        <Team />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      
      <ScrollToTop />
      <AIChatbot />
    </div>
  );
}
