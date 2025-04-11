import PropTypes from "prop-types";

import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { formatRelative } from "date-fns";
import { ko } from "date-fns/locale";

export default function ChatRoomCard({ room = {} }) {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    if (room?.id) {
      navigate(`/chat/${room.id}`);
    }
  }, [navigate, room.id]);

  return (
    <article
      onClick={handleClick}
      className="cursor-pointer p-4 border rounded-lg shadow-sm hover:shadow-md transition"
      aria-label={`${room.name} 채팅방`}
      role="button"
      tabIndex="0"
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
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
          {(() => {
            try {
              const date = room.createdAt.toDate();
              const isOlderThanOneYear =
                new Date().getTime() - date.getTime() >
                365 * 24 * 60 * 60 * 1000;

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
          })()}
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
