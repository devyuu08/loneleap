import { useMutation, useQueryClient } from "@tanstack/react-query";

import { auth } from "@/services/firebase";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { deleteItineraryAndDecreaseCount } from "@/services/itinerary/deleteItineraryWithCount";
import { useAuthState } from "react-firebase-hooks/auth";

/**
 * useDeleteItinerary
 * - 사용자의 여행 일정을 삭제하는 mutation 훅
 * - 삭제 성공 시 전체 일정 목록 및 사용자 일정 목록 캐시 무효화
 * - 성공/실패 콜백 함수 등록 가능
 */

export function useDeleteItinerary({
  onSuccess = () => {},
  onError = () => {},
} = {}) {
  const [user] = useAuthState(auth);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteItineraryAndDecreaseCount,

    onSuccess: (_, variables) => {
      const { itineraryId } = variables;

      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ITINERARIES] });

      if (user?.uid) {
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.MY_ITINERARIES(user.uid),
        });
      }

      onSuccess(); // UI 정의 동작 실행
    },

    onError: onError,
  });
}
