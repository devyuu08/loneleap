import { Loader2 } from "lucide-react";
import clsx from "clsx";

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
      {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
      <span>{isLoading ? "처리 중..." : label}</span>
    </button>
  );
}
