import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "services/firebase";

/**
 * 사용자가 생성한 콘텐츠에 프로필 정보(displayName, photoURL) 반영
 * @param {Object} params
 * @param {string} params.uid - 사용자 UID
 * @param {string} params.displayName - 사용자 이름
 * @param {string} [params.photoURL] - 프로필 이미지 URL (선택)
 */
export async function updateUserContentProfile({ uid, displayName, photoURL }) {
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

      await Promise.all(
        snap.docs.map((docSnap) =>
          updateDoc(docSnap.ref, {
            [`${path}.displayName`]: displayName,
            ...(photoURL !== undefined && {
              [`${path}.photoURL`]: photoURL,
            }),
          })
        )
      );
    })
  );
}
