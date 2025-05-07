import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export default function ItineraryCard({ itinerary }) {
  const navigate = useNavigate();
  const { id, title, location, startDate, endDate, imageUrl, authorName } =
    itinerary || {};

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
      className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 cursor-pointer overflow-hidden"
    >
      <img
        src={imageUrl || "/images/no_image.png"}
        alt={`${location} 대표 이미지`}
        className="w-full h-48 object-cover bg-gray-100"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "/images/no_image.png";
        }}
      />

      <div className="p-5">
        <h2 className="text-lg font-bold text-gray-800 mb-1">
          {title || "제목 없음"}
        </h2>
        <p className="text-sm text-gray-500 mb-2">{location}</p>
        <p className="text-xs text-gray-400 mb-2">{dateRange}</p>

        <div className="flex justify-between items-center text-xs text-gray-400">
          <span>{authorName || "익명"}</span>
          <div />
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
    authorName: PropTypes.string,
  }).isRequired,
};
