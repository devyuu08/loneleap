import PropTypes from "prop-types";
import ButtonSpinner from "@/components/common/loading/ButtonSpinner";
import {
  baseButtonClasses,
  buttonVariants,
  sizeVariants,
} from "@/utils/buttonVariants";
import clsx from "clsx";

export default function ModalFooterButton({
  onClose,
  onConfirm,
  confirmLabel = "확인",
  isLoading = false,
  confirmColor = "black",
  disabled = false,
}) {
  const confirmVariant =
    isLoading || disabled
      ? "disabled"
      : confirmColor === "red"
      ? "danger"
      : "dark";

  return (
    <div className="flex justify-end gap-3 mt-4">
      {/* 취소 버튼: outline 스타일 적용 */}
      <button
        type="button"
        onClick={onClose}
        className={clsx(
          baseButtonClasses,
          buttonVariants.outline,
          sizeVariants.sm,
          "rounded-lg"
        )}
      >
        취소
      </button>

      {/* 확인 버튼: dark 또는 danger variant */}
      <button
        type="button"
        onClick={onConfirm}
        disabled={isLoading || disabled}
        className={clsx(
          baseButtonClasses,
          buttonVariants[confirmVariant],
          sizeVariants.sm,
          "rounded-lg min-w-[80px]",
          "disabled:opacity-60"
        )}
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
