// pages/admin/dashboard.js
import AdminProtectedRoute from "@/components/auth/AdminProtectedRoute";
import AdminLayout from "@/components/layout/AdminLayout";
import Link from "next/link";

export default function AdminDashboard({ stats }) {
  return (
    <AdminProtectedRoute>
      <AdminLayout>
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-2">안녕하세요, 관리자님</h1>
          <p className="text-gray-500 mb-6">
            {new Date().toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "long",
              day: "numeric",
              weekday: "long",
            })}
          </p>

          {/* 통계 카드 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-4 rounded-xl shadow">
              신고된 리뷰: <strong>{stats.reviewReports}</strong>
            </div>
            <div className="bg-white p-4 rounded-xl shadow">
              신고된 채팅: <strong>{stats.chatReports}</strong>
            </div>
            <div className="bg-white p-4 rounded-xl shadow">
              활성 사용자:{" "}
              <strong>{stats.activeUsers.toLocaleString()}명</strong>
            </div>
          </div>

          {/* 차트 박스 영역 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white p-6 h-60 rounded-xl shadow flex items-center justify-center text-gray-400">
              <p>라인 차트 영역 (구현 예정)</p>
            </div>
            <div className="bg-white p-6 h-60 rounded-xl shadow flex items-center justify-center text-gray-400">
              <p>바 차트 영역 (구현 예정)</p>
            </div>
          </div>
          {/* 최근 신고 내역 테이블 (데이터 연동은 추후 구현) */}
          <div className="bg-white p-6 rounded-xl shadow">
            <div className="flex justify-between mb-4">
              <h2 className="text-lg font-semibold">최근 신고 내역</h2>
              <Link
                href="/admin/reports/reviews"
                className="text-sm text-blue-500"
              >
                전체보기 →
              </Link>
            </div>
            <table
              className="w-full text-sm text-left"
              aria-label="최근 신고 내역 테이블"
            >
              <caption className="sr-only">최근 신고 내역</caption>
              <thead>
                <tr className="text-gray-500 border-b">
                  <th className="py-2">유형</th>
                  <th className="py-2">내용</th>
                  <th className="py-2">신고자</th>
                  <th className="py-2">상태</th>
                  <th className="py-2">시간</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="5" className="py-4 text-center text-gray-500">
                    신고 내역이 없습니다.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </AdminLayout>
    </AdminProtectedRoute>
  );
}

// 서버 사이드에서만 실행되는 코드 (admin SDK는 여기서만!)
export async function getServerSideProps() {
  const { db } = await import("@/lib/firebaseAdmin"); // ⬅ 여기서만 불러오기

  const [reviewSnap, chatSnap, userSnap] = await Promise.all([
    db.collection("review_reports").get(),
    db.collection("chatReports").get(),
    db.collection("users").get(),
  ]);

  return {
    props: {
      stats: {
        reviewReports: reviewSnap.size || 0,
        chatReports: chatSnap.size || 0,
        activeUsers: userSnap.size || 0,
      },
    },
  };
}
