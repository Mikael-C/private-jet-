"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  User,
  Users,
  Lock,
  Mail,
  Phone,
  Calendar,
  Globe,
  Sparkles,
  ShieldCheck,
  Check,
} from "lucide-react";
import { useBooking, PassengerInfo } from "@/lib/bookingContext";
import JourneySidebar from "@/components/booking/JourneySidebar";

const nationalitiesList = [
  "United States",
  "United Kingdom",
  "France",
  "Switzerland",
  "United Arab Emirates",
  "Monaco",
  "Germany",
  "Italy",
  "Spain",
  "Canada",
  "Singapore",
  "Australia",
  "Saudi Arabia",
  "Qatar",
  "Nigeria",
  "South Africa",
  "Kenya",
  "Ghana",
  "Other",
];

export default function PassengerInformationPage() {
  const router = useRouter();
  const { booking, updateBooking } = useBooking();

  // Lead Passenger State
  const [firstName, setFirstName] = useState(
    booking.bookingContact.firstName || ""
  );
  const [lastName, setLastName] = useState(
    booking.bookingContact.lastName || ""
  );
  const [email, setEmail] = useState(booking.bookingContact.email || "");
  const [phone, setPhone] = useState(booking.bookingContact.phone || "");
  const [dateOfBirth, setDateOfBirth] = useState(
    booking.passengerList?.[0]?.dateOfBirth || ""
  );
  const [nationality, setNationality] = useState(
    booking.passengerList?.[0]?.nationality || "United States"
  );
  const [passportNumber, setPassportNumber] = useState("");

  // Special Requests
  const [specialRequests, setSpecialRequests] = useState(
    booking.specialRequests || ""
  );

  // Consent
  const [consentGiven, setConsentGiven] = useState(
    booking.passengerConsentGiven || false
  );

  // Passenger Count from booking
  const totalPassengers = Math.max(1, booking.passengers || 2);

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consentGiven) return;

    const leadPassenger: PassengerInfo = {
      id: "pax-lead",
      fullName: `${firstName} ${lastName}`.trim(),
      dateOfBirth,
      nationality,
      type: "lead",
    };

    updateBooking({
      bookingContact: {
        firstName,
        lastName,
        email,
        phone,
      },
      passengerList: [leadPassenger],
      specialRequests,
      passengerConsentGiven: consentGiven,
    });

    router.push("/booking/services");
  };

  return (
    <div className="w-full bg-white pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Header Section */}
        <div className="mb-8">
          <span className="section-label">
            — PRIMARY TRAVELER
          </span>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F1420] tracking-tight">
            Lead passenger information.
          </h1>
          <p className="text-sm sm:text-base text-[#555555] font-body mt-2 max-w-2xl">
            Please provide details for the lead passenger. Additional passenger manifest details can be submitted anytime to your concierge prior to departure.
          </p>
        </div>

        {/* 2 Columns: LEFT Form (60%) + RIGHT JourneySidebar (40%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT CONTENT */}
          <form
            onSubmit={handleContinue}
            className="lg:col-span-7 xl:col-span-8 space-y-8"
          >
            {/* CARD 1: Lead Passenger & Primary Contact */}
            <div className="bg-white rounded-3xl border border-[#E8E5DF] p-6 sm:p-8 shadow-sm space-y-6">
              <div className="pb-4 border-b border-[#E8E5DF] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#F5F2EC] flex items-center justify-center text-[#C9A052]">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-[#0F1420]">
                      Lead Passenger
                    </h3>
                    <p className="text-xs text-[#555555]">
                      Primary traveler & flight charter contact.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5F2EC] text-xs font-semibold text-[#0F1420]">
                  <Users className="w-3.5 h-3.5 text-[#C9A052]" />
                  <span>{totalPassengers} {totalPassengers === 1 ? "Guest" : "Guests"} Total</span>
                </div>
              </div>

              {/* Names row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#0F1420] uppercase tracking-wider mb-1.5">
                    First Name
                  </label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="e.g. Alexander"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#0F1420] uppercase tracking-wider mb-1.5">
                    Last Name
                  </label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="e.g. Vance"
                    className="input-field"
                  />
                </div>
              </div>

              {/* Contact info row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#0F1420] uppercase tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#888888]">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alexander@familyoffice.com"
                      className="input-field pl-10"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#0F1420] uppercase tracking-wider mb-1.5">
                    Mobile Number (WhatsApp Enabled)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#888888]">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 234-5678"
                      className="input-field pl-10"
                    />
                  </div>
                </div>
              </div>

              {/* Passport & Nationality row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-gray-100">
                <div>
                  <label className="block text-xs font-semibold text-[#0F1420] uppercase tracking-wider mb-1.5">
                    Nationality
                  </label>
                  <div className="relative">
                    <select
                      value={nationality}
                      onChange={(e) => setNationality(e.target.value)}
                      className="input-field text-xs py-2.5 cursor-pointer"
                    >
                      {nationalitiesList.map((nat) => (
                        <option key={nat} value={nat}>
                          {nat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#0F1420] uppercase tracking-wider mb-1.5">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    className="input-field text-xs py-2.5"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#0F1420] uppercase tracking-wider mb-1.5">
                    Passport Number (Optional)
                  </label>
                  <input
                    type="text"
                    value={passportNumber}
                    onChange={(e) => setPassportNumber(e.target.value)}
                    placeholder="Enter or share later"
                    className="input-field text-xs py-2.5"
                  />
                </div>
              </div>

              {/* Companion notice badge */}
              {totalPassengers > 1 && (
                <div className="p-4 rounded-2xl bg-[#F5F2EC] border border-[#E8E5DF] flex items-start gap-3 text-xs text-[#555555]">
                  <Users className="w-4 h-4 text-[#C9A052] flex-shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    <strong className="text-[#0F1420]">
                      Traveling with {totalPassengers - 1} accompanying guest{totalPassengers - 1 > 1 ? "s" : ""}:
                    </strong>{" "}
                    Only the lead passenger is required to submit details now. Names and passport documents for your remaining guests can be communicated directly to your flight concierge anytime prior to departure.
                  </p>
                </div>
              )}

              {/* Privacy Note */}
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 flex items-start gap-3 text-xs text-[#555555]">
                <Lock className="w-4 h-4 text-[#C9A052] flex-shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong className="text-[#0F1420]">
                    Travel documents, handled with discretion.
                  </strong>{" "}
                  All identity information is stored via encrypted aviation channels. No paperwork or customs queues at the VIP terminal.
                </p>
              </div>
            </div>

            {/* CARD 2: Special In-Flight Requests */}
            <div className="bg-white rounded-3xl border border-[#E8E5DF] p-6 sm:p-8 shadow-sm space-y-4">
              <div>
                <h3 className="font-display text-xl font-bold text-[#0F1420]">
                  Special requests &amp; preferences
                </h3>
                <p className="text-xs text-[#555555] mt-0.5">
                  Traveling for an anniversary, celebration, confidential mission, or medical need? Let us know.
                </p>
              </div>

              <div>
                <textarea
                  rows={3}
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="e.g. Traveling with infant car seat, celebrating client closing, require ramp tarmac privacy…"
                  className="input-field resize-none text-xs"
                />
              </div>
            </div>

            {/* CARD 3: Discretion & Consent */}
            <div className="bg-white rounded-3xl border border-[#E8E5DF] p-6 sm:p-8 shadow-sm space-y-4">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  required
                  checked={consentGiven}
                  onChange={(e) => setConsentGiven(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-[#C9A052] focus:ring-[#C9A052] accent-[#C9A052]"
                />
                <span className="text-xs text-[#555555] font-body leading-relaxed group-hover:text-[#0F1420] transition-colors">
                  I confirm that I am the lead passenger or authorized representative. I consent to Orbelo and vetted charter operators handling traveler details strictly for flight manifest clearance and security authorization.
                </span>
              </label>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-4">
              <Link
                href="/booking/review"
                className="btn-outline-dark text-xs px-6 py-3.5 flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to review</span>
              </Link>

              <button
                type="submit"
                disabled={!consentGiven || !firstName || !lastName || !email || !phone}
                className="btn-gold px-8 py-3.5 text-xs font-bold flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed shadow-md hover:shadow-lg transition-all"
              >
                <span>Continue to additional services</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* RIGHT SIDEBAR (5 cols / 40%) */}
          <div className="lg:col-span-5 xl:col-span-4">
            <JourneySidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
