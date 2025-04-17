// src/components/mypage/MyReviewCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function MyReviewCard({ review }) {
  const navigate = useNavigate();
  return (
    <div className="bg-[#1f222c] rounded-2xl overflow-hidden text-white shadow mb-6">
      {/* 제목 + 날짜 */}
      <div className="flex justify-between items-center px-6 pt-6">
        <h3 className="text-lg font-semibold">
          {review.title || "리뷰 제목 없음"}
        </h3>
        <span className="text-sm text-gray-400">
          {new Date(review.createdAt).toLocaleDateString("ko-KR")}
        </span>
      </div>

      {/* 목적지 & 별점 */}
      <div className="px-6 mt-1 text-sm text-gray-400">
        {review.destination && <div className="mb-1">{review.destination}</div>}
        <div className="text-yellow-400 mb-2">
          {"★".repeat(review.rating)}
          <span className="text-gray-400 ml-1">{review.rating}점</span>
        </div>
      </div>

      {/* 이미지 */}
      <div className="bg-[#2f3340] h-48 flex items-center justify-center mx-6 rounded-lg mb-4">
        {review.imageUrl ? (
          <img
            src={review.imageUrl}
            alt="리뷰 이미지"
            className="w-full h-48 object-cover rounded-lg"
          />
        ) : (
          <span className="text-gray-400">[리뷰 이미지 자리]</span>
        )}
      </div>

      {/* 본문 */}
      <div className="px-6 text-sm text-gray-300 leading-relaxed mb-4 whitespace-pre-wrap">
        {review.content}
        {review.reported && (
          <div className="mt-2 text-xs text-red-500 font-medium">
            🚨 신고된 리뷰입니다
          </div>
        )}
      </div>

      {/* 하단 버튼 */}
      <div className="flex justify-between items-center px-6 py-4 border-t border-gray-700">
        <button
          onClick={() => navigate(`/reviews/${review.id}`)}
          className="text-sm text-gray-300 hover:text-white transition"
        >
          상세 보기
        </button>
        <button className="text-sm text-gray-300 hover:text-white transition">
          문의
        </button>
      </div>
    </div>
  );
}
