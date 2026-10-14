"use client";

import React from "react";
import Link from "next/link";
import { Headphones, ArrowRight, ExternalLink } from "lucide-react";
import { useBooking } from "@/lib/bookingContext";
import { fleetData, Aircraft } from "@/data/fleet";

export default function JourneySidebar() {
  const { booking, basePrice, servicesTotal } = useBooking();

  // Selected aircraft or fallback
  const selectedAircraft: Aircraft =
    fleetData.find((a) => a.id === booking.selectedAircraftId) ||
    fleetData.find((a) => a.id === "praetor-600") ||
    fleetData[0];

  // Pricing calculations
  const charterPrice =
    basePrice > 0 ? basePrice : selectedAircraft.illustrativeTrip.price || 20500;
  const handlingFee = 1200;
  const taxesFee = 800;
  const addedServices = booking.services.filter((s) => s.added);
  const journeyTotal = charterPrice + handlingFee + taxesFee + servicesTotal;

  // Format labels
  const fromCity = booking.from ? booking.from : "London Farnborough (FAB)";
  const toCity = booking.to ? booking.to : "Nice Côte d'Azur (NCE)";
  const departureDate = booking.departureDate || "18 Oct 2026";
  const departureTime = booking.departureTime || "10:00";
  const passengersLabel = `${booking.passengers} Adult${
    booking.passengers > 1 ? "s" : ""
  }`;
  const tripTypeLabel =
    booking.tripType === "round-trip"
      ? "Round trip"
      : booking.tripType === "multi-city"
      ? "Multi-city"
      : "One way";
  const flightDuration = selectedAircraft.illustrativeTrip.duration || "2h 00m";

  return (
    <aside className="w-full lg:w-[380px] xl:w-[420px] flex-shrink-0">
      <div className="sticky top-28 space-y-5">
        {/* Main Journey Card */}
        <div className="bg-white rounded-2xl border border-[#E8E5DF] p-6 shadow-sm">
          {/* Header */}
          <div className="flex items-center justify-between pb-5 border-b border-[#E8E5DF]">
            <h3 className="font-display text-xl font-bold text-[#0F1420]">
              Journey summary
            </h3>
            <Link
              href="/booking/results"
              className="text-xs font-body font-semibold text-[#C9A052] hover:text-[#9A7A35] underline transition-colors"
            >
              Edit
            </Link>
          </div>

          {/* Aircraft Information */}
          <div className="py-4 border-b border-[#E8E5DF]">
            <div className="flex gap-4 items-center">
              <div className="w-24 h-16 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-100 relative">
                <img
                  src={selectedAircraft.imageExterior}
                  alt={selectedAircraft.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-[11px] font-body uppercase tracking-wider text-[#C9A052] font-semibold block">
                  {selectedAircraft.categoryLabel}
                </span>
                <h4 className="font-display text-base font-bold text-[#0F1420] leading-snug">
                  {selectedAircraft.name}
                </h4>
                <p className="text-xs text-[#555555] font-body mt-0.5">
                  Private charter · Up to {selectedAircraft.passengers} guests
                </p>
              </div>
            </div>
          </div>

          {/* Itinerary Details */}
          <div className="py-4 border-b border-[#E8E5DF] space-y-3 text-sm font-body">
            <div>
              <span className="text-xs text-[#888888] uppercase tracking-wider block mb-1">
                Route
              </span>
              <div className="flex items-center gap-2 font-medium text-[#0F1420] text-sm">
                <span className="truncate max-w-[150px]">{fromCity}</span>
                <ArrowRight className="w-4 h-4 text-[#C9A052] flex-shrink-0" />
                <span className="truncate max-w-[150px]">{toCity}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1 text-xs text-[#555555]">
              <div>
                <span className="text-[#888888] block">Date & Time</span>
                <span className="font-medium text-[#0F1420]">
                  {departureDate} · {departureTime}
                </span>
              </div>
              <div>
                <span className="text-[#888888] block">Flight duration</span>
                <span className="font-medium text-[#0F1420]">
                  {flightDuration} nonstop
                </span>
              </div>
              <div>
                <span className="text-[#888888] block">Travelers</span>
                <span className="font-medium text-[#0F1420]">
                  {passengersLabel}
                </span>
              </div>
              <div>
                <span className="text-[#888888] block">Flight type</span>
                <span className="font-medium text-[#0F1420]">
                  {tripTypeLabel}
                </span>
              </div>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="py-4 border-b border-[#E8E5DF] space-y-2.5 text-sm font-body">
            <span className="text-xs font-semibold text-[#0F1420] uppercase tracking-wider block mb-2">
              Price breakdown
            </span>

            <div className="flex justify-between items-center text-xs text-[#555555]">
              <span>Aircraft charter ({selectedAircraft.name})</span>
              <span className="font-medium text-[#0F1420]">
                £{charterPrice.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between items-center text-xs text-[#555555]">
              <span>Airport & handling</span>
              <span className="font-medium text-[#0F1420]">
                £{handlingFee.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between items-center text-xs text-[#555555]">
              <span>Taxes & charges</span>
              <span className="font-medium text-[#0F1420]">
                £{taxesFee.toLocaleString()}
              </span>
            </div>

            {addedServices.map((service) => (
              <div
                key={service.id}
                className="flex justify-between items-center text-xs text-[#555555]"
              >
                <span className="text-[#0F1420] font-medium">
                  + {service.name}
                </span>
                <span className="font-medium text-[#0F1420]">
                  {service.price > 0 ? `£${service.price.toLocaleString()}` : "Tailored quote"}
                </span>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="pt-4 flex items-baseline justify-between font-body">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#888888] block">
                Journey total
              </span>
              <span className="text-[11px] text-[#888888]">
                All taxes & fees included
              </span>
            </div>
            <div className="text-right">
              <span className="font-display text-2xl font-bold text-[#0F1420]">
                £{journeyTotal.toLocaleString()}
              </span>
              <span className="text-[11px] text-[#555555] block">GBP</span>
            </div>
          </div>
        </div>

        {/* Dark Navy Concierge Card */}
        <div className="bg-[#0F1420] text-white rounded-2xl p-6 border border-[#0F1420]">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#C9A052]/20 flex items-center justify-center flex-shrink-0 text-[#C9A052]">
              <Headphones className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <span className="text-[11px] uppercase tracking-wider text-[#C9A052] font-semibold block">
                Dedicated Concierge
              </span>
              <p className="text-sm font-body text-gray-200 leading-snug">
                A personal point of contact.
              </p>
              <p className="text-xs text-gray-400 font-body">
                Available 24/7 for custom requests, ground transfers, and bespoke catering.
              </p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-white/10">
            <a
              href="https://wa.me/447010452726"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C9A052] hover:text-[#E8D5A3] transition-colors"
            >
              <span>Speak to your concierge</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}
