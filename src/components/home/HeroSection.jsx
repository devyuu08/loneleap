import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const images = [
  "/images/korea_han_river.jpg", // 1. 고요한 시작
  "/images/train_view.jpg", // 2. 이동
  "/images/seoul_night.jpg", // 3. 회상/도착
];

export default function HeroSection() {
  const { user, isLoading } = useSelector((state) => state.user);
  const [current, setCurrent] = useState(0);

  const isLoggedIn = !!user;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 15000); // 15초
    return () => clearInterval(interval);
  }, []);

  if (isLoading) return null;

  return (
    <section className="relative h-[80vh] text-white flex items-center justify-start overflow-hidden">
      {/* 슬라이드 이미지 */}
      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`슬라이드 이미지 ${index + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[8000ms] ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* 어두운 오버레이 */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-transparent" />

      {/* 텍스트 콘텐츠 */}
      <div className="relative z-10 px-12 py-24 text-left max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
          We are <span className="text-white">LoneLeap.</span>
        </h1>
        <p className="text-lg md:text-xl font-body text-gray-200 mb-8 leading-relaxed max-w-none">
          Your journey, your story — only with LoneLeap.
        </p>

        <Link
          to={isLoggedIn ? "/mypage" : "/login"}
          className="inline-block border border-white text-white font-body font-medium px-4 py-2 rounded-full hover:bg-white hover:text-black transition-colors duration-500 text-sm md:text-base"
        >
          {isLoggedIn ? "내 일정 보러가기" : "여행 시작하기"}
        </Link>
      </div>
    </section>
  );
}
