import { useNavigate } from "react-router-dom";
import { useChatRooms } from "services/queries/chat/useChatRooms";
import ChatRoomCard from "./ChatRoomCard";
import LoadingSpinner from "components/common/LoadingSpinner.jsx";
import EmptyState from "components/common/EmptyState";

export default function ChatRoomList() {
  const navigate = useNavigate();
  const { data: rooms, isLoading } = useChatRooms();

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">채팅방 목록</h2>
          <p className="text-sm text-gray-500 mt-1">
            여행 정보 또는 동행자를 찾고 싶다면 채팅방을 만들어보세요!
          </p>
        </div>

        <button
          className="bg-gray-900 text-white px-4 py-2 rounded-md"
          onClick={() => navigate("/chat/create")}
          aria-label="새 채팅방 만들기"
        >
          + 새 채팅방
        </button>
      </div>
      {rooms?.length === 0 ? (
        <EmptyState
          icon="💬"
          title="아직 생성된 채팅방이 없습니다."
          description="지금 바로 새 채팅방을 만들어보세요!"
        />
      ) : (
        <div className="space-y-4">
          {rooms?.map((room) => (
            <ChatRoomCard key={room.id} room={room} />
          ))}
        </div>
      )}
    </div>
  );
}
