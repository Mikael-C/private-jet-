"use client";

import { useState } from "react";
import {
  MessageCircle,
  Mail,
  Clock,
  ArrowUpRight,
  CheckCircle,
  ChevronDown,
  Plane,
  Shield,
  Phone,
} from "lucide-react";

interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  from: string;
  to: string;
  departureDate: string;
  passengers: string;
  message: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: "",
    email: "",
    phone: "",
    from: "",
    to: "",
    departureDate: "",
    passengers: "2",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const whatsappGeneralUrl = `https://wa.me/447010452726?text=${encodeURIComponent(
    "Hi, I'd like to speak with a concierge about chartering a private jet with SKYVANTAGE."
  )}`;

  const whatsappInquiryUrl = `https://wa.me/447010452726?text=${encodeURIComponent(
    `Hi, I just submitted an enquiry for ${formData.fullName || "a client"} (${
      formData.from ? formData.from + " to " + formData.to : "charter flight"
    }). I'd like to connect with a concierge directly.`
  )}`;

  const faqs = [
    {
      question: "How far in advance do I need to book a flight?",
      answer:
        "We can arrange departures in as little as 2 to 4 hours from initial enquiry depending on aircraft availability and repositioning requirements. However, booking 24 to 48 hours in advance provides optimal aircraft selection and preferred slot timings.",
    },
    {
      question: "What is included in the charter price quotation?",
      answer:
        "Every SKYVANTAGE charter quotation is all-inclusive. It includes the complete aircraft charter fee, two professional pilots, all fuel, airport landing and parking fees, VIP private terminal (FBO) handling, passenger taxes, and standard cabin refreshments with beverages.",
    },
    {
      question: "Can I bring my pets on board?",
      answer:
        "Yes, absolutely. The majority of our fleet operators welcome cats, dogs, and other companion animals into the cabin. Simply specify your pet's details when booking so we can arrange required pet passport documentation and onboard pet amenities.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-white pt-32 pb-16 md:pt-40 md:pb-24 px-6 md:px-12 lg:px-20 border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <p className="section-label">GET IN TOUCH</p>
          <h1 className="heading-xl text-[#0F1420] max-w-4xl mb-6">
            Talk to your concierge.
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl font-body font-light leading-relaxed">
            Every enquiry is handled by a real person. Tell us about your journey
            and we&apos;ll be in touch within the hour.
          </p>
        </div>
      </section>

      {/* Main 2-Column Section */}
      <section className="py-16 md:py-24 px-6 md:px-12 lg:px-20 bg-[#F5F2EC]/40">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* LEFT (55% -> 7 cols): Contact Form Card */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-8 md:p-12 border border-gray-200 shadow-sm">
              {!isSubmitted ? (
                <>
                  <div className="mb-8">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#C9A052] font-body block mb-1">
                      Direct Charter Request
                    </span>
                    <h2 className="heading-md text-[#0F1420]">
                      Tell us about your journey
                    </h2>
                    <p className="text-sm text-gray-600 mt-2 font-body">
                      Fill out the form below and your dedicated concierge will
                      review aircraft availability immediately.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Full Name & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2 font-body">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) =>
                            setFormData({ ...formData, fullName: e.target.value })
                          }
                          placeholder="e.g. Lord Alexander Sinclair"
                          className="input-field"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2 font-body">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          placeholder="e.g. alexander@example.com"
                          className="input-field"
                        />
                      </div>
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2 font-body">
                        Phone Number <span className="text-gray-400 font-normal">(Optional)</span>
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="e.g. +44 7010 452726"
                        className="input-field"
                      />
                    </div>

                    {/* From & To */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2 font-body">
                          From (Departure) *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.from}
                          onChange={(e) =>
                            setFormData({ ...formData, from: e.target.value })
                          }
                          placeholder="e.g. London Farnborough (FAB)"
                          className="input-field"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2 font-body">
                          To (Destination) *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.to}
                          onChange={(e) =>
                            setFormData({ ...formData, to: e.target.value })
                          }
                          placeholder="e.g. Nice Côte d'Azur (NCE)"
                          className="input-field"
                        />
                      </div>
                    </div>

                    {/* Departure Date & Passengers */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2 font-body">
                          Departure Date *
                        </label>
                        <input
                          type="date"
                          required
                          value={formData.departureDate}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              departureDate: e.target.value,
                            })
                          }
                          className="input-field"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2 font-body">
                          Passengers *
                        </label>
                        <select
                          value={formData.passengers}
                          onChange={(e) =>
                            setFormData({ ...formData, passengers: e.target.value })
                          }
                          className="input-field"
                        >
                          <option value="1">1 Passenger</option>
                          <option value="2">2 Passengers</option>
                          <option value="3-4">3–4 Passengers</option>
                          <option value="5-8">5–8 Passengers</option>
                          <option value="9-14">9–14 Passengers</option>
                          <option value="15+">15+ Passengers</option>
                        </select>
                      </div>
                    </div>

                    {/* Message / Requirements */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2 font-body">
                        Message / Special Requirements
                      </label>
                      <textarea
                        rows={4}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        placeholder="Tell us about specific aircraft preferences, luggage requirements, pets, or onboard catering requests..."
                        className="input-field resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="btn-primary w-full justify-center py-4 text-base font-semibold shadow-md"
                    >
                      Send enquiry
                    </button>
                  </form>
                </>
              ) : (
                /* Success State */
                <div className="text-center py-10 px-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="heading-md text-[#0F1420] mb-3">
                    Thank you, {formData.fullName || "valued client"}.
                  </h3>
                  <p className="text-gray-600 font-body text-base max-w-md mx-auto mb-8 leading-relaxed">
                    Your flight enquiry has been received. Your dedicated
                    concierge is reviewing available aircraft options and will
                    respond within 60 minutes.
                  </p>

                  <div className="p-6 rounded-2xl bg-[#F5F2EC] border border-[#E8E5DF] max-w-md mx-auto mb-8 text-left">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2 font-body">
                      Enquiry Summary
                    </span>
                    <div className="space-y-1.5 text-sm text-[#0F1420] font-body">
                      {formData.from && (
                        <div>
                          <strong>Route:</strong> {formData.from} → {formData.to}
                        </div>
                      )}
                      {formData.departureDate && (
                        <div>
                          <strong>Date:</strong> {formData.departureDate}
                        </div>
                      )}
                      <div>
                        <strong>Passengers:</strong> {formData.passengers}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 max-w-md mx-auto">
                    <a
                      href={whatsappInquiryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary w-full justify-center py-3.5 flex items-center gap-2 font-semibold"
                    >
                      <MessageCircle className="w-4 h-4 text-emerald-800" />
                      <span>Chat on WhatsApp now</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>

                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="text-xs text-gray-500 hover:text-gray-800 underline font-body block mx-auto pt-2"
                    >
                      Submit another enquiry
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT (45% -> 5 cols): Contact Info Cards */}
            <div className="lg:col-span-5 space-y-6">
              {/* WhatsApp Card (Navy Background) */}
              <div className="rounded-2xl p-8 bg-[#0F1420] text-white relative overflow-hidden">
                <div className="w-12 h-12 rounded-xl bg-[#C9A052]/20 text-[#C9A052] flex items-center justify-center mb-5">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-widest text-[#C9A052] font-body block mb-2">
                  DIRECT MESSAGING
                </span>
                <h3 className="font-display text-2xl font-bold text-white mb-2">
                  Chat with us on WhatsApp
                </h3>
                <p className="text-sm text-gray-300 font-body mb-6 leading-relaxed">
                  Fastest response — typically within 15 minutes. Connect with a
                  senior flight coordinator for instant availability and route
                  guidance.
                </p>
                <a
                  href={whatsappGeneralUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full justify-center py-3.5 font-semibold text-sm flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-800" />
                  <span>Start a conversation</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>

              {/* Email Card */}
              <div className="card p-8 bg-white">
                <div className="w-12 h-12 rounded-xl bg-[#F5F2EC] text-[#0F1420] flex items-center justify-center mb-5">
                  <Mail className="w-6 h-6 text-[#C9A052]" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-widest text-gray-500 font-body block mb-2">
                  ELECTRONIC CORRESPONDENCE
                </span>
                <h3 className="font-display text-xl font-bold text-[#0F1420] mb-1">
                  charter@skyvantage.com
                </h3>
                <p className="text-sm text-gray-600 font-body leading-relaxed">
                  Response within 1 hour for most enquiries. Send passenger
                  manifests, RFPs, or corporate accounts requests.
                </p>
              </div>

              {/* Operating Hours Card */}
              <div className="card p-8 bg-white">
                <div className="w-12 h-12 rounded-xl bg-[#F5F2EC] text-[#0F1420] flex items-center justify-center mb-5">
                  <Clock className="w-6 h-6 text-[#C9A052]" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-widest text-gray-500 font-body block mb-2">
                  CONCIERGE AVAILABILITY
                </span>
                <h3 className="font-display text-xl font-bold text-[#0F1420] mb-2">
                  Operations & Support
                </h3>
                <p className="text-sm text-gray-600 font-body leading-relaxed mb-3">
                  Available 7 days a week, 7am–11pm GMT.
                </p>
                <div className="pt-3 border-t border-gray-100 flex items-center gap-2 text-xs text-gray-500 font-body">
                  <Shield className="w-4 h-4 text-[#C9A052] shrink-0" />
                  <span>
                    Emergency out-of-hours support 24/7 for confirmed bookings.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Teaser Accordion at Bottom */}
      <section className="py-20 md:py-28 px-6 md:px-12 lg:px-20 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#C9A052] font-body block mb-3">
              FREQUENTLY ASKED
            </span>
            <h2 className="heading-lg text-[#0F1420]">3 quick answers</h2>
            <p className="text-gray-600 font-body text-base mt-3">
              Essential questions on booking, inclusions, and flying with SKYVANTAGE.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-gray-200 overflow-hidden transition-all bg-white"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-6 md:p-7 text-left font-display text-lg md:text-xl font-bold text-[#0F1420] hover:text-[#C9A052] transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#C9A052] transition-transform duration-300 shrink-0 ml-4 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 md:px-7 pb-6 md:pb-7 text-sm md:text-base text-gray-600 font-body leading-relaxed border-t border-gray-100 pt-4">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
