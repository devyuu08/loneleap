import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteReview } from "services/reviewService";
import { auth, db } from "services/firebase";
import { doc, updateDoc, increment } from "firebase/firestore";

export const useDeleteReview = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (reviewId) => {
      await deleteReview(reviewId);

      // 리뷰 수 감소 처리
      const uid = auth.currentUser?.uid;
      if (uid) {
        try {
          await updateDoc(doc(db, "users_private", uid), {
            reviewCount: increment(-1),
          });
        } catch (err) {
          console.warn("reviewCount 감소 실패:", err);
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      queryClient.invalidateQueries({ queryKey: ["myReviews"] });
      alert("리뷰가 삭제되었습니다.");
      navigate("/reviews");
    },
    onError: () => {
      alert("리뷰 삭제 중 오류가 발생했습니다.");
    },
  });
};
