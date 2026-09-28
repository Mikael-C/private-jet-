"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Users, Navigation, Zap } from "lucide-react";

type Category = "All" | "Light Jets" | "Midsize" | "Super-Midsize" | "Heavy" | "Ultra Long Range";

const categories: Category[] = ["All", "Light Jets", "Midsize", "Super-Midsize", "Heavy", "Ultra Long Range"];

const aircraft = [
  { name: "Citation CJ4", category: "Light Jets", pax: 8, range: 2165, speed: 522, price: "$3,500/hr", image: "/images/jet-tarmac.jpg" },
  { name: "Phenom 300E", category: "Light Jets", pax: 10, range: 2010, speed: 538, price: "$3,800/hr", image: "/images/jet-luxury.jpg" },
  { name: "Hawker 800XP", category: "Midsize", pax: 9, range: 2540, speed: 461, price: "$4,500/hr", image: "/images/jet-tarmac.jpg" },
  { name: "Learjet 60XR", category: "Midsize", pax: 8, range: 2405, speed: 536, price: "$4,200/hr", image: "/images/jet-luxury.jpg" },
  { name: "Challenger 350", category: "Super-Midsize", pax: 10, range: 3200, speed: 540, price: "$5,500/hr", image: "/images/jet-tarmac.jpg" },
  { name: "Citation Longitude", category: "Super-Midsize", pax: 12, range: 3500, speed: 548, price: "$5,800/hr", image: "/images/jet-luxury.jpg" },
  { name: "Gulfstream G650", category: "Heavy", pax: 16, range: 7000, speed: 610, price: "$8,500/hr", image: "/images/jet-tarmac.jpg" },
  { name: "Global 7500", category: "Heavy", pax: 19, range: 7700, speed: 610, price: "$9,200/hr", image: "/images/jet-luxury.jpg" },
  { name: "Gulfstream G650ER", category: "Ultra Long Range", pax: 16, range: 7500, speed: 610, price: "$8,800/hr", image: "/images/jet-tarmac.jpg" },
  { name: "Global 8000", category: "Ultra Long Range", pax: 19, range: 8000, speed: 616, price: "$9,500/hr", image: "/images/jet-luxury.jpg" }
];

export default function FleetPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    elements.forEach(el => observer.observe(el));

    return () => elements.forEach(el => observer.unobserve(el));
  }, []);

  const filteredAircraft = activeCategory === "All" 
    ? aircraft 
    : aircraft.filter(a => a.category === activeCategory);

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-jet-950 text-jet-950 dark:text-white pt-24 pb-20 overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-24 mb-16">
        <div className="absolute inset-0 z-0">
          <Image src="/images/jet-luxury.jpg" alt="Luxury Jet" fill className="object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-jet-950/80 via-jet-950/60 to-jet-950" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center reveal-scale">
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 text-jet-950 dark:text-white text-gold-gradient">Our Fleet</h1>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto font-body">
            Experience uncompromised luxury, speed, and comfort with our curated selection of world-class private aircraft.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="container mx-auto px-4 mb-12">
        <div className="flex flex-wrap justify-center gap-4 reveal">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full font-body transition-all duration-300 ${
                activeCategory === category 
                  ? "bg-gold text-jet-950 font-bold shadow-[0_0_15px_rgba(212,175,55,0.5)]" 
                  : "bg-white dark:bg-jet-900 border border-gold/30 text-slate-600 dark:text-slate-300 hover:border-gold hover:text-jet-950 dark:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Fleet Grid */}
      <section className="container mx-auto px-4" ref={containerRef}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAircraft.map((jet, idx) => (
            <div key={idx} className="glass-card-hover rounded-2xl overflow-hidden reveal bg-white dark:bg-jet-900 border border-gold/20 flex flex-col h-full group" style={{ transitionDelay: `${idx * 100}ms` }}>
              <div className="relative h-64 overflow-hidden">
                <Image src={jet.image} alt={jet.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute top-4 left-4 bg-slate-50/80 dark:bg-jet-950/80 backdrop-blur-md border border-gold/50 px-3 py-1 rounded-full text-xs font-semibold text-gold-light">
                  {jet.category}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-display font-bold mb-4">{jet.name}</h3>
                
                <div className="grid grid-cols-3 gap-4 mb-6 text-sm text-slate-500 dark:text-slate-400 font-body">
                  <div className="flex flex-col items-center text-center gap-2">
                    <Users className="w-6 h-6 text-gold" />
                    <span>{jet.pax} Pax</span>
                  </div>
                  <div className="flex flex-col items-center text-center gap-2">
                    <Navigation className="w-6 h-6 text-gold" />
                    <span>{jet.range} nm</span>
                  </div>
                  <div className="flex flex-col items-center text-center gap-2">
                    <Zap className="w-6 h-6 text-gold" />
                    <span>{jet.speed} mph</span>
                  </div>
                </div>

                <div className="mt-auto flex items-center justify-between border-t border-gold/20 pt-6">
                  <div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Starting from</span>
                    <span className="text-xl font-bold text-gold-gradient">{jet.price}</span>
                  </div>
                  <Link href="/book" className="btn-outline-gold text-sm px-6 py-2">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
