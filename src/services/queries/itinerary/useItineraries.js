import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "services/firebase";

export const useItineraries = () => {
  return useQuery({
    queryKey: ["itineraries"],
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
    queryFn: async () => {
      const q = query(
        collection(db, "itineraries"),
        orderBy("createdAt", "desc"),
        limit(20)
      );
      const snapshot = await getDocs(q);

      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      }));
    },
    onError: (err) => {
      console.error("일정 데이터를 불러오는 중 오류 발생:", err);
    },
  });
};
