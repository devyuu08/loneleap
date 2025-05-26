import { useQuery } from "@tanstack/react-query";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { db } from "services/firebase";

export async function fetchRecommendationList() {
  const q = query(
    collection(db, "recommended_places"),
    where("visible", "==", true),
    orderBy("createdAt", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export function useRecommendationList() {
  return useQuery({
    queryKey: ["recommendations"],
    queryFn: fetchRecommendationList,
  });
}
