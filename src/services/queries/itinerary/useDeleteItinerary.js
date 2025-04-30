import { useNavigate } from "react-router-dom";
import { deleteItinerary } from "services/firestore";
import { useMutation } from "@tanstack/react-query";

import { updateDoc, doc, increment } from "firebase/firestore";
import { db, auth } from "services/firebase";

export const useDeleteItinerary = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (itineraryId) => {
      await deleteItinerary(itineraryId);

      // 삭제 시 사용자 카운트 감소 처리
      const uid = auth.currentUser?.uid;
      if (uid) {
        try {
          await updateDoc(doc(db, "users", uid), {
            itineraryCount: increment(-1),
          });
        } catch (err) {
          console.warn("📉 itineraryCount 감소 실패:", err);
        }
      }
    },
    onSuccess: () => {
      navigate("/itinerary");
    },
    onError: () => {
      alert("일정 삭제 중 오류가 발생했습니다.");
    },
  });
};
