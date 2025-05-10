export default function FormSubmitButton({ isLoading, label }) {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className={`px-6 py-3 text-sm font-semibold rounded-full shadow-md backdrop-blur-sm transition-all ${
        isLoading
          ? "bg-gray-400 text-white cursor-not-allowed opacity-70"
          : "bg-black/80 text-white hover:bg-black hover:shadow-xl"
      }`}
    >
      {isLoading ? "저장 중..." : label}
    </button>
  );
}
