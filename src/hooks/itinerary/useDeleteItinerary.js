import { useMutation, useQueryClient } from "@tanstack/react-query";

import { auth } from "@/services/firebase";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { deleteItineraryAndDecreaseCount } from "@/services/itinerary/deleteItineraryWithCount";
import { useAuthState } from "react-firebase-hooks/auth";

export const useDeleteItinerary = ({
  onSuccess = () => {},
  onError = () => {},
} = {}) => {
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
};
