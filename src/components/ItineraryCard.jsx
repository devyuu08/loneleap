// src/components/ItineraryCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function ItineraryCard({ itinerary }) {
  const navigate = useNavigate();

  const {
    id,
    title,
    location,
    startDate,
    endDate,
    userId, // 작성자 정보 (현재는 '나'만 표시)
  } = itinerary;

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border hover:shadow-md transition">
      {/* 이미지 자리 */}
      <div className="bg-gray-800 h-32 flex items-center justify-center text-white text-sm">
        [Destination Image]
      </div>

      {/* 본문 영역 */}
      <div className="p-4">
        <div className="text-sm text-gray-500">
          {startDate} - {endDate}
        </div>
        <h3 className="font-semibold text-lg mt-1">{title}</h3>

        <div className="mt-3 text-sm flex justify-between items-center">
          <span className="text-gray-400">by 나</span>
          <button
            onClick={() => navigate(`/itinerary/${id}`)}
            className="border border-gray-500 text-sm px-3 py-1 rounded hover:bg-gray-100 transition"
          >
            상세 보기
          </button>
        </div>
      </div>
    </div>
  );
}
