import DestinationList from "components/Home/DestinationList";
import HeroSection from "components/Home/HeroSection";
import ReviewPreview from "components/Home/ReviewPreview";

export default function Home() {
  return (
    <>
      <HeroSection />
      <DestinationList />
      <ReviewPreview />
      {/* DestinationList, ReviewPreview는 이후 추가 */}
    </>
  );
}
