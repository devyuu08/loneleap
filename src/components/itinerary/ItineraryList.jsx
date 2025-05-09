import { useState, useMemo } from "react";
import { useItineraries } from "services/queries/itinerary/useItineraries";

import ItineraryCard from "./ItineraryCard";
import LoadingSpinner from "components/common/LoadingSpinner";
import EmptyState from "components/common/EmptyState";
import { Search } from "lucide-react";
import CreateCard from "components/common/CreateCard";

const FILTERS = ["전체", "최신순", "과거순"];

export default function ItineraryList() {
  const [activeFilter, setActiveFilter] = useState("전체");
  const [searchKeyword, setSearchKeyword] = useState("");
  const { data: itineraries, isLoading, isError, refetch } = useItineraries();

  const filteredItineraries = useMemo(() => {
    if (!itineraries) return [];

    let result = [...itineraries];

    // 필터링
    if (activeFilter === "최신순") {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (activeFilter === "과거순") {
      result.sort((a, b) => a.startDate?.localeCompare(b.startDate));
    }

    // 검색 적용
    if (searchKeyword.trim()) {
      result = result.filter((itinerary) =>
        itinerary.location
          ?.toLowerCase()
          .includes(searchKeyword.trim().toLowerCase())
      );
    }

    return result;
  }, [itineraries, activeFilter, searchKeyword]);

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
    <>
      {/* 헤더 섹션 */}
      <section className="bg-[#F9FAFB] py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-gray-900">여행 일정 목록</h2>
            <p className="text-sm text-gray-500 py-1">
              누군가의 특별한 여행을 탐험하고 나만의 새로운 일정을 계획해보세요
            </p>
            <p className="text-xs text-gray-400">
              총 {itineraries?.length || 0}개의 일정
            </p>
          </div>

          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="flex flex-wrap gap-2">
              {FILTERS.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-1.5 rounded-full text-sm border transition ${
                    activeFilter === filter
                      ? "bg-black text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="relative w-full max-w-xs">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                placeholder="일정 검색"
                className="w-full pl-10 pr-4 py-2 rounded-full border text-sm focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 일정 카드 목록 섹션 */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 항상 표시되는 일정 생성 카드 */}
          <CreateCard
            to="/itinerary/create"
            title="나만의 여행 일정 만들기"
            description="당신만의 특별한 여행 계획을 시작해보세요"
            buttonLabel="일정 만들기"
          />

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
