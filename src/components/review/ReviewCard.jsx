import React from "react";
import { useNavigate } from "react-router-dom";
import SkeletonImage from "@/components/common/loading/SkeletonImage";
import LikeButtonContainer from "@/containers/review/LikeButtonContainer";

/**
 * 리뷰 정보를 카드 형태로 표시하는 컴포넌트
 *
 * @param {Object} props
 * @param {Object} props.review - 리뷰 정보 객체
 * @param {string} props.review.id - 리뷰 ID
 * @param {string} props.review.title - 리뷰 제목
 * @param {string} props.review.destination - 여행지 이름
 * @param {string} props.review.content - 리뷰 내용
 * @param {number} props.review.rating - 평점 (1-5)
 * @param {Object} props.review.createdBy - 작성자 정보
 * @param {string} props.review.createdBy.uid - 작성자 UID
 * @param {string} props.review.createdBy.displayName - 작성자 이름
 * @param {string} props.review.createdBy.photoURL - 작성자 프로필 이미지
 * @param {Object} props.review.createdAt - 작성 일시 (Firestore Timestamp)
 * @param {string} props.review.imageUrl - 이미지 URL (선택적)
 */

function ReviewCard({ review }) {
  const navigate = useNavigate();
  const { id, title, destination, rating, createdBy, createdAt, imageUrl } =
    review || {};

  const formattedDate =
    createdAt instanceof Date
      ? createdAt.toLocaleDateString("ko-KR")
      : createdAt?.toDate?.().toLocaleDateString("ko-KR") ?? "";

  return (
    <div
      onClick={() => navigate(`/reviews/${id}`)}
      role="button"
      tabIndex="0"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          navigate(`/reviews/${id}`);
        }
      }}
      className="group bg-white rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden cursor-pointer"
    >
      {/* 이미지 썸네일 */}
      <div className="relative h-56">
        <SkeletonImage
          src={imageUrl}
          alt={`${title} 썸네일`}
          className="w-full h-full"
          objectFit="cover"
        />
        {/* 여행지 태그 */}
        <span className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-3 py-1 rounded-full">
          {destination || "여행지 미정"}
        </span>
      </div>

      {/* 본문 */}
      <div className="p-4 space-y-1">
        {/* 별점 + 작성일 */}
        <div className="flex justify-between items-center text-sm text-gray-600 mb-1">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={i < rating ? "text-yellow-500" : "text-gray-300"}
              >
                ★
              </span>
            ))}
          </div>

          <span className="text-xs text-gray-400">{formattedDate}</span>
        </div>

        {/* 제목 */}
        <h3 className="text-base font-semibold text-gray-900 line-clamp-1">
          {title || "제목 없음"}
        </h3>

        {/* TODO: review.summary 필드 도입 후, 여기에 요약 내용으로 대체 예정 */}
        <p className="text-sm text-gray-500 italic">여행자의 솔직한 이야기</p>

        {/* 작성자 + 좋아요 */}
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center gap-2 max-w-[calc(100%-40px)]">
            <span className="text-xs text-gray-500 truncate max-w-[100px]">
              {createdBy?.displayName || "익명"}
            </span>

            <SkeletonImage
              src={createdBy?.photoURL || "/images/default-profile.png"}
              alt="작성자"
              className="w-5 h-5 rounded-full border border-white/10"
              objectFit="cover"
              size="w-6 h-6"
            />
          </div>
          <LikeButtonContainer
            reviewId={review.id}
            likesCount={review.likesCount}
          />
        </div>
      </div>
    </div>
  );
}

export default React.memo(ReviewCard);
