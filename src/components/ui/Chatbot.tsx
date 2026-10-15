"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import {
  MessageCircle,
  X,
  Send,
  Plane,
  CreditCard,
  CheckCircle,
  ArrowUpRight,
  ShieldCheck,
  Lock,
  Sparkles,
  Loader2,
  Check,
} from "lucide-react";
import { fleetData } from "@/data/fleet";

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */
type ActionType =
  | "whatsapp"
  | "booking_and_whatsapp"
  | "naira_fee_modal";

interface MessageAction {
  type: ActionType;
  whatsappText?: string;
}

interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  action?: MessageAction;
}

interface BookingSummaryPayload {
  reference: string;
  routeFrom: string;
  routeTo: string;
  depDate: string;
  depTime: string;
  tripType: string;
  passengers: number | string;
  aircraftName: string;
  aircraftCategory: string;
  services: string;
  total: string;
}

/* ─────────────────────────────────────────────
   Quick-reply chips shown at bottom of chat
───────────────────────────────────────────── */
const QUICK_REPLIES = [
  "What jets do you have?",
  "How much does it cost?",
  "Which airports do you use?",
  "How do I book?",
  "What's included?",
  "Pets on board?",
  "Speak to a concierge",
];

/* ─────────────────────────────────────────────
   Knowledge-base helper
───────────────────────────────────────────── */
function buildFleetSummary(): string {
  return fleetData
    .map(
      (a) =>
        `• ${a.name} (${a.categoryLabel}) — ${a.passengersLabel}, range ${a.rangeLabel}, from £${a.illustrativeTrip.price.toLocaleString()} (${a.illustrativeTrip.route})`
    )
    .join("\n");
}

function getAircraftByName(query: string): (typeof fleetData)[0] | undefined {
  const q = query.toLowerCase();
  return fleetData.find(
    (a) =>
      a.name.toLowerCase().includes(q) ||
      a.manufacturer.toLowerCase().includes(q) ||
      a.id.toLowerCase().includes(q)
  );
}

