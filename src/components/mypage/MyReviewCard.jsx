import React, { useCallback } from "react";
import { Edit2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { formatDateOnly } from "@/utils/formatDate";
import SkeletonImage from "@/components/common/loading/SkeletonImage";
import LikeButtonContainer from "@/containers/review/LikeButtonContainer";

function MyReviewCard({ review = {} }) {
  const navigate = useNavigate();
  const {
    id = "",
    title = "",
    destination = "",
    content = "",
    rating = 0,
    createdAt = new Date(),
    imageUrl = "",
    reported = false,
    likesCount = 0,
  } = review;

  const handleNavigate = useCallback(() => {
    navigate(`/reviews/${id}`);
  }, [navigate, id]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" || e.key === " ") {
        navigate(`/reviews/${id}`);
      }
    },
    [navigate, id]
  );

  const handleEditClick = useCallback(
    (e) => {
      e.stopPropagation();
      navigate(`/reviews/edit/${id}`);
    },
    [navigate, id]
  );

  if (!id || !title) {
    return (
      <div className="bg-gray-100 rounded-xl p-6 shadow-sm text-center text-gray-500">
        리뷰 정보를 불러올 수 없습니다.
      </div>
    );
  }

  return (
    <div
      onClick={handleNavigate}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      className="bg-white rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-transform duration-300 overflow-hidden text-black w-full max-w-xs cursor-pointer"
    >
      {/* 이미지 영역 */}
      <div className="relative h-48 bg-gray-100">
        <SkeletonImage
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-3 py-1 rounded-full">
          {formatDateOnly(createdAt)}
        </div>
      </div>

      {/* 텍스트 영역 */}
      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-base font-semibold line-clamp-1">
          {title || "리뷰 제목 없음"}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2">
          {destination || "여행지 정보 없음"}
        </p>

        {reported && (
          <div className="text-xs text-red-500 font-medium mt-1">
            🚨 신고된 리뷰입니다
          </div>
        )}

        <div className="flex justify-between items-center mt-2">
          <div className="text-sm text-yellow-500">
            {"★".repeat(rating)}
            <span className="text-gray-500 ml-1">{rating}점</span>
          </div>

          <div className="flex items-center gap-3 text-sm text-gray-500">
            <LikeButtonContainer reviewId={id} likesCount={likesCount} />
            <button
              type="button"
              onClick={handleEditClick}
              className="hover:underline"
            >
              <Edit2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(MyReviewCard);
