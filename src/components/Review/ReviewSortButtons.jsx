export default function ReviewSortButtons({ sort, onChange }) {
  return (
    <div className="flex justify-start mb-6 ml-5 space-x-2">
      <button
        className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
          sort === "latest"
            ? "bg-[#0F172A] text-white"
            : "bg-white text-gray-700 border-gray-300"
        }`}
        onClick={() => onChange("latest")}
      >
        최신순
      </button>
      <button
        className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
          sort === "rating"
            ? "bg-[#0F172A] text-white"
            : "bg-white text-gray-700 border-gray-300"
        }`}
        onClick={() => onChange("rating")}
      >
        평점순
      </button>
    </div>
  );
}
