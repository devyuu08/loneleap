import ItineraryCard from "@/components/itinerary/ItineraryCard";
import { Search } from "lucide-react";
import HeroSection from "@/components/common/layout/HeroSection";

const FILTERS = ["최신순", "과거순"];

export default function ItineraryList({
  itineraries,
  filteredItineraries,
  activeFilter,
  setActiveFilter,
  searchKeyword,
  setSearchKeyword,
}) {
  return (
    <>
      {/* 헤더 섹션 */}
      <HeroSection imageSrc="/images/itinerary-list-hero.jpg" align="center">
        <div className="space-y-2 text-center">
          <h2 className="text-3xl font-extrabold drop-shadow">
            여행자들의 시간표, 당신의 다음 한 걸음
          </h2>
          <p className="text-sm text-white/90">
            누군가의 특별한 여행을 탐험하고, 나만의 일정을 만들어보세요.
          </p>
          <p className="text-xs text-white/60">
            총 {itineraries?.length || 0}개의 일정
          </p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center items-center gap-4">
          {/* 필터 */}
          <div className="flex gap-2">
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

          {/* 검색창 */}
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 w-4 h-4" />
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="여행지 이름 검색"
              className="w-full pl-10 pr-4 py-2 rounded-full bg-white/90 text-gray-800 text-sm border border-white focus:outline-none focus:ring-1 focus:ring-white"
            />
          </div>
        </div>
      </HeroSection>

      {/* 일정 카드 목록 섹션 */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 일정 목록이 있으면 나열, 없으면 빈 상태 메시지 카드 형태로 */}
          {filteredItineraries.length > 0 ? (
            filteredItineraries.map((itinerary) => (
              <ItineraryCard key={itinerary.id} itinerary={itinerary} />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 py-32">
              <p className="text-lg font-semibold mb-2">
                일정을 찾을 수 없어요
              </p>
              <p className="text-sm">
                다른 필터를 선택하거나 검색어를 바꿔보세요.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
