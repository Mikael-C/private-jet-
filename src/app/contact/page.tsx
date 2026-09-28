"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, MapPin, Clock, ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "How far in advance should I book my private jet?",
    answer: "While we can accommodate requests with as little as 4 hours notice depending on aircraft availability, we recommend booking 2-4 weeks in advance to ensure the best selection of aircraft and preferred departure times."
  },
  {
    question: "How is the pricing determined for a charter flight?",
    answer: "Pricing is based on aircraft type, flight duration, repositioning fees (if applicable), landing fees, and selected extras like catering or ground transport. We provide transparent, all-inclusive quotes."
  },
  {
    question: "What is your cancellation policy?",
    answer: "Cancellation terms vary depending on the aircraft and operator. Generally, cancellations made more than 72 hours before departure incur a small fee, while closer cancellations may result in higher charges."
  },
  {
    question: "How much luggage can I bring?",
    answer: "Luggage capacity depends heavily on the selected aircraft. Light jets typically hold 4-5 standard bags, while Heavy jets can accommodate 15-20. Please specify your luggage needs when booking."
  },
  {
    question: "Can I travel with my pets?",
    answer: "Yes! Many of our partner aircraft are pet-friendly. Please inform us during the booking process so we can ensure the selected aircraft and crew can accommodate your furry companions."
  }
];

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <main className="min-h-screen pt-24 pb-16 bg-slate-50 dark:bg-jet-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="text-center mb-16 reveal">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-jet-950 dark:text-white mb-4">
            Get in <span className="text-gold-gradient">Touch</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-body text-lg max-w-2xl mx-auto">
            Our aviation experts are available 24/7 to assist you with inquiries, bookings, and customized travel solutions.
          </p>
        </div>

        {/* Contact Form & Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
          
          {/* Form */}
          <div className="glass-card p-8 md:p-10 reveal-left">
            <h2 className="text-2xl font-display text-jet-950 dark:text-white mb-6">Send us a Message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-slate-500 dark:text-slate-400">Your Name</label>
                  <input type="text" className="input-luxury w-full" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-slate-500 dark:text-slate-400">Email Address</label>
                  <input type="email" className="input-luxury w-full" placeholder="john@example.com" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-slate-500 dark:text-slate-400">Phone Number</label>
                  <input type="tel" className="input-luxury w-full" placeholder="+1 (555) 000-0000" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-slate-500 dark:text-slate-400">Subject</label>
                  <div className="relative">
                    <select className="input-luxury w-full appearance-none">
                      <option>General Inquiry</option>
                      <option>Charter Request</option>
                      <option>Quote Request</option>
                      <option>Partnership</option>
                      <option>Support</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gold/60 pointer-events-none" size={16} />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-slate-500 dark:text-slate-400">Message</label>
                <textarea rows={5} className="input-luxury w-full resize-none" placeholder="How can we help you?"></textarea>
              </div>

              <button type="button" className="btn-gold w-full py-4 text-lg">
                Send Message
              </button>
            </form>
          </div>

          {/* Info Cards */}
          <div className="space-y-6 reveal-right">
            <div className="glass-card-hover p-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center shrink-0">
                <Phone className="text-gold" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-display text-jet-950 dark:text-white mb-2">Call Us</h3>
                <p className="text-slate-500 dark:text-slate-400 mb-1">US Toll-Free: +1 (800) JET-ELITE</p>
                <p className="text-slate-500 dark:text-slate-400">International: +44 20 7123 4567</p>
              </div>
            </div>

            <div className="glass-card-hover p-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center shrink-0">
                <Mail className="text-gold" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-display text-jet-950 dark:text-white mb-2">Email Us</h3>
                <p className="text-slate-500 dark:text-slate-400 mb-1">Bookings: charter@jetelite.com</p>
                <p className="text-slate-500 dark:text-slate-400">Support: support@jetelite.com</p>
              </div>
            </div>

            <div className="glass-card-hover p-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center shrink-0">
                <MapPin className="text-gold" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-display text-jet-950 dark:text-white mb-2">Headquarters</h3>
                <p className="text-slate-500 dark:text-slate-400">100 Aviation Way, Suite 500<br/>New York, NY 10001<br/>United States</p>
              </div>
            </div>

            <div className="glass-card-hover p-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center shrink-0">
                <Clock className="text-gold" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-display text-jet-950 dark:text-white mb-2">Operating Hours</h3>
                <p className="text-slate-500 dark:text-slate-400">24 Hours a Day<br/>7 Days a Week<br/>365 Days a Year</p>
              </div>
            </div>
          </div>
        </div>

        {/* Global Offices */}
        <div className="mb-24 reveal-scale">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-display text-jet-950 dark:text-white mb-4">Our <span className="text-gold-gradient">Offices</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { city: "London", region: "Europe", address: "15 Berkeley Square, Mayfair", phone: "+44 20 7123 4567" },
              { city: "Dubai", region: "Middle East", address: "Boulevard Plaza Tower 1", phone: "+971 4 123 4567" },
              { city: "Lagos", region: "Africa", address: "Murtala Muhammed Airport", phone: "+234 1 234 5678" }
            ].map((office) => (
              <div key={office.city} className="bg-white dark:bg-jet-900 border border-jet-800 rounded-xl p-6 hover:border-gold/30 transition-colors">
                <p className="text-gold text-sm font-semibold mb-1">{office.region}</p>
                <h3 className="text-2xl font-display text-jet-950 dark:text-white mb-4">{office.city}</h3>
                <p className="text-slate-500 dark:text-slate-400 mb-2">{office.address}</p>
                <p className="text-slate-600 dark:text-slate-300">{office.phone}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="max-w-3xl mx-auto reveal">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-display text-jet-950 dark:text-white mb-4">Frequently Asked <span className="text-gold-gradient">Questions</span></h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white dark:bg-jet-900 border border-jet-800 rounded-xl overflow-hidden">
                <button
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="text-lg font-medium text-jet-950 dark:text-white">{faq.question}</span>
                  <ChevronDown
                    className={`text-gold transition-transform duration-300 ${openFaq === index ? "rotate-180" : ""}`}
                    size={20}
                  />
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 text-slate-500 dark:text-slate-400 leading-relaxed border-t border-jet-800/50 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
