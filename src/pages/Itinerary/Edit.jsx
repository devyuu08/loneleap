import ItineraryForm from "../../components/ItineraryForm";
import { useParams } from "react-router-dom";
import { useItineraryDetail } from "../../services/queries/useItineraryDetail";

export default function EditItineraryPage() {
  const { id } = useParams();
  const { data, isLoading } = useItineraryDetail(id);

  if (isLoading) return <div className="text-center py-20">로딩 중...</div>;
  if (!data) return <div>일정을 찾을 수 없습니다.</div>;

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow">
        <ItineraryForm initialData={data} isEditMode={true} />
      </div>
    </div>
  );
}
