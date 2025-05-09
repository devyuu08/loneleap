import { ArrowLeft, Pencil, Trash2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useDeleteItinerary } from "services/queries/itinerary/useDeleteItinerary";

export function EditFloatingButton() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/itinerary/edit/${id}`)}
      className="bg-gray-900 text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition"
      aria-label="일정 수정"
    >
      <Pencil className="w-4 h-4" />
    </button>
  );
}

export function DeleteFloatingButton() {
  const { id } = useParams();
  const { mutate, isPending } = useDeleteItinerary(); // 커스텀 훅 사용

  const handleDelete = () => {
    if (confirm("정말로 이 일정을 삭제하시겠습니까?")) {
      mutate(id); // ID 전달
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition"
      aria-label="일정 삭제"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
}

export function BackFloatingButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="bg-white text-gray-700 p-3 rounded-full shadow-lg hover:bg-gray-100 transition border border-gray-300"
      aria-label="이전 페이지로 돌아가기"
    >
      <ArrowLeft className="w-4 h-4" />
    </button>
  );
}

// 버튼을 묶어주는 Wrapper
export default function FloatingButtons() {
  return (
    <>
      {/* 왼쪽 하단: 돌아가기 */}
      <div className="fixed bottom-6 left-6 z-50">
        <BackFloatingButton />
      </div>

      {/* 오른쪽 하단: 수정/삭제 */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
        <EditFloatingButton />
        <DeleteFloatingButton />
      </div>
    </>
  );
}
