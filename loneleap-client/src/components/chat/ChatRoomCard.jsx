import PropTypes from "prop-types";

import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { formatRelative } from "date-fns";
import { ko } from "date-fns/locale";

// 날짜 포맷팅 유틸리티 함수
const formatCreatedAt = (createdAt) => {
  try {
    const date = createdAt.toDate();
    const isOlderThanOneYear =
      new Date().getTime() - date.getTime() > 365 * 24 * 60 * 60 * 1000;

    if (isOlderThanOneYear) {
      return new Intl.DateTimeFormat("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(date);
    }

    return formatRelative(date, new Date(), {
      locale: ko,
    });
  } catch (error) {
    console.error("날짜 포맷팅 오류:", error);
    return "날짜 정보 없음";
  }
};

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
      {/* 제목 */}
      <h3 className="text-lg font-semibold text-gray-900 mb-1">{room.name}</h3>

      {/* 설명 */}
      {room.description && (
        <p className="text-sm text-gray-700 line-clamp-1 mb-2">
          {room.description}
        </p>
      )}

      {/* 생성일 */}
      {room.createdAt && typeof room.createdAt.toDate === "function" && (
        <p className="text-xs text-gray-500">
          {formatCreatedAt(room.createdAt)}
        </p>
      )}
    </article>
  );
}

ChatRoomCard.propTypes = {
  room: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    createdAt: PropTypes.object,
  }).isRequired,
};
