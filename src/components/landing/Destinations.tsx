import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { destinations } from "@/data/destinations";

export default function Destinations() {
  const targetIds = ["nice-cote-dazur", "dubai", "new-york"];
  const featuredDestinations = targetIds
    .map((id) => destinations.find((d) => d.id === id))
    .filter(Boolean);

  return (
    <section className="bg-white py-20 md:py-28 px-6 md:px-12 lg:px-20 border-b border-gray-100">
      <div className="max-w-7xl mx-auto">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <div className="section-label">
              A WORLD CLOSER THAN YOU THINK
            </div>
            <h2 className="heading-lg font-display text-[#0F1420] mb-3">
              A world closer than you think.
            </h2>
            <p className="text-gray-600 font-body text-base leading-relaxed">
              From the Riviera to the Gulf, the islands to the skyline. Private charter changes what is possible.
            </p>
          </div>

          <div>
            <Link
              href="/destinations"
              className="link-arrow text-[#0F1420] hover:text-gold transition-colors inline-flex items-center gap-2 font-semibold text-sm group"
            >
              <span>View all destinations</span>
              <ArrowUpRight className="w-4 h-4 text-gold transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>

        {/* 3 Destination Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredDestinations.map((dest) => {
            if (!dest) return null;
            return (
              <div
                key={dest.id}
                className="card flex flex-col justify-between group border border-gray-100 bg-white"
              >
                {/* Image & City overlay */}
                <div className="relative h-72 overflow-hidden bg-gray-100">
                  <img
                    src={dest.image}
                    alt={`${dest.city}, ${dest.country}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F1420]/80 via-[#0F1420]/20 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <h3 className="font-display text-2xl font-bold text-white mb-0.5">
                      {dest.city}
                    </h3>
                    <p className="text-xs text-white/80 font-body">
                      {dest.country}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-gold mb-3 uppercase tracking-wider">
                      <Clock className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                      <span>{dest.flightTime}</span>
                    </div>

                    <p className="text-sm font-body text-gray-600 leading-relaxed mb-6">
                      {dest.description}
                    </p>
                  </div>

                  {/* Charter Link */}
                  <div>
                    <Link
                      href={`/booking?destination=${encodeURIComponent(dest.city)}`}
                      className="link-arrow font-semibold text-sm text-[#0F1420] hover:text-gold transition-colors inline-flex items-center gap-1.5 group/link"
                    >
                      <span>Charter to {dest.city}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-gold transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
