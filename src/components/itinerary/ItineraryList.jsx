import ItineraryCard from "@/components/itinerary/ItineraryCard";

export default function ItineraryList({ filteredItineraries }) {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-12 py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItineraries.length > 0 ? (
          filteredItineraries.map((itinerary) => (
            <ItineraryCard key={itinerary.id} itinerary={itinerary} />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 py-32">
            <p className="text-lg font-semibold mb-2">일정을 찾을 수 없어요</p>
            <p className="text-sm">
              다른 필터를 선택하거나 검색어를 바꿔보세요.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
