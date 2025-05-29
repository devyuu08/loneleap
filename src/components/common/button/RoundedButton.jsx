import ButtonSpinner from "@/components/common/loading/ButtonSpinner";

export default function RoundedButton({
  label,
  onClick,
  isLoading = false,
  icon = null,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isLoading}
      className={`px-6 py-3 text-sm font-semibold rounded-full shadow-md backdrop-blur-sm transition-all flex items-center justify-center gap-2 min-w-[120px] ${
        isLoading
          ? "bg-gray-400 text-white cursor-not-allowed opacity-70"
          : "bg-black/80 text-white hover:bg-black hover:shadow-xl"
      }`}
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
