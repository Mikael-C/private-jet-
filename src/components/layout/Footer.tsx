"use client";

import Link from "next/link";
import { Plane, MapPin, Phone, Mail, ArrowRight, Instagram, Twitter, Facebook, Linkedin } from "lucide-react";

const footerLinks = {
  company: [
    { name: "About Us", href: "/about" },
    { name: "Our Fleet", href: "/fleet" },
    { name: "Destinations", href: "/destinations" },
    { name: "Safety", href: "/about#safety" },
    { name: "Careers", href: "#" },
  ],
  services: [
    { name: "Charter Flights", href: "/booking" },
    { name: "Group Charters", href: "/booking" },
    { name: "Cargo Charter", href: "/booking" },
    { name: "Empty Legs", href: "/fleet" },
    { name: "Jet Card", href: "#" },
  ],
  support: [
    { name: "Contact Us", href: "/contact" },
    { name: "FAQs", href: "#" },
    { name: "Terms & Conditions", href: "#" },
    { name: "Privacy Policy", href: "#" },
    { name: "Refund Policy", href: "#" },
  ],
};

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer className="relative bg-slate-50 dark:bg-jet-950 border-t border-slate-200 dark:border-white/5">
      {/* Newsletter CTA Bar */}
      <div className="max-w-7xl mx-auto px-6 -mt-16 relative z-10">
        <div className="glass-card rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 border border-gold/10">
          <div>
            <h3 className="text-2xl font-display font-bold text-jet-950 dark:text-white">
              Stay in the <span className="text-gold-gradient">Loop</span>
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              Get exclusive deals, empty leg alerts, and luxury travel insights.
            </p>
          </div>
          <div className="flex w-full md:w-auto gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="input-luxury flex-1 md:w-72"
            />
            <button className="btn-gold whitespace-nowrap flex items-center gap-2">
              Subscribe <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold to-gold-light flex items-center justify-center">
                <Plane className="w-5 h-5 text-jet-900 transform -rotate-45" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-display font-bold text-jet-950 dark:text-white">
                  Jet<span className="text-gold-gradient">Elite</span>
                </span>
                <span className="text-[9px] uppercase tracking-[0.3em] text-slate-500 -mt-1">
                  Private Aviation
                </span>
              </div>
            </Link>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-sm mb-6">
              Experience the pinnacle of private aviation. We connect discerning
              travelers with world-class aircraft for seamless, luxurious journeys
              anywhere in the world.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                <MapPin size={16} className="text-gold" />
                <span>Victoria Island, Lagos, Nigeria</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                <Phone size={16} className="text-gold" />
                <span>+234 800 JET ELITE</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                <Mail size={16} className="text-gold" />
                <span>charter@jetelite.com</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-body font-semibold uppercase tracking-wider text-jet-950 dark:text-white mb-5">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-500 dark:text-slate-400 hover:text-gold transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-body font-semibold uppercase tracking-wider text-jet-950 dark:text-white mb-5">
              Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-500 dark:text-slate-400 hover:text-gold transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-body font-semibold uppercase tracking-wider text-jet-950 dark:text-white mb-5">
              Support
            </h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-500 dark:text-slate-400 hover:text-gold transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-16 pt-8 border-t border-slate-200 dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} JetElite. All rights reserved. Luxury Private Aviation.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="w-9 h-9 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-gold hover:border-gold/30 transition-all duration-300"
              >
                <social.icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
