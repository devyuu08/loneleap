import { Link } from "react-router-dom";
import RecommendationCard from "@/components/recommendation/RecommendationCard";
import HeroWithFilterSearch from "@/components/common/layout/HeroWithFilterSearch";
import LoadingSpinner from "@/components/common/loading/LoadingSpinner";
import ErrorMessage from "@/components/common/feedback/ErrorMessage";
import EmptyState from "@/components/common/feedback/EmptyState";
import { MapPin } from "lucide-react";

const REGION_FILTERS = [
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

export default function RecommendationList({
  recommendations,
  originalData,
  isLoading,
  isError,
  activeFilter,
  setActiveFilter,
}) {
  return (
    <>
      <HeroWithFilterSearch
        imageSrc="/images/recommendation-list-hero.jpg"
        title="이런 지역은 어때요?"
        subtitle="혼자 여행하기 좋은 장소만 골라 소개합니다"
        countLabel="추천 여행지"
        count={originalData?.length || 0}
        filters={REGION_FILTERS}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        showSearch={false}
      />

      {/* 추천 여행지 카드 섹션 */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-12 sm:py-16 lg:py-20">
        {isLoading ? (
          <LoadingSpinner />
        ) : isError ? (
          <ErrorMessage message="추천 여행지를 불러오지 못했어요." />
        ) : !recommendations?.length ? (
          <div className="col-span-full flex flex-col items-center justify-center h-60 text-center">
            <EmptyState
              icon={<MapPin className="w-10 h-10 text-gray-400" />}
              title="추천 여행지를 찾을 수 없어요"
              description="추천 여행지를 준비 중입니다. 다른 지역을 선택해주세요."
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {recommendations.map((place) => (
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
