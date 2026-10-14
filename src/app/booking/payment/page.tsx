"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Building2,
  Lock,
  ExternalLink,
  CheckCircle2,
  PhoneCall,
  MessageCircle,
} from "lucide-react";
import { useBooking } from "@/lib/bookingContext";
import { fleetData, Aircraft } from "@/data/fleet";
import JourneySidebar from "@/components/booking/JourneySidebar";

const countries = [
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
  "Saudi Arabia",
  "Other",
];

export default function BookingPaymentPage() {
  const router = useRouter();
  const { booking, basePrice, servicesTotal, generateReference } =
    useBooking();

  // Selected aircraft & pricing
  const selectedAircraft: Aircraft =
    fleetData.find((a) => a.id === booking.selectedAircraftId) ||
    fleetData.find((a) => a.id === "praetor-600") ||
    fleetData[0];

  const charterPrice =
    basePrice > 0 ? basePrice : selectedAircraft.illustrativeTrip.price || 20500;
  const handlingFee = 1200;
  const taxesFee = 800;
  const totalDue = charterPrice + handlingFee + taxesFee + servicesTotal;

  // Payment Method
  const [paymentMethod, setPaymentMethod] = useState<"whatsapp" | "wire">(
    "whatsapp"
  );

  // Billing Details State
  const defaultBillingName = `${booking.bookingContact.firstName} ${booking.bookingContact.lastName}`.trim();
  const [billingName, setBillingName] = useState(defaultBillingName || "");
  const [country, setCountry] = useState("United Kingdom");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");
  const [sendInvoice, setSendInvoice] = useState(true);

  // Authorize terms checkbox
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleCompleteBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) return;

    // Generate reference if not yet created
    const ref = booking.bookingReference || generateReference();

    const addedServicesList =
      booking.services
        .filter((s) => s.added)
        .map((s) => s.name)
        .join(", ") || "None";

    const routeFrom = booking.from || "London Farnborough (FAB)";
    const routeTo = booking.to || "Nice Côte d'Azur (NCE)";
    const depDate = booking.departureDate || "18 Oct 2026";
    const depTime = booking.departureTime || "10:00";
    const paxCount = booking.passengers || 2;

    const message = `Hi, I'd like to complete my SKYVANTAGE charter booking.

Booking Summary:
• Reference: ${ref}
• Route: ${routeFrom} → ${routeTo}
• Date: ${depDate} at ${depTime}
• Passengers: ${paxCount} adults
• Aircraft: ${selectedAircraft.name} (${selectedAircraft.categoryLabel})
• Services: ${addedServicesList}
• Estimated total: £${totalDue.toLocaleString()}

Please guide me through payment. Thank you.`;

    const waUrl = `https://wa.me/447010452726?text=${encodeURIComponent(
      message
    )}`;

    // Open WhatsApp in a new tab and proceed to Confirmation
    window.open(waUrl, "_blank");
    router.push("/booking/confirmation");
  };

  return (
    <div className="w-full bg-white pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Header Section */}
        <div className="mb-8">
          <span className="section-label">
            — THE FINAL STEP
          </span>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F1420] tracking-tight">
            Your journey, ready to confirm.
          </h1>
          <p className="text-sm sm:text-base text-[#555555] font-body mt-2 max-w-2xl">
            Review your payment details and complete your private charter booking.
          </p>
        </div>

        {/* 2 Columns: LEFT Payment (60%) + RIGHT JourneySidebar (40%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT CONTENT (7 cols / 60%) */}
          <form
            onSubmit={handleCompleteBooking}
            className="lg:col-span-7 xl:col-span-8 space-y-8"
          >
            {/* CARD 1: Payment Method Card */}
            <div className="bg-white rounded-3xl border border-[#E8E5DF] p-6 sm:p-8 shadow-sm space-y-6">
              <div className="pb-4 border-b border-[#E8E5DF]">
                <h3 className="font-display text-xl font-bold text-[#0F1420]">
                  Payment method
                </h3>
                <p className="text-xs text-[#555555] mt-0.5">
                  Private charter transactions are verified directly with your dedicated flight officer.
                </p>
              </div>

              <div className="space-y-4">
                {/* Option 1: WhatsApp Concierge (Recommended) */}
                <label
                  onClick={() => setPaymentMethod("whatsapp")}
                  className={`p-5 rounded-2xl border-2 flex items-start gap-4 cursor-pointer transition-all ${
                    paymentMethod === "whatsapp"
                      ? "border-[#25D366] bg-[#25D366]/5 shadow-sm"
                      : "border-gray-200 hover:border-gray-300 bg-white"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === "whatsapp"}
                    onChange={() => setPaymentMethod("whatsapp")}
                    className="mt-1 h-4 w-4 text-[#25D366] focus:ring-[#25D366] accent-[#25D366]"
                  />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#25D366] text-white flex items-center justify-center">
                        <MessageCircle className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-semibold text-sm text-[#0F1420]">
                        Continue via WhatsApp
                      </span>
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#25D366]/20 text-emerald-800">
                        DIRECT CONCIERGE
                      </span>
                    </div>
                    <p className="text-xs text-[#555555] font-body leading-relaxed pt-1">
                      Speak directly with your concierge to complete payment securely. Our team will guide you through the final steps and confirm your tail assignment.
                    </p>
                  </div>
                </label>

                {/* Option 2: Bank transfer */}
                <label
                  onClick={() => setPaymentMethod("wire")}
                  className={`p-5 rounded-2xl border-2 flex items-start gap-4 cursor-pointer transition-all ${
                    paymentMethod === "wire"
                      ? "border-[#C9A052] bg-[#F5F2EC]/40 shadow-sm"
                      : "border-gray-200 hover:border-gray-300 bg-white"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === "wire"}
                    onChange={() => setPaymentMethod("wire")}
                    className="mt-1 h-4 w-4 text-[#C9A052] focus:ring-[#C9A052] accent-[#C9A052]"
                  />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#0F1420] text-[#C9A052] flex items-center justify-center">
                        <Building2 className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-semibold text-sm text-[#0F1420]">
                        Bank wire transfer
                      </span>
                    </div>
                    <p className="text-xs text-[#555555] font-body leading-relaxed pt-1">
                      Request bank payment instructions. Our concierge will send wire transfer details and pro-forma invoice directly to your email.
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* CARD 2: Billing details */}
            <div className="bg-white rounded-3xl border border-[#E8E5DF] p-6 sm:p-8 shadow-sm space-y-6">
              <div className="pb-4 border-b border-[#E8E5DF]">
                <h3 className="font-display text-xl font-bold text-[#0F1420]">
                  Billing details
                </h3>
                <p className="text-xs text-[#555555] mt-0.5">
                  Name and billing entity for charter agreement & invoice generation.
                </p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#0F1420] uppercase tracking-wider mb-1.5">
                      Billing Name / Entity
                    </label>
                    <input
                      type="text"
                      required
                      value={billingName}
                      onChange={(e) => setBillingName(e.target.value)}
                      placeholder="e.g. Lord Alexander Kensington"
                      className="input-field text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#0F1420] uppercase tracking-wider mb-1.5">
                      Country of Residence
                    </label>
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="input-field text-xs cursor-pointer"
                    >
                      {countries.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0F1420] uppercase tracking-wider mb-1.5">
                    Street Address
                  </label>
                  <input
                    type="text"
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    placeholder="10 Grosvenor Square"
                    className="input-field text-xs"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#0F1420] uppercase tracking-wider mb-1.5">
                      City
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="London"
                      className="input-field text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#0F1420] uppercase tracking-wider mb-1.5">
                      Postal Code / Zip
                    </label>
                    <input
                      type="text"
                      value={postcode}
                      onChange={(e) => setPostcode(e.target.value)}
                      placeholder="W1K 6JP"
                      className="input-field text-xs"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={sendInvoice}
                      onChange={(e) => setSendInvoice(e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-[#C9A052] focus:ring-[#C9A052] accent-[#C9A052]"
                    />
                    <span className="text-xs text-[#555555] group-hover:text-[#0F1420] transition-colors">
                      Send my invoice to{" "}
                      <strong className="text-[#0F1420]">
                        {booking.bookingContact.email || "my registered email"}
                      </strong>
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* CARD 3: Review & authorize */}
            <div className="bg-[#F5F2EC] rounded-3xl border border-[#E8E5DF] p-6 sm:p-8 space-y-6">
              <div>
                <h3 className="font-display text-xl font-bold text-[#0F1420]">
                  Review &amp; authorize
                </h3>
                <p className="text-xs text-[#555555] mt-0.5">
                  Confirm your agreement to proceed with concierge charter handoff.
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
                    I agree to the charter terms, cancellation conditions and privacy notice. I understand this booking is facilitated by SKYVANTAGE flight operations.
                  </span>
                </label>
              </div>

              {/* Total Due Banner */}
              <div className="p-5 rounded-2xl bg-white border border-[#E8E5DF] flex items-center justify-between">
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#888888] block">
                    Total Due
                  </span>
                  <span className="text-xs text-[#555555]">
                    Aircraft charter, handling, taxes &amp; services
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-display text-3xl font-bold text-[#0F1420] block">
                    £{totalDue.toLocaleString()}
                  </span>
                  <span className="text-xs font-semibold text-[#C9A052]">GBP</span>
                </div>
              </div>

              {/* Main CTA */}
              <button
                type="submit"
                disabled={!agreeTerms}
                className={`w-full py-4 rounded-full font-body font-semibold text-sm flex items-center justify-center gap-2 shadow-lg transition-all ${
                  agreeTerms
                    ? "bg-[#25D366] hover:bg-[#1EBE5B] text-white cursor-pointer hover:shadow-xl"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                <MessageCircle className="w-5 h-5" />
                <span>Complete booking via WhatsApp ↗</span>
              </button>

              <div className="flex items-center justify-center gap-2 text-xs text-[#888888]">
                <Lock className="w-3.5 h-3.5" />
                <span>Encrypted 256-bit concierge connection · Zero automated card charges</span>
              </div>
            </div>

            {/* Bottom Actions Row */}
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

          {/* RIGHT SIDEBAR (5 cols / 40%) */}
          <div className="lg:col-span-5 xl:col-span-4">
            <JourneySidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
