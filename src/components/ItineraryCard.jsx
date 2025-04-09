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

  return !itinerary || !id ? (
    // fallback UI
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border p-4 flex items-center justify-center h-48">
      <p className="text-gray-400">일정 정보를 불러올 수 없습니다.</p>
    </div>
  ) : (
    // 실제 카드 UI
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border hover:shadow-md transition">
      {/* 이미지 자리 */}
      <div className="h-32 overflow-hidden rounded-t-xl">
        {itinerary.imageUrl ? (
          <img
            src={itinerary.imageUrl}
            alt={`${location} 여행지 대표 이미지`}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/default-destination.jpg"; // 기본 이미지 경로
            }}
          />
        ) : (
          <div className="bg-gray-800 h-full flex items-center justify-center text-white text-sm">
            [Destination Image]
          </div>
        )}
      </div>

      {/* 본문 영역 */}
      <div className="p-4">
        <div className="text-sm text-gray-500">
          {startDate} - {endDate}
        </div>
        <h3 className="font-semibold text-lg mt-1">{title}</h3>

        <div className="mt-3 text-sm flex justify-between items-center">
          <span className="text-gray-400">by 나</span>
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
