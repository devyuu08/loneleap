import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export default function ItineraryCard({ itinerary }) {
  const navigate = useNavigate();

  const {
    id,
    title,
    location,
    startDate,
    endDate,
    userId, // 작성자 정보 (현재는 '나'만 표시)
  } = itinerary;

  const currentUserId = "사용자 ID 가져오기"; // TODO: 추후 연동 필요
  const authorName = itinerary.authorName || "";

  return !itinerary || !id ? (
    // fallback UI
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border p-4 flex items-center justify-center h-48">
      <p className="text-gray-400">일정 정보를 불러올 수 없습니다.</p>
    </div>
  ) : (
    // 실제 카드 UI
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border hover:shadow-md transition">
      <div className="h-32 overflow-hidden rounded-t-xl">
        {itinerary.imageUrl ? (
          <img
            src={itinerary.imageUrl}
            alt={`${location} 여행지 대표 이미지`}
            className="w-full h-48 object-cover bg-gray-100"
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/no_image.png"; // 기본 이미지 경로
            }}
          />
        ) : (
          <img
            src="/images/no_image.png"
            alt="기본 여행지 이미지"
            className="w-full h-full object-contain bg-gray-100"
          />
        )}
      </div>

      <div className="p-4">
        <div className="text-sm text-gray-500">
          {startDate ? startDate : "날짜 미정"} {endDate ? ` ~ ${endDate}` : ""}
        </div>
        <h3 className="font-semibold text-lg mt-1">{title || "제목 없음"}</h3>

        <div className="mt-3 text-sm flex justify-between items-center">
          <span className="text-gray-400">
            {userId === currentUserId
              ? "by 나"
              : `by ${authorName || "사용자"}`}
          </span>
          <button
            onClick={() => navigate(`/itinerary/${id}`)}
            className="border border-gray-500 text-sm px-3 py-1 rounded hover:bg-gray-100 transition"
          >
            상세 보기
          </button>
        </div>
      </div>
    </div>
  );
}

// 타입 검증
ItineraryCard.propTypes = {
  itinerary: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
    authorName: PropTypes.string,
  }).isRequired,
};
