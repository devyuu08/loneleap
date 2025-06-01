import PropTypes from "prop-types";
import ButtonSpinner from "@/components/common/loading/ButtonSpinner";

export default function ModalFooterButton({
  onClose,
  onConfirm,
  confirmLabel = "확인",
  isLoading = false,
  confirmColor = "black",
  disabled = false,
}) {
  const baseConfirmColor =
    confirmColor === "red"
      ? "bg-red-600 hover:bg-red-700"
      : "bg-black hover:bg-gray-900";

  return (
    <div className="flex justify-end gap-3 mt-4">
      <button
        type="button"
        onClick={onClose}
        className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
      >
        취소
      </button>

      <button
        type="button"
        onClick={onConfirm}
        disabled={isLoading || disabled}
        className={`px-4 py-2 rounded-lg text-white transition min-w-[80px] flex items-center justify-center disabled:opacity-60 ${baseConfirmColor}`}
      >
        {isLoading ? (
          <span className="w-4 h-4 flex items-center justify-center">
            <ButtonSpinner size={16} color="white" />
          </span>
        ) : (
          <span>{confirmLabel}</span>
        )}
      </button>
    </div>
  );
}

ModalFooterButton.propTypes = {
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  confirmLabel: PropTypes.string,
  confirmColor: PropTypes.oneOf(["black", "red"]),
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
};
