// 📁 loneleap-admin/pages/admin/dashboard.js
import { useState, useEffect } from "react";
import AdminProtectedRoute from "@/components/auth/AdminProtectedRoute";
import AdminLayout from "@/components/layout/AdminLayout";
import Link from "next/link";

// import { Line, Bar } from 'recharts'; // 또는 다른 차트 라이브러리
// 차트 데이터 상태와 API 호출 로직 추가

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    reviewReports: 0,
    chatReports: 0,
    activeUsers: 0,
  });

  // 상태와 API 호출 로직 추가
  const [recentReports, setRecentReports] = useState([]);

  useEffect(() => {
    // API 호출하여 실제 통계 데이터 가져오기
    // 예: fetchDashboardStats().then(data => setStats(data));
  }, []);

  return (
    <AdminProtectedRoute>
      <AdminLayout>
        <div className="p-6">
          {/* 상단 환영 메시지 */}
          <h1 className="text-2xl font-bold mb-2">안녕하세요, 관리자님</h1>
          <p className="text-gray-500 mb-6">
            {new Date().toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "long",
              day: "numeric",
              weekday: "long",
            })}
          </p>

          {/* 통계 카드 영역 */}
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
              {/* TODO: 라인 차트 구현 */}
              {/* <LineChart data={lineChartData} /> */}
              <p>라인 차트 영역 (구현 예정)</p>
            </div>
            <div className="bg-white p-6 h-60 rounded-xl shadow flex items-center justify-center text-gray-400">
              {/* TODO: 바 차트 구현 */}
              {/* <BarChart data={barChartData} /> */}
              <p>바 차트 영역 (구현 예정)</p>
            </div>
          </div>

          {/* 최근 신고 내역 (테이블 자리) */}
          <div className="bg-white p-6 rounded-xl shadow">
            <div className="flex justify-between mb-4">
              <h2 className="text-lg font-semibold">최근 신고 내역</h2>
              <Link href="/admin/reports" className="text-sm text-blue-500">
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
                  <th scope="col" className="py-2">
                    유형
                  </th>
                  <th scope="col" className="py-2">
                    내용
                  </th>
                  <th scope="col" className="py-2">
                    신고자
                  </th>
                  <th scope="col" className="py-2">
                    상태
                  </th>
                  <th scope="col" className="py-2">
                    시간
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentReports.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="py-4 text-center text-gray-500">
                      신고 내역이 없습니다.
                    </td>
                  </tr>
                ) : (
                  recentReports.map((report, index) => (
                    <tr
                      key={report.id || index}
                      className={
                        index < recentReports.length - 1 ? "border-b" : ""
                      }
                    >
                      <td className="py-2">{report.type}</td>
                      <td className="py-2">{report.content}</td>
                      <td className="py-2">{report.reporter}</td>
                      <td className="py-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            report.status === "처리중"
                              ? "bg-gray-200 text-gray-600"
                              : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {report.status}
                        </span>
                      </td>
                      <td className="py-2">{report.time}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </AdminLayout>
    </AdminProtectedRoute>
  );
}
