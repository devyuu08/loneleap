import HeroSection from "components/Home/HeroSection";
import ReviewPreview from "components/Home/ReviewPreview";
import DestinationSlider from "components/home/DestinationSlider";

export default function Home() {
  return (
    <>
      <HeroSection />
      <DestinationSlider />
      <ReviewPreview />
      {/* DestinationList, ReviewPreview는 이후 추가 */}
    </>
  );
}
