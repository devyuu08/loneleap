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
    <div className="relative h-[420px] w-full rounded-3xl overflow-hidden">
      {/* 배경 이미지 (absolute z-0) */}
      <div className="absolute inset-0 z-0">
        <SkeletonImage src={imageUrl} alt={title} objectFit="cover" />
        <div className="absolute inset-0 bg-black/35" />
      </div>

      {/* 텍스트 영역 (z-10) */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 h-full flex flex-col justify-end pb-9 text-white">
        <div className="flex items-center gap-2 text-sm opacity-90">
          <Calendar className="w-4 h-4" />
          <span>{formattedPeriod}</span>
        </div>

        <h1 className="text-4xl font-bold mt-3">{title}</h1>

        {createdBy && (
          <div className="flex items-center gap-2 mt-4 text-sm text-white/80">
            <SkeletonImage
              src={createdBy.photoURL || "/images/default-profile.png"}
              alt="작성자"
              className="rounded-full"
              objectFit="cover"
              size="w-7 h-7"
            />

            <span>{createdBy.displayName || "익명"}</span>
          </div>
        )}
      </div>
    </div>
  );
}
