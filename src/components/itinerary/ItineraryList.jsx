import { useItineraries } from "services/queries/itinerary/useItineraries";
import ItineraryCard from "./ItineraryCard";
import EmptyState from "components/common/EmptyState";
import LoadingSpinner from "components/common/LoadingSpinner";

export default function ItineraryList() {
  const { data: itineraries, isLoading, isError, refetch } = useItineraries();

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
    <div className="max-w-4xl mx-auto px-4 mt-10">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold">전체 여행 일정</h1>
          <p className="text-sm text-gray-500 mt-1">
            다양한 여행자들의 일정을 둘러보세요
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {itineraries.map((itinerary) => (
          <ItineraryCard key={itinerary.id} itinerary={itinerary} />
        ))}
      </div>
    </div>
  );
}
