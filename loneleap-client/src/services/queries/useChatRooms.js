import { useQuery } from "@tanstack/react-query";
import { collection, query, orderBy, getDocs, limit } from "firebase/firestore";
import { db } from "../firebase";

// Firestore에서 채팅방 목록 최신순으로 가져오는 기본 구조
export const useChatRooms = () => {
  return useQuery({
    queryKey: ["chatRooms"],
    refetchInterval: 30000, // 30초마다 자동으로 다시 불러옴
    staleTime: 10000, // 10초 동안은 데이터를 최신 상태로 유지
    queryFn: async () => {
      try {
        const q = query(
          collection(db, "chatRooms"),
          orderBy("createdAt", "desc"),
          limit(10) // 한 번에 10개만 로드
        );
        const snapshot = await getDocs(q);
        return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      } catch (error) {
        console.error("채팅방 목록을 가져오는 중 오류 발생:", error);
        throw error;
      }
    },
  });
};
