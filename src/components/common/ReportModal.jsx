import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

export default function ReportModal({ onClose, onSubmit, isPending }) {
  const [reason, setReason] = useState("");
  const textareaRef = useRef(null);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const handleSubmit = async () => {
    if (!reason.trim()) return alert("신고 사유를 입력해주세요.");
    if (reason.trim().length < 5)
      return alert("신고 사유는 최소 5자 이상 입력해주세요.");

    try {
      await onSubmit({ reason });
      onClose();
    } catch (err) {
      console.error("신고 오류:", err);
      throw err; // 부모가 catch 하도록 넘김
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-lg">
        <h3 className="text-lg font-semibold mb-4">신고하기</h3>

        <textarea
          ref={textareaRef}
          rows={3}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
          placeholder="신고 사유를 입력해주세요"
        />

        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded-md text-sm"
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            disabled={isPending}
            className="px-4 py-2 bg-red-500 text-white rounded-md text-sm"
          >
            {isPending ? "신고 중..." : "신고하기"}
          </button>
        </div>
      </div>
    </div>
  );
}

ReportModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isPending: PropTypes.bool,
};
