import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { formatRelative } from "date-fns";
import { ko } from "date-fns/locale";

import ReportModal from "@/components/common/modal/ReportModal.jsx";
import ModalPortal from "@/components/common/modal/ModalPortal";

const ChatMessage = React.memo(function ChatMessage({
  message,
  isMine,
  onReport,
  openReportModal,
  setOpenReportModal,
  isReporting,
}) {
  const {
    sender,
    message: messageText,
    createdAt,
    type,
    systemType,
    userName,
  } = message;

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

  const formattedTime = useMemo(() => {
    if (!createdAt) return "시간 정보 없음";
    const dateObj =
      typeof createdAt.toDate === "function"
        ? createdAt.toDate()
        : new Date(createdAt);
    return formatRelative(dateObj, new Date(), { locale: ko });
  }, [createdAt]);

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
          {formattedTime}
        </p>

        {/* 공통 신고 모달 */}
        {openReportModal && (
          <ModalPortal>
            <ReportModal
              onClose={() => setOpenReportModal(false)}
              onSubmit={onReport}
              isPending={isReporting}
            />
          </ModalPortal>
        )}
      </div>
    </div>
  );
});

ChatMessage.propTypes = {
  message: PropTypes.object.isRequired,
  isMine: PropTypes.bool.isRequired,
  onReport: PropTypes.func.isRequired,
  openReportModal: PropTypes.bool.isRequired,
  setOpenReportModal: PropTypes.func.isRequired,
  isReporting: PropTypes.bool.isRequired,
};
