import { useEffect } from "react";
import { observeAuth } from "@/services/auth/auth";
import { useDispatch, useSelector } from "react-redux";
import { setUser, clearUser } from "@/store/userSlice";

export const useUser = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const isLoading = useSelector((state) => state.user.isLoading);

  useEffect(() => {
    const unsubscribe = observeAuth((firebaseUser) => {
      if (firebaseUser) {
        dispatch(
          setUser({
            displayName: firebaseUser.displayName || "익명",
            photoURL: firebaseUser.photoURL || "/images/default-profile.png",
          })
        );
      } else {
        dispatch(clearUser());
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  return { user, isLoading };
};
