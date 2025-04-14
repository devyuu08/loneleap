import PropTypes from "prop-types";

export default function LoadingSpinner() {
  return (
    <div
      className="flex flex-col items-center justify-center py-8"
      role="status"
      aria-live="polite"
    >
      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
      <p className="text-sm text-gray-400">{text}</p>
    </div>
  );
}

LoadingSpinner.propTypes = {
  text: PropTypes.string,
};
