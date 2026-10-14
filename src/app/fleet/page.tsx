"use client";

import { useState } from "react";
import Link from "next/link";
import { Users, Compass, ArrowUpRight, ShieldCheck, Gauge } from "lucide-react";
import { fleetData, fleetCategories, Aircraft } from "@/data/fleet";

export default function FleetPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredAircraft =
    activeCategory === "all"
      ? fleetData
      : fleetData.filter((aircraft: Aircraft) => aircraft.category === activeCategory);

  return (
    <div className="min-h-screen bg-white">
      {/* Top Hero */}
      <section className="bg-[#F5F2EC] pt-32 pb-20 md:pt-40 md:pb-28 px-6 md:px-12 lg:px-20 border-b border-[#E8E5DF]">
        <div className="max-w-7xl mx-auto">
          <p className="section-label">OUR AIRCRAFT COLLECTION</p>
          <h1 className="heading-xl text-[#0F1420] max-w-4xl mb-6">
            Find your perfect aircraft.
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl font-body font-light leading-relaxed">
            From agile regional jets to intercontinental flagships. Every aircraft
            in our charter collection is selected for comfort, range and reliability.
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

      {/* Aircraft Grid Section */}
      <section className="py-20 md:py-28 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Results count label */}
          <div className="flex items-center justify-between mb-10 pb-4 border-b border-gray-100">
            <span className="text-xs uppercase tracking-widest text-gray-500 font-semibold font-body">
              Showing {filteredAircraft.length} of {fleetData.length} Aircraft
            </span>
            <span className="text-xs text-gray-400 font-body">
              All aircraft operated by vetted AOC holders
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAircraft.map((aircraft: Aircraft) => (
              <div
                key={aircraft.id}
                className="card flex flex-col group transition-all duration-300 hover:border-[#C9A052]/40"
              >
                {/* Aircraft Image */}
                <div className="relative aspect-video w-full overflow-hidden rounded-t-2xl bg-gray-100">
                  <img
                    src={aircraft.imageExterior}
                    alt={aircraft.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-[#0F1420]/80 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-[11px] font-semibold text-[#C9A052] uppercase tracking-wider font-body">
                      {aircraft.categoryLabel}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 md:p-7 flex flex-col flex-1">
                  {/* Category & Title */}
                  <div className="mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#C9A052] block mb-1">
                      {aircraft.categoryLabel}
                    </span>
                    <h3 className="font-display text-2xl font-bold text-[#0F1420] group-hover:text-[#C9A052] transition-colors">
                      {aircraft.name}
                    </h3>
                  </div>

                  {/* Specs Bar */}
                  <div className="flex items-center gap-2 text-xs font-medium text-gray-500 mb-4 pb-4 border-b border-gray-100">
                    <span>{aircraft.manufacturer}</span>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-[#C9A052]" />
                      {aircraft.passengersLabel}
                    </span>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1">
                      <Compass className="w-3.5 h-3.5 text-[#C9A052]" />
                      {aircraft.rangeLabel}
                    </span>
                  </div>

                  {/* Short Description */}
                  <p className="text-sm text-gray-600 font-body line-clamp-2 leading-relaxed mb-6">
                    {aircraft.description}
                  </p>

                  {/* Price */}
                  <div className="mb-6 bg-[#F5F2EC]/60 rounded-xl p-3.5 border border-[#E8E5DF]">
                    <span className="text-[11px] uppercase tracking-wider text-gray-500 font-medium block">
                      Starting from
                    </span>
                    <div className="font-display text-xl font-bold text-[#0F1420]">
                      £{aircraft.pricePerHour.toLocaleString()}
                      <span className="font-body text-xs font-normal text-gray-600 ml-1.5">
                        per hour (illustrative)
                      </span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Link
                    href={`/fleet/${aircraft.id}`}
                    className="btn-outline-dark justify-center w-full mb-6 group/btn"
                  >
                    <span>Explore aircraft</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </Link>

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
            ))}
          </div>

          {filteredAircraft.length === 0 && (
            <div className="text-center py-20 bg-[#F5F2EC] rounded-2xl p-12">
              <h3 className="font-display text-2xl text-[#0F1420] mb-2">
                No aircraft found
              </h3>
              <p className="text-gray-600 mb-6">
                Try selecting another category to see available aircraft in our fleet.
              </p>
              <button
                onClick={() => setActiveCategory("all")}
                className="btn-primary"
              >
                View all aircraft
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
