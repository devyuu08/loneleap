import { useRecommendationList } from "hooks/useRecommendationList";
import RecommendationCard from "components/recommendation/RecommendationCard";
import { useState } from "react";
import { Link } from "react-router-dom";

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

export default function RecommendationListPage() {
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
      <section className="bg-[#F9FAFB] py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              이런 지역은 어때요?
            </h2>
            <p className="text-sm text-gray-500 mt-3">
              혼자 여행하기 좋은 장소만 모았어요
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-1.5 rounded-full border text-sm transition ${
                  activeFilter === filter
                    ? "bg-black text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

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
      <section className="bg-[#F9FAFB] py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            이 지역에서 일정을 만들어볼까요?
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            나만의 감성적인 혼행 일정을 계획해보세요. LoneLeap이 당신의 여정을
            특별하게 만들어 드릴게요.
          </p>
          <Link
            to="/itinerary"
            className="inline-block bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition"
          >
            나만의 일정 만들기
          </Link>
        </div>
      </section>
    </>
  );
}
