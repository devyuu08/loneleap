import { format } from "date-fns";
import { Heart, Copy, Share2 } from "lucide-react";

export default function RecommendationHero({ data }) {
  const { name, summary, location, createdAt, imageUrl } = data;

  return (
    <div className="relative h-[420px] w-full">
      <img
        src={imageUrl}
        alt={name}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-40" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 h-full flex flex-col justify-end pb-16 text-white">
        <p className="text-sm opacity-90">{location}</p>
        <h1 className="text-4xl font-bold mt-1">{name}</h1>
        <p className="text-base mt-2">{summary}</p>

        {/* 메타 정보 (등록일 등) */}
        <div className="flex items-center gap-4 text-sm text-white/80 mt-6">
          <span>
            등록일:{" "}
            {createdAt?.toDate ? format(createdAt.toDate(), "yyyy.MM.dd") : "-"}
          </span>
          <div className="flex items-center gap-2 ml-auto">
            <Heart className="w-4 h-4" />
            <Share2 className="w-4 h-4" />
            <Copy className="w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  );
}
