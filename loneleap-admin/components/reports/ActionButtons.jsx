// loneleap-admin/components/reports/ActionButtons.jsx

export default function ActionButtons({ report }) {
  return (
    <div className="flex gap-2 mt-4">
      <button
        className="px-4 py-2 text-sm rounded bg-red-500 hover:bg-red-600 text-white"
        disabled
      >
        리뷰 삭제
      </button>
      <button
        className="px-4 py-2 text-sm rounded bg-gray-300 hover:bg-gray-400 text-gray-800"
        disabled
      >
        신고 무시
      </button>
    </div>
  );
}
