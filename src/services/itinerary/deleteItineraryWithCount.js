import { deleteItinerary } from "@/services/itinerary/deleteItinerary";
import { updateDoc, doc, increment } from "firebase/firestore";
import { auth, db } from "@/services/firebase";

/**
 * 일정을 삭제하고 사용자 문서의 itineraryCount를 감소시킴
 *
 * @param {object} param
 * @param {string} param.itineraryId - 삭제할 일정의 ID
 * @returns {Promise<void>}
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
