"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";

const navLinks = [
  { name: "Private charter", href: "/booking" },
  { name: "Aircraft categories", href: "/fleet" },
  { name: "Destinations", href: "/destinations" },
  { name: "About us", href: "/about" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-[#0F1420]/95 backdrop-blur-md shadow-lg shadow-black/20 py-4"
          : "bg-[#0F1420] py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center focus:outline-none"
          aria-label="Orbelo Home"
        >
          <span
            className="font-display text-2xl md:text-3xl font-bold transition-opacity hover:opacity-90"
            style={{ color: "#FF6B00", fontFamily: "var(--font-manrope), sans-serif", letterSpacing: "-0.01em" }}
          >
            Orbelo
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-white text-sm font-body font-medium opacity-80 hover:opacity-100 transition-opacity"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right CTA Button */}
        <div className="hidden md:flex items-center">
          <button
            onClick={() => window.dispatchEvent(new Event("open-concierge-chat"))}
            className="btn-nav"
          >
            <span>Contact concierge</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-white focus:outline-none hover:text-gold transition-colors"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-down Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#0F1420] border-t border-white/10 px-6 py-6 transition-all duration-300">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white text-base font-body font-medium py-2 opacity-80 hover:opacity-100 hover:text-gold transition-all"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 mt-2 border-t border-white/10">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  window.dispatchEvent(new Event("open-concierge-chat"));
                }}
                className="btn-nav w-full justify-center text-center"
              >
                <span>Contact concierge</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
