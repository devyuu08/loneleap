import { useState, useMemo, useCallback } from "react";
import { useItineraries } from "@/hooks/itinerary/useItineraries";

import ItineraryList from "@/components/itinerary/ItineraryList";
import LoadingSpinner from "@/components/common/loading/LoadingSpinner";
import HeroWithFilterSearch from "@/components/common/layout/HeroWithFilterSearch";

const FILTERS = ["최신순", "오래된순"];

export default function ItineraryListContainer() {
  const [activeFilter, setActiveFilter] = useState("최신순");
  const [searchKeyword, setSearchKeyword] = useState("");
  const { data: itineraries, isLoading, isError, refetch } = useItineraries();

  const filteredItineraries = useMemo(() => {
    if (!Array.isArray(itineraries)) return [];

    const convertToDate = (ts) => (ts ? new Date(ts) : new Date(0));

    return [...itineraries]
      .sort((a, b) =>
        activeFilter === "최신순"
          ? convertToDate(b.createdAt) - convertToDate(a.createdAt)
          : convertToDate(a.createdAt) - convertToDate(b.createdAt)
      )
      .filter((itinerary) =>
        itinerary.location
          ?.toLowerCase()
          .includes(searchKeyword.trim().toLowerCase())
      );
  }, [itineraries, activeFilter, searchKeyword]);

  const handleFilterChange = useCallback((filter) => {
    setActiveFilter(filter);
  }, []);

  const handleSearchChange = useCallback((keyword) => {
    setSearchKeyword(keyword);
  }, []);

  if (isLoading) return <LoadingSpinner />;

  if (isError)
    return (
      <div className="text-center py-10">
        <p className="text-red-500 font-medium">일정 불러오기 실패</p>
        <p className="text-sm text-gray-500 mt-2">나중에 다시 시도해주세요.</p>
        <button
          onClick={refetch}
          className="mt-4 px-4 py-2 bg-gray-200 rounded text-sm hover:bg-gray-300 transition"
        >
          새로고침
        </button>
      </div>
    );

  return (
    <>
      <HeroWithFilterSearch
        imageSrc="/images/itinerary-list-hero.jpg"
        title="여행자들의 시간표, 당신의 다음 한 걸음"
        subtitle="누군가의 특별한 여행을 탐험하고, 나만의 일정을 만들어보세요."
        countLabel="일정"
        count={itineraries.length}
        filters={FILTERS}
        activeFilter={activeFilter}
        onFilterChange={handleFilterChange}
        searchKeyword={searchKeyword}
        onSearchChange={handleSearchChange}
        searchPlaceholder="여행지 뱃지로 검색"
      />

      <ItineraryList
        itineraries={itineraries}
        filteredItineraries={filteredItineraries}
      />
    </>
  );
}
