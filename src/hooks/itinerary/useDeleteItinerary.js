import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { auth } from "@/services/firebase";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { deleteItineraryAndDecreaseCount } from "@/services/itinerary/deleteItineraryWithCount";

export const useDeleteItinerary = () => {
  const navigate = useNavigate();
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

      alert("일정이 삭제되었습니다.");
      navigate("/itinerary");
    },

    onError: () => {
      alert("일정 삭제 중 오류가 발생했습니다.");
    },
  });
};
