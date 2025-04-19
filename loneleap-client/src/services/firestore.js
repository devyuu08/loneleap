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

// 일정 생성 함수
export const createItinerary = async (itineraryData) => {
  try {
    // 필수 필드 검증
    if (!itineraryData.userId || !itineraryData.title) {
      throw new Error("필수 정보가 누락되었습니다.");
    }
    const docRef = await addDoc(collection(db, "itineraries"), {
      ...itineraryData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(), // 초기 생성 시에도 updatedAt 필드 추가
    });
    return docRef.id; // 생성된 문서 ID 반환
  } catch (error) {
    console.error("일정 생성 중 오류 발생:", error);
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

    // 문서 존재 여부 확인
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new Error("존재하지 않는 일정입니다.");
    }

    // updatedAt 추가
    const dataToUpdate = {
      ...updatedData,
      updatedAt: serverTimestamp(),
    };

    await updateDoc(docRef, dataToUpdate);
    return true; // 성공 여부 반환
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

export { db };
