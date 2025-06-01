import { eachDayOfInterval, format } from "date-fns";
import { db } from "@/services/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// 일정 생성 함수
export async function createItinerary(itineraryData) {
  try {
    const {
      title,
      location,
      startDate,
      endDate,
      summary,
      imageUrl = "",
      createdBy,
      isPublic = false,
      days = [],
      checklist = { required: [], optional: [] },
    } = itineraryData;

    // 필수 필드 검증
    if (!createdBy?.uid || !title) {
      throw new Error("필수 정보가 누락되었습니다.");
    }

    const generatedDays =
      days.length > 0
        ? days
        : eachDayOfInterval({
            start: new Date(startDate),
            end: new Date(endDate),
          }).map((date, index) => ({
            day: index + 1,
            title: "", // 추후 수정 가능
            date: format(date, "yyyy-MM-dd"),
            schedules: [],
          }));

    const docRef = await addDoc(collection(db, "itineraries"), {
      title,
      location,
      startDate,
      endDate,
      summary,
      imageUrl,
      createdBy,
      userId: createdBy.uid,
      isPublic,
      days: generatedDays,
      checklist,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return docRef.id;
  } catch (error) {
    console.error("일정 생성 중 오류 발생:", error);
    throw error;
  }
}
