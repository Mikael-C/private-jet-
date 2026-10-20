"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  CheckCircle,
  Download,
  Calendar as CalendarIcon,
  MessageCircle,
  FileText,
  Headphones,
  Plane,
  ArrowRight,
  Receipt,
  ShieldCheck,
  MapPin,
  Clock,
  Users,
} from "lucide-react";
import { useBooking } from "@/lib/bookingContext";
import { fleetData, Aircraft } from "@/data/fleet";
import { getAirportFBO } from "@/data/airports";
import JourneySidebar from "@/components/booking/JourneySidebar";

export default function BookingConfirmationPage() {
  const { booking, generateReference, basePrice, servicesTotal } =
    useBooking();

  const [ref, setRef] = useState(booking.bookingReference || "");

  useEffect(() => {
    if (!booking.bookingReference) {
      const newRef = generateReference();
      setRef(newRef);
    } else {
      setRef(booking.bookingReference);
    }
  }, [booking.bookingReference, generateReference]);

  const selectedAircraft: Aircraft =
    fleetData.find((a) => a.id === booking.selectedAircraftId) ||
    fleetData.find((a) => a.id === "praetor-600") ||
    fleetData[0];

  const charterPrice =
    basePrice > 0 ? basePrice : selectedAircraft.illustrativeTrip.price || 20500;
  const handlingFee = 1200;
  const taxesFee = 800;
  const totalPaid = charterPrice + handlingFee + taxesFee + servicesTotal;

  const firstName = booking.bookingContact.firstName || "Valued Client";
  const fromCity = booking.from || "London Farnborough (FAB)";
  const toCity = booking.to || "Nice Côte d'Azur (NCE)";
  const depDate = booking.departureDate || "18 Oct 2026";
  const depTime = booking.departureTime || "10:00";
  const duration = selectedAircraft.illustrativeTrip.duration || "2h 00m";

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

  // Trigger Print / Download Itinerary
  const handleDownloadItinerary = () => {
    window.print();
  };

  // Generate .ICS Calendar File
  const handleAddToCalendar = () => {
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//SKYVANTAGE//Private Jet Charter//EN",
      "CALSCALE:GREGORIAN",
      "BEGIN:VEVENT",
      `SUMMARY:SKYVANTAGE Private Charter: ${fromCity} to ${toCity}`,
      `DESCRIPTION:Private charter aboard ${selectedAircraft.name}. Booking Reference: ${ref}. Check-in 15 min prior to departure.`,
      `LOCATION:${fromCity} VIP Private Terminal`,
      `STATUS:CONFIRMED`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `skyvantage-flight-${ref || "charter"}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const addedServices = booking.services.filter((s) => s.added);

  return (
    <div className="w-full bg-white pb-24">
      {/* TOP HERO BAND: Dark Navy */}
      <section className="bg-[#0F1420] text-white py-12 sm:py-16 border-b border-[#0F1420] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Hero Details */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#C9A052] text-[#0F1420] flex items-center justify-center">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <span className="text-xs uppercase font-bold tracking-widest text-[#C9A052]">
                  — YOUR PRIVATE SKY AWAITS
                </span>
              </div>

              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                Your journey is confirmed.
              </h1>

              <p className="text-sm sm:text-base text-gray-300 font-body max-w-2xl leading-relaxed">
                Thank you, {firstName}. Your {fromCity}-to-{toCity} escape is arranged. Here&apos;s everything you need for a considered departure.
              </p>

              {/* Gold Reference Badge */}
              <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/5 border border-[#C9A052]/40 backdrop-blur-md mt-2">
                <span className="text-xs uppercase tracking-wider text-gray-400 font-medium">
                  Booking reference
                </span>
                <span className="font-display text-base sm:text-lg font-bold text-[#C9A052] tracking-wider">
                  {ref || "SV-202610-GB88-2940"}
                </span>
              </div>
            </div>

            {/* Right Destination Image */}
            <div className="lg:col-span-4 hidden lg:block">
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl h-52">
                <img
                  src="https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=600&fit=crop"
                  alt="Destination"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1420]/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 text-white text-xs">
                  <span className="text-[10px] uppercase font-bold text-[#C9A052] block">
                    Confirmed Destination
                  </span>
                  <span className="font-semibold text-sm">{toCity}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* 2 Columns: LEFT Details (60%) + RIGHT JourneySidebar (40%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT CONTENT (7 cols / 60%) */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-8">
            {/* CTA Buttons Row */}
            <div className="flex flex-wrap items-center gap-3 pb-2">
              <button
                type="button"
                onClick={handleDownloadItinerary}
                className="btn-primary text-xs px-6 py-3 flex items-center gap-2 shadow-sm"
              >
                <Download className="w-4 h-4" />
                <span>Download itinerary</span>
              </button>

              <button
                type="button"
                onClick={handleAddToCalendar}
                className="btn-outline-dark text-xs px-6 py-3 flex items-center gap-2"
              >
                <CalendarIcon className="w-4 h-4" />
                <span>Add to calendar</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (typeof window !== "undefined") {
                    window.dispatchEvent(
                      new CustomEvent("open-concierge-chat", {
                        detail: {
                          bookingSummary: {
                            reference: ref,
                            routeFrom: fromCity,
                            routeTo: toCity,
                            depDate: booking.departureDate || "18 Oct 2026",
                            depTime: booking.departureTime || "10:00",
                            tripType: booking.tripType === "round-trip" ? "Round Trip" : "One Way",
                            passengers: booking.passengers || 2,
                            aircraftName: selectedAircraft.name,
                            aircraftCategory: selectedAircraft.categoryLabel,
                            services: "Dedicated Concierge Handoff",
                            total: `$${totalPaid.toLocaleString()} USD`,
                          },
                        },
                      })
                    );
                  }
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-body font-medium text-xs border border-[#C9A052] text-[#0F1420] bg-[#C9A052]/10 hover:bg-[#C9A052] hover:text-[#0F1420] transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-[#C9A052]" />
                <span>Contact concierge</span>
              </button>
            </div>

            {/* CARD 1: [From] to [To] Card */}
            <div className="bg-white rounded-3xl border border-[#E8E5DF] p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-5 border-b border-[#E8E5DF]">
                <div>
                  <span className="text-[11px] uppercase font-bold tracking-wider text-[#C9A052] block">
                    Confirmed Charter Route
                  </span>
                  <h3 className="font-display text-2xl font-bold text-[#0F1420]">
                    {fromCity} to {toCity}
                  </h3>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#F5F2EC] text-[#0F1420]">
                  {depDate}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm font-body">
                <div>
                  <span className="text-xs text-[#888888] uppercase tracking-wider block">
                    Departure Terminal
                  </span>
                  <div className="font-display text-2xl font-bold text-[#0F1420] mt-1">
                    {depTime}
                  </div>
                  <div className="font-semibold text-sm text-[#0F1420]">
                    {fromCity}
                  </div>
                  <div className="text-xs text-[#888888] mt-0.5">
                    Signature FBO Private Gate
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center space-y-1">
                  <span className="text-xs text-[#888888]">{duration}</span>
                  <div className="w-full flex items-center gap-2">
                    <div className="h-0.5 bg-[#C9A052] flex-1" />
                    <Plane className="w-4 h-4 text-[#C9A052]" />
                    <div className="h-0.5 bg-[#C9A052] flex-1" />
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                    Direct Nonstop
                  </span>
                </div>

                <div className="sm:text-right">
                  <span className="text-xs text-[#888888] uppercase tracking-wider block">
                    Arrival Terminal
                  </span>
                  <div className="font-display text-2xl font-bold text-[#0F1420] mt-1">
                    {arrTime}
                  </div>
                  <div className="font-semibold text-sm text-[#0F1420]">
                    {toCity}
                  </div>
                  <div className="text-xs text-[#888888] mt-0.5">
                    Executive Aviation Ramp
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#F5F2EC]/50 border border-gray-100 flex flex-wrap items-center justify-between gap-4 text-xs">
                <div>
                  <span className="text-[#888888] block">Assigned Jet Type</span>
                  <span className="font-bold text-[#0F1420]">
                    {selectedAircraft.name} ({selectedAircraft.categoryLabel})
                  </span>
                </div>
                <div>
                  <span className="text-[#888888] block">Crew Complement</span>
                  <span className="font-bold text-[#0F1420]">
                    2 Captains · Certified Operations
                  </span>
                </div>
                <div>
                  <span className="text-[#888888] block">Boarding Protocol</span>
                  <span className="font-bold text-[#0F1420]">
                    Direct Tarmac Escalation
                  </span>
                </div>
              </div>
            </div>

            {/* CARD 2: Lead Passenger & Personal Touches */}
            <div className="bg-white rounded-3xl border border-[#E8E5DF] p-6 sm:p-8 shadow-sm space-y-6">
              <div className="pb-4 border-b border-[#E8E5DF] flex items-center justify-between">
                <div>
                  <h3 className="font-display text-xl font-bold text-[#0F1420]">
                    Lead Passenger &amp; Personal Touches
                  </h3>
                  <p className="text-xs text-gray-500">Charter party of {booking.passengers} guests</p>
                </div>
                <span className="text-xs font-semibold px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full border border-emerald-200">
                  Manifest Registered
                </span>
              </div>

              {/* Lead Passenger Info Card */}
              <div className="p-4 rounded-2xl border border-gray-200 bg-[#F5F2EC]/60 space-y-2 text-xs">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#C9A052] block">
                  Lead Traveler Details
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                  <div>
                    <span className="text-gray-400 block text-[11px]">Full Name</span>
                    <span className="font-bold text-[#0F1420] text-sm">
                      {booking.passengerList?.[0]?.fullName || `${firstName} ${booking.bookingContact.lastName}`.trim() || "Lead Passenger"}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[11px]">Contact</span>
                    <span className="font-medium text-[#0F1420]">
                      {booking.bookingContact.email || "Confidential"}<br />
                      {booking.bookingContact.phone || "WhatsApp on file"}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[11px]">Nationality / Manifest</span>
                    <span className="font-medium text-[#0F1420]">
                      {booking.passengerList?.[0]?.nationality || "Registered"}<br />
                      {booking.passengers > 1 ? `+ ${booking.passengers - 1} Accompanying Guests` : "Sole Traveler"}
                    </span>
                  </div>
                </div>
              </div>

              {/* FBO Terminals with Phone and Email */}
              <div className="pt-2 border-t border-gray-100">
                <span className="text-xs uppercase font-bold tracking-wider text-[#0F1420] block mb-3">
                  Designated VIP Terminal Handling (FBOs)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-body">
                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-1">
                    <span className="text-[10px] font-bold uppercase text-[#C9A052] block">
                      Departure VIP FBO
                    </span>
                    <p className="font-bold text-[#0F1420] text-sm">{depFBO.name}</p>
                    <p className="text-gray-500 text-[11px]">{depFBO.address}</p>
                    <p className="text-gray-700 pt-1">
                      <span className="font-semibold text-[#0F1420]">Direct Tel:</span>{" "}
                      <a href={`tel:${depFBO.phone}`} className="text-[#C9A052] font-semibold hover:underline">
                        {depFBO.phone}
                      </a>
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold text-[#0F1420]">Email:</span>{" "}
                      <a href={`mailto:${depFBO.email}`} className="text-[#C9A052] font-semibold hover:underline">
                        {depFBO.email}
                      </a>
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-1">
                    <span className="text-[10px] font-bold uppercase text-[#C9A052] block">
                      Arrival VIP FBO
                    </span>
                    <p className="font-bold text-[#0F1420] text-sm">{arrFBO.name}</p>
                    <p className="text-gray-500 text-[11px]">{arrFBO.address}</p>
                    <p className="text-gray-700 pt-1">
                      <span className="font-semibold text-[#0F1420]">Direct Tel:</span>{" "}
                      <a href={`tel:${arrFBO.phone}`} className="text-[#C9A052] font-semibold hover:underline">
                        {arrFBO.phone}
                      </a>
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold text-[#0F1420]">Email:</span>{" "}
                      <a href={`mailto:${arrFBO.email}`} className="text-[#C9A052] font-semibold hover:underline">
                        {arrFBO.email}
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Selected Services */}
              <div className="pt-2 border-t border-gray-100">
                <span className="text-xs uppercase font-bold tracking-wider text-[#0F1420] block mb-3">
                  Arranged In-Flight Touches &amp; Services
                </span>
                {addedServices.length > 0 ? (
                  <div className="space-y-2.5">
                    {addedServices.map((s) => (
                      <div
                        key={s.id}
                        className="p-3.5 rounded-xl border border-gray-100 bg-[#F5F2EC]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                      >
                        <div className="space-y-0.5">
                          <span className="font-semibold text-[#0F1420] block">
                            {s.name}
                          </span>
                          <span className="text-[11px] text-[#555555]">
                            {s.description}
                          </span>
                          {/* Show custom details if available */}
                          {s.details?.customPreferences && (
                            <p className="text-[11px] text-[#C9A052] font-medium pt-0.5">
                              Custom Catering: {s.details.customPreferences}
                            </p>
                          )}
                          {s.details?.destinationAddress && (
                            <p className="text-[11px] text-[#C9A052] font-medium pt-0.5">
                              Chauffeur to: {s.details.destinationAddress}
                            </p>
                          )}
                          {s.details?.floralOption && (
                            <p className="text-[11px] text-[#C9A052] font-medium pt-0.5">
                              Floral: {s.details.floralOption}
                            </p>
                          )}
                          {s.details?.petType && (
                            <p className="text-[11px] text-[#C9A052] font-medium pt-0.5">
                              Pet: {s.details.petType} {s.details.petBreed ? `(${s.details.petBreed})` : ""} · Weight: {s.details.petWeight || "Standard"} · Passport Verified
                            </p>
                          )}
                          {s.details?.weaponType && (
                            <p className="text-[11px] text-[#C9A052] font-medium pt-0.5">
                              Firearms Declaration: {s.details.weaponType} · Permit: {s.details.licenseNumber || "On file"}
                            </p>
                          )}
                        </div>
                        <span className="font-bold text-[#0F1420] flex-shrink-0">
                          {s.price > 0 ? `Estimated $${s.price.toLocaleString()} USD` : "Included / Declared"}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-[#888888] italic">
                    Standard executive catering and Wi-Fi included.
                  </p>
                )}
              </div>
            </div>

            {/* CARD 3: What happens next */}
            <div className="bg-[#F5F2EC] rounded-3xl border border-[#E8E5DF] p-6 sm:p-8 space-y-6">
              <div>
                <h3 className="font-display text-xl font-bold text-[#0F1420]">
                  What happens next
                </h3>
                <p className="text-xs text-[#555555] mt-0.5">
                  Your dedicated flight coordinator is preparing your flight package.
                </p>
              </div>

              <div className="space-y-5 text-xs text-[#555555] font-body">
                {/* Step 1 */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#0F1420] text-[#C9A052] flex items-center justify-center flex-shrink-0 shadow-sm">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-[#0F1420] mb-0.5">
                      Complete your travel documents
                    </h4>
                    <p className="leading-relaxed">
                      Your concierge will share a secure request for passport details and customs declarations. No paperwork at the terminal.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#0F1420] text-[#C9A052] flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Headphones className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-[#0F1420] mb-0.5">
                      Fine-tune the details
                    </h4>
                    <p className="leading-relaxed">
                      Confirm catering nuances, specific champagne preferences, your assigned aircraft tail number and your chauffeur meeting point with your concierge.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#0F1420] text-[#C9A052] flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Plane className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-[#0F1420] mb-0.5">
                      Arrive. Board. Exhale.
                    </h4>
                    <p className="leading-relaxed">
                      Your final flight brief will include the private FBO terminal address, crew contact and departure instructions. Arrive just 15 minutes before wheels up.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR (5 cols / 40%) */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-6">
            <JourneySidebar />

            {/* Payment Receipt Card */}
            <div className="bg-white rounded-2xl border border-[#E8E5DF] p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-[#E8E5DF]">
                <Receipt className="w-5 h-5 text-[#C9A052]" />
                <h4 className="font-display text-base font-bold text-[#0F1420]">
                  Payment receipt
                </h4>
              </div>

              <div className="space-y-2 text-xs text-[#555555]">
                <div className="flex justify-between">
                  <span>Reference:</span>
                  <span className="font-bold text-[#0F1420]">{ref}</span>
                </div>
                <div className="flex justify-between">
                  <span>Status:</span>
                  <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                    Concierge Handoff Verified
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Authorized Total:</span>
                  <span className="font-bold text-sm text-[#0F1420]">
                    ${totalPaid.toLocaleString()} USD
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center gap-2 text-[11px] text-[#888888]">
                <ShieldCheck className="w-4 h-4 text-[#C9A052] flex-shrink-0" />
                <span>Operator audited &amp; insured to international aviation standards.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
