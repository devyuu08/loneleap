import PropTypes from "prop-types";

export default function ReviewSortButtons({ sort, onChange }) {
  const BASE_BUTTON_STYLE =
    "px-4 py-2 rounded-full text-sm font-medium border transition";
  const ACTIVE_BUTTON_STYLE = "bg-[#0F172A] text-white";
  const INACTIVE_BUTTON_STYLE = "bg-white text-gray-700 border-gray-300";

  return (
    <div
      className="flex justify-start mb-6 ml-5 space-x-2"
      role="group"
      aria-label="리뷰 정렬 옵션"
    >
      <button
        type="button"
        aria-pressed={sort === "latest"}
        className={`${BASE_BUTTON_STYLE} ${
          sort === "latest" ? ACTIVE_BUTTON_STYLE : INACTIVE_BUTTON_STYLE
        }`}
        onClick={() => onChange("latest")}
      >
        최신순
      </button>
      <button
        type="button"
        aria-pressed={sort === "rating"}
        className={`${BASE_BUTTON_STYLE} ${
          sort === "rating" ? ACTIVE_BUTTON_STYLE : INACTIVE_BUTTON_STYLE
        }`}
        onClick={() => onChange("rating")}
      >
        평점순
      </button>
    </div>
  );
}

ReviewSortButtons.propTypes = {
  sort: PropTypes.oneOf(["latest", "rating"]).isRequired,
  onChange: PropTypes.func.isRequired,
};
