// src/components/Review/RatingInput.jsx
import React from "react";

import PropTypes from "prop-types";

function RatingInput({ value = 0, onChange = () => {} }) {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="flex gap-1">
      <span className="sr-only">별점: {value}점</span>
      {stars.map((star) => (
        <button
          type="button"
          key={star}
          onClick={() => onChange(value === star ? 0 : star)}
          className="text-2xl focus:outline-none hover:scale-110 transition-transform"
          aria-label={`${star}점`}
          aria-pressed={star <= value}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft" && value > 1) onChange(value - 1);
            if (e.key === "ArrowRight" && value < 5) onChange(value + 1);
          }}
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
