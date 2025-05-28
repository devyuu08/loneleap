import { useQuery } from "@tanstack/react-query";
import { auth } from "@/services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "@/services/firebase";

export const useMyItineraries = (options = {}) => {
  const [user, loading] = useAuthState(auth);

  return useQuery({
    queryKey: QUERY_KEYS.MY_ITINERARIES(user?.uid),
    enabled: !loading && !!user?.uid && options.enabled !== false,
    queryFn: async () => {
      if (!user?.uid) throw new Error("사용자 정보가 없습니다.");

      const q = query(
        collection(db, "itineraries"),
        where("userId", "==", user.uid),
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
