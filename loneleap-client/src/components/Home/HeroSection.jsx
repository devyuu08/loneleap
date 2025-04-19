import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function HeroSection() {
  const { user, isLoading } = useSelector((state) => state.user);

  if (isLoading) return null;

  const isLoggedIn = !!user;

  return (
    <section className="relative h-[80vh] text-white text-center flex items-center justify-center overflow-hidden">
      <img
        src="/images/korea_han_river.jpg"
        alt="한강 저녁"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black bg-opacity-30" />

      <div className="relative z-10 px-4">
        <h1 className="text-4xl font-bold mb-4">
          혼자만의 특별한 여행을 위한 LoneLeap
        </h1>
        <p className="text-lg text-gray-200 mb-8">
          혼행족을 위한 감성 여행 플랫폼
        </p>
        <Link
          to={isLoggedIn ? "/itinerary" : "/login"}
          className="bg-white text-gray-900 font-semibold px-6 py-3 rounded-full"
        >
          {isLoggedIn ? "내 일정 보러가기" : "시작하기"}
        </Link>
      </div>
    </section>
  );
}
