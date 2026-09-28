"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Users, Route, ArrowRight } from "lucide-react";
import Link from "next/link";

const fleet = [
  { id: 1, category: "Light Jet", name: "Citation CJ4", passengers: 8, range: "2,165 nm", price: "3,500", image: "/images/jet-tarmac.jpg" },
  { id: 2, category: "Midsize", name: "Hawker 800XP", passengers: 9, range: "2,540 nm", price: "4,800", image: "/images/jet-luxury.jpg" },
  { id: 3, category: "Super-Mid", name: "Challenger 350", passengers: 10, range: "3,200 nm", price: "6,200", image: "/images/jet-tarmac.jpg" },
  { id: 4, category: "Heavy", name: "Gulfstream G650", passengers: 16, range: "7,000 nm", price: "9,500", image: "/images/jet-luxury.jpg" },
];

export default function FleetPreview() {
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
      { threshold: 0.1 }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 bg-white dark:bg-jet-900 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <span className="section-label text-gold uppercase tracking-widest text-sm font-semibold mb-2 block">Our Fleet</span>
            <h2 className="section-title font-display text-4xl md:text-5xl text-jet-950 dark:text-white font-bold">
              World-Class <span className="text-gold-gradient text-transparent bg-clip-text bg-gradient-to-r from-gold-light to-gold">Aircraft</span>
            </h2>
          </div>
          <Link href="/fleet" className="hidden md:flex items-center text-gold hover:text-gold-light transition-colors group mt-6 md:mt-0">
            <span className="mr-2 font-medium">View Full Fleet</span>
            <ArrowRight size={20} className="transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div 
          ref={containerRef}
          className="flex overflow-x-auto pb-8 -mx-6 px-6 md:mx-0 md:px-0 gap-6 snap-x hide-scrollbar"
        >
          {fleet.map((jet, idx) => (
            <div
              key={jet.id}
              className={`glass-card-hover min-w-[320px] md:min-w-[400px] flex-shrink-0 bg-slate-50/60 dark:bg-jet-950/60 border border-slate-200 dark:border-white/5 rounded-2xl overflow-hidden snap-center transition-all duration-700 ease-out transform ${
                isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'
              }`}
              style={{ transitionDelay: `${idx * 150}ms` }}
            >
              <div className="relative h-56 w-full">
                <Image src={jet.image} alt={jet.name} fill className="object-cover" />
                <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm text-gold border border-gold/30 px-3 py-1 rounded-full text-xs font-semibold tracking-wide">
                  {jet.category}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-display text-jet-950 dark:text-white font-bold mb-4">{jet.name}</h3>
                <div className="flex justify-between items-center mb-6 text-slate-600 dark:text-slate-300 text-sm">
                  <div className="flex items-center">
                    <Users size={16} className="text-gold mr-2" />
                    <span>{jet.passengers} pax</span>
                  </div>
                  <div className="flex items-center">
                    <Route size={16} className="text-gold mr-2" />
                    <span>{jet.range}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center border-t border-slate-200 dark:border-white/10 pt-4">
                  <span className="text-slate-500 dark:text-slate-400 text-sm">Starting at</span>
                  <span className="text-jet-950 dark:text-white font-semibold text-lg">
                    ${jet.price}<span className="text-sm text-slate-500 dark:text-slate-400 font-normal">/hr</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 md:hidden flex justify-center">
          <Link href="/fleet" className="flex items-center text-gold hover:text-gold-light transition-colors group">
            <span className="mr-2 font-medium">View Full Fleet</span>
            <ArrowRight size={20} className="transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
