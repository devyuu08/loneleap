// loneleap-admin/pages/admin/reports/reviews.js
import { useEffect, useState } from "react";
import AdminProtectedRoute from "@/components/auth/AdminProtectedRoute";
import AdminLayout from "@/components/layout/AdminLayout";
import ReportReviewList from "@/components/reports/ReportReviewList"; // 리스트 컴포넌트
import LoadingSpinner from "@/components/common/LoadingSpinner"; // 로딩 컴포넌트 분리 시

/**
 * @description 관리자가 사용자들이 신고한 리뷰를 확인하고 처리할 수 있는 페이지
 * @returns {JSX.Element} 리뷰 신고 관리 페이지 컴포넌트
 */

export default function AdminReviewReportsPage() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await fetch("/api/admin/getReviewReports");
        const data = await res.json();
        setReports(data);
        console.log("받은 데이터:", data); // 배열인지 확인
        setLoading(false);
      } catch (error) {
        console.error("신고 리뷰 불러오기 실패:", error);
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  return (
    <AdminProtectedRoute>
      <AdminLayout>
        <div>
          <h1 className="text-2xl font-bold mb-4">리뷰 신고 목록</h1>
          <p className="text-gray-600 mb-6">
            사용자들이 신고한 리뷰를 확인하고 처리할 수 있습니다.
          </p>

          {/* 신고 목록 테이블 자리 */}
          <div className="bg-white p-6 rounded-xl shadow">
            {loading ? (
              <LoadingSpinner text="신고된 리뷰 데이터를 불러오는 중..." />
            ) : (
              <ReportReviewList reports={reports} />
            )}
          </div>
        </div>
      </AdminLayout>
    </AdminProtectedRoute>
  );
}
