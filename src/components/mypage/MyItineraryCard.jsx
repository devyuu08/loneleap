import React, { useCallback } from "react";
import { Edit2, Share2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { formatDateOnly } from "@/utils/formatDate";
import SkeletonImage from "@/components/common/loading/SkeletonImage";
import { shareItinerary } from "@/services/itinerary/shareItinerary";
import { toast } from "react-hot-toast";

/**
 * MyItineraryCard
 * - 마이페이지에서 사용자가 작성한 여행 일정을 카드 형태로 보여줌
 * - 카드 클릭 혹은 키보드(Enter, Space) 접근 가능
 * - 일정 수정 및 공유 버튼 포함
 */

function MyItineraryCard({ itinerary }) {
  const navigate = useNavigate();
  const { id, title, startDate, endDate, imageUrl } = itinerary;

  // 카드 클릭 시 상세 페이지로 이동
  const handleCardClick = useCallback(() => {
    navigate(`/itinerary/${id}`);
  }, [navigate, id]);

  // 키보드 접근성: Enter 또는 Space 입력 시 이동
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" || e.key === " ") {
        navigate(`/itinerary/${id}`);
      }
    },
    [navigate, id]
  );

  // 수정 버튼 클릭 시 수정 페이지로 이동
  const handleEditClick = useCallback(
    (e) => {
      e.stopPropagation();
      navigate(`/itinerary/edit/${id}`);
    },
    [navigate, id]
  );

  // 공유 버튼 클릭 시 링크 복사
  const handleShareClick = useCallback(
    async (e) => {
      e.stopPropagation();

      try {
        await shareItinerary(id);
        toast.success("공유 링크가 복사되었습니다!");
      } catch (error) {
        toast.error("공유 링크 생성에 실패했습니다.");
      }
    },
    [id]
  );

  const CARD_WRAPPER =
    "bg-white rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-transform duration-300 overflow-hidden text-black w-full max-w-xs cursor-pointer";

  return (
    <article
      onClick={handleCardClick}
      role="button"
      tabIndex="0"
      onKeyDown={handleKeyDown}
      className={CARD_WRAPPER}
      aria-label={`여행 일정 카드 - ${title}`}
    >
      {/* 이미지 영역 */}
      <div className="relative h-48 bg-gray-100">
        <SkeletonImage
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />

        {/* 날짜 뱃지 */}
        <time
          className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-3 py-1 rounded-full"
          dateTime={
            startDate?.toDate?.()?.toISOString?.() ||
            new Date(startDate).toISOString()
          }
        >
          {formatDateOnly(startDate)} ~ {formatDateOnly(endDate)}
        </time>
      </div>

      {/* 텍스트 영역 */}
      <section className="p-4 flex flex-col gap-2">
        {/* 제목 */}
        <h3 className="text-base font-semibold line-clamp-1">{title}</h3>

        {/* 요약 설명 */}
        <p className="text-sm text-gray-500 line-clamp-2">
          {itinerary.summary || "여행 요약 정보가 없습니다."}
        </p>

        {/* 액션 버튼 영역 */}
        <div className="flex justify-end items-center text-sm text-gray-500 mt-2">
          <div className="flex items-center gap-3">
            {/* 수정 버튼 */}
            <button
              type="button"
              onClick={handleEditClick}
              aria-label="일정 수정"
              className="hover:underline"
            >
              <Edit2 className="h-4 w-4" />
            </button>

            {/* 공유 버튼 */}
            <button
              type="button"
              onClick={handleShareClick}
              aria-label="일정 공유"
              className="flex items-center gap-1 hover:underline"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </article>
  );
}

export default React.memo(MyItineraryCard);
