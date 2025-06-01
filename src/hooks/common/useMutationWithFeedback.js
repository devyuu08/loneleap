import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useMutationWithFeedback = ({
  mutationFn,
  successMessage = "",
  errorMessage = "처리 중 오류가 발생했습니다.",
  queryKeysToInvalidate = [],
  redirectTo = "",
  onSuccessCallback,
  onErrorCallback,
}) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn,
    onSuccess: async (result) => {
      if (successMessage) alert(successMessage);

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
      console.error(error);
      alert(error.message || errorMessage);
      if (typeof onErrorCallback === "function") {
        onErrorCallback(error);
      }
    },
  });
};
