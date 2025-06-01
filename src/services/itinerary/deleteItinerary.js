import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { db } from "@/services/firebase";

// 일정 삭제 함수
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
    console.error("일정 삭제 중 오류:", error);
    throw error;
  }
}
