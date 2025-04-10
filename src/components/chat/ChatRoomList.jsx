import { useNavigate } from "react-router-dom";
import { useChatRooms } from "services/queries/useChatRooms";
import ChatRoomCard from "./ChatRoomCard";
import LoadingSpinner from "components/LoadingSpinner";
import EmptyState from "components/EmptyState";

export default function ChatRoomList() {
  const navigate = useNavigate();
  const { data: rooms, isLoading } = useChatRooms();

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">나의 채팅방</h2>
        <button
          className="bg-gray-900 text-white px-4 py-2 rounded-md"
          onClick={() => navigate("/chat/create")}
        >
          + 새 채팅방
        </button>
      </div>

      {rooms?.length === 0 ? (
        <EmptyState message="아직 생성된 채팅방이 없습니다." />
      ) : (
        <div className="space-y-4">
          {rooms.map((room) => (
            <ChatRoomCard key={room.id} room={room} />
          ))}
        </div>
      )}
    </div>
  );
}
