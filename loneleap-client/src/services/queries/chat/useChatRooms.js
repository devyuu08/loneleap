import { useQuery } from "@tanstack/react-query";
import {
  collection,
  query,
  orderBy,
  getDocs,
  limit,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";

// Firestore에서 채팅방 목록 최신순으로 가져오는 기본 구조
// limitCount: 가져올 채팅방의 수 (기본값: 10)
export const useChatRooms = ({
  limitCount = 10,
  orderDirection = "desc",
  filterBy = null,
} = {}) => {
  return useQuery({
    queryKey: ["chatRooms", limitCount, orderDirection, filterBy],
    refetchInterval: 30000,
    staleTime: 10000,
    queryFn: async () => {
      try {
        const constraints = [
          orderBy("createdAt", orderDirection),
          limit(limitCount),
        ];

        if (filterBy) {
          constraints.unshift(
            where(filterBy.field, filterBy.operator, filterBy.value)
          );
        }

        const q = query(collection(db, "chatRooms"), ...constraints);
        const snapshot = await getDocs(q);
        return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      } catch (error) {
        console.error("채팅방 목록을 가져오는 중 오류 발생:", error);
        throw error;
      }
    },
  });
};
