import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { db } from "@/services/firebase";

/**
 * 지정한 일정을 Firestore에서 삭제
 *
 * @param {string} id - 삭제할 일정의 ID
 * @returns {Promise<boolean>} - 성공 여부
 * @throws {Error} - 일정이 존재하지 않거나 삭제 실패 시
 */

export async function deleteItinerary(id) {
  try {
    // 문서 존재 확인
    const docRef = doc(db, "itineraries", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error("존재하지 않는 일정입니다.");
    }
    // 삭제 실행
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error("일정 삭제 중 오류:", error);
    }
    throw error;
  }
}
