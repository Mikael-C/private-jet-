"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="relative min-h-[420px] md:min-h-[480px] flex items-center overflow-hidden bg-[#0F1420] text-white py-20 md:py-28 px-6 md:px-12 lg:px-20">
      {/* Background Jet Image at Dusk/Night */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1535953472862-9cc610a70f8a?w=1800&fit=crop&q=80"
          alt="Private jet ready on the tarmac at dusk"
          className="w-full h-full object-cover object-center"
        />
        {/* Dark Navy Overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: "rgba(15, 20, 32, 0.78)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F1420]/90 via-[#0F1420]/75 to-transparent hidden md:block" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="max-w-2xl">
          {/* Gold Section Label */}
          <div className="section-label-dark">
            YOUR WORLD. YOUR WAY.
          </div>

          {/* Heading */}
          <h2 className="heading-lg font-display text-white mb-4 leading-tight">
            Your next chapter
            <br />
            starts in the sky.
          </h2>

          {/* Subtext */}
          <p className="text-white/70 font-body text-base md:text-lg max-w-xl mb-8 leading-relaxed font-light">
            Tell us where you want to go. We will help you find a remarkable way to get there.
          </p>

          {/* 2 Buttons Side by Side */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Link
              href="/booking"
              className="btn-primary inline-flex items-center justify-center gap-2 group px-8 py-4 font-medium text-center"
            >
              <span>Request a charter quote</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            <button
              type="button"
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.dispatchEvent(new Event("open-concierge-chat"));
                }
              }}
              className="btn-outline inline-flex items-center justify-center gap-2 group px-8 py-4 font-medium text-center cursor-pointer"
            >
              <span>Talk to our concierge</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
