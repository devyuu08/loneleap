export default function EmptyState({
  icon = "📭",
  title = "데이터가 없습니다",
  description = "",
}) {
  return (
    <div
      className="py-20 text-center text-gray-300"
      role="status"
      aria-live="polite"
    >
      {/* JSX 요소면 그대로 렌더링, 문자열이면 텍스트 크기 조정 */}
      <div className="mb-3 flex justify-center text-4xl">
        {typeof icon === "string" ? <span>{icon}</span> : icon}
      </div>
      <p className="text-lg font-semibold">{title}</p>
      {description && (
        <p className="text-sm mt-1 text-gray-400">{description}</p>
      )}
    </div>
  );
}
