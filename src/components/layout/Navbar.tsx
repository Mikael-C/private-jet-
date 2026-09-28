"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Plane } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { ThemeToggle } from "@/components/ui/ThemeToggle";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Fleet", href: "/fleet" },
  { name: "Destinations", href: "/destinations" },
  { name: "Booking", href: "/booking" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/80 dark:bg-jet-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-white/5 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold to-gold-light flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                <Plane className="w-5 h-5 text-jet-900 transform -rotate-45" />
              </div>
              <div className="absolute inset-0 w-10 h-10 rounded-xl bg-gold/20 blur-lg group-hover:bg-gold/30 transition-all duration-300" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-display font-bold text-jet-950 dark:text-white tracking-wide transition-colors">
                Jet<span className="text-gold-gradient">Elite</span>
              </span>
              <span className="text-[9px] uppercase tracking-[0.3em] text-slate-500 -mt-1">
                Private Aviation
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="relative text-sm font-body font-light text-slate-600 dark:text-slate-300 hover:text-jet-950 dark:hover:text-white transition-colors duration-300 group py-2"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link
              href="/booking"
              className="hidden md:inline-flex btn-gold text-xs"
            >
              Book Now
            </Link>
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="lg:hidden text-jet-950 dark:text-white p-2 hover:text-gold transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-white/98 dark:bg-jet-900/98 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileOpen(false)}
                    className="text-2xl font-display text-jet-950 dark:text-white hover:text-gold transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Link
                  href="/booking"
                  onClick={() => setIsMobileOpen(false)}
                  className="btn-gold mt-4"
                >
                  Book Now
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
