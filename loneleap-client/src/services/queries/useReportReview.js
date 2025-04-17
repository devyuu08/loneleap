// src/services/queries/useReportReview.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  where,
  getDocs,
  query,
} from "firebase/firestore";
import { useSelector } from "react-redux";

export const useReportReview = () => {
  const user = useSelector((state) => state.user.user);
  const queryClient = useQueryClient();

  const checkExistingReport = async (reviewId, reporterId) => {
    const q = query(
      collection(db, "review_reports"),
      where("reviewId", "==", reviewId),
      where("reporterId", "==", reporterId)
    );
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  };

  return useMutation({
    mutationFn: async ({ reviewId, reason }) => {
      if (!reviewId) throw new Error("리뷰 ID가 필요합니다.");
      if (!reason || reason.trim() === "")
        throw new Error("신고 사유가 필요합니다.");
      if (reason.length > 500)
        throw new Error("신고 사유는 500자 이내로 작성해주세요.");
      const reporterId = user?.uid || "anonymous";

      if (user?.uid && (await checkExistingReport(reviewId, reporterId))) {
        throw new Error("이미 신고한 리뷰입니다.");
      }

      await addDoc(collection(db, "review_reports"), {
        reviewId,
        reason,
        reportedAt: serverTimestamp(),
        reporterId,
        status: "pending",
      });
    },
  });
};
