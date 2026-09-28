"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Shield, Globe, Headphones, DollarSign, CheckCircle2 } from "lucide-react";

export default function AboutPage() {
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

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-jet-950 text-jet-950 dark:text-white pt-24 overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-32 mb-16">
        <div className="absolute inset-0 z-0">
          <Image src="/images/jet-storm.jpg" alt="Jet in Storm" fill className="object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-jet-950/90 via-jet-950/60 to-jet-950" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center reveal-scale">
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 text-gold-gradient">About JetElite</h1>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto font-body">
            Redefining luxury travel through exceptional service, unparalleled safety, and global reach.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="reveal-left space-y-6">
            <h2 className="text-4xl font-display font-bold text-gold-light mb-4">Our Story</h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-body text-lg">
              Founded on the principle that time is your most valuable asset, JetElite was created to provide a seamless, luxurious, and highly personalized private aviation experience. 
            </p>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-body text-lg">
              What began as a boutique charter service has evolved into a global leader in private aviation, offering our distinguished clientele access to an impeccable fleet of modern aircraft. We believe that the journey should be as remarkable as the destination.
            </p>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-body text-lg">
              Our commitment goes beyond simply flying from point A to point B. It's about anticipating needs, ensuring absolute discretion, and delivering flawless execution on every single flight.
            </p>
          </div>
          <div className="relative h-[500px] rounded-2xl overflow-hidden reveal-right border border-gold/20 shadow-[0_0_30px_rgba(212,175,55,0.15)]">
            <Image src="/images/jet-hangar.jpg" alt="Jet in Hangar" fill className="object-cover" />
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white dark:bg-jet-900 border-y border-gold/20 py-16 my-16 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center reveal">
            <div className="space-y-2">
              <div className="text-5xl font-display font-bold text-gold-gradient">10+</div>
              <div className="text-slate-500 dark:text-slate-400 font-body uppercase tracking-wider text-sm">Years Experience</div>
            </div>
            <div className="space-y-2">
              <div className="text-5xl font-display font-bold text-gold-gradient">500+</div>
              <div className="text-slate-500 dark:text-slate-400 font-body uppercase tracking-wider text-sm">Flights Annually</div>
            </div>
            <div className="space-y-2">
              <div className="text-5xl font-display font-bold text-gold-gradient">50+</div>
              <div className="text-slate-500 dark:text-slate-400 font-body uppercase tracking-wider text-sm">Aircraft in Fleet</div>
            </div>
            <div className="space-y-2">
              <div className="text-5xl font-display font-bold text-gold-gradient">24/7</div>
              <div className="text-slate-500 dark:text-slate-400 font-body uppercase tracking-wider text-sm">Global Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-16 reveal">
          <h2 className="text-4xl font-display font-bold text-jet-950 dark:text-white mb-4">Why Choose JetElite</h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-body">We set the standard for private aviation excellence across four key pillars.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: Shield, title: "Safety First", desc: "Our operators and aircraft meet stringent third-party safety standards, including ARGUS and WYVERN ratings." },
            { icon: Globe, title: "Global Network", desc: "Access to over 5,000 airports worldwide, taking you closer to your final destination without commercial constraints." },
            { icon: Headphones, title: "24/7 Concierge", desc: "A dedicated travel concierge team available around the clock to handle every detail of your itinerary." },
            { icon: DollarSign, title: "Best Rates", desc: "Transparent, competitive pricing with no hidden fees, providing exceptional value for premium service." }
          ].map((feature, idx) => (
            <div key={idx} className="glass-card p-8 rounded-2xl border border-gold/10 hover:border-gold/40 transition-colors duration-300 reveal text-center" style={{ transitionDelay: `${idx * 100}ms` }}>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-jet-800 border border-gold/30 mb-6 text-gold">
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-display font-bold mb-3">{feature.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 font-body text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Safety & Certifications */}
      <section className="bg-white/50 dark:bg-jet-900/50 py-20 mt-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto reveal">
            <h2 className="text-3xl font-display font-bold text-center mb-10 text-gold-light">Industry-Leading Safety Standards</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                "ARGUS Platinum Rated Operators",
                "WYVERN Wingman Certified",
                "IS-BAO Stage 3 Registered",
                "Comprehensive Background Checks",
                "Rigorous Maintenance Protocols",
                "Continuous Crew Training Programs",
                "Strict COVID-19 & Sanitization Procedures",
                "24/7 Flight Tracking and Support"
              ].map((cert, idx) => (
                <div key={idx} className="flex items-center gap-4 bg-slate-50 dark:bg-jet-950 p-4 rounded-xl border border-gold/10">
                  <CheckCircle2 className="w-6 h-6 text-gold flex-shrink-0" />
                  <span className="text-slate-600 dark:text-slate-300 font-body">{cert}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gold/5" />
        <div className="container mx-auto px-4 text-center relative z-10 reveal-scale">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-jet-950 dark:text-white">Ready to experience the <span className="text-gold-gradient">JetElite difference?</span></h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-2xl mx-auto font-body">Contact our aviation specialists today to begin planning your next extraordinary journey.</p>
          <Link href="/book" className="btn-gold text-lg px-10 py-4 inline-block font-bold rounded-full">
            Book Now
          </Link>
        </div>
      </section>
    </main>
  );
}
