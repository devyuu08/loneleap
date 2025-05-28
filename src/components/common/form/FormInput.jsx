import PropTypes from "prop-types";
import ErrorMessage from "@/components/common/feedback/ErrorMessage";

export default function FormInput({
  label,
  id,
  name,
  type = "text",
  value,
  onChange,
  placeholder = "",
  error,
}) {
  const inputBaseStyle =
    "w-full px-4 py-3 rounded-md border text-sm focus:outline-none focus:ring-2";
  const borderColor = error ? "border-red-400" : "border-gray-300";
  const visualStyle =
    "bg-white/70 text-gray-800 placeholder:text-gray-400 focus:ring-gray-700";

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
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className={`${inputBaseStyle} ${borderColor} ${visualStyle}`}
      />
      {error && <ErrorMessage message={error} />}
    </div>
  );
}

FormInput.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.string,
};
