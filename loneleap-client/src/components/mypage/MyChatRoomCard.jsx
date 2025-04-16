// src/components/mypage/MyChatRoomCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function MyChatRoomCard({ room }) {
  const navigate = useNavigate(); // 훅 초기화

  return (
    <div className="bg-[#1f222c] rounded-2xl text-white shadow mb-6 p-6">
      {/* 상단: 제목 + 생성일 */}
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">{room.name}</h3>
        <span className="text-sm text-gray-400">
          {room.createdAt?.toDate
            ? room.createdAt.toDate().toLocaleDateString("ko-KR")
            : "날짜 없음"}
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
          onClick={() => navigate(`/chat/${room.id}`)} // 라우팅 연결
          className="text-sm text-gray-300 hover:text-white transition"
        >
          참여하기
        </button>
        <button className="text-sm text-gray-300 hover:text-white transition">
          신고
        </button>
      </div>
    </div>
  );
}
