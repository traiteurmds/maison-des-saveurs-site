"use client";

import VisionHero from "./components/VisionHero";
import Menu3DExperience from "./components/Menu3DExperience";
import VaisselleOptionsSection from "./components/VaisselleOptionsSection";
import ContactCTA from "./components/ContactCTA";

export default function Home() {
  return (
    <>
      <VisionHero />
      <Menu3DExperience />
      <VaisselleOptionsSection />
      <ContactCTA />
    </>
  );
}
