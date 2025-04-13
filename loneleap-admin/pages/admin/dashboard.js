// 📁 loneleap-admin/pages/admin/dashboard.js
import AdminProtectedRoute from "@/components/auth/AdminProtectedRoute";
import AdminLayout from "@/components/layout/AdminLayout";
import Link from "next/link";

export default function AdminDashboard() {
  return (
    <AdminProtectedRoute>
      <AdminLayout>
        <div className="p-6">
          {/* 상단 환영 메시지 */}
          <h1 className="text-2xl font-bold mb-2">안녕하세요, 관리자님</h1>
          <p className="text-gray-500 mb-6">2025년 4월 11일 금요일</p>

          {/* 통계 카드 영역 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-4 rounded-xl shadow">
              신고된 리뷰: <strong>32</strong>
            </div>
            <div className="bg-white p-4 rounded-xl shadow">
              신고된 채팅: <strong>18</strong>
            </div>
            <div className="bg-white p-4 rounded-xl shadow">
              활성 사용자: <strong>2,847명</strong>
            </div>
          </div>

          {/* 차트 박스 영역 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white p-6 h-60 rounded-xl shadow flex items-center justify-center text-gray-400">
              라인 차트 영역
            </div>
            <div className="bg-white p-6 h-60 rounded-xl shadow flex items-center justify-center text-gray-400">
              바 차트 영역
            </div>
          </div>

          {/* 최근 신고 내역 (테이블 자리) */}
          <div className="bg-white p-6 rounded-xl shadow">
            <div className="flex justify-between mb-4">
              <h2 className="text-lg font-semibold">최근 신고 내역</h2>
              <Link href="#" className="text-sm text-blue-500">
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
                <tr className="border-b">
                  <td className="py-2">리뷰</td>
                  <td className="py-2">부적절한 내용 포함</td>
                  <td className="py-2">김철수</td>
                  <td className="py-2">
                    <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded-full text-xs">
                      처리중
                    </span>
                  </td>
                  <td className="py-2">10분 전</td>
                </tr>
                <tr>
                  <td className="py-2">채팅</td>
                  <td className="py-2">스팸 메시지</td>
                  <td className="py-2">이영희</td>
                  <td className="py-2">
                    <span className="bg-gray-100 text-gray-500 px-2 py-1 rounded-full text-xs">
                      완료
                    </span>
                  </td>
                  <td className="py-2">25분 전</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </AdminLayout>
    </AdminProtectedRoute>
  );
}
