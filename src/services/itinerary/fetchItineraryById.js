import { doc, getDoc } from "firebase/firestore";
import { db } from "@/services/firebase";

/**
 * 일정 ID를 기반으로 상세 정보를 조회
 *
 * @param {string} id - 일정 ID
 * @returns {Promise<object|null>} - 일정 데이터 또는 null
 * @throws {Error} - 조회 중 오류 발생 시
 */

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
    if (import.meta.env.DEV) {
      console.error("일정 상세 조회 오류:", error);
    }
    throw error;
  }
}
