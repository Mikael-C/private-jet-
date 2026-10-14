"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  PlaneTakeoff,
  PlaneLanding,
  Calendar,
  Clock,
  Users,
  Lock,
  Headphones,
  ArrowUpRight,
  Minus,
  Plus,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { useBooking } from "@/lib/bookingContext";

export default function BookingSearchPage() {
  const router = useRouter();
  const { booking, updateBooking } = useBooking();

  const [tripType, setTripType] = useState<"one-way" | "round-trip" | "multi-city">(
    booking.tripType || "one-way"
  );
  const [from, setFrom] = useState(booking.from || "London Farnborough (FAB)");
  const [to, setTo] = useState(booking.to || "Nice Côte d'Azur (NCE)");
  const [departureDate, setDepartureDate] = useState(
    booking.departureDate || "2026-10-18"
  );
  const [departureTime, setDepartureTime] = useState(
    booking.departureTime || "10:00"
  );
  const [returnDate, setReturnDate] = useState(booking.returnDate || "2026-10-22");
  const [passengers, setPassengers] = useState(booking.passengers || 2);
  const [flexibleTime, setFlexibleTime] = useState(booking.flexibleTime || false);

  const handlePassengersChange = (delta: number) => {
    setPassengers((prev) => {
      const updated = prev + delta;
      return Math.max(1, Math.min(19, updated));
    });
  };

  const handleSelectQuickRoute = (quickFrom: string, quickTo: string) => {
    setFrom(quickFrom);
    setTo(quickTo);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateBooking({
      tripType,
      from,
      to,
      departureDate,
      departureTime,
      returnDate: tripType === "round-trip" ? returnDate : "",
      passengers,
      flexibleTime,
    });
    router.push("/booking/results");
  };

  return (
    <div className="w-full bg-white pb-20">
      {/* Hero Banner */}
      <section className="relative w-full min-h-[300px] md:min-h-[340px] bg-[#0F1420] text-white flex items-center overflow-hidden">
        {/* Background Jet Image with Dark Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=1600&fit=crop&q=80"
            alt="SKYVANTAGE Private Jet"
            className="w-full h-full object-cover object-center opacity-30 mix-blend-luminosity scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F1420] via-[#0F1420]/85 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F1420] via-transparent to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 relative z-10 w-full">
          <div className="max-w-2xl">
            <span className="section-label-dark">
              Bespoke Private Charter
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4 leading-[1.08]">
              Your next journey, <br className="hidden sm:inline" />
              on your terms.
            </h1>
            <p className="font-body text-base sm:text-lg text-[#E8D5A3] font-light max-w-xl">
              Choose your destination. Set your schedule. Every aircraft in our fleet is fully bespoke and prepared to your exacting standard.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Search Form Card (60% / 7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-[#E8E5DF] p-6 sm:p-8 shadow-xl">
            <div className="mb-6">
              <span className="text-[11px] font-body uppercase tracking-widest text-[#C9A052] font-semibold block mb-1">
                Charter Search
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0F1420]">
                Where will you fly next?
              </h2>
              <p className="text-sm text-[#555555] font-body mt-1">
                Start with your itinerary. Every flight is private, every detail considered.
              </p>
            </div>

            {/* Trip Type Tabs */}
            <div className="flex items-center gap-2 p-1.5 bg-[#F5F2EC] rounded-xl w-fit mb-6">
              {(
                [
                  { id: "one-way", label: "One way" },
                  { id: "round-trip", label: "Round trip" },
                  { id: "multi-city", label: "Multi-city" },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setTripType(tab.id)}
                  className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                    tripType === tab.id
                      ? "bg-white text-[#0F1420] shadow-sm font-semibold"
                      : "text-[#555555] hover:text-[#0F1420]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Route: From & To */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* FROM */}
                <div>
                  <label className="block text-xs font-semibold text-[#0F1420] uppercase tracking-wider mb-1.5">
                    From
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#C9A052]">
                      <PlaneTakeoff className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      required
                      value={from}
                      onChange={(e) => setFrom(e.target.value)}
                      placeholder="e.g. London Farnborough (FAB)"
                      className="input-field pl-10"
                    />
                  </div>
                  <span className="text-[11px] text-[#888888] mt-1 block">
                    Departure airport or private terminal
                  </span>
                </div>

                {/* TO */}
                <div>
                  <label className="block text-xs font-semibold text-[#0F1420] uppercase tracking-wider mb-1.5">
                    To
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#C9A052]">
                      <PlaneLanding className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      required
                      value={to}
                      onChange={(e) => setTo(e.target.value)}
                      placeholder="e.g. Nice Côte d'Azur (NCE)"
                      className="input-field pl-10"
                    />
                  </div>
                  <span className="text-[11px] text-[#888888] mt-1 block">
                    Destination city or runway
                  </span>
                </div>
              </div>

              {/* Schedule: Departure Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Departure Date */}
                <div>
                  <label className="block text-xs font-semibold text-[#0F1420] uppercase tracking-wider mb-1.5">
                    Departure Date
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#C9A052]">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <input
                      type="date"
                      required
                      value={departureDate}
                      onChange={(e) => setDepartureDate(e.target.value)}
                      className="input-field pl-10"
                    />
                  </div>
                </div>

                {/* Departure Time */}
                <div>
                  <label className="block text-xs font-semibold text-[#0F1420] uppercase tracking-wider mb-1.5">
                    Departure Time
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#C9A052]">
                      <Clock className="w-4 h-4" />
                    </div>
                    <input
                      type="time"
                      value={departureTime}
                      onChange={(e) => setDepartureTime(e.target.value)}
                      className="input-field pl-10"
                    />
                  </div>
                </div>
              </div>

              {/* Return Date if Round Trip */}
              {tripType === "round-trip" && (
                <div>
                  <label className="block text-xs font-semibold text-[#0F1420] uppercase tracking-wider mb-1.5">
                    Return Date
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#C9A052]">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <input
                      type="date"
                      required
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      className="input-field pl-10"
                    />
                  </div>
                </div>
              )}

              {/* Passengers Selector */}
              <div>
                <label className="block text-xs font-semibold text-[#0F1420] uppercase tracking-wider mb-1.5">
                  Passengers
                </label>
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-xl bg-white">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#F5F2EC] flex items-center justify-center text-[#C9A052]">
                      <Users className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-[#0F1420] block">
                        {passengers} {passengers === 1 ? "Passenger" : "Passengers"}
                      </span>
                      <span className="text-[11px] text-[#888888]">
                        Full private cabin reserved
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handlePassengersChange(-1)}
                      disabled={passengers <= 1}
                      className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      aria-label="Decrease passenger count"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-semibold text-base w-6 text-center text-[#0F1420]">
                      {passengers}
                    </span>
                    <button
                      type="button"
                      onClick={() => handlePassengersChange(1)}
                      disabled={passengers >= 19}
                      className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      aria-label="Increase passenger count"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Flexibility Checkbox */}
              <div className="flex items-start gap-3 pt-1">
                <input
                  id="flexibleTime"
                  type="checkbox"
                  checked={flexibleTime}
                  onChange={(e) => setFlexibleTime(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-[#C9A052] focus:ring-[#C9A052] accent-[#C9A052]"
                />
                <label
                  htmlFor="flexibleTime"
                  className="text-xs text-[#555555] font-body leading-relaxed cursor-pointer"
                >
                  My departure time is flexible by ±2 hours. (Provides enhanced operator availability and optimal departure slots).
                </label>
              </div>

              {/* Form Bottom Row: Disclaimer & Submit Button */}
              <div className="pt-4 border-t border-[#E8E5DF] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="text-xs text-[#888888] font-body max-w-xs">
                  Private terminals · Direct rampside boarding · Zero dwell time
                </div>

                <button
                  type="submit"
                  className="btn-gold w-full sm:w-auto px-8 py-3.5 shadow-md flex items-center justify-center gap-2"
                >
                  <span>Search flights</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>

          {/* RIGHT: Destination Inspiration Card (40% / 5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl border border-[#E8E5DF] overflow-hidden shadow-lg group">
              {/* Image with overlay badge */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=800&fit=crop&q=80"
                  alt="Nice, Côte d'Azur"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1420]/90 via-[#0F1420]/30 to-transparent" />
                
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-white/90 backdrop-blur-md text-[#0F1420]">
                    Destination Inspiration
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-xs font-semibold text-[#E8D5A3] uppercase tracking-wider block">
                    French Riviera
                  </span>
                  <h3 className="font-display text-2xl font-bold text-white">
                    Nice, Côte d&apos;Azur
                  </h3>
                  <p className="text-xs text-gray-200 mt-1 line-clamp-2 font-body">
                    Direct apron transfer into Nice Côte d&apos;Azur (NCE). From private jet to the Mediterranean in under 15 minutes.
                  </p>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 bg-white space-y-4">
                <div className="grid grid-cols-2 gap-4 text-xs py-2 border-b border-gray-100">
                  <div>
                    <span className="text-[#888888] block">Est. Flight Time</span>
                    <span className="font-semibold text-[#0F1420]">2h 00m Nonstop</span>
                  </div>
                  <div>
                    <span className="text-[#888888] block">Popular Aircraft</span>
                    <span className="font-semibold text-[#0F1420]">Praetor 600</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    handleSelectQuickRoute(
                      "London Farnborough (FAB)",
                      "Nice Côte d'Azur (NCE)"
                    )
                  }
                  className="w-full py-2.5 px-4 rounded-xl border border-[#C9A052] text-[#C9A052] hover:bg-[#C9A052] hover:text-[#0F1420] text-xs font-semibold transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Select Route: London → Nice</span>
                </button>
              </div>
            </div>

            {/* Concierge Assurance Card */}
            <div className="bg-[#F5F2EC] rounded-2xl p-6 border border-[#E8E5DF]/60">
              <div className="flex items-center gap-3 mb-2">
                <ShieldCheck className="w-5 h-5 text-[#C9A052]" />
                <h4 className="font-display text-base font-bold text-[#0F1420]">
                  SKYVANTAGE Assurance
                </h4>
              </div>
              <p className="text-xs text-[#555555] font-body leading-relaxed">
                Every charter quote is backed by guaranteed operator standards, strict safety auditing, and direct ramp access at VIP terminals across 4,000+ global airfields.
              </p>
            </div>
          </div>
        </div>

        {/* 3 Feature Badges Below Form */}
        <div className="mt-14 pt-10 border-t border-[#E8E5DF] grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#0F1420] text-[#C9A052] flex items-center justify-center flex-shrink-0 shadow-sm">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-display text-lg font-bold text-[#0F1420] mb-1">
                Your schedule, not a timetable
              </h4>
              <p className="text-xs sm:text-sm text-[#555555] font-body leading-relaxed">
                Depart when ready. Board through private FBO terminals with 15-minute tarmac arrival and zero security lines.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#0F1420] text-[#C9A052] flex items-center justify-center flex-shrink-0 shadow-sm">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-display text-lg font-bold text-[#0F1420] mb-1">
                A cabin that is entirely yours
              </h4>
              <p className="text-xs sm:text-sm text-[#555555] font-body leading-relaxed">
                Uncompromising privacy, bespoke acoustic engineering, and tailored environments for business, family, or quiet contemplation.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#0F1420] text-[#C9A052] flex items-center justify-center flex-shrink-0 shadow-sm">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-display text-lg font-bold text-[#0F1420] mb-1">
                A personal touch, throughout
              </h4>
              <p className="text-xs sm:text-sm text-[#555555] font-body leading-relaxed">
                A dedicated charter concierge oversees catering, flight permits, customs pre-clearance, and seamless onward transit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
