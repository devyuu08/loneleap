import MessageInput from "./MessageInput";
import ChatMessage from "./ChatMessage";
import ChatHeader from "components/chat/ChatHeader";
import ParticipantListContainer from "containers/chat/ParticipantListContainer";

export default function ChatRoomDetail({
  roomInfo,
  messages,
  onLeave,
  scrollRef,
  roomId,
}) {
  return (
    <section
      className="relative h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{ backgroundImage: "url('/images/chat-detail-bg.jpg')" }}
    >
      {/* 어두운 오버레이 */}
      <div className="absolute inset-0 bg-black/20 z-0" />

      {/* 채팅 박스 */}
      <div className="relative z-10 w-full max-w-6xl h-full md:h-[90vh] bg-white rounded-2xl shadow-xl overflow-hidden flex">
        {/* 참여자 목록 (좌측 사이드) */}
        <aside className="hidden md:block w-64 border-r border-gray-200 bg-white/70 backdrop-blur-md p-4">
          <ParticipantListContainer roomId={roomId} />
        </aside>

        {/* 채팅 영역 */}
        <div className="flex-1 flex flex-col">
          {/* 상단 헤더 */}
          <ChatHeader
            title={roomInfo.name || "채팅방"}
            userName={roomInfo.createdBy?.displayName || "익명"}
            onLeave={onLeave}
          />

          {/* 메시지 목록 */}
          <div
            className="flex-1 overflow-y-auto px-4 py-4 space-y-4"
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
          <div className="px-4 pb-6">
            <div className="rounded-2xl bg-white/80 backdrop-blur-md shadow-lg border border-gray-200 p-3">
              <MessageInput roomId={roomId} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
