"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Plane,
  Clock,
  Calendar,
  Users,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  FileCheck,
} from "lucide-react";
import { useBooking } from "@/lib/bookingContext";
import { fleetData, Aircraft } from "@/data/fleet";
import { getAirportFBO } from "@/data/airports";
import JourneySidebar from "@/components/booking/JourneySidebar";

export default function TripReviewPage() {
  const router = useRouter();
  const { booking, updateBooking } = useBooking();

  const [reviewed, setReviewed] = useState(booking.reviewConfirmed || false);

  const selectedAircraft: Aircraft =
    fleetData.find((a) => a.id === booking.selectedAircraftId) ||
    fleetData.find((a) => a.id === "praetor-600") ||
    fleetData[0];

  const fromCity = booking.from || "London Farnborough (FAB)";
  const toCity = booking.to || "Nice Côte d'Azur (NCE)";
  const depDate = booking.departureDate || "18 Oct 2026";
  const depTime = booking.departureTime || "10:00";
  const duration = selectedAircraft.illustrativeTrip.duration || "2h 00m";
  const tripTypeLabel =
    booking.tripType === "round-trip"
      ? "Round trip"
      : booking.tripType === "multi-city"
      ? "Multi-city"
      : "One way";

  // Calculate approximate arrival time
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

  const handleContinue = () => {
    if (!reviewed) return;
    updateBooking({ reviewConfirmed: true });
    router.push("/booking/passengers");
  };

  return (
    <div className="w-full bg-white pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Header Section */}
        <div className="mb-8">
          <span className="section-label">
            — EVERY DETAIL, CONSIDERED
          </span>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F1420] tracking-tight">
            Take a moment. Review your journey.
          </h1>
          <p className="text-sm sm:text-base text-[#555555] font-body mt-2 max-w-2xl">
            Your itinerary, your aircraft and a transparent breakdown — all in one place.
          </p>
        </div>

        {/* 2 Columns: LEFT (60%) + RIGHT JourneySidebar (40%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT CONTENT (7 cols / 60%) */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6">
            {/* CARD 1: Your itinerary */}
            <div className="bg-white rounded-3xl border border-[#E8E5DF] p-6 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between pb-5 border-b border-[#E8E5DF]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#F5F2EC] flex items-center justify-center text-[#C9A052]">
                    <Plane className="w-4 h-4" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-[#0F1420]">
                    Your itinerary
                  </h3>
                </div>
                <Link
                  href="/booking"
                  className="text-xs font-semibold text-[#C9A052] hover:text-[#9A7A35] underline transition-colors"
                >
                  Edit itinerary
                </Link>
              </div>

              {/* Itinerary details */}
              <div className="py-6 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm font-body">
                  <div>
                    <span className="text-xs text-[#888888] uppercase tracking-wider block mb-1">
                      Departure
                    </span>
                    <span className="font-display text-xl font-bold text-[#0F1420] block">
                      {depTime}
                    </span>
                    <span className="font-semibold text-sm text-[#0F1420] block mt-0.5">
                      {fromCity}
                    </span>
                    <span className="text-xs text-[#888888]">{depDate}</span>
                  </div>

                  <div className="flex flex-col items-center justify-center space-y-1 py-2 sm:py-0">
                    <span className="text-xs text-[#888888]">{duration} nonstop</span>
                    <div className="w-full flex items-center gap-2">
                      <div className="h-0.5 bg-[#C9A052] flex-1" />
                      <Plane className="w-4 h-4 text-[#C9A052]" />
                      <div className="h-0.5 bg-[#C9A052] flex-1" />
                    </div>
                    <span className="text-[11px] font-semibold text-[#C9A052] bg-[#F5F2EC] px-2.5 py-0.5 rounded-full">
                      {tripTypeLabel}
                    </span>
                  </div>

                  <div className="sm:text-right">
                    <span className="text-xs text-[#888888] uppercase tracking-wider block mb-1">
                      Arrival
                    </span>
                    <span className="font-display text-xl font-bold text-[#0F1420] block">
                      {arrTime}
                    </span>
                    <span className="font-semibold text-sm text-[#0F1420] block mt-0.5">
                      {toCity}
                    </span>
                    <span className="text-xs text-[#888888]">{depDate}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex flex-wrap gap-4 text-xs text-[#555555]">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#C9A052]" />
                    <span>Flight date: {depDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#C9A052]" />
                    <span>Travelers: {booking.passengers} Adults</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#C9A052]" />
                    <span>Check-in: 15 minutes before departure</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CARD 2: Your selected aircraft category */}
            <div className="bg-white rounded-3xl border border-[#E8E5DF] p-6 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between pb-5 border-b border-[#E8E5DF]">
                <div>
                  <h3 className="font-display text-xl font-bold text-[#0F1420]">
                    Selected Jet Category
                  </h3>
                  <span className="text-xs text-gray-500">Chartered by category size</span>
                </div>
                <Link
                  href="/booking/results"
                  className="text-xs font-semibold text-[#C9A052] hover:text-[#9A7A35] flex items-center gap-1 underline transition-colors"
                >
                  <span>Change category</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="py-6 flex flex-col md:flex-row gap-6 items-start">
                <div className="w-full md:w-56 h-36 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0 relative">
                  <img
                    src={selectedAircraft.imageExterior}
                    alt={selectedAircraft.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-[#0F1420]/80 backdrop-blur-sm px-2.5 py-0.5 rounded-full">
                    <span className="text-[10px] font-bold text-[#C9A052] uppercase">
                      {selectedAircraft.categoryLabel}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 flex-1">
                  <h4 className="font-display text-2xl font-bold text-[#0F1420]">
                    {selectedAircraft.name}
                  </h4>
                  {selectedAircraft.typicalAircraft && (
                    <p className="text-xs font-medium text-[#0F1420]">
                      <span className="text-gray-400">Typical aircraft in category:</span>{" "}
                      {selectedAircraft.typicalAircraft.join(" · ")}
                    </p>
                  )}
                  <p className="text-xs text-[#555555] font-body leading-relaxed">
                    {selectedAircraft.description}
                  </p>

                  <div className="pt-2 flex flex-wrap gap-4 text-xs font-medium text-[#0F1420]">
                    <span>Capacity: {selectedAircraft.passengersLabel}</span>
                    <span>·</span>
                    <span>Range: {selectedAircraft.rangeLabel}</span>
                    <span>·</span>
                    <span>Speed: {selectedAircraft.cruiseSpeed}</span>
                  </div>
                </div>
              </div>

              {/* FBO Terminals Row */}
              <div className="pt-5 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-body">
                <div className="p-3.5 rounded-xl bg-[#F5F2EC] border border-[#E8E5DF] space-y-1">
                  <span className="text-[10px] font-bold uppercase text-[#C9A052] tracking-wider block">
                    Departure VIP FBO Terminal
                  </span>
                  <p className="font-bold text-[#0F1420]">{depFBO.name}</p>
                  <p className="text-gray-600">
                    Tel: <a href={`tel:${depFBO.phone}`} className="text-[#C9A052] hover:underline font-semibold">{depFBO.phone}</a>
                  </p>
                  <p className="text-gray-600">
                    Email: <a href={`mailto:${depFBO.email}`} className="text-[#C9A052] hover:underline font-semibold">{depFBO.email}</a>
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#F5F2EC] border border-[#E8E5DF] space-y-1">
                  <span className="text-[10px] font-bold uppercase text-[#C9A052] tracking-wider block">
                    Arrival VIP FBO Terminal
                  </span>
                  <p className="font-bold text-[#0F1420]">{arrFBO.name}</p>
                  <p className="text-gray-600">
                    Tel: <a href={`tel:${arrFBO.phone}`} className="text-[#C9A052] hover:underline font-semibold">{arrFBO.phone}</a>
                  </p>
                  <p className="text-gray-600">
                    Email: <a href={`mailto:${arrFBO.email}`} className="text-[#C9A052] hover:underline font-semibold">{arrFBO.email}</a>
                  </p>
                </div>
              </div>
            </div>

            {/* CARD 3: Before you continue & Cancellation Terms */}
            <div className="bg-[#F5F2EC]/60 rounded-3xl border border-[#E8E5DF] p-6 sm:p-8 space-y-5">
              <div className="flex items-center gap-2 pb-3 border-b border-[#E8E5DF]">
                <FileCheck className="w-5 h-5 text-[#C9A052]" />
                <h3 className="font-display text-lg font-bold text-[#0F1420]">
                  Charter Conditions &amp; Cancellation Policy
                </h3>
              </div>

              <div className="space-y-4 text-xs text-[#555555] font-body leading-relaxed">
                <div>
                  <h5 className="font-semibold text-[#0F1420] mb-0.5">
                    Inclusions in your charter quote:
                  </h5>
                  <p>
                    Exclusive category aircraft charter, dual-pilot flight crew, VIP terminal private ramp handling, artisan bar &amp; refreshments, and all aviation navigation taxes.
                  </p>
                </div>

                <div>
                  <h5 className="font-semibold text-[#0F1420] mb-0.5">
                    Updated Cancellation &amp; Refund Policy:
                  </h5>
                  <p>
                    • <strong>7+ Days Prior:</strong> 100% full charter refund (less $500 concierge connection fee).<br />
                    • <strong>72 Hours to 7 Days:</strong> 80% refund or 100% credit toward rescheduled charter within 12 months.<br />
                    • <strong>24 to 72 Hours:</strong> 50% charter refund.<br />
                    • <strong>Under 24 Hours:</strong> Non-refundable once aircraft positioning commences.<br />
                    • <strong>Weather / Mechanical Guarantee:</strong> Immediate substitute category aircraft or 100% full refund with zero fees.
                  </p>
                </div>

                <div>
                  <h5 className="font-semibold text-[#0F1420] mb-0.5">
                    Aircraft &amp; Flight Manifest Confirmation:
                  </h5>
                  <p>
                    Your dedicated flight concierge will confirm the specific tail number within this category, operating air carrier certificate, and crew manifest prior to boarding.
                  </p>
                </div>
              </div>

              {/* Review Checkbox */}
              <div className="pt-4 border-t border-[#E8E5DF]">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={reviewed}
                    onChange={(e) => setReviewed(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#C9A052] focus:ring-[#C9A052] accent-[#C9A052]"
                  />
                  <span className="text-xs text-[#0F1420] font-medium leading-relaxed group-hover:text-[#C9A052] transition-colors">
                    I have reviewed the flight itinerary, FBO terminal locations, and cancellation terms.
                  </span>
                </label>
              </div>
            </div>

            {/* Bottom Actions Row */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link
                href={`/booking/aircraft/${selectedAircraft.id}`}
                className="btn-outline-dark text-xs px-6 py-3 w-full sm:w-auto flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to category details</span>
              </Link>

              <button
                type="button"
                onClick={handleContinue}
                disabled={!reviewed}
                className={`btn-primary text-xs px-8 py-3.5 w-full sm:w-auto flex items-center justify-center gap-2 shadow-md transition-all ${
                  !reviewed
                    ? "opacity-40 cursor-not-allowed hover:transform-none hover:shadow-none"
                    : "hover:shadow-lg"
                }`}
              >
                <span>Continue to passengers</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* RIGHT SIDEBAR (5 cols / 40%) */}
          <div className="lg:col-span-5 xl:col-span-4">
            <JourneySidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
