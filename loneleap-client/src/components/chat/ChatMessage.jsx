import { useSelector } from "react-redux";
import { formatRelative } from "date-fns";
import { ko } from "date-fns/locale";
import { useState } from "react";
import { useReportMessage } from "services/queries/chat/useReportMessage";
import ReportModal from "components/common/ReportModal.jsx";

export default function ChatMessage({ message }) {
  const user = useSelector((state) => state.user.user);
  const {
    id,
    senderId,
    senderName,
    message: messageText,
    roomId,
    createdAt,
  } = message;

  const isMine = senderId === user?.uid;
  const [openReportModal, setOpenReportModal] = useState(false);

  const reportMutation = useReportMessage();

  const handleSubmit = ({ reason }) => {
    return reportMutation
      .mutateAsync({ messageId: id, roomId, reason })
      .then(() => {
        alert("신고가 접수되었습니다.");
        setOpenReportModal(false);
      })
      .catch((err) => {
        alert(err?.message || "신고 처리 중 오류가 발생했습니다.");
      });
  };

  return (
    <div className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
      <div className="max-w-xs">
        {!isMine && <p className="text-xs text-gray-500 mb-1">{senderName}</p>}

        <div
          className={`px-4 py-2 rounded-xl text-sm ${
            isMine
              ? "bg-gray-900 text-white rounded-br-none"
              : "bg-gray-100 text-gray-900 rounded-bl-none"
          }`}
        >
          {messageText}
        </div>

        {!isMine && (
          <div className="group relative">
            <button
              onClick={() => setOpenReportModal(true)}
              className="text-xs text-gray-500 mt-1 hover:underline opacity-50 group-hover:opacity-100 transition-opacity"
              aria-label="이 메시지 신고하기"
            >
              신고
            </button>
          </div>
        )}

        <p className="text-[10px] text-gray-400 mt-1 text-right">
          {createdAt
            ? typeof createdAt.toDate === "function"
              ? formatRelative(createdAt.toDate(), new Date(), { locale: ko })
              : formatRelative(new Date(createdAt), new Date(), { locale: ko })
            : "시간 정보 없음"}
        </p>

        {/* 공통 신고 모달 */}
        {openReportModal && (
          <ReportModal
            onClose={() => setOpenReportModal(false)}
            onSubmit={handleSubmit}
            isPending={reportMutation.isPending}
          />
        )}
      </div>
    </div>
  );
}
