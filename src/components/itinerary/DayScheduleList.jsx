import React from "react";
import DayScheduleItem from "@/components/itinerary/DayScheduleItem";
import { ChevronDown } from "lucide-react";

function DayScheduleList({
  days,
  isOwner,
  openDay,
  setOpenDay,
  openFormForDay,
  setOpenFormForDay,
  formData,
  handleFormChange,
  handleFormSubmit,
  handleDeleteSchedule,
}) {
  return (
    <div className="mt-10 space-y-4">
      {days.map((day, index) => (
        <div key={day.day} className="border rounded-xl">
          {/* 헤더 */}
          <button
            onClick={() => setOpenDay(openDay === day.day ? null : day.day)}
            className="w-full flex justify-between items-center px-4 py-3 text-left"
          >
            <h3 className="text-sm sm:text-base font-semibold text-gray-900 flex items-center gap-2">
              <span className="inline-block bg-[#6C8BA4] text-white text-xs px-2 py-1 rounded-md">
                DAY {day.day}
              </span>
              <span className="text-gray-700">· {day.date}</span>
            </h3>
            <ChevronDown
              className={`w-5 h-5 transition-transform ${
                openDay === day.day ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* 아코디언 내용 */}
          {openDay === day.day && (
            <ul className="px-6 pb-4 space-y-3">
              {day.schedules.map((item, idx) => (
                <DayScheduleItem
                  key={item.id || `${day.day}-${idx}`}
                  {...item}
                  onDelete={() =>
                    isOwner && handleDeleteSchedule(index, item.id)
                  }
                />
              ))}
              {/* + 버튼 → 입력 폼 토글 */}
              {isOwner && openFormForDay !== index && (
                <button
                  onClick={() => setOpenFormForDay(index)}
                  className="text-sm text-[#6C8BA4] hover:bg-[#f0f4f8] px-2 py-1 rounded mt-2 transition"
                >
                  + 세부 일정 추가
                </button>
              )}

              {/* 입력 폼 */}
              {isOwner && openFormForDay === index && (
                <li className="mt-3 space-y-2">
                  <div className="flex gap-2">
                    <input
                      name="time"
                      value={formData.time}
                      onChange={handleFormChange}
                      placeholder="시간 (예: 10:00)"
                      className="border px-2 py-1 rounded w-28 text-sm"
                    />
                    <input
                      name="activity"
                      value={formData.activity}
                      onChange={handleFormChange}
                      placeholder="활동"
                      className="border px-2 py-1 rounded flex-1 text-sm"
                    />
                  </div>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleFormChange}
                    placeholder="설명 (선택)"
                    className="border w-full px-2 py-1 rounded text-sm"
                  />
                  <div className="flex gap-2 justify-end mt-1">
                    <button
                      onClick={() => handleFormSubmit(index)}
                      className="bg-gray-800 text-white px-3 py-1 text-sm rounded"
                    >
                      저장
                    </button>
                    <button
                      onClick={() => setOpenFormForDay(null)}
                      className="text-sm text-gray-500"
                    >
                      취소
                    </button>
                  </div>
                </li>
              )}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

export default React.memo(DayScheduleList);
