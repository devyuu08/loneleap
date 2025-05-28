import { useNavigate } from "react-router-dom";
import { deleteItinerary } from "@/services/itinerary/deleteItinerary";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateDoc, doc, increment } from "firebase/firestore";
import { db, auth } from "@/services/firebase";
import { QUERY_KEYS } from "@/constants/queryKeys";

export const useDeleteItinerary = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (itineraryId) => {
      await deleteItinerary(itineraryId);

      // 삭제 시 사용자 카운트 감소 처리
      const uid = auth.currentUser?.uid;
      if (uid) {
        try {
          await updateDoc(doc(db, "users_private", uid), {
            itineraryCount: increment(-1),
          });
        } catch (err) {
          console.warn("itineraryCount 감소 실패:", err);
        }
      }
    },
    onSuccess: () => {
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
