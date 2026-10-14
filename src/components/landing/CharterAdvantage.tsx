import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function CharterAdvantage() {
  const points = [
    {
      number: "01",
      title: "More time for what matters",
      description:
        "Depart closer to home. Arrive closer to your destination. Leave the queues behind.",
    },
    {
      number: "02",
      title: "Privacy without compromise",
      description:
        "A space to think, work or simply be. Your aircraft, your guests, your peace of mind.",
    },
    {
      number: "03",
      title: "Every detail, considered",
      description:
        "From cabin preferences to ground transfers, your journey feels seamless from the start.",
    },
  ];

  return (
    <section className="bg-[#F5F2EC] py-20 md:py-28 px-6 md:px-12 lg:px-20 border-b border-[#EDE9DF]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column (60%) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="section-label">
              THE SKYVANTAGE DIFFERENCE
            </div>

            <h2 className="heading-lg font-display text-[#0F1420] leading-tight">
              Less friction.
              <br />
              More possibility.
            </h2>

            <p className="text-gray-600 font-body text-base md:text-lg leading-relaxed max-w-xl">
              The freedom of private aviation is not just where you can go. It is how you feel getting there.
            </p>

            {/* 3 Numbered Points */}
            <div className="space-y-6 pt-4 border-t border-[#E0DAD0]/60">
              {points.map((point) => (
                <div key={point.number} className="flex items-start gap-5">
                  <span className="font-display text-2xl font-semibold text-gold leading-none pt-0.5 flex-shrink-0">
                    {point.number}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-[#0F1420] mb-1">
                      {point.title}
                    </h3>
                    <p className="text-sm font-body text-gray-600 leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Link CTA */}
            <div className="pt-4">
              <Link
                href="/booking"
                className="link-arrow font-semibold text-[#0F1420] hover:text-gold transition-colors inline-flex items-center gap-2 group"
              >
                <span>Discover private charter</span>
                <ArrowUpRight className="w-4 h-4 text-gold transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>

          {/* Right Column (40%) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden shadow-card border border-[#E0DAD0] bg-white">
              <img
                src="https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800&fit=crop&q=80"
                alt="Private jet with door open on the runway"
                className="w-full h-[460px] md:h-[540px] object-cover"
              />
              {/* Bottom Right Floating Badge */}
              <div className="absolute bottom-6 right-6 bg-[#0F1420]/85 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/10 text-right shadow-lg">
                <p className="text-xs font-display text-white italic">
                  A departure from the ordinary.
                </p>
                <p className="text-[10px] font-body tracking-widest text-gold uppercase font-semibold mt-0.5">
                  PRIVATE CHARTER
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
