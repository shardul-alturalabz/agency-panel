import FeatureSection from "@/components/landing-page/feature-section";
import Hero from "@/components/landing-page/hero";
import JoinUs from "@/components/landing-page/join-us/page";
import StatsSection from "@/components/landing-page/stats-section";
import React from "react";

const page = () => {
  return (
    <div>
      <Hero />
      <StatsSection />
      <FeatureSection />
      <JoinUs />
    </div>
  );
};

export default page;
