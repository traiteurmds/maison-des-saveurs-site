"use client";

import VisionHero from "./components/VisionHero";
import ReceptionConfiguratorSection from "./components/ReceptionConfiguratorSection";
import RecentReceptionsSection from "./components/RecentReceptionsSection";

export default function Home() {
  return (
    <>
      <VisionHero />
      <ReceptionConfiguratorSection />
      <RecentReceptionsSection />
    </>
  );
}
