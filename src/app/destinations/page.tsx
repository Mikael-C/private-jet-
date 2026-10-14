"use client";

import { useState } from "react";
import Link from "next/link";
import { Clock, MapPin, ArrowUpRight, MessageCircle, Sparkles } from "lucide-react";
import { destinations, destinationRegions, Destination } from "@/data/destinations";

export default function DestinationsPage() {
  const [activeRegion, setActiveRegion] = useState<string>("all");

  const filteredDestinations =
    activeRegion === "all"
      ? destinations
      : destinations.filter((dest: Destination) => dest.region === activeRegion);

  const customItineraryWhatsapp = `https://wa.me/447010452726?text=${encodeURIComponent(
    "Hi, I'm looking to arrange a bespoke private flight to a custom destination. Here is my itinerary:"
  )}`;

  return (
    <div className="min-h-screen bg-white">
      {/* Top Hero */}
      <section className="bg-[#F5F2EC] pt-32 pb-20 md:pt-40 md:pb-28 px-6 md:px-12 lg:px-20 border-b border-[#E8E5DF]">
        <div className="max-w-7xl mx-auto">
          <p className="section-label">WHERE WILL YOU FLY?</p>
          <h1 className="heading-xl text-[#0F1420] max-w-4xl mb-6 whitespace-pre-line">
            {"A world closer than\nyou think."}
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl font-body font-light leading-relaxed">
            Private charter doesn&apos;t follow commercial routes. Your aircraft
            goes where you need to go.
          </p>

          {/* Region Filter Pills */}
          <div className="mt-12 flex flex-wrap items-center gap-3">
            {destinationRegions.map((region) => {
              const isActive = activeRegion === region.id;
              return (
                <button
                  key={region.id}
                  onClick={() => setActiveRegion(region.id)}
                  className={`px-5 py-2.5 rounded-full text-sm font-body font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-[#0F1420] text-white shadow-md"
                      : "bg-white border border-gray-200 text-gray-600 hover:border-gray-400 hover:text-gray-900"
                  }`}
                >
                  {region.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Destination Grid Section */}
      <section className="py-20 md:py-28 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10 pb-4 border-b border-gray-100">
            <span className="text-xs uppercase tracking-widest text-gray-500 font-semibold font-body">
              Showing {filteredDestinations.length} Destinations
            </span>
            <span className="text-xs text-gray-400 font-body">
              Nonstop private jet charters from London airports
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.map((dest: Destination) => (
              <div
                key={dest.id}
                className="card flex flex-col group transition-all duration-300 hover:border-[#C9A052]/40"
              >
                {/* Image Card with Bottom Overlay */}
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-2xl bg-gray-100">
                  <img
                    src={dest.image}
                    alt={dest.city}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Gradient Overlay for City text */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F1420]/90 via-[#0F1420]/30 to-transparent flex flex-col justify-end p-6">
                    <span className="text-[11px] font-semibold text-[#C9A052] uppercase tracking-wider font-body mb-1">
                      {dest.regionLabel} • {dest.country}
                    </span>
                    <h3 className="font-display text-3xl font-bold text-white">
                      {dest.city}
                    </h3>
                  </div>
                </div>

                {/* Below Image Content */}
                <div className="p-6 md:p-7 flex flex-col flex-1">
                  <p className="font-display text-base font-semibold text-[#0F1420] mb-2">
                    {dest.tagline}
                  </p>
                  <p className="text-sm text-gray-600 font-body leading-relaxed mb-4">
                    {dest.description}
                  </p>

                  {/* Flight time & Airport */}
                  <div className="space-y-2 py-3 px-3.5 bg-[#F5F2EC]/60 rounded-xl border border-[#E8E5DF] mb-5 text-xs font-body text-gray-700">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#C9A052] shrink-0" />
                      <span className="font-semibold text-[#0F1420]">
                        ⏱ {dest.flightTime}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-3.5 h-3.5 text-[#C9A052] shrink-0" />
                      <span className="truncate">{dest.airport}</span>
                    </div>
                  </div>

                  {/* Highlights Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {dest.highlights.map((item, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-gray-100 text-gray-700 font-body"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <div className="mt-auto pt-2">
                    <Link
                      href="/booking"
                      className="btn-outline-dark w-full justify-center group/btn text-sm"
                    >
                      <span>Charter to {dest.city}</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Banner Section */}
      <section className="bg-[#0F1420] text-white py-20 md:py-28 px-6 md:px-12 lg:px-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#C9A052] text-xs font-medium uppercase tracking-wider mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              Worldwide Charter Network
            </div>
            <h2 className="heading-lg text-white mb-4">
              Don&apos;t see your destination?
            </h2>
            <p className="text-base md:text-lg text-gray-300 font-body font-light leading-relaxed">
              We fly anywhere. Tell us where you want to go and our concierge will
              arrange the rest — from international hubs to remote island runways.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <a
              href={customItineraryWhatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex items-center gap-2 text-sm px-8 py-4 font-semibold"
            >
              <MessageCircle className="w-4 h-4 text-emerald-800" />
              <span>Send us your itinerary</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <Link
              href="/booking"
              className="btn-outline flex items-center gap-2 text-sm px-8 py-4"
            >
              Custom quote online
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
