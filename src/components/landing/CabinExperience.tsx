import Link from "next/link";
import { Armchair, Utensils, Wifi, ArrowUpRight } from "lucide-react";

export default function CabinExperience() {
  const features = [
    {
      icon: Armchair,
      label: "Comfort, without distraction",
    },
    {
      icon: Utensils,
      label: "Dining tailored to your preferences",
    },
    {
      icon: Wifi,
      label: "Stay connected, when you choose",
    },
  ];

  return (
    <section className="bg-[#0F1420] text-white py-20 md:py-28 px-6 md:px-12 lg:px-20 border-b border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Cabin Image */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-[#0B101A]">
              <img
                src="https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?w=800&fit=crop&q=80"
                alt="Luxury private jet cabin interior with cream leather seats"
                className="w-full h-[460px] md:h-[540px] object-cover"
              />
            </div>
          </div>

          {/* Right: Content */}
          <div className="lg:col-span-6 space-y-6">
            <div className="section-label-dark">
              A SPACE OF YOUR OWN
            </div>

            <h2 className="heading-lg font-display text-white leading-tight">
              The journey is
              <br />
              part of the destination.
            </h2>

            <p className="text-white/70 font-body text-base md:text-lg leading-relaxed max-w-xl font-light">
              Settle into a cabin made for unhurried moments. A quiet place to prepare, connect or switch off.
            </p>

            {/* 3 Features with Gold Icons */}
            <div className="space-y-4 pt-2 pb-4">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-gold/30 flex items-center justify-center flex-shrink-0 text-gold">
                    <feature.icon className="w-5 h-5 text-gold" />
                  </div>
                  <span className="text-white font-body text-sm md:text-base font-medium">
                    {feature.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Link Action */}
            <div className="pt-2">
              <Link
                href="/about#experience"
                className="link-arrow-white group inline-flex items-center gap-2"
              >
                <span>Explore the onboard experience</span>
                <ArrowUpRight className="w-4 h-4 text-gold transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>

            {/* Small print */}
            <div className="pt-2">
              <p className="text-xs font-body text-white/40">
                Amenities and connectivity depend on the selected aircraft.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
