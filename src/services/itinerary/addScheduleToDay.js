import { db } from "services/firebase";
import { getDoc, doc, serverTimestamp, updateDoc } from "firebase/firestore";

// 특정 일자의 일정(schedules)에 새로운 일정 하나 추가
export async function addScheduleToDay(itineraryId, dayIndex, newSchedule) {
  try {
    const itineraryRef = doc(db, "itineraries", itineraryId);
    const docSnap = await getDoc(itineraryRef);

    if (!docSnap.exists()) {
      throw new Error("존재하지 않는 일정입니다.");
    }

    const data = docSnap.data();
    const updatedDays = [...(data.days || [])];

    if (!updatedDays[dayIndex]) {
      throw new Error(`DAY ${dayIndex + 1}가 존재하지 않습니다.`);
    }

    // 새로운 세부 일정 추가
    updatedDays[dayIndex].schedules.push({
      ...newSchedule,
      id: Date.now().toString(), // 간단한 고유 ID 생성
    });

    await updateDoc(itineraryRef, {
      days: updatedDays,
      updatedAt: serverTimestamp(),
    });

    return true;
  } catch (error) {
    console.error("세부 일정 추가 중 오류 발생:", error);
    throw error;
  }
}
