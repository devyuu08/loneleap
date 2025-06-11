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
 * 채팅방 목록을 조회
 * @param {Object} params
 * @param {number} [params.limitCount=10] - 가져올 채팅방 개수
 * @param {string} [params.orderDirection="desc"] - 정렬 방향 ("asc" 또는 "desc")
 * @param {Object|null} [params.filterBy] - 필터 조건 ({ field, operator, value })
 * @returns {Promise<Array>} - 채팅방 배열
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
