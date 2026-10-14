import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Tell us where. We take it from there.",
      description:
        "Share your destination, dates and who is coming along. We will get to know what matters to you.",
    },
    {
      step: "02",
      title: "Choose your perfect fit.",
      description:
        "Review tailored aircraft options and a clear quote. Your concierge guides you through every detail.",
    },
    {
      step: "03",
      title: "Arrive. Board. Exhale.",
      description:
        "With your flight confirmed, meet your crew and settle in. Your next chapter begins on your schedule.",
    },
  ];

  return (
    <section className="bg-[#F5F2EC] py-20 md:py-28 px-6 md:px-12 lg:px-20 border-b border-[#EDE9DF]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <div className="section-label">
            EFFORTLESS FROM THE FIRST ENQUIRY
          </div>
          <h2 className="heading-lg font-display text-[#0F1420]">
            Your next journey, in three simple steps.
          </h2>
        </div>

        {/* 3 Steps Grid with Gold Line Accent */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((item) => (
            <div key={item.step} className="flex flex-col">
              {/* Horizontal Gold Line Accent at Top */}
              <div className="w-full h-[2px] bg-gold mb-8" />

              {/* Gold Number */}
              <div className="font-display text-4xl lg:text-5xl font-bold text-gold mb-5">
                {item.step}
              </div>

              {/* Title */}
              <h3 className="font-display text-xl md:text-2xl font-bold text-[#0F1420] mb-3 leading-snug">
                {item.title}
              </h3>

              {/* Description */}
              <p className="font-body text-sm md:text-base text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="mt-16 pt-4">
          <Link
            href="/booking"
            className="btn-primary inline-flex items-center gap-2 group px-8 py-4 font-medium"
          >
            <span>Start your journey</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
