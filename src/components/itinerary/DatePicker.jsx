import React from "react";
import PropTypes from "prop-types";
import ErrorMessage from "@/components/common/feedback/ErrorMessage";

/**
 * 날짜 입력을 위한 재사용 가능한 DatePicker 컴포넌트
 * - label, value, onChange, name, error props 지원
 * - 날짜 유효성 오류 시 시각적 피드백 및 오류 메시지 출력
 * - 접근성 및 시멘틱 마크업 개선
 */

function DatePicker({ label, value, onChange, name, error }) {
  const baseStyle =
    "w-full px-4 py-3 rounded-md border text-sm focus:outline-none focus:ring-2";
  const borderColor = error ? "border-red-400" : "border-gray-300";
  const visualStyle =
    "bg-white/70 text-gray-800 placeholder:text-gray-400 focus:ring-gray-700";

  return (
    <div>
      {/* 라벨이 있을 경우 연결된 label 출력 */}
      {label && (
        <label
          htmlFor={name}
          className="block mb-1 text-sm font-bold text-gray-700"
        >
          {label}
        </label>
      )}

      {/* 날짜 입력 input */}
      <input
        type="date"
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        className={`${baseStyle} ${borderColor} ${visualStyle}`}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
      />

      {/* 오류 메시지 출력 */}
      <ErrorMessage message={error} />
    </div>
  );
}

DatePicker.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  error: PropTypes.string,
};

export default React.memo(DatePicker);
