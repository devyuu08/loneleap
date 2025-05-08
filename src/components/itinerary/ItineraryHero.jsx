import { format } from "date-fns";
import { Calendar } from "lucide-react";

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
      <img
        src={imageUrl || "/images/no_image.png"}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 h-full flex flex-col justify-end pb-9 text-white">
        <div className="flex items-center gap-2 text-sm opacity-90">
          <Calendar className="w-4 h-4" />
          <span>{formattedPeriod}</span>
        </div>

        <h1 className="text-4xl font-bold mt-3">{title}</h1>

        {/* 작성자 */}
        {createdBy && (
          <div className="flex items-center gap-2 mt-4 text-sm text-white/70">
            <img
              src={createdBy.photoURL || "/default_profile.png"}
              alt="작성자"
              className="w-6 h-6 rounded-full object-cover"
            />
            <span>{createdBy.displayName || "익명"}</span>
          </div>
        )}
      </div>
    </div>
  );
}
