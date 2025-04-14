// loneleap-admin/components/reports/ReviewPreviewCard.jsx

export default function ReviewPreviewCard({ review }) {
  const { content, rating, userId } = review;

  return (
    <div className="bg-white border rounded-md p-4 shadow-sm mb-2">
      <div className="flex items-center justify-between mb-1">
        <span className="text-gray-700 text-sm">작성자: {userId}</span>
        <span className="text-yellow-500 text-sm">⭐ {rating}점</span>
      </div>
      <p className="text-gray-800 text-sm truncate">"{content}"</p>
    </div>
  );
}
