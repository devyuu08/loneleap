// src/components/mypage/MyChatRoomCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import { formatDateOnly } from "utils/formatDate";

export default function MyChatRoomCard({ room }) {
  const navigate = useNavigate();

  // 필수 속성이 없는 경우 대체 UI 표시
  if (!room || !room.id || !room.name) {
    return (
      <div className="bg-[#1f222c] rounded-2xl text-white shadow mb-6 p-6">
        <p className="text-red-400">채팅방 정보를 불러올 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#1f222c] rounded-2xl text-white shadow mb-6 p-6">
      {/* 상단: 제목 + 생성일 */}
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">{room.name}</h3>
        <span className="text-sm text-gray-400">
          {formatDateOnly(room.createdAt)}
        </span>
      </div>

      {/* 설명 */}
      {room.description && (
        <p className="text-sm text-gray-400 line-clamp-2 mb-4">
          {room.description}
        </p>
      )}

      {/* 참여자 수 */}
      {room.participants && (
        <p className="text-sm text-gray-500 mb-4">
          👥 {room.participants.length}명 참여 중
        </p>
      )}

      {/* 하단 버튼 */}
      <div className="flex justify-between items-center pt-4 border-t border-gray-700">
        <button
          onClick={() => navigate(`/chat/${room.id}`)}
          className="text-sm text-gray-300 hover:text-white transition"
          aria-label="채팅방 참여하기"
          role="button"
        >
          참여하기
        </button>
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
