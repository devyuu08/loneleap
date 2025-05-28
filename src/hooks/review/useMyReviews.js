import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db, auth } from "@/services/firebase";
import { QUERY_KEYS } from "@/constants/queryKeys";

export const useMyReviews = (options = {}) => {
  const [user, loading] = useAuthState(auth);

  return useQuery({
    queryKey: QUERY_KEYS.MY_REVIEWS(user?.uid),
    enabled: !loading && !!user?.uid && options.enabled !== false,
    queryFn: async () => {
      if (!user?.uid) throw new Error("사용자 정보가 없습니다.");

      const q = query(
        collection(db, "reviews"),
        where("createdBy.uid", "==", user.uid),
        orderBy("createdAt", "desc")
      );

      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      }));
    },
    ...options,
  });
};
