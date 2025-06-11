import PropTypes from "prop-types";

/**
 * ReviewSortButtons
 * - 리뷰 목록 정렬 옵션을 선택할 수 있는 버튼 그룹
 * - 현재 선택된 정렬 방식에 따라 버튼 스타일 변경
 * - 시멘틱 마크업 및 접근성 속성(aria-pressed, role="group") 적용
 */

export default function ReviewSortButtons({ sort, onChange }) {
  const baseButtonStyle =
    "px-4 py-2 rounded-full text-sm font-medium border transition";
  const activeButtonStyle = "bg-[#0F172A] text-white";
  const inactiveButtonStyle = "bg-white text-gray-700 border-gray-300";

  return (
    <div
      className="flex justify-start mb-6 ml-5 space-x-2"
      role="group"
      aria-label="리뷰 정렬 옵션"
    >
      {/* 최신순 버튼 */}
      <button
        type="button"
        aria-pressed={sort === "latest"}
        className={`${baseButtonStyle} ${
          sort === "latest" ? activeButtonStyle : inactiveButtonStyle
        }`}
        onClick={() => onChange("latest")}
      >
        최신순
      </button>

      {/* 평점순 버튼 */}
      <button
        type="button"
        aria-pressed={sort === "rating"}
        className={`${baseButtonStyle} ${
          sort === "rating" ? activeButtonStyle : inactiveButtonStyle
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
