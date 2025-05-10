import { useParams } from "react-router-dom";
import { useItineraryDetail } from "services/queries/itinerary/useItineraryDetail";
import ItineraryForm from "components/itinerary/ItineraryForm";

export default function EditItineraryPage() {
  const { id } = useParams();
  const { data, isLoading } = useItineraryDetail(id);

  if (isLoading) return <div className="text-center py-20">로딩 중...</div>;
  if (!data) return <div>일정을 찾을 수 없습니다.</div>;

  return <ItineraryForm initialData={data} isEditMode={true} />;
}
