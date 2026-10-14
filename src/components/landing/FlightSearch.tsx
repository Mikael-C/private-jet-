"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  PlaneTakeoff,
  PlaneLanding,
  Calendar,
  Users,
  Clock,
  Lock,
  Headphones,
  ArrowUpRight,
} from "lucide-react";

type TripType = "one-way" | "round-trip" | "multi-city";

export default function FlightSearch() {
  const router = useRouter();
  const [tripType, setTripType] = useState<TripType>("one-way");
  const [fromLocation, setFromLocation] = useState("London Farnborough (FAB)");
  const [toLocation, setToLocation] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [passengers, setPassengers] = useState("2");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({
      tripType,
      from: fromLocation,
      to: toLocation || "Nice (NCE)",
      date: departureDate || new Date().toISOString().split("T")[0],
      passengers: passengers || "2",
    });
    router.push(`/booking?${params.toString()}`);
  };

  return (
    <section className="bg-white py-16 md:py-24 px-6 md:px-12 lg:px-20 border-b border-gray-100">
      <div className="max-w-7xl mx-auto">
        {/* Header & Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <h2 className="heading-md font-display text-[#0F1420]">
              Where will you fly next?
            </h2>
          </div>

          {/* Trip Type Tabs */}
          <div className="inline-flex p-1 rounded-full bg-[#F5F2EC] border border-[#E0DAD0]/60 self-start md:self-auto">
            <button
              type="button"
              onClick={() => setTripType("one-way")}
              className={`px-5 py-2 rounded-full text-xs font-medium font-body transition-all ${
                tripType === "one-way"
                  ? "bg-[#0F1420] text-white shadow-sm"
                  : "text-gray-600 hover:text-[#0F1420]"
              }`}
            >
              One way
            </button>
            <button
              type="button"
              onClick={() => setTripType("round-trip")}
              className={`px-5 py-2 rounded-full text-xs font-medium font-body transition-all ${
                tripType === "round-trip"
                  ? "bg-[#0F1420] text-white shadow-sm"
                  : "text-gray-600 hover:text-[#0F1420]"
              }`}
            >
              Round trip
            </button>
            <button
              type="button"
              onClick={() => setTripType("multi-city")}
              className={`px-5 py-2 rounded-full text-xs font-medium font-body transition-all ${
                tripType === "multi-city"
                  ? "bg-[#0F1420] text-white shadow-sm"
                  : "text-gray-600 hover:text-[#0F1420]"
              }`}
            >
              Multi-city
            </button>
          </div>
        </div>

        {/* Search Form Card */}
        <div className="bg-[#F5F2EC]/60 rounded-2xl p-6 md:p-8 border border-[#E0DAD0] shadow-sm">
          <form onSubmit={handleSearch}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-3 items-end">
              {/* FROM */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-body uppercase tracking-wider text-gray-500 font-semibold block">
                  From
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <PlaneTakeoff className="w-4 h-4 text-gold" />
                  </div>
                  <input
                    type="text"
                    value={fromLocation}
                    onChange={(e) => setFromLocation(e.target.value)}
                    placeholder="Departure airport / city"
                    className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-3.5 text-sm font-body text-gray-900 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
                  />
                </div>
              </div>

              {/* TO */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-body uppercase tracking-wider text-gray-500 font-semibold block">
                  To
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <PlaneLanding className="w-4 h-4 text-gold" />
                  </div>
                  <input
                    type="text"
                    value={toLocation}
                    onChange={(e) => setToLocation(e.target.value)}
                    placeholder="Where would you like to go?"
                    className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-3.5 text-sm font-body text-gray-900 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
                  />
                </div>
              </div>

              {/* DEPARTURE */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-body uppercase tracking-wider text-gray-500 font-semibold block">
                  Departure date
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <Calendar className="w-4 h-4 text-gold" />
                  </div>
                  <input
                    type="date"
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-3.5 text-sm font-body text-gray-900 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
                  />
                </div>
              </div>

              {/* PASSENGERS */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-body uppercase tracking-wider text-gray-500 font-semibold block">
                  Passengers
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <Users className="w-4 h-4 text-gold" />
                  </div>
                  <input
                    type="number"
                    min="1"
                    max="19"
                    value={passengers}
                    onChange={(e) => setPassengers(e.target.value)}
                    placeholder="Guests"
                    className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-3.5 text-sm font-body text-gray-900 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
                  />
                </div>
              </div>

              {/* SUBMIT BUTTON */}
              <div>
                <button
                  type="submit"
                  className="btn-gold w-full h-[50px] flex items-center justify-center gap-2 group text-sm font-semibold rounded-xl"
                >
                  <span>Search flights</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>
            </div>

            {/* Sub-bar */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 mt-6 pt-5 border-t border-[#E0DAD0]/70 text-xs font-body text-gray-500">
              <p>
                Explore charter options. Your concierge will confirm aircraft, availability and a tailored quote.
              </p>
              <a
                href="https://wa.me/447010452726"
                target="_blank"
                rel="noopener noreferrer"
                className="link-arrow font-medium text-[#0F1420] hover:text-gold transition-colors whitespace-nowrap"
              >
                <span>Prefer a personal touch? Speak to us</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-gold" />
              </a>
            </div>
          </form>
        </div>

        {/* 3 Icon Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-4">
          <div className="flex items-center gap-3.5 p-4 rounded-xl bg-white border border-gray-100 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-[#F5F2EC] flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5 text-gold" />
            </div>
            <span className="text-sm font-medium font-body text-gray-900">
              Your schedule, not a timetable
            </span>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-xl bg-white border border-gray-100 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-[#F5F2EC] flex items-center justify-center flex-shrink-0">
              <Lock className="w-5 h-5 text-gold" />
            </div>
            <span className="text-sm font-medium font-body text-gray-900">
              A cabin that is entirely yours
            </span>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-xl bg-white border border-gray-100 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-[#F5F2EC] flex items-center justify-center flex-shrink-0">
              <Headphones className="w-5 h-5 text-gold" />
            </div>
            <span className="text-sm font-medium font-body text-gray-900">
              One dedicated point of contact
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
