import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "services/firebase";

/**
 * 사용자의 모든 콘텐츠에 새로운 photoURL 반영
 * @param {string} uid
 * @param {string} photoURL
 */
export async function updateUserPhotoInContent(uid, photoURL) {
  const collections = [
    { name: "reviews", path: "createdBy" },
    { name: "itineraries", path: "createdBy" },
    { name: "chatRooms", path: "createdBy" },
    { name: "chatMessages", path: "sender" },
  ];

  await Promise.all(
    collections.map(async ({ name, path }) => {
      const q = query(collection(db, name), where(`${path}.uid`, "==", uid));
      const snap = await getDocs(q);
      return Promise.all(
        snap.docs.map((doc) =>
          updateDoc(doc.ref, {
            [`${path}.photoURL`]: photoURL,
          })
        )
      );
    })
  );
}
