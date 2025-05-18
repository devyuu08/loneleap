import { ArrowRight, Heart, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import SkeletonImage from "components/common/SkeletonImage";

export default function RecommendationCard({ recommendation }) {
  const { id, name, location, imageUrl, summary } = recommendation;

  return (
    <Link
      to={`/recommendations/${id}`}
      className="group block rounded-2xl overflow-hidden shadow hover:shadow-lg transition bg-white"
    >
      {/* 이미지 섹션 */}
      <section className="relative w-full h-56">
        <SkeletonImage
          src={imageUrl || "/images/no_image.png"}
          alt={name}
          className="w-full h-full object-cover"
        />
        <span className="absolute bottom-3 left-3 bg-black/60 text-white text-xs px-3 py-1 rounded-full">
          {location}
        </span>
      </section>

      {/* 텍스트 정보 */}
      <section className="p-4 space-y-1">
        <h3 className="text-base font-semibold text-gray-900">{name}</h3>
        <p className="text-sm text-gray-500">{summary}</p>

        <div className="flex items-center justify-between text-xs text-gray-400 mt-1">
          {/* 왼쪽: 아이콘 + 텍스트 */}
          <span className="flex items-center gap-1">
            <Sparkles className="w-4 h-4" />
            혼행 선호도 높음
          </span>

          {/* 오른쪽: 화살표 */}
          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform duration-200" />
        </div>
      </section>
    </Link>
  );
}
