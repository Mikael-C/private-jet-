"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const destinations = [
  { name: "Paris", country: "France", price: "5,400", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600" },
  { name: "Dubai", country: "UAE", price: "8,200", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600" },
  { name: "London", country: "UK", price: "4,800", image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600" },
  { name: "Tokyo", country: "Japan", price: "12,500", image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600" },
  { name: "New York", country: "USA", price: "9,100", image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600" },
  { name: "Sydney", country: "Australia", price: "15,300", image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=600" }
];

export default function Destinations() {
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
    <section className="py-24 bg-slate-50 dark:bg-jet-950 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <span className="section-label text-gold uppercase tracking-widest text-sm font-semibold mb-2 block">Explore</span>
          <h2 className="section-title font-display text-4xl md:text-5xl text-jet-950 dark:text-white font-bold">
            Popular <span className="text-gold-gradient text-transparent bg-clip-text bg-gradient-to-r from-gold-light to-gold">Destinations</span>
          </h2>
        </div>

        <div ref={containerRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest, idx) => (
            <div
              key={dest.name}
              className={`group relative h-80 rounded-2xl overflow-hidden cursor-pointer shadow-xl transition-all duration-700 ease-out transform ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
              }`}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <Image
                src={dest.image}
                alt={dest.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-jet-950 via-jet-950/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-gold/50 rounded-2xl transition-colors duration-500 pointer-events-none" />
              
              <div className="absolute bottom-0 left-0 p-6 w-full flex justify-between items-end">
                <div>
                  <h3 className="text-2xl font-display text-jet-950 dark:text-white font-bold group-hover:text-gold-light transition-colors">{dest.name}</h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm">{dest.country}</p>
                </div>
                <div className="bg-gold text-jet-950 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                  From ${dest.price}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
