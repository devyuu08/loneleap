import PropTypes from "prop-types";

export default function ReviewSortButtons({ sort, onChange }) {
  const baseButtonStyle =
    "px-4 py-2 rounded-full text-sm font-medium border transition";
  const activeStyle = "bg-[#0F172A] text-white";
  const inactiveStyle = "bg-white text-gray-700 border-gray-300";

  return (
    <div
      className="flex justify-start mb-6 ml-5 space-x-2"
      role="group"
      aria-label="리뷰 정렬 옵션"
    >
      <button
        type="button"
        aria-pressed={sort === "latest"}
        className={`${baseButtonStyle} ${
          sort === "latest" ? activeStyle : inactiveStyle
        }`}
        onClick={() => onChange("latest")}
      >
        최신순
      </button>
      <button
        type="button"
        aria-pressed={sort === "rating"}
        className={`${baseButtonStyle} ${
          sort === "rating" ? activeStyle : inactiveStyle
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
