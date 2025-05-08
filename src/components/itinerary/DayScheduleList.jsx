import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAddScheduleToDay } from "services/queries/itinerary/useAddScheduleToDay";
import DayScheduleItem from "./DayScheduleItem";
import { ChevronDown } from "lucide-react";
import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "services/firebase";
import { useQueryClient } from "@tanstack/react-query";

export default function DayScheduleList({ days = [] }) {
  const [openDay, setOpenDay] = useState(days[0]?.day || null);
  const [openFormForDay, setOpenFormForDay] = useState(null);
  const [formData, setFormData] = useState({
    time: "",
    activity: "",
    description: "",
  });
  const { id: itineraryId } = useParams();
  const { mutate: addSchedule } = useAddScheduleToDay();
  const queryClient = useQueryClient();

  const handleFormChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = (dayIndex) => {
    if (!formData.time || !formData.activity)
      return alert("시간과 활동은 필수입니다.");

    addSchedule({
      itineraryId,
      dayIndex,
      newSchedule: { ...formData },
    });

    setFormData({ time: "", activity: "", description: "" });
    setOpenFormForDay(null);
  };

  const handleDeleteSchedule = async (dayIndex, scheduleId) => {
    const ok = confirm("정말 이 세부 일정을 삭제하시겠습니까?");
    if (!ok) return;

    try {
      const itineraryRef = doc(db, "itineraries", itineraryId);
      const docSnap = await getDoc(itineraryRef);
      const data = docSnap.data();

      const updatedDays = [...data.days];
      updatedDays[dayIndex].schedules = updatedDays[dayIndex].schedules.filter(
        (s) => s.id !== scheduleId
      );

      await updateDoc(itineraryRef, {
        days: updatedDays,
        updatedAt: serverTimestamp(),
      });
      queryClient.invalidateQueries(["itineraryDetail", itineraryId]);

      // 수동으로 리렌더링이 필요하다면 invalidateQueries
    } catch (error) {
      console.error("일정 삭제 실패:", error);
      alert("일정 삭제에 실패했습니다.");
    }
  };

  return (
    <div className="mt-10 space-y-4">
      {days.map((day, index) => (
        <div key={day.day} className="border rounded-xl">
          {/* 헤더 */}
          <button
            onClick={() => setOpenDay(openDay === day.day ? null : day.day)}
            className="w-full flex justify-between items-center px-4 py-3 text-left"
          >
            <h3 className="font-semibold text-gray-800">
              DAY {day.day} · {day.date}
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
                  onDelete={() => handleDeleteSchedule(index, item.id)}
                />
              ))}

              {/* + 버튼 → 입력 폼 토글 */}
              {openFormForDay !== index && (
                <button
                  onClick={() => setOpenFormForDay(index)}
                  className="text-sm text-blue-600 hover:underline mt-2"
                >
                  + 세부 일정 추가
                </button>
              )}

              {/* 입력 폼 */}
              {openFormForDay === index && (
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
