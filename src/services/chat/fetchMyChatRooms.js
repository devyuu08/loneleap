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
 * 사용자가 참여한 채팅방 조회
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
