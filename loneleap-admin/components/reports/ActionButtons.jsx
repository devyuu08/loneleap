// loneleap-admin/components/reports/ActionButtons.jsx
import { useState } from "react";
import LoadingSpinner from "../common/LoadingSpinner";

export default function ActionButtons({ report }) {
  const [deleting, setDeleting] = useState(false);
  const [dismissing, setDismissing] = useState(false);
  const { reviewId, id: reportId } = report;

  const handleDelete = async () => {
    const confirm = window.confirm("정말 해당 리뷰를 삭제하시겠습니까?");
    if (!confirm) return;
    setDeleting(true);
    try {
      const res = await fetch("/api/admin/deleteReviewWithReports", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reviewId }),
      });
      const result = await res.json();
      if (res.ok) {
        alert("리뷰와 신고가 삭제되었습니다.");
        // 성공 후 상태 업데이트 함수 호출
        onSuccess && onSuccess();
      } else {
        alert("삭제 실패: " + result.error);
      }
    } catch (err) {
      console.error("삭제 오류:", err);
      alert("삭제 중 오류가 발생했습니다.");
    } finally {
      setDeleting(false);
    }
  };

  const handleDismiss = async () => {
    const confirm = window.confirm("해당 신고를 무시하시겠습니까?");
    if (!confirm) return;
    setDismissing(true);
    try {
      const res = await fetch("/api/admin/dismissReport", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reportId }),
      });
      const result = await res.json();
      if (res.ok) {
        alert("신고가 삭제되었습니다.");
        // 성공 후 상태 업데이트 함수 호출
        onSuccess && onSuccess();
      } else {
        alert("삭제 실패: " + result.error);
      }
    } catch (err) {
      console.error("신고 삭제 오류:", err);
      alert("삭제 중 오류가 발생했습니다.");
    } finally {
      setDismissing(false);
    }
  };

  return (
    <div className="flex gap-2 mt-4">
      <button
        onClick={handleDelete}
        className="px-4 py-2 text-sm rounded bg-red-500 hover:bg-red-600 text-white"
        disabled={deleting} // 상태 따라 true/false
      >
        {deleting ? (
          <>
            <LoadingSpinner size="sm" color="white" /> 삭제 중...
          </>
        ) : (
          "리뷰 삭제"
        )}
      </button>
      <button
        onClick={handleDismiss}
        className="px-4 py-2 text-sm rounded bg-gray-300 hover:bg-gray-400 text-gray-800"
        disabled={dismissing}
      >
        {dismissing ? (
          <>
            <LoadingSpinner size="sm" color="gray" /> 무시중...
          </>
        ) : (
          "신고 무시"
        )}
      </button>
    </div>
  );
}
