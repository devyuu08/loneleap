// src/services/firestore.js
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
} from "firebase/firestore";

// 일정 생성 함수
export const createItinerary = async (itineraryData) => {
  try {
    const docRef = await addDoc(collection(db, "itineraries"), {
      ...itineraryData,
      createdAt: serverTimestamp(),
    });
    return docRef.id; // 생성된 문서 ID 반환
  } catch (error) {
    console.error("일정 생성 중 오류 발생:", error);
    throw error;
  }
};

// 사용자 일정 목록 조회 함수
export const fetchUserItineraries = async (uid) => {
  try {
    const q = query(collection(db, "itineraries"), where("userId", "==", uid));
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
    const docRef = doc(db, "itineraries", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      };
    } else {
      return null; // 문서가 존재하지 않음
    }
  } catch (error) {
    console.error("일정 상세 조회 오류:", error);
    throw error;
  }
};
