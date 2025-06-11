import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";
import { db } from "@/services/firebase";

/**
 * 현재 로그인한 사용자의 채팅방 목록을 조회
 * @param {string} uid - 사용자 UID
 * @returns {Promise<Array>} - 참여한 채팅방 목록
 */

export async function fetchMyChatRooms(uid) {
  const q = query(
    collection(db, "chatRooms"),
    where("participants", "array-contains", uid),
    orderBy("createdAt", "desc"),
    limit(20)
  );

  const snapshot = await getDocs(q);
  return snapshot.empty
    ? []
    : snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}
