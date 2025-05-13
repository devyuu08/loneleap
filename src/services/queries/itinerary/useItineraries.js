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

      return snapshot.docs.map((doc) => {
        const data = doc.data();

        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
          createdBy: {
            uid: data.createdBy?.uid || "",
            displayName: data.createdBy?.displayName || "익명",
            photoURL: data.createdBy?.photoURL || "/default_profile.png",
          },
          // startDate, endDate는 이후 개선 예정
        };
      });
    },
    onError: (err) => {
      console.error("일정 데이터를 불러오는 중 오류 발생:", err);
    },
  });
};
