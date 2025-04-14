// loneleap-admin/components/reports/ReportStatusBadge.jsx
import PropTypes from "prop-types";

const STATUS = {
  COMPLETED: "처리완료",
};

export default function ReportStatusBadge({ status }) {
  const style =
    status === STATUS.COMPLETED
      ? "bg-green-100 text-green-700"
      : "bg-gray-100 text-gray-700";

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${style}`}>
      {status || ""}
    </span>
  );
}

ReportStatusBadge.propTypes = {
  status: PropTypes.string,
};

ReportStatusBadge.defaultProps = {
  status: "",
};

//props 타입 정의
ReportStatusBadge.propTypes = {
  status: PropTypes.string,
};

//기본값 설정
ReportStatusBadge.defaultProps = {
  status: "",
};
