import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import MessageInput from "@/components/chat/MessageInput";
import { sendChatMessage } from "@/services/chat/sendMessage";

export default function MessageInputContainer({ roomId }) {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const user = useSelector((state) => state.user.user);

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSend = async () => {
    if (!message.trim() || !user || isSubmitting) return;
    setIsSubmitting(true);

    try {
      await sendChatMessage({ roomId, message, user });
      setMessage("");
    } catch (error) {
      console.error("메시지 전송 오류:", error);
      alert("메시지 전송에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

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
