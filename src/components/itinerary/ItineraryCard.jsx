import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Map } from "lucide-react";
import SkeletonImage from "components/common/SkeletonImage";

export default function ItineraryCard({ itinerary }) {
  const navigate = useNavigate();
  const {
    id,
    title,
    location,
    startDate,
    endDate,
    imageUrl,
    placeCount = 0,
  } = itinerary || {};

  const dateRange = startDate
    ? endDate
      ? `${startDate} ~ ${endDate}`
      : startDate
    : "날짜 미정";

  return (
    <div
      onClick={() => navigate(`/itinerary/${id}`)}
      role="button"
      tabIndex="0"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          navigate(`/itinerary/${id}`);
        }
      }}
      className="group bg-white rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden cursor-pointer"
    >
      {/* 썸네일 이미지 섹션 */}
      <div className="relative h-56">
        <SkeletonImage
          src={imageUrl || "/images/no_image.png"}
          alt={`${location} 대표 이미지`}
        />

        {/* 위치 태그 */}
        <span className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-3 py-1 rounded-full">
          {location}
        </span>
      </div>

      {/* 카드 본문 섹션 */}
      <div className="p-4 space-y-1">
        {/* 날짜 표시 */}
        <div className="flex justify-between items-center text-xs text-gray-500">
          <span>{dateRange}</span>
        </div>

        {/* 일정 제목 */}
        <h3 className="text-base font-semibold text-gray-900 line-clamp-1">
          {title || "제목 없음"}
        </h3>

        {/* 요약 정보 */}
        <p className="text-sm text-gray-500 line-clamp-2">
          {itinerary.summary || "여행 요약 정보가 없습니다."}
        </p>

        {/* 장소 수 + 작성자 정보 */}
        <div className="flex justify-between items-center mt-2">
          {/* 장소 개수 */}
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <Map className="w-4 h-4" />
            {placeCount}개 장소
          </div>

          {/* 작성자 정보 */}
          {itinerary.createdBy && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 truncate max-w-[100px]">
                {itinerary.createdBy.displayName || "익명"}
              </span>
              <img
                src={
                  itinerary.createdBy?.photoURL || "/images/default-profile.png"
                }
                alt="작성자"
                className="w-5 h-5 rounded-full object-cover"
                onError={(e) => {
                  const fallback = "/images/default-profile.png";
                  if (!e.target.dataset.errorHandled) {
                    e.target.src = fallback;
                    e.target.dataset.errorHandled = "true";
                  }
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
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
