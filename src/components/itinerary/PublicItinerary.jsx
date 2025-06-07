import ItineraryDetail from "@/components/itinerary/ItineraryDetail";

function PublicItinerary({ id, itinerary }) {
  return (
    <div className="max-w-5xl mx-auto pt-10 px-4">
      <ItineraryDetail
        itineraryId={id}
        itinerary={itinerary}
        isOwner={false}
        onDelete={() => {}}
        isDeletePending={false}
      />
    </div>
  );
}

export default PublicItinerary;
