/**
 * useMutationWithFeedback
 *
 * 공통 mutation 패턴을 캡슐화한 커스텀 훅
 *
 * [기능]
 * - mutation 실행 후 성공/실패 메시지(toast) 자동 출력
 * - 지정된 쿼리 키 무효화로 최신 데이터 유지
 * - 성공 시 페이지 이동 또는 콜백 실행 가능
 * - 실패 시 사용자 피드백 제공 및 onError 콜백 실행
 *
 * [사용 예]
 * const mutation = useMutationWithFeedback({
 *   mutationFn: deleteReview,
 *   successMessage: "삭제가 완료되었습니다.",
 *   redirectTo: "/reviews",
 *   queryKeysToInvalidate: [[QUERY_KEYS.REVIEWS]],
 * });
 *
 * @param {Function} mutationFn - 비동기 mutation 함수 (필수)
 * @param {string} successMessage - 성공 시 출력할 메시지 (선택)
 * @param {string} errorMessage - 실패 시 출력할 메시지 (기본값 제공)
 * @param {Array} queryKeysToInvalidate - invalidateQueries 대상으로 사용할 queryKey 배열
 * @param {string} redirectTo - 성공 시 이동할 경로
 * @param {Function} onSuccessCallback - 성공 시 실행할 추가 로직
 * @param {Function} onErrorCallback - 실패 시 실행할 추가 로직
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useMutationWithFeedback({
  mutationFn,
  successMessage = "",
  errorMessage = "처리 중 오류가 발생했습니다.",
  queryKeysToInvalidate = [],
  redirectTo = "",
  onSuccessCallback,
  onErrorCallback,
}) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn,
    onSuccess: async (result) => {
      if (successMessage) toast.success(successMessage);

      for (const key of queryKeysToInvalidate) {
        await queryClient.invalidateQueries({ queryKey: key });
      }

      if (typeof onSuccessCallback === "function") {
        onSuccessCallback(result);
      }

      if (redirectTo) {
        navigate(redirectTo);
      }
    },
    onError: (error) => {
      toast.error(error.message || errorMessage);
      if (typeof onErrorCallback === "function") {
        onErrorCallback(error);
      }
    },
  });
}
