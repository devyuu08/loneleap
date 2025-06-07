import React from "react";

import PropTypes from "prop-types";

/**
 * RatingInput
 * - 별점(1~5)을 선택할 수 있는 인터랙티브 UI 컴포넌트
 * - 클릭 또는 키보드(좌/우/ESC)로 입력 가능
 * - 접근성을 고려해 aria-* 속성과 sr-only 사용
 */

function RatingInput({ value = 0, onChange = () => {} }) {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div role="radiogroup" aria-label="별점 선택" className="flex gap-1">
      {/* 현재 별점은 스크린리더 전용 안내 */}
      <span className="sr-only">별점: {value}점</span>

      {stars.map((star) => (
        <button
          key={star}
          type="button"
          role="radio"
          aria-label={`${star}점`}
          aria-pressed={star <= value}
          onClick={() => onChange(value === star ? 0 : star)}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft" && value > 1) onChange(value - 1);
            if (e.key === "ArrowRight" && value < 5) onChange(value + 1);
            if (e.key === "Escape") onChange(0);
          }}
          className="text-2xl focus:outline-none hover:scale-110 transition-transform"
        >
          <span className={star <= value ? "text-yellow-400" : "text-gray-300"}>
            ★
          </span>
        </button>
      ))}
    </div>
  );
}

RatingInput.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func,
};

export default React.memo(RatingInput);
