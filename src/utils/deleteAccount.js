import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "@/services/firebase";

/**
 * 공개 사용자 프로필을 익명화 처리합니다.
 * @param {string} uid - 사용자 UID
 */

export const anonymizePublicProfile = async (uid) => {
  const publicRef = doc(db, "users_public", uid);
  await updateDoc(publicRef, {
    displayName: "탈퇴한 사용자",
    photoURL: "/images/default-profile.png",
  });
};

/**
 * 사용자의 리뷰, 일정, 채팅방, 메시지 등을 익명화 처리합니다.
 * @param {string} uid - 사용자 UID
 */
export const anonymizeUserContent = async (uid) => {
  const reviewQ = query(
    collection(db, "reviews"),
    where("createdBy.uid", "==", uid)
  );
  const itineraryQ = query(
    collection(db, "itineraries"),
    where("createdBy.uid", "==", uid)
  );
  const chatRoomQ = query(
    collection(db, "chatRooms"),
    where("createdBy.uid", "==", uid)
  );
  const messageQ = query(
    collection(db, "chatMessages"),
    where("sender.uid", "==", uid)
  );

  const anonymizeDocs = async (querySnapshot, path) => {
    const promises = querySnapshot.docs.map((doc) =>
      updateDoc(doc.ref, {
        [`${path}.displayName`]: "탈퇴한 사용자",
        [`${path}.photoURL`]: "",
      })
    );
    await Promise.all(promises);
  };

  try {
    const [reviews, itineraries, chatRooms, messages] = await Promise.all([
      getDocs(reviewQ),
      getDocs(itineraryQ),
      getDocs(chatRoomQ),
      getDocs(messageQ),
    ]);

    await anonymizeDocs(reviews, "createdBy");
    await anonymizeDocs(itineraries, "createdBy");
    await anonymizeDocs(chatRooms, "createdBy");
    await anonymizeDocs(messages, "sender");
  } catch (err) {
    throw err;
  }
};
