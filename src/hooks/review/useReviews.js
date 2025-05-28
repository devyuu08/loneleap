import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "@/services/firebase";

import { QUERY_KEYS } from "@/constants/queryKeys";

export const useReviews = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.REVIEWS],
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
    queryFn: async () => {
      const q = query(
        collection(db, "reviews"),
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
          likesCount: data.likesCount || 0,

          // 안전하게 createdBy 필드 체크
          createdBy: {
            uid: data.createdBy?.uid || "",
            displayName: data.createdBy?.displayName || "익명",
            photoURL: data.createdBy?.photoURL || "/images/default-profile.png",
          },
        };
      });
    },
    onError: (error) => {
      console.error("리뷰를 불러오는 중 오류가 발생했습니다:", error);
    },
  });
};
