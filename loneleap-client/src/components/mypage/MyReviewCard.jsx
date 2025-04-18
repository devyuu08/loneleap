import React from "react";
import { useNavigate } from "react-router-dom";

import { formatDateOnly } from "utils/formatDate";

function MyReviewCard({ review = {} }) {
  const navigate = useNavigate();
  // 객체 디스트럭처링 및 기본값 설정
  const {
    id = "",
    title = "",
    destination = "",
    content = "",
    rating = 0,
    createdAt = new Date(),
    imageUrl = "",
    reported = false,
  } = review;

  return (
    <div className="bg-[#1f222c] rounded-2xl overflow-hidden text-white shadow mb-6">
      {/* 제목 + 날짜 */}
      <div className="flex justify-between items-center px-6 pt-6">
        <h3 className="text-lg font-semibold">{title || "리뷰 제목 없음"}</h3>
        <span className="text-sm text-gray-400">
          {formatDateOnly(createdAt)}
        </span>
      </div>

      {/* 목적지 & 별점 */}
      <div className="px-6 mt-1 text-sm text-gray-400">
        {destination && <div className="mb-1">{destination}</div>}
        <div className="text-yellow-400 mb-2">
          {"★".repeat(rating)}
          <span className="text-gray-400 ml-1">{rating}점</span>
        </div>
      </div>

      {/* 이미지 */}
      <div className="bg-[#2f3340] h-48 flex items-center justify-center mx-6 rounded-lg mb-4">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="리뷰 이미지"
            className="w-full h-48 object-cover rounded-lg"
          />
        ) : (
          <span className="text-gray-400">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={title}
                className="w-full h-full object-cover rounded"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/assets/default-review-image.png";
                }}
              />
            ) : (
              <div className="flex items-center justify-center h-full w-full">
                <span>이미지가 없습니다</span>
              </div>
            )}
          </span>
        )}
      </div>

      {/* 본문 */}
      <div className="px-6 text-sm text-gray-300 leading-relaxed mb-4 whitespace-pre-wrap">
        {content || <span className="text-gray-400">내용 없음</span>}
        {reported && (
          <div className="mt-2 text-xs text-red-500 font-medium">
            🚨 신고된 리뷰입니다
          </div>
        )}
      </div>

      {/* 하단 버튼 */}
      <div className="flex justify-between items-center px-6 py-4 border-t border-gray-700">
        <button
          onClick={() =>
            id ? navigate(`/reviews/${id}`) : alert("리뷰 ID 정보가 없습니다")
          }
          className="text-sm text-gray-300 hover:text-white transition"
        >
          상세 보기
        </button>
      </div>
    </div>
  );
}

export default React.memo(MyReviewCard);
