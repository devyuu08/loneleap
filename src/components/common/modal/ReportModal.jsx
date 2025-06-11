import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

import ErrorMessage from "@/components/common/feedback/ErrorMessage";
import ButtonSpinner from "@/components/common/loading/ButtonSpinner";

export default function ReportModal({ onClose, onSubmit, isPending }) {
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");
  const textareaRef = useRef(null);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const validate = () => {
    if (!reason.trim()) return "신고 사유를 입력해주세요.";
    if (reason.trim().length < 5)
      return "신고 사유는 최소 5자 이상 입력해주세요.";
    return "";
  };

  const handleSubmit = async () => {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      await onSubmit({ reason });
      onClose();
    } catch (err) {
      setError("신고 처리 중 문제가 발생했습니다.");
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
          onChange={(e) => {
            setReason(e.target.value);
            if (error) setError("");
          }}
          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
          placeholder="신고 사유를 입력해주세요"
          aria-label="신고 사유"
        />

        {error && <ErrorMessage message={error} />}

        <div className="mt-4 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded-md text-sm"
          >
            취소
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isPending}
            className={`px-4 py-2 bg-red-500 text-white rounded-md text-sm ${
              isPending ? "opacity-50 cursor-not-allowed" : ""
            }`}
            style={{ minWidth: "96px" }}
          >
            <span className="flex items-center justify-center w-[64px] h-[20px]">
              {isPending ? (
                <ButtonSpinner size={16} color="white" />
              ) : (
                "신고하기"
              )}
            </span>
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
