// src/services/queries/useReportReview.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  collection,
  addDoc,
  serverTimestamp,
  where,
  getDocs,
  query,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firebase";
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

      // 로그인 여부 체크
      if (!currentUser) {
        console.warn("⛔️ Firestore 요청 전에 인증되지 않은 사용자입니다.");
        throw new Error("로그인이 필요합니다.");
      }

      // ID 토큰 강제 갱신 → request.auth 보장
      const idToken = await currentUser.getIdToken(true);
      console.log("🔥 ID Token 강제 갱신 완료:", idToken);

      // 파라미터 유효성 검사
      if (!reviewId) throw new Error("리뷰 ID가 필요합니다.");
      if (!reason || reason.trim() === "")
        throw new Error("신고 사유가 필요합니다.");
      if (reason.length > 500)
        throw new Error("신고 사유는 500자 이내로 작성해주세요.");

      const reporterId = currentUser.uid;

      // 중복 신고 방지
      const alreadyReported = await checkExistingReport(reviewId, reporterId);
      if (alreadyReported) {
        throw new Error("이미 신고한 리뷰입니다.");
      }

      // 신고 요청
      console.log("🔥 신고 시도 전 UID:", reporterId);
      console.log("🔥 컬렉션: review_reports");

      await addDoc(collection(db, "review_reports"), {
        reviewId,
        reason,
        reporterId,
        reportedAt: serverTimestamp(),
        status: "pending",
      });
    },
    onSuccess: () => {
      console.log("리뷰 신고 완료");
    },
    onError: (err) => {
      console.error("리뷰 신고 중 오류 발생:", err.message);
    },
  });
};
