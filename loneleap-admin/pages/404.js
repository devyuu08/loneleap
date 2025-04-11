// pages/404.js
import { useRouter } from "next/router";
import AdminLayout from "@/components/layout/AdminLayout";
import AdminProtectedRoute from "@/components/auth/AdminProtectedRoute";

export default function Custom404() {
  const router = useRouter();
  const isAdminPage = router.asPath.startsWith("/admin");

  if (isAdminPage) {
    return (
      <AdminProtectedRoute>
        <AdminLayout>
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <h1 className="text-3xl font-bold mb-4">
              페이지를 찾을 수 없습니다
            </h1>
            <p className="text-gray-500">존재하지 않는 관리자 경로입니다.</p>
          </div>
        </AdminLayout>
      </AdminProtectedRoute>
    );
  }

  // 일반 유저용 404
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <h1 className="text-3xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-gray-500">존재하지 않는 페이지입니다.</p>
    </div>
  );
}
