"use client";

import { MessageCircle } from "lucide-react";

export interface WhatsAppButtonProps {
  message?: string;
  label?: string;
  className?: string;
}

export default function WhatsAppButton({
  message = "Hi, I'd like to enquire about a private jet charter with SKYVANTAGE.",
  label,
  className = "",
}: WhatsAppButtonProps) {
  const whatsappUrl = `https://wa.me/447010452726?text=${encodeURIComponent(
    message
  )}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className={`fixed bottom-6 right-24 z-40 inline-flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 text-xs font-semibold font-body border border-white/20 ${className}`}
    >
      <MessageCircle className="w-5 h-5 shrink-0" />
      {label && <span>{label}</span>}
    </a>
  );
}
