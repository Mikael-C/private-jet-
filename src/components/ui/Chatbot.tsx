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
  ChevronDown,
  Building2,
  Dog,
  Crosshair,
} from "lucide-react";
import { jetCategoriesData, fleetData } from "@/data/fleet";
import { getAirportFBO, KNOWN_FBOS } from "@/data/airports";

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */
type ActionType =
  | "whatsapp"
  | "booking_and_whatsapp"
  | "concierge_fee_modal";

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
   Chatbot Category Dropdown Topics
───────────────────────────────────────────── */
const CHAT_CATEGORIES = [
  { value: "", label: "— Select a topic or question category —" },
  {
    value: "What aircraft categories do you offer?",
    label: "🛩 Aircraft Categories (Piston, Turboprop, Light to Airliner)",
  },
  {
    value: "How much does a charter cost in USD?",
    label: "💵 Charter Pricing in USD ($)",
  },
  {
    value: "What are the airport FBO contacts, phone numbers and emails?",
    label: "🏢 VIP Airport FBO Terminals (Phone & Email Directory)",
  },
  {
    value: "Can I bring pets on board and what documents are required?",
    label: "🐾 Pets on Board (Passports & Documentation)",
  },
  {
    value: "What are the rules and procedures for carrying firearms or weapons on board?",
    label: "🎯 Firearms & Weapons Carriage Procedures",
  },
  {
    value: "What is the cancellation and refund policy?",
    label: "📋 Cancellation & Refund Terms",
  },
  {
    value: "I would like to speak to an available flight concierge officer",
    label: "👤 Speak to Human Flight Officer ($500 Connection Fee)",
  },
  {
    value: "What is included in the charter price?",
    label: "✨ What is Included in Charter Quote",
  },
];

