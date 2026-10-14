"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  SlidersHorizontal,
  RotateCcw,
  Check,
  X,
  Users,
  Compass,
  Sparkles,
  ArrowUpDown,
  Plane,
  ChevronDown,
} from "lucide-react";
import { useBooking } from "@/lib/bookingContext";
import { fleetData, Aircraft } from "@/data/fleet";

const aircraftPrices: Record<string, number> = {
  "citation-cj3-plus": 14200,
  "phenom-300e": 16500,
  "learjet-75-liberty": 18000,
  "praetor-600": 20500,
  "challenger-350": 24000,
  "gulfstream-g550": 35000,
  "gulfstream-g650er": 42000,
  "global-7500": 55000,
};

export default function BookingResultsPage() {
  const router = useRouter();
  const { booking, updateBooking } = useBooking();

  // Filters State
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [maxBudget, setMaxBudget] = useState<number>(60000);
  const [cabinPreferences, setCabinPreferences] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<
    "recommended" | "price-asc" | "price-desc" | "range"
  >("recommended");

  // Comparison State
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [showCompareModal, setShowCompareModal] = useState<boolean>(false);

  // Summary labels from booking context
  const routeFrom = booking.from || "London Farnborough (FAB)";
  const routeTo = booking.to || "Nice Côte d'Azur (NCE)";
  const travelDate = booking.departureDate || "18 Oct 2026";
  const paxCount = booking.passengers || 2;

  // Toggle Category
  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  // Toggle Cabin Preference
  const togglePreference = (pref: string) => {
    setCabinPreferences((prev) =>
      prev.includes(pref) ? prev.filter((p) => p !== pref) : [...prev, pref]
    );
  };

  // Reset Filters
  const resetFilters = () => {
    setSelectedCategories([]);
    setMaxBudget(60000);
    setCabinPreferences([]);
    setSortBy("recommended");
  };

  // Toggle Compare
  const toggleCompare = (id: string) => {
    setCompareIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Filter & Sort Logic
  const filteredAircraft = useMemo(() => {
    let result = [...fleetData];

    // Filter by Category
    if (selectedCategories.length > 0) {
      result = result.filter((jet) => {
        if (selectedCategories.includes("light") && jet.category === "light")
          return true;
        if (
          selectedCategories.includes("midsize") &&
          jet.category === "midsize"
        )
          return true;
        if (
          selectedCategories.includes("super-midsize") &&
          jet.category === "super-midsize"
        )
          return true;
        if (
          selectedCategories.includes("heavy") &&
          (jet.category === "large" || jet.category === "ultra-long-range")
        )
          return true;
        return false;
      });
    }

    // Filter by Budget
    result = result.filter((jet) => {
      const price = aircraftPrices[jet.id] || jet.illustrativeTrip.price || 20000;
      return price <= maxBudget;
    });

    // Filter by Cabin Preferences
    if (cabinPreferences.length > 0) {
      result = result.filter((jet) => {
        const amenitiesText = jet.amenities.join(" ").toLowerCase();
        return cabinPreferences.every((pref) => {
          if (pref === "wifi")
            return amenitiesText.includes("wi-fi") || amenitiesText.includes("wifi");
          if (pref === "lavatory")
            return amenitiesText.includes("lavatory");
          if (pref === "standup")
            return (
              amenitiesText.includes("stand-up") ||
              parseFloat(jet.cabinHeight) >= 1.8
            );
          if (pref === "pet") return true; // All SKYVANTAGE fleet permits executive pets
          return true;
        });
      });
    }

    // Sort Logic
    if (sortBy === "price-asc") {
      result.sort((a, b) => {
        const pA = aircraftPrices[a.id] || a.illustrativeTrip.price;
        const pB = aircraftPrices[b.id] || b.illustrativeTrip.price;
        return pA - pB;
      });
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => {
        const pA = aircraftPrices[a.id] || a.illustrativeTrip.price;
        const pB = aircraftPrices[b.id] || b.illustrativeTrip.price;
        return pB - pA;
      });
    } else if (sortBy === "range") {
      result.sort((a, b) => b.range - a.range);
    } else {
      // Recommended: praetor-600 first
      result.sort((a, b) => {
        if (a.id === "praetor-600") return -1;
        if (b.id === "praetor-600") return 1;
        return 0;
      });
    }

    return result;
  }, [selectedCategories, maxBudget, cabinPreferences, sortBy]);

  const handleSelectAircraft = (jetId: string) => {
    updateBooking({ selectedAircraftId: jetId });
    router.push(`/booking/aircraft/${jetId}`);
  };

  const comparedAircraftList = fleetData.filter((a) =>
    compareIds.includes(a.id)
  );

  return (
    <div className="w-full bg-[#FFFFFF] min-h-screen pb-28">
      {/* Top Route Summary Bar */}
      <section className="bg-[#F5F2EC] border-b border-[#E8E5DF] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm font-body">
            <div className="flex items-center gap-2 font-semibold text-[#0F1420]">
              <span>{routeFrom}</span>
              <ArrowRight className="w-4 h-4 text-[#C9A052]" />
              <span>{routeTo}</span>
            </div>

            <span className="text-gray-300 hidden sm:inline">|</span>

            <div className="text-[#555555]">
              <span className="font-medium text-[#0F1420]">{travelDate}</span> ·{" "}
              <span>{paxCount} {paxCount === 1 ? "Passenger" : "Passengers"}</span>
            </div>
          </div>

          <Link
            href="/booking"
            className="text-xs font-semibold text-[#0F1420] hover:text-[#C9A052] underline underline-offset-4 transition-colors self-start sm:self-auto"
          >
            Edit search
          </Link>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Heading Section */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#E8E5DF]">
          <div>
            <span className="section-label">
              Curated Aircraft Options
            </span>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#0F1420] tracking-tight">
              The right jet. For your journey.
            </h1>
            <p className="text-sm sm:text-base text-[#555555] font-body mt-2 max-w-2xl">
              Compare private aircraft suited to your route, your party and the way you like to travel.
            </p>
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-3 self-start md:self-auto">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#888888]">
              Sort by:
            </span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(
                    e.target.value as
                      | "recommended"
                      | "price-asc"
                      | "price-desc"
                      | "range"
                  )
                }
                className="appearance-none bg-white border border-[#E8E5DF] rounded-xl px-4 py-2.5 pr-9 text-xs sm:text-sm font-semibold text-[#0F1420] hover:border-[#C9A052] focus:outline-none focus:ring-1 focus:ring-[#C9A052] transition-colors cursor-pointer"
              >
                <option value="recommended">Recommended</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="range">Longest Range</option>
              </select>
              <ChevronDown className="w-4 h-4 text-[#888888] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Content Layout: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Filters Sidebar (280px / 4 cols) */}
          <aside className="lg:col-span-4 xl:col-span-3 bg-white rounded-2xl border border-[#E8E5DF] p-6 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8E5DF]">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#C9A052]" />
                <h3 className="font-display text-lg font-bold text-[#0F1420]">
                  Filters
                </h3>
              </div>
              <button
                type="button"
                onClick={resetFilters}
                className="text-xs font-semibold text-[#888888] hover:text-[#0F1420] flex items-center gap-1 transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset all</span>
              </button>
            </div>

            {/* Aircraft Category */}
            <div className="space-y-3 pb-5 border-b border-[#E8E5DF]">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#0F1420] block">
                Aircraft Category
              </span>
              <div className="space-y-2.5 text-xs font-body">
                {[
                  { id: "light", label: "Light jet (up to 8 seats)" },
                  { id: "midsize", label: "Midsize jet (up to 9 seats)" },
                  { id: "super-midsize", label: "Super-midsize jet (9–10 seats)" },
                  { id: "heavy", label: "Heavy & long-range (12–19 seats)" },
                ].map((cat) => (
                  <label
                    key={cat.id}
                    className="flex items-center gap-3 cursor-pointer group text-[#555555] hover:text-[#0F1420]"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat.id)}
                      onChange={() => toggleCategory(cat.id)}
                      className="h-4 w-4 rounded border-gray-300 text-[#C9A052] focus:ring-[#C9A052] accent-[#C9A052]"
                    />
                    <span>{cat.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Journey Budget Slider */}
            <div className="space-y-3 pb-5 border-b border-[#E8E5DF]">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold uppercase tracking-wider text-[#0F1420]">
                  Max Charter Budget
                </span>
                <span className="font-bold text-[#C9A052]">
                  £{maxBudget.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="10000"
                max="60000"
                step="2500"
                value={maxBudget}
                onChange={(e) => setMaxBudget(Number(e.target.value))}
                className="w-full accent-[#C9A052] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-[#888888]">
                <span>£10,000</span>
                <span>£60,000+</span>
              </div>
            </div>

            {/* Cabin Preferences */}
            <div className="space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#0F1420] block">
                Cabin Preferences
              </span>
              <div className="space-y-2.5 text-xs font-body">
                {[
                  { id: "wifi", label: "Wi-Fi onboard" },
                  { id: "lavatory", label: "Enclosed lavatory" },
                  { id: "standup", label: "Stand-up cabin (1.8m+)" },
                  { id: "pet", label: "Pet-friendly cabin" },
                ].map((pref) => (
                  <label
                    key={pref.id}
                    className="flex items-center gap-3 cursor-pointer group text-[#555555] hover:text-[#0F1420]"
                  >
                    <input
                      type="checkbox"
                      checked={cabinPreferences.includes(pref.id)}
                      onChange={() => togglePreference(pref.id)}
                      className="h-4 w-4 rounded border-gray-300 text-[#C9A052] focus:ring-[#C9A052] accent-[#C9A052]"
                    />
                    <span>{pref.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Concierge Assistance Note */}
            <div className="pt-2 bg-[#F5F2EC] p-4 rounded-xl text-xs text-[#555555] space-y-1">
              <span className="font-semibold text-[#0F1420] block">
                Need specialized routing?
              </span>
              <p>
                Our flight advisors can source unlisted charter capacity worldwide.
              </p>
              <a
                href="https://wa.me/447010452726"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block pt-1 font-semibold text-[#C9A052] hover:underline"
              >
                Inquire via WhatsApp ↗
              </a>
            </div>
          </aside>

          {/* Results List (flex-1 / 8 cols) */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-6">
            {filteredAircraft.length === 0 ? (
              <div className="bg-white rounded-2xl border border-[#E8E5DF] p-12 text-center space-y-4">
                <Plane className="w-12 h-12 text-[#888888] mx-auto opacity-40" />
                <h3 className="font-display text-xl font-bold text-[#0F1420]">
                  No aircraft match your exact filters
                </h3>
                <p className="text-sm text-[#555555] max-w-md mx-auto">
                  Try adjusting your budget slider or clearing specific category restrictions to see available jets.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="btn-outline-dark text-xs px-6 py-2.5"
                >
                  Reset all filters
                </button>
              </div>
            ) : (
              filteredAircraft.map((jet) => {
                const isOurPick = jet.id === "praetor-600";
                const isCompared = compareIds.includes(jet.id);
                const price =
                  aircraftPrices[jet.id] ||
                  jet.illustrativeTrip.price ||
                  20500;

                return (
                  <div
                    key={jet.id}
                    className={`bg-white rounded-3xl border transition-all duration-300 overflow-hidden hover:shadow-lg relative ${
                      isOurPick
                        ? "border-[#C9A052] shadow-sm"
                        : "border-[#E8E5DF]"
                    }`}
                  >
                    {/* Top Our Pick Badge */}
                    {isOurPick && (
                      <div className="absolute top-4 left-4 z-10">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#C9A052] text-[#0F1420] shadow-sm">
                          <Sparkles className="w-3.5 h-3.5" />
                          OUR PICK
                        </span>
                      </div>
                    )}

                    <div className="flex flex-col md:flex-row items-stretch">
                      {/* Left: Aircraft Image (300px wide on desktop) */}
                      <div className="md:w-[300px] xl:w-[320px] h-60 md:h-auto relative bg-gray-100 flex-shrink-0">
                        <img
                          src={jet.imageExterior}
                          alt={jet.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Right: Card Details */}
                      <div className="flex-1 p-6 sm:p-7 flex flex-col justify-between">
                        <div>
                          {/* Top row: Category + Name + Price */}
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 pb-3 border-b border-gray-100">
                            <div>
                              <span className="text-[11px] font-body uppercase tracking-wider font-semibold text-[#C9A052] block">
                                {jet.categoryLabel}
                              </span>
                              <h3 className="font-display text-2xl font-bold text-[#0F1420]">
                                {jet.name}
                              </h3>
                            </div>

                            <div className="text-left sm:text-right">
                              <span className="text-[11px] text-[#888888] uppercase tracking-wider block">
                                Illustrative total
                              </span>
                              <div className="font-display text-2xl font-bold text-[#0F1420]">
                                £{price.toLocaleString()}
                              </div>
                              <span className="text-[11px] text-[#555555]">
                                Entire aircraft GBP
                              </span>
                            </div>
                          </div>

                          {/* Route Specification line */}
                          <div className="py-2.5 text-xs font-semibold text-[#0F1420] flex items-center gap-2">
                            <span>2h nonstop</span>
                            <span>·</span>
                            <span>{paxCount} {paxCount === 1 ? "adult" : "adults"}</span>
                            <span>·</span>
                            <span>Private cabin</span>
                          </div>

                          {/* Short Description */}
                          <p className="text-xs sm:text-sm text-[#555555] font-body line-clamp-2 mb-4 leading-relaxed">
                            {jet.description}
                          </p>

                          {/* Quick Specs Icons */}
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 py-3 border-t border-gray-100 text-xs text-[#555555]">
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4 text-[#C9A052]" />
                              <span>{jet.passengersLabel}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Compass className="w-4 h-4 text-[#C9A052]" />
                              <span>{jet.rangeLabel}</span>
                            </div>
                            <div className="hidden sm:flex items-center gap-2">
                              <Plane className="w-4 h-4 text-[#C9A052]" />
                              <span>Speed: {jet.cruiseSpeed}</span>
                            </div>
                          </div>
                        </div>

                        {/* Bottom Action Row */}
                        <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
                          {/* Add to compare checkbox */}
                          <label className="flex items-center gap-2 text-xs font-medium text-[#555555] cursor-pointer hover:text-[#0F1420]">
                            <input
                              type="checkbox"
                              checked={isCompared}
                              onChange={() => toggleCompare(jet.id)}
                              className="h-4 w-4 rounded border-gray-300 text-[#C9A052] focus:ring-[#C9A052] accent-[#C9A052]"
                            />
                            <span>Add to compare</span>
                          </label>

                          {/* View aircraft button */}
                          <button
                            type="button"
                            onClick={() => handleSelectAircraft(jet.id)}
                            className="btn-primary px-6 py-2.5 text-xs sm:text-sm flex items-center gap-2"
                          >
                            <span>View aircraft</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Bottom Sticky Compare Bar (appears when 2+ selected) */}
      {compareIds.length >= 2 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#0F1420] text-white border-t border-[#C9A052]/40 shadow-2xl py-4 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-[#C9A052] text-[#0F1420] text-xs font-bold flex items-center justify-center">
                {compareIds.length}
              </span>
              <div className="text-xs sm:text-sm">
                <span className="font-semibold text-white">
                  {compareIds.length} aircraft selected:{" "}
                </span>
                <span className="text-gray-300">
                  {comparedAircraftList.map((a) => a.name).join(", ")}
                </span>
                <span className="hidden md:inline text-gray-400">
                  {" "}
                  · Compare cabin, capacity and price
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setCompareIds([])}
                className="text-xs text-gray-400 hover:text-white transition-colors"
              >
                Clear all
              </button>
              <button
                type="button"
                onClick={() => setShowCompareModal(true)}
                className="btn-gold text-xs py-2.5 px-6 font-semibold"
              >
                Compare aircraft
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Compare Modal */}
      {showCompareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-5xl w-full p-6 sm:p-8 my-8 shadow-2xl border border-[#E8E5DF] relative">
            <div className="flex justify-between items-center pb-4 border-b border-[#E8E5DF] mb-6">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-[#C9A052] font-semibold block">
                  Side-by-Side Analysis
                </span>
                <h3 className="font-display text-2xl font-bold text-[#0F1420]">
                  Compare Selected Aircraft
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowCompareModal(false)}
                className="p-2 text-gray-400 hover:text-[#0F1420] rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm font-body border-collapse">
                <thead>
                  <tr className="border-b border-[#E8E5DF]">
                    <th className="p-3 text-xs uppercase text-[#888888] font-semibold w-40">
                      Aircraft
                    </th>
                    {comparedAircraftList.map((jet) => (
                      <th key={jet.id} className="p-3 min-w-[200px]">
                        <div className="space-y-2">
                          <img
                            src={jet.imageExterior}
                            alt={jet.name}
                            className="w-full h-28 object-cover rounded-xl"
                          />
                          <span className="text-xs uppercase text-[#C9A052] font-bold block">
                            {jet.categoryLabel}
                          </span>
                          <span className="font-display text-lg font-bold text-[#0F1420] block">
                            {jet.name}
                          </span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8E5DF] text-xs">
                  <tr>
                    <td className="p-3 font-semibold text-[#0F1420]">Illustrative Price</td>
                    {comparedAircraftList.map((jet) => (
                      <td key={jet.id} className="p-3 font-bold text-base text-[#0F1420]">
                        £{(aircraftPrices[jet.id] || jet.illustrativeTrip.price).toLocaleString()}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-[#0F1420]">Capacity</td>
                    {comparedAircraftList.map((jet) => (
                      <td key={jet.id} className="p-3 text-[#555555]">
                        {jet.passengersLabel}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-[#0F1420]">Range</td>
                    {comparedAircraftList.map((jet) => (
                      <td key={jet.id} className="p-3 text-[#555555]">
                        {jet.rangeLabel}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-[#0F1420]">Cabin Height</td>
                    {comparedAircraftList.map((jet) => (
                      <td key={jet.id} className="p-3 text-[#555555]">
                        {jet.cabinHeight}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-[#0F1420]">Cruise Speed</td>
                    {comparedAircraftList.map((jet) => (
                      <td key={jet.id} className="p-3 text-[#555555]">
                        {jet.cruiseSpeed}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-[#0F1420]">Baggage</td>
                    {comparedAircraftList.map((jet) => (
                      <td key={jet.id} className="p-3 text-[#555555]">
                        {jet.baggageVolume}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-[#0F1420]">Action</td>
                    {comparedAircraftList.map((jet) => (
                      <td key={jet.id} className="p-3">
                        <button
                          type="button"
                          onClick={() => {
                            setShowCompareModal(false);
                            handleSelectAircraft(jet.id);
                          }}
                          className="btn-primary text-xs py-2 px-4 w-full justify-center"
                        >
                          Select Jet →
                        </button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
