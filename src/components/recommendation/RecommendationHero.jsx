import { format } from "date-fns";
import SkeletonImage from "@/components/common/loading/SkeletonImage";

/**
 * RecommendationHero
 * - 추천 여행지 상세 페이지 상단 Hero 이미지와 텍스트 정보
 * - 여행지 이름, 위치, 한줄 설명, 등록일 표시
 */

export default function RecommendationHero({ data }) {
  const { name, summary, location, createdAt, imageUrl } = data;

  return (
    <header className="relative w-full h-80 sm:h-[360px] md:h-[420px] rounded-3xl overflow-hidden">
      {/* 배경 이미지 + 어두운 오버레이 */}
      <div className="absolute inset-0 z-0">
        <SkeletonImage
          src={imageUrl}
          alt={`${name} 대표 이미지`}
          objectFit="cover"
          absolute
          size="w-full h-full"
        />
        <div className="absolute inset-0 bg-black/35" />
      </div>

      {/* 텍스트 정보 (타이틀, 요약, 위치, 등록일) */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 md:px-12 h-full flex flex-col justify-end pb-8 sm:pb-12 text-white">
        {/* 위치 뱃지 */}
        <span
          aria-label={`여행지 위치: ${location}`}
          className="inline-block text-xs sm:text-sm bg-white/20 text-white px-3 py-1 rounded-full w-fit mb-2"
        >
          {location}
        </span>

        {/* 장소 이름 */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">{name}</h1>

        {/* 요약 설명 + 등록일 */}
        <div className="flex items-center justify-between mt-3 text-base">
          <p className="truncate max-w-[75%]">{summary}</p>
          <time
            dateTime={
              createdAt?.toDate ? createdAt.toDate().toISOString() : undefined
            }
            className="text-sm text-white/80 ml-4 shrink-0"
          >
            등록일:{" "}
            {createdAt?.toDate ? format(createdAt.toDate(), "yyyy.MM.dd") : "-"}
          </time>
        </div>
      </div>
    </header>
  );
}
