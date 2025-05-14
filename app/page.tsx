import FeatureSection from "@/components/landing-page/feature-section";
import Hero from "@/components/landing-page/hero";
import HowItWorks from "@/components/landing-page/how-it-works";
import JoinUs from "@/components/landing-page/join-us/page";
import StatsSection from "@/components/landing-page/stats-section";
import React from "react";

const page = () => {
  return (
    <div className="min-h-screen overflow-hidden">
      <Hero />
      <StatsSection />
      <FeatureSection />
      <JoinUs />
      <HowItWorks />
    </div>
  );
};

export default page;
