import { useMutation, useQueryClient } from "@tanstack/react-query";

import { auth } from "@/services/firebase";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { deleteItineraryAndDecreaseCount } from "@/services/itinerary/deleteItineraryWithCount";

export const useDeleteItinerary = ({
  onSuccess = () => {},
  onError = () => {},
} = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteItineraryAndDecreaseCount,

    onSuccess: (_, variables) => {
      const { itineraryId } = variables;

      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ITINERARIES] });

      const uid = auth.currentUser?.uid;
      if (uid) {
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.MY_ITINERARIES(uid),
        });
      }

      onSuccess(); // UI 쪽에서 정의한 행동 실행
    },

    onError: onError,
  });
};
