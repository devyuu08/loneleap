import { useState, useMemo } from "react";
import { useItineraries } from "services/queries/itinerary/useItineraries";

import ItineraryCard from "./ItineraryCard";
import LoadingSpinner from "components/common/LoadingSpinner";
import EmptyState from "components/common/EmptyState";

const FILTERS = ["전체", "최신순", "과거순"];

export default function ItineraryList() {
  const [activeFilter, setActiveFilter] = useState("전체");
  const { data: itineraries, isLoading, isError, refetch } = useItineraries();

  const filteredItineraries = useMemo(() => {
    if (activeFilter === "최신순") {
      return [...itineraries].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }
    if (activeFilter === "과거순") {
      return [...itineraries].sort((a, b) =>
        a.startDate?.localeCompare(b.startDate)
      );
    }
    return itineraries;
  }, [itineraries, activeFilter]);

  if (isLoading) return <LoadingSpinner />;

  if (isError)
    return (
      <div className="text-center py-10">
        <p className="text-red-500 font-medium">일정 불러오기 실패</p>
        <p className="text-sm text-gray-500 mt-2">나중에 다시 시도해주세요.</p>
        <button
          onClick={() => refetch()}
          className="mt-4 px-4 py-2 bg-gray-200 rounded text-sm hover:bg-gray-300 transition"
        >
          새로고침
        </button>
      </div>
    );

  if (!itineraries || itineraries.length === 0)
    return (
      <EmptyState
        icon="📅"
        title="등록된 일정이 없습니다"
        description="당신의 여행 일정을 공유해보세요!"
      />
    );

  return (
    <section className="bg-[#F9FAFB] py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-8">
        {/* 제목 */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900">전체 여행 일정</h2>
          <p className="text-sm text-gray-500 mt-3">
            다양한 여행자들의 일정을 둘러보세요
          </p>
        </div>

        {/* 필터 버튼 */}
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

        {/* 일정 카드 목록 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItineraries.map((itinerary) => (
            <ItineraryCard key={itinerary.id} itinerary={itinerary} />
          ))}
        </div>
      </div>
    </section>
  );
}
