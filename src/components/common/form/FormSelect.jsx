import React from "react";
import PropTypes from "prop-types";
import { ChevronDown } from "lucide-react";
import {
  formBaseStyle,
  formVisualStyle,
  getFormBorderColor,
} from "@/styles/formStyles";
import ErrorMessage from "@/components/common/feedback/ErrorMessage"; // 경로는 실제 프로젝트 구조에 따라 조정하세요

function FormSelect({
  label,
  id,
  name,
  value,
  onChange,
  options = [],
  placeholder = "선택해주세요",
  error,
}) {
  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className="block mb-1 text-sm font-bold text-gray-700"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          className={`${formBaseStyle} ${getFormBorderColor(
            error
          )} ${formVisualStyle} pr-10 appearance-none`}
        >
          <option value="">{placeholder}</option>
          {options.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
      </div>
      {error && <ErrorMessage message={error} />}
    </div>
  );
}

FormSelect.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    })
  ).isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.string,
};

export default React.memo(FormSelect);
