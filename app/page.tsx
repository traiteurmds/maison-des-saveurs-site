import HomeHero from "./components/sections/HomeHero";
import ProofBar from "./components/sections/ProofBar";
import DishMarquee from "./components/sections/DishMarquee";
import Prestations from "./components/sections/Prestations";
import SignatureDishes from "./components/sections/SignatureDishes";
import ChefSection from "./components/sections/ChefSection";
import JourJ from "./components/sections/JourJ";
import Reviews from "./components/sections/Reviews";
import PhotoStrip from "./components/sections/PhotoStrip";
import ZonesFaq from "./components/sections/ZonesFaq";
import FinalCta from "./components/sections/FinalCta";

export default function Home() {
  return (
    <>
      <HomeHero />
      <ProofBar />
      <Prestations />
      <DishMarquee />
      <SignatureDishes />
      <ChefSection />
      <JourJ />
      <Reviews />
      <PhotoStrip />
      <ZonesFaq />
      <FinalCta />
    </>
  );
}
