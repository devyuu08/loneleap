import { Inbox } from "lucide-react";

export default function EmptyState({
  icon = <Inbox className="w-8 h-8 text-gray-400" />,
  title = "데이터가 없습니다",
  description = "",
  iconColor = "text-gray-400",
  textColor = "text-gray-600",
  descColor = "text-gray-500",
  className = "",
}) {
  return (
    <div
      className={`py-16 text-center ${textColor} ${className}`}
      role="status"
      aria-live="polite"
    >
      <div className={`mb-3 flex justify-center ${iconColor}`}>{icon}</div>
      <p className={`text-lg font-semibold ${textColor}`}>{title}</p>
      {description && (
        <p className={`text-sm mt-1 ${descColor}`}>{description}</p>
      )}
    </div>
  );
}
