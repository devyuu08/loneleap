import { useNavigate } from "react-router-dom";
import LikeButton from "components/review/LikeButton";
import SkeletonImage from "components/common/SkeletonImage";

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

export default function ReviewCard({ review }) {
  const navigate = useNavigate();
  const {
    id,
    title,
    destination,
    content,
    rating,
    createdBy,
    createdAt,
    imageUrl,
  } = review || {};

  const formattedDate =
    createdAt instanceof Date
      ? createdAt.toLocaleDateString("ko-KR")
      : createdAt?.toDate?.().toLocaleDateString("ko-KR") ?? "";

  const truncatedContent =
    content && content.length > 100 ? `${content.slice(0, 100)}...` : content;

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
        <img
          src={imageUrl || "/images/no_image.png"}
          alt={`${title} 썸네일`}
          className="w-full h-full object-cover bg-gray-100"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/images/no_image.png";
          }}
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

        {/* 내용 요약 */}
        <p className="text-sm text-gray-500 line-clamp-2">
          {truncatedContent || "리뷰 내용이 없습니다."}
        </p>

        {/* 작성자 + 좋아요 */}
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 truncate max-w-[100px]">
              {createdBy?.displayName || "익명"}
            </span>
            <SkeletonImage
              src={createdBy?.photoURL || "/default_profile.png"}
              alt="작성자"
              className="w-5 h-5 rounded-full object-cover"
            />
          </div>
          <LikeButton reviewId={review.id} likesCount={review.likesCount} />
        </div>
      </div>
    </div>
  );
}
