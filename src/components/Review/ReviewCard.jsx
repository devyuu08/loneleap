import { useNavigate } from "react-router-dom";

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
  } = review;

  const formattedDate = createdAt?.toDate?.().toLocaleDateString("ko-KR") ?? "";

  return (
    <div
      onClick={() => navigate(`/reviews/${id}`)}
      className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 cursor-pointer overflow-hidden"
    >
      {imageUrl && (
        <img
          src={imageUrl}
          alt="리뷰 이미지"
          className="w-full h-48 object-cover"
        />
      )}

      <div className="p-5">
        <h2 className="text-lg font-bold text-gray-800 mb-1">{title}</h2>
        <p className="text-sm text-gray-500 mb-2">{destination}</p>
        <p className="text-yellow-500 text-sm mb-2">{"★".repeat(rating)}</p>
        <p className="text-sm text-gray-700 mb-3 line-clamp-3">
          {content.length > 100 ? `${content.slice(0, 100)}...` : content}
        </p>
        <div className="flex justify-between text-xs text-gray-400">
          <span>{authorName || "익명"}</span>
          <span>{formattedDate}</span>
        </div>
      </div>
    </div>
  );
}
