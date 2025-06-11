import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import SkeletonImage from "@/components/common/loading/SkeletonImage";

/**
 * RecommendationCard
 * - 추천 여행지 리스트에서 사용되는 카드 컴포넌트
 * - 이미지, 이름, 요약 설명, 위치, 혼행 선호도 정보 표시
 * - 클릭 시 상세 페이지(`/recommendations/:id`)로 이동
 */

function RecommendationCard({ recommendation }) {
  const { id, name, location, imageUrl, summary } = recommendation;

  return (
    <Link
      to={`/recommendations/${id}`}
      className="group block rounded-2xl overflow-hidden shadow hover:shadow-lg transition bg-white"
      aria-label={`${name} 추천지 자세히 보기`}
    >
      {/* 이미지 영역 */}
      <figure className="relative w-full h-56">
        <SkeletonImage
          src={imageUrl}
          alt={name}
          objectFit="cover"
          size="w-full h-full"
        />
        <figcaption className="absolute bottom-3 left-3 bg-black/60 text-white text-xs px-3 py-1 rounded-full">
          {location}
        </figcaption>
      </figure>

      {/* 텍스트 정보 영역 */}
      <div className="p-4 space-y-1">
        <h3 className="text-base font-semibold text-gray-900">{name}</h3>
        <p className="text-sm text-gray-500 line-clamp-2">{summary}</p>

        <div className="flex items-center justify-between text-xs text-gray-400 mt-1">
          {/* 왼쪽: 혼행 선호도 아이콘 */}
          <span className="flex items-center gap-1">
            <Sparkles className="w-4 h-4" />
            혼행 선호도 높음
          </span>

          {/* 오른쪽: 이동 화살표 */}
          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform duration-200" />
        </div>
      </div>
    </Link>
  );
}

export default React.memo(RecommendationCard);
