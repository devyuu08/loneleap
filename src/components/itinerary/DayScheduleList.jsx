import React from "react";
import DayScheduleItem from "@/components/itinerary/DayScheduleItem";
import { ChevronDown } from "lucide-react";

/**
 * DayScheduleList – 하루 단위의 여행 일정을 아코디언 형태로 출력
 * - 각 DAY별로 열고 닫을 수 있음
 * - 세부 일정은 DayScheduleItem으로 구성
 * - 작성자일 경우 입력 폼을 통해 일정 추가 가능
 */

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
    <section className="mt-10 space-y-4" aria-label="여행 일정 목록">
      {days.map((day, index) => (
        <article key={day.day} className="border rounded-xl">
          {/* 아코디언 헤더 */}
          <button
            onClick={() => setOpenDay(openDay === day.day ? null : day.day)}
            className="w-full flex justify-between items-center px-4 py-3 text-left"
            aria-expanded={openDay === day.day}
            aria-controls={`day-schedule-${day.day}`}
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
              aria-hidden="true"
            />
          </button>

          {/* 아코디언 콘텐츠 */}
          {openDay === day.day && (
            <ul
              className="px-6 pb-4 space-y-3"
              aria-label={`DAY ${day.day} 일정`}
            >
              {/* 기존 일정들 */}
              {day.schedules.map((item, idx) => (
                <DayScheduleItem
                  key={item.id || `${day.day}-${idx}`}
                  {...item}
                  isOwner={isOwner}
                  onDelete={() =>
                    isOwner && handleDeleteSchedule(index, item.id)
                  }
                />
              ))}
              {/* + 일정 추가 버튼 */}
              {isOwner && openFormForDay !== index && (
                <button
                  onClick={() => setOpenFormForDay(index)}
                  className="text-sm text-[#6C8BA4] hover:bg-[#f0f4f8] px-2 py-1 rounded mt-2 transition"
                >
                  + 세부 일정 추가
                </button>
              )}

              {/* 입력 폼 영역 */}
              {isOwner && openFormForDay === index && (
                <li className="mt-3 space-y-2" aria-label="일정 입력 폼">
                  <div className="flex gap-2">
                    <input
                      name="time"
                      value={formData.time}
                      onChange={handleFormChange}
                      placeholder="시간 (예: 10:00)"
                      className="border px-2 py-1 rounded w-28 text-sm"
                      aria-label="시간 입력"
                    />
                    <input
                      name="activity"
                      value={formData.activity}
                      onChange={handleFormChange}
                      placeholder="활동"
                      className="border px-2 py-1 rounded flex-1 text-sm"
                      aria-label="활동 입력"
                    />
                  </div>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleFormChange}
                    placeholder="설명 (선택)"
                    className="border w-full px-2 py-1 rounded text-sm"
                    aria-label="설명 입력"
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
        </article>
      ))}
    </section>
  );
}

export default React.memo(DayScheduleList);
