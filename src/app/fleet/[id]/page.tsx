"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  Users,
  Compass,
  Luggage,
  Maximize2,
  Check,
  X,
  MessageCircle,
  Shield,
  Clock,
  Sparkles,
  Plane,
  Gauge,
  Fuel,
} from "lucide-react";
import { fleetData, Aircraft } from "@/data/fleet";

export default function AircraftDetailPage() {
  const params = useParams();
  const router = useRouter();
  const aircraftId = params?.id as string;

  const [activeTab, setActiveTab] = useState<"overview" | "cabin" | "terms">("overview");
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const aircraft = fleetData.find((a: Aircraft) => a.id === aircraftId);

  if (!aircraft) {
    return (
      <div className="min-h-screen bg-[#F5F2EC] flex items-center justify-center px-6 py-32">
        <div className="card max-w-md p-10 text-center bg-white">
          <Plane className="w-12 h-12 text-[#C9A052] mx-auto mb-4" />
          <h1 className="heading-md text-[#0F1420] mb-3">Aircraft not found</h1>
          <p className="text-gray-600 font-body mb-8">
            The aircraft you are looking for could not be found or may have been updated.
          </p>
          <Link href="/fleet" className="btn-primary inline-flex justify-center">
            ← Back to fleet collection
          </Link>
        </div>
      </div>
    );
  }

  const allPhotos = [
    aircraft.imageExterior,
    aircraft.imageInterior,
    ...aircraft.imageGallery,
  ].filter((src, idx, arr) => arr.indexOf(src) === idx);

  const handleBookNow = () => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("selected_aircraft_id", aircraft.id);
    }
    router.push("/booking");
  };

  const whatsappMessage = encodeURIComponent(
    `Hi, I'm interested in chartering the ${aircraft.name} (${aircraft.categoryLabel}). Could you provide availability and a bespoke quote?`
  );
  const whatsappUrl = `https://wa.me/447010452726?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen bg-white">
      {/* Top Header Bar */}
      <section className="bg-[#F5F2EC] pt-32 pb-12 md:pt-36 md:pb-16 px-6 md:px-12 lg:px-20 border-b border-[#E8E5DF]">
        <div className="max-w-7xl mx-auto">
          {/* Back link */}
          <Link
            href="/fleet"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-gray-600 hover:text-[#0F1420] mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#C9A052]" />
            Back to fleet
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#C9A052] block mb-2 font-body">
                — {aircraft.categoryLabel}
              </span>
              <h1 className="heading-lg text-[#0F1420] mb-3">{aircraft.name}</h1>
              <p className="text-lg md:text-xl text-gray-700 font-body font-light max-w-2xl">
                {aircraft.tagline}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-white text-[#0F1420] border border-gray-200 shadow-sm font-body">
                {aircraft.manufacturer}
              </span>
              <span className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-[#0F1420] text-white font-body">
                {aircraft.travelType}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content & Sidebar Container */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16">
        {/* Photo Section: 60% main + 40% stacked thumbnails */}
        <div className="mb-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-[380px] md:h-[480px]">
            {/* Large Main Photo (approx 60% width -> 7 cols) */}
            <div className="lg:col-span-7 relative h-full rounded-2xl overflow-hidden bg-gray-100 group">
              <img
                src={aircraft.imageExterior}
                alt={`${aircraft.name} exterior`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 cursor-pointer"
                onClick={() => setSelectedPhotoIndex(0)}
              />
              <div className="absolute top-4 left-4 bg-[#0F1420]/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-white">
                Exterior View
              </div>
            </div>

            {/* Stacked Thumbnails (approx 40% width -> 5 cols) */}
            <div className="lg:col-span-5 grid grid-rows-2 gap-4 h-full">
              <div className="relative h-full rounded-2xl overflow-hidden bg-gray-100 group">
                <img
                  src={aircraft.imageInterior}
                  alt={`${aircraft.name} interior`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 cursor-pointer"
                  onClick={() => setSelectedPhotoIndex(1)}
                />
                <div className="absolute top-4 left-4 bg-[#0F1420]/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-white">
                  Cabin Interior
                </div>
              </div>

              <div className="relative h-full rounded-2xl overflow-hidden bg-gray-100 group">
                <img
                  src={aircraft.imageGallery[0] || aircraft.imageInterior}
                  alt={`${aircraft.name} detail`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 cursor-pointer"
                  onClick={() => setSelectedPhotoIndex(2)}
                />
                {/* View All Photos Button */}
                <button
                  onClick={() => setSelectedPhotoIndex(0)}
                  className="absolute bottom-4 right-4 bg-white/95 hover:bg-white text-[#0F1420] text-xs font-semibold px-4 py-2.5 rounded-full shadow-lg backdrop-blur-sm flex items-center gap-2 transition-all hover:scale-105"
                >
                  <Maximize2 className="w-3.5 h-3.5 text-[#C9A052]" />
                  View all photos ({allPhotos.length})
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 2 Columns: LEFT (65%) + RIGHT Booking Sidebar (35%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* LEFT CONTENT (approx 65% -> 8 cols) */}
          <div className="lg:col-span-8">
            {/* Navigation Tabs */}
            <div className="flex border-b border-gray-200 mb-10 gap-2">
              <button
                onClick={() => setActiveTab("overview")}
                className={`pb-4 px-2 text-sm md:text-base font-semibold font-body transition-all relative ${
                  activeTab === "overview"
                    ? "text-[#0F1420]"
                    : "text-gray-400 hover:text-gray-700"
                }`}
              >
                Overview
                {activeTab === "overview" && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C9A052]" />
                )}
              </button>

              <button
                onClick={() => setActiveTab("cabin")}
                className={`pb-4 px-2 text-sm md:text-base font-semibold font-body transition-all relative ${
                  activeTab === "cabin"
                    ? "text-[#0F1420]"
                    : "text-gray-400 hover:text-gray-700"
                }`}
              >
                Cabin & amenities
                {activeTab === "cabin" && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C9A052]" />
                )}
              </button>

              <button
                onClick={() => setActiveTab("terms")}
                className={`pb-4 px-2 text-sm md:text-base font-semibold font-body transition-all relative ${
                  activeTab === "terms"
                    ? "text-[#0F1420]"
                    : "text-gray-400 hover:text-gray-700"
                }`}
              >
                Charter terms
                {activeTab === "terms" && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C9A052]" />
                )}
              </button>
            </div>

            {/* TAB 1: OVERVIEW */}
            {activeTab === "overview" && (
              <div className="space-y-12">
                {/* 4 Stat Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-[#F5F2EC] rounded-2xl p-5 border border-[#E8E5DF] text-center">
                    <Users className="w-5 h-5 text-[#C9A052] mx-auto mb-2" />
                    <span className="text-xs uppercase tracking-wider text-gray-500 font-body block mb-1">
                      Passengers
                    </span>
                    <span className="font-display text-xl font-bold text-[#0F1420]">
                      {aircraft.passengersLabel}
                    </span>
                  </div>

                  <div className="bg-[#F5F2EC] rounded-2xl p-5 border border-[#E8E5DF] text-center">
                    <Maximize2 className="w-5 h-5 text-[#C9A052] mx-auto mb-2" />
                    <span className="text-xs uppercase tracking-wider text-gray-500 font-body block mb-1">
                      Cabin Height
                    </span>
                    <span className="font-display text-xl font-bold text-[#0F1420]">
                      {aircraft.cabinHeight}
                    </span>
                  </div>

                  <div className="bg-[#F5F2EC] rounded-2xl p-5 border border-[#E8E5DF] text-center">
                    <Luggage className="w-5 h-5 text-[#C9A052] mx-auto mb-2" />
                    <span className="text-xs uppercase tracking-wider text-gray-500 font-body block mb-1">
                      Baggage
                    </span>
                    <span className="font-display text-xl font-bold text-[#0F1420]">
                      {aircraft.baggageVolume}
                    </span>
                  </div>

                  <div className="bg-[#F5F2EC] rounded-2xl p-5 border border-[#E8E5DF] text-center">
                    <Compass className="w-5 h-5 text-[#C9A052] mx-auto mb-2" />
                    <span className="text-xs uppercase tracking-wider text-gray-500 font-body block mb-1">
                      Range
                    </span>
                    <span className="font-display text-xl font-bold text-[#0F1420]">
                      {aircraft.rangeLabel}
                    </span>
                  </div>
                </div>

                {/* About section */}
                <div>
                  <h3 className="heading-md text-[#0F1420] mb-4">
                    About this aircraft
                  </h3>
                  <p className="text-gray-700 leading-relaxed font-body text-base md:text-lg mb-6">
                    {aircraft.description}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Gauge className="w-4 h-4 text-[#C9A052]" />
                      <span>Cruise Speed: <strong>{aircraft.cruiseSpeed}</strong></span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Fuel className="w-4 h-4 text-[#C9A052]" />
                      <span>Engines: <strong>{aircraft.engines}</strong></span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4 text-[#C9A052]" />
                      <span>Introduced: <strong>{aircraft.yearIntroduced}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Amenities with Checkmarks */}
                <div>
                  <h3 className="heading-md text-[#0F1420] mb-6">
                    Cabin amenities & features
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {aircraft.amenities.map((amenity, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100"
                      >
                        <div className="w-5 h-5 rounded-full bg-[#C9A052]/20 flex items-center justify-center text-[#C9A052] shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-sm font-medium text-[#0F1420] font-body">
                          {amenity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ideal for & Highlights */}
                <div className="bg-[#F5F2EC] rounded-2xl p-8 border border-[#E8E5DF]">
                  <h4 className="font-display text-xl font-bold text-[#0F1420] mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#C9A052]" />
                    Ideal for your journey
                  </h4>
                  <p className="text-gray-700 font-body mb-6 leading-relaxed">
                    {aircraft.idealFor}
                  </p>
                  <div className="space-y-2.5">
                    {aircraft.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-sm text-gray-700 font-body">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C9A052]" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: CABIN & AMENITIES */}
            {activeTab === "cabin" && (
              <div className="space-y-10">
                <div>
                  <h3 className="heading-md text-[#0F1420] mb-4">
                    Cabin dimensions & specifications
                  </h3>
                  <p className="text-gray-600 mb-6 font-body">
                    Engineered for refined comfort, quiet productivity and restful sleep.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-5 rounded-xl border border-gray-200 bg-white">
                      <span className="text-xs uppercase tracking-wider text-gray-500 font-body block mb-1">
                        Cabin Height
                      </span>
                      <span className="text-lg font-bold text-[#0F1420]">
                        {aircraft.cabinHeight}
                      </span>
                    </div>

                    <div className="p-5 rounded-xl border border-gray-200 bg-white">
                      <span className="text-xs uppercase tracking-wider text-gray-500 font-body block mb-1">
                        Cabin Width
                      </span>
                      <span className="text-lg font-bold text-[#0F1420]">
                        {aircraft.cabinWidth}
                      </span>
                    </div>

                    <div className="p-5 rounded-xl border border-gray-200 bg-white">
                      <span className="text-xs uppercase tracking-wider text-gray-500 font-body block mb-1">
                        Baggage Volume
                      </span>
                      <span className="text-lg font-bold text-[#0F1420]">
                        {aircraft.baggageVolume}
                      </span>
                    </div>

                    <div className="p-5 rounded-xl border border-gray-200 bg-white">
                      <span className="text-xs uppercase tracking-wider text-gray-500 font-body block mb-1">
                        High Cruise Speed
                      </span>
                      <span className="text-lg font-bold text-[#0F1420]">
                        {aircraft.cruiseSpeed}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-display text-2xl font-bold text-[#0F1420] mb-4">
                    Onboard experience
                  </h4>
                  <div className="space-y-4">
                    <div className="p-5 rounded-2xl bg-[#F5F2EC] border border-[#E8E5DF]">
                      <h5 className="font-semibold text-[#0F1420] mb-1 font-body">
                        Refined Acoustic Engineering
                      </h5>
                      <p className="text-sm text-gray-600 font-body leading-relaxed">
                        Whisper-quiet cabin technology allows for effortless conversation, crystal-clear business conference calls, or undisturbed rest during transit.
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-[#F5F2EC] border border-[#E8E5DF]">
                      <h5 className="font-semibold text-[#0F1420] mb-1 font-body">
                        In-Flight Connectivity & Entertainment
                      </h5>
                      <p className="text-sm text-gray-600 font-body leading-relaxed">
                        High-speed satellite connectivity, international streaming capabilities, and universal power outlets at every passenger seat.
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-[#F5F2EC] border border-[#E8E5DF]">
                      <h5 className="font-semibold text-[#0F1420] mb-1 font-body">
                        Curated Catering Facilities
                      </h5>
                      <p className="text-sm text-gray-600 font-body leading-relaxed">
                        Dedicated refreshment gallery with espresso machine, chilled champagne storage, and custom gourmet catering tailored to your exact dietary preferences.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: CHARTER TERMS */}
            {activeTab === "terms" && (
              <div className="space-y-8">
                <div>
                  <h3 className="heading-md text-[#0F1420] mb-4">
                    Charter terms & inclusions
                  </h3>
                  <p className="text-gray-600 mb-8 font-body">
                    Complete transparency with zero hidden surprises. Every charter flight booked through SKYVANTAGE includes all core operational elements.
                  </p>
                </div>

                {/* Included vs Not Included */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Included */}
                  <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-200">
                    <div className="flex items-center gap-2 mb-4 text-emerald-800">
                      <Check className="w-5 h-5 text-emerald-600" />
                      <h4 className="font-display text-lg font-bold">What is included</h4>
                    </div>
                    <ul className="space-y-3 text-sm text-gray-700 font-body">
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Dedicated aircraft and qualified two-pilot crew</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Standard refreshments, wines, beers, and soft drinks</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>All VIP airport handling & FBO private terminal access</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Aviation fuel, landing fees, navigational and airport taxes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>24/7 dedicated flight operations monitoring & concierge support</span>
                      </li>
                    </ul>
                  </div>

                  {/* Not Included */}
                  <div className="p-6 rounded-2xl bg-amber-50/50 border border-amber-200">
                    <div className="flex items-center gap-2 mb-4 text-amber-900">
                      <X className="w-5 h-5 text-amber-600" />
                      <h4 className="font-display text-lg font-bold">Optional extras & exclusions</h4>
                    </div>
                    <ul className="space-y-3 text-sm text-gray-700 font-body">
                      <li className="flex items-start gap-2">
                        <span className="w-4 h-4 rounded-full border border-amber-400 flex items-center justify-center text-[10px] text-amber-700 shrink-0 mt-0.5">+</span>
                        <span>Bespoke Michelin-calibre catering and vintage wine upgrades</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-4 h-4 rounded-full border border-amber-400 flex items-center justify-center text-[10px] text-amber-700 shrink-0 mt-0.5">+</span>
                        <span>Chauffeured tarmac and city ground transfers</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-4 h-4 rounded-full border border-amber-400 flex items-center justify-center text-[10px] text-amber-700 shrink-0 mt-0.5">+</span>
                        <span>De-icing fees (if applicable in adverse winter conditions, billed at cost)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-4 h-4 rounded-full border border-amber-400 flex items-center justify-center text-[10px] text-amber-700 shrink-0 mt-0.5">+</span>
                        <span>Special helicopter airport-to-resort transfers</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Cancellation Policy */}
                <div className="p-6 rounded-2xl bg-[#F5F2EC] border border-[#E8E5DF]">
                  <div className="flex items-center gap-2 mb-4 text-[#0F1420]">
                    <Shield className="w-5 h-5 text-[#C9A052]" />
                    <h4 className="font-display text-lg font-bold">Cancellation policy</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-white border border-gray-200">
                      <span className="text-xs uppercase font-semibold text-emerald-600 block mb-1">
                        More than 7 days
                      </span>
                      <p className="text-sm font-bold text-[#0F1420] mb-1">Full refund</p>
                      <p className="text-xs text-gray-500">Free cancellation with 100% refund of charter fees.</p>
                    </div>

                    <div className="p-4 rounded-xl bg-white border border-gray-200">
                      <span className="text-xs uppercase font-semibold text-amber-600 block mb-1">
                        3 to 7 days before
                      </span>
                      <p className="text-sm font-bold text-[#0F1420] mb-1">50% charter fee</p>
                      <p className="text-xs text-gray-500">50% refund or credit applied to rescheduled itinerary.</p>
                    </div>

                    <div className="p-4 rounded-xl bg-white border border-gray-200">
                      <span className="text-xs uppercase font-semibold text-rose-600 block mb-1">
                        Under 48 hours
                      </span>
                      <p className="text-sm font-bold text-[#0F1420] mb-1">100% charter fee</p>
                      <p className="text-xs text-gray-500">Full charter fee applies due to aircraft positioning costs.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT BOOKING SIDEBAR (approx 35% -> 4 cols) */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              {/* Main Booking Card */}
              <div className="card p-7 border-gray-200 bg-white">
                <div className="border-b border-gray-100 pb-5 mb-5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#C9A052] block mb-1">
                    {aircraft.categoryLabel}
                  </span>
                  <h3 className="font-display text-2xl font-bold text-[#0F1420]">
                    {aircraft.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Operated by certified EASA/FAA AOC operators
                  </p>
                </div>

                {/* Price Section */}
                <div className="space-y-4 mb-6">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-gray-500 font-medium block mb-1">
                      Your illustrative price
                    </span>
                    <div className="font-display text-3xl font-bold text-[#0F1420]">
                      £{aircraft.pricePerHour.toLocaleString()}
                      <span className="font-body text-xs font-normal text-gray-500 ml-2">
                        per hour
                      </span>
                    </div>
                  </div>

                  {/* Illustrative Route Trip */}
                  <div className="p-4 rounded-xl bg-[#F5F2EC] border border-[#E8E5DF]">
                    <span className="text-xs text-gray-600 block mb-1">
                      Charter {aircraft.illustrativeTrip.route} (illustrative):
                    </span>
                    <div className="flex items-center justify-between">
                      <span className="font-display text-xl font-bold text-[#0F1420]">
                        £{aircraft.illustrativeTrip.price.toLocaleString()}
                      </span>
                      <span className="text-xs text-gray-500 font-body">
                        ~{aircraft.illustrativeTrip.duration}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Booking Button */}
                <button
                  onClick={handleBookNow}
                  className="btn-primary w-full justify-center text-sm py-4 mb-3 font-semibold shadow-md"
                >
                  Book this aircraft
                </button>

                {/* WhatsApp Concierge link */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline-dark w-full justify-center text-xs py-3 group"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>Speak to a concierge</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>

              {/* Dark Card: Questions */}
              <div className="rounded-2xl p-6 bg-[#0F1420] text-white">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-[#C9A052]/20 flex items-center justify-center text-[#C9A052] shrink-0">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-display text-base font-bold text-white mb-1">
                      Questions about this aircraft?
                    </h4>
                    <p className="text-xs text-gray-300 font-body leading-relaxed">
                      Your concierge is here to help with range requirements, custom routes, and baggage capacity.
                    </p>
                  </div>
                </div>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-full text-xs font-semibold bg-[#C9A052] text-[#0F1420] hover:bg-[#b8912e] transition-colors mt-2"
                >
                  <span>Chat on WhatsApp</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Photo Modal */}
      {selectedPhotoIndex !== null && (
        <div className="fixed inset-0 z-50 bg-[#0F1420]/95 backdrop-blur-md flex flex-col items-center justify-center p-4">
          <button
            onClick={() => setSelectedPhotoIndex(null)}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="max-w-5xl w-full max-h-[80vh] flex items-center justify-center">
            <img
              src={allPhotos[selectedPhotoIndex]}
              alt={`${aircraft.name} view ${selectedPhotoIndex + 1}`}
              className="max-h-[75vh] w-auto object-contain rounded-xl shadow-2xl"
            />
          </div>

          {/* Thumbnails row */}
          <div className="flex items-center gap-3 mt-6 overflow-x-auto max-w-full p-2">
            {allPhotos.map((photo, index) => (
              <button
                key={index}
                onClick={() => setSelectedPhotoIndex(index)}
                className={`relative w-16 h-12 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                  selectedPhotoIndex === index
                    ? "border-[#C9A052] scale-105"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <img
                  src={photo}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
