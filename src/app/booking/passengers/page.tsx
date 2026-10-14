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
  Plus,
  Trash2,
} from "lucide-react";
import { useBooking, PassengerInfo } from "@/lib/bookingContext";
import JourneySidebar from "@/components/booking/JourneySidebar";

const nationalitiesList = [
  "United Kingdom",
  "United States",
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
  "Other",
];

export default function PassengerInformationPage() {
  const router = useRouter();
  const { booking, updateBooking } = useBooking();

  // Booking Contact State
  const [firstName, setFirstName] = useState(
    booking.bookingContact.firstName || ""
  );
  const [lastName, setLastName] = useState(
    booking.bookingContact.lastName || ""
  );
  const [email, setEmail] = useState(booking.bookingContact.email || "");
  const [phone, setPhone] = useState(booking.bookingContact.phone || "");
  const [isLeadPassenger, setIsLeadPassenger] = useState(true);

  // Special Requests
  const [specialRequests, setSpecialRequests] = useState(
    booking.specialRequests || ""
  );

  // Consent
  const [consentGiven, setConsentGiven] = useState(
    booking.passengerConsentGiven || false
  );

  // Passenger Count from booking
  const passengerCount = Math.max(1, booking.passengers || 2);

  // Initialize Passenger List
  const [passengers, setPassengers] = useState<PassengerInfo[]>(() => {
    if (booking.passengerList && booking.passengerList.length > 0) {
      return booking.passengerList;
    }
    const initialList: PassengerInfo[] = [];
    for (let i = 0; i < passengerCount; i++) {
      initialList.push({
        id: `pax-${i + 1}`,
        fullName:
          i === 0 && isLeadPassenger && (firstName || lastName)
            ? `${firstName} ${lastName}`.trim()
            : "",
        dateOfBirth: "",
        nationality: "United Kingdom",
        type: i === 0 ? "lead" : "adult",
      });
    }
    return initialList;
  });

  // Sync lead passenger name if checkbox is checked
  useEffect(() => {
    if (isLeadPassenger) {
      setPassengers((prev) => {
        const copy = [...prev];
        if (copy[0]) {
          copy[0] = {
            ...copy[0],
            fullName: `${firstName} ${lastName}`.trim(),
          };
        }
        return copy;
      });
    }
  }, [firstName, lastName, isLeadPassenger]);

  // Adjust passenger list length if booking.passengers differs
  useEffect(() => {
    if (passengers.length < passengerCount) {
      const extra: PassengerInfo[] = [];
      for (let i = passengers.length; i < passengerCount; i++) {
        extra.push({
          id: `pax-${i + 1}`,
          fullName: "",
          dateOfBirth: "",
          nationality: "United Kingdom",
          type: "adult",
        });
      }
      setPassengers((prev) => [...prev, ...extra]);
    }
  }, [passengerCount]);

  const updatePassengerField = (
    index: number,
    field: keyof PassengerInfo,
    val: string
  ) => {
    setPassengers((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: val };
      return next;
    });
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consentGiven) return;

    updateBooking({
      bookingContact: {
        firstName,
        lastName,
        email,
        phone,
      },
      passengerList: passengers,
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
            — A PERSONAL JOURNEY
          </span>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F1420] tracking-tight">
            Who&apos;s coming along?
          </h1>
          <p className="text-sm sm:text-base text-[#555555] font-body mt-2 max-w-2xl">
            Tell us who&apos;s traveling and how to reach you. We&apos;ll take care of the details from here.
          </p>
        </div>

        {/* 2 Columns: LEFT Forms (60%) + RIGHT JourneySidebar (40%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT CONTENT (7 cols / 60%) */}
          <form
            onSubmit={handleContinue}
            className="lg:col-span-7 xl:col-span-8 space-y-8"
          >
            {/* CARD 1: Booking contact */}
            <div className="bg-white rounded-3xl border border-[#E8E5DF] p-6 sm:p-8 shadow-sm space-y-6">
              <div className="pb-4 border-b border-[#E8E5DF]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#F5F2EC] flex items-center justify-center text-[#C9A052]">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-[#0F1420]">
                      Booking contact
                    </h3>
                    <p className="text-xs text-[#555555]">
                      Primary recipient for itinerary documents, permits and charter updates.
                    </p>
                  </div>
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
                    placeholder="e.g. Lord Alexander"
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
                    placeholder="e.g. Kensington"
                    className="input-field"
                  />
                </div>
              </div>

              {/* Email & Phone row */}
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
                      placeholder="alexander@familyoffice.co.uk"
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
                      placeholder="+44 7911 123456"
                      className="input-field pl-10"
                    />
                  </div>
                </div>
              </div>

              {/* Lead Passenger Checkbox */}
              <div className="pt-2">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={isLeadPassenger}
                    onChange={(e) => setIsLeadPassenger(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-[#C9A052] focus:ring-[#C9A052] accent-[#C9A052]"
                  />
                  <span className="text-xs font-medium text-[#0F1420] group-hover:text-[#C9A052] transition-colors">
                    The booking contact is also the lead passenger
                  </span>
                </label>
              </div>
            </div>

            {/* CARD 2: Passenger information */}
            <div className="bg-white rounded-3xl border border-[#E8E5DF] p-6 sm:p-8 shadow-sm space-y-6">
              <div className="pb-4 border-b border-[#E8E5DF]">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-display text-xl font-bold text-[#0F1420]">
                      Passenger information
                    </h3>
                    <p className="text-xs text-[#555555] mt-0.5">
                      {passengers.length} {passengers.length === 1 ? "adult" : "adults"} · Please enter each traveler&apos;s name exactly as it appears on their passport.
                    </p>
                  </div>
                  <span className="text-xs font-bold text-[#C9A052] bg-[#F5F2EC] px-3 py-1 rounded-full">
                    {passengers.length} of {booking.passengers}
                  </span>
                </div>
              </div>

              {/* Passenger Forms */}
              <div className="space-y-6">
                {passengers.map((pax, index) => {
                  const isLead = index === 0;
                  return (
                    <div
                      key={pax.id}
                      className="p-5 rounded-2xl border border-gray-100 bg-[#F5F2EC]/40 space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#0F1420]">
                          Passenger {index + 1} {isLead && "· Lead Passenger"}
                        </span>
                        <span className="text-[11px] text-[#888888]">
                          {isLead ? "Main Traveler" : "Guest"}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {/* Full Name */}
                        <div>
                          <label className="block text-[11px] font-semibold text-[#0F1420] uppercase tracking-wider mb-1">
                            Full Name (as on passport)
                          </label>
                          <input
                            type="text"
                            required
                            value={pax.fullName}
                            onChange={(e) =>
                              updatePassengerField(
                                index,
                                "fullName",
                                e.target.value
                              )
                            }
                            placeholder="Full Legal Name"
                            className="input-field text-xs py-2.5"
                          />
                        </div>

                        {/* Date of Birth */}
                        <div>
                          <label className="block text-[11px] font-semibold text-[#0F1420] uppercase tracking-wider mb-1">
                            Date of Birth
                          </label>
                          <input
                            type="date"
                            value={pax.dateOfBirth}
                            onChange={(e) =>
                              updatePassengerField(
                                index,
                                "dateOfBirth",
                                e.target.value
                              )
                            }
                            className="input-field text-xs py-2.5"
                          />
                        </div>

                        {/* Nationality */}
                        <div>
                          <label className="block text-[11px] font-semibold text-[#0F1420] uppercase tracking-wider mb-1">
                            Nationality
                          </label>
                          <select
                            value={pax.nationality}
                            onChange={(e) =>
                              updatePassengerField(
                                index,
                                "nationality",
                                e.target.value
                              )
                            }
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
                    </div>
                  );
                })}
              </div>

              {/* Privacy Note */}
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 flex items-start gap-3 text-xs text-[#555555]">
                <Lock className="w-4 h-4 text-[#C9A052] flex-shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong className="text-[#0F1420]">
                    Travel documents, handled discreetly.
                  </strong>{" "}
                  Passport details are collected through an encrypted document request after confirmation. No sensitive scans are stored on open servers.
                </p>
              </div>
            </div>

            {/* CARD 3: Anything we should know? */}
            <div className="bg-white rounded-3xl border border-[#E8E5DF] p-6 sm:p-8 shadow-sm space-y-4">
              <h3 className="font-display text-xl font-bold text-[#0F1420]">
                Anything we should know?
              </h3>
              <p className="text-xs text-[#555555]">
                Dietary preferences, celebrating an anniversary, pets traveling onboard, or special medical arrangements.
              </p>
              <textarea
                rows={3}
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                placeholder="Share any special preferences or notes with your flight operations team..."
                className="input-field resize-none"
              />
            </div>

            {/* Consent Checkbox */}
            <div className="bg-[#F5F2EC]/60 rounded-2xl p-5 border border-[#E8E5DF]">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  required
                  checked={consentGiven}
                  onChange={(e) => setConsentGiven(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#C9A052] focus:ring-[#C9A052] accent-[#C9A052]"
                />
                <span className="text-xs text-[#0F1420] font-medium leading-relaxed group-hover:text-[#C9A052] transition-colors">
                  I have permission to share the passenger details above for this booking.
                </span>
              </label>
            </div>

            {/* Bottom Actions Row */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link
                href="/booking/review"
                className="btn-outline-dark text-xs px-6 py-3 w-full sm:w-auto flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to review</span>
              </Link>

              <button
                type="submit"
                disabled={!consentGiven}
                className={`btn-primary text-xs px-8 py-3.5 w-full sm:w-auto flex items-center justify-center gap-2 shadow-md transition-all ${
                  !consentGiven
                    ? "opacity-40 cursor-not-allowed hover:transform-none hover:shadow-none"
                    : "hover:shadow-lg"
                }`}
              >
                <span>Continue to services</span>
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
