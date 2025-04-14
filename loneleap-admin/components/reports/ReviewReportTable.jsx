// loneleap-admin/components/reports/ReviewReportTable.jsx

import ReportStatusBadge from "./ReportStatusBadge";
import { format } from "date-fns";

export default function ReviewReportTable({ reports, onSelect }) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-[800px] table-auto text-sm">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="px-4 py-2 text-left whitespace-nowrap">리뷰 제목</th>
            <th className="px-4 py-2 text-left whitespace-nowrap">신고 사유</th>
            <th className="px-4 py-2 text-left whitespace-nowrap">작성자</th>
            <th className="px-4 py-2 text-left whitespace-nowrap">신고일자</th>
            <th className="px-4 py-2 text-left whitespace-nowrap">상태</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr
              key={report.id}
              className="border-b hover:bg-gray-50 cursor-pointer"
              onClick={() => onSelect(report)}
            >
              <td className="px-4 py-2 whitespace-nowrap">
                <div className="max-w-[240px] truncate">
                  {report.review?.content || "삭제된 리뷰"}
                </div>
              </td>
              <td className="px-4 py-2 whitespace-nowrap">
                <div className="max-w-[160px] truncate">{report.reason}</div>
              </td>
              <td className="px-4 py-2 whitespace-nowrap">
                {report.review?.userId || "-"}
              </td>
              <td className="px-4 py-2 whitespace-nowrap">
                {report.reportedAt?.toDate
                  ? format(report.reportedAt.toDate(), "yyyy.MM.dd")
                  : "날짜 없음"}
              </td>
              <td className="px-4 py-2">
                <ReportStatusBadge status="미처리" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
