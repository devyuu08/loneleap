import { formatDate } from "utils/formatDate";
import { Star, MapPin } from "lucide-react";

export default function ReviewHero({ review }) {
  const {
    title,
    destination,
    rating,
    authorName,
    authorPhotoURL,
    createdAt,
    imageUrl,
  } = review || {};

  return (
    <div className="relative h-[420px] w-full rounded-3xl overflow-hidden">
      <img
        src={imageUrl || "/images/no_image.png"}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover bg-gray-100"
        onError={(e) => {
          if (e.target.src.includes("no_image.png")) return;
          e.target.onerror = null;
          e.target.src = "/images/no_image.png";
        }}
      />
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 h-full flex flex-col justify-end pb-9 text-white">
        {/* 제목 */}
        <h1 className="text-3xl font-bold">{title}</h1>

        {/* 여행지 + 별점 */}
        <div className="flex items-center gap-4 text-sm opacity-90 my-2">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{destination}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-300" />
            <span>{rating}</span>
          </div>
        </div>

        {/* 작성자 + 날짜 */}
        <div className="flex items-center gap-3 mt-4 text-sm text-white/70">
          <img
            src={authorPhotoURL || "/default_profile.png"}
            alt="작성자"
            className="w-6 h-6 rounded-full object-cover"
          />
          <span>{authorName || "익명"}</span>
          <span className="text-xs">· {formatDate(createdAt)}</span>
        </div>
      </div>
    </div>
  );
}
