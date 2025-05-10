import { eachDayOfInterval, format } from "date-fns";
import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  query,
  where,
  doc,
  serverTimestamp,
  updateDoc,
  deleteDoc,
  orderBy,
  limit,
} from "firebase/firestore";
import { uploadImage } from "utils/uploadImage";

// 일정 생성 함수
export const createItinerary = async (itineraryData) => {
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
};

// 특정 일자의 일정(schedules)에 새로운 일정 하나 추가
export const addScheduleToDay = async (itineraryId, dayIndex, newSchedule) => {
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
};

// 사용자 일정 목록 조회 함수
export const fetchUserItineraries = async (uid, maxResults = 20) => {
  try {
    const q = query(
      collection(db, "itineraries"),
      where("userId", "==", uid),
      orderBy("createdAt", "desc"), // 최신 일정부터 정렬
      limit(maxResults) // 한 번에 가져올 최대 문서 수 제한
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("일정 목록 조회 중 오류 발생:", error);
    throw error;
  }
};

// 특정 일정 상세 조회 함수
export const fetchItineraryById = async (id) => {
  try {
    // ID 유효성 검사
    if (!id) {
      throw new Error("유효하지 않은 일정 ID입니다.");
    }

    const docRef = doc(db, "itineraries", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();

      // 타임스탬프 필드를 JavaScript Date로 변환하거나 처리
      const formattedData = {
        ...data,
        createdAt: data.createdAt ? data.createdAt.toDate() : null,
        updatedAt: data.updatedAt ? data.updatedAt.toDate() : null,
      };
      return {
        id: docSnap.id,
        ...formattedData,
      };
    } else {
      return null; // 문서가 존재하지 않음
    }
  } catch (error) {
    console.error("일정 상세 조회 오류:", error);
    throw error;
  }
};

// 일정 수정 함수
export const updateItinerary = async (id, updatedData) => {
  try {
    const docRef = doc(db, "itineraries", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error("존재하지 않는 일정입니다.");
    }

    // 이미지 처리
    let imageUrl = updatedData.imageUrl || "";

    // File 객체일 때만 업로드
    if (updatedData.image instanceof File) {
      try {
        imageUrl = await uploadImage(updatedData.image, "itineraries");
      } catch (uploadErr) {
        console.error("이미지 업로드 실패:", uploadErr);
        throw new Error("이미지 업로드에 실패했습니다. 다시 시도해주세요.");
      }
    } else if (typeof updatedData.image === "string") {
      // 문자열일 경우 그대로 사용 (기존 이미지 URL 유지)
      imageUrl = updatedData.image;
    }

    // Firestore에 저장할 데이터 준비
    const dataToUpdate = {
      ...updatedData,
      imageUrl,
      updatedAt: serverTimestamp(),
    };

    delete dataToUpdate.image; // File이나 string 모두 제거

    await updateDoc(docRef, dataToUpdate);
    return true;
  } catch (error) {
    console.error("일정 수정 중 오류 발생:", error);
    throw error;
  }
};

// 일정 삭제 함수
export const deleteItinerary = async (id) => {
  try {
    // 문서 존재 확인
    const docRef = doc(db, "itineraries", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error("존재하지 않는 일정입니다.");
    }
    // 삭제 실행
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error("일정 삭제 중 오류:", error);
    throw error;
  }
};

export const updateChecklist = async (itineraryId, checklist) => {
  const docRef = doc(db, "itineraries", itineraryId);
  await updateDoc(docRef, {
    checklist,
    updatedAt: serverTimestamp(),
  });
};
