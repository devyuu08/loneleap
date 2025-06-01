import { doc, getDoc } from "firebase/firestore";
import { db } from "@/services/firebase";

// 특정 일정 상세 조회 함수
export async function fetchItineraryById(id) {
  try {
    // ID 유효성 검사
    if (!id) {
      throw new Error("유효하지 않은 일정 ID입니다.");
    }

    const docRef = doc(db, "itineraries", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();

      // 타임스탬프 필드를 JavaScript Date로 변환하거나 처리
      const formattedData = {
        ...data,
        createdAt: data.createdAt ? data.createdAt.toDate() : null,
        updatedAt: data.updatedAt ? data.updatedAt.toDate() : null,
      };
      return {
        id: docSnap.id,
        ...formattedData,
      };
    } else {
      return null; // 문서가 존재하지 않음
    }
  } catch (error) {
    console.error("일정 상세 조회 오류:", error);
    throw error;
  }
}
