import Link from "next/link";
import { CheckCircle2, ArrowUpRight } from "lucide-react";

export default function CharterConfidence() {
  const checklist = [
    {
      title: "Know your operator",
      description:
        "Understand who operates your flight, the aircraft selected and the details of your itinerary.",
    },
    {
      title: "Clarity, before you commit",
      description:
        "Review the charter quote, inclusions and terms before confirming your journey.",
    },
    {
      title: "Discretion at every step",
      description:
        "Share your travel preferences privately with a dedicated charter concierge.",
    },
  ];

  return (
    <section className="bg-[#F5F2EC] py-20 md:py-28 px-6 md:px-12 lg:px-20 border-b border-[#EDE9DF]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column (60%) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="section-label">
              CARE BEHIND EVERY JOURNEY
            </div>

            <h2 className="heading-lg font-display text-[#0F1420] leading-tight">
              Confidence,
              <br />
              before takeoff.
            </h2>

            <p className="text-gray-600 font-body text-base md:text-lg leading-relaxed max-w-xl">
              Exceptional travel begins with considered decisions. We make room for the questions that matter.
            </p>

            {/* 3 Checklist Items */}
            <div className="space-y-6 pt-4 border-t border-[#E0DAD0]/60">
              {checklist.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-gold/15 flex items-center justify-center flex-shrink-0 text-gold mt-0.5">
                    <CheckCircle2 className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-[#0F1420] mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm font-body text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Link CTA */}
            <div className="pt-4">
              <Link
                href="/about#approach"
                className="link-arrow font-semibold text-[#0F1420] hover:text-gold transition-colors inline-flex items-center gap-2 group"
              >
                <span>Our approach to charter</span>
                <ArrowUpRight className="w-4 h-4 text-gold transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>

          {/* Right Column (40%) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden shadow-card border border-[#E0DAD0] bg-white">
              <img
                src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&fit=crop&q=80"
                alt="Pilot inspecting private aircraft"
                className="w-full h-[460px] md:h-[540px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
