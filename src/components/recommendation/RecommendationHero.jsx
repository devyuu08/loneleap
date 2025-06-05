import { format } from "date-fns";
import { Heart, Copy, Share2 } from "lucide-react";
import SkeletonImage from "@/components/common/loading/SkeletonImage";

export default function RecommendationHero({ data }) {
  const { name, summary, location, createdAt, imageUrl } = data;

  return (
    <div className="relative w-full h-80 sm:h-[360px] md:h-[420px] rounded-3xl overflow-hidden">
      {/* 배경 이미지 */}
      <div className="absolute inset-0 z-0">
        <SkeletonImage
          src={imageUrl}
          alt={name}
          objectFit="cover"
          absolute
          size="w-full h-full"
        />
        <div className="absolute inset-0 bg-black/35" />
      </div>

      {/* 텍스트 레이어 */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 md:px-12 h-full flex flex-col justify-end pb-8 sm:pb-12 text-white">
        {/* 위치 뱃지 */}
        <span className="inline-block text-xs sm:text-sm bg-white/20 text-white px-3 py-1 rounded-full w-fit mb-2">
          {location}
        </span>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">{name}</h1>

        {/* summary + 등록일 (양쪽 정렬) */}
        <div className="flex items-center justify-between mt-3 text-base">
          <p className="truncate max-w-[75%]">{summary}</p>
          <p className="text-sm text-white/80 ml-4 shrink-0">
            등록일:{" "}
            {createdAt?.toDate ? format(createdAt.toDate(), "yyyy.MM.dd") : "-"}
          </p>
        </div>
      </div>
    </div>
  );
}
