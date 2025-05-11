import PropTypes from "prop-types";

import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { formatDateOnly } from "utils/formatDate";
import { Users } from "lucide-react";

export default function ChatRoomCard({ room = {} }) {
  const navigate = useNavigate();

  const roomId = room?.id;
  const handleClick = useCallback(() => {
    if (roomId) {
      navigate(`/chat/${roomId}`);
    }
  }, [navigate, roomId]);

  return (
    <article
      onClick={handleClick}
      className="cursor-pointer p-4 border rounded-lg shadow-sm hover:shadow-md transition focus:outline-none focus:ring-2 focus:ring-blue-300"
      aria-label={`${room.name} 채팅방`}
      role="button"
      tabIndex="0"
      onKeyDown={(e) => {
        if (e.key === "Enter") handleClick();
        if (e.key === "Escape") e.target.blur();
      }}
    >
      {/* 카테고리 뱃지 */}
      {room.category && (
        <span
          className={`inline-block text-xs font-medium px-2 py-1 rounded-full mb-2 ${
            room.category === "동행"
              ? "bg-blue-100 text-blue-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {room.category}
        </span>
      )}

      {/* 제목 */}
      <h3 className="text-lg font-semibold text-gray-900 mb-1">{room.name}</h3>

      {/* 설명 */}
      {room.description && (
        <p className="text-sm text-gray-700 line-clamp-1 mb-2">
          {room.description}
        </p>
      )}

      {/* 하단 정보: 참여자 수 + 생성일 */}
      <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
        <span className="flex items-center gap-1">
          <Users className="w-4 h-4" />
          {room.participants?.length || 0}명 참여중
        </span>
        <span>{formatDateOnly(room.createdAt)}</span>
      </div>
    </article>
  );
}

ChatRoomCard.propTypes = {
  room: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    createdAt: PropTypes.object,
    category: PropTypes.string, // "동행" or "정보"
  }).isRequired,
};
