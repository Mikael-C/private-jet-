"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  MessageCircle,
  X,
  Send,
  Plane,
  ArrowUpRight,
} from "lucide-react";

interface MessageAction {
  type: "whatsapp" | "booking_and_whatsapp" | "payment_whatsapp";
  whatsappText?: string;
}

interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  action?: MessageAction;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [hasInitialized, setHasInitialized] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Initial greeting sequence when opened for the first time
  useEffect(() => {
    if (isOpen && !hasInitialized) {
      setHasInitialized(true);
      setIsTyping(true);

      const timer1 = setTimeout(() => {
        setMessages([
          {
            id: "init-1",
            sender: "bot",
            text: "Hello! Welcome to SKYVANTAGE. I'm here to help with your private charter enquiry.",
          },
        ]);

        const timer2 = setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              id: "init-2",
              sender: "bot",
              text: "You can ask me about our aircraft, routes, pricing, or how to book. How can I help you today?",
            },
          ]);
          setIsTyping(false);
        }, 800);

        return () => clearTimeout(timer2);
      }, 500);

      return () => clearTimeout(timer1);
    }
  }, [isOpen, hasInitialized]);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const openWhatsApp = (customText?: string) => {
    const text =
      customText ||
      "Hi, I'd like to enquire about a private jet charter with SKYVANTAGE.";
    const url = `https://wa.me/447010452726?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const processUserMessage = (userText: string) => {
    const lower = userText.toLowerCase().trim();

    let botResponseText = "";
    let botAction: MessageAction | undefined = undefined;

    if (
      lower.includes("cost") ||
      lower.includes("price") ||
      lower.includes("how much") ||
      lower.includes("pricing")
    ) {
      botResponseText =
        "Private jet charter pricing depends on your route, aircraft, and travel dates. As a guide:\n\n• Light jets (6-7 pax): from £8,000\n• Super-midsize (8-9 pax): from £16,000\n• Ultra-long-range (14+ pax): from £40,000\n\nFor a tailored quote, I'll connect you with a concierge. 👋";
      botAction = {
        type: "whatsapp",
        whatsappText:
          "Hi, I'd like a tailored quote for a SKYVANTAGE private charter flight.",
      };
    } else if (
      lower.includes("aircraft") ||
      lower.includes("jet") ||
      lower.includes("plane") ||
      lower.includes("fleet")
    ) {
      botResponseText =
        "We have 8 aircraft in our charter fleet:\n\n• Citation CJ3+ — Light jet, 6-7 guests\n• Phenom 300E — Light jet, 6-8 guests\n• Learjet 75 — Midsize, 7-8 guests\n• Praetor 600 — Super-midsize, 8-9 guests\n• Challenger 350 — Super-midsize, 8-10 guests\n• Gulfstream G550 — Large, 14-16 guests\n• Gulfstream G650ER — Ultra-long-range, 12-18 guests\n• Global 7500 — Ultra-long-range, 14-19 guests\n\nWould you like to know more about a specific aircraft?";
    } else if (
      lower.includes("book") ||
      lower.includes("booking") ||
      lower.includes("reserve")
    ) {
      botResponseText =
        "Booking with SKYVANTAGE is simple:\n\n1️⃣ Tell us your route, dates and party size\n2️⃣ We match you with the right aircraft and send a clear quote\n3️⃣ Confirm and we handle everything\n\nYou can start a booking online, or speak directly with a concierge via WhatsApp for a more personal experience.";
      botAction = {
        type: "booking_and_whatsapp",
        whatsappText:
          "Hi, I'd like to book a private jet charter with SKYVANTAGE.",
      };
    } else if (
      lower.includes("pet") ||
      lower.includes("dog") ||
      lower.includes("cat") ||
      lower.includes("animal")
    ) {
      botResponseText =
        "Yes, many of our operators welcome pets with advance notice. We'll confirm pet policies for your specific aircraft and make sure your four-legged companions travel comfortably. Just mention it when you enquire!";
    } else if (
      lower.includes("includ") ||
      lower.includes("what's included") ||
      lower.includes("whats included")
    ) {
      botResponseText =
        "Your charter price includes:\n\n✅ The aircraft and full crew\n✅ Standard refreshments and water\n✅ Airport handling fees\n✅ Taxes and charges\n\nOptional additions include: signature catering, chauffeured transfers, and concierge services. All clearly itemised before you confirm.";
    } else if (lower.includes("cancel") || lower.includes("cancellation")) {
      botResponseText =
        "Our standard cancellation policy:\n\n• More than 7 days before departure: Full refund\n• 3–7 days before: 50% of charter fee\n• Less than 48 hours: Full charter fee applies\n\nFinal terms depend on the operator and are confirmed before booking. Your concierge can walk you through this in detail.";
    } else if (
      lower.includes("pay") ||
      lower.includes("payment") ||
      lower.includes("pay for") ||
      lower.includes("card") ||
      lower.includes("transfer")
    ) {
      botResponseText =
        "I'm going to connect you with your personal concierge to handle payment securely. They'll guide you through the final steps and answer any questions about the booking.";
      botAction = {
        type: "payment_whatsapp",
        whatsappText:
          "Hi, I'd like to discuss payment for my SKYVANTAGE charter booking.",
      };
    } else if (
      lower.includes("hello") ||
      lower.includes("hi") ||
      lower.includes("hey") ||
      lower.includes("good morning") ||
      lower.includes("good afternoon")
    ) {
      botResponseText =
        "Hello! Great to hear from you. I'm here to help with your SKYVANTAGE charter enquiry. What can I help you with today?";
    } else if (
      lower.includes("whatsapp") ||
      lower.includes("speak") ||
      lower.includes("talk") ||
      lower.includes("human") ||
      lower.includes("person") ||
      lower.includes("agent") ||
      lower.includes("concierge")
    ) {
      botResponseText =
        "Of course! Let me connect you with a concierge right now.";
      botAction = {
        type: "whatsapp",
        whatsappText:
          "Hi, I'd like to speak with a SKYVANTAGE concierge directly.",
      };
    } else if (
      lower.includes("destination") ||
      lower.includes("where") ||
      lower.includes("fly to") ||
      lower.includes("route")
    ) {
      botResponseText =
        "We fly globally — wherever you need to go. Some popular destinations:\n\n✈ Nice & French Riviera (2h from London)\n✈ Dubai (6.5h from London)\n✈ New York (7.5h from London)\n✈ Santorini (3.5h from London)\n✈ Maldives (10h from London)\n\nDon't see your destination? We can fly almost anywhere — just ask!";
    } else {
      botResponseText =
        "That's a great question. For the most accurate answer, I'd recommend speaking directly with one of our concierges — they can give you tailored advice for your specific journey.";
      botAction = {
        type: "whatsapp",
        whatsappText:
          "Hi, I have a specific question about chartering with SKYVANTAGE.",
      };
    }

    // Simulate 800ms typing indicator
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: botResponseText,
          action: botAction,
        },
      ]);
      setIsTyping(false);
    }, 800);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputText.trim();
    if (!trimmed) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: trimmed,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    processUserMessage(trimmed);
  };

  return (
    <>
      {/* Closed State: Floating Round Navy Button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center">
          <div className="relative">
            {/* Pulsing Gold Ring Animation */}
            <span className="absolute -inset-1.5 rounded-full bg-[#C9A052]/40 animate-ping opacity-75 pointer-events-none" />
            <span className="absolute -inset-1 rounded-full bg-[#C9A052]/20 animate-pulse pointer-events-none" />

            <button
              onClick={handleOpen}
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

      {/* Open State: Floating Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] h-[520px] max-h-[calc(100vh-5rem)] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Header (Navy) */}
          <div className="bg-[#0F1420] text-white p-4 rounded-t-2xl flex items-center justify-between shrink-0 border-b border-[#C9A052]/20">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#C9A052]/20 flex items-center justify-center text-[#C9A052] shrink-0 border border-[#C9A052]/40">
                <Plane className="w-4 h-4 transform -rotate-45" />
              </div>
              <div>
                <h3 className="font-display text-sm font-bold text-white tracking-wide">
                  Chat with SKYVANTAGE
                </h3>
                <div className="flex items-center gap-1.5 text-[11px] text-[#C9A052] font-body">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Typically replies instantly</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleClose}
              aria-label="Close chat"
              className="w-8 h-8 rounded-full hover:bg-white/10 text-gray-400 hover:text-white flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-gray-50/50">
            {messages.map((msg) => (
              <div key={msg.id} className="space-y-2">
                <div
                  className={
                    msg.sender === "user"
                      ? "chatbot-bubble-user"
                      : "chatbot-bubble-bot"
                  }
                >
                  <p className="whitespace-pre-line leading-relaxed text-[13px]">
                    {msg.text}
                  </p>
                </div>

                {/* CTAs / Action buttons rendered below specific bot messages */}
                {msg.action && (
                  <div className="flex flex-col gap-2 pt-1 pl-1">
                    {msg.action.type === "whatsapp" && (
                      <button
                        onClick={() => openWhatsApp(msg.action?.whatsappText)}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-sm transition-transform active:scale-95 w-fit"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Chat on WhatsApp</span>
                      </button>
                    )}

                    {msg.action.type === "payment_whatsapp" && (
                      <button
                        onClick={() => openWhatsApp(msg.action?.whatsappText)}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-md transition-transform active:scale-95 w-fit"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Complete booking on WhatsApp ↗</span>
                      </button>
                    )}

                    {msg.action.type === "booking_and_whatsapp" && (
                      <div className="flex items-center gap-2 flex-wrap">
                        <Link
                          href="/booking"
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#0F1420] text-white hover:bg-gray-800 transition-colors"
                        >
                          <span>Book online →</span>
                        </Link>
                        <button
                          onClick={() => openWhatsApp(msg.action?.whatsappText)}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#25D366] hover:bg-[#20bd5a] text-white transition-colors"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>WhatsApp ↗</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="chatbot-bubble-bot flex items-center gap-1.5 py-3 w-16">
                <span className="w-2 h-2 rounded-full bg-[#C9A052] animate-bounce [animation-delay:-0.3s]" />
                <span className="w-2 h-2 rounded-full bg-[#C9A052] animate-bounce [animation-delay:-0.15s]" />
                <span className="w-2 h-2 rounded-full bg-[#C9A052] animate-bounce" />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form
            onSubmit={handleSend}
            className="p-3 bg-white border-t border-gray-100 flex items-center gap-2 shrink-0"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask about aircraft, routes, pricing..."
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
