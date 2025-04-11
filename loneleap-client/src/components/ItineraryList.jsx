import ItineraryCard from "./ItineraryCard";

export default function ItineraryList({ itineraries }) {
  if (!itineraries || itineraries.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {itineraries.map((itinerary) => (
        <ItineraryCard key={itinerary.id} itinerary={itinerary} />
      ))}
    </div>
  );
}
