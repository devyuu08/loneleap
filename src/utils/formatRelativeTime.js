import dayjs from "lib/dayjs";

export function formatRelativeTime(timestamp) {
  if (!timestamp?.toDate) return "";
  const date = timestamp.toDate();
  return dayjs(date).fromNow();
}
