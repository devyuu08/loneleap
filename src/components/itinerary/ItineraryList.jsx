import ItineraryCard from "./ItineraryCard";

export default function ItineraryList({ itineraries }) {
  if (!itineraries || itineraries.length === 0)
    return (
      <EmptyState
        icon="📅"
        title="등록된 일정이 없습니다"
        description="당신의 여행 일정을 공유해보세요!"
      />
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {itineraries.map((itinerary) => (
        <ItineraryCard key={itinerary.id} itinerary={itinerary} />
      ))}
    </div>
  );
}
