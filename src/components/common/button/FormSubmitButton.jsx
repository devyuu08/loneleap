import clsx from "clsx";
import ButtonSpinner from "@/components/common/loading/ButtonSpinner";

export default function FormSubmitButton({
  isLoading,
  label = "제출",
  fullWidth = true,
  variant = "dark",
}) {
  const baseClasses =
    "px-6 py-3 text-sm font-semibold rounded-full shadow-md backdrop-blur-sm transition-all flex items-center justify-center gap-2";

  const variants = {
    dark: isLoading
      ? "bg-gray-400 text-white cursor-not-allowed opacity-70"
      : "bg-black/80 text-white hover:bg-black hover:shadow-xl",
    light: isLoading
      ? "bg-gray-300 text-white cursor-not-allowed opacity-70"
      : "bg-[#6D8591] text-white hover:bg-[#4d5e66]",
  };

  return (
    <button
      type="submit"
      disabled={isLoading}
      className={clsx(
        fullWidth ? "w-full" : "w-auto",
        baseClasses,
        variants[variant]
      )}
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
