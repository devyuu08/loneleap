import { db } from "@/services/firebase";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";

/**
 * 일정의 체크리스트 데이터를 업데이트
 *
 * @param {string} itineraryId - 대상 일정 ID
 * @param {object} checklist - 업데이트할 체크리스트 객체
 * @returns {Promise<void>}
 */

export async function updateChecklist(itineraryId, checklist) {
  const docRef = doc(db, "itineraries", itineraryId);
  await updateDoc(docRef, {
    checklist,
    updatedAt: serverTimestamp(),
  });
}
