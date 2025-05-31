import { useEffect } from "react";
import { observeAuth } from "@/services/auth/auth";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "@/store/userSlice";
import { updateUserState } from "@/services/user/updateUserState";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/services/firebase";

export const useUser = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const isLoading = useSelector((state) => state.user.isLoading);

  useEffect(() => {
    const unsubscribe = observeAuth(async (firebaseUser) => {
      if (firebaseUser) {
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

        updateUserState({
          dispatch,
          user: firebaseUser,
          displayName: firebaseUser.displayName || "익명",
          photoURL: firebaseUser.photoURL || "/images/default-profile.png",
          bio,
        });
      } else {
        dispatch(clearUser());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return { user, isLoading };
};
