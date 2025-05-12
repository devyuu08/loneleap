import { Edit2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { formatDateOnly } from "utils/formatDate";
import LikeButton from "components/review/LikeButton";

export default function MyReviewCard({ review = {} }) {
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
  } = review;

  return (
    <div
      onClick={() => navigate(`/reviews/${id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          navigate(`/reviews/${id}`);
        }
      }}
      className="bg-white rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-transform duration-300 overflow-hidden text-black w-full max-w-xs cursor-pointer"
    >
      {/* 이미지 영역 */}
      <div className="relative h-48 bg-gray-100">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/assets/default-review-image.png";
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
            이미지 없음
          </div>
        )}

        {/* 작성일자 배지 */}
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

        {/* 별점 + 버튼 그룹 */}
        <div className="flex justify-between items-center mt-2">
          {/* 별점 */}
          <div className="text-sm text-yellow-500">
            {"★".repeat(rating)}
            <span className="text-gray-500 ml-1">{rating}점</span>
          </div>

          {/* 좋아요 + 수정 버튼 */}
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <LikeButton reviewId={review.id} likesCount={review.likesCount} />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/reviews/edit/${id}`);
              }}
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
