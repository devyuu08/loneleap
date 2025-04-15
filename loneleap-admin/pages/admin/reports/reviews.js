// loneleap-admin/pages/admin/reports/reviews.js
import { useEffect, useState } from "react";
import AdminProtectedRoute from "@/components/auth/AdminProtectedRoute";
import AdminLayout from "@/components/layout/AdminLayout";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import ReviewReportTable from "@/components/reports/ReviewReportTable";
import ReviewReportDetail from "@/components/reports/ReviewReportDetail";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";

/**
 * @description 관리자가 사용자들이 신고한 리뷰를 확인하고 처리할 수 있는 페이지
 * @returns {JSX.Element} 리뷰 신고 관리 페이지 컴포넌트
 */

export default function AdminReviewReportsPage() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [lastDoc, setLastDoc] = useState(null);

  const router = useRouter();

  const fetchReports = async (isLoadMore = false) => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return;

    const token = await user.getIdToken();

    const query = new URLSearchParams();
    query.append("limit", 50);
    if (isLoadMore && lastDoc) query.append("lastDoc", lastDoc);

    const res = await fetch(`/api/reviewReports/getReviewReports?${query}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "데이터를 불러오는데 실패했습니다");
    }

    const data = await res.json();
    if (data.length < 50) setHasMore(false); // 다음 페이지 없음
    if (data.length > 0) setLastDoc(data[data.length - 1].id);

    if (isLoadMore) {
      setReports((prev) => [...prev, ...data]);
    } else {
      setReports(data);
    }
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/admin/login");
        return;
      }

      try {
        setError(null);
        setLoading(true);
        await fetchReports();
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLoadMore = async () => {
    setLoadingMore(true);
    try {
      await fetchReports(true);
    } catch (err) {
      console.error("더 불러오기 실패:", err);
    } finally {
      setLoadingMore(false);
    }
  };

  // 렌더링
  if (loading) return <LoadingSpinner text="신고된 리뷰를 불러오는 중..." />;

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
            {error ? (
              <div className="text-red-500 text-center">{error}</div>
            ) : (
              <>
                <ReviewReportTable
                  reports={reports}
                  onSelect={setSelectedReport}
                  selectedReportId={selectedReport?.id}
                />

                {hasMore && (
                  <div className="mt-4 text-center">
                    <button
                      onClick={handleLoadMore}
                      className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
                      disabled={loadingMore}
                    >
                      {loadingMore ? "불러오는 중..." : "더 보기"}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* 우측 */}
          <div className="w-1/2 bg-white p-6 rounded-xl shadow min-h-[300px]">
            <ReviewReportDetail
              report={selectedReport}
              onSuccess={(deletedId) => {
                setReports((prev) => prev.filter((r) => r.id !== deletedId));
                setSelectedReport(null);
              }}
            />
          </div>
        </div>
      </AdminLayout>
    </AdminProtectedRoute>
  );
}
