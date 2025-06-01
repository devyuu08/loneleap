import {
  collection,
  query,
  where,
  getCountFromServer,
} from "firebase/firestore";
import { db } from "@/services/firebase";

/**
 * 사용자의 작성 콘텐츠 개수를 Firestore에서 조회
 * @param {string} uid
 * @returns {Promise<{ itineraryCount: number, reviewCount: number, chatRoomCount: number }>}
 */
export async function fetchUserStats(uid) {
  if (!uid) throw new Error("유저 ID가 없습니다.");

  const [itinerarySnap, reviewSnap, chatSnap] = await Promise.all([
    getCountFromServer(
      query(collection(db, "itineraries"), where("userId", "==", uid))
    ),
    getCountFromServer(
      query(collection(db, "reviews"), where("createdBy.uid", "==", uid))
    ),
    getCountFromServer(
      query(
        collection(db, "chatRooms"),
        where("participants", "array-contains", uid)
      )
    ),
  ]);

  return {
    itineraryCount: itinerarySnap.data().count,
    reviewCount: reviewSnap.data().count,
    chatRoomCount: chatSnap.data().count,
  };
}
