import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateProfile as updateFirebaseProfile } from "firebase/auth";
import {
  doc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "services/firebase";
import { setUser } from "store/userSlice";
import { useUser } from "hooks/useUser";

export function useUpdateProfile() {
  const { user } = useUser(); // 현재 로그인 사용자
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * 사용자 프로필 정보 업데이트
   * @param {Object} params
   * @param {string} params.displayName - 사용자 이름
   * @param {string} params.bio - 자기소개
   * @param {string} params.photoURL - 새 프로필 이미지 URL
   */
  const updateProfile = async ({ displayName, bio, photoURL }) => {
    if (!user) return;

    setIsLoading(true);
    setError(null);

    try {
      // 1. Firebase Auth 프로필 업데이트
      await updateFirebaseProfile(auth.currentUser, {
        displayName,
        photoURL,
      });

      // 2. Firestore 공개 프로필 정보 업데이트
      await setDoc(
        doc(db, "users_public", user.uid),
        {
          displayName,
          photoURL,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );

      // 3. Firestore 비공개 프로필 정보 업데이트
      await setDoc(
        doc(db, "users_private", user.uid),
        {
          bio,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );

      // 4. 작성 콘텐츠에 반영 (리뷰, 일정, 채팅 등)
      const collections = [
        { name: "reviews", path: "createdBy" },
        { name: "itineraries", path: "createdBy" },
        { name: "chatRooms", path: "createdBy" },
        { name: "chatMessages", path: "sender" },
      ];

      await Promise.all(
        collections.map(async ({ name, path }) => {
          const q = query(
            collection(db, name),
            where(`${path}.uid`, "==", user.uid)
          );
          const snap = await getDocs(q);
          return Promise.all(
            snap.docs.map((doc) =>
              updateDoc(doc.ref, {
                [`${path}.displayName`]: displayName,
                [`${path}.photoURL`]: photoURL,
              })
            )
          );
        })
      );

      // 5. Redux 상태 업데이트
      dispatch(
        setUser({
          uid: user.uid,
          email: user.email,
          displayName,
          photoURL,
          bio,
        })
      );
    } catch (err) {
      console.error("프로필 업데이트 실패:", err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    updateProfile,
    isLoading,
    error,
  };
}
