import { format } from "date-fns";
import { Calendar } from "lucide-react";
import SkeletonImage from "@/components/common/loading/SkeletonImage";

/**
 * ItineraryHero
 * 여행 상세 페이지의 상단 히어로 섹션
 * - 배경 이미지 + 여행 제목 + 기간 + 작성자 정보 표시
 */

export default function ItineraryHero({ data }) {
  const { title, imageUrl, startDate, endDate, createdBy } = data || {};

  // 날짜가 있을 경우 "2025.06.01 ~ 2025.06.04" 형식으로 출력
  const formattedPeriod =
    startDate && endDate
      ? `${format(new Date(startDate), "yyyy.MM.dd")} ~ ${format(
          new Date(endDate),
          "yyyy.MM.dd"
        )}`
      : "여행 날짜 미정";

  return (
    <section
      className="relative w-full h-80 sm:h-[360px] md:h-[420px] rounded-3xl overflow-hidden"
      role="region"
      aria-labelledby="itinerary-hero-title"
    >
      {/* 배경 이미지 */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <SkeletonImage
          src={imageUrl}
          alt=""
          objectFit="cover"
          absolute
          size="w-full h-full"
        />
        <div className="absolute inset-0 bg-black/35" />
      </div>

      {/* 텍스트 레이어 */}
      <header className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 md:px-12 h-full flex flex-col justify-end pb-8 sm:pb-12 text-white">
        {/* 날짜 */}
        <div className="flex items-center gap-2 text-sm opacity-90">
          <Calendar className="w-4 h-4" />
          <span>{formattedPeriod}</span>
        </div>

        {/* 제목 */}
        {title && (
          <h1
            id="itinerary-hero-title"
            className="mt-3 text-2xl sm:text-3xl md:text-4xl font-bold"
          >
            {title}
          </h1>
        )}

        {/* 작성자 정보 */}
        {createdBy && (
          <div className="flex items-center gap-2 mt-4 text-sm text-white/80">
            <SkeletonImage
              src={createdBy.photoURL}
              alt="작성자"
              className="w-6 h-6 sm:w-7 sm:h-7 rounded-full"
              objectFit="cover"
            />
            <span>{createdBy.displayName || "익명"}</span>
          </div>
        )}
      </header>
    </section>
  );
}
