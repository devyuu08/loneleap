import HeroSection from "components/Home/HeroSection";
import ReviewPreview from "components/Home/ReviewPreview";
import DestinationSlider from "components/home/DestinationSlider";
import RegionMapSection from "components/home/RegionMapSection";
import OpenChatSection from "components/home/OpenChatSection";
import NewsletterSection from "components/home/NewsletterSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <DestinationSlider />
      <ReviewPreview />
      <RegionMapSection />
      <OpenChatSection />
      <NewsletterSection />
    </>
  );
}
