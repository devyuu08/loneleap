import clsx from "clsx";
import ButtonSpinner from "@/components/common/loading/ButtonSpinner";
import {
  baseButtonClasses,
  buttonVariants,
  sizeVariants,
} from "@/utils/buttonVariants";

export default function FormSubmitButton({
  isLoading,
  label = "제출",
  fullWidth = true,
  variant = "dark",
  size = "md",
}) {
  const appliedVariant = isLoading ? "disabled" : variant;

  return (
    <button
      type="submit"
      disabled={isLoading}
      className={clsx(
        baseButtonClasses,
        buttonVariants[appliedVariant],
        sizeVariants[size],
        fullWidth ? "w-full" : "w-auto",
        "backdrop-blur-sm shadow-md rounded-full"
      )}
      aria-label={label}
    >
      <div className="relative h-5 flex items-center justify-center min-w-[4rem]">
        {isLoading ? (
          <ButtonSpinner size={16} color="white" />
        ) : (
          <span>{label}</span>
        )}
      </div>
    </button>
  );
}
