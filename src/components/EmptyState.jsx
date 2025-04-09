// src/components/EmptyState.jsx

import React from "react";

export default function EmptyState({
  icon = "📭",
  title = "데이터가 없습니다",
  description = "",
}) {
  return (
    <div
      className="py-20 text-center text-gray-500"
      role="status"
      aria-live="polite"
    >
      <div className="text-4xl mb-3">{icon}</div>
      <p className="text-lg font-medium">{title}</p>
      {description && <p className="text-sm mt-1">{description}</p>}
    </div>
  );
}
