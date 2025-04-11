// 📁 loneleap-admin/pages/admin/reports/reviews.js
import AdminProtectedRoute from "@/components/auth/AdminProtectedRoute";
import AdminLayout from "@/components/layout/AdminLayout";

export default function AdminReviewReportsPage() {
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
            <div className="text-sm text-gray-400">
              신고된 리뷰 데이터 로딩 예정...
            </div>
          </div>
        </div>
      </AdminLayout>
    </AdminProtectedRoute>
  );
}
