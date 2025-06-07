import { ArrowLeft, Pencil, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { baseButtonClasses, buttonVariants } from "@/utils/buttonVariants";
import clsx from "clsx";

export function EditFloatingButton({ editPath }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(editPath)}
      className={clsx(
        baseButtonClasses,
        buttonVariants.dark,
        "rounded-full shadow-lg",
        "p-3"
      )}
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
      className={clsx(
        baseButtonClasses,
        "rounded-full shadow-lg p-3",
        isPending ? buttonVariants.disabled : buttonVariants.danger
      )}
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
      className={clsx(
        baseButtonClasses,
        buttonVariants.outline,
        "rounded-full shadow-lg p-3"
      )}
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
  createPath,
}) {
  const navigate = useNavigate();

  return (
    <>
      {/* 항상 표시되는 뒤로 가기 버튼 */}
      <div className="fixed bottom-6 left-6 z-50">
        <BackFloatingButton />
      </div>

      {/* 수정/삭제 버튼: editPath와 onDelete가 있어야 렌더링 */}
      {editPath && onDelete ? (
        <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
          <EditFloatingButton editPath={editPath} />
          <DeleteFloatingButton
            onDelete={onDelete}
            isPending={isDeletePending}
          />
        </div>
      ) : createPath ? (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={() => navigate(createPath)}
            className="bg-black/80 text-white p-4 rounded-full shadow-lg hover:bg-black transition"
            aria-label="생성하기"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      ) : null}
    </>
  );
}
