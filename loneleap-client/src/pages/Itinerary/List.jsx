import { useState } from "react";

import { Link } from "react-router-dom";

import { useMyItineraries } from "services/queries/useMyItineraries";

import LoadingSpinner from "components/LoadingSpinner";
import EmptyState from "components/EmptyState";
import ItineraryList from "components/ItineraryList";

export default function ItineraryListPage() {
  const { data, isLoading, isError, refetch } = useMyItineraries();
  const [isRefetching, setIsRefetching] = useState(false);

  const handleRefetch = async () => {
    setIsRefetching(true);
    await refetch();
    setIsRefetching(false);
  };

  if (isLoading || isRefetching) return <LoadingSpinner />;

  if (isError)
    return (
      <div className="text-center py-10">
        <p className="text-red-500 font-medium">일정 불러오기 실패</p>
        <p className="text-sm text-gray-500 mt-2">나중에 다시 시도해주세요.</p>
        <button
          onClick={handleRefetch}
          className="mt-4 px-4 py-2 bg-gray-200 rounded text-sm hover:bg-gray-300 transition"
        >
          새로고침
        </button>
      </div>
    );

  if (!data || data.length === 0)
    return (
      <EmptyState
        title="등록된 일정이 없습니다"
        description="새로운 여행 일정을 작성해보세요!"
      />
    );

  return (
    <div className="max-w-3xl mx-auto px-4 mt-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">내 여행 일정</h1>

        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="검색어 입력..."
            className="border border-gray-300 rounded px-3 py-1 text-sm"
          />
          <Link
            to="/itinerary/create"
            className="bg-gray-900 text-white text-sm px-4 py-2 rounded hover:bg-gray-800 transition"
          >
            새 일정 만들기
          </Link>
        </div>
      </div>

      <main role="main">
        <ItineraryList itineraries={data} />
      </main>
    </div>
  );
}
