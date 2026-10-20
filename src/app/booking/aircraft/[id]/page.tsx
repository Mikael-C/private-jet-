"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Users,
  Maximize2,
  Luggage,
  Compass,
  Check,
  Plane,
  Clock,
  Calendar,
  Wifi,
  Coffee,
  Shield,
  FileText,
  X,
  Sparkles,
} from "lucide-react";
import { useBooking } from "@/lib/bookingContext";
import { fleetData, Aircraft } from "@/data/fleet";
import { getAirportFBO } from "@/data/airports";
import JourneySidebar from "@/components/booking/JourneySidebar";

export default function AircraftDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { booking, updateBooking } = useBooking();

  const aircraftId = (params?.id as string) || "praetor-600";
  const aircraft: Aircraft =
    fleetData.find((a) => a.id === aircraftId) ||
    fleetData.find((a) => a.id === "praetor-600") ||
    fleetData[0];

  // Set selected aircraft in context if not yet set
  useEffect(() => {
    if (booking.selectedAircraftId !== aircraft.id) {
      updateBooking({ selectedAircraftId: aircraft.id });
    }
  }, [aircraft.id]);

  const [activeTab, setActiveTab] = useState<"overview" | "amenities" | "terms">(
    "overview"
  );
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

  const handleSelectAircraft = () => {
    updateBooking({ selectedAircraftId: aircraft.id });
    router.push("/booking/review");
  };

  // Gallery photos
  const photos = [
    aircraft.imageExterior,
    aircraft.imageInterior,
    ...(aircraft.imageGallery || []),
  ];

  // Route details
  const depTime = booking.departureTime || "10:00";
  const depDate = booking.departureDate || "18 Oct 2026";
  const fromCity = booking.from || "London Farnborough (FAB)";
  const toCity = booking.to || "Nice Côte d'Azur (NCE)";
  const duration = aircraft.illustrativeTrip.duration || "2h 00m";

  // Calculate an approximate arrival time based on duration (e.g. 2 hours)
  const calcArrivalTime = (start: string) => {
    try {
      const [h, m] = start.split(":").map(Number);
      const arrH = (h + 2) % 24;
      return `${String(arrH).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
    } catch {
      return "12:00";
    }
  };

  const arrTime = calcArrivalTime(depTime);
  const depFBO = getAirportFBO(fromCity);
  const arrFBO = getAirportFBO(toCity);

  return (
    <div className="w-full bg-white pb-24">
      {/* Top Navigation & Breadcrumb */}
      <div className="border-b border-[#E8E5DF] bg-[#F5F2EC]/40 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link
            href="/booking/results"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#0F1420] hover:text-[#C9A052] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#C9A052]" />
            <span>Back to aircraft categories</span>
          </Link>
          <span className="text-xs uppercase tracking-widest font-semibold text-[#C9A052]">
            {aircraft.categoryLabel}
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Aircraft Title Header */}
        <div className="mb-8">
          <span className="text-xs uppercase tracking-widest text-[#888888] font-medium block mb-1">
            {aircraft.manufacturer} Aviation
          </span>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F1420] tracking-tight">
            {aircraft.name}
          </h1>
          <p className="text-sm sm:text-base text-[#555555] font-body mt-2 max-w-3xl">
            {aircraft.tagline}
          </p>
        </div>

        {/* 2 Columns: LEFT (60%) + RIGHT (40% JourneySidebar) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT CONTENT (7 cols / 60%) */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-8">
            {/* Photo Gallery Grid */}
            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 rounded-3xl overflow-hidden border border-[#E8E5DF]">
                {/* Large Main Photo */}
                <div
                  onClick={() => {
                    setSelectedPhotoIndex(0);
                    setLightboxOpen(true);
                  }}
                  className="md:col-span-2 h-72 sm:h-96 relative group cursor-pointer overflow-hidden bg-gray-100"
                >
                  <img
                    src={photos[0]}
                    alt={`${aircraft.name} exterior`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                  <span className="absolute bottom-3 left-3 bg-[#0F1420]/80 backdrop-blur-sm text-white text-[11px] px-3 py-1 rounded-full font-medium">
                    Exterior view
                  </span>
                </div>

                {/* 2 Stacked Side Photos */}
                <div className="grid grid-cols-2 md:grid-cols-1 gap-3 h-auto md:h-96">
                  <div
                    onClick={() => {
                      setSelectedPhotoIndex(1);
                      setLightboxOpen(true);
                    }}
                    className="h-36 md:h-[186px] relative group cursor-pointer overflow-hidden bg-gray-100"
                  >
                    <img
                      src={photos[1] || photos[0]}
                      alt={`${aircraft.name} interior cabin`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                    <span className="absolute bottom-2 left-2 bg-[#0F1420]/80 backdrop-blur-sm text-white text-[10px] px-2.5 py-0.5 rounded-full font-medium">
                      Executive Cabin
                    </span>
                  </div>

                  <div
                    onClick={() => {
                      setSelectedPhotoIndex(2);
                      setLightboxOpen(true);
                    }}
                    className="h-36 md:h-[186px] relative group cursor-pointer overflow-hidden bg-gray-100"
                  >
                    <img
                      src={photos[2] || photos[0]}
                      alt={`${aircraft.name} details`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <button
                        type="button"
                        className="bg-white/90 text-[#0F1420] text-xs font-semibold px-4 py-2 rounded-xl shadow-md flex items-center gap-1.5"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>View all photos</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="border-b border-[#E8E5DF] flex items-center gap-8">
              {(
                [
                  { id: "overview", label: "Overview" },
                  { id: "amenities", label: "Cabin & amenities" },
                  { id: "terms", label: "Charter terms" },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-3 text-sm font-semibold transition-all relative ${
                    activeTab === tab.id
                      ? "text-[#0F1420]"
                      : "text-[#888888] hover:text-[#0F1420]"
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C9A052]" />
                  )}
                </button>
              ))}
            </div>

            {/* TAB CONTENT */}

            {/* TAB 1: OVERVIEW */}
            {activeTab === "overview" && (
              <div className="space-y-8">
                {/* 4 Stat Boxes */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-[#F5F2EC] rounded-2xl p-4 border border-[#E8E5DF]">
                    <div className="text-[#C9A052] mb-1">
                      <Users className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] uppercase tracking-wider text-[#888888] block">
                      Passengers
                    </span>
                    <span className="font-display text-lg font-bold text-[#0F1420] block">
                      {aircraft.passengersLabel}
                    </span>
                  </div>

                  <div className="bg-[#F5F2EC] rounded-2xl p-4 border border-[#E8E5DF]">
                    <div className="text-[#C9A052] mb-1">
                      <Maximize2 className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] uppercase tracking-wider text-[#888888] block">
                      Cabin Height
                    </span>
                    <span className="font-display text-lg font-bold text-[#0F1420] block">
                      {aircraft.cabinHeight}
                    </span>
                  </div>

                  <div className="bg-[#F5F2EC] rounded-2xl p-4 border border-[#E8E5DF]">
                    <div className="text-[#C9A052] mb-1">
                      <Luggage className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] uppercase tracking-wider text-[#888888] block">
                      Baggage
                    </span>
                    <span className="font-display text-lg font-bold text-[#0F1420] block">
                      {aircraft.baggageVolume}
                    </span>
                  </div>

                  <div className="bg-[#F5F2EC] rounded-2xl p-4 border border-[#E8E5DF]">
                    <div className="text-[#C9A052] mb-1">
                      <Compass className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] uppercase tracking-wider text-[#888888] block">
                      Range
                    </span>
                    <span className="font-display text-lg font-bold text-[#0F1420] block">
                      {aircraft.rangeLabel}
                    </span>
                  </div>
                </div>

                {/* Section: Room to make the journey your own */}
                <div className="bg-white rounded-2xl border border-[#E8E5DF] p-6 sm:p-8 space-y-4">
                  <h3 className="font-display text-xl font-bold text-[#0F1420]">
                    Room to make the journey your own
                  </h3>
                  <p className="text-sm text-[#555555] font-body leading-relaxed">
                    {aircraft.description}
                  </p>

                  <div className="pt-2">
                    <span className="text-xs uppercase font-semibold tracking-wider text-[#0F1420] block mb-3">
                      Selected Cabin Highlights
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {aircraft.amenities.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2.5 text-xs text-[#0F1420]">
                          <div className="w-4 h-4 rounded-full bg-[#C9A052]/20 flex items-center justify-center text-[#C9A052] flex-shrink-0">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Section: Your flight, at a glance */}
                <div className="bg-[#F5F2EC]/60 rounded-2xl border border-[#E8E5DF] p-6 sm:p-8 space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E8E5DF]">
                    <h3 className="font-display text-lg font-bold text-[#0F1420]">
                      Your flight, at a glance
                    </h3>
                    <span className="text-xs font-semibold text-[#C9A052] uppercase tracking-wider">
                      Confirmed Route Specs
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm font-body">
                    {/* Departure */}
                    <div className="space-y-1">
                      <span className="text-xs text-[#888888] uppercase block">
                        Departure
                      </span>
                      <div className="font-display text-lg font-bold text-[#0F1420]">
                        {depTime}
                      </div>
                      <div className="text-xs font-medium text-[#0F1420]">
                        {fromCity}
                      </div>
                      <div className="text-[11px] text-[#888888]">{depDate}</div>
                    </div>

                    {/* Flight Timeline */}
                    <div className="flex flex-col items-center justify-center space-y-1">
                      <span className="text-xs text-[#888888]">{duration}</span>
                      <div className="w-full flex items-center gap-2">
                        <div className="h-0.5 bg-[#C9A052] flex-1" />
                        <Plane className="w-4 h-4 text-[#C9A052]" />
                        <div className="h-0.5 bg-[#C9A052] flex-1" />
                      </div>
                      <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">
                        Nonstop Charter
                      </span>
                    </div>

                    {/* Arrival */}
                    <div className="space-y-1 sm:text-right">
                      <span className="text-xs text-[#888888] uppercase block">
                        Estimated Arrival
                      </span>
                      <div className="font-display text-lg font-bold text-[#0F1420]">
                        {arrTime}
                      </div>
                      <div className="text-xs font-medium text-[#0F1420]">
                        {toCity}
                      </div>
                      <div className="text-[11px] text-[#888888]">{depDate}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: CABIN & AMENITIES */}
            {activeTab === "amenities" && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl border border-[#E8E5DF] p-6 sm:p-8 space-y-6">
                  <div>
                    <h3 className="font-display text-xl font-bold text-[#0F1420] mb-2">
                      Cabin environment & inclusions
                    </h3>
                    <p className="text-sm text-[#555555] font-body">
                      Every detail of the {aircraft.name} cabin has been configured to maximize ergonomic comfort, quiet acoustic performance, and connectivity.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="p-4 rounded-xl border border-gray-100 bg-[#F5F2EC]/30 flex items-start gap-3">
                      <Wifi className="w-5 h-5 text-[#C9A052] flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-sm text-[#0F1420]">
                          High-Speed Connectivity
                        </h4>
                        <p className="text-xs text-[#555555] mt-0.5">
                          In-flight Wi-Fi for uninterrupted executive conferencing and streaming.
                        </p>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl border border-gray-100 bg-[#F5F2EC]/30 flex items-start gap-3">
                      <Coffee className="w-5 h-5 text-[#C9A052] flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-sm text-[#0F1420]">
                          Refreshment Suite
                        </h4>
                        <p className="text-xs text-[#555555] mt-0.5">
                          Equipped galley with espresso service, temperature-controlled wine, and artisan refreshments.
                        </p>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl border border-gray-100 bg-[#F5F2EC]/30 flex items-start gap-3">
                      <Maximize2 className="w-5 h-5 text-[#C9A052] flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-sm text-[#0F1420]">
                          Private Enclosed Lavatory
                        </h4>
                        <p className="text-xs text-[#555555] mt-0.5">
                          Dedicated private lavatory with vanity mirror and luxury amenities.
                        </p>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl border border-gray-100 bg-[#F5F2EC]/30 flex items-start gap-3">
                      <Shield className="w-5 h-5 text-[#C9A052] flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-sm text-[#0F1420]">
                          Fresh Air Circulation
                        </h4>
                        <p className="text-xs text-[#555555] mt-0.5">
                          100% fresh air cabin cycle every two minutes for low altitude fatigue.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Technical Dimensions Table */}
                  <div className="pt-4 border-t border-gray-100">
                    <h4 className="font-semibold text-xs uppercase tracking-wider text-[#0F1420] mb-3">
                      Interior Dimensions
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <span className="text-[#888888] block">Cabin Height</span>
                        <span className="font-semibold text-[#0F1420]">{aircraft.cabinHeight}</span>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <span className="text-[#888888] block">Cabin Width</span>
                        <span className="font-semibold text-[#0F1420]">{aircraft.cabinWidth}</span>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <span className="text-[#888888] block">Cruise Speed</span>
                        <span className="font-semibold text-[#0F1420]">{aircraft.cruiseSpeed}</span>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <span className="text-[#888888] block">Engines</span>
                        <span className="font-semibold text-[#0F1420] truncate">{aircraft.engines}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: CHARTER TERMS & FBOS */}
            {activeTab === "terms" && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl border border-[#E8E5DF] p-6 sm:p-8 space-y-6">
                  <div>
                    <h3 className="font-display text-xl font-bold text-[#0F1420] mb-2">
                      Transparent Charter Conditions
                    </h3>
                    <p className="text-sm text-[#555555] font-body">
                      Every charter adheres to vetted AOC safety certifications and guaranteed operational transparency.
                    </p>
                  </div>

                  {/* Fixed Base Operators (FBO) Details */}
                  <div className="space-y-4 pb-6 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-[#C9A052]" />
                      <h4 className="font-semibold text-xs uppercase tracking-wider text-[#0F1420]">
                        Assigned Fixed-Base Operators (VIP Terminals)
                      </h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-body">
                      {/* Departure FBO */}
                      <div className="p-4 rounded-xl bg-[#F5F2EC] border border-[#E8E5DF] space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-[#0F1420] text-xs">Departure FBO</span>
                          <span className="text-[10px] font-bold text-[#C9A052] uppercase">Private Ramp</span>
                        </div>
                        <p className="font-semibold text-[#0F1420] text-sm">{depFBO.name}</p>
                        <p className="text-gray-500 text-[11px]">{depFBO.address}</p>
                        <div className="pt-2 border-t border-[#E8E5DF] space-y-1 text-gray-700">
                          <div>
                            <span className="font-medium text-[#0F1420]">Direct Tel:</span>{" "}
                            <a href={`tel:${depFBO.phone}`} className="text-[#C9A052] font-semibold hover:underline">
                              {depFBO.phone}
                            </a>
                          </div>
                          <div>
                            <span className="font-medium text-[#0F1420]">Operations Email:</span>{" "}
                            <a href={`mailto:${depFBO.email}`} className="text-[#C9A052] font-semibold hover:underline">
                              {depFBO.email}
                            </a>
                          </div>
                          {depFBO.frequency && (
                            <div>
                              <span className="font-medium text-[#0F1420]">VHF Frequency:</span> {depFBO.frequency}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Arrival FBO */}
                      <div className="p-4 rounded-xl bg-[#F5F2EC] border border-[#E8E5DF] space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-[#0F1420] text-xs">Arrival FBO</span>
                          <span className="text-[10px] font-bold text-[#C9A052] uppercase">VIP Handling</span>
                        </div>
                        <p className="font-semibold text-[#0F1420] text-sm">{arrFBO.name}</p>
                        <p className="text-gray-500 text-[11px]">{arrFBO.address}</p>
                        <div className="pt-2 border-t border-[#E8E5DF] space-y-1 text-gray-700">
                          <div>
                            <span className="font-medium text-[#0F1420]">Direct Tel:</span>{" "}
                            <a href={`tel:${arrFBO.phone}`} className="text-[#C9A052] font-semibold hover:underline">
                              {arrFBO.phone}
                            </a>
                          </div>
                          <div>
                            <span className="font-medium text-[#0F1420]">Operations Email:</span>{" "}
                            <a href={`mailto:${arrFBO.email}`} className="text-[#C9A052] font-semibold hover:underline">
                              {arrFBO.email}
                            </a>
                          </div>
                          {arrFBO.frequency && (
                            <div>
                              <span className="font-medium text-[#0F1420]">VHF Frequency:</span> {arrFBO.frequency}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* What is included */}
                  <div className="space-y-3 pb-6 border-b border-gray-100">
                    <h4 className="font-semibold text-xs uppercase tracking-wider text-[#0F1420]">
                      What is included in your charter:
                    </h4>
                    <ul className="space-y-2 text-xs text-[#555555]">
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#C9A052] flex-shrink-0 mt-0.5" />
                        <span>Exclusive charter of the entire aircraft in this category with 2 type-rated Captains.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#C9A052] flex-shrink-0 mt-0.5" />
                        <span>High-speed onboard connectivity and premium bar/refreshment service.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#C9A052] flex-shrink-0 mt-0.5" />
                        <span>VIP private lounge terminal access with discrete tarmac vehicle boarding.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#C9A052] flex-shrink-0 mt-0.5" />
                        <span>All aviation landing fees, navigation charges, passenger fees, and local airport taxes.</span>
                      </li>
                    </ul>
                  </div>

                  {/* Cancellation Policy */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-xs uppercase tracking-wider text-[#0F1420]">
                      Updated Cancellation &amp; Changes Policy
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                      <div className="p-3.5 bg-emerald-50 border border-emerald-100 rounded-xl">
                        <span className="font-bold text-emerald-900 block mb-1">
                          7+ Days Prior
                        </span>
                        <p className="text-emerald-700 leading-snug">
                          100% full charter refund (less $500 flight concierge connection fee).
                        </p>
                      </div>
                      <div className="p-3.5 bg-blue-50 border border-blue-100 rounded-xl">
                        <span className="font-bold text-blue-900 block mb-1">
                          72h to 7 Days
                        </span>
                        <p className="text-blue-700 leading-snug">
                          80% refund or 100% credit toward rescheduled charter within 12 months.
                        </p>
                      </div>
                      <div className="p-3.5 bg-amber-50 border border-amber-100 rounded-xl">
                        <span className="font-bold text-amber-900 block mb-1">
                          24h to 72 Hours
                        </span>
                        <p className="text-amber-700 leading-snug">
                          50% charter refund. Balance released immediately.
                        </p>
                      </div>
                      <div className="p-3.5 bg-rose-50 border border-rose-100 rounded-xl">
                        <span className="font-bold text-rose-900 block mb-1">
                          Under 24 Hours
                        </span>
                        <p className="text-rose-700 leading-snug">
                          Non-refundable once aircraft has repositioned or crew has mobilized.
                        </p>
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-[11px] text-gray-600">
                      <strong>Guaranteed Weather &amp; Mechanical Protection:</strong> If your flight cannot operate safely due to severe weather or mechanical maintenance, we immediately deploy a substitute category aircraft or issue a 100% full refund with zero fees.
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT SIDEBAR (5 cols / 40%) */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-4">
            <JourneySidebar />

            {/* Select This Category Button */}
            <div className="bg-white rounded-2xl border border-[#E8E5DF] p-5 shadow-sm space-y-3">
              <button
                type="button"
                onClick={handleSelectAircraft}
                className="btn-gold w-full py-4 text-sm font-bold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
              >
                <span>Select this category</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-[11px] text-center text-[#888888]">
                No payment charged at this step · Proceed to trip review
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Photo Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex flex-col justify-between p-4 sm:p-8 backdrop-blur-md">
          <div className="flex justify-between items-center text-white pb-4">
            <span className="text-xs uppercase tracking-widest text-[#C9A052] font-semibold">
              {aircraft.name} — Photo {selectedPhotoIndex + 1} of {photos.length}
            </span>
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="p-2 text-white hover:text-[#C9A052] transition-colors"
            >
              <X className="w-7 h-7" />
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center max-h-[75vh]">
            <img
              src={photos[selectedPhotoIndex]}
              alt="Enlarged view"
              className="max-h-full max-w-full object-contain rounded-xl shadow-2xl"
            />
          </div>

          {/* Thumbnail Strip */}
          <div className="flex justify-center gap-3 pt-4 overflow-x-auto">
            {photos.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedPhotoIndex(idx)}
                className={`w-20 h-14 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                  selectedPhotoIndex === idx
                    ? "border-[#C9A052] scale-105"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <img src={p} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
