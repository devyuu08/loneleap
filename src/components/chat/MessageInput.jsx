// src/components/chat/MessageInput.jsx
import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "services/firebase";
import { useSelector } from "react-redux";

export default function MessageInput({ roomId }) {
  const [message, setMessage] = useState("");
  const user = useSelector((state) => state.user.user);

  const handleSend = async () => {
    if (!message.trim()) return;
    if (!user) return;

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
      alert("메시지 전송에 실패했습니다.");
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
      />
      <button
        onClick={handleSend}
        className="bg-gray-900 text-white px-4 rounded-md"
      >
        전송
      </button>
    </div>
  );
}
