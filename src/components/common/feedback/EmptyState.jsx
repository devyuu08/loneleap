import { Inbox } from "lucide-react";

export default function EmptyState({
  icon = <Inbox className="w-8 h-8 text-gray-400" />,
  title = "데이터가 없습니다",
  description = "",
  className = "",
}) {
  return (
    <div
      className={`py-16 text-center text-gray-600 ${className}`}
      role="status"
      aria-live="polite"
    >
      <div className="mb-3 flex justify-center">{icon}</div>
      <p className="text-lg font-semibold">{title}</p>
      {description && (
        <p className="text-sm mt-1 text-gray-500">{description}</p>
      )}
    </div>
  );
}
