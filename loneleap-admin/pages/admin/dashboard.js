// loneleap-admin/pages/admin/dashboard.js
import AdminProtectedRoute from "@/components/auth/AdminProtectedRoute";

export default function AdminDashboardPage() {
  return (
    <AdminProtectedRoute>
      <div className="p-6">
        <h1 className="text-2xl font-bold">관리자 대시보드</h1>
        {/* TODO: 이후 대시보드 기능 추가 */}
      </div>
    </AdminProtectedRoute>
  );
}
