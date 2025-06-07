import { db } from "@/services/firebase";
import { doc, getDoc, deleteDoc } from "firebase/firestore";

/**
 * 특정 리뷰를 삭제
 * @param {string} id - 리뷰 ID
 * @returns {Promise<boolean>}
 */

export async function deleteReview(id) {
  try {
    // 문서 존재 확인
    const docRef = doc(db, "reviews", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error("존재하지 않는 리뷰입니다.");
    }

    // 삭제 실행
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error("리뷰 삭제 중 오류:", error);
    throw error;
  }
}
