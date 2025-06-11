import dayjs from "@/lib/dayjs";

/**
 * Firebase Timestamp를 기준으로 상대 시간 문자열을 반환합니다.
 * 예: "2시간 전", "3일 전"
 * @param {firebase.firestore.Timestamp} timestamp - Firestore Timestamp 객체
 * @returns {string} 상대 시간 문자열
 */

export function formatRelativeTime(timestamp) {
  if (!timestamp?.toDate) return "";
  const date = timestamp.toDate();
  return dayjs(date).fromNow();
}
