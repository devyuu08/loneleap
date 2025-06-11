import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const images = [
  "/images/Naejangsan.jpg",
  "/images/train_view.jpg",
  "/images/seoul_night.jpg",
];

/**
 * 홈페이지 히어로 섹션
 * - 자동 전환되는 배경 이미지 슬라이드
 * - 로그인 여부에 따라 CTA 버튼 경로 변경
 * - LoneLeap 브랜드 메시지 강조
 */

function MainHero() {
  const { user, isLoading } = useSelector((state) => state.user);
  const [current, setCurrent] = useState(0);

  const isLoggedIn = !!user;

  // 이미지 슬라이드 자동 전환 (5초 간격)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000); // 5초
    return () => clearInterval(interval);
  }, []);

  if (isLoading) return null;

  const heroImageClass =
    "absolute inset-0 w-full h-full object-cover transition-opacity duration-[3000ms] sm:duration-[5000ms]";
  const heroImageActive = "opacity-100";
  const heroImageInactive = "opacity-0";

  return (
    <section className="relative h-[70vh] sm:h-[80vh] md:h-[90vh] pt-16 text-white flex items-center justify-start overflow-hidden">
      {images.map((src, index) => (
        <img
          key={src}
          src={src}
          alt={`슬라이드 이미지 ${index + 1}`}
          loading="lazy"
          decoding="async"
          className={`${heroImageClass} ${
            index === current ? heroImageActive : heroImageInactive
          }`}
          style={{ willChange: "opacity", transform: "translateZ(0)" }}
        />
      ))}

      {/* 어두운 오버레이 */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent" />

      {/* 텍스트 콘텐츠 */}
      <div className="relative z-10 px-4 sm:px-8 md:px-12 py-16 sm:py-24 text-left max-w-2xl">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4">
          We are <span className="text-white">LoneLeap.</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl font-body text-gray-200 mb-8 leading-relaxed">
          Your journey, your story — only with LoneLeap.
        </p>
        <Link
          to={isLoggedIn ? "/mypage" : "/login"}
          className="inline-block border border-white text-white font-body font-medium px-4 py-2 rounded-full hover:bg-white hover:text-black transition-colors duration-500 text-xs sm:text-sm md:text-base"
          aria-label={isLoggedIn ? "내 일정 보러가기" : "여행 시작하기"}
        >
          {isLoggedIn ? "내 일정 보러가기" : "여행 시작하기"}
        </Link>
      </div>
    </section>
  );
}

export default React.memo(MainHero);
