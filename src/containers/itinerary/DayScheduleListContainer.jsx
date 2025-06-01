import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "@/services/firebase";
import { useState } from "react";

import { useAddScheduleToDay } from "@/hooks/itinerary/useAddScheduleToDay";
import DayScheduleList from "@/components/itinerary/DayScheduleList";

export default function DayScheduleListContainer({
  days = [],
  isOwner = false,
}) {
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
    if (!formData.time || !formData.activity) {
      alert("시간과 활동은 필수입니다.");
      return;
    }

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
    } catch (error) {
      console.error("일정 삭제 실패:", error);
      alert("일정 삭제에 실패했습니다.");
    }
  };

  return (
    <DayScheduleList
      days={days}
      isOwner={isOwner}
      openDay={openDay}
      setOpenDay={setOpenDay}
      openFormForDay={openFormForDay}
      setOpenFormForDay={setOpenFormForDay}
      formData={formData}
      handleFormChange={handleFormChange}
      handleFormSubmit={handleFormSubmit}
      handleDeleteSchedule={handleDeleteSchedule}
    />
  );
}
