import Hero from "@/components/landing/Hero";
import FlightSearch from "@/components/landing/FlightSearch";
import CharterAdvantage from "@/components/landing/CharterAdvantage";
import FleetPreview from "@/components/landing/FleetPreview";
import CabinExperience from "@/components/landing/CabinExperience";
import HowItWorks from "@/components/landing/HowItWorks";
import Destinations from "@/components/landing/Destinations";
import CharterConfidence from "@/components/landing/CharterConfidence";
import FAQ from "@/components/landing/FAQ";
import CTA from "@/components/landing/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <FlightSearch />
      <CharterAdvantage />
      <FleetPreview />
      <CabinExperience />
      <HowItWorks />
      <Destinations />
      <CharterConfidence />
      <FAQ />
      <CTA />
    </>
  );
}
