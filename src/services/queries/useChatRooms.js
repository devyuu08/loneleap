import { useQuery } from "@tanstack/react-query";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { db } from "../firebase";

// Firestore에서 채팅방 목록 최신순으로 가져오는 기본 구조
export const useChatRooms = () => {
  return useQuery({
    queryKey: ["chatRooms"],
    queryFn: async () => {
      const q = query(
        collection(db, "chatRooms"),
        orderBy("createdAt", "desc")
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    },
  });
};
