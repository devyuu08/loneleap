import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "@/services/firebase";
import { uploadImage } from "@/utils/uploadImage";

/**
 * 일정을 수정하고 Firestore에 업데이트
 * 이미지가 File 객체인 경우 업로드도 처리
 *
 * @param {string} id - 수정할 일정 ID
 * @param {object} updatedData - 수정할 데이터 객체 (title, location 등)
 * @returns {Promise<boolean>} - 성공 여부
 * @throws {Error} - 문서 존재 여부 확인 실패 또는 업로드 실패 시
 */

export async function updateItinerary(id, updatedData) {
  try {
    const docRef = doc(db, "itineraries", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error("존재하지 않는 일정입니다.");
    }

    // 이미지 처리
    let imageUrl = "";

    // File 객체일 때만 업로드
    if (updatedData.image instanceof File) {
      try {
        imageUrl = await uploadImage(updatedData.image, "itineraries");
      } catch (uploadErr) {
        if (import.meta.env.DEV) {
          console.error("이미지 업로드 실패:", uploadErr);
        }
        throw new Error("이미지 업로드에 실패했습니다. 다시 시도해주세요.");
      }
    } else if (typeof updatedData.image === "string") {
      // 문자열일 경우 그대로 사용 (기존 이미지 URL 유지)
      imageUrl = updatedData.image;
    }

    // Firestore에 저장할 데이터 준비
    const dataToUpdate = {
      title: updatedData.title,
      location: updatedData.location,
      summary: updatedData.summary,
      startDate: updatedData.startDate,
      endDate: updatedData.endDate,
      imageUrl,
      updatedAt: serverTimestamp(),
    };

    delete dataToUpdate.image; // File이나 string 모두 제거

    await updateDoc(docRef, dataToUpdate);
    return true;
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error("일정 수정 중 오류 발생:", error);
    }
    throw error;
  }
}
