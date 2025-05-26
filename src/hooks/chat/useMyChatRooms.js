import { useQuery } from "@tanstack/react-query";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "services/firebase";
import { QUERY_KEYS } from "constants/queryKeys";

export const useMyChatRooms = (uid, options = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.MY_CHAT_ROOMS(uid),
    enabled: !!uid && options.enabled !== false,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
    refetchInterval: 30 * 1000,
    ...options, // 사용자 정의 옵션 덮어쓰기 가능
    queryFn: async () => {
      const q = query(
        collection(db, "chatRooms"),
        where("participants", "array-contains", uid),
        orderBy("createdAt", "desc"),
        limit(20)
      );
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        return [];
      }
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    },
  });
};
