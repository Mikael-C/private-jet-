"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  UtensilsCrossed,
  Car,
  Flower2,
  Headphones,
  Check,
  Plus,
  Info,
} from "lucide-react";
import { useBooking, ServiceItem } from "@/lib/bookingContext";
import JourneySidebar from "@/components/booking/JourneySidebar";

const serviceImages: Record<string, string> = {
  "signature-catering":
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=200&h=150&fit=crop",
  "chauffeured-arrival":
    "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=200&h=150&fit=crop",
  "floral-arrangement":
    "https://images.unsplash.com/photo-1490750967868-88df5691cc53?w=200&h=150&fit=crop",
};

export default function AdditionalServicesPage() {
  const router = useRouter();
  const { booking, updateBooking, servicesTotal } = useBooking();

  const toggleService = (serviceId: string) => {
    const updated = booking.services.map((item) => {
      if (item.id === serviceId) {
        return { ...item, added: !item.added };
      }
      return item;
    });
    updateBooking({ services: updated });
  };

  const updateServiceDetail = (
    serviceId: string,
    key: string,
    value: string
  ) => {
    const updated = booking.services.map((item) => {
      if (item.id === serviceId) {
        return {
          ...item,
          details: {
            ...item.details,
            [key]: value,
          },
        };
      }
      return item;
    });
    updateBooking({ services: updated });
  };

  const selectedCount = booking.services.filter((s) => s.added).length;

  const handleContinue = () => {
    router.push("/booking/payment");
  };

  return (
    <div className="w-full bg-white pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Header Section */}
        <div className="mb-8">
          <span className="section-label">
            — THE FINER DETAILS
          </span>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F1420] tracking-tight">
            Make the journey yours.
          </h1>
          <p className="text-sm sm:text-base text-[#555555] font-body mt-2 max-w-2xl">
            Thoughtful additions, from your first sip to your final destination. Everything here is optional.
          </p>
        </div>

        {/* 2 Columns: LEFT Services (60%) + RIGHT JourneySidebar (40%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT CONTENT (7 cols / 60%) */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6">
            {/* Note Card: Already considered */}
            <div className="bg-[#F5F2EC] rounded-2xl p-5 border border-[#E8E5DF] flex items-start gap-3.5">
              <div className="w-7 h-7 rounded-full bg-[#C9A052]/20 flex items-center justify-center text-[#C9A052] flex-shrink-0 mt-0.5">
                <Info className="w-4 h-4" />
              </div>
              <div className="text-xs font-body text-[#555555] leading-relaxed">
                <strong className="text-[#0F1420] font-semibold">
                  Already considered —{" "}
                </strong>
                Standard refreshments, premium bottled water and onboard Wi-Fi are included in your selected aircraft quote, subject to assigned aircraft confirmation.
              </div>
            </div>

            {/* SERVICE 1: Signature catering */}
            {(() => {
              const item = booking.services.find(
                (s) => s.id === "signature-catering"
              );
              if (!item) return null;
              return (
                <div
                  className={`bg-white rounded-3xl border transition-all duration-300 p-6 sm:p-7 ${
                    item.added
                      ? "border-[#C9A052] shadow-md ring-1 ring-[#C9A052]/30"
                      : "border-[#E8E5DF] hover:border-gray-300"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row gap-5 items-start">
                    <div className="w-full sm:w-36 h-28 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0 relative">
                      <img
                        src={serviceImages[item.id]}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 space-y-1.5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <span className="text-[11px] uppercase font-bold tracking-wider text-[#C9A052] block">
                            Culinary Excellence
                          </span>
                          <h3 className="font-display text-xl font-bold text-[#0F1420]">
                            {item.name}
                          </h3>
                        </div>

                        {/* Add / Added Button */}
                        <button
                          type="button"
                          onClick={() => toggleService(item.id)}
                          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all flex-shrink-0 ${
                            item.added
                              ? "bg-[#0F1420] text-white"
                              : "border border-[#0F1420] text-[#0F1420] hover:bg-[#0F1420] hover:text-white"
                          }`}
                        >
                          {item.added ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-[#C9A052]" />
                              <span>Added</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5" />
                              <span>Add</span>
                            </>
                          )}
                        </button>
                      </div>

                      <p className="text-xs text-[#555555] font-body leading-relaxed">
                        {item.description}
                      </p>

                      <div className="pt-2 text-xs font-semibold text-[#0F1420]">
                        £{item.price.toLocaleString()}{" "}
                        <span className="font-normal text-[#888888]">
                          · £120 per passenger
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Customizer when Added */}
                  {item.added && (
                    <div className="mt-5 pt-5 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-semibold text-[#0F1420] uppercase tracking-wider mb-1">
                          Menu Preference
                        </label>
                        <select
                          value={item.details?.menuPreference || ""}
                          onChange={(e) =>
                            updateServiceDetail(
                              item.id,
                              "menuPreference",
                              e.target.value
                            )
                          }
                          className="input-field text-xs py-2 cursor-pointer"
                        >
                          <option value="">Select menu theme</option>
                          <option value="seasonal-gourmet">
                            Seasonal European Fine Dining
                          </option>
                          <option value="mediterranean">
                            Mediterranean Seafood & Mezze
                          </option>
                          <option value="executive-light">
                            Executive Light & Healthy
                          </option>
                          <option value="caviar-champagne">
                            Caviar & Grand Cru Champagne
                          </option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-[#0F1420] uppercase tracking-wider mb-1">
                          Dietary Requirements
                        </label>
                        <input
                          type="text"
                          value={item.details?.dietaryRequirements || ""}
                          onChange={(e) =>
                            updateServiceDetail(
                              item.id,
                              "dietaryRequirements",
                              e.target.value
                            )
                          }
                          placeholder="e.g. Gluten-free, no shellfish, vegan"
                          className="input-field text-xs py-2"
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}

            {/* SERVICE 2: Chauffeured arrival */}
            {(() => {
              const item = booking.services.find(
                (s) => s.id === "chauffeured-arrival"
              );
              if (!item) return null;
              return (
                <div
                  className={`bg-white rounded-3xl border transition-all duration-300 p-6 sm:p-7 ${
                    item.added
                      ? "border-[#C9A052] shadow-md ring-1 ring-[#C9A052]/30"
                      : "border-[#E8E5DF] hover:border-gray-300"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row gap-5 items-start">
                    <div className="w-full sm:w-36 h-28 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0 relative">
                      <img
                        src={serviceImages[item.id]}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 space-y-1.5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <span className="text-[11px] uppercase font-bold tracking-wider text-[#C9A052] block">
                            Ground Mobility
                          </span>
                          <h3 className="font-display text-xl font-bold text-[#0F1420]">
                            {item.name}
                          </h3>
                        </div>

                        {/* Add / Added Button */}
                        <button
                          type="button"
                          onClick={() => toggleService(item.id)}
                          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all flex-shrink-0 ${
                            item.added
                              ? "bg-[#0F1420] text-white"
                              : "border border-[#0F1420] text-[#0F1420] hover:bg-[#0F1420] hover:text-white"
                          }`}
                        >
                          {item.added ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-[#C9A052]" />
                              <span>Added</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5" />
                              <span>Add</span>
                            </>
                          )}
                        </button>
                      </div>

                      <p className="text-xs text-[#555555] font-body leading-relaxed">
                        {item.description}
                      </p>

                      <div className="pt-2 text-xs font-semibold text-[#0F1420]">
                        £{item.price.toLocaleString()}{" "}
                        <span className="font-normal text-[#888888]">
                          · One-way executive arrival transfer
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Customizer when Added */}
                  {item.added && (
                    <div className="mt-5 pt-5 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-semibold text-[#0F1420] uppercase tracking-wider mb-1">
                          Drop-off Address or Hotel
                        </label>
                        <input
                          type="text"
                          value={item.details?.destination || ""}
                          onChange={(e) =>
                            updateServiceDetail(
                              item.id,
                              "destination",
                              e.target.value
                            )
                          }
                          placeholder="e.g. Hotel du Cap-Eden-Roc, Antibes"
                          className="input-field text-xs py-2"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-[#0F1420] uppercase tracking-wider mb-1">
                          Preferred Vehicle / Timing Note
                        </label>
                        <input
                          type="text"
                          value={item.details?.pickupTime || ""}
                          onChange={(e) =>
                            updateServiceDetail(
                              item.id,
                              "pickupTime",
                              e.target.value
                            )
                          }
                          placeholder="e.g. Mercedes-Benz S-Class / Immediate tarmac pickup"
                          className="input-field text-xs py-2"
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}

            {/* SERVICE 3: Floral arrangement */}
            {(() => {
              const item = booking.services.find(
                (s) => s.id === "floral-arrangement"
              );
              if (!item) return null;
              return (
                <div
                  className={`bg-white rounded-3xl border transition-all duration-300 p-6 sm:p-7 ${
                    item.added
                      ? "border-[#C9A052] shadow-md ring-1 ring-[#C9A052]/30"
                      : "border-[#E8E5DF] hover:border-gray-300"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row gap-5 items-start">
                    <div className="w-full sm:w-36 h-28 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0 relative">
                      <img
                        src={serviceImages[item.id]}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 space-y-1.5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <span className="text-[11px] uppercase font-bold tracking-wider text-[#C9A052] block">
                            Cabin Ambience
                          </span>
                          <h3 className="font-display text-xl font-bold text-[#0F1420]">
                            {item.name}
                          </h3>
                        </div>

                        {/* Add / Added Button */}
                        <button
                          type="button"
                          onClick={() => toggleService(item.id)}
                          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all flex-shrink-0 ${
                            item.added
                              ? "bg-[#0F1420] text-white"
                              : "border border-[#0F1420] text-[#0F1420] hover:bg-[#0F1420] hover:text-white"
                          }`}
                        >
                          {item.added ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-[#C9A052]" />
                              <span>Added</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5" />
                              <span>Add</span>
                            </>
                          )}
                        </button>
                      </div>

                      <p className="text-xs text-[#555555] font-body leading-relaxed">
                        {item.description}
                      </p>

                      <div className="pt-2 text-xs font-semibold text-[#0F1420]">
                        £{item.price.toLocaleString()}{" "}
                        <span className="font-normal text-[#888888]">
                          · Handcrafted seasonal bouquet
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* SERVICE 4: Personal concierge requests */}
            {(() => {
              const item = booking.services.find(
                (s) => s.id === "concierge-requests"
              );
              if (!item) return null;
              return (
                <div
                  className={`bg-white rounded-3xl border transition-all duration-300 p-6 sm:p-7 ${
                    item.added
                      ? "border-[#C9A052] shadow-md ring-1 ring-[#C9A052]/30"
                      : "border-[#E8E5DF] hover:border-gray-300"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row gap-5 items-start">
                    <div className="w-full sm:w-36 h-28 rounded-2xl bg-[#0F1420] text-[#C9A052] flex flex-col items-center justify-center p-3 text-center flex-shrink-0">
                      <Headphones className="w-8 h-8 mb-1" />
                      <span className="text-[10px] uppercase font-bold text-white tracking-wider">
                        Concierge
                      </span>
                    </div>

                    <div className="flex-1 space-y-1.5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <span className="text-[11px] uppercase font-bold tracking-wider text-[#C9A052] block">
                            Bespoke Logistics
                          </span>
                          <h3 className="font-display text-xl font-bold text-[#0F1420]">
                            {item.name}
                          </h3>
                        </div>

                        {/* Add / Added Button */}
                        <button
                          type="button"
                          onClick={() => toggleService(item.id)}
                          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all flex-shrink-0 ${
                            item.added
                              ? "bg-[#0F1420] text-white"
                              : "border border-[#0F1420] text-[#0F1420] hover:bg-[#0F1420] hover:text-white"
                          }`}
                        >
                          {item.added ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-[#C9A052]" />
                              <span>Added</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5" />
                              <span>Add</span>
                            </>
                          )}
                        </button>
                      </div>

                      <p className="text-xs text-[#555555] font-body leading-relaxed">
                        {item.description}
                      </p>

                      <div className="pt-2 text-xs font-semibold text-[#C9A052]">
                        Tailored quote · No charge added now
                      </div>
                    </div>
                  </div>

                  {/* Expanded Customizer when Added */}
                  {item.added && (
                    <div className="mt-5 pt-5 border-t border-gray-100">
                      <label className="block text-[11px] font-semibold text-[#0F1420] uppercase tracking-wider mb-1">
                        Please describe your concierge request
                      </label>
                      <textarea
                        rows={2}
                        value={item.details?.request || ""}
                        onChange={(e) =>
                          updateServiceDetail(item.id, "request", e.target.value)
                        }
                        placeholder="e.g. VIP helicopter connection to Monaco, champagne vintage 2012, or customs assistance for pets..."
                        className="input-field text-xs resize-none"
                      />
                    </div>
                  )}
                </div>
              );
            })()}

            {/* Bottom Actions Row */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link
                href="/booking/passengers"
                className="btn-outline-dark text-xs px-6 py-3 w-full sm:w-auto flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to passengers</span>
              </Link>

              <button
                type="button"
                onClick={handleContinue}
                className="btn-primary text-xs px-8 py-3.5 w-full sm:w-auto flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
              >
                <span>Continue to payment</span>
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

      {/* Bottom Sticky Summary Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#0F1420] text-white border-t border-[#C9A052]/40 shadow-2xl py-3.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-6 h-6 rounded-full bg-[#C9A052] text-[#0F1420] text-xs font-bold flex items-center justify-center">
              {selectedCount}
            </span>
            <div className="text-xs sm:text-sm">
              <span className="font-semibold text-white">
                {selectedCount} {selectedCount === 1 ? "service" : "services"} selected
              </span>{" "}
              · <span className="text-gray-300">Added to your journey</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right">
              <span className="text-[11px] text-gray-400 uppercase tracking-wider block">
                Services addition
              </span>
              <span className="font-display text-lg font-bold text-[#C9A052]">
                £{servicesTotal.toLocaleString()} GBP
              </span>
            </div>

            <button
              type="button"
              onClick={handleContinue}
              className="btn-gold text-xs py-2.5 px-6 font-semibold"
            >
              Continue to payment →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
