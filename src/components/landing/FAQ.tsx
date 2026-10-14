"use client";

import { useState } from "react";
import { Plus, Minus, ArrowUpRight } from "lucide-react";

const faqs = [
  {
    question: "How much does a private jet charter cost?",
    answer:
      "Your quote depends on the route, aircraft, travel dates and your requirements. Send us your itinerary for a tailored proposal with clear inclusions before you confirm.",
  },
  {
    question: "How far in advance should I book?",
    answer:
      "We recommend 2–4 weeks for most charters. For peak periods or popular routes, earlier is better. We can also arrange short-notice charters with as little as 4–24 hours notice for available aircraft.",
  },
  {
    question: "Can I travel with pets or special luggage?",
    answer:
      "Yes. Many operators welcome pets with advance notice. We will confirm pet policies, secure appropriate aircraft and ensure a comfortable experience for all passengers — including four-legged ones.",
  },
  {
    question: "Can you arrange ground transfers?",
    answer:
      "Yes. We coordinate chauffeured arrivals, helicopter transfers and private terminals. Every detail of your journey, from door to door, can be considered and arranged by your concierge.",
  },
  {
    question: "What is included in the charter price?",
    answer:
      "The charter price includes the aircraft, crew, standard refreshments and airport handling fees. Catering, ground transfers and special services are optional additions, itemised before you confirm.",
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
              <a
                href="https://wa.me/447010452726"
                target="_blank"
                rel="noopener noreferrer"
                className="link-arrow font-semibold text-[#0F1420] hover:text-gold transition-colors inline-flex items-center gap-2 group"
              >
                <span>Speak to a charter specialist</span>
                <ArrowUpRight className="w-4 h-4 text-gold transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
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
