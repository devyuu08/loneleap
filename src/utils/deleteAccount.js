import {
  doc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { deleteUser } from "firebase/auth";
import { auth, db } from "services/firebase";
import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";

/**
 * 공개 프로필 익명화
 * @param {string} uid - 사용자 UID
 */
export const anonymizePublicProfile = async (uid) => {
  const publicRef = doc(db, "users_public", uid);
  await updateDoc(publicRef, {
    displayName: "탈퇴한 사용자",
    photoURL: "/default_profile.png",
  });
};

/**
 * 리뷰 데이터 익명화
 * @param {string} uid - 사용자 UID
 */
export const anonymizeReviews = async (uid) => {
  const reviewsRef = collection(db, "reviews");
  const reviewsQuery = query(reviewsRef, where("userId", "==", uid));
  const querySnapshot = await getDocs(reviewsQuery);

  for (const docSnap of querySnapshot.docs) {
    await updateDoc(docSnap.ref, {
      userId: "anonymous",
      userName: "탈퇴한 사용자",
      userPhoto: "/default_profile.png",
      authorName: "탈퇴한 사용자",
      authorPhotoURL: "/default_profile.png",
      displayName: "탈퇴한 사용자",
      photoURL: "/default_profile.png",
      createdBy: {},
      uid: "anonymous",
    });
  }
};

/**
 * 여행 일정 데이터 익명화
 * @param {string} uid - 사용자 UID
 */
export const anonymizeItineraries = async (uid) => {
  const itinerariesRef = collection(db, "itineraries");
  const itinerariesQuery = query(itinerariesRef, where("userId", "==", uid));
  const querySnapshot = await getDocs(itinerariesQuery);

  for (const docSnap of querySnapshot.docs) {
    await updateDoc(docSnap.ref, {
      userId: "anonymous",
      userName: "탈퇴한 사용자",
      userPhoto: "/default_profile.png",
      displayName: "탈퇴한 사용자",
      photoURL: "/default_profile.png",
      createdBy: {},
      uid: "anonymous",
    });
  }
};

/**
 * 채팅방 데이터 익명화
 * @param {string} uid - 사용자 UID
 */
export const anonymizeChatRooms = async (uid) => {
  const chatRoomsRef = collection(db, "chatRooms");
  const chatRoomsQuery = query(chatRoomsRef, where("createdBy", "==", uid));
  const querySnapshot = await getDocs(chatRoomsQuery);

  for (const docSnap of querySnapshot.docs) {
    const roomData = docSnap.data();

    // 기존 참가자 중 해당 유저만 익명화
    const updatedParticipants = roomData.participants?.map((id) =>
      id === uid ? "anonymous" : id
    );

    await updateDoc(docSnap.ref, {
      createdBy: "anonymous",
      createdByName: "탈퇴한 사용자",
      participants: updatedParticipants,
    });
  }
};

/**
 * 채팅 메시지 익명화
 * @param {string} uid - 사용자 UID
 */
export const anonymizeChatMessages = async (uid) => {
  const chatMessagesRef = collection(db, "chatMessages");
  const chatMessagesQuery = query(
    chatMessagesRef,
    where("senderId", "==", uid)
  );
  const querySnapshot = await getDocs(chatMessagesQuery);

  for (const docSnap of querySnapshot.docs) {
    await updateDoc(docSnap.ref, {
      senderId: "anonymous",
      senderName: "탈퇴한 사용자",
      senderPhotoURL: "/default_profile.png",
    });
  }
};

/**
 * 신고된 채팅 메시지 익명화
 * @param {string} uid - 사용자 UID
 */
export const anonymizeChatReports = async (uid) => {
  const chatReportsRef = collection(db, "chatReports");
  const chatReportsQuery = query(
    chatReportsRef,
    where("reporterId", "==", uid)
  );
  const querySnapshot = await getDocs(chatReportsQuery);

  for (const docSnap of querySnapshot.docs) {
    await updateDoc(docSnap.ref, {
      reporterId: "anonymous",
    });
  }
};

/**
 * 리뷰 신고 데이터 익명화
 * @param {string} uid - 사용자 UID
 */
export const anonymizeReviewReports = async (uid) => {
  const reviewReportsRef = collection(db, "review_reports");
  const reviewReportsQuery = query(
    reviewReportsRef,
    where("reporterId", "==", uid)
  );
  const querySnapshot = await getDocs(reviewReportsQuery);

  for (const docSnap of querySnapshot.docs) {
    await updateDoc(docSnap.ref, {
      reporterId: "anonymous",
    });
  }
};

/**
 * 계정 탈퇴 처리
 * @param {string} currentPassword 현재 비밀번호
 */
export const deleteUserAccount = async (currentPassword) => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("사용자 정보가 없습니다.");
  }

  const credential = EmailAuthProvider.credential(user.email, currentPassword);
  await reauthenticateWithCredential(user, credential);

  await deleteUser(user);
};
