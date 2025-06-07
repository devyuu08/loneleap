import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/services/firebase";

/**
 * 사용자가 동일 메시지를 중복 신고했는지 확인
 * @param {string} messageId - 신고 대상 메시지의 ID
 * @param {string} reporterId - 신고자 UID
 * @returns {Promise<boolean>} - 이미 신고했는지 여부
 */

export async function checkDuplicateReport(messageId, reporterId) {
  const q = query(
    collection(db, "chatReports"),
    where("messageId", "==", messageId),
    where("reporterId", "==", reporterId)
  );
  const snapshot = await getDocs(q);
  return !snapshot.empty;
}
