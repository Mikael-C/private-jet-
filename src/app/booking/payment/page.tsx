"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  MessageCircle,
  Lock,
  FileText,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { useBooking } from "@/lib/bookingContext";
import { fleetData, Aircraft } from "@/data/fleet";
import JourneySidebar from "@/components/booking/JourneySidebar";

export default function BookingQuotationPage() {
  const { booking, basePrice, servicesTotal, generateReference } = useBooking();

  // Selected aircraft & pricing
  const selectedAircraft: Aircraft =
    fleetData.find((a) => a.id === booking.selectedAircraftId) ||
    fleetData.find((a) => a.id === "praetor-600") ||
    fleetData[0];

  const charterPrice =
    basePrice > 0 ? basePrice : selectedAircraft.illustrativeTrip.price || 20500;
  const handlingFee = 1200;
  const taxesFee = 800;
  const totalEstimate = charterPrice + handlingFee + taxesFee + servicesTotal;

  // Terms agreement checkbox
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleGetQuotation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) return;

    const ref = booking.bookingReference || generateReference();
    const addedServicesList =
      booking.services
        .filter((s) => s.added)
        .map((s) => s.name)
        .join(", ") || "Standard In-Flight Amenities";

    const routeFrom = booking.from || "Departure Airport";
    const routeTo = booking.to || "Destination Airport";
    const depDate = booking.departureDate || "Pending confirmation";
    const depTime = booking.departureTime || "10:00";
    const paxCount = booking.passengers || 2;
    const tripTypeLabel =
      booking.tripType === "round-trip"
        ? `Round trip (Return: ${booking.returnDate || "Flexible"})`
        : booking.tripType === "multi-city"
        ? "Multi-city"
        : "One way";

    // Send everything picked to the chatbot via CustomEvent
    window.dispatchEvent(
      new CustomEvent("open-concierge-chat", {
        detail: {
          bookingSummary: {
            reference: ref,
            routeFrom,
            routeTo,
            depDate,
            depTime,
            tripType: tripTypeLabel,
            passengers: paxCount,
            aircraftName: selectedAircraft.name,
            aircraftCategory: selectedAircraft.categoryLabel,
            services: addedServicesList,
            total: `£${totalEstimate.toLocaleString()}`,
          },
        },
      })
    );
  };

  return (
    <div className="w-full bg-white pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Header Section */}
        <div className="mb-8">
          <span className="section-label">— ALMOST THERE</span>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F1420] tracking-tight">
            Get your quotation.
          </h1>
          <p className="text-sm sm:text-base text-[#555555] font-body mt-2 max-w-2xl">
            Review your journey details and choose how you'd like to receive your personalised charter quotation.
          </p>
        </div>

        {/* 2 Columns: LEFT Form (60%) + RIGHT JourneySidebar (40%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT CONTENT */}
          <form
            onSubmit={handleGetQuotation}
            className="lg:col-span-7 xl:col-span-8 space-y-8"
          >
            {/* CARD 1: Request quotation via */}
            <div className="bg-white rounded-3xl border border-[#E8E5DF] p-6 sm:p-8 shadow-sm space-y-6">
              <div className="pb-4 border-b border-[#E8E5DF]">
                <h3 className="font-display text-xl font-bold text-[#0F1420]">
                  Request quotation via
                </h3>
                <p className="text-xs text-[#555555] mt-0.5">
                  Connect with a dedicated concierge who will finalize your quote and flight assignment.
                </p>
              </div>

              <div className="space-y-4">
                {/* Contact Concierge Option (Only Option) */}
                <div className="p-5 rounded-2xl border-2 border-[#C9A052] bg-[#C9A052]/5 shadow-sm flex items-start gap-4">
                  <div className="mt-1 flex items-center justify-center">
                    <span className="w-4 h-4 rounded-full border-2 border-[#C9A052] flex items-center justify-center">
                      <span className="w-2 h-2 rounded-full bg-[#C9A052]" />
                    </span>
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <div className="w-6 h-6 rounded-full bg-[#C9A052] text-[#0F1420] flex items-center justify-center">
                        <MessageCircle className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-semibold text-sm text-[#0F1420]">
                        Contact concierge
                      </span>
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#C9A052]/20 text-[#7A5E1A]">
                        RECOMMENDED
                      </span>
                    </div>
                    <p className="text-xs text-[#555555] font-body leading-relaxed pt-1">
                      Chat directly with your personal concierge. They'll finalise your quote, verify aircraft tail availability, and connect you with a dedicated flight officer.
                    </p>
                  </div>
                </div>
              </div>

              {/* Informative Step Note */}
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-[#F5F2EC] border border-[#E8E5DF]">
                <FileText className="w-4 h-4 text-[#C9A052] shrink-0 mt-0.5" />
                <p className="text-xs text-[#555555] leading-relaxed">
                  Clicking <strong className="text-[#0F1420]">Get quotation — Contact concierge</strong> will transfer all your selected flight details directly to our concierge team in chat for immediate assistance.
                </p>
              </div>
            </div>

            {/* CARD 2: Review & Confirm */}
            <div className="bg-[#F5F2EC] rounded-3xl border border-[#E8E5DF] p-6 sm:p-8 space-y-6">
              <div>
                <h3 className="font-display text-xl font-bold text-[#0F1420]">
                  Review &amp; confirm
                </h3>
                <p className="text-xs text-[#555555] mt-0.5">
                  Confirm your agreement to proceed with your charter quotation request.
                </p>
              </div>

              {/* Agreement checkbox */}
              <div>
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    required
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#C9A052] focus:ring-[#C9A052] accent-[#C9A052]"
                  />
                  <span className="text-xs text-[#0F1420] font-medium leading-relaxed group-hover:text-[#C9A052] transition-colors">
                    I agree to the charter terms, cancellation conditions and privacy notice. I understand this booking is facilitated by Orbelo flight operations.
                  </span>
                </label>
              </div>

              {/* Estimated Total Banner */}
              <div className="p-5 rounded-2xl bg-white border border-[#E8E5DF] flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#888888] block">
                    Estimated Total
                  </span>
                  <span className="text-xs text-[#555555]">
                    Aircraft charter, handling, taxes &amp; services
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-display text-3xl font-bold text-[#0F1420] block">
                    £{totalEstimate.toLocaleString()}
                  </span>
                  <span className="text-xs font-semibold text-[#C9A052]">GBP</span>
                </div>
              </div>

              {/* CTA Button */}
              <button
                type="submit"
                disabled={!agreeTerms}
                className={`w-full py-4 rounded-full font-body font-semibold text-sm flex items-center justify-center gap-2 shadow-lg transition-all ${
                  agreeTerms
                    ? "bg-[#C9A052] hover:bg-[#b8912e] text-[#0F1420] cursor-pointer hover:shadow-xl active:scale-[0.99]"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                <MessageCircle className="w-5 h-5" />
                <span>Get quotation — Contact concierge</span>
              </button>

              <div className="flex items-center justify-center gap-2 text-xs text-[#888888]">
                <Lock className="w-3.5 h-3.5" />
                <span>Zero automated card charges · Dedicated concierge handoff</span>
              </div>
            </div>

            {/* Back link */}
            <div className="pt-2 flex items-center justify-between">
              <Link
                href="/booking/services"
                className="btn-outline-dark text-xs px-6 py-3 flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to services</span>
              </Link>
            </div>
          </form>

          {/* RIGHT SIDEBAR */}
          <div className="lg:col-span-5 xl:col-span-4">
            <JourneySidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
