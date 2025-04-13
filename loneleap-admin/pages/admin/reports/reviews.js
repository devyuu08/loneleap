// 📁 loneleap-admin/pages/admin/reports/reviews.js
import AdminProtectedRoute from "@/components/auth/AdminProtectedRoute";
import AdminLayout from "@/components/layout/AdminLayout";

/**
 * @description 관리자가 사용자들이 신고한 리뷰를 확인하고 처리할 수 있는 페이지
 * @returns {JSX.Element} 리뷰 신고 관리 페이지 컴포넌트
 */

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
            +{" "}
            <div className="flex items-center justify-center py-8">
              +{" "}
              <div className="animate-pulse flex flex-col items-center">
                +{" "}
                <div className="h-8 w-8 rounded-full border-2 border-gray-300 border-t-blue-500 animate-spin mb-2"></div>
                +{" "}
                <p className="text-sm text-gray-400">
                  신고된 리뷰 데이터를 불러오는 중...(예정)
                </p>
                +{" "}
              </div>
              +{" "}
            </div>
            +{" "}
          </div>
        </div>
      </AdminLayout>
    </AdminProtectedRoute>
  );
}
