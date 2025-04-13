// src/components/chat/MessageInput.jsx
import PropTypes from "prop-types";

import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "services/firebase";
import { useSelector } from "react-redux";

export default function MessageInput({ roomId }) {
  // roomId가 유효한지 확인
  if (!roomId) {
    console.error("MessageInput: roomId가 제공되지 않았습니다.");
    return <div className="text-red-500">채팅방 ID 오류</div>;
  }

  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // 메시지 전송 중복 방지
  const user = useSelector((state) => state.user.user);

  const handleSend = async () => {
    if (!message.trim()) {
      return; // 빈 메시지는 전송하지 않음
    }

    if (!user) {
      alert("로그인이 필요한 기능입니다.");
      return;
    }

    if (isSubmitting) {
      return; // 이미 전송 중인 경우 중복 전송 방지
    }

    setIsSubmitting(true);

    try {
      await addDoc(collection(db, "chatMessages"), {
        roomId,
        message: message.trim(),
        senderId: user.uid,
        senderName: user.displayName || "익명",
        createdAt: serverTimestamp(),
      });
      setMessage(""); // 전송 후 초기화
    } catch (error) {
      console.error("메시지 전송 오류:", error);
      const errorMessage =
        error.code === "permission-denied"
          ? "권한이 없습니다. 로그인 상태를 확인해주세요."
          : "메시지 전송에 실패했습니다. 잠시 후 다시 시도해주세요.";
      alert(errorMessage);
    } finally {
      setIsSubmitting(false); // 전송 끝
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // 줄바꿈 방지
      handleSend();
    }
  };

  return (
    <div className="flex gap-2">
      <textarea
        rows={1}
        className="flex-1 border px-3 py-2 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-gray-400"
        placeholder="메시지를 입력하세요..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        maxLength={500}
        disabled={isSubmitting}
      />
      <button
        onClick={handleSend}
        className={`bg-gray-900 text-white px-4 rounded-md ${
          isSubmitting ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={isSubmitting}
      >
        {isSubmitting ? "전송 중..." : "전송"}
      </button>
    </div>
  );
}

MessageInput.propTypes = {
  roomId: PropTypes.string.isRequired,
};
