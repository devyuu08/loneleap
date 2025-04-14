// loneleap-admin/pages/admin/reports/reviews.js
import { useEffect, useState } from "react";
import AdminProtectedRoute from "@/components/auth/AdminProtectedRoute";
import AdminLayout from "@/components/layout/AdminLayout";
import LoadingSpinner from "@/components/common/LoadingSpinner"; // 로딩 컴포넌트 분리 시
import ReviewReportTable from "@/components/reports/ReviewReportTable";
import ReviewReportDetail from "@/components/reports/ReviewReportDetail";
import { getAuth, onAuthStateChanged } from "firebase/auth";

/**
 * @description 관리자가 사용자들이 신고한 리뷰를 확인하고 처리할 수 있는 페이지
 * @returns {JSX.Element} 리뷰 신고 관리 페이지 컴포넌트
 */

export default function AdminReviewReportsPage() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const auth = getAuth();

        onAuthStateChanged(auth, async (user) => {
          if (!user) {
            throw new Error("로그인된 사용자 없음");
          }

          const token = await user.getIdToken(); // 새로 발급
          const res = await fetch("/api/admin/getReviewReports", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const data = await res.json();
          setReports(data);
          setLoading(false);
        });
      } catch (error) {
        console.error("관리자 인증 실패:", error);
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  return (
    <AdminProtectedRoute>
      <AdminLayout title="리뷰 신고 관리">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold">리뷰 신고 목록</h2>
          <p className="text-gray-600 text-sm mt-1">
            총 <strong>{reports.length}</strong>개의 신고가 접수되었습니다.
          </p>
        </div>

        <div className="flex gap-6">
          {/* 좌측 */}
          <div className="w-1/2 bg-white p-6 rounded-xl shadow">
            {loading ? (
              <LoadingSpinner text="신고된 리뷰 데이터를 불러오는 중..." />
            ) : (
              <ReviewReportTable
                reports={reports}
                onSelect={setSelectedReport}
              />
            )}
          </div>

          {/* 우측 */}
          <div className="w-1/2 bg-white p-6 rounded-xl shadow min-h-[300px]">
            <ReviewReportDetail report={selectedReport} />
          </div>
        </div>
      </AdminLayout>
    </AdminProtectedRoute>
  );
}
