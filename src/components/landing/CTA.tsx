"use client";

import { useEffect, useState } from "react";

export default function CTA() {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffsetY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative py-32 overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ 
          backgroundImage: "url('/images/jet-hangar.jpg')",
          transform: `translateY(${offsetY * 0.2}px)`,
        }}
      />
      <div className="absolute inset-0 bg-slate-50/80 dark:bg-jet-950/80 backdrop-blur-[2px] z-10" />
      
      <div className="container mx-auto px-6 max-w-4xl relative z-20 text-center">
        <h2 className="font-display text-5xl md:text-7xl font-bold text-white mb-6">
          Ready for <span className="text-gold-gradient text-transparent bg-clip-text bg-gradient-to-r from-gold-light to-gold">Luxury</span> Travel?
        </h2>
        <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
          Book your private jet in minutes. Experience travel without limits. Let our concierge team handle every detail.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <button className="btn-gold bg-gold hover:bg-gold-light text-jet-950 px-10 py-5 rounded-full font-bold text-lg shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all hover:scale-105">
            Get Instant Quote
          </button>
          <button className="btn-outline-gold px-10 py-5 rounded-full font-bold text-lg border-2 border-gold text-gold hover:bg-gold/10 transition-all">
            Call Us Now
          </button>
        </div>
      </div>
    </section>
  );
}
