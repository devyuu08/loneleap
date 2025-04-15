// loneleap-admin/pages/api/reviewReports/getReviewReports.js
import { db } from "@/lib/firebaseAdmin";
import { verifyAdminToken } from "@/lib/auth";

export default async function getReviewReportsHandler(req, res) {
  // 관리자 인증
  try {
    await verifyAdminToken(req, res);
  } catch (error) {
    return res.status(401).json({ error: "인증되지 않은 요청입니다." });
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "허용되지 않은 요청 방식입니다." });
  }

  try {
    const parsedLimit = parseInt(req.query.limit);
    const limit = Number.isNaN(parsedLimit) ? 50 : parsedLimit;
    const lastDoc = req.query.lastDoc || null;

    let query = db
      .collection("review_reports")
      .orderBy("reportedAt", "desc")
      .limit(limit);

    // 페이지네이션을 위한 시작점 설정
    if (lastDoc) {
      const lastSnapshot = await db
        .collection("review_reports")
        .doc(lastDoc)
        .get();
      if (lastSnapshot.exists) {
        query = query.startAfter(lastSnapshot);
      }
    }

    const snapshot = await query.get();

    // 1. ✅ 신고 데이터만 먼저 추출
    const reports = snapshot.docs.map((docSnap) => {
      const report = docSnap.data();
      return {
        id: docSnap.id,
        ...report,
        reportedAt: report.reportedAt?.toDate?.().toISOString() || null,
        review: null, // 이후 연결
      };
    });

    // 2. 리뷰 ID 수집
    const reviewIds = [...new Set(reports.map((r) => r.reviewId))];

    // 3. 일괄 리뷰 조회 (Promise.all)
    const reviewSnaps = await Promise.all(
      reviewIds.map((id) => db.collection("reviews").doc(id).get())
    );

    const reviewsMap = {};
    reviewSnaps.forEach((snap) => {
      if (snap.exists) {
        reviewsMap[snap.id] = snap.data();
      }
    });

    // 4. 신고 데이터에 리뷰 정보 연결
    const data = reports.map((report) => ({
      ...report,
      review: reviewsMap[report.reviewId] || null,
    }));

    return res.status(200).json(data);
  } catch (error) {
    console.error("리뷰 신고 데이터 불러오기 오류:", error);
    res.status(500).json({
      error: "리뷰 신고 데이터를 불러오는 중 서버 오류가 발생했습니다",
      ...(process.env.NODE_ENV === "development" && {
        message: error.message,
        stack: error.stack,
      }),
    });
  }
}
