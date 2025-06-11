import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import SkeletonImage from "@/components/common/loading/SkeletonImage";

/**
 * ItineraryCard – 여행 일정 미리보기 카드 컴포넌트
 * - 일정 제목, 날짜, 요약, 작성자 정보를 표시
 * - 클릭 또는 Enter/Space 키로 상세 페이지 이동
 */

function ItineraryCard({ itinerary }) {
  const navigate = useNavigate();
  const {
    id,
    title,
    location,
    startDate,
    endDate,
    imageUrl,
    summary,
    createdBy,
  } = itinerary || {};

  const dateRange = startDate
    ? endDate
      ? `${startDate} ~ ${endDate}`
      : startDate
    : "날짜 미정";

  const handleNavigation = () => navigate(`/itinerary/${id}`);

  return (
    <article
      onClick={() => navigate(`/itinerary/${id}`)}
      role="button"
      tabIndex="0"
      aria-label={`일정 카드: ${title || "제목 없음"}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleNavigation();
      }}
      className="group bg-white rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden cursor-pointer"
    >
      {/* 썸네일 이미지 */}
      <div className="relative h-56">
        <SkeletonImage
          src={imageUrl}
          alt={`${location || "여행지"} 대표 이미지`}
          objectFit="cover"
          size="w-full h-full"
        />

        {/* 지역 태그 */}
        <span className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-3 py-1 rounded-full">
          {location || "지역 미정"}
        </span>
      </div>

      {/* 카드 본문 */}
      <div className="p-4 space-y-1">
        {/* 날짜 */}
        <time className="block text-xs text-gray-500">{dateRange}</time>

        {/* 제목 */}
        <h3 className="text-base font-semibold text-gray-900 line-clamp-1">
          {title || "제목 없음"}
        </h3>

        {/* 요약 설명 */}
        <p className="text-sm text-gray-500 line-clamp-2">
          {summary || "여행 요약 정보가 없습니다."}
        </p>

        {/* 작성자 정보 */}
        {createdBy && (
          <div className="flex justify-end items-center mt-2">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 truncate max-w-[100px]">
                {createdBy.displayName || "익명"}
              </span>
              <SkeletonImage
                src={createdBy.photoURL || "/images/default-profile.png"}
                alt="작성자 프로필 이미지"
                className="rounded-full object-cover"
                objectFit="cover"
                size="w-6 h-6"
              />
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

ItineraryCard.propTypes = {
  itinerary: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    location: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    imageUrl: PropTypes.string,
    summary: PropTypes.string,
    placeCount: PropTypes.number,
    createdBy: PropTypes.shape({
      uid: PropTypes.string,
      displayName: PropTypes.string,
      photoURL: PropTypes.string,
    }),
  }).isRequired,
};

export default React.memo(ItineraryCard);
