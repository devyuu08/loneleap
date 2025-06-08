import { getAuth } from "firebase/auth";
import { useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { reportReview } from "@/services/review/reportReview";

/**
 * useReportReview
 * - 리뷰 신고를 위한 mutation 훅
 * - 로그인 유저만 신고 가능, Firebase ID 토큰 강제 갱신 포함
 */

export const useReportReview = () => {
  const user = useSelector((state) => state.user.user);

  return useMutation({
    mutationFn: async ({ reviewId, reason }) => {
      if (!user?.uid) throw new Error("로그인이 필요합니다.");
      await getAuth().currentUser.getIdToken(true);
      return await reportReview({ reviewId, reason, reporterId: user.uid });
    },
  });
};
