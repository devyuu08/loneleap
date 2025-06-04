import React from "react";
import { Footprints, Trash2 } from "lucide-react";
import PropTypes from "prop-types";

function DayScheduleItem({ time, activity, description, onDelete, isOwner }) {
  return (
    <li className="flex justify-between items-start space-x-4">
      {/* 좌측: 시간 */}
      <div className="min-w-[60px] text-sm text-gray-500 font-semibold">
        {time || "--:--"}
      </div>

      {/* 가운데: 활동 + 설명 */}
      <div className="flex-1">
        <p className="flex items-center gap-2 text-sm font-medium text-gray-900">
          <Footprints className="w-4 h-4 text-black" />
          {activity}
        </p>
        {description && (
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        )}
      </div>

      {/* 우측: 삭제 버튼 (소유자일 때만 표시) */}
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
