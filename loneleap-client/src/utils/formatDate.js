// utils/formatDate.js

export function formatDate(dateValue) {
  if (!dateValue) return "날짜 없음";

  const formatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  try {
    // Firestore Timestamp 처리
    if (typeof dateValue.toDate === "function") {
      return dateValue.toDate().toLocaleString("ko-KR", formatOptions);
    }

    // Date 객체 처리
    if (dateValue instanceof Date) {
      return dateValue.toLocaleString("ko-KR", formatOptions);
    }

    // ISO 문자열 처리
    if (typeof dateValue === "string") {
      return new Date(dateValue).toLocaleString("ko-KR", formatOptions);
    }

    return "날짜 형식 오류";
  } catch (error) {
    console.error("날짜 형식 변환 오류:", error);
    return "날짜 변환 오류";
  }
}

export function formatDateOnly(dateValue) {
  if (!dateValue) return "날짜 없음";

  const date =
    typeof dateValue.toDate === "function"
      ? dateValue.toDate()
      : new Date(dateValue);

  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