/* ─────────────────────────────────────────────
   Main response engine
───────────────────────────────────────────── */
function getBotResponse(userText: string): {
  text: string;
  action?: MessageAction;
} {
  const lower = userText.toLowerCase().trim();

  /* ── Greetings ── */
  if (/\b(hi|hello|hey|good morning|good afternoon|good evening|howdy)\b/.test(lower)) {
    return {
      text: "Hello! 👋 Welcome to Orbelo Private Aviation. I can help you with:\n\n✈ Our aircraft fleet\n🗺 Routes & airports\n💷 Pricing & quotes\n📋 How to book\n🐾 Pets & special requests\n\nWhat would you like to know?",
    };
  }

  /* ── Fleet / Aircraft overview ── */
  if (
    /\b(fleet|aircraft|jets?|planes?|what (jets?|aircraft|planes?)|show me|available)\b/.test(lower) &&
    !lower.includes("how much") &&
    !lower.includes("price") &&
    !lower.includes("cost")
  ) {
    const specific = getAircraftByName(lower);
    if (specific) {
      return {
        text: `Here's everything about the **${specific.name}**:\n\n🛩 Category: ${specific.categoryLabel}\n👥 Passengers: ${specific.passengersLabel}\n🌍 Range: ${specific.rangeLabel}\n💺 Cabin height: ${specific.cabinHeight}\n⚡ Speed: ${specific.cruiseSpeed}\n\n✨ Highlights:\n${specific.highlights.map((h) => `• ${h}`).join("\n")}\n\n🎯 Ideal for: ${specific.idealFor}\n\n📅 Sample trip: ${specific.illustrativeTrip.route} — from £${specific.illustrativeTrip.price.toLocaleString()} (${specific.illustrativeTrip.duration})`,
      };
    }
    return {
      text: `We operate 8 world-class private jets:\n\n${buildFleetSummary()}\n\nAsk me about any specific aircraft for full details, or tell me your passenger count and destination and I'll recommend the best fit.`,
    };
  }

  /* ── Specific aircraft lookup ── */
  const specificAircraft = getAircraftByName(lower);
  if (
    specificAircraft &&
    (lower.includes("tell me") ||
      lower.includes("about") ||
      lower.includes("detail") ||
      lower.includes("spec") ||
      lower.includes("info") ||
      fleetData.some((a) => lower.includes(a.name.toLowerCase())))
  ) {
    const a = specificAircraft;
    return {
      text: `**${a.name}** — ${a.categoryLabel}\n\n${a.description}\n\n📋 Specs:\n👥 ${a.passengersLabel} passengers\n🌍 ${a.rangeLabel} range\n⚡ Cruise speed: ${a.cruiseSpeed}\n📦 Baggage: ${a.baggageVolume}\n\n🛎 Amenities:\n${a.amenities.map((am) => `• ${am}`).join("\n")}\n\n💷 From £${a.illustrativeTrip.price.toLocaleString()} — ${a.illustrativeTrip.route} (${a.illustrativeTrip.duration})`,
    };
  }

  /* ── Pricing / Cost ── */
  if (/\b(cost|price|pricing|how much|rates?|expensive|cheap|afford|quote|estimate)\b/.test(lower)) {
    return {
      text: "Our charter pricing is based on route, aircraft type, and dates. Here's a broad guide:\n\n💛 Light jets (6–8 pax)\n   From £8,000 — e.g. London → Paris\n\n🥈 Midsize jets (7–9 pax)\n   From £14,000 — e.g. London → Nice\n\n🥇 Super-midsize (8–10 pax)\n   From £20,000 — e.g. London → Dubai\n\n🏆 Large / Ultra-long-range (14–19 pax)\n   From £40,000 — e.g. London → New York\n\nAll prices include crew, handling, and taxes. For a tailored quotation and flight officer assignment, a ₦500 connection fee applies.",
      action: {
        type: "naira_fee_modal",
      },
    };
  }

  /* ── Airports & Regions ── */
  if (
    /\b(airport|airports|terminal|fbo|airfield|land|depart|fly from|fly out of|heathrow|farnborough|biggin|luton|stansted|gatwick|oxford|bournemouth|dubai|nice|geneva|new york|teterboro|jfk|lagos|cairo|cape town|nairobi|johannesburg|accra|abuja|kigali|morocco|marrakech|africa|african)\b/.test(
      lower
    )
  ) {
    return {
      text: "We operate from dedicated private aviation terminals & VIP FBO hubs globally:\n\n🌍 Africa & Middle East\n• Lagos (LOS), Abuja (ABV), Port Harcourt (PHC)\n• Cairo (CAI), Marrakech (RAK), Casablanca (CMN)\n• Cape Town (CPT), Johannesburg (JNB/HLA)\n• Nairobi (WIL), Accra (ACC), Kigali (KGL)\n• Dubai (DXB/DWC), Seychelles (SEZ), Mauritius (MRU)\n\n🇬🇧 United Kingdom & Europe\n• London Farnborough (FAB), Biggin Hill (BQH), Luton, Stansted\n• Nice Côte d'Azur (NCE), Cannes (CEQ), Geneva (GVA), Paris (LBG)\n\n🇺🇸 Americas\n• New York Teterboro (TEB), Miami (OPF), Los Angeles (VNY)\n\nWhat is your preferred departure or arrival city?",
    };
  }

  /* ── Destinations / Routes ── */
  if (/\b(destination|destinations|where|fly to|route|routes|travel to|go to|places)\b/.test(lower)) {
    return {
      text: "We fly globally to over 190+ VIP destinations ✈\n\nPopular routes:\n• London ↔ Nice / French Riviera (2h)\n• London ↔ Lagos / Abuja (6h 30m)\n• Dubai ↔ Maldives (4h)\n• Paris ↔ Marrakech (3h)\n• London ↔ New York (7h 30m)\n• Johannesburg ↔ Cape Town (2h)\n\nWhere would you like to travel?",
    };
  }

  /* ── How to book ── */
  if (/\b(book|booking|reserve|how do i|steps?|process|start|get started)\b/.test(lower)) {
    return {
      text: "Booking with Orbelo is simple and discreet:\n\n1️⃣ Select your route, date & guest count\n2️⃣ Choose your preferred aircraft\n3️⃣ Request quotation & connect to your concierge\n4️⃣ Confirm tail assignment & receive your flight manifest\n\nWould you like to speak to an available agent now?",
      action: {
        type: "naira_fee_modal",
      },
    };
  }

  /* ── What's included ── */
  if (/\b(includ|what'?s? included|comes with|covers?|covered)\b/.test(lower)) {
    return {
      text: "Your charter quote always includes:\n\n✅ Aircraft & certified dual-pilot crew\n✅ Premium in-flight refreshments & bar\n✅ VIP private terminal (FBO) handling\n✅ All airport landing fees & navigation charges\n✅ Bespoke flight planning & schedule flexibility\n\nOptional additions: Signature hot dining, chauffeured transfer, and luxury hotel/helicopter links.",
    };
  }

  /* ── Pets ── */
  if (/\b(pet|pets?|dog|dogs?|cat|cats?|animal|animals?)\b/.test(lower)) {
    return {
      text: "🐾 Yes! Pets are welcome in the cabin with you on almost all our private flights — never in cargo. They fly right alongside you in luxury.",
    };
  }

  /* ── Cancellation ── */
  if (/\b(cancel|cancellation|refund|change|reschedule)\b/.test(lower)) {
    return {
      text: "Our standard policy:\n\n✅ 7+ days before flight: Full refund\n⚠️ 3–7 days: 50% retained\n❌ Under 48 hours: Full fee applies\n\nFlexible terms can be arranged with your flight officer.",
    };
  }

  /* ── Payment / Fee ── */
  if (/\b(pay|payment|paying|naira|fee|deposit|invoice|card)\b/.test(lower)) {
    return {
      text: "To assign your request to an available private flight officer on WhatsApp, a standard connection fee of **500 Naira (₦500)** is required. This fee is 100% credited towards your charter flight.",
      action: { type: "naira_fee_modal" },
    };
  }

  /* ── Speak to human / agent / concierge ── */
  if (
    /\b(speak|talk|human|person|agent|concierge|whatsapp|call|phone|contact|help me)\b/.test(
      lower
    )
  ) {
    return {
      text: "I will connect you with an available flight concierge agent right away. Please complete the ₦500 connection fee below to proceed to talk to our agents:",
      action: {
        type: "naira_fee_modal",
      },
    };
  }

  /* ── Compliment ── */
  if (/\b(thank|thanks|great|perfect|helpful|awesome|excellent)\b/.test(lower)) {
    return {
      text: "You're very welcome! 😊 Feel free to ask anything about our aircraft, routes, or quotation process.",
    };
  }

  /* ── Fallback ── */
  return {
    text: "I can connect you to an available flight concierge agent who will answer your request in detail on WhatsApp.",
    action: {
      type: "naira_fee_modal",
    },
  };
}

/* ─────────────────────────────────────────────
   Component
───────────────────────────────────────────── */
export default function Chatbot() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [hasInitialized, setHasInitialized] = useState<boolean>(false);

  // ₦500 Modal State
  const [showNairaModal, setShowNairaModal] = useState<boolean>(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState<boolean>(false);
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);

  // Active booking summary from booking flow
  const [activeBooking, setActiveBooking] = useState<BookingSummaryPayload | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, showNairaModal, scrollToBottom]);

  /* Focus input when chat opens */
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  /* ─────────────────────────────────────────────
     Listen for "open-concierge-chat" event
     Handles both simple navbar click and full booking payload
  ───────────────────────────────────────────── */
  useEffect(() => {
    const handler = (e: Event) => {
      const customEvent = e as CustomEvent<{ bookingSummary?: BookingSummaryPayload }>;
      setIsOpen(true);

      const summary = customEvent.detail?.bookingSummary;
      if (summary) {
        setActiveBooking(summary);

        // Add user message with all the details picked
        const userSummaryText = `📋 New Charter Quotation Request:
• Route: ${summary.routeFrom} → ${summary.routeTo}
• Aircraft: ${summary.aircraftName} (${summary.aircraftCategory})
• Date & Time: ${summary.depDate} at ${summary.depTime} (${summary.tripType})
• Guests: ${summary.passengers} Adult(s)
• In-Flight Services: ${summary.services}
• Estimated Total: ${summary.total}
• Reference: ${summary.reference}`;

        const userMsg: ChatMessage = {
          id: `user-${Date.now()}`,
          sender: "user",
          text: userSummaryText,
        };

        setMessages((prev) => [...prev, userMsg]);
        setIsTyping(true);

        // Bot replies saying it will send them to an available agent, then opens 500 Naira modal
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              id: `bot-${Date.now()}`,
              sender: "bot",
              text: `Thank you for submitting your quotation request! ✈️\n\nI have received all your journey details for reference ${summary.reference}. I will connect you to an available flight concierge agent right away.\n\nPlease complete the ₦500 connection fee below to proceed to talk to our agents:`,
              action: { type: "naira_fee_modal" },
            },
          ]);
          setIsTyping(false);
          // Pop up the 500 Naira modal
          setShowNairaModal(true);
        }, 800);
      }
    };

    window.addEventListener("open-concierge-chat", handler);
    return () => window.removeEventListener("open-concierge-chat", handler);
  }, []);

  /* Initial greeting when first opened without quotation */
  useEffect(() => {
    if (isOpen && !hasInitialized && messages.length === 0) {
      setHasInitialized(true);
      setIsTyping(true);
      const t1 = setTimeout(() => {
        setMessages([
          {
            id: "init-1",
            sender: "bot",
            text: "Hello! Welcome to Orbelo Private Aviation. ✈️\n\nI'm your AI concierge — I can answer questions about our fleet, airports, routes, pricing, and charter bookings.",
          },
        ]);
        const t2 = setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              id: "init-2",
              sender: "bot",
              text: "How may I assist you today? Feel free to ask a question or explore our fleet and routes.",
            },
          ]);
          setIsTyping(false);
        }, 800);
        return () => clearTimeout(t2);
      }, 400);
      return () => clearTimeout(t1);
    }
  }, [isOpen, hasInitialized, messages.length]);

  const openWhatsApp = (customText?: string) => {
    const text =
      customText ||
      (activeBooking
        ? `Hi, I have requested a quotation with Orbelo:
• Route: ${activeBooking.routeFrom} → ${activeBooking.routeTo}
• Aircraft: ${activeBooking.aircraftName} (${activeBooking.aircraftCategory})
• Date: ${activeBooking.depDate} at ${activeBooking.depTime} (${activeBooking.tripType})
• Guests: ${activeBooking.passengers}
• Services: ${activeBooking.services}
• Estimated Total: ${activeBooking.total}
• Reference: ${activeBooking.reference}

I have successfully completed the ₦500 concierge fee. Please connect me with an available flight officer.`
        : "Hi, I have paid the ₦500 concierge connection fee and would like to speak to an available flight officer about booking a private jet.");

    window.open(
      `https://wa.me/447010452726?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const handleSend = (e: React.FormEvent | null, overrideText?: string) => {
    e?.preventDefault();
    const trimmed = (overrideText ?? inputText).trim();
    if (!trimmed) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: trimmed,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputText("");

    const { text, action } = getBotResponse(trimmed);
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: `bot-${Date.now()}`, sender: "bot", text, action },
      ]);
      setIsTyping(false);
      if (action?.type === "naira_fee_modal") {
        setShowNairaModal(true);
      }
    }, 750);
  };

  /* ─────────────────────────────────────────────
     500 Naira Payment Handler
     Simulates payment -> shows confirmation -> redirects to WhatsApp
  ───────────────────────────────────────────── */
  const handlePayNaira = () => {
    setIsProcessingPayment(true);

    setTimeout(() => {
      setIsProcessingPayment(false);
      setPaymentSuccess(true);

      // Add success confirmation message to chat
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-paid-${Date.now()}`,
          sender: "bot",
          text: "✅ Payment of ₦500 confirmed!\n\nYour transaction has been verified. Redirecting you to your dedicated flight concierge agent on WhatsApp now...",
        },
      ]);

      // Automatically redirect to WhatsApp after 1.4s
      setTimeout(() => {
        openWhatsApp();
        setShowNairaModal(false);
        setPaymentSuccess(false);
      }, 1400);
    }, 1500);
  };

  return (
    <>
      {/* ── Floating button (closed state) ── */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center">
          <div className="relative">
            <span className="absolute -inset-1.5 rounded-full bg-[#C9A052]/40 animate-ping opacity-75 pointer-events-none" />
            <span className="absolute -inset-1 rounded-full bg-[#C9A052]/20 animate-pulse pointer-events-none" />
            <button
              onClick={() => setIsOpen(true)}
              aria-label="Open concierge chat"
              className="relative w-14 h-14 rounded-full bg-[#0F1420] text-white flex items-center justify-center shadow-2xl hover:scale-105 transition-all duration-300 border border-[#C9A052]/50 group"
            >
              <MessageCircle className="w-6 h-6 text-[#C9A052] transition-transform group-hover:scale-110" />
            </button>
          </div>
          <span className="mt-1.5 text-[10px] uppercase font-bold tracking-widest text-[#0F1420] bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full shadow-sm border border-gray-100 font-body">
            Concierge
          </span>
        </div>
      )}

      {/* ── Chat window (open state) ── */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[400px] max-w-[calc(100vw-1.5rem)] h-[620px] max-h-[calc(100vh-5rem)] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-[#0F1420] text-white p-4 rounded-t-2xl flex items-center justify-between shrink-0 border-b border-[#C9A052]/20">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#C9A052]/20 flex items-center justify-center text-[#C9A052] shrink-0 border border-[#C9A052]/40">
                <Plane className="w-4 h-4 -rotate-45" />
              </div>
              <div>
                <h3 className="font-display text-sm font-bold text-white tracking-wide">
                  Orbelo Concierge
                </h3>
                <div className="flex items-center gap-1.5 text-[11px] text-[#C9A052] font-body">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Available 24 / 7 · Flight Ops</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              className="w-8 h-8 rounded-full hover:bg-white/10 text-gray-400 hover:text-white flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50/50 relative">
            {messages.map((msg) => (
              <div key={msg.id} className="space-y-2">
                <div className={msg.sender === "user" ? "chatbot-bubble-user" : "chatbot-bubble-bot"}>
                  <p className="whitespace-pre-line leading-relaxed text-[13px]">
                    {msg.text}
                  </p>
                </div>

                {/* Inline Action for ₦500 Fee */}
                {msg.action?.type === "naira_fee_modal" && (
                  <div className="pt-1 pl-1">
                    <button
                      onClick={() => setShowNairaModal(true)}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#0F1420] hover:bg-gray-800 text-white shadow-md transition-all active:scale-95"
                    >
                      <CreditCard className="w-4 h-4 text-[#C9A052]" />
                      <span>Pay ₦500 &amp; Connect to our Agents</span>
                    </button>
                  </div>
                )}
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="chatbot-bubble-bot flex items-center gap-1.5 py-3 w-16">
                <span className="w-2 h-2 rounded-full bg-[#C9A052] animate-bounce [animation-delay:-0.3s]" />
                <span className="w-2 h-2 rounded-full bg-[#C9A052] animate-bounce [animation-delay:-0.15s]" />
                <span className="w-2 h-2 rounded-full bg-[#C9A052] animate-bounce" />
              </div>
            )}
            <div ref={messagesEndRef} />

            {/* ─────────────────────────────────────────────
               500 NAIRA POP-UP MODAL OVER CHAT
            ───────────────────────────────────────────── */}
            {showNairaModal && (
              <div className="absolute inset-x-3 bottom-3 top-auto z-20 animate-in fade-in slide-in-from-bottom-5 duration-200">
                <div className="bg-[#0F1420] text-white rounded-2xl p-5 shadow-2xl border-2 border-[#C9A052]/50 space-y-4">
                  {/* Modal Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#C9A052]/20 border border-[#C9A052]/40 flex items-center justify-center text-[#C9A052]">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white font-display">
                          Flight Officer Assignment
                        </h4>
                        <span className="text-[10px] text-[#C9A052] font-semibold tracking-wider uppercase">
                          Standard Connection Fee
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowNairaModal(false)}
                      className="text-gray-400 hover:text-white p-1 rounded-lg"
                      aria-label="Dismiss fee modal"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Fee Amount Display */}
                  <div className="bg-white/5 rounded-xl p-3 border border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-gray-300 block">
                        Concierge Connection Fee
                      </span>
                      <span className="text-[11px] text-gray-400">
                        100% credited towards your flight
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-display text-2xl font-bold text-[#C9A052]">
                        ₦500
                      </span>
                      <span className="text-[10px] text-gray-400 block font-mono">
                        NGN
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-gray-300 leading-relaxed font-body">
                    A connection fee of <strong>₦500</strong> assigns an available flight officer to your quote for immediate tail confirmation and tailored itinerary handling.
                  </p>

                  {/* Payment Button & States */}
                  {paymentSuccess ? (
                    <div className="bg-emerald-500/20 border border-emerald-500/50 rounded-xl p-3 text-center text-xs font-semibold text-emerald-300 flex items-center justify-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      <span>Payment Confirmed! Redirecting to WhatsApp...</span>
                    </div>
                  ) : (
                    <button
                      type="button"
                      disabled={isProcessingPayment}
                      onClick={handlePayNaira}
                      className="w-full py-3.5 px-4 rounded-xl font-body font-semibold text-xs bg-[#C9A052] hover:bg-[#b8912e] text-[#0F1420] flex items-center justify-center gap-2 shadow-lg transition-all active:scale-[0.98] disabled:opacity-75 cursor-pointer"
                    >
                      {isProcessingPayment ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Verifying ₦500 Payment...</span>
                        </>
                      ) : (
                        <>
                          <CreditCard className="w-4 h-4" />
                          <span>Pay ₦500 &amp; connect to one of our agents</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  )}

                  <div className="flex items-center justify-center gap-1.5 text-[10px] text-gray-400">
                    <Lock className="w-3 h-3 text-[#C9A052]" />
                    <span>Instant debit card / bank transfer verification</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Replies */}
          {messages.length <= 2 && !isTyping && !showNairaModal && (
            <div className="px-3 py-2 bg-white border-t border-gray-100 flex gap-2 overflow-x-auto shrink-0 scrollbar-hide">
              {QUICK_REPLIES.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSend(null, q)}
                  className="shrink-0 px-3 py-1.5 rounded-full text-[11px] font-medium border border-[#C9A052]/50 text-[#0F1420] hover:bg-[#C9A052]/10 transition-colors whitespace-nowrap font-body"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input Form */}
          <form
            onSubmit={handleSend}
            className="p-3 bg-white border-t border-gray-100 flex items-center gap-2 shrink-0"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask about aircraft, routes, pricing…"
              className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#C9A052] font-body"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              aria-label="Send message"
              className="w-9 h-9 rounded-xl bg-[#C9A052] hover:bg-[#b8912e] disabled:opacity-40 disabled:hover:bg-[#C9A052] text-[#0F1420] flex items-center justify-center shrink-0 transition-all active:scale-95 shadow-sm"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
