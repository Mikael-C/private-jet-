"use client";

import { useEffect, useRef, useState } from "react";

const statsData = [
  { label: "Flights Completed", value: 500, suffix: "+" },
  { label: "Aircraft Available", value: 50, suffix: "+" },
  { label: "Global Destinations", value: 200, suffix: "+" },
  { label: "Client Satisfaction", value: 98, suffix: "%" },
];

function AnimatedCounter({ end, duration = 2000, suffix }: { end: number, duration?: number, suffix: string }) {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const [hasStarted, setHasStarted] = useState(false);
  const nodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    if (nodeRef.current) observer.observe(nodeRef.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // easeOutExpo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeProgress * end));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [hasStarted, end, duration]);

  return (
    <div ref={nodeRef} className="text-5xl md:text-6xl font-display font-bold text-white mb-2">
      {count}<span className="text-gold">{suffix}</span>
    </div>
  );
}

export default function Stats() {
  return (
    <section className="relative py-24 bg-jet-950 overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed opacity-30"
        style={{ backgroundImage: "url('/images/jet-storm.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-jet-950 via-jet-950/80 to-jet-950" />
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6 text-center">
          {statsData.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              <p className="text-slate-300 font-medium tracking-wide uppercase text-sm mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
