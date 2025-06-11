import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import MessageInput from "@/components/chat/MessageInput";
import { sendChatMessage } from "@/services/chat/sendMessage";
import toast from "react-hot-toast";

/**
 * MessageInputContainer
 * - 채팅 입력창 상태 및 전송 처리 담당
 * - Enter 키 입력, 전송 중 상태 관리 포함
 */

export default function MessageInputContainer({ roomId }) {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const user = useSelector((state) => state.user.user);

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSend = useCallback(async () => {
    if (!message.trim() || !user || isSubmitting) return;
    setIsSubmitting(true);

    try {
      await sendChatMessage({ roomId, message, user });
      setMessage("");
      inputRef.current?.focus();
    } catch (error) {
      toast.error("메시지 전송에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  }, [message, user, isSubmitting, roomId]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  return (
    <MessageInput
      message={message}
      setMessage={setMessage}
      handleSend={handleSend}
      handleKeyDown={handleKeyDown}
      isSubmitting={isSubmitting}
      inputRef={inputRef}
    />
  );
}
