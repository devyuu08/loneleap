import { useNavigate } from "react-router-dom";
import LikeButton from "./LikeButton";

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
 * @param {string} props.review.authorName - 작성자 이름
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
    authorName,
    createdAt,
    imageUrl,
  } = review || {};

  const formattedDate = createdAt?.toDate?.().toLocaleDateString("ko-KR") ?? "";
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
      className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 cursor-pointer overflow-hidden"
    >
      <img
        src={imageUrl || "/images/no_image.png"}
        alt={`${title} - ${destination} 리뷰 이미지`}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "/images/no_image.png"; // public 폴더 기준 경로
        }}
        className="w-full h-48 object-cover bg-gray-100"
      />

      <div className="p-5">
        <h2 className="text-lg font-bold text-gray-800 mb-1">{title}</h2>
        <p className="text-sm text-gray-500 mb-2">{destination}</p>
        <div className="flex text-sm mb-2">
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className={i < rating ? "text-yellow-500" : "text-gray-300"}
            >
              ★
            </span>
          ))}
        </div>
        {/* 하단 정보 + 좋아요 버튼 */}
        <div className="flex justify-between items-center text-xs text-gray-400">
          <span>{authorName || "익명"}</span>
          <div className="flex items-center gap-2">
            <LikeButton reviewId={id} />
            <span>{review.likesCount ?? 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
