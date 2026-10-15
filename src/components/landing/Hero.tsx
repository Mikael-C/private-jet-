"use client";

import Link from "next/link";
import { Shield, ArrowUpRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] lg:min-h-[92vh] flex flex-col justify-between overflow-hidden bg-[#0F1420] text-white">
      {/* Background Jet Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=1800&fit=crop&q=85"
          alt="Private Jet on Runway at Dusk"
          className="w-full h-full object-cover object-center"
        />
        {/* Gradient Overlay — strong left fade, reveals jet on right */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(15,20,32,0.97) 0%, rgba(15,20,32,0.88) 35%, rgba(15,20,32,0.55) 65%, rgba(15,20,32,0.20) 100%)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F1420] via-transparent to-transparent md:hidden" />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pt-20 md:pt-28 lg:pt-36 flex-1 flex flex-col justify-center w-full">
        <div className="max-w-2xl animate-fade-in-up">
          {/* Section Label */}
          <div className="section-label-dark">
            PRIVATE AVIATION. PERSONALLY YOURS.
          </div>

          {/* Main Heading */}
          <h1 className="heading-xl text-white font-display mb-6 tracking-tight leading-[1.05]">
            Your time.
            <br />
            Your destination.
            <br />
            Your private sky.
          </h1>

          {/* Subtext */}
          <p className="text-white/70 font-body text-base md:text-lg max-w-xl mb-10 leading-relaxed font-light">
            Private jet charter, shaped around you. Travel on your terms, with every detail considered.
          </p>

          {/* CTA Button */}
          <div>
            <Link
              href="/booking"
              className="btn-primary inline-flex items-center gap-2 group text-sm md:text-base px-8 py-4 font-medium"
            >
              <span>Find your flight</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Sub-bar */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20 w-full">
        <div className="pt-10 pb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-white/10 text-xs font-body tracking-wider text-white/60">
          <div className="flex items-center gap-2.5">
            <Shield className="w-4 h-4 text-gold flex-shrink-0" />
            <span className="text-white/75">Discreet by design. Personal by nature.</span>
          </div>
          <div className="uppercase tracking-[0.2em] text-white/40 text-[11px] font-medium">
            A HIGHER PERSPECTIVE ON TRAVEL
          </div>
        </div>
      </div>
    </section>
  );
}
