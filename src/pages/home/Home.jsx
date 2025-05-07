import HeroSection from "components/Home/HeroSection";
import ReviewPreview from "components/Home/ReviewPreview";
import DestinationSlider from "components/home/DestinationSlider";
import RegionMapSection from "components/home/RegionMapSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <DestinationSlider />
      <ReviewPreview />
      <RegionMapSection />
    </>
  );
}
