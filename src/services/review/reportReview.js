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
import { db } from "@/services/firebase";

export async function reportReview({ reviewId, reason, reporterId }) {
  if (!reviewId) throw new Error("리뷰 ID가 필요합니다.");
  if (!reason || reason.trim() === "")
    throw new Error("신고 사유가 필요합니다.");
  if (reason.length > 500)
    throw new Error("신고 사유는 500자 이내로 작성해주세요.");

  // 중복 신고 여부 확인
  const q = query(
    collection(db, "review_reports"),
    where("reviewId", "==", reviewId),
    where("reporterId", "==", reporterId)
  );
  const snapshot = await getDocs(q);
  if (!snapshot.empty) throw new Error("이미 신고한 리뷰입니다.");

  // 리뷰 작성자 UID 조회
  const reviewSnap = await getDoc(doc(db, "reviews", reviewId));
  if (!reviewSnap.exists()) throw new Error("리뷰를 찾을 수 없습니다.");
  const authorUid = reviewSnap.data().createdBy?.uid;
  if (!authorUid) throw new Error("작성자 정보를 찾을 수 없습니다.");

  // 신고 문서 작성
  await addDoc(collection(db, "review_reports"), {
    reviewId,
    reason,
    reporterId,
    reportedAt: serverTimestamp(),
    status: "pending",
  });

  // 신고당한 횟수 증가
  await updateDoc(doc(db, "users_private", authorUid), {
    reportedCount: increment(1),
  });
}
