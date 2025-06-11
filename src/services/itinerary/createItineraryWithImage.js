import { updateDoc, doc, increment } from "firebase/firestore";
import { db } from "@/services/firebase";
import { createItinerary } from "@/services/itinerary/createItinerary";
import { uploadImage } from "@/utils/uploadImage";

/**
 * 이미지 업로드를 포함한 일정 생성을 처리
 *
 * @param {object} formData - 사용자 입력 폼 데이터 (image 포함)
 * @param {object} user - 현재 로그인한 사용자 객체
 * @returns {Promise<string>} - 생성된 일정 ID
 * @throws {Error} - 로그인되지 않았거나 업로드 실패 시
 */

export async function createItineraryWithImage(formData, user) {
  if (!user) throw new Error("로그인이 필요합니다.");

  let imageUrl = "";

  if (formData.image instanceof File) {
    imageUrl = await uploadImage(formData.image, "itineraries");
  } else if (typeof formData.image === "string") {
    imageUrl = formData.image;
  }

  const itineraryData = {
    ...formData,
    imageUrl,
    createdBy: {
      uid: user.uid,
      displayName: user.displayName || "익명",
      photoURL: user.photoURL || "",
      userId: user.uid,
    },
  };

  const newId = await createItinerary(itineraryData);

  // 카운트 증가 (실패해도 오류 무시)
  try {
    await updateDoc(doc(db, "users_private", user.uid), {
      itineraryCount: increment(1),
    });
  } catch (err) {
    if (import.meta.env.DEV) {
      console.warn("itineraryCount 증가 실패:", err);
    }
  }

  return newId;
}
