import React from "react";
import { formatDate } from "@/utils/formatDate";
import { Star, MapPin } from "lucide-react";
import SkeletonImage from "@/components/common/loading/SkeletonImage";

/**
 * ReviewHero
 * - 리뷰 상세 페이지 상단 Hero 섹션
 * - 대표 이미지 배경 + 제목 + 여행지 + 별점 + 작성자 정보 표시
 * - 이미지가 로딩 중일 때 SkeletonImage로 대체 렌더링
 * - 작성자 정보 및 날짜는 조건부로 출력
 */

function ReviewHero({ review }) {
  const { title, destination, rating, createdBy, createdAt, imageUrl } =
    review || {};

  return (
    <div className="relative w-full h-80 sm:h-[360px] md:h-[420px] rounded-3xl overflow-hidden">
      {/* 배경 이미지 */}
      <div className="absolute inset-0 z-0">
        <SkeletonImage
          src={imageUrl}
          alt={title}
          objectFit="cover"
          absolute
          size="w-full h-full"
        />
        {/* 어두운 오버레이 */}
        <div className="absolute inset-0 bg-black/35" />
      </div>

      {/* 텍스트 정보 레이어 */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 md:px-12 h-full flex flex-col justify-end pb-8 sm:pb-12 text-white">
        {/* 제목 */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">{title}</h1>

        {/* 여행지 및 별점 */}
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

        {/* 작성자 정보 */}
        {createdBy && (
          <div className="flex items-center gap-2 mt-4 text-sm text-white/80">
            <SkeletonImage
              src={createdBy?.photoURL || "/images/default-profile.png"}
              alt="작성자 프로필 이미지"
              className="rounded-full"
              objectFit="cover"
              size="w-6 h-6 sm:w-7 sm:h-7"
            />
            <span>{createdBy?.displayName || "익명"}</span>
            <span className="text-xs">· {formatDate(createdAt)}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default React.memo(ReviewHero);
