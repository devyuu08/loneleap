// src/components/mypage/MyItineraryCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function MyItineraryCard({ itinerary }) {
  const navigate = useNavigate();
  const { id, title, status, startDate, endDate, imageUrl } = itinerary;

  return (
    <div className="bg-[#1f222b] text-white rounded-xl p-5 shadow mb-6">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold">{title}</h3>
        <span className="text-sm bg-green-600 text-white px-2 py-1 rounded">
          {status}
        </span>
      </div>
      <p className="text-sm text-gray-300 mb-3">
        {startDate} ~ {endDate}
      </p>
      <div className="w-full h-40 bg-gray-700 rounded flex items-center justify-center text-sm text-gray-300">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover rounded"
          />
        ) : (
          <div className="flex items-center justify-center h-full w-full">
            <span>이미지가 없습니다</span>
          </div>
        )}
      </div>

      {/* 버튼 영역 */}
      <div className="flex justify-between items-center mt-4 text-sm">
        <button
          onClick={() => navigate(`/itinerary/${id}`)}
          className="text-gray-300 hover:text-white"
        >
          상세 보기
        </button>
      </div>
    </div>
  );
}
