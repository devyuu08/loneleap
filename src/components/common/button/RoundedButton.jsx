import ButtonSpinner from "@/components/common/loading/ButtonSpinner";
import {
  baseButtonClasses,
  buttonVariants,
  sizeVariants,
} from "@/utils/buttonVariants";
import clsx from "clsx";
import PropTypes from "prop-types";

export default function RoundedButton({
  label,
  onClick,
  isLoading = false,
  icon = null,
  variant = "dark",
  size = "md",
}) {
  const appliedVariant = isLoading ? "disabled" : variant;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isLoading}
      className={clsx(
        baseButtonClasses,
        buttonVariants[appliedVariant],
        sizeVariants[size],
        "min-w-[120px] rounded-full backdrop-blur-sm shadow-md"
      )}
    >
      <div className="relative h-5 flex items-center justify-center gap-2">
        {isLoading ? (
          <ButtonSpinner size={16} color="white" />
        ) : (
          <>
            {icon}
            <span>{label}</span>
          </>
        )}
      </div>
    </button>
  );
}

RoundedButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  icon: PropTypes.node,
  variant: PropTypes.oneOf(["dark", "light", "danger", "outline"]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
};
