import { useState } from "react";
import { useDispatch } from "react-redux";

import { updateProfile as updateFirebaseProfile } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
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
      // 1. Firebase Auth 닉네임 업데이트
      await updateFirebaseProfile(auth.currentUser, { displayName });

      // 2. Firestore bio 저장
      const userRef = doc(db, "users", user.uid);
      await setDoc(
        userRef,
        {
          displayName,
          bio,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );
      dispatch(
        setUser({
          uid: user.uid,
          email: user.email,
          displayName,
          photoURL: user.photoURL || "",
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
