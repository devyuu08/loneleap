import { Link } from "react-router-dom";

export default function RecommendationCard({ recommendation }) {
  const { id, name, location, imageUrl, summary } = recommendation;

  return (
    <Link
      to={`/recommendations/${id}`}
      className="group block overflow-hidden rounded-2xl shadow hover:shadow-lg transition-all bg-white"
    >
      {/* 이미지 */}
      <div className="relative w-full h-52">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover rounded-t-2xl"
        />
        {/* 오버레이 지역명 */}
        <span className="absolute bottom-2 left-3 bg-black bg-opacity-60 text-white text-sm px-3 py-1 rounded-full">
          {location}
        </span>
      </div>

      {/* 텍스트 정보 */}
      <div className="p-4 space-y-1">
        <h3 className="text-base font-semibold text-gray-900">{name}</h3>
        <p className="text-sm text-gray-500">{summary}</p>
        <div className="text-xs text-gray-400 mt-1">🌿 혼행 감성도 장소</div>
      </div>
    </Link>
  );
}
