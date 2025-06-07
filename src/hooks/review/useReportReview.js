import { getAuth } from "firebase/auth";
import { useSelector } from "react-redux";
import { useMutationWithFeedback } from "@/hooks/common/useMutationWithFeedback";
import { reportReview } from "@/services/review/reportReview";

/**
 * useReportReview
 * - 리뷰 신고를 위한 mutation 훅
 * - 로그인 유저만 신고 가능, Firebase ID 토큰 강제 갱신 포함
 * - 성공/실패 시 콜백 및 메시지 처리 포함
 */

export const useReportReview = ({
  onSuccessCallback,
  onErrorCallback,
} = {}) => {
  const user = useSelector((state) => state.user.user);

  const checkAuth = () => {
    if (!user) {
      throw new Error("로그인이 필요합니다.");
    }
  };

  return useMutationWithFeedback({
    mutationFn: async ({ reviewId, reason }) => {
      checkAuth();
      await getAuth().currentUser.getIdToken(true); // 강제 갱신
      return await reportReview({ reviewId, reason, reporterId: user.uid });
    },
    successMessage: "리뷰가 성공적으로 신고되었습니다.",
    errorMessage: "리뷰 신고 중 오류가 발생했습니다.",
    queryKeysToInvalidate: [],
    onSuccessCallback,
    onErrorCallback,
  });
};
