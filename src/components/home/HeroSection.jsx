import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function HeroSection() {
  const { user, isLoading } = useSelector((state) => state.user);
  if (isLoading) return null;

  const isLoggedIn = !!user;

  return (
    <section className="relative h-[80vh] text-white flex items-center justify-start overflow-hidden">
      <img
        src="/images/korea_han_river.jpg"
        alt="한강 저녁"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black bg-opacity-40" />

      <div className="relative z-10 px-12 py-24 text-left max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
          We are <span className="text-white">LoneLeap.</span>
        </h1>
        <p className="text-lg md:text-xl font-body text-gray-200 mb-8 leading-relaxed max-w-none">
          Your journey, your story — only with LoneLeap.
        </p>

        <Link
          to={isLoggedIn ? "/itinerary" : "/login"}
          className="inline-block border border-white text-white font-body px-6 py-3 rounded-full hover:bg-white hover:text-black transition-colors"
        >
          {isLoggedIn ? "내 일정 보러가기" : "여행 시작하기"}
        </Link>
      </div>
    </section>
  );
}
