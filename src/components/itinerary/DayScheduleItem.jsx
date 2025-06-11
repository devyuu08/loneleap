import React from "react";
import { Footprints, Trash2 } from "lucide-react";
import PropTypes from "prop-types";

/**
 * 개별 하루 일정 항목 컴포넌트
 * - 시간, 활동명, 설명 텍스트를 표시
 * - 작성자일 경우 삭제 버튼 활성화
 * - 아이콘과 텍스트를 함께 표시하여 가독성 향상
 */

function DayScheduleItem({ time, activity, description, onDelete, isOwner }) {
  return (
    <li className="flex justify-between items-start space-x-4">
      {/* 일정 시간 */}
      <time
        className="min-w-[60px] text-sm text-gray-500 font-semibold"
        dateTime={time || ""}
      >
        {time || "--:--"}
      </time>

      {/* 활동 내용 + 설명 */}
      <div className="flex-1">
        <p className="flex items-center gap-2 text-sm font-medium text-gray-900">
          <Footprints className="w-4 h-4 text-black" aria-hidden="true" />
          {activity}
        </p>
        {description && (
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        )}
      </div>

      {/* 삭제 버튼 (작성자만) */}
      {isOwner && onDelete && (
        <button
          onClick={onDelete}
          className="text-gray-400 hover:text-red-500 transition"
          aria-label="세부 일정 삭제"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      )}
    </li>
  );
}

DayScheduleItem.propTypes = {
  time: PropTypes.string,
  activity: PropTypes.string,
  description: PropTypes.string,
  onDelete: PropTypes.func,
  isOwner: PropTypes.bool,
};

export default React.memo(DayScheduleItem);
