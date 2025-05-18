import MainHero from "components/Home/MainHero";
import ReviewPreview from "components/Home/ReviewPreview";
import DestinationSlider from "components/home/DestinationSlider";
import RegionMapSection from "components/home/RegionMapSection";
import OpenChatSection from "components/home/OpenChatSection";
import NewsletterSection from "components/home/NewsletterSection";

export default function Home() {
  return (
    <>
      <MainHero />
      <DestinationSlider />
      <ReviewPreview />
      <RegionMapSection />
      <OpenChatSection />
      <NewsletterSection />
    </>
  );
}
