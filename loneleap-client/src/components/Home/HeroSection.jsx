import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function HeroSection() {
  const { user, isLoading } = useSelector((state) => state.user);

  if (isLoading) return null;

  const isLoggedIn = !!user;

  return (
    <section className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-32 px-6 text-center">
      <h1 className="text-4xl font-bold mb-4">
        혼자만의 특별한 여행을 위한 LoneLeap
      </h1>
      <p className="text-lg text-gray-300 mb-8">
        혼행족을 위한 감성 여행 플랫폼
      </p>
      <Link
        to={isLoggedIn ? "/itinerary" : "/login"}
        className="bg-white text-gray-900 font-semibold px-6 py-3 rounded-full"
      >
        {isLoggedIn ? "내 일정 보러가기" : "시작하기"}
      </Link>
    </section>
  );
}
