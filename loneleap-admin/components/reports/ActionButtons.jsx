// loneleap-admin/components/reports/ActionButtons.jsx
import { useState } from "react";

export default function ActionButtons({ report }) {
  const [deleting, setDeleting] = useState(false);
  const { reviewId } = report;

  const handleDelete = async () => {
    // console.log("삭제 버튼 클릭됨!");

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
        window.location.reload(); // or 상태 업데이트
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

  return (
    <div className="flex gap-2 mt-4">
      <button
        onClick={handleDelete}
        className="px-4 py-2 text-sm rounded bg-red-500 hover:bg-red-600 text-white"
        disabled={deleting} // 상태 따라 true/false
      >
        {deleting ? "삭제 중..." : "리뷰 삭제"}
      </button>
      <button
        className="px-4 py-2 text-sm rounded bg-gray-300 hover:bg-gray-400 text-gray-800"
        disabled
      >
        신고 무시
      </button>
    </div>
  );
}
