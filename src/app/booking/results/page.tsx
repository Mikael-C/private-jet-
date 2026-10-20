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
  Plane,
  ChevronDown,
  Luggage,
} from "lucide-react";
import { useBooking } from "@/lib/bookingContext";
import { jetCategoriesData, Aircraft } from "@/data/fleet";

const categoryPrices: Record<string, number> = {
  turboprop: 8500,
  piston: 5200,
  "entry-level-jet": 11500,
  "super-light-jet": 15800,
  "midsize-jet": 21000,
  "super-midsize-jet": 28500,
  "heavy-jet": 39000,
  "ultra-long-range": 58000,
  "vip-airliner": 95000,
};

export default function BookingResultsPage() {
  const router = useRouter();
  const { booking, updateBooking } = useBooking();

  // Filters State
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [maxBudget, setMaxBudget] = useState<number>(100000);
  const [cabinPreferences, setCabinPreferences] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<
    "recommended" | "price-asc" | "price-desc" | "range"
  >("recommended");

  // Comparison State
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [showCompareModal, setShowCompareModal] = useState<boolean>(false);
  const [categoryViewMap, setCategoryViewMap] = useState<Record<string, "exterior" | "interior">>({});

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
    setMaxBudget(100000);
    setCabinPreferences([]);
    setSortBy("recommended");
  };

  // Toggle Compare
  const toggleCompare = (id: string) => {
    setCompareIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Filter & Sort Logic strictly on Categories
  const filteredCategories = useMemo(() => {
    let result = [...jetCategoriesData];

    // Filter by Category ID
    if (selectedCategories.length > 0) {
      result = result.filter((cat) => selectedCategories.includes(cat.id));
    }

    // Filter by Budget in USD
    result = result.filter((cat) => {
      const price = categoryPrices[cat.id] || cat.illustrativeTrip.price || 20000;
      return price <= maxBudget;
    });

    // Filter by Cabin Preferences
    if (cabinPreferences.length > 0) {
      result = result.filter((cat) => {
        const amenitiesText = cat.amenities.join(" ").toLowerCase();
        return cabinPreferences.every((pref) => {
          if (pref === "wifi")
            return amenitiesText.includes("wi-fi") || amenitiesText.includes("connectivity");
          if (pref === "lavatory")
            return amenitiesText.includes("lavatory");
          if (pref === "standup")
            return (
              amenitiesText.includes("stand-up") ||
              parseFloat(cat.cabinHeight) >= 1.75
            );
          if (pref === "galley")
            return amenitiesText.includes("galley") || amenitiesText.includes("refreshment");
          return true;
        });
      });
    }

    // Sort Logic
    if (sortBy === "price-asc") {
      result.sort((a, b) => {
        const pA = categoryPrices[a.id] || a.illustrativeTrip.price;
        const pB = categoryPrices[b.id] || b.illustrativeTrip.price;
        return pA - pB;
      });
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => {
        const pA = categoryPrices[a.id] || a.illustrativeTrip.price;
        const pB = categoryPrices[b.id] || b.illustrativeTrip.price;
        return pB - pA;
      });
    } else if (sortBy === "range") {
      result.sort((a, b) => b.range - a.range);
    } else {
      // Recommended: Super-light and Super-midsize prominent
      const order = [
        "super-light-jet",
        "super-midsize-jet",
        "midsize-jet",
        "turboprop",
        "heavy-jet",
        "entry-level-jet",
        "ultra-long-range",
        "piston",
        "vip-airliner",
      ];
      result.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
    }

    return result;
  }, [selectedCategories, maxBudget, cabinPreferences, sortBy]);

  const handleSelectCategory = (categoryId: string) => {
    updateBooking({ selectedAircraftId: categoryId });
    router.push(`/booking/aircraft/${categoryId}`);
  };

  const comparedCategoryList = jetCategoriesData.filter((a) =>
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
              AIRCRAFT CATEGORY SELECTION
            </span>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-[#0F1420] tracking-tight">
              Select your aircraft category.
            </h1>
            <p className="text-sm sm:text-base text-[#555555] font-body mt-2 max-w-2xl">
              Private charters are booked by aircraft size category. Choose the category that matches your passenger count, range, and cabin comfort requirements.
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
                  Jet Categories
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

            {/* Jet Size Category Checkboxes */}
            <div className="space-y-3 pb-5 border-b border-[#E8E5DF]">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#0F1420] block">
                Jet Size
              </span>
              <div className="space-y-2 text-xs font-body">
                {[
                  { id: "piston", label: "Piston (3–4 seats)" },
                  { id: "turboprop", label: "Turboprop (6–8 seats)" },
                  { id: "entry-level-jet", label: "Entry Level Jet (4–5 seats)" },
                  { id: "super-light-jet", label: "Super Light Jet (7–8 seats)" },
                  { id: "midsize-jet", label: "Mid-Size Jet (8–9 seats)" },
                  { id: "super-midsize-jet", label: "Super Mid-Size (9–10 seats)" },
                  { id: "heavy-jet", label: "Heavy Jet (10–14 seats)" },
                  { id: "ultra-long-range", label: "Ultra-Long-Range (14–19 seats)" },
                  { id: "vip-airliner", label: "VIP Airliner (19–30+ seats)" },
                ].map((cat) => (
                  <label
                    key={cat.id}
                    className="flex items-center gap-2.5 cursor-pointer group text-[#555555] hover:text-[#0F1420]"
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

            {/* Journey Budget Slider (USD) */}
            <div className="space-y-3 pb-5 border-b border-[#E8E5DF]">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold uppercase tracking-wider text-[#0F1420]">
                  Max Budget (USD)
                </span>
                <span className="font-bold text-[#C9A052]">
                  ${maxBudget.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="5000"
                max="100000"
                step="2500"
                value={maxBudget}
                onChange={(e) => setMaxBudget(Number(e.target.value))}
                className="w-full accent-[#C9A052] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-[#888888]">
                <span>$5,000</span>
                <span>$100,000+</span>
              </div>
            </div>

            {/* Cabin Preferences */}
            <div className="space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#0F1420] block">
                Cabin Features
              </span>
              <div className="space-y-2.5 text-xs font-body">
                {[
                  { id: "wifi", label: "High-speed Wi-Fi" },
                  { id: "lavatory", label: "Enclosed private lavatory" },
                  { id: "standup", label: "Full stand-up cabin" },
                  { id: "galley", label: "Galley / Refreshment bar" },
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
              <button
                type="button"
                onClick={() => window.dispatchEvent(new Event("open-concierge-chat"))}
                className="inline-block pt-1 font-semibold text-[#C9A052] hover:underline cursor-pointer"
              >
                Inquire with Concierge ↗
              </button>
            </div>
          </aside>

          {/* Results List (8 cols) */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-6">
            {filteredCategories.length === 0 ? (
              <div className="bg-white rounded-2xl border border-[#E8E5DF] p-12 text-center space-y-4">
                <Plane className="w-12 h-12 text-[#888888] mx-auto opacity-40" />
                <h3 className="font-display text-xl font-bold text-[#0F1420]">
                  No jet category matches your exact filters
                </h3>
                <p className="text-sm text-[#555555] max-w-md mx-auto">
                  Try adjusting your budget slider or clearing category filters to see available aircraft sizes.
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
              filteredCategories.map((cat) => {
                const isOurPick = cat.id === "super-light-jet";
                const isCompared = compareIds.includes(cat.id);
                const price =
                  categoryPrices[cat.id] ||
                  cat.illustrativeTrip.price ||
                  20500;

                return (
                  <div
                    key={cat.id}
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
                          POPULAR CHOICE
                        </span>
                      </div>
                    )}

                    <div className="flex flex-col md:flex-row items-stretch">
                      {/* Left: Aircraft Category Image */}
                      {(() => {
                        const view = categoryViewMap[cat.id] || "exterior";
                        const imgSource = view === "exterior" ? cat.imageExterior : cat.imageInterior;
                        return (
                          <div className="md:w-[300px] xl:w-[320px] h-60 md:h-auto relative bg-gray-900 flex-shrink-0 group">
                            <img
                              src={imgSource}
                              alt={`${cat.name} ${view} view`}
                              className="w-full h-full object-cover transition-all duration-500"
                              onError={(e) => {
                                e.currentTarget.src = view === "exterior" ? "/images/jet-exterior.jpg" : "/images/jet-interior.jpg";
                              }}
                            />
                            <div className="absolute bottom-3 left-3 bg-[#0F1420]/80 backdrop-blur-md px-2.5 py-1 rounded-lg">
                              <span className="text-[10px] font-bold uppercase text-[#C9A052] tracking-wider">
                                {cat.categoryLabel}
                              </span>
                            </div>

                            {/* View Switcher Toggle */}
                            <div className="absolute top-3 right-3 z-10 flex items-center bg-[#0F1420]/85 backdrop-blur-md rounded-full p-0.5 border border-white/15">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setCategoryViewMap((prev) => ({ ...prev, [cat.id]: "exterior" }));
                                }}
                                className={`px-2 py-0.5 rounded-full text-[10px] font-semibold transition-all ${
                                  view === "exterior"
                                    ? "bg-[#C9A052] text-[#0F1420]"
                                    : "text-white/80 hover:text-white"
                                }`}
                              >
                                Exterior
                              </button>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setCategoryViewMap((prev) => ({ ...prev, [cat.id]: "interior" }));
                                }}
                                className={`px-2 py-0.5 rounded-full text-[10px] font-semibold transition-all ${
                                  view === "interior"
                                    ? "bg-[#C9A052] text-[#0F1420]"
                                    : "text-white/80 hover:text-white"
                                }`}
                              >
                                Interior
                              </button>
                            </div>
                          </div>
                        );
                      })()}

                      {/* Right: Card Details */}
                      <div className="flex-1 p-6 sm:p-7 flex flex-col justify-between">
                        <div>
                          {/* Top row: Category + Price in USD */}
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 pb-3 border-b border-gray-100">
                            <div>
                              <span className="text-[11px] font-body uppercase tracking-wider font-semibold text-[#C9A052] block">
                                Jet Size Class
                              </span>
                              <h3 className="font-display text-2xl font-bold text-[#0F1420]">
                                {cat.name}
                              </h3>
                            </div>

                            <div className="text-left sm:text-right">
                              <span className="text-[11px] text-[#888888] uppercase tracking-wider block">
                                Estimated charter
                              </span>
                              <div className="font-display text-2xl font-bold text-[#0F1420]">
                                ${price.toLocaleString()}
                              </div>
                              <span className="text-[11px] text-[#555555]">
                                USD · Entire aircraft
                              </span>
                            </div>
                          </div>

                          {/* Representative models line */}
                          {cat.typicalAircraft && cat.typicalAircraft.length > 0 && (
                            <div className="py-2.5 text-xs text-[#0F1420] flex flex-wrap items-center gap-1.5 font-medium">
                              <span className="text-[#888888]">Typical aircraft in class:</span>
                              <span className="font-semibold text-[#0F1420]">
                                {cat.typicalAircraft.join(" · ")}
                              </span>
                            </div>
                          )}

                          {/* Short Description */}
                          <p className="text-xs sm:text-sm text-[#555555] font-body line-clamp-2 mb-4 leading-relaxed">
                            {cat.description}
                          </p>

                          {/* Quick Specs Icons */}
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 border-t border-gray-100 text-xs text-[#555555]">
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4 text-[#C9A052]" />
                              <span>{cat.passengersLabel}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Compass className="w-4 h-4 text-[#C9A052]" />
                              <span>{cat.rangeLabel}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Plane className="w-4 h-4 text-[#C9A052]" />
                              <span>{cat.cruiseSpeed}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Luggage className="w-4 h-4 text-[#C9A052]" />
                              <span>{cat.baggageVolume}</span>
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
                              onChange={() => toggleCompare(cat.id)}
                              className="h-4 w-4 rounded border-gray-300 text-[#C9A052] focus:ring-[#C9A052] accent-[#C9A052]"
                            />
                            <span>Add to compare</span>
                          </label>

                          {/* Select Category button */}
                          <button
                            type="button"
                            onClick={() => handleSelectCategory(cat.id)}
                            className="btn-primary px-6 py-2.5 text-xs sm:text-sm flex items-center gap-2 shadow-sm"
                          >
                            <span>Select category</span>
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
            <div className="flex items-center gap-4">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#C9A052]">
                Comparing {compareIds.length} Categories:
              </span>
              <div className="flex items-center gap-2 overflow-x-auto">
                {comparedCategoryList.map((jet) => (
                  <span
                    key={jet.id}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs"
                  >
                    <span>{jet.name}</span>
                    <button
                      type="button"
                      onClick={() => toggleCompare(jet.id)}
                      className="hover:text-red-400"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setCompareIds([])}
                className="text-xs text-gray-400 hover:text-white underline"
              >
                Clear all
              </button>
              <button
                type="button"
                onClick={() => setShowCompareModal(true)}
                className="btn-gold px-5 py-2 text-xs font-bold"
              >
                View side-by-side
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Comparison Modal */}
      {showCompareModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <h3 className="font-display text-2xl font-bold text-[#0F1420]">
                Category Comparison
              </h3>
              <button
                type="button"
                onClick={() => setShowCompareModal(false)}
                className="p-2 rounded-full hover:bg-gray-100 text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {comparedCategoryList.map((cat) => (
                <div
                  key={cat.id}
                  className="bg-[#F5F2EC]/50 rounded-2xl p-5 border border-[#E8E5DF] space-y-4"
                >
                  <div className="aspect-video rounded-xl overflow-hidden bg-gray-200">
                    <img
                      src={cat.imageExterior}
                      alt={cat.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-[#C9A052]">
                      {cat.categoryLabel}
                    </span>
                    <h4 className="font-display text-xl font-bold text-[#0F1420]">
                      {cat.name}
                    </h4>
                    <span className="font-bold text-lg text-[#0F1420] block mt-1">
                      ${(categoryPrices[cat.id] || cat.illustrativeTrip.price).toLocaleString()} USD
                    </span>
                  </div>

                  <div className="space-y-2 text-xs text-[#555555] pt-2 border-t border-gray-200">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Capacity:</span>
                      <span className="font-medium text-[#0F1420]">{cat.passengersLabel}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Range:</span>
                      <span className="font-medium text-[#0F1420]">{cat.rangeLabel}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Speed:</span>
                      <span className="font-medium text-[#0F1420]">{cat.cruiseSpeed}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Baggage:</span>
                      <span className="font-medium text-[#0F1420]">{cat.baggageVolume}</span>
                    </div>
                    <div className="pt-2">
                      <span className="text-gray-400 block mb-1">Typical Aircraft:</span>
                      <span className="font-medium text-[#0F1420]">
                        {cat.typicalAircraft?.join(", ") || "Certified fleet"}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setShowCompareModal(false);
                      handleSelectCategory(cat.id);
                    }}
                    className="btn-primary w-full py-2.5 text-xs font-semibold"
                  >
                    Select this category
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
