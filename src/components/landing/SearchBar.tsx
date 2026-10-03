"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, Users, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("One Way");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [passengers, setPassengers] = useState("1");

  const handleSearch = () => {
    const query = new URLSearchParams({
      tripType: activeTab,
      from,
      to,
      date,
      passengers
    }).toString();
    router.push(`/booking?${query}`);
  };

  return (
    <div className="w-full px-4 sm:px-6 z-20 relative -mt-20">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="max-w-5xl mx-auto glass-card rounded-2xl p-6 md:p-8 backdrop-blur-md bg-white/80 dark:bg-jet-900/80 border border-gold/20 shadow-2xl"
      >
        <div className="flex gap-6 mb-6 border-b border-slate-200 dark:border-white/10 pb-4">
          {["One Way", "Round Trip", "Multi City"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`font-medium text-sm transition-colors ${
                activeTab === tab ? "text-gold" : "text-slate-500 dark:text-slate-400 hover:text-slate-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">From</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gold/70" size={18} />
              <input value={from} onChange={(e) => setFrom(e.target.value)} type="text" placeholder="Departure City" className="input-luxury w-full pl-10 pr-4 py-3 bg-slate-50/50 dark:bg-jet-950/50 border border-slate-200 dark:border-white/10 rounded-lg text-jet-950 dark:text-white focus:outline-none focus:border-gold/50 transition-colors placeholder:text-slate-500" />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">To</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gold/70" size={18} />
              <input value={to} onChange={(e) => setTo(e.target.value)} type="text" placeholder="Arrival City" className="input-luxury w-full pl-10 pr-4 py-3 bg-slate-50/50 dark:bg-jet-950/50 border border-slate-200 dark:border-white/10 rounded-lg text-jet-950 dark:text-white focus:outline-none focus:border-gold/50 transition-colors placeholder:text-slate-500" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gold/70" size={18} />
              <input value={date} onChange={(e) => setDate(e.target.value)} type="date" className="input-luxury w-full pl-10 pr-4 py-3 bg-slate-50/50 dark:bg-jet-950/50 border border-slate-200 dark:border-white/10 rounded-lg text-jet-950 dark:text-white focus:outline-none focus:border-gold/50 transition-colors [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Passengers</label>
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gold/70" size={18} />
                <input value={passengers} onChange={(e) => setPassengers(e.target.value)} type="number" min="1" placeholder="2" className="input-luxury w-full pl-10 pr-4 py-3 bg-slate-50/50 dark:bg-jet-950/50 border border-slate-200 dark:border-white/10 rounded-lg text-jet-950 dark:text-white focus:outline-none focus:border-gold/50 transition-colors" />
              </div>
              <button onClick={handleSearch} className="btn-gold bg-gold hover:bg-gold-light text-jet-950 px-6 rounded-lg flex items-center justify-center transition-colors">
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
