import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  collection,
  addDoc,
  serverTimestamp,
  where,
  getDocs,
  query,
  doc,
  updateDoc,
  increment,
  getDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../../firebase";
import { useSelector } from "react-redux";

export const useReportReview = () => {
  const user = useSelector((state) => state.user.user);
  const queryClient = useQueryClient();

  const checkExistingReport = async (reviewId, reporterId) => {
    const q = query(
      collection(db, "review_reports"),
      where("reviewId", "==", reviewId),
      where("reporterId", "==", reporterId)
    );
    const snapshot = await getDocs(q);
    return !snapshot.empty;
  };

  return useMutation({
    mutationFn: async ({ reviewId, reason }) => {
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (!currentUser) {
        throw new Error("로그인이 필요합니다.");
      }

      await currentUser.getIdToken(true); // ID 토큰 강제 갱신

      if (!reviewId) throw new Error("리뷰 ID가 필요합니다.");
      if (!reason || reason.trim() === "")
        throw new Error("신고 사유가 필요합니다.");
      if (reason.length > 500)
        throw new Error("신고 사유는 500자 이내로 작성해주세요.");

      const reporterId = currentUser.uid;

      const alreadyReported = await checkExistingReport(reviewId, reporterId);
      if (alreadyReported) {
        throw new Error("이미 신고한 리뷰입니다.");
      }

      // 1. 리뷰 문서에서 작성자(authorId) 조회
      const reviewRef = doc(db, "reviews", reviewId);
      const reviewSnap = await getDoc(reviewRef);

      if (!reviewSnap.exists()) {
        throw new Error("신고 대상 리뷰를 찾을 수 없습니다.");
      }

      const { authorId } = reviewSnap.data();

      // 2. 신고 문서 추가
      await addDoc(collection(db, "review_reports"), {
        reviewId,
        reason,
        reporterId,
        reportedAt: serverTimestamp(),
        status: "pending",
      });

      // 3. 리뷰 작성자(authorId)의 신고당한 횟수 증가
      await updateDoc(doc(db, "users", authorId), {
        reportedCount: increment(1),
      });
    },
  });
};
