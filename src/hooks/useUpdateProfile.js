import { useState } from "react";
import { useDispatch } from "react-redux";

import { updateProfile as updateFirebaseProfile } from "firebase/auth";
import {
  doc,
  setDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
  updateDoc,
  collection,
} from "firebase/firestore";
import { auth, db } from "services/firebase";
import { useUser } from "hooks/useUser"; // 사용자 uid 얻기용 커스텀 훅
import { setUser } from "store/userSlice";

export function useUpdateProfile() {
  const { user } = useUser(); // 현재 로그인 사용자
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateProfile = async ({ displayName, bio }) => {
    if (!user) return;

    setIsLoading(true);
    setError(null);

    try {
      // Firebase Auth 닉네임 업데이트
      await updateFirebaseProfile(auth.currentUser, { displayName });

      const photoURL = auth.currentUser.photoURL || "";

      // 공개 정보 저장
      await setDoc(
        doc(db, "users_public", user.uid),
        {
          displayName,
          photoURL,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );

      // 비공개 정보 저장
      await setDoc(
        doc(db, "users_private", user.uid),
        {
          bio,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );

      // 작성 콘텐츠 업데이트
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

      // Redux 업데이트
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
