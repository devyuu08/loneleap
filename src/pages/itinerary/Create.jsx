import ItineraryFormContainer from "@/containers/itinerary/ItineraryFormContainer";

export default function CreateItineraryPage() {
  return (
    <div className="pt-16">
      <ItineraryFormContainer isEditMode={false} />
    </div>
  );
}
