import { useNavigate } from "react-router-dom";

import { createItinerary } from "services/itineraryService";
import { updateDoc, doc, increment } from "firebase/firestore";
import { db } from "services/firebase";
import { auth } from "services/firebase";
import { useMutation } from "@tanstack/react-query";

export const useAddItinerary = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: createItinerary,
    onSuccess: async (newId) => {
      try {
        const uid = auth.currentUser?.uid;
        if (uid) {
          await updateDoc(doc(db, "users", uid), {
            itineraryCount: increment(1),
          });
        }
      } catch (err) {
        // 실패해도 일정 생성은 완료되므로 경고만 남김
        console.warn("itineraryCount 증가 실패:", err);
      }

      navigate(`/itinerary/${newId}`);
    },
    onError: () => {
      alert("일정 저장에 실패했습니다.");
    },
  });
};
