import { format } from "date-fns";
import { Calendar } from "lucide-react";
import SkeletonImage from "@/components/common/loading/SkeletonImage";

export default function ItineraryHero({ data }) {
  const { title, imageUrl, startDate, endDate, createdBy } = data || {};

  const formattedPeriod =
    startDate && endDate
      ? `${format(new Date(startDate), "yyyy.MM.dd")} ~ ${format(
          new Date(endDate),
          "yyyy.MM.dd"
        )}`
      : "여행 날짜 미정";

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
        <div className="absolute inset-0 bg-black/35" />
      </div>

      {/* 텍스트 */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 md:px-12 h-full flex flex-col justify-end pb-8 sm:pb-12 text-white">
        <div className="flex items-center gap-2 text-sm opacity-90">
          <Calendar className="w-4 h-4" />
          <span>{formattedPeriod}</span>
        </div>

        <h1 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-bold">
          {title}
        </h1>

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
      </div>
    </div>
  );
}
