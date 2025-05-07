import { useState } from "react";
import { Link } from "react-router-dom";

import { useItineraries } from "services/queries/itinerary/useItineraries";
import LoadingSpinner from "components/common/LoadingSpinner";
import EmptyState from "components/common/EmptyState";
import ItineraryList from "components/itinerary/ItineraryList";

export default function ItineraryListPage() {
  const { data, isLoading, isError, refetch } = useItineraries();
  const [isRefetching, setIsRefetching] = useState(false);

  const handleRefetch = async () => {
    setIsRefetching(true);
    try {
      await refetch();
    } catch (error) {
      console.error("리패치 중 오류 발생:", error);
    } finally {
      setIsRefetching(false);
    }
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

  return (
    <div className="max-w-4xl mx-auto px-4 mt-10">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold">전체 여행 일정</h1>
          <p className="text-sm text-gray-500 mt-1">
            다양한 여행자들의 일정을 둘러보세요
          </p>
        </div>

        <Link
          to="/itinerary/create"
          className="bg-gray-900 text-white text-sm px-4 py-2 rounded hover:bg-gray-800 transition"
        >
          새 일정 만들기
        </Link>
      </div>

      <main role="main">
        {data && data.length > 0 ? (
          <ItineraryList itineraries={data} />
        ) : (
          <EmptyState
            title="등록된 일정이 없습니다"
            description="첫 여행 일정을 등록해보세요!"
          />
        )}
      </main>
    </div>
  );
}
