"use client";

import { useState } from "react";
import Link from "next/link";
import { Users, Compass, ArrowUpRight, ShieldCheck, Gauge, Plane } from "lucide-react";
import { jetCategoriesData, fleetCategories, Aircraft } from "@/data/fleet";

export default function FleetCategoriesPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const displayedCategories =
    activeCategory === "all"
      ? jetCategoriesData
      : jetCategoriesData.filter((cat: Aircraft) => cat.category === activeCategory || cat.id === activeCategory);

  return (
    <div className="min-h-screen bg-white">
      {/* Top Hero */}
      <section className="bg-[#F5F2EC] pt-32 pb-20 md:pt-40 md:pb-28 px-6 md:px-12 lg:px-20 border-b border-[#E8E5DF]">
        <div className="max-w-7xl mx-auto">
          <p className="section-label">AIRCRAFT CATEGORIES</p>
          <h1 className="heading-xl text-[#0F1420] max-w-4xl mb-6">
            Private jet aircraft categories.
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl font-body font-light leading-relaxed">
            Private charters are categorized by aircraft size and mission profile. From nimble turboprops and entry-level jets to transcontinental flagships and VIP airliners, discover each category&apos;s range, seating, and capabilities.
          </p>

          {/* Filters Bar */}
          <div className="mt-12 flex flex-wrap items-center gap-3">
            {fleetCategories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-5 py-2.5 rounded-full text-sm font-body font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-[#0F1420] text-white shadow-md"
                      : "bg-white border border-gray-200 text-gray-600 hover:border-gray-400 hover:text-gray-900"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Categories Grid Section */}
      <section className="py-20 md:py-28 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Results count label */}
          <div className="flex items-center justify-between mb-10 pb-4 border-b border-gray-100">
            <span className="text-xs uppercase tracking-widest text-gray-500 font-semibold font-body">
              Showing {displayedCategories.length} Aircraft Categories
            </span>
            <span className="text-xs text-gray-400 font-body">
              Curated private aviation network with vetted AOC operators
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedCategories.map((aircraft: Aircraft) => (
              <FleetCategoryCard key={aircraft.id} aircraft={aircraft} />
            ))}
          </div>

          {displayedCategories.length === 0 && (
            <div className="text-center py-20 bg-[#F5F2EC] rounded-2xl p-12">
              <h3 className="font-display text-2xl text-[#0F1420] mb-2">
                No category found
              </h3>
              <p className="text-gray-600 mb-6">
                Try selecting another category to see available aircraft sizes.
              </p>
              <button
                onClick={() => setActiveCategory("all")}
                className="btn-primary"
              >
                View all categories
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function FleetCategoryCard({ aircraft }: { aircraft: Aircraft }) {
  const [view, setView] = useState<"exterior" | "interior">("exterior");
  const activeImage = view === "exterior" ? aircraft.imageExterior : aircraft.imageInterior;

  return (
    <div className="card flex flex-col group transition-all duration-300 hover:border-[#C9A052]/40 bg-white">
      {/* Aircraft Image with Interactive Exterior/Interior Switcher */}
      <div className="relative aspect-video w-full overflow-hidden rounded-t-2xl bg-gray-900">
        <img
          src={activeImage}
          alt={`${aircraft.name} ${view === "exterior" ? "exterior view" : "cabin interior view"}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
          onError={(e) => {
            // Graceful fallback if any local asset issue occurs
            e.currentTarget.src = view === "exterior" ? "/images/jet-exterior.jpg" : "/images/jet-interior.jpg";
          }}
        />

        {/* Category Label Pill */}
        <div className="absolute top-4 left-4 bg-[#0F1420]/80 backdrop-blur-sm px-3 py-1 rounded-full pointer-events-none">
          <span className="text-[11px] font-semibold text-[#C9A052] uppercase tracking-wider font-body">
            {aircraft.categoryLabel}
          </span>
        </div>

        {/* Exterior / Interior Interactive View Switcher */}
        <div className="absolute top-3.5 right-3.5 z-10 flex items-center bg-[#0F1420]/85 backdrop-blur-md rounded-full p-1 border border-white/15 shadow-md">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setView("exterior");
            }}
            className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all ${
              view === "exterior"
                ? "bg-[#C9A052] text-[#0F1420] shadow-sm"
                : "text-white/80 hover:text-white"
            }`}
          >
            Exterior
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setView("interior");
            }}
            className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all ${
              view === "interior"
                ? "bg-[#C9A052] text-[#0F1420] shadow-sm"
                : "text-white/80 hover:text-white"
            }`}
          >
            Interior
          </button>
        </div>

        {/* Bottom View Subtitle */}
        <div className="absolute bottom-3 left-4 bg-[#0F1420]/75 backdrop-blur-sm px-2.5 py-0.5 rounded text-[10px] text-white/90 font-medium">
          {view === "exterior" ? "Exterior ramp view" : "Executive cabin interior"}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 md:p-7 flex flex-col flex-1">
        {/* Category & Title */}
        <div className="mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#C9A052] block mb-1">
            Jet Size Class
          </span>
          <h3 className="font-display text-2xl font-bold text-[#0F1420] group-hover:text-[#C9A052] transition-colors">
            {aircraft.name}
          </h3>
        </div>

        {/* Typical aircraft in class */}
        {aircraft.typicalAircraft && (
          <div className="text-xs text-[#0F1420] font-medium mb-3 pb-2 border-b border-gray-100">
            <span className="text-gray-400">Typical in class: </span>
            <span className="font-semibold">{aircraft.typicalAircraft.slice(0, 2).join(", ")}</span>
          </div>
        )}

        {/* Specs Bar */}
        <div className="flex items-center gap-2 text-xs font-medium text-gray-500 mb-4 pb-4 border-b border-gray-100">
          <span className="inline-flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-[#C9A052]" />
            {aircraft.passengersLabel}
          </span>
          <span>•</span>
          <span className="inline-flex items-center gap-1">
            <Compass className="w-3.5 h-3.5 text-[#C9A052]" />
            {aircraft.rangeLabel}
          </span>
          <span>•</span>
          <span className="inline-flex items-center gap-1">
            <Plane className="w-3.5 h-3.5 text-[#C9A052]" />
            {aircraft.cruiseSpeed}
          </span>
        </div>

        {/* Short Description */}
        <p className="text-sm text-gray-600 font-body line-clamp-2 leading-relaxed mb-6">
          {aircraft.description}
        </p>

        {/* Price in USD ($) */}
        <div className="mb-6 bg-[#F5F2EC]/60 rounded-xl p-3.5 border border-[#E8E5DF]">
          <span className="text-[11px] uppercase tracking-wider text-gray-500 font-medium block">
            Starting from
          </span>
          <div className="font-display text-xl font-bold text-[#0F1420]">
            ${aircraft.pricePerHour.toLocaleString()}
            <span className="font-body text-xs font-normal text-gray-600 ml-1.5">
              USD / hour (illustrative)
            </span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="space-y-2 mb-6">
          <Link
            href={`/booking/aircraft/${aircraft.id}`}
            className="btn-gold justify-center w-full text-xs font-bold py-2.5 flex items-center gap-1.5"
          >
            <span>Book this category</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
          <Link
            href={`/fleet/${aircraft.id}`}
            className="btn-outline-dark justify-center w-full text-xs py-2 flex items-center gap-1.5"
          >
            <span>Category details</span>
          </Link>
        </div>

        {/* Badges Footer */}
        <div className="mt-auto pt-4 border-t border-gray-100 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium bg-gray-100 text-gray-700">
            <Gauge className="w-3 h-3 text-[#C9A052]" />
            {aircraft.travelType}
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium bg-[#F5F2EC] text-[#0F1420]">
            <ShieldCheck className="w-3 h-3 text-[#C9A052]" />
            {aircraft.idealFor}
          </span>
        </div>
      </div>
    </div>
  );
}
