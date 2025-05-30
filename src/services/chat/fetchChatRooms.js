import {
  collection,
  query,
  orderBy,
  where,
  limit,
  getDocs,
} from "firebase/firestore";
import { db } from "@/services/firebase";

/**
 * 조건에 따라 채팅방 리스트를 조회
 */
export async function fetchChatRooms({
  limitCount = 10,
  orderDirection = "desc",
  filterBy = null,
}) {
  const constraints = [orderBy("createdAt", orderDirection), limit(limitCount)];

  if (filterBy) {
    constraints.unshift(
      where(filterBy.field, filterBy.operator, filterBy.value)
    );
  }

  const q = query(collection(db, "chatRooms"), ...constraints);
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}
