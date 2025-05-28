import { format } from "date-fns";
import { Heart, Copy, Share2 } from "lucide-react";
import SkeletonImage from "@/components/common/loading/SkeletonImage";

export default function RecommendationHero({ data }) {
  const { name, summary, location, createdAt, imageUrl } = data;

  return (
    <div className="relative h-[420px] w-full rounded-3xl overflow-hidden">
      {/* 이미지 + 오버레이 레이어 */}
      <div className="absolute inset-0 z-0">
        <SkeletonImage
          src={imageUrl || "/images/no_image.png"}
          alt={name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* 텍스트 레이어 */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 h-full flex flex-col justify-end pb-9 text-white">
        <p className="text-sm opacity-90">{location}</p>
        <h1 className="text-4xl font-bold mt-1">{name}</h1>
        <p className="text-base mt-2">{summary}</p>

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
