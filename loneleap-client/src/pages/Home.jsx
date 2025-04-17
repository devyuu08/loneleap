import HeroSection from "../components/Home/HeroSection";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      {/* DestinationList, ReviewPreview는 이후 추가 */}
      <Footer />
    </>
  );
}
