// loneleap-admin/pages/admin/reports/chats.js

import { useEffect, useState } from "react";
import AdminProtectedRoute from "@/components/auth/AdminProtectedRoute";
import AdminLayout from "@/components/layout/AdminLayout";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import ChatReportTable from "@/components/reports/ChatReportTable";
import ChatReportDetail from "@/components/reports/ChatReportDetail";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";

/**
 * @description 관리자가 사용자들이 신고한 채팅 메시지를 확인하고 처리할 수 있는 페이지
 * @returns {JSX.Element} 채팅 신고 관리 페이지 컴포넌트
 */
export default function AdminChatReportsPage() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/admin/login");
        return;
      }

      try {
        const token = await user.getIdToken();
        const res = await fetch("/api/chatReports/getChatReports", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setReports(data);
      } catch (error) {
        console.error("신고 채팅 불러오기 실패:", error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  // 로딩 처리
  if (loading) {
    return <LoadingSpinner text="신고된 채팅 메시지를 불러오는 중..." />;
  }

  return (
    <AdminProtectedRoute>
      <AdminLayout title="채팅 신고 관리">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold">채팅 신고 목록</h2>
          <p className="text-gray-600 text-sm mt-1">
            총 <strong>{reports.length}</strong>개의 신고가 접수되었습니다.
          </p>
        </div>

        <div className="flex gap-6">
          {/* 좌측 - 목록 */}
          <div className="w-1/2 bg-white p-6 rounded-xl shadow">
            <ChatReportTable reports={reports} onSelect={setSelectedReport} />
          </div>

          {/* 우측 - 상세 */}
          <div className="w-1/2 bg-white p-6 rounded-xl shadow min-h-[300px]">
            {selectedReport ? (
              <ChatReportDetail
                report={selectedReport}
                onSuccess={(deletedReport) => {
                  setReports((prev) =>
                    prev.filter((r) => r.id !== deletedReport.id)
                  );
                  setSelectedReport(null);
                }}
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <p>선택된 신고가 없습니다.</p>
                <p className="text-sm mt-2">
                  왼쪽 목록에서 신고를 선택해주세요.
                </p>
              </div>
            )}
          </div>
        </div>
      </AdminLayout>
    </AdminProtectedRoute>
  );
}
