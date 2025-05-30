import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/services/firebase";

export async function checkDuplicateReport(messageId, reporterId) {
  const q = query(
    collection(db, "chatReports"),
    where("messageId", "==", messageId),
    where("reporterId", "==", reporterId)
  );
  const snapshot = await getDocs(q);
  return !snapshot.empty;
}
