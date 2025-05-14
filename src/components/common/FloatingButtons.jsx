import { ArrowLeft, Pencil, Trash2 } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export function EditFloatingButton({ editPath }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(editPath)}
      className="bg-gray-900 text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition"
      aria-label="수정하기"
    >
      <Pencil className="w-4 h-4" />
    </button>
  );
}

export function DeleteFloatingButton({ onDelete, isPending = false }) {
  const handleDelete = () => {
    if (confirm("정말로 삭제하시겠습니까?")) {
      onDelete();
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition"
      aria-label="삭제하기"
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
export default function FloatingButtons({
  editPath,
  onDelete,
  isDeletePending = false,
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const path = location.pathname;

  // 수정/삭제 버튼: 특정 상세 페이지만 허용
  const isItineraryDetail = /^\/itinerary\/[^/]+$/.test(path);
  const isReviewDetail = /^\/reviews\/[^/]+$/.test(path);
  const showEditDelete = isItineraryDetail || isReviewDetail;

  return (
    <>
      {/* 항상 표시되는 뒤로 가기 버튼 */}
      <div className="fixed bottom-6 left-6 z-50">
        <button
          onClick={() => navigate(-1)}
          className="bg-white text-gray-700 p-3 rounded-full shadow-lg hover:bg-gray-100 transition border border-gray-300"
          aria-label="뒤로 가기"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
      </div>

      {/* 수정/삭제 버튼: editPath와 onDelete가 있어야 렌더링 */}
      {editPath && onDelete && (
        <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
          <EditFloatingButton editPath={editPath} />
          <DeleteFloatingButton
            onDelete={onDelete}
            isPending={isDeletePending}
          />
        </div>
      )}
    </>
  );
}
