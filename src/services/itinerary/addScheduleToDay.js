import { db } from "@/services/firebase";
import { getDoc, doc, serverTimestamp, updateDoc } from "firebase/firestore";

/**
 * 일정의 특정 날짜에 새로운 세부 일정을 추가
 *
 * @param {string} itineraryId - 대상 일정의 ID
 * @param {number} dayIndex - 세부 일정을 추가할 날짜의 인덱스 (0부터 시작)
 * @param {object} newSchedule - 추가할 일정 객체
 * @returns {Promise<boolean>} - 성공 여부
 * @throws {Error} - 일정이 존재하지 않거나 dayIndex가 유효하지 않을 경우
 */

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
    if (import.meta.env.DEV) {
      console.warn("세부 일정 추가 중 오류:", error);
    }
    throw error;
  }
}
