import { useSelector } from "react-redux";
import { useState } from "react";
import { useReportMessage } from "hooks/chat/useReportMessage";
import ChatMessage from "components/chat/ChatMessage";

export default function ChatMessageContainer({ message }) {
  const user = useSelector((state) => state.user.user);
  const isMine = message.sender?.uid === user?.uid;

  const [openReportModal, setOpenReportModal] = useState(false);
  const reportMutation = useReportMessage();

  const handleReport = ({ reason }) => {
    return reportMutation
      .mutateAsync({ messageId: message.id, roomId: message.roomId, reason })
      .then(() => {
        alert("신고가 접수되었습니다.");
        setOpenReportModal(false);
      })
      .catch((err) => {
        alert(err?.message || "신고 처리 중 오류가 발생했습니다.");
      });
  };

  return (
    <ChatMessage
      message={message}
      isMine={isMine}
      onReport={handleReport}
      openReportModal={openReportModal}
      setOpenReportModal={setOpenReportModal}
      isReporting={reportMutation.isPending}
    />
  );
}
