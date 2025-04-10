// src/components/chat/ChatRoomDetail.jsx
import { useEffect, useRef } from "react";
import { useChatMessages } from "hooks/useChatMessages";
import MessageInput from "./MessageInput";
import ChatMessage from "./ChatMessage";
import LoadingSpinner from "../LoadingSpinner";

export default function ChatRoomDetail({ roomId }) {
  const { messages, loading } = useChatMessages(roomId);
  const scrollRef = useRef(null);

  // 메시지가 바뀔 때마다 스크롤 아래로
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  if (!roomId) {
    return (
      <div className="text-center text-gray-500">채팅방 ID가 없습니다.</div>
    );
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div
      className="max-w-4xl mx-auto px-4 py-8 flex flex-col h-[calc(100vh-var(--header-height,80px))]"
      role="main"
      aria-label="채팅방"
    >
      {/* 상단 제목 영역 */}
      <div className="mb-4" role="heading" aria-level="1">
        <h2 className="text-xl font-bold">채팅방</h2>
        {/* 추후: Firestore에서 room 정보(title) 가져오기 */}
      </div>

      {/* 메시지 리스트 영역 */}
      <div
        className="flex-1 overflow-y-auto space-y-4 px-1"
        ref={scrollRef}
        role="log"
        aria-live="polite"
        aria-label="채팅 메시지"
      >
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
      </div>

      {/* 입력창 */}
      <div className="mt-4" role="form" aria-label="메시지 입력">
        <MessageInput roomId={roomId} />
      </div>
    </div>
  );
}
