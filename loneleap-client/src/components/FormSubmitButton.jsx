export default function FormSubmitButton({ isLoading, label }) {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className={`w-full text-white py-2 rounded-md transition font-semibold
        ${
          isLoading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gray-900 hover:bg-gray-800"
        }`}
    >
      {isLoading ? "저장 중..." : label}
    </button>
  );
}
