// src/services/queries/useReportReview.js
import { useMutation } from "@tanstack/react-query";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useSelector } from "react-redux";

export const useReportReview = () => {
  const user = useSelector((state) => state.user.user);

  return useMutation({
    mutationFn: async ({ reviewId, reason }) => {
      if (!reviewId || !reason) throw new Error("신고 정보가 부족합니다.");

      await addDoc(collection(db, "review_reports"), {
        reviewId,
        reason,
        reportedAt: serverTimestamp(),
        reporterId: user?.uid || "anonymous",
      });
    },
    onSuccess: () => {
      alert("신고가 접수되었습니다.");
    },
    onError: (error) => {
      console.error(error);
      alert("신고 처리 중 오류가 발생했습니다.");
    },
  });
};
