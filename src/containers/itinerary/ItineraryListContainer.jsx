import { useState, useMemo } from "react";
import { useItineraries } from "hooks/itinerary/useItineraries";

import ItineraryList from "components/itinerary/ItineraryList";
import LoadingSpinner from "components/common/LoadingSpinner";

export default function ItineraryListContainer() {
  const [activeFilter, setActiveFilter] = useState("최신순");
  const [searchKeyword, setSearchKeyword] = useState("");
  const { data: itineraries, isLoading, isError, refetch } = useItineraries();

  const filteredItineraries = useMemo(() => {
    if (!Array.isArray(itineraries)) return [];

    let result = [...itineraries];

    // 필터링
    const convertToDate = (ts) => {
      if (!ts) return new Date(0);
      return new Date(ts);
    };

    if (activeFilter === "최신순") {
      result.sort(
        (a, b) => convertToDate(b.createdAt) - convertToDate(a.createdAt)
      );
    } else {
      result.sort(
        (a, b) => convertToDate(a.createdAt) - convertToDate(b.createdAt)
      );
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

  if (isLoading) return <LoadingSpinner />;

  return (
    <ItineraryList
      itineraries={itineraries}
      filteredItineraries={filteredItineraries}
      activeFilter={activeFilter}
      setActiveFilter={setActiveFilter}
      searchKeyword={searchKeyword}
      setSearchKeyword={setSearchKeyword}
    />
  );
}
