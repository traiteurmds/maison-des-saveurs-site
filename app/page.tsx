"use client";

import VisionHero from "./components/VisionHero";
import TrustStatsSection from "./components/TrustStatsSection";
import ReceptionConfiguratorSection from "./components/ReceptionConfiguratorSection";
import ClientTestimonialsSection from "./components/ClientTestimonialsSection";
import WhyChooseSection from "./components/WhyChooseSection";
import HowItWorksSection from "./components/HowItWorksSection";

export default function Home() {
  return (
    <>
      <VisionHero />
      <TrustStatsSection />
      <ReceptionConfiguratorSection />
      <ClientTestimonialsSection />
      <WhyChooseSection />
      <HowItWorksSection />
    </>
  );
}
