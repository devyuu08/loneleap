import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/services/firebase";

/**
 * 일정을 공개로 설정하고 클립보드에 공유 링크를 복사
 *
 * @param {string} itineraryId - 공유할 일정의 ID
 * @returns {Promise<string>} - 공유 링크 URL
 * @throws {Error} - ID가 없거나 업데이트 실패 시
 */

export async function shareItinerary(itineraryId) {
  if (!itineraryId) throw new Error("일정 ID가 없습니다.");

  const docRef = doc(db, "itineraries", itineraryId);

  // Firestore 공개 설정
  await updateDoc(docRef, { isPublic: true });

  // 공유 링크 생성
  const shareLink = `${window.location.origin}/itinerary/public/${itineraryId}`;
  await navigator.clipboard.writeText(shareLink);

  return shareLink;
}
