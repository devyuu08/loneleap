import React, { useCallback } from "react";
import { Edit2, Share2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { formatDateOnly } from "@/utils/formatDate";
import SkeletonImage from "@/components/common/loading/SkeletonImage";

const MyItineraryCard = React.memo(function MyItineraryCard({ itinerary }) {
  const navigate = useNavigate();
  const { id, title, startDate, endDate, imageUrl } = itinerary;

  const handleCardClick = useCallback(() => {
    navigate(`/itinerary/${id}`);
  }, [navigate, id]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" || e.key === " ") {
        navigate(`/itinerary/${id}`);
      }
    },
    [navigate, id]
  );

  const handleEditClick = useCallback(
    (e) => {
      e.stopPropagation();
      navigate(`/itinerary/edit/${id}`);
    },
    [navigate, id]
  );

  const handleShareClick = useCallback((e) => {
    e.stopPropagation();
    alert("공유 기능은 추후 지원됩니다.");
  }, []);

  if (!itinerary?.id || !itinerary?.title) {
    return (
      <div className="bg-gray-100 rounded-xl p-6 shadow-sm text-center text-gray-500">
        여행 정보를 불러올 수 없습니다.
      </div>
    );
  }

  return (
    <div
      onClick={handleCardClick}
      role="button"
      tabIndex="0"
      onKeyDown={handleKeyDown}
      className="bg-white rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-transform duration-300 overflow-hidden text-black w-full max-w-xs cursor-pointer"
    >
      {/* 이미지 영역 */}
      <div className="relative h-48 bg-gray-100">
        <SkeletonImage src={imageUrl} alt={title} objectFit="cover" />

        {/* 날짜 배지 */}
        <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-3 py-1 rounded-full">
          {formatDateOnly(startDate)} ~ {formatDateOnly(endDate)}
        </div>
      </div>

      {/* 텍스트 영역 */}
      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-base font-semibold line-clamp-1">{title}</h3>
        {/* 요약 정보 */}
        <p className="text-sm text-gray-500 line-clamp-2">
          {itinerary.summary || "여행 요약 정보가 없습니다."}
        </p>

        <div className="flex justify-end items-center text-sm text-gray-500 mt-2">
          {/* 액션 */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleEditClick}
              className="hover:underline"
            >
              <Edit2 className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={handleShareClick}
              className="flex items-center gap-1 hover:underline"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default MyItineraryCard;
