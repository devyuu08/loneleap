// src/components/chat/ChatMessage.jsx
import { useSelector } from "react-redux";
import { formatRelative } from "date-fns";
import { ko } from "date-fns/locale";
import { useState } from "react";
import ReportModal from "../ReportModal";

export default function ChatMessage({ message }) {
  const user = useSelector((state) => state.user.user);
  const isMine = message.senderId === user?.uid;
  const [openReportModal, setOpenReportModal] = useState(false);

  return (
    <div
      className={`flex ${isMine ? "justify-end" : "justify-start"}`}
      role="log"
      aria-live="polite"
    >
      <div className="max-w-xs">
        {/* 상대방 이름 표시 */}
        {!isMine && (
          <p className="text-xs text-gray-500 mb-1">{message.senderName}</p>
        )}
        {/* 말풍선 */}
        <div
          className={`px-4 py-2 rounded-xl text-sm ${
            isMine
              ? "bg-gray-900 text-white rounded-br-none"
              : "bg-gray-100 text-gray-900 rounded-bl-none"
          }`}
        >
          {message.message}
        </div>

        {/* 신고 버튼 (본인 제외) */}
        {!isMine && (
          <div className="group relative">
            <button
              onClick={() => setOpenReportModal(true)}
              className="text-xs text-gray-500 mt-1 hover:underline opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="이 메시지 신고하기"
            >
              신고
            </button>
          </div>
        )}

        {/* 시간 표시 */}
        <p className="text-[10px] text-gray-400 mt-1 text-right">
          {message.createdAt?.toDate
            ? formatRelative(message.createdAt.toDate(), new Date(), {
                locale: ko,
              })
            : "시간 정보 없음"}
        </p>

        {/* 신고 모달 조건부 렌더링 */}
        {openReportModal && (
          <ReportModal
            messageId={message.id}
            roomId={message.roomId}
            onClose={() => setOpenReportModal(false)}
          />
        )}
      </div>
    </div>
  );
}
