"use client";

import Link from "next/link";
import { Instagram, Linkedin, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0F1420] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pt-16 md:pt-20 pb-12">
        {/* Main 4-column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 pb-16 border-b border-white/10">
          {/* Col 1: Brand & Bio */}
          <div className="space-y-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-white group focus:outline-none"
              aria-label="SKYVANTAGE Home"
            >
              <span className="font-display text-2xl font-bold tracking-widest text-white uppercase group-hover:text-gold-light transition-colors">
                SKYVANTAGE
              </span>
              <span className="text-gold text-xs font-bold leading-none transform -rotate-12 group-hover:rotate-0 transition-transform">
                ▲
              </span>
            </Link>

            <p className="text-sm font-body text-white/70 leading-relaxed max-w-sm">
              A higher perspective on private travel. Personally considered, from start to finish.
            </p>

            <div>
              <a
                href="mailto:charter@skyvantage.com"
                className="text-sm font-body text-white/90 hover:text-gold transition-colors inline-flex items-center gap-1.5"
              >
                <span>charter@skyvantage.com</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-gold" />
              </a>
            </div>

            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-gold hover:border-gold transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-gold hover:border-gold transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Private aviation */}
          <div>
            <h4 className="font-display text-base font-semibold text-white tracking-wide mb-6">
              Private aviation
            </h4>
            <ul className="space-y-3.5 text-sm font-body text-white/70">
              <li>
                <Link
                  href="/booking"
                  className="hover:text-white hover:translate-x-0.5 transition-all inline-block"
                >
                  Private charter
                </Link>
              </li>
              <li>
                <Link
                  href="/fleet"
                  className="hover:text-white hover:translate-x-0.5 transition-all inline-block"
                >
                  Aircraft categories
                </Link>
              </li>
              <li>
                <Link
                  href="/booking?type=group"
                  className="hover:text-white hover:translate-x-0.5 transition-all inline-block"
                >
                  Group travel
                </Link>
              </li>
              <li>
                <Link
                  href="/booking?type=business"
                  className="hover:text-white hover:translate-x-0.5 transition-all inline-block"
                >
                  Business travel
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Explore */}
          <div>
            <h4 className="font-display text-base font-semibold text-white tracking-wide mb-6">
              Explore
            </h4>
            <ul className="space-y-3.5 text-sm font-body text-white/70">
              <li>
                <Link
                  href="/destinations"
                  className="hover:text-white hover:translate-x-0.5 transition-all inline-block"
                >
                  Destinations
                </Link>
              </li>
              <li>
                <Link
                  href="/about#experience"
                  className="hover:text-white hover:translate-x-0.5 transition-all inline-block"
                >
                  Onboard experience
                </Link>
              </li>
              <li>
                <Link
                  href="/about#approach"
                  className="hover:text-white hover:translate-x-0.5 transition-all inline-block"
                >
                  Our approach
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-white hover:translate-x-0.5 transition-all inline-block"
                >
                  About SKYVANTAGE
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Here for you */}
          <div>
            <h4 className="font-display text-base font-semibold text-white tracking-wide mb-6">
              Here for you
            </h4>
            <ul className="space-y-3.5 text-sm font-body text-white/70">
              <li>
                <button
                  type="button"
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      window.dispatchEvent(new Event("open-concierge-chat"));
                    }
                  }}
                  className="hover:text-white hover:translate-x-0.5 transition-all inline-flex items-center gap-1.5 text-left cursor-pointer"
                >
                  <span>Contact concierge</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#C9A052]" />
                </button>
              </li>
              <li>
                <a
                  href="mailto:charter@skyvantage.com"
                  className="hover:text-white hover:translate-x-0.5 transition-all inline-block"
                >
                  Charter enquiries
                </a>
              </li>
              <li>
                <Link
                  href="/#faq"
                  className="hover:text-white hover:translate-x-0.5 transition-all inline-block"
                >
                  Frequently asked questions
                </Link>
              </li>
              <li>
                <a
                  href="https://wa.me/447010452726"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white hover:translate-x-0.5 transition-all inline-block"
                >
                  Request a call
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar & Legal Disclaimer */}
        <div className="pt-8 space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-body text-white/50">
            <p>© 2026 SKYVANTAGE. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms
              </Link>
              <Link href="/cookies" className="hover:text-white transition-colors">
                Cookies
              </Link>
            </div>
          </div>

          <p className="text-[11px] font-body text-white/40 leading-relaxed max-w-4xl">
            Flights are subject to operator confirmation, aircraft availability and applicable charter terms. Destination imagery is for inspiration.
          </p>
        </div>
      </div>
    </footer>
  );
}
