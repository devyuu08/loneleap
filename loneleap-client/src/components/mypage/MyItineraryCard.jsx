// src/components/mypage/MyItineraryCard.jsx
import React from "react";

export default function MyItineraryCard({ itinerary }) {
  return (
    <div className="bg-[#1f222b] text-white rounded-xl p-5 shadow mb-6">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold">{itinerary.title}</h3>
        <span className="text-sm bg-green-600 text-white px-2 py-1 rounded">
          {itinerary.status}
        </span>
      </div>
      <p className="text-sm text-gray-300 mb-3">
        {itinerary.startDate} ~ {itinerary.endDate}
      </p>
      <div className="w-full h-40 bg-gray-700 rounded flex items-center justify-center text-sm text-gray-300">
        [여행지 이미지 자리]
      </div>
      <div className="flex justify-between items-center mt-4 text-sm">
        <button className="text-gray-300 hover:text-white">상세 보기</button>
        <button className="text-gray-300 hover:text-white">문의</button>
      </div>
    </div>
  );
}
