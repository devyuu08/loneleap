import { useState } from "react";
import { Link } from "react-router-dom";
import { useRecommendationList } from "hooks/useRecommendationList";
import RecommendationCard from "./RecommendationCard";
import HeroSection from "components/common/HeroSection";

const FILTERS = [
  "전체 지역",
  "서울",
  "인천",
  "경기도",
  "충청도",
  "전라도",
  "경상도",
  "강원도",
  "제주도",
];

export default function RecommendationList() {
  const { data: recommendations, isLoading, isError } = useRecommendationList();
  const [activeFilter, setActiveFilter] = useState("전체 지역");

  const filtered =
    activeFilter === "전체 지역"
      ? recommendations
      : recommendations?.filter((item) => item.location === activeFilter);

  if (isLoading) return <div className="p-10 text-center">불러오는 중...</div>;
  if (isError) return <div className="p-10 text-center">오류 발생</div>;
  if (!recommendations || recommendations.length === 0) {
    return (
      <div className="py-32 text-center text-gray-500">
        추천 여행지가 없습니다
      </div>
    );
  }

  return (
    <>
      {/* 추천 여행지 제목 + 필터 */}
      <HeroSection
        imageSrc="/images/recommendation-list-hero.jpg"
        align="center"
      >
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-extrabold drop-shadow">
            이런 지역은 어때요?
          </h2>
          <p className="text-sm text-white/90">
            혼자 여행하기 좋은 장소만 골라 소개합니다
          </p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-1.5 rounded-full text-sm border ${
                activeFilter === filter
                  ? "bg-white text-black"
                  : "bg-white/20 text-white hover:bg-white/30"
              } transition`}
            >
              {filter}
            </button>
          ))}
        </div>
      </HeroSection>

      {/* 추천 여행지 카드 섹션 */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        {!filtered || filtered.length === 0 ? (
          <div className="py-32 text-center text-gray-500">
            <p className="text-lg font-semibold mb-2">
              추천 여행지를 찾을 수 없어요
            </p>
            <p className="text-sm">
              추천 여행지를 준비 중입니다. 다른 지역을 선택해주세요.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((place) => (
              <RecommendationCard key={place.id} recommendation={place} />
            ))}
          </div>
        )}
      </section>

      {/* 일정 만들기 CTA 섹션 */}
      <section className="relative overflow-hidden py-24 px-6 bg-[#EDEDEA] text-center">
        {/* 블러 포인트 */}
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-white/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gray-300/20 rounded-full blur-2xl" />

        {/* 콘텐츠 */}
        <div className="relative z-10 max-w-xl mx-auto">
          <h3 className="text-2xl font-heading font-semibold text-gray-900 mb-3">
            이 계절, 당신만의 여정을 그려보세요.
          </h3>
          <p className="text-sm text-gray-600 mb-6 leading-relaxed">
            추천 여행지를 기반으로 나만의 감성을 담은 일정을 만들어보세요.
            <br />
            혼자 떠나지만, 당신의 여행은 언제나 특별하니까요.
          </p>
          <Link
            to="/itinerary"
            className="inline-block bg-black text-white px-6 py-2.5 rounded-full shadow-md hover:bg-gray-800 transition"
          >
            나만의 일정 만들기
          </Link>
        </div>
      </section>
    </>
  );
}
