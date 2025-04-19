import PropTypes from "prop-types";

import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { formatDateOnly } from "utils/formatDate";

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
      <h3 className="text-lg font-semibold text-gray-900 mb-1">{room.name}</h3>

      {room.description && (
        <p className="text-sm text-gray-700 line-clamp-1 mb-2">
          {room.description}
        </p>
      )}

      <p className="text-xs text-gray-500">{formatDateOnly(room.createdAt)}</p>
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
