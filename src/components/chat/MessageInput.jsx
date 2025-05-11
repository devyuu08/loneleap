import PropTypes from "prop-types";

import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "services/firebase";
import { useSelector } from "react-redux";

import { Send, Image as ImageIcon } from "lucide-react";

export default function MessageInput({ roomId }) {
  if (!roomId) {
    console.error("MessageInput: roomId가 제공되지 않았습니다.");
    return <div className="text-red-500">채팅방 ID 오류</div>;
  }

  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const user = useSelector((state) => state.user.user);

  const handleSend = async () => {
    if (!message.trim() || !user || isSubmitting) return;
    setIsSubmitting(true);

    try {
      await addDoc(collection(db, "chatMessages"), {
        type: "text",
        roomId,
        message: message.trim(),
        senderId: user.uid,
        senderName: user.displayName || "익명",
        senderPhotoURL: user.photoURL || "",
        createdAt: serverTimestamp(),
      });
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
    <div className="flex items-center gap-3">
      {/* 이미지 업로드 버튼 (디자인만, 기능은 나중에) */}
      <button className="text-gray-500 hover:text-gray-700">
        <ImageIcon className="w-5 h-5" />
      </button>

      {/* 입력창 */}
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="메시지를 입력하세요..."
        disabled={isSubmitting}
        className="flex-1 bg-white/70 rounded-full px-4 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 border border-gray-300 shadow-sm"
        maxLength={500}
      />

      {/* 전송 버튼 */}
      <button
        onClick={handleSend}
        disabled={isSubmitting}
        aria-label="메시지 전송"
        className={`p-2 rounded-full text-white backdrop-blur-sm transition-all shadow-md ${
          isSubmitting
            ? "bg-gray-400 cursor-not-allowed opacity-70"
            : "bg-black/80 hover:bg-black hover:shadow-xl"
        }`}
      >
        <Send className="w-5 h-5" />
      </button>
    </div>
  );
}

MessageInput.propTypes = {
  roomId: PropTypes.string.isRequired,
};
