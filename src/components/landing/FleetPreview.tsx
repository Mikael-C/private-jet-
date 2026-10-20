import Link from "next/link";
import { ArrowUpRight, Users, Compass } from "lucide-react";
import { fleetData } from "@/data/fleet";

export default function FleetPreview() {
  const targetIds = ["citation-cj3-plus", "praetor-600", "gulfstream-g650er"];
  const featuredAircraft = targetIds
    .map((id) => fleetData.find((jet) => jet.id === id))
    .filter(Boolean);

  return (
    <section className="bg-white py-20 md:py-28 px-6 md:px-12 lg:px-20 border-b border-gray-100">
      <div className="max-w-7xl mx-auto">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <div className="section-label">
              AIRCRAFT CATEGORIES
            </div>
            <h2 className="heading-lg font-display text-[#0F1420] mb-3">
              The right category. For your journey.
            </h2>
            <p className="text-gray-600 font-body text-base leading-relaxed">
              From nimble regional turboprops to transcontinental flagships, discover the aircraft category that fits your mission.
            </p>
          </div>

          <div>
            <Link
              href="/fleet"
              className="link-arrow text-[#0F1420] hover:text-gold transition-colors inline-flex items-center gap-2 font-semibold text-sm group"
            >
              <span>View aircraft categories</span>
              <ArrowUpRight className="w-4 h-4 text-gold transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>

        {/* 3 Aircraft Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredAircraft.map((jet) => {
            if (!jet) return null;
            return (
              <div
                key={jet.id}
                className="card flex flex-col justify-between group border border-gray-100 bg-white"
              >
                {/* Image Container */}
                <div>
                  <div className="relative h-64 overflow-hidden bg-gray-100">
                    <img
                      src={jet.imageExterior}
                      alt={jet.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-[#0F1420]/80 backdrop-blur-md text-gold text-[10px] font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full border border-white/10">
                        {jet.categoryLabel}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 md:p-8">
                    <h3 className="font-display text-2xl font-bold text-[#0F1420] mb-3 group-hover:text-gold transition-colors">
                      {jet.name}
                    </h3>

                    {/* Meta info */}
                    <div className="flex flex-wrap items-center gap-4 text-xs font-body text-gray-500 mb-4 pb-4 border-b border-gray-100">
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-gold" />
                        <span>{jet.passengersLabel}</span>
                      </div>
                      <span className="text-gray-300">•</span>
                      <div className="flex items-center gap-1.5">
                        <Compass className="w-3.5 h-3.5 text-gold" />
                        <span>{jet.travelType}</span>
                      </div>
                    </div>

                    <p className="text-sm font-body text-gray-600 leading-relaxed mb-6">
                      {jet.tagline}
                    </p>
                  </div>
                </div>

                {/* Card Action */}
                <div className="px-6 md:px-8 pb-6 md:pb-8 pt-0">
                  <Link
                    href={`/fleet/${jet.id}`}
                    className="link-arrow font-semibold text-sm text-[#0F1420] hover:text-gold transition-colors inline-flex items-center gap-2 group/link"
                  >
                    <span>Explore aircraft</span>
                    <ArrowUpRight className="w-4 h-4 text-gold transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Disclaimer */}
        <div className="mt-12 text-center">
          <p className="text-xs font-body text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Aircraft shown are representative charter options. Cabin configuration, passenger capacity and availability vary by aircraft and itinerary.
          </p>
        </div>
      </div>
    </section>
  );
}
