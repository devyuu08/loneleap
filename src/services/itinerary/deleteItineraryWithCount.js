import { deleteItinerary } from "@/services/itinerary/deleteItinerary";
import { updateDoc, doc, increment } from "firebase/firestore";
import { auth, db } from "@/services/firebase";

/**
 * 일정 삭제 + 카운트 감소를 함께 처리
 */
export async function deleteItineraryAndDecreaseCount({ itineraryId }) {
  await deleteItinerary(itineraryId);

  const uid = auth.currentUser?.uid;
  if (!uid) return;

  try {
    await updateDoc(doc(db, "users_private", uid), {
      itineraryCount: increment(-1),
    });
  } catch (err) {
    console.warn("itineraryCount 감소 실패:", err);
  }
}
