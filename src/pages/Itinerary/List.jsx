import { Link } from "react-router-dom";

import { useMyItineraries } from "services/queries/useMyItineraries";

import LoadingSpinner from "components/LoadingSpinner";
import EmptyState from "components/EmptyState";
import ItineraryList from "components/ItineraryList";

export default function ItineraryListPage() {
  const { data, isLoading, isError } = useMyItineraries();

  if (isLoading) return <LoadingSpinner />;
  if (isError)
    return <p className="text-center text-red-500 py-10">일정 불러오기 실패</p>;
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

        <Link
          to="/itinerary/create"
          className="bg-gray-900 text-white text-sm px-4 py-2 rounded hover:bg-gray-800 transition"
        >
          새 일정 만들기
        </Link>
      </div>

      <ItineraryList itineraries={data} />
    </div>
  );
}
