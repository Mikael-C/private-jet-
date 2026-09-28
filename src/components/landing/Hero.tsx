"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  const [stars, setStars] = useState<{ id: number; left: string; top: string; delay: string; duration: string }[]>([]);

  useEffect(() => {
    const generatedStars = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${3 + Math.random() * 4}s`,
    }));
    setStars(generatedStars);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-jet-950 pt-24 pb-32">
      {/* Animated Stars Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 bg-hero-gradient opacity-80"></div>
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute bg-white rounded-full opacity-50"
            style={{
              left: star.left,
              top: star.top,
              width: Math.random() > 0.5 ? '2px' : '3px',
              height: Math.random() > 0.5 ? '2px' : '3px',
              animation: `twinkle ${star.duration} infinite ease-in-out ${star.delay}`,
            }}
          />
        ))}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(0.8); }
          50% { opacity: 0.8; transform: scale(1.2); }
        }
      `}} />

      <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2 },
            },
          }}
          className="text-left"
        >
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="inline-block mb-4 md:mb-6"
          >
            <span className="text-gold uppercase tracking-[0.3em] text-xs md:text-sm font-semibold section-label">
              Private Aviation
            </span>
          </motion.div>
          
          <motion.h1
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4 md:mb-6"
          >
            Elevate Your <br />
            <span className="text-gold-shimmer text-transparent bg-clip-text bg-gradient-to-r from-gold-light via-gold to-gold-light animate-shimmer block mt-2">Journey</span>
          </motion.h1>
          
          <motion.p
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="font-body text-base md:text-lg text-slate-300 mb-8 md:mb-10 max-w-xl leading-relaxed"
          >
            Experience the pinnacle of luxury travel. Seamless booking, world-class fleet, bespoke experiences.
          </motion.p>
          
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="flex flex-col sm:flex-row gap-3 md:gap-4"
          >
            <button className="btn-gold bg-gold hover:bg-gold-light text-jet-950 px-6 py-3 md:px-8 md:py-4 rounded-full font-semibold transition-transform hover:scale-105 text-sm md:text-base">
              Book Your Flight
            </button>
            <button className="btn-outline-gold px-6 py-3 md:px-8 md:py-4 rounded-full font-semibold border border-gold/50 text-gold hover:bg-gold/10 transition-colors text-sm md:text-base">
              Explore Fleet
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="relative h-[400px] md:h-[600px] w-full animate-float"
        >
          <Image
            src="/images/jet-globe.jpg"
            alt="Private Jet Globe"
            fill
            className="object-contain drop-shadow-2xl"
            priority
          />
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-gold/60">
        <ChevronDown size={32} />
      </div>
    </section>
  );
}
