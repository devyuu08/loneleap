import ChatHeader from "@/components/chat/ChatHeader";
import ParticipantListContainer from "@/containers/chat/ParticipantListContainer";
import MessageInputContainer from "@/containers/chat/MessageInputContainer";
import ChatMessageContainer from "@/containers/chat/ChatMessageContainer";
import { useMemo } from "react";

/**
 * 채팅방 상세 페이지 컴포넌트
 * - 참여자 목록 (좌측 사이드바)
 * - 채팅 메시지 목록
 * - 메시지 입력창
 */

export default function ChatRoomDetail({
  roomInfo,
  messages,
  onLeave,
  scrollRef,
  roomId,
}) {
  // 배경 이미지 스타일 설정
  const backgroundStyle = useMemo(
    () => ({
      backgroundImage: "url('/images/chat-detail-bg.jpg')",
    }),
    []
  );

  const roomName = roomInfo.name || "채팅방";
  const creatorName = roomInfo.createdBy?.displayName || "익명";

  const CHAT_ROOM_SIDEBAR =
    "hidden md:block w-64 border-r border-gray-200 bg-white/70 backdrop-blur-md p-4";

  return (
    <section
      className="relative h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={backgroundStyle}
    >
      {/* 배경 오버레이 */}
      <div className="absolute inset-0 bg-black/20 z-0" />

      {/* 채팅 UI 박스 */}
      <div className="relative z-10 w-full max-w-6xl h-full md:h-[90vh] bg-white rounded-2xl shadow-xl overflow-hidden flex">
        {/* 참여자 목록 사이드바 */}
        <aside className={CHAT_ROOM_SIDEBAR}>
          <ParticipantListContainer roomId={roomId} />
        </aside>

        {/* 채팅 영역 */}
        <main className="flex-1 flex flex-col">
          {/* 채팅방 헤더 */}
          <ChatHeader
            title={roomName}
            userName={creatorName}
            onLeave={onLeave}
          />

          {/* 채팅 메시지 목록 */}
          <section
            className="flex-1 overflow-y-auto px-4 py-4 space-y-4"
            ref={scrollRef}
            role="log"
            aria-live="polite"
            aria-label="채팅 메시지"
          >
            {messages.map((msg) => (
              <ChatMessageContainer key={msg.id} message={msg} />
            ))}
          </section>

          {/* 채팅 입력 영역 */}
          <footer className="px-4 pb-6">
            <div className="rounded-2xl bg-white/80 backdrop-blur-md shadow-lg border border-gray-200 p-3">
              <MessageInputContainer roomId={roomId} />
            </div>
          </footer>
        </main>
      </div>
    </section>
  );
}
