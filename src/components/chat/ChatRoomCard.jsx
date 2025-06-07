import PropTypes from "prop-types";

import React, { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { MessageCircle, Users } from "lucide-react";
import { formatRelativeTime } from "@/utils/formatRelativeTime";

function ChatRoomCard({ room = {} }) {
  const navigate = useNavigate();

  const roomId = room?.id;
  const handleClick = useCallback(() => {
    if (roomId) {
      navigate(`/chat/${roomId}`);
    }
  }, [navigate, roomId]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter") handleClick();
      if (e.key === "Escape") e.target.blur();
    },
    [handleClick]
  );

  const formattedTime = useMemo(() => {
    return formatRelativeTime(room.createdAt);
  }, [room.createdAt]);

  const CHAT_CARD_WRAPPER =
    "flex justify-between items-start p-5 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer";

  return (
    <article
      onClick={handleClick}
      className={CHAT_CARD_WRAPPER}
      role="button"
      tabIndex="0"
      aria-label={`${room.name} 채팅방`}
      onKeyDown={handleKeyDown}
    >
      {/* 왼쪽: 텍스트 정보 */}
      <div className="flex-1 space-y-2">
        {/* 제목 + 뱃지 */}
        <div className="flex items-center gap-4">
          <MessageCircle className="w-5 h-5 text-gray-500" />
          <h3 className="text-base font-semibold text-gray-900">{room.name}</h3>
          {room.category && (
            <span
              className={`inline-block text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm ${
                room.category === "동행"
                  ? "bg-[#8C5C5C]/10 text-[#8C5C5C]"
                  : "bg-[#4A6178]/10 text-[#4A6178]"
              }`}
            >
              {room.category}
            </span>
          )}
        </div>

        {/* 설명 */}
        {room.description && (
          <p className="text-sm text-gray-600 line-clamp-2">
            {room.description}
          </p>
        )}

        {/* 하단 정보 */}
        <div className="flex items-center justify-between text-xs text-gray-500 pt-2">
          <span className="flex items-center gap-1">
            <Users className="w-4 h-4 text-gray-500" />
            {room.participants?.length || 0}명 참여중
          </span>
          <span>{formattedTime}</span>
        </div>
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

export default React.memo(ChatRoomCard);
