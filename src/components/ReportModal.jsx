import { useState, useRef, useEffect } from "react";
import { useReportMessage } from "services/queries/useReportMessage";
import PropTypes from "prop-types";

export default function ReportModal({ messageId, roomId, onClose }) {
  const [reason, setReason] = useState("");
  const { mutateAsync, isPending } = useReportMessage();

  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  const handleReportModalSubmit = async () => {
    if (!reason.trim()) {
      alert("신고 사유를 입력해주세요.");
      return;
    }

    if (reason.trim().length < 5) {
      alert("신고 사유는 최소 5자 이상 입력해주세요.");
      return;
    }

    try {
      await mutateAsync({ messageId, roomId, reason });
      alert("신고가 접수되었습니다.");
      onClose();
    } catch (err) {
      console.error("신고 오류:", err);
      alert("신고 처리 중 오류가 발생했어요.");
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="report-modal-title"
    >
      <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-lg">
        <h3 id="report-modal-title" className="text-lg font-semibold mb-4">
          메시지 신고하기
        </h3>

        <textarea
          ref={textareaRef}
          rows={3}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
          placeholder="신고 사유를 입력해주세요"
          aria-label="신고 사유"
          aria-required="true"
        />

        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded-md text-sm"
          >
            취소
          </button>
          <button
            onClick={handleReportModalSubmit}
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
  messageId: PropTypes.string.isRequired,
  roomId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
