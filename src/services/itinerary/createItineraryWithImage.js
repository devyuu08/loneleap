import { updateDoc, doc, increment } from "firebase/firestore";
import { db } from "@/services/firebase";
import { createItinerary } from "@/services/itinerary/createItinerary";
import { uploadImage } from "@/utils/uploadImage";

/**
 * 일정 생성 + 이미지 업로드 처리 함수
 * @param {object} formData - 일정 데이터 + 이미지
 * @param {object} user - 로그인 유저
 * @returns {Promise<string>} - 생성된 문서 ID
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
    console.warn("itineraryCount 증가 실패:", err);
  }

  return newId;
}
