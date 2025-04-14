// loneleap-admin/pages/admin/reports/chats.js
import AdminProtectedRoute from "@/components/auth/AdminProtectedRoute";
import AdminLayout from "@/components/layout/AdminLayout";
import LoadingSpinner from "@/components/common/LoadingSpinner";

export default function AdminChatReportsPage() {
  return (
    <AdminProtectedRoute>
      <AdminLayout>
        <section aria-labelledby="page-heading">
          <h1 id="page-heading" className="text-2xl font-bold mb-4">
            채팅 신고 목록
          </h1>
          <p className="text-gray-600 mb-6">
            사용자들이 신고한 채팅방 내용을 확인하고 처리할 수 있습니다.
          </p>

          {/* 신고 목록 테이블 자리 */}
          <div className="bg-white p-6 rounded-xl shadow">
            <div className="flex items-center justify-center py-8">
              <LoadingSpinner text="신고된 채팅 데이터를 불러오는 중...(예정)" />
            </div>
          </div>
        </section>
      </AdminLayout>
    </AdminProtectedRoute>
  );
}
