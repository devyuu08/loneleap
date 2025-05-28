import ItineraryCard from "@/components/itinerary/ItineraryCard";
import EmptyState from "@/components/common/feedback/EmptyState";
import { CalendarX } from "lucide-react";

export default function ItineraryList({ filteredItineraries }) {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-12 py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItineraries.length > 0 ? (
          filteredItineraries.map((itinerary) => (
            <ItineraryCard key={itinerary.id} itinerary={itinerary} />
          ))
        ) : (
          <div className="col-span-full">
            <EmptyState
              icon={<CalendarX className="w-8 h-8" />}
              title="일정을 찾을 수 없어요"
              description="다른 필터를 선택하거나 검색어를 바꿔보세요."
            />
          </div>
        )}
      </div>
    </section>
  );
}
