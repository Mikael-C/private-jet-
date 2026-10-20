"use client";

import { useState } from "react";
import { Plus, Minus, ArrowUpRight } from "lucide-react";

const faqs = [
  {
    question: "How much does a private jet charter cost?",
    answer:
      "All charter quotes are calculated in USD ($). Pricing depends on your selected aircraft category, flight hours, and itinerary. For example, regional turboprops start from ~$5,000–$8,500, super light jets from ~$15,800, and long-range flagships from ~$58,000.",
  },
  {
    question: "What is your cancellation and refund policy?",
    answer:
      "Our updated policy provides complete peace of mind: 100% full charter refund for cancellations 7+ days prior to departure (less the initial $500 flight concierge connection fee); 80% refund (or 100% flight credit) between 72 hours and 7 days; 50% refund between 24 and 72 hours. If a flight is affected by severe weather or technical maintenance, an immediate substitute category aircraft is provided or a 100% full refund is issued.",
  },
  {
    question: "Can I bring pets on board?",
    answer:
      "Yes! Pets travel in luxury directly alongside you inside the cabin — never in cargo. You simply need to verify that your pet has an up-to-date International Pet Passport, ISO microchip, rabies vaccination, and a veterinary fit-to-fly certificate.",
  },
  {
    question: "Can I travel with sporting firearms or weapons?",
    answer:
      "Yes, licensed sporting, hunting, and security firearms are permitted. They must be declared at least 24–48 hours prior to flight departure, completely unloaded in locked hard-sided airline cases, with ammunition locked separately (max 5kg/11lbs per IATA regulations). Licenses and permits are verified by FBO security and the Captain.",
  },
  {
    question: "What is a Fixed-Base Operator (FBO)?",
    answer:
      "An FBO is a dedicated private aviation terminal. Instead of crowded commercial terminals, you arrive at a private executive lounge with dedicated security, private lounges, and direct tarmac vehicle access to your aircraft steps just 15 minutes before departure.",
  },
  {
    question: "What is included in the charter price?",
    answer:
      "The charter quote covers the entire aircraft in your selected category, dual Captains, VIP terminal handling, navigation fees, and complimentary onboard bar and Wi-Fi. Bespoke catering, ground chauffeurs, and special floral arrangements are optional additions itemized in USD.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="bg-white py-20 md:py-28 px-6 md:px-12 lg:px-20 border-b border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column (40%) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="section-label">
              A LITTLE MORE CLARITY
            </div>

            <h2 className="heading-lg font-display text-[#0F1420]">
              Before you fly.
            </h2>

            <p className="text-gray-600 font-body text-base md:text-lg leading-relaxed pb-4">
              Your questions, thoughtfully answered.
            </p>

            <div>
              <button
                type="button"
                onClick={() => {
                  if (typeof window !== "undefined") {
                    window.dispatchEvent(new Event("open-concierge-chat"));
                  }
                }}
                className="link-arrow font-semibold text-[#0F1420] hover:text-[#C9A052] transition-colors inline-flex items-center gap-2 group cursor-pointer"
              >
                <span>Speak to a charter specialist</span>
                <ArrowUpRight className="w-4 h-4 text-[#C9A052] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>

          {/* Right Column (60%): Accordion */}
          <div className="lg:col-span-7">
            <div className="divide-y divide-gray-200 border-y border-gray-200">
              {faqs.map((faq, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div key={idx} className="py-6">
                    <button
                      type="button"
                      onClick={() => toggleIndex(idx)}
                      className="w-full flex items-center justify-between gap-4 text-left group focus:outline-none"
                      aria-expanded={isOpen}
                    >
                      <span
                        className={`font-display text-lg md:text-xl font-medium transition-colors ${
                          isOpen
                            ? "text-[#0F1420] font-semibold"
                            : "text-gray-900 group-hover:text-gold"
                        }`}
                      >
                        {faq.question}
                      </span>
                      <span
                        className={`w-8 h-8 rounded-full border flex items-center justify-center flex-shrink-0 transition-colors ${
                          isOpen
                            ? "border-[#0F1420] bg-[#0F1420] text-white"
                            : "border-gray-300 text-gray-500 group-hover:border-gold group-hover:text-gold"
                        }`}
                      >
                        {isOpen ? (
                          <Minus className="w-4 h-4" />
                        ) : (
                          <Plus className="w-4 h-4" />
                        )}
                      </span>
                    </button>

                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
                      }`}
                    >
                      <p className="font-body text-sm md:text-base text-gray-600 leading-relaxed pr-6">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
