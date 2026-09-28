"use client";

import { useEffect, useRef, useState } from "react";
import { Search, BarChart3, Settings, Plane } from "lucide-react";

const steps = [
  { icon: Search, title: "Search Your Route", desc: "Enter your departure, destination, and travel dates in our intuitive platform." },
  { icon: BarChart3, title: "Compare Aircraft", desc: "Browse a curated selection of private jets tailored to your specific needs." },
  { icon: Settings, title: "Customize Your Trip", desc: "Select catering, ground transport, and other bespoke concierge services." },
  { icon: Plane, title: "Fly & Enjoy", desc: "Arrive 15 minutes before departure and experience unparalleled luxury." },
];

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 bg-slate-50 dark:bg-jet-950 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-20">
          <span className="section-label text-gold uppercase tracking-widest text-sm font-semibold mb-2 block">Simple & Fast</span>
          <h2 className="section-title font-display text-4xl md:text-5xl text-jet-950 dark:text-white font-bold">
            Book in 4 <span className="text-gold-gradient text-transparent bg-clip-text bg-gradient-to-r from-gold-light to-gold">Easy Steps</span>
          </h2>
        </div>

        <div ref={containerRef} className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-[60px] left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-gold/0 via-gold/30 to-gold/0" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className={`relative flex flex-col items-center text-center transition-all duration-700 ease-out transform ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
                }`}
                style={{ transitionDelay: `${idx * 200}ms` }}
              >
                <div className="w-24 h-24 rounded-full bg-white dark:bg-jet-900 border-2 border-gold/20 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(212,175,55,0.1)] relative">
                  <step.icon size={36} className="text-gold" />
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gold text-jet-950 flex items-center justify-center font-bold shadow-lg">
                    {idx + 1}
                  </div>
                </div>
                <h3 className="text-xl font-display text-jet-950 dark:text-white font-semibold mb-3">{step.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-[250px]">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
