import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { createReview } from "@/services/review/createReview";

/**
 * 리뷰 추가 기능을 제공하는 커스텀 훅
 * @param {Object} options - 훅 옵션
 * @param {Function} options.onSuccessCallback - 성공 시 콜백
 * @param {Function} options.onErrorCallback - 실패 시 콜백
 * @returns {Object} 리뷰 추가 관련 함수와 상태
 */
export default function useAddReview({
  onSuccessCallback,
  onErrorCallback,
} = {}) {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const queryClient = useQueryClient();

  const checkAuth = () => {
    if (!user) {
      navigate("/login", { state: { from: "/reviews/create" } });
      throw new Error("로그인이 필요한 서비스입니다.");
    }
  };

  const {
    mutate: addReview,
    isLoading,
    isError,
    error,
  } = useMutation({
    mutationFn: async (review) => {
      checkAuth();
      return await createReview(review, user);
    },
    onSuccess: (newId) => {
      alert("리뷰가 성공적으로 등록되었습니다!");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.REVIEWS] });
      onSuccessCallback?.(newId);
    },
    onError: (error) => {
      alert(`리뷰 등록 중 오류가 발생했습니다: ${error.message}`);
      onErrorCallback?.(error);
    },
  });

  return { addReview, isLoading, isError, error };
}
