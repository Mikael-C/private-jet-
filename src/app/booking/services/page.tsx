"use client";

import React, { useState } from "react";
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
  Shield,
  Dog,
  Crosshair,
  FileText,
  AlertTriangle,
  X,
  Lock,
} from "lucide-react";
import { useBooking, ServiceItem } from "@/lib/bookingContext";
import JourneySidebar from "@/components/booking/JourneySidebar";

const serviceImages: Record<string, string> = {
  "signature-catering":
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300&h=200&fit=crop",
  "chauffeured-arrival":
    "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=300&h=200&fit=crop",
  "floral-arrangement":
    "https://images.unsplash.com/photo-1490750967868-88df5691cc53?w=300&h=200&fit=crop",
  "pets-on-board":
    "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=300&h=200&fit=crop",
  "weapons-on-board":
    "https://images.unsplash.com/photo-1584483766114-2cea6facdf57?w=300&h=200&fit=crop",
};

export default function AdditionalServicesPage() {
  const router = useRouter();
  const { booking, updateBooking, servicesTotal } = useBooking();

  // Weapon Modal state
  const [showWeaponModal, setShowWeaponModal] = useState(false);

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

  const handleContinue = () => {
    router.push("/booking/payment");
  };

  const cateringItem = booking.services.find((s) => s.id === "signature-catering");
  const chauffeurItem = booking.services.find((s) => s.id === "chauffeured-arrival");
  const floralItem = booking.services.find((s) => s.id === "floral-arrangement");
  const petItem = booking.services.find((s) => s.id === "pets-on-board");
  const weaponItem = booking.services.find((s) => s.id === "weapons-on-board");
  const conciergeItem = booking.services.find((s) => s.id === "concierge-requests");

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
            Thoughtful additions, from bespoke catering to ground chauffeur and pet handling. All prices shown are estimated quotes.
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
                  Already included in your category quote —{" "}
                </strong>
                Executive bar service, premium bottled water, light refreshments, and high-speed Wi-Fi are already included in your charter.
              </div>
            </div>

            {/* SERVICE 1: Signature Bespoke Catering */}
            {cateringItem && (
              <div
                className={`bg-white rounded-3xl border transition-all duration-300 p-6 sm:p-7 ${
                  cateringItem.added
                    ? "border-[#C9A052] shadow-md ring-1 ring-[#C9A052]/30"
                    : "border-[#E8E5DF] hover:border-gray-300"
                }`}
              >
                <div className="flex flex-col sm:flex-row gap-5 items-start">
                  <div className="w-full sm:w-36 h-28 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0 relative">
                    <img
                      src={serviceImages[cateringItem.id]}
                      alt={cateringItem.name}
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
                          {cateringItem.name}
                        </h3>
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleService(cateringItem.id)}
                        className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all flex-shrink-0 ${
                          cateringItem.added
                            ? "bg-[#0F1420] text-white"
                            : "border border-[#0F1420] text-[#0F1420] hover:bg-[#0F1420] hover:text-white"
                        }`}
                      >
                        {cateringItem.added ? (
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
                      {cateringItem.description}
                    </p>

                    <div className="pt-2 text-xs font-semibold text-[#0F1420]">
                      Estimated ${cateringItem.price.toLocaleString()} USD{" "}
                      <span className="font-normal text-[#888888]">
                        · Approx. $120 per guest (Estimated)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Expanded Customizer when Added */}
                {cateringItem.added && (
                  <div className="mt-5 pt-5 border-t border-gray-100 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-semibold text-[#0F1420] uppercase tracking-wider mb-1">
                          Curated Culinary Theme
                        </label>
                        <select
                          value={cateringItem.details?.menuPreference || "seasonal-gourmet"}
                          onChange={(e) =>
                            updateServiceDetail(
                              cateringItem.id,
                              "menuPreference",
                              e.target.value
                            )
                          }
                          className="input-field text-xs py-2 cursor-pointer"
                        >
                          <option value="seasonal-gourmet">
                            Seasonal European Fine Dining
                          </option>
                          <option value="mediterranean">
                            Mediterranean Seafood &amp; Mezze
                          </option>
                          <option value="executive-light">
                            Executive Light &amp; Wellness
                          </option>
                          <option value="caviar-champagne">
                            Petrossian Caviar &amp; Grand Cru Champagne
                          </option>
                          <option value="custom">
                            Fully Bespoke Chef Order
                          </option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-[#0F1420] uppercase tracking-wider mb-1">
                          Dietary &amp; Allergy Restrictions
                        </label>
                        <input
                          type="text"
                          value={cateringItem.details?.dietaryRequirements || ""}
                          onChange={(e) =>
                            updateServiceDetail(
                              cateringItem.id,
                              "dietaryRequirements",
                              e.target.value
                            )
                          }
                          placeholder="e.g. Gluten-free, shellfish allergy, Halal, Kosher, Vegan"
                          className="input-field text-xs py-2"
                        />
                      </div>
                    </div>

                    {/* What would you like served onboard */}
                    <div>
                      <label className="block text-[11px] font-semibold text-[#0F1420] uppercase tracking-wider mb-1">
                        What would you like served onboard? (Bespoke Requests)
                      </label>
                      <textarea
                        rows={2}
                        value={cateringItem.details?.customPreferences || ""}
                        onChange={(e) =>
                          updateServiceDetail(
                            cateringItem.id,
                            "customPreferences",
                            e.target.value
                          )
                        }
                        placeholder="Tell us what you'd like to eat or drink — e.g. Wagyu tenderloin, specific vintage wine, fresh sushi rolls, children's pasta, artisan cheeses…"
                        className="input-field text-xs py-2 resize-none"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* SERVICE 2: Chauffeured Ground Mobility */}
            {chauffeurItem && (
              <div
                className={`bg-white rounded-3xl border transition-all duration-300 p-6 sm:p-7 ${
                  chauffeurItem.added
                    ? "border-[#C9A052] shadow-md ring-1 ring-[#C9A052]/30"
                    : "border-[#E8E5DF] hover:border-gray-300"
                }`}
              >
                <div className="flex flex-col sm:flex-row gap-5 items-start">
                  <div className="w-full sm:w-36 h-28 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0 relative">
                    <img
                      src={serviceImages[chauffeurItem.id]}
                      alt={chauffeurItem.name}
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
                          {chauffeurItem.name}
                        </h3>
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleService(chauffeurItem.id)}
                        className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all flex-shrink-0 ${
                          chauffeurItem.added
                            ? "bg-[#0F1420] text-white"
                            : "border border-[#0F1420] text-[#0F1420] hover:bg-[#0F1420] hover:text-white"
                        }`}
                      >
                        {chauffeurItem.added ? (
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
                      {chauffeurItem.description}
                    </p>

                    <div className="pt-2 text-xs font-semibold text-[#0F1420]">
                      Estimated ${chauffeurItem.price.toLocaleString()} USD{" "}
                      <span className="font-normal text-[#888888]">
                        · Executive transfer (Estimated)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Expanded Customizer with Address Inputs */}
                {chauffeurItem.added && (
                  <div className="mt-5 pt-5 border-t border-gray-100 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-semibold text-[#0F1420] uppercase tracking-wider mb-1">
                          Pickup Address (Departure City)
                        </label>
                        <input
                          type="text"
                          value={chauffeurItem.details?.pickupAddress || ""}
                          onChange={(e) =>
                            updateServiceDetail(
                              chauffeurItem.id,
                              "pickupAddress",
                              e.target.value
                            )
                          }
                          placeholder="e.g. 45 Park Lane, Mayfair, London"
                          className="input-field text-xs py-2"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-[#0F1420] uppercase tracking-wider mb-1">
                          Destination / Drop-off Address (Arrival City)
                        </label>
                        <input
                          type="text"
                          value={chauffeurItem.details?.destinationAddress || ""}
                          onChange={(e) =>
                            updateServiceDetail(
                              chauffeurItem.id,
                              "destinationAddress",
                              e.target.value
                            )
                          }
                          placeholder="e.g. Hotel du Cap-Eden-Roc, Boulevard John F. Kennedy, Antibes"
                          className="input-field text-xs py-2"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-semibold text-[#0F1420] uppercase tracking-wider mb-1">
                          Preferred Vehicle Fleet
                        </label>
                        <select
                          value={chauffeurItem.details?.vehiclePreference || "Mercedes-Benz S-Class"}
                          onChange={(e) =>
                            updateServiceDetail(
                              chauffeurItem.id,
                              "vehiclePreference",
                              e.target.value
                            )
                          }
                          className="input-field text-xs py-2 cursor-pointer"
                        >
                          <option value="Mercedes-Benz S-Class">Mercedes-Benz S-Class (Sedan · Up to 3 pax)</option>
                          <option value="Mercedes-Benz V-Class">Mercedes-Benz V-Class VIP (Van · Up to 6 pax)</option>
                          <option value="Cadillac Escalade">Cadillac Escalade ESV (Luxury SUV · Up to 5 pax)</option>
                          <option value="Rolls-Royce Phantom">Rolls-Royce Phantom / Ghost (Ultra-Luxury)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-[#0F1420] uppercase tracking-wider mb-1">
                          Tarmac Direct Meeting Note
                        </label>
                        <input
                          type="text"
                          value={chauffeurItem.details?.pickupTime || ""}
                          onChange={(e) =>
                            updateServiceDetail(
                              chauffeurItem.id,
                              "pickupTime",
                              e.target.value
                            )
                          }
                          placeholder="e.g. Direct aircraft stairs ramp access upon arrival"
                          className="input-field text-xs py-2"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* SERVICE 3: Floral Styling Options */}
            {floralItem && (
              <div
                className={`bg-white rounded-3xl border transition-all duration-300 p-6 sm:p-7 ${
                  floralItem.added
                    ? "border-[#C9A052] shadow-md ring-1 ring-[#C9A052]/30"
                    : "border-[#E8E5DF] hover:border-gray-300"
                }`}
              >
                <div className="flex flex-col sm:flex-row gap-5 items-start">
                  <div className="w-full sm:w-36 h-28 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0 relative">
                    <img
                      src={serviceImages[floralItem.id]}
                      alt={floralItem.name}
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
                          {floralItem.name}
                        </h3>
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleService(floralItem.id)}
                        className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all flex-shrink-0 ${
                          floralItem.added
                            ? "bg-[#0F1420] text-white"
                            : "border border-[#0F1420] text-[#0F1420] hover:bg-[#0F1420] hover:text-white"
                        }`}
                      >
                        {floralItem.added ? (
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
                      {floralItem.description}
                    </p>

                    <div className="pt-2 text-xs font-semibold text-[#0F1420]">
                      Estimated ${floralItem.price.toLocaleString()} USD{" "}
                      <span className="font-normal text-[#888888]">
                        · Bespoke fresh floral arrangement (Estimated)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Expanded Floral Options */}
                {floralItem.added && (
                  <div className="mt-5 pt-5 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#0F1420] uppercase tracking-wider mb-1">
                        Floral Arrangement Option
                      </label>
                      <select
                        value={floralItem.details?.floralOption || "Fresh White Phalaenopsis Orchids"}
                        onChange={(e) =>
                          updateServiceDetail(
                            floralItem.id,
                            "floralOption",
                            e.target.value
                          )
                        }
                        className="input-field text-xs py-2 cursor-pointer"
                      >
                        <option value="Fresh White Phalaenopsis Orchids">
                          Fresh White Phalaenopsis Orchids (Signature Executive)
                        </option>
                        <option value="Classic Long-Stem Red Roses">
                          Classic Long-Stem Red Roses (Ecuadorian Premium)
                        </option>
                        <option value="Seasonal Pastel Meadow Bouquet">
                          Seasonal Pastel Meadow Bouquet (Peonies, Ranunculus, Hydrangea)
                        </option>
                        <option value="Contemporary Minimalist Greenery">
                          Contemporary Minimalist Greenery &amp; Calla Lilies
                        </option>
                        <option value="Bespoke Centerpiece">
                          Bespoke Occasion Centerpiece (Tailored Design)
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-[#0F1420] uppercase tracking-wider mb-1">
                        Occasion / Color Theme
                      </label>
                      <input
                        type="text"
                        value={floralItem.details?.occasion || ""}
                        onChange={(e) =>
                          updateServiceDetail(
                            floralItem.id,
                            "occasion",
                            e.target.value
                          )
                        }
                        placeholder="e.g. Wedding Anniversary, Birthday Celebration, VIP Boardroom Welcome"
                        className="input-field text-xs py-2"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* SERVICE 4: Pets on Board */}
            {petItem && (
              <div
                className={`bg-white rounded-3xl border transition-all duration-300 p-6 sm:p-7 ${
                  petItem.added
                    ? "border-[#C9A052] shadow-md ring-1 ring-[#C9A052]/30"
                    : "border-[#E8E5DF] hover:border-gray-300"
                }`}
              >
                <div className="flex flex-col sm:flex-row gap-5 items-start">
                  <div className="w-full sm:w-36 h-28 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0 relative">
                    <img
                      src={serviceImages[petItem.id]}
                      alt={petItem.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 space-y-1.5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <Dog className="w-4 h-4 text-[#C9A052]" />
                        <h3 className="font-display text-xl font-bold text-[#0F1420]">
                          {petItem.name}
                        </h3>
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleService(petItem.id)}
                        className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all flex-shrink-0 ${
                          petItem.added
                            ? "bg-[#0F1420] text-white"
                            : "border border-[#0F1420] text-[#0F1420] hover:bg-[#0F1420] hover:text-white"
                        }`}
                      >
                        {petItem.added ? (
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
                      {petItem.description}
                    </p>

                    <div className="pt-2 text-xs font-semibold text-[#0F1420]">
                      Estimated ${petItem.price.toLocaleString()} USD{" "}
                      <span className="font-normal text-[#888888]">
                        · Cabin pet handling &amp; sanitation (Estimated)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Expanded Pet Fields */}
                {petItem.added && (
                  <div className="mt-5 pt-5 border-t border-gray-100 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[11px] font-semibold text-[#0F1420] uppercase tracking-wider mb-1">
                          Pet Type
                        </label>
                        <select
                          value={petItem.details?.petType || "Dog"}
                          onChange={(e) =>
                            updateServiceDetail(petItem.id, "petType", e.target.value)
                          }
                          className="input-field text-xs py-2 cursor-pointer"
                        >
                          <option value="Dog">Dog (Canine)</option>
                          <option value="Cat">Cat (Feline)</option>
                          <option value="Falcon">Falcon / Bird</option>
                          <option value="Other">Other Domestic Pet</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-[#0F1420] uppercase tracking-wider mb-1">
                          Pet Breed &amp; Name
                        </label>
                        <input
                          type="text"
                          value={petItem.details?.petBreed || ""}
                          onChange={(e) =>
                            updateServiceDetail(petItem.id, "petBreed", e.target.value)
                          }
                          placeholder="e.g. French Bulldog / Max"
                          className="input-field text-xs py-2"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-[#0F1420] uppercase tracking-wider mb-1">
                          Pet Weight (lbs or kg)
                        </label>
                        <input
                          type="text"
                          value={petItem.details?.petWeight || ""}
                          onChange={(e) =>
                            updateServiceDetail(petItem.id, "petWeight", e.target.value)
                          }
                          placeholder="e.g. 24 lbs / 11 kg"
                          className="input-field text-xs py-2"
                        />
                      </div>
                    </div>

                    {/* Passport & Documentation verification checkbox */}
                    <div className="p-4 rounded-xl bg-[#F5F2EC] border border-[#E8E5DF] space-y-2">
                      <label className="flex items-start gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={petItem.details?.hasPassportAndDocuments === "true"}
                          onChange={(e) =>
                            updateServiceDetail(
                              petItem.id,
                              "hasPassportAndDocuments",
                              e.target.checked ? "true" : "false"
                            )
                          }
                          className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#C9A052] focus:ring-[#C9A052] accent-[#C9A052]"
                        />
                        <span className="text-xs text-[#0F1420] font-medium leading-relaxed">
                          <strong>Pet Documentation &amp; Passport Verified:</strong> I confirm that this pet possesses an up-to-date International Pet Passport (or Veterinary Health Certificate), an ISO 11784/11785 microchip, and valid rabies vaccination as required by sovereign destination authorities.
                        </span>
                      </label>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* SERVICE 5: Firearms & Weapons on Board */}
            {weaponItem && (
              <div
                className={`bg-white rounded-3xl border transition-all duration-300 p-6 sm:p-7 ${
                  weaponItem.added
                    ? "border-[#C9A052] shadow-md ring-1 ring-[#C9A052]/30"
                    : "border-[#E8E5DF] hover:border-gray-300"
                }`}
              >
                <div className="flex flex-col sm:flex-row gap-5 items-start">
                  <div className="w-full sm:w-36 h-28 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0 relative">
                    <img
                      src={serviceImages[weaponItem.id]}
                      alt={weaponItem.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 space-y-1.5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <Crosshair className="w-4 h-4 text-[#C9A052]" />
                        <h3 className="font-display text-xl font-bold text-[#0F1420]">
                          {weaponItem.name}
                        </h3>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          if (!weaponItem.added) {
                            setShowWeaponModal(true);
                          }
                          toggleService(weaponItem.id);
                        }}
                        className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all flex-shrink-0 ${
                          weaponItem.added
                            ? "bg-[#0F1420] text-white"
                            : "border border-[#0F1420] text-[#0F1420] hover:bg-[#0F1420] hover:text-white"
                        }`}
                      >
                        {weaponItem.added ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-[#C9A052]" />
                            <span>Declared</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>Declare Weapons</span>
                          </>
                        )}
                      </button>
                    </div>

                    <p className="text-xs text-[#555555] font-body leading-relaxed">
                      {weaponItem.description}
                    </p>

                    <div className="pt-2 flex items-center gap-3">
                      <span className="text-xs font-semibold text-[#0F1420]">
                        Official Legal Declaration · No Charter Surcharge
                      </span>
                      <button
                        type="button"
                        onClick={() => setShowWeaponModal(true)}
                        className="text-xs font-semibold text-[#C9A052] underline hover:text-[#0F1420]"
                      >
                        View Procedures &amp; Licensing Requirements
                      </button>
                    </div>
                  </div>
                </div>

                {/* Expanded Weapon Declaration Details */}
                {weaponItem.added && (
                  <div className="mt-5 pt-5 border-t border-gray-100 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[11px] font-semibold text-[#0F1420] uppercase tracking-wider mb-1">
                          Weapon Classification
                        </label>
                        <select
                          value={weaponItem.details?.weaponType || "Sporting Shotgun"}
                          onChange={(e) =>
                            updateServiceDetail(weaponItem.id, "weaponType", e.target.value)
                          }
                          className="input-field text-xs py-2 cursor-pointer"
                        >
                          <option value="Sporting Shotgun">Sporting Shotgun (Clay / Wingshooting)</option>
                          <option value="Hunting Rifle">Hunting Rifle (Bolt-Action / Big Game)</option>
                          <option value="Handgun / Sidearm">Handgun / Protection Sidearm</option>
                          <option value="Diplomatic Security Arms">Diplomatic Protection Security Firearms</option>
                          <option value="Antique / Collectible">Antique / Collectible Firearm</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-[#0F1420] uppercase tracking-wider mb-1">
                          Firearms License / Permit #
                        </label>
                        <input
                          type="text"
                          value={weaponItem.details?.licenseNumber || ""}
                          onChange={(e) =>
                            updateServiceDetail(weaponItem.id, "licenseNumber", e.target.value)
                          }
                          placeholder="e.g. ATF Form 4473 / EU Firearm Pass"
                          className="input-field text-xs py-2"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-[#0F1420] uppercase tracking-wider mb-1">
                          Issuing Authority &amp; Quantity
                        </label>
                        <input
                          type="text"
                          value={weaponItem.details?.issuingAuthority || ""}
                          onChange={(e) =>
                            updateServiceDetail(weaponItem.id, "issuingAuthority", e.target.value)
                          }
                          placeholder="e.g. UK Home Office (Qty: 2 cased)"
                          className="input-field text-xs py-2"
                        />
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
                      <AlertTriangle className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                      <p>
                        <strong>Boarding Rule Reminder:</strong> All firearms must be 100% unloaded in locked hard-sided airline cases, and ammunition separately locked (maximum 5kg/11lbs gross under IATA regulations). Please click &quot;View Procedures&quot; for complete compliance protocol.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* SERVICE 6: Personal Concierge Requests */}
            {conciergeItem && (
              <div
                className={`bg-white rounded-3xl border transition-all duration-300 p-6 sm:p-7 ${
                  conciergeItem.added
                    ? "border-[#C9A052] shadow-md ring-1 ring-[#C9A052]/30"
                    : "border-[#E8E5DF] hover:border-gray-300"
                }`}
              >
                <div className="flex flex-col sm:flex-row gap-5 items-start">
                  <div className="w-12 h-12 rounded-2xl bg-[#F5F2EC] flex items-center justify-center text-[#C9A052] flex-shrink-0">
                    <Headphones className="w-6 h-6" />
                  </div>

                  <div className="flex-1 space-y-1.5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="text-[11px] uppercase font-bold tracking-wider text-[#C9A052] block">
                          Concierge
                        </span>
                        <h3 className="font-display text-xl font-bold text-[#0F1420]">
                          {conciergeItem.name}
                        </h3>
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleService(conciergeItem.id)}
                        className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all flex-shrink-0 ${
                          conciergeItem.added
                            ? "bg-[#0F1420] text-white"
                            : "border border-[#0F1420] text-[#0F1420] hover:bg-[#0F1420] hover:text-white"
                        }`}
                      >
                        {conciergeItem.added ? (
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
                      {conciergeItem.description}
                    </p>

                    <div className="pt-2 text-xs font-semibold text-[#0F1420]">
                      Tailored quotation · Flight concierge handoff
                    </div>
                  </div>
                </div>

                {/* Expanded Concierge Field */}
                {conciergeItem.added && (
                  <div className="mt-5 pt-5 border-t border-gray-100">
                    <label className="block text-[11px] font-semibold text-[#0F1420] uppercase tracking-wider mb-1">
                      Describe your bespoke concierge requests
                    </label>
                    <textarea
                      rows={3}
                      value={conciergeItem.details?.request || ""}
                      onChange={(e) =>
                        updateServiceDetail(conciergeItem.id, "request", e.target.value)
                      }
                      placeholder="e.g. Helicopter connection to Courchevel / Monaco, yacht tender coordination, specific onboard luggage security…"
                      className="input-field text-xs py-2 resize-none"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-100">
              <Link
                href="/booking/passengers"
                className="btn-outline-dark text-xs px-6 py-3.5 flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to passenger info</span>
              </Link>

              <button
                type="button"
                onClick={handleContinue}
                className="btn-gold px-8 py-3.5 text-xs font-bold flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
              >
                <span>Continue to quotation</span>
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

      {/* WEAPONS & FIREARMS BOARDING PROCEDURES MODAL */}
      {showWeaponModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-start justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0F1420] text-[#C9A052] flex items-center justify-center">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-[#0F1420]">
                    Firearms &amp; Weapons Onboard Protocol
                  </h3>
                  <span className="text-xs text-[#C9A052] font-semibold uppercase tracking-wider">
                    Official Aviation Security &amp; Legal Procedures
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowWeaponModal(false)}
                className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs font-body text-gray-600 leading-relaxed">
              <p className="font-medium text-[#0F1420]">
                Private charter operators permit carriage of legally licensed sporting shotguns, hunting rifles, and security sidearms strictly under international ICAO Annex 18 and national civil aviation authority regulations:
              </p>

              <div className="space-y-3 pt-2">
                <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200">
                  <h5 className="font-bold text-[#0F1420] mb-1">
                    1. 24–48 Hour Advance Declaration
                  </h5>
                  <p>
                    All firearms and ammunition must be formally declared at the time of booking or at least 24–48 hours prior to flight departure. This allows flight dispatch to file sovereign diplomatic overflight and landing security manifests.
                  </p>
                </div>

                <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200">
                  <h5 className="font-bold text-[#0F1420] mb-1">
                    2. Unloaded &amp; Locked Hard Cases
                  </h5>
                  <p>
                    All weapons must be completely unloaded and secured inside a crushproof, locked hard-sided case (e.g. Pelican/Storm case). No loose or soft-cased firearms are permitted on the ramp or cabin.
                  </p>
                </div>

                <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200">
                  <h5 className="font-bold text-[#0F1420] mb-1">
                    3. Strict Ammunition Regulations
                  </h5>
                  <p>
                    Ammunition must be packed in original commercial packaging or secure fiber/metal containers, strictly locked separately from the firearm. Maximum permitted quantity is 5 kg (11 lbs) gross per passenger under IATA Dangerous Goods code UN 0012/UN 0014 (Cartridges, small arms).
                  </p>
                </div>

                <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200">
                  <h5 className="font-bold text-[#0F1420] mb-1">
                    4. FBO Terminal Inspection &amp; Captain Authority
                  </h5>
                  <p>
                    Upon arrival at the private FBO, physical serial numbers, firearm permits, and photo IDs will be verified by the FBO security officer and the operating Aircraft Commander (Captain). The Captain holds sole authority for carriage in the external unpressurized baggage hold.
                  </p>
                </div>

                <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200">
                  <h5 className="font-bold text-[#0F1420] mb-1">
                    5. Sovereign Destination &amp; Transit Permits
                  </h5>
                  <p>
                    Passengers traveling internationally must possess valid export/import licenses (e.g. European Firearms Pass, US ATF Form 6/6NIA, or destination state police clearances). Orbelo Concierge can assist with customs liaison.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <span className="text-[11px] text-gray-500 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#C9A052]" />
                Compliance logged securely with flight ops
              </span>
              <button
                type="button"
                onClick={() => {
                  if (weaponItem && !weaponItem.added) {
                    toggleService(weaponItem.id);
                  }
                  setShowWeaponModal(false);
                }}
                className="btn-gold px-6 py-2.5 text-xs font-bold"
              >
                I Understand &amp; Agree to Protocol
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
