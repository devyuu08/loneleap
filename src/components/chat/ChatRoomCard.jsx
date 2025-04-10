import { useNavigate } from "react-router-dom";
import { formatRelative } from "date-fns";
import { ko } from "date-fns/locale";

export default function ChatRoomCard({ room }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/chat/${room.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer p-4 border rounded-lg shadow-sm hover:shadow-md transition"
    >
      {/* 제목 */}
      <h3 className="text-lg font-semibold text-gray-900 mb-1">{room.name}</h3>

      {/* 설명 */}
      {room.description && (
        <p className="text-sm text-gray-700 line-clamp-1 mb-2">
          {room.description}
        </p>
      )}

      {/* 생성일 */}
      {room.createdAt?.toDate && (
        <p className="text-xs text-gray-500">
          생성일:{" "}
          {formatRelative(room.createdAt.toDate(), new Date(), {
            locale: ko,
          })}
        </p>
      )}
    </div>
  );
}
