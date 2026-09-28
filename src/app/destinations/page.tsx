"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, MapPin, Clock } from "lucide-react";

type Region = "All" | "Europe" | "Middle East" | "Americas" | "Asia Pacific";

const regions: Region[] = ["All", "Europe", "Middle East", "Americas", "Asia Pacific"];

const destinations = [
  { city: "Paris", country: "France", region: "Europe", time: "7h 30m", price: "$45,000", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80", featured: true, desc: "Experience the romance and luxury of the City of Light." },
  { city: "Dubai", country: "UAE", region: "Middle East", time: "12h 15m", price: "$85,000", image: "https://images.unsplash.com/photo-1512453979436-5a50c640d04c?w=600&q=80", featured: true, desc: "Discover ultra-modern architecture and extravagant shopping." },
  { city: "New York", country: "USA", region: "Americas", time: "2h 45m", price: "$25,000", image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&q=80", featured: true, desc: "The city that never sleeps, accessible on your schedule." },
  { city: "London", country: "UK", region: "Europe", time: "7h 00m", price: "$42,000", image: "https://images.unsplash.com/photo-1513635269975-5969336cd100?w=600&q=80", featured: false },
  { city: "Monaco", country: "Monaco", region: "Europe", time: "8h 15m", price: "$50,000", image: "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=600&q=80", featured: false },
  { city: "Zurich", country: "Switzerland", region: "Europe", time: "8h 00m", price: "$48,000", image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=600&q=80", featured: false },
  { city: "Abu Dhabi", country: "UAE", region: "Middle East", time: "12h 30m", price: "$86,000", image: "https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=600&q=80", featured: false },
  { city: "Riyadh", country: "Saudi Arabia", region: "Middle East", time: "11h 45m", price: "$82,000", image: "https://images.unsplash.com/photo-1582202720235-90059b8be009?w=600&q=80", featured: false },
  { city: "Miami", country: "USA", region: "Americas", time: "2h 30m", price: "$22,000", image: "https://images.unsplash.com/photo-1514214246283-d427a95c5d2f?w=600&q=80", featured: false },
  { city: "Los Angeles", country: "USA", region: "Americas", time: "5h 15m", price: "$35,000", image: "https://images.unsplash.com/photo-1580659324422-c2cb40fbd6ed?w=600&q=80", featured: false },
  { city: "São Paulo", country: "Brazil", region: "Americas", time: "9h 30m", price: "$65,000", image: "https://images.unsplash.com/photo-1577484439121-7009e46a5991?w=600&q=80", featured: false },
  { city: "Tokyo", country: "Japan", region: "Asia Pacific", time: "14h 00m", price: "$110,000", image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=600&q=80", featured: false },
];

export default function DestinationsPage() {
  const [activeRegion, setActiveRegion] = useState<Region>("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    elements.forEach(el => observer.observe(el));

    return () => elements.forEach(el => observer.unobserve(el));
  }, []);

  const featured = destinations.filter(d => d.featured);
  
  const filteredDestinations = destinations.filter(d => {
    const matchesRegion = activeRegion === "All" || d.region === activeRegion;
    const matchesSearch = d.city.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          d.country.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-jet-950 text-jet-950 dark:text-white pt-24 pb-20 overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 mb-12">
        <div className="absolute inset-0 z-0">
          <Image src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600&q=80" alt="World Map" fill className="object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-jet-950/80 via-jet-950/50 to-jet-950" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center reveal-scale">
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 text-gold-gradient">Explore the World</h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-body mb-10">
            Arrive at any global destination with unparalleled speed, privacy, and luxury.
          </p>
          
          <div className="max-w-2xl mx-auto relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gold" />
            </div>
            <input 
              type="text" 
              className="w-full bg-white/80 dark:bg-jet-900/80 border border-gold/30 rounded-full py-4 pl-12 pr-6 text-jet-950 dark:text-white placeholder-slate-400 focus:outline-none focus:border-gold transition-all duration-300 backdrop-blur-sm"
              placeholder="Search by city or country..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      {searchQuery === "" && activeRegion === "All" && (
        <section className="container mx-auto px-4 mb-20">
          <h2 className="text-3xl font-display font-bold mb-8 text-jet-950 dark:text-white reveal">Featured Destinations</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {featured.map((dest, idx) => (
              <div key={idx} className={`relative rounded-2xl overflow-hidden h-[400px] group cursor-pointer reveal-${idx % 2 === 0 ? 'left' : 'right'}`}>
                <Image src={dest.image} alt={dest.city} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-jet-950 via-jet-950/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="flex justify-between items-end mb-2">
                    <h3 className="text-4xl font-display font-bold text-jet-950 dark:text-white group-hover:text-gold-light transition-colors duration-300">{dest.city}</h3>
                    <div className="bg-gold/20 backdrop-blur-md border border-gold/50 px-3 py-1 rounded-full text-sm font-semibold text-gold-light">
                      {dest.country}
                    </div>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 mb-6 line-clamp-2">{dest.desc}</p>
                  
                  <div className="flex justify-between items-center border-t border-slate-200 dark:border-white/20 pt-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                      <Clock className="w-4 h-4 text-gold" />
                      <span>Est. {dest.time}</span>
                    </div>
                    <span className="font-bold text-gold-gradient text-lg">From {dest.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Filter Tabs */}
      <section className="container mx-auto px-4 mb-10">
        <div className="flex flex-wrap justify-center gap-4 reveal">
          {regions.map((region) => (
            <button
              key={region}
              onClick={() => setActiveRegion(region)}
              className={`px-6 py-2 rounded-full font-body transition-all duration-300 ${
                activeRegion === region 
                  ? "bg-gold text-jet-950 font-bold shadow-[0_0_15px_rgba(212,175,55,0.5)]" 
                  : "bg-white dark:bg-jet-900 border border-gold/30 text-slate-600 dark:text-slate-300 hover:border-gold hover:text-jet-950 dark:text-white"
              }`}
            >
              {region}
            </button>
          ))}
        </div>
      </section>

      {/* All Destinations Grid */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredDestinations.map((dest, idx) => (
            <div key={idx} className="glass-card-hover rounded-xl overflow-hidden bg-white dark:bg-jet-900 border border-gold/20 flex flex-col h-full group reveal">
              <div className="relative h-48 overflow-hidden">
                <Image src={dest.image} alt={dest.city} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-display font-bold">{dest.city}</h3>
                    <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-sm mt-1">
                      <MapPin className="w-3 h-3 text-gold" />
                      <span>{dest.country}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-auto pt-4 border-t border-gold/20 space-y-2 text-sm">
                  <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
                    <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-gold" /> Flight Time</span>
                    <span>~{dest.time}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 dark:text-slate-400">Starting at</span>
                    <span className="font-bold text-gold-gradient">{dest.price}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredDestinations.length === 0 && (
          <div className="text-center py-20 text-slate-500 dark:text-slate-400 font-body reveal">
            <p className="text-xl mb-4">No destinations found matching your criteria.</p>
            <button onClick={() => {setSearchQuery(""); setActiveRegion("All");}} className="btn-outline-gold px-6 py-2">
              Clear Filters
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
