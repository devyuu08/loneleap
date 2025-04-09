// src/services/queries/useReviewDetail.js
import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export const useReviewDetail = (id) => {
  return useQuery({
    queryKey: ["review", id],
    queryFn: async () => {
      const docRef = doc(db, "reviews", id);
      const snapshot = await getDoc(docRef);

      if (!snapshot.exists()) {
        throw new Error("리뷰가 존재하지 않습니다.");
      }

      return { id: snapshot.id, ...snapshot.data() };
    },
    enabled: !!id, // id가 있을 때만 실행
  });
};
