import Hero from "@/components/landing-page/hero";
import StatsSection from "@/components/landing-page/stats-section";
import FeatureSection from "@/components//landing-page/feature-section";
import JoinUs from "@/components/landing-page/join-us/page";
import HowItWorks from "@/components/landing-page/how-it-works";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Hero />
      <StatsSection />
      <FeatureSection />
      <JoinUs />
      <HowItWorks />
    </main>
  );
}
