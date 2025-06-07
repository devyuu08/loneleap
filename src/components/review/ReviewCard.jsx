import React from "react";
import { useNavigate } from "react-router-dom";
import SkeletonImage from "@/components/common/loading/SkeletonImage";
import LikeButtonContainer from "@/containers/review/LikeButtonContainer";

/**
 * ReviewCard
 * - 개별 리뷰 정보를 카드 형태로 표시
 * - 리뷰 썸네일, 별점, 제목, 작성자, 좋아요 버튼 포함
 * - 클릭 또는 Enter/Space 키로 리뷰 상세 페이지로 이동
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
    <article
      onClick={() => navigate(`/reviews/${id}`)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          navigate(`/reviews/${id}`);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`리뷰: ${title}`}
      className="group bg-white rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden cursor-pointer outline-none focus:ring-2 focus:ring-black"
    >
      {/* 이미지 섹션 */}
      <figure className="relative h-56">
        <SkeletonImage
          src={imageUrl}
          alt={`${title} 리뷰 썸네일`}
          objectFit="cover"
          size="w-full h-full"
        />
        <figcaption className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-3 py-1 rounded-full">
          {destination || "여행지 미정"}
        </figcaption>
      </figure>

      {/* 본문 섹션 */}
      <div className="p-4 space-y-1">
        {/* 별점 + 작성일 */}
        <div className="flex justify-between items-center text-sm text-gray-600 mb-1">
          <div className="flex items-center" aria-label={`별점: ${rating}점`}>
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

        {/* 작성자 정보 + 좋아요 */}
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center gap-2 max-w-[calc(100%-40px)]">
            <span className="text-xs text-gray-500 truncate max-w-[100px]">
              {createdBy?.displayName || "익명"}
            </span>
            <SkeletonImage
              src={createdBy?.photoURL || "/images/default-profile.png"}
              alt={`${createdBy?.displayName || "익명"}의 프로필`}
              objectFit="cover"
              size="w-6 h-6"
              className="rounded-full border border-white/10"
            />
          </div>
          <LikeButtonContainer reviewId={id} likesCount={review.likesCount} />
        </div>
      </div>
    </article>
  );
}

export default React.memo(ReviewCard);
