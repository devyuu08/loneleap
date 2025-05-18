import { useSelector } from "react-redux";
import { formatRelative } from "date-fns";
import { ko } from "date-fns/locale";
import { useState } from "react";
import { useReportMessage } from "services/queries/chat/useReportMessage";
import ReportModal from "components/common/ReportModal.jsx";
import ModalPortal from "components/common/ModalPortal";

export default function ChatMessage({ message }) {
  const user = useSelector((state) => state.user.user);
  const {
    id,
    sender,
    message: messageText,
    roomId,
    createdAt,
    type,
    systemType,
    userName,
  } = message;

  const isMine = sender?.uid === user?.uid;
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

  if (type === "system") {
    const systemTextStyles = "text-center text-[12px] my-4";

    switch (systemType) {
      case "date":
        return (
          <div className="flex justify-center my-6">
            <span className="text-[11px] bg-gray-100 text-gray-600 px-3 py-1 rounded-full shadow-sm">
              {message.message}
            </span>
          </div>
        );
      case "join":
        return (
          <div className={`${systemTextStyles} text-gray-600`}>
            <span className="font-semibold text-gray-800 underline">
              {userName}
            </span>
            님이 여행 이야기에 합류했어요
          </div>
        );
      case "leave":
        return (
          <div className={`${systemTextStyles} text-gray-400 italic`}>
            <span className="font-bold text-gray-500">{userName}</span>
            님이 다른 여행지를 향해 떠났어요
          </div>
        );
      default:
        return null;
    }
  }

  return (
    <div className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
      <div className="max-w-xs">
        {!isMine && (
          <img
            src={sender?.photoURL || "/images/default-profile.png"}
            alt={sender?.displayName || "익명"}
            className="w-6 h-6 rounded-full object-cover mr-2"
          />
        )}
        {!isMine && (
          <p className="text-xs font-semibold text-gray-700 mb-1">
            {sender?.displayName || "익명"}
          </p>
        )}

        <div
          className={`px-4 py-2 rounded-xl text-sm leading-relaxed shadow-sm ${
            isMine
              ? "bg-[#5A5A5A] text-white rounded-br-none"
              : "bg-[#F2F2F2] text-gray-900 rounded-bl-none"
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
          <ModalPortal>
            <ReportModal
              onClose={() => setOpenReportModal(false)}
              onSubmit={handleSubmit}
              isPending={reportMutation.isPending}
            />
          </ModalPortal>
        )}
      </div>
    </div>
  );
}
