import React from "react";
import ErrorMessage from "@/components/common/feedback/ErrorMessage";
import PropTypes from "prop-types";
import {
  getFormBorderColor,
  formBaseStyle,
  formVisualStyle,
} from "@/styles/formStyles";

function FormTextarea({
  label,
  id,
  name,
  value,
  onChange,
  placeholder = "",
  error,
  rows = 3,
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
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className={`${formBaseStyle} ${getFormBorderColor(
          error
        )} ${formVisualStyle}`}
      />
      {error && <ErrorMessage message={error} />}
    </div>
  );
}

FormTextarea.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  rows: PropTypes.number,
};

export default React.memo(FormTextarea);
