import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import { formatDateOnly } from "@/utils/formatDate";
import { Bell } from "lucide-react";
import SkeletonImage from "../common/loading/SkeletonImage";

function MyChatRoomCard({ room }) {
  const navigate = useNavigate();

  const handleNavigate = useCallback(() => {
    navigate(`/chat/${room.id}`);
  }, [navigate, room.id]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" || e.key === " ") {
        navigate(`/chat/${room.id}`);
      }
    },
    [navigate, room.id]
  );

  if (!room?.id || !room?.name) {
    return (
      <div className="bg-gray-100 rounded-xl p-6 shadow-sm text-center text-gray-500">
        채팅방 정보를 불러올 수 없습니다.
      </div>
    );
  }

  return (
    <div
      onClick={handleNavigate}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="group bg-white rounded-xl shadow-lg hover:shadow-md hover:-translate-y-1 transition overflow-hidden cursor-pointer p-6 flex flex-col justify-between h-full"
    >
      {/* 상단: 제목 + 알림 뱃지 */}
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-base font-semibold text-gray-900 line-clamp-1">
          {room.name}
        </h3>

        <div className="flex items-center gap-1">
          <Bell className="w-4 h-4 text-sky-600" />
          <span className="bg-sky-800 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full shadow">
            2 {/* TODO: 임시 값, 추후 unreadCount로 대체 */}
          </span>
        </div>
      </div>

      {/* 설명 */}
      {room.description && (
        <p className="text-sm text-gray-500 line-clamp-2 mb-4">
          {room.description}
        </p>
      )}

      {/* 하단: 참여자 아바타 + 날짜 */}
      <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-200">
        {/* 참여자 */}
        <div className="flex -space-x-2">
          {room.participants?.slice(0, 5).map((user, index) => (
            <SkeletonImage
              key={index}
              src={user.photoURL || "/images/default-profile.png"}
              alt="참여자"
              className="w-6 h-6 object-cover rounded-full border-2 border-white"
            />
          ))}

          {room.participants?.length > 5 && (
            <span className="text-xs text-gray-500 ml-2">
              +{room.participants.length - 5}
            </span>
          )}
        </div>

        {/* 생성일 */}
        <span className="text-xs text-gray-400">
          {formatDateOnly(room.createdAt)}
        </span>
      </div>
    </div>
  );
}

MyChatRoomCard.propTypes = {
  room: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    createdAt: PropTypes.object,
    description: PropTypes.string,
    participants: PropTypes.array,
  }).isRequired,
};

export default React.memo(MyChatRoomCard);
