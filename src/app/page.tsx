import Hero from "@/components/landing/Hero";
import SearchBar from "@/components/landing/SearchBar";
import Destinations from "@/components/landing/Destinations";
import FleetPreview from "@/components/landing/FleetPreview";
import HowItWorks from "@/components/landing/HowItWorks";
import Stats from "@/components/landing/Stats";
import Testimonials from "@/components/landing/Testimonials";
import CTA from "@/components/landing/CTA";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-jet-950 flex flex-col">
      <Hero />
      <SearchBar />
      <Destinations />
      <FleetPreview />
      <HowItWorks />
      <Stats />
      <Testimonials />
      <CTA />
    </main>
  );
}
