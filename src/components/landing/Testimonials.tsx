"use client";

import { useState, useEffect } from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "The attention to detail and seamless booking process makes JetElite my only choice for executive travel. Truly a world-class experience.",
    name: "Arthur Pendelton",
    title: "CEO, Global Tech",
    initials: "AP"
  },
  {
    quote: "From the moment we arrived at the private terminal, everything was perfect. The cabin crew anticipated our every need.",
    name: "Eleanor Vance",
    title: "Venture Capitalist",
    initials: "EV"
  },
  {
    quote: "Reliability is paramount for my schedule. JetElite has never failed to deliver exceptional service, even on short notice.",
    name: "Marcus Sterling",
    title: "International Director",
    initials: "MS"
  }
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-jet-900 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-16">
          <span className="section-label text-gold uppercase tracking-widest text-sm font-semibold mb-2 block">Testimonials</span>
          <h2 className="section-title font-display text-4xl md:text-5xl text-white font-bold">
            What Our <span className="text-gold-gradient text-transparent bg-clip-text bg-gradient-to-r from-gold-light to-gold">Clients</span> Say
          </h2>
        </div>

        <div className="relative h-[300px] md:h-[250px] flex items-center justify-center">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className={`absolute top-0 w-full glass-card p-8 md:p-12 rounded-3xl border border-gold/10 transition-all duration-1000 ease-in-out ${
                idx === current ? "opacity-100 translate-x-0 z-10" : "opacity-0 translate-x-8 z-0 pointer-events-none"
              }`}
            >
              <div className="flex justify-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} className="text-gold fill-gold mx-1" />
                ))}
              </div>
              <p className="font-display text-xl md:text-2xl text-white italic text-center mb-8 leading-relaxed">
                "{t.quote}"
              </p>
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 rounded-full bg-jet-800 border-2 border-gold/50 flex items-center justify-center text-gold font-bold">
                  {t.initials}
                </div>
                <div className="text-left">
                  <h4 className="text-white font-semibold">{t.name}</h4>
                  <p className="text-slate-400 text-sm">{t.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8 gap-3">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                idx === current ? "bg-gold w-8" : "bg-slate-600 hover:bg-slate-400"
              }`}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
