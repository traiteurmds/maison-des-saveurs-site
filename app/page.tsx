import HeroZoom from "./components/home/HeroZoom";
import Manifesto from "./components/home/Manifesto";
import PlateShowcase from "./components/home/PlateShowcase";
import Occasions from "./components/home/Occasions";
import BigMarquee from "./components/home/BigMarquee";
import HorizontalGallery from "./components/home/HorizontalGallery";
import ReviewsQuote from "./components/home/ReviewsQuote";
import Process from "./components/home/Process";
import ZonesFaq from "./components/sections/ZonesFaq";
import ClosingCta from "./components/home/ClosingCta";

export default function Home() {
  return (
    <>
      <HeroZoom />
      <Manifesto />
      <PlateShowcase />
      <Occasions />
      <BigMarquee />
      <HorizontalGallery />
      <ReviewsQuote />
      <Process />
      <ZonesFaq />
      <ClosingCta />
    </>
  );
}
