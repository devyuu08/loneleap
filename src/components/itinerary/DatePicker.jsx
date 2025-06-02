import React from "react";
import PropTypes from "prop-types";
import ErrorMessage from "@/components/common/feedback/ErrorMessage";

function DatePicker({ label, value, onChange, name, error }) {
  const baseStyle =
    "w-full px-4 py-3 rounded-md border text-sm focus:outline-none focus:ring-2";
  const borderColor = error ? "border-red-400" : "border-gray-300";
  const visualStyle =
    "bg-white/70 text-gray-800 placeholder:text-gray-400 focus:ring-gray-700";

  return (
    <div>
      {label && (
        <label
          htmlFor={name}
          className="block mb-1 text-sm font-bold text-gray-700"
        >
          {label}
        </label>
      )}
      <input
        type="date"
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        className={`${baseStyle} ${borderColor} ${visualStyle}`}
      />
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
