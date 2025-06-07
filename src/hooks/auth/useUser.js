import { useEffect } from "react";
import { observeAuth } from "@/services/auth/auth";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "@/store/userSlice";
import { updateUserState } from "@/services/user/updateUserState";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/services/firebase";

// 현재 로그인된 사용자 정보를 반환하는 커스텀 훅
export const useUser = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const isLoading = useSelector((state) => state.user.isLoading);

  useEffect(() => {
    // Firebase 인증 상태 변화 감지
    const unsubscribe = observeAuth(async (firebaseUser) => {
      if (firebaseUser) {
        // 공개 프로필 정보(bio) 조회
        let bio = "";
        try {
          const publicDoc = await getDoc(
            doc(db, "users_public", firebaseUser.uid)
          );
          if (publicDoc.exists()) {
            bio = publicDoc.data().bio || "";
          }
        } catch (err) {
          console.warn("bio 가져오기 실패:", err);
        }

        // Redux 상태에 사용자 정보 저장
        updateUserState({
          dispatch,
          user: firebaseUser,
          displayName: firebaseUser.displayName || "익명",
          photoURL: firebaseUser.photoURL || "/images/default-profile.png",
          bio,
        });
      } else {
        // 로그아웃 시 사용자 상태 초기화
        dispatch(clearUser());
      }
    });

    return () => unsubscribe(); // cleanup 함수 등록
  }, [dispatch]);

  return { user, isLoading };
};