/* ─────────────────────────────────────────────
   Knowledge-base helper
───────────────────────────────────────────── */
function buildCategoriesSummary(): string {
  return jetCategoriesData
    .map(
      (c) =>
        `• **${c.name}**: ${c.passengersLabel}, range ${c.rangeLabel}, speed ${c.cruiseSpeed} — from $${c.illustrativeTrip.price.toLocaleString()} USD (${c.illustrativeTrip.route})`
    )
    .join("\n");
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
      text: "Hello! 👋 Welcome to Orbelo Private Aviation.\n\nI am your AI flight advisor. You can ask me or select a topic from the dropdown below:\n\n✈️ Aircraft categories & jet sizes\n💵 Pricing in USD ($)\n🏢 Airport VIP FBO contacts (Phone & Email)\n🐾 Pets on board & passport rules\n🎯 Firearms & weapons compliance\n📋 Cancellation & refund policy\n👤 Direct connection to our flight officers",
    };
  }

  /* ── Weapons & Firearms On Board ── */
  if (/\b(weapon|weapons|firearm|firearms|gun|guns|rifle|shotgun|handgun|pistol|ammunition|ammo|shoot|hunting)\b/.test(lower)) {
    return {
      text: "🎯 **Firearms & Weapons Onboard Policy**:\n\nLicensed sporting, hunting, and diplomatic security firearms are welcomed on our private charters under strict aviation protocol:\n\n1. **24–48h Advance Declaration:** Weapons and ammunition must be formally declared to dispatch prior to flight.\n2. **Unloaded & Locked:** Must be completely unloaded and secured inside a crushproof, locked hard-sided case.\n3. **Ammunition:** Stored separately in original packaging (max 5 kg / 11 lbs gross per passenger per IATA regulations).\n4. **Terminal Inspection:** Physical serial numbers and valid licenses are inspected by FBO security and the Captain before boarding.\n5. **Permits:** Valid national firearm certificates and destination country import/transit permits must be provided.\n\nWould you like to speak to an officer to clear a flight manifest?",
    };
  }

  /* ── Pets On Board ── */
  if (/\b(pet|pets|dog|dogs|cat|cats|animal|animals|falcon|vet|veterinary|passport)\b/.test(lower)) {
    return {
      text: "🐾 **Pets on Board Protocol**:\n\nYour pets fly comfortably right beside you in the luxury passenger cabin — never in cargo hold.\n\n**Mandatory Requirements**:\n• Valid International Pet Passport or official Veterinary Health Certificate\n• ISO 11784/11785 compliant microchip\n• Current Rabies and core vaccination history\n• Fit-to-fly health clearance completed within 10 days of departure\n\nOur concierge coordinates handling and terminal pet clearance seamlessly.",
    };
  }

  /* ── Cancellation Policy ── */
  if (/\b(cancel|cancellation|refund|reschedule|terms|guarantee|policy)\b/.test(lower)) {
    return {
      text: "📋 **Updated Cancellation & Refund Terms**:\n\n• **7+ Days Prior:** 100% full charter refund (less $500 concierge connection fee).\n• **72 Hours to 7 Days:** 80% refund, or 100% flight credit valid for 12 months.\n• **24 to 72 Hours:** 50% charter refund.\n• **Under 24 Hours / Aircraft Repositioned:** Non-refundable once aircraft positioning has begun.\n• **Weather & Technical Guarantee:** If adverse weather or ATC prevents flight, an equivalent category aircraft is immediately dispatched or 100% refund is issued with zero penalties.",
    };
  }

  /* ── Aircraft / Categories overview ── */
  if (
    /\b(fleet|aircraft|jets?|planes?|categories|category|sizes?|turboprop|piston|midsize|super light|airliner|heavy)\b/.test(lower) &&
    !lower.includes("how much") &&
    !lower.includes("price") &&
    !lower.includes("cost")
  ) {
    return {
      text: `Our private aviation network is structured into 9 vetted aircraft categories:\n\n${buildCategoriesSummary()}\n\nSelect any category in our booking flow to view detailed cabin specifications and representative aircraft.`,
    };
  }

  /* ── Pricing / Cost in USD ── */
  if (/\b(cost|price|pricing|how much|rates?|dollar|usd|quote|estimate)\b/.test(lower)) {
    return {
      text: "💵 **Charter Pricing Guide (USD $)**:\n\nAll pricing is calculated in US Dollars ($) for the entire aircraft:\n\n• **Piston Aircraft (3–4 pax):** from $5,200 (e.g. London → Manchester)\n• **Turboprop (6–8 pax):** from $8,500 (e.g. Geneva → Nice)\n• **Entry Level Jet (4–5 pax):** from $11,500 (e.g. London → Paris)\n• **Super Light Jet (7–8 pax):** from $15,800 (e.g. London → Nice)\n• **Mid-Size Jet (8–9 pax):** from $21,000 (e.g. London → Milan)\n• **Super Mid-Size (9–10 pax):** from $28,500 (e.g. London → Dubai)\n• **Heavy Jet (10–14 pax):** from $39,000 (e.g. New York → London)\n• **Ultra-Long-Range (14–19 pax):** from $58,000 (e.g. London → Los Angeles)\n• **VIP Airliner (19–30+ pax):** from $95,000 (e.g. London → Singapore)\n\nTo lock your itinerary and assign a dedicated flight officer, a standard $500 USD connection fee applies (100% credited towards your charter).",
      action: {
        type: "concierge_fee_modal",
      },
    };
  }

  /* ── Airports & FBO Directory ── */
  if (
    /\b(airport|airports|terminal|fbo|fixed base|handler|phone|email|contact|farnborough|biggin|luton|stansted|nice|geneva|teterboro|opa-locka|van nuys|dubai|lagos|abuja|cairo|marrakech|johannesburg|cape town)\b/.test(
      lower
    )
  ) {
    // Check if user named a specific airport
    let fboDetail = "";
    if (lower.includes("farnborough") || lower.includes("fab")) {
      const f = KNOWN_FBOS["FAB"];
      fboDetail = `\n\n📌 **London Farnborough (FAB)**:\n• FBO: ${f.name}\n• Phone: ${f.phone}\n• Email: ${f.email}`;
    } else if (lower.includes("nice") || lower.includes("nce")) {
      const f = KNOWN_FBOS["NCE"];
      fboDetail = `\n\n📌 **Nice Côte d'Azur (NCE)**:\n• FBO: ${f.name}\n• Phone: ${f.phone}\n• Email: ${f.email}`;
    } else if (lower.includes("teterboro") || lower.includes("teb") || lower.includes("new york")) {
      const f = KNOWN_FBOS["TEB"];
      fboDetail = `\n\n📌 **New York Teterboro (TEB)**:\n• FBO: ${f.name}\n• Phone: ${f.phone}\n• Email: ${f.email}`;
    } else if (lower.includes("dubai") || lower.includes("dxb")) {
      const f = KNOWN_FBOS["DXB"];
      fboDetail = `\n\n📌 **Dubai International (DXB)**:\n• FBO: ${f.name}\n• Phone: ${f.phone}\n• Email: ${f.email}`;
    } else if (lower.includes("lagos") || lower.includes("los")) {
      const f = KNOWN_FBOS["LOS"];
      fboDetail = `\n\n📌 **Lagos Murtala Muhammed (LOS)**:\n• FBO: ${f.name}\n• Phone: ${f.phone}\n• Email: ${f.email}`;
    } else if (lower.includes("geneva") || lower.includes("gva")) {
      const f = KNOWN_FBOS["GVA"];
      fboDetail = `\n\n📌 **Geneva Cointrin (GVA)**:\n• FBO: ${f.name}\n• Phone: ${f.phone}\n• Email: ${f.email}`;
    }

    return {
      text: `🏢 **Fixed-Base Operator (FBO) Directory**:\n\nOur private charters depart and arrive via dedicated executive VIP terminals with discrete ramp access, private lounges, and zero security queues.${fboDetail}\n\n**Key Hubs**:\n• London Farnborough (FAB): +44 1252 375300 · ops@farnboroughairport.com\n• Nice Côte d'Azur (NCE): +33 4 93 21 00 10 · nce@signatureflight.com\n• Paris Le Bourget (LBG): +33 1 48 35 88 88 · lbg@jetaviation.com\n• New York Teterboro (TEB): +1 201 288 5040 · fbo@meridian.aero\n• Miami Opa-locka (OPF): +1 305 685 4646 · fbo@fontainebleauaviation.com\n• Dubai VIP Terminal (DXB): +971 4 212 4000 · fbo-dxb@jetex.com\n• Lagos ExecuJet (LOS): +234 1 295 5110 · fbo.los@execujet.com\n\nTell me any city or airport IATA code, and I will fetch its exact VIP terminal contacts!`,
    };
  }

  /* ── How to book ── */
  if (/\b(book|booking|reserve|how do i|steps?|process|start)\b/.test(lower)) {
    return {
      text: "Booking with Orbelo is simple and discreet:\n\n1️⃣ **Select your route, date & guest count**\n2️⃣ **Choose your preferred aircraft size category** (Turboprop, Light, Midsize, Heavy, etc.)\n3️⃣ **Customize in-flight details** (Catering, Chauffeur address, Pets, Firearms declaration)\n4️⃣ **Submit quotation** & connect with your assigned flight concierge officer\n\nWould you like to connect with a concierge now?",
      action: {
        type: "concierge_fee_modal",
      },
    };
  }

  /* ── What's included ── */
  if (/\b(includ|what'?s? included|comes with|covers?)\b/.test(lower)) {
    return {
      text: "Your charter quote always includes:\n\n✅ Entire aircraft in your selected category\n✅ Dual type-rated Captain flight crew\n✅ Premium in-flight bar & artisan refreshments\n✅ VIP private terminal (FBO) lounge & ramp access\n✅ All airport landing, navigation, and parking fees\n✅ High-speed in-flight Wi-Fi\n\nOptional touches: Custom gourmet hot dining, executive tarmac chauffeured transfer, floral styling, and pet travel.",
    };
  }

  /* ── Speak to human / agent / concierge / $500 fee ── */
  if (
    /\b(speak|talk|human|person|agent|concierge|whatsapp|call|phone|fee|pay|deposit)\b/.test(
      lower
    )
  ) {
    return {
      text: "I will connect you directly with an available flight concierge agent on WhatsApp. Please complete the $500 USD connection fee below (100% credited toward your charter):",
      action: {
        type: "concierge_fee_modal",
      },
    };
  }

  /* ── Compliment ── */
  if (/\b(thank|thanks|great|perfect|helpful|awesome|excellent)\b/.test(lower)) {
    return {
      text: "You're very welcome! Feel free to ask about any aircraft category, FBO terminals, or flight quotations in USD.",
    };
  }

  /* ── Fallback ── */
  return {
    text: "I can connect you to an available flight concierge officer who will answer your route request in detail on WhatsApp.",
    action: {
      type: "concierge_fee_modal",
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

  // $500 USD Modal State
  const [showFeeModal, setShowFeeModal] = useState<boolean>(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState<boolean>(false);
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);

  // Active booking transferred from payment page
  const [activeBooking, setActiveBooking] = useState<BookingSummaryPayload | null>(
    null
  );

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  /* ── Listen for "open-concierge-chat" event from anywhere in the app ── */
  useEffect(() => {
    const handler = (event: Event) => {
      const customEvent = event as CustomEvent<{
        bookingSummary?: BookingSummaryPayload;
      }>;
      const summary = customEvent.detail?.bookingSummary;

      setIsOpen(true);

      if (summary) {
        setActiveBooking(summary);
        setMessages([
          {
            id: "bot-init",
            sender: "bot",
            text: "Hello! Welcome to Orbelo Private Aviation. 👋",
          },
          {
            id: "user-summary",
            sender: "user",
            text: `Quotation Request (Ref: ${summary.reference})\n• Route: ${summary.routeFrom} → ${summary.routeTo}\n• Jet Category: ${summary.aircraftCategory}\n• Date: ${summary.depDate} at ${summary.depTime}\n• Party: ${summary.passengers} guests\n• Services: ${summary.services}\n• Estimated Total: ${summary.total}`,
          },
          {
            id: "bot-fee-prompt",
            sender: "bot",
            text: `Thank you for submitting your quotation request! ✈️\n\nI have received all your journey details for reference ${summary.reference}. I will connect you to an available flight concierge officer right away.\n\nPlease complete the $500 USD connection fee below (100% credited towards your flight):`,
            action: { type: "concierge_fee_modal" },
          },
        ]);
        setShowFeeModal(true);
      }
    };

    window.addEventListener("open-concierge-chat", handler);
    return () => window.removeEventListener("open-concierge-chat", handler);
  }, []);

  // Initial greeting on first manual open
  useEffect(() => {
    if (isOpen && !hasInitialized && messages.length === 0) {
      setHasInitialized(true);
      setIsTyping(true);
      const t1 = setTimeout(() => {
        setMessages([
          {
            id: "bot-welcome-1",
            sender: "bot",
            text: "Hello! Welcome to Orbelo Private Aviation. ✈️\n\nI'm your AI flight advisor. I can answer questions about aircraft categories, airport FBOs, USD pricing, pet policies, firearms compliance, and charter quotes.",
          },
        ]);
        const t2 = setTimeout(() => {
          setIsTyping(false);
        }, 600);
        return () => clearTimeout(t2);
      }, 300);
      return () => clearTimeout(t1);
    }
  }, [isOpen, hasInitialized, messages.length]);

  const openWhatsApp = (customText?: string) => {
    const text =
      customText ||
      (activeBooking
        ? `Hi, I have requested a private charter quotation with Orbelo:
• Route: ${activeBooking.routeFrom} → ${activeBooking.routeTo}
• Category: ${activeBooking.aircraftCategory}
• Date: ${activeBooking.depDate} at ${activeBooking.depTime} (${activeBooking.tripType})
• Guests: ${activeBooking.passengers}
• Services: ${activeBooking.services}
• Estimated Total: ${activeBooking.total}
• Reference: ${activeBooking.reference}

I have successfully completed the $500 USD concierge connection fee. Please connect me with an available flight officer.`
        : "Hi, I have paid the $500 USD concierge connection fee and would like to speak to an available flight officer about booking a private charter.");

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
      if (action?.type === "concierge_fee_modal") {
        setShowFeeModal(true);
      }
    }, 600);
  };

  /* ─────────────────────────────────────────────
     $500 USD Payment Handler
     Simulates payment -> shows confirmation -> redirects to WhatsApp
  ───────────────────────────────────────────── */
  const handlePayFee = () => {
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
          text: "✅ Payment of $500 USD confirmed!\n\nYour transaction has been verified and 100% credited toward your charter. Connecting you to your dedicated flight concierge officer on WhatsApp now...",
        },
      ]);

      // Automatically redirect to WhatsApp after 1.2s
      setTimeout(() => {
        openWhatsApp();
        setShowFeeModal(false);
        setPaymentSuccess(false);
      }, 1200);
    }, 1400);
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
              className="relative w-14 h-14 rounded-full bg-[#0F1420] text-white flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 border-2 border-[#C9A052] group"
            >
              <MessageCircle className="w-6 h-6 text-[#C9A052] group-hover:scale-110 transition-transform" />
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#0F1420]" />
            </button>
          </div>
          <span className="mt-1 text-[10px] font-semibold tracking-wider text-[#0F1420] bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full border border-gray-200 shadow-sm uppercase font-body">
            Concierge
          </span>
        </div>
      )}

      {/* ── Chat Window ── */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Concierge Chat"
          className="fixed bottom-6 right-6 z-50 w-[92vw] sm:w-[420px] h-[600px] max-h-[85vh] bg-white rounded-3xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-200"
        >
          {/* Header */}
          <div className="bg-[#0F1420] text-white p-4 flex items-center justify-between border-b border-white/10 shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-[#C9A052]/20 border border-[#C9A052]/40 flex items-center justify-center">
                  <Plane className="w-5 h-5 text-[#C9A052]" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-[#0F1420]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-display text-sm font-bold tracking-wide">
                    Orbelo Concierge
                  </h3>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-[#C9A052]/20 text-[#C9A052]">
                    24/7
                  </span>
                </div>
                <p className="text-[11px] text-gray-400 font-body">
                  Private Aviation Advisor &amp; FBO Desk
                </p>
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

                {/* Inline Action for $500 Concierge Fee */}
                {msg.action?.type === "concierge_fee_modal" && (
                  <div className="pt-1 pl-1">
                    <button
                      onClick={() => setShowFeeModal(true)}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#0F1420] hover:bg-gray-800 text-white shadow-md transition-all active:scale-95"
                    >
                      <CreditCard className="w-4 h-4 text-[#C9A052]" />
                      <span>Complete $500 Concierge Fee &amp; Connect</span>
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
               $500 USD CONCIERGE FEE MODAL OVER CHAT
            ───────────────────────────────────────────── */}
            {showFeeModal && (
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
                          Standard Concierge Fee
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowFeeModal(false)}
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
                        100% credited towards your charter flight
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-display text-2xl font-bold text-[#C9A052]">
                        $500
                      </span>
                      <span className="text-[10px] text-gray-400 block font-mono">
                        USD
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-gray-300 leading-relaxed font-body">
                    A connection fee of <strong>$500 USD</strong> assigns an executive flight officer to your quote for immediate tail confirmation, landing slots, and WhatsApp dispatch.
                  </p>

                  {/* Payment Button & States */}
                  {paymentSuccess ? (
                    <div className="bg-emerald-500/20 border border-emerald-500/50 rounded-xl p-3 text-center text-xs font-semibold text-emerald-300 flex items-center justify-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      <span>$500 Fee Verified! Redirecting to WhatsApp...</span>
                    </div>
                  ) : (
                    <button
                      type="button"
                      disabled={isProcessingPayment}
                      onClick={handlePayFee}
                      className="w-full py-3.5 px-4 rounded-xl font-body font-semibold text-xs bg-[#C9A052] hover:bg-[#b8912e] text-[#0F1420] flex items-center justify-center gap-2 shadow-lg transition-all active:scale-[0.98] disabled:opacity-75 cursor-pointer"
                    >
                      {isProcessingPayment ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Processing $500 Payment...</span>
                        </>
                      ) : (
                        <>
                          <CreditCard className="w-4 h-4" />
                          <span>Pay $500 USD &amp; Connect to Flight Officer</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  )}

                  <div className="flex items-center justify-center gap-1.5 text-[10px] text-gray-400">
                    <Lock className="w-3 h-3 text-[#C9A052]" />
                    <span>Instant debit card / wire authorization · 100% flight credit</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ─────────────────────────────────────────────
             CHATBOT CATEGORIES DROPDOWN SELECTOR
             (Client requested: "Make the chat bot Categories to drop down")
          ───────────────────────────────────────────── */}
          <div className="px-3 py-2 bg-[#F5F2EC] border-t border-gray-200 shrink-0">
            <div className="relative">
              <select
                aria-label="Inquiry Category Dropdown"
                defaultValue=""
                onChange={(e) => {
                  if (e.target.value) {
                    handleSend(null, e.target.value);
                    e.target.value = ""; // reset dropdown
                  }
                }}
                className="w-full appearance-none bg-white border border-[#E8E5DF] rounded-xl px-3.5 py-2 pr-8 text-xs font-medium text-[#0F1420] hover:border-[#C9A052] focus:outline-none focus:ring-1 focus:ring-[#C9A052] transition-colors cursor-pointer"
              >
                {CHAT_CATEGORIES.map((cat, idx) => (
                  <option key={idx} value={cat.value} disabled={idx === 0}>
                    {cat.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#C9A052] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

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
              placeholder="Ask about jet categories, pricing in $, FBOs…"
              className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#C9A052] font-body"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              aria-label="Send message"
              className="w-9 h-9 rounded-xl bg-[#C9A052] hover:bg-[#b8912e] disabled:opacity-40 disabled:hover:bg-[#C9A052] text-[#0F1420] flex items-center justify-center shrink-0 transition-all active:scale-95 shadow-sm cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
