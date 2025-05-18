import { useQuery } from "@tanstack/react-query";
import { db } from "services/firebase";
import { getDoc, doc } from "firebase/firestore";

/**
 * 여러 유저의 공개 프로필 정보를 가져오는 훅
 * - users_public 컬렉션 기준
 */
export const useUsersByIds = (userIds = []) => {
  return useQuery({
    queryKey: ["usersByIds", userIds],
    enabled: Array.isArray(userIds) && userIds.length > 0,
    queryFn: async () => {
      const userDocs = await Promise.all(
        userIds.map(async (uid) => {
          const docRef = doc(db, "users_public", uid);
          const docSnap = await getDoc(docRef);
          return docSnap.exists()
            ? { uid: docSnap.id, ...docSnap.data() }
            : null;
        })
      );

      return userDocs.filter(Boolean); // null 제거
    },
  });
};
