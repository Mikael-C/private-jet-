import Link from "next/link";
import {
  ArrowUpRight,
  Shield,
  EyeOff,
  UserCheck,
  CheckCircle,
  MessageCircle,
  Compass,
  FileText,
  Sparkles,
  PlaneTakeoff,
} from "lucide-react";

export default function AboutPage() {
  const whatsappUrl = `https://wa.me/447010452726?text=${encodeURIComponent(
    "Hi, I'd like to speak with a concierge about planning private charter flights with SKYVANTAGE."
  )}`;

  const bookingSteps = [
    {
      number: "01",
      title: "Share your journey requirements",
      description:
        "Tell us your destination, departure date, timing preference and party size. Whether you need a short regional flight or an intercontinental journey, our team reviews aircraft availability instantly.",
      icon: Compass,
    },
    {
      number: "02",
      title: "Receive curated aircraft options",
      description:
        "Within 60 minutes, your dedicated concierge presents an itemised selection of vetted aircraft suited to your mission, with clear, all-inclusive pricing and exact cabin specifications.",
      icon: FileText,
    },
    {
      number: "03",
      title: "Seamless confirmation & contracts",
      description:
        "Confirm your flight with a straightforward digital agreement and secure payment options. No opaque broker fees, no complicated jet card lock-ins.",
      icon: Shield,
    },
    {
      number: "04",
      title: "Personalised itinerary & bespoke details",
      description:
        "From gourmet Michelin-standard dining and sommelier selections to ramp-side tarmac chauffeur transfers and special luggage arrangements, every detail is tailored around you.",
      icon: Sparkles,
    },
    {
      number: "05",
      title: "Effortless departure on your schedule",
      description:
        "Arrive at the private FBO terminal just 15 minutes prior to departure. Walk directly through expedited private screening and board your aircraft on your exact schedule.",
      icon: PlaneTakeoff,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-[#F5F2EC] pt-32 pb-20 md:pt-40 md:pb-28 px-6 md:px-12 lg:px-20 border-b border-[#E8E5DF]">
        <div className="max-w-7xl mx-auto">
          <p className="section-label">ABOUT SKYVANTAGE</p>
          <h1 className="heading-xl text-[#0F1420] max-w-4xl mb-6 whitespace-pre-line">
            {"A higher perspective\non private travel."}
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl font-body font-light leading-relaxed">
            We exist because exceptional travel should be simple, transparent
            and genuinely personal.
          </p>
        </div>
      </section>

      {/* Our Story Section (White) */}
      <section className="py-20 md:py-28 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column (Content) */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#C9A052] font-body block">
                — OUR STORY
              </span>
              <h2 className="heading-lg text-[#0F1420]">
                Private aviation, made personal.
              </h2>
              <div className="space-y-5 text-base md:text-lg text-gray-700 font-body leading-relaxed">
                <p>
                  SKYVANTAGE was founded with a straightforward belief: private
                  jet charter should be uncomplicated, honest, and truly shaped
                  around the traveller. For too long, the industry has relied on
                  opaque pricing structures, complex jet card commitments, and
                  impersonal call centres.
                </p>
                <p>
                  Every client who flies with SKYVANTAGE is assigned a dedicated
                  concierge — a seasoned aviation specialist who takes the time
                  to understand your personal travel style, schedule nuances, and
                  cabin preferences. From your first initial enquiry until you
                  touch down at your final destination, you have one trusted point
                  of contact.
                </p>
                <p>
                  We partner exclusively with a rigorously audited global network
                  of certified Air Operator Certificate (AOC) holders. Every
                  aircraft, crew, and maintenance record meets the highest
                  international aviation safety benchmarks (including ARGUS and
                  WYVERN standards), giving you complete peace of mind in every
                  mile flown.
                </p>
              </div>
            </div>

            {/* Right Column (Image) */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-100 group">
                <img
                  src="https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?w=800&fit=crop"
                  alt="SKYVANTAGE Luxury Jet Cabin"
                  className="w-full h-[520px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1420]/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-white/90 backdrop-blur-md border border-white/40">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#C9A052] block font-body">
                    A HIGHER STANDARD
                  </span>
                  <p className="text-xs text-[#0F1420] font-body font-medium mt-0.5">
                    Uncompromising craftsmanship, bespoke service, and quiet luxury.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section (Cream) */}
      <section className="py-20 md:py-28 px-6 md:px-12 lg:px-20 bg-[#F5F2EC] border-y border-[#E8E5DF]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-16">
            <p className="section-label">OUR CORE PRINCIPLES</p>
            <h2 className="heading-lg text-[#0F1420] mb-4">
              Values that guide every flight.
            </h2>
            <p className="text-gray-700 font-body text-base md:text-lg">
              We hold ourselves to three core commitments that shape every
              interaction and itinerary.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Value 1 */}
            <div className="card p-8 md:p-10 bg-white">
              <div className="w-12 h-12 rounded-xl bg-[#F5F2EC] text-[#C9A052] flex items-center justify-center mb-6">
                <Shield className="w-6 h-6" />
              </div>
              <span className="font-display text-2xl font-bold text-[#C9A052] block mb-2">
                01
              </span>
              <h3 className="font-display text-2xl font-bold text-[#0F1420] mb-3">
                Transparency
              </h3>
              <p className="text-gray-600 font-body leading-relaxed text-sm md:text-base">
                Clear pricing, no surprises. You see exactly what you&apos;re
                paying for before you commit. No hidden positioning charges,
                unexpected fuel surcharges, or post-flight invoices.
              </p>
            </div>

            {/* Value 2 */}
            <div className="card p-8 md:p-10 bg-white">
              <div className="w-12 h-12 rounded-xl bg-[#F5F2EC] text-[#C9A052] flex items-center justify-center mb-6">
                <EyeOff className="w-6 h-6" />
              </div>
              <span className="font-display text-2xl font-bold text-[#C9A052] block mb-2">
                02
              </span>
              <h3 className="font-display text-2xl font-bold text-[#0F1420] mb-3">
                Discretion
              </h3>
              <p className="text-gray-600 font-body leading-relaxed text-sm md:text-base">
                Your travel is private. Every detail of your journey is handled
                with complete confidentiality. We operate under strict privacy
                protocols trusted by high-net-worth travellers, executives, and
                dignitaries.
              </p>
            </div>

            {/* Value 3 */}
            <div className="card p-8 md:p-10 bg-white">
              <div className="w-12 h-12 rounded-xl bg-[#F5F2EC] text-[#C9A052] flex items-center justify-center mb-6">
                <UserCheck className="w-6 h-6" />
              </div>
              <span className="font-display text-2xl font-bold text-[#C9A052] block mb-2">
                03
              </span>
              <h3 className="font-display text-2xl font-bold text-[#0F1420] mb-3">
                Personal care
              </h3>
              <p className="text-gray-600 font-body leading-relaxed text-sm md:text-base">
                One dedicated concierge from first enquiry to arrival. We&apos;re
                with you every step. Your concierge anticipates your preferences,
                manages flight tracking in real time, and is always a message away.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach Section (White) */}
      <section className="py-20 md:py-28 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-16">
            <p className="section-label">HOW WE WORK</p>
            <h2 className="heading-lg text-[#0F1420] mb-4">
              From first enquiry to departure.
            </h2>
            <p className="text-gray-700 font-body text-base md:text-lg">
              Five clear steps to take you anywhere in the world on your exact terms.
            </p>
          </div>

          <div className="space-y-6">
            {bookingSteps.map((step) => {
              const StepIcon = step.icon;
              return (
                <div
                  key={step.number}
                  className="p-8 md:p-10 rounded-2xl border border-gray-200 hover:border-[#C9A052]/50 transition-all duration-300 bg-white group hover:shadow-lg"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    <div className="lg:col-span-3 flex items-center gap-4">
                      <span className="font-display text-3xl md:text-4xl font-bold text-[#C9A052]">
                        {step.number}
                      </span>
                      <div className="w-10 h-10 rounded-full bg-[#F5F2EC] flex items-center justify-center text-[#0F1420] group-hover:bg-[#0F1420] group-hover:text-white transition-colors">
                        <StepIcon className="w-5 h-5" />
                      </div>
                    </div>

                    <div className="lg:col-span-4">
                      <h3 className="font-display text-xl md:text-2xl font-bold text-[#0F1420]">
                        {step.title}
                      </h3>
                    </div>

                    <div className="lg:col-span-5">
                      <p className="text-sm md:text-base text-gray-600 font-body leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section (Navy) */}
      <section className="bg-[#0F1420] text-white py-20 md:py-28 px-6 md:px-12 lg:px-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#C9A052] font-body block mb-4">
            BEGIN YOUR JOURNEY
          </span>
          <h2 className="heading-xl text-white mb-6">Ready to fly?</h2>
          <p className="text-lg md:text-xl text-gray-300 font-body font-light max-w-2xl mx-auto mb-10 leading-relaxed">
            Tell us where you want to go. Our private aviation concierges are
            standing by to prepare your bespoke flight proposal.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/booking"
              className="btn-primary flex items-center justify-center gap-2 text-sm px-8 py-4 font-semibold w-full sm:w-auto"
            >
              <span>Start your journey</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline flex items-center justify-center gap-2 text-sm px-8 py-4 w-full sm:w-auto"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Speak to our concierge</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
