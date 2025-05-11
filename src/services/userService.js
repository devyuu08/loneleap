import { doc, getDoc } from "firebase/firestore";
import { setUser } from "store/userSlice";
import { db } from "services/firebase";
import { extractSafeUser } from "utils/extractSafeUser";

export const fetchUserWithProfile = async (firebaseUser, dispatch) => {
  if (!firebaseUser) return;

  const uid = firebaseUser.uid;

  try {
    // 공개 정보
    const publicRef = doc(db, "users_public", uid);
    const publicSnap = await getDoc(publicRef);
    const publicData = publicSnap.exists() ? publicSnap.data() : {};

    // 비공개 정보
    const privateRef = doc(db, "users_private", uid);
    const privateSnap = await getDoc(privateRef);
    const privateData = privateSnap.exists() ? privateSnap.data() : {};

    const bio = privateData.bio || "";
    const displayName =
      publicData.displayName || firebaseUser.displayName || "";
    const photoURL = publicData.photoURL || firebaseUser.photoURL || "";

    const safeUser = extractSafeUser(
      {
        ...firebaseUser,
        displayName,
        photoURL,
      },
      bio
    );

    dispatch(setUser(safeUser));
  } catch (error) {
    console.error("사용자 정보 불러오기 실패:", error);
  }
};
