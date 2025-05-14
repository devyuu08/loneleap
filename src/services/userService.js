import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { setUser } from "store/userSlice";
import { auth, db } from "services/firebase";
import { extractSafeUser } from "utils/extractSafeUser";
import {
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";

export const fetchUserWithProfile = async (firebaseUser, dispatch) => {
  if (!firebaseUser) return;

  const uid = firebaseUser.uid;

  try {
    // 공개 정보
    const publicRef = doc(db, "users_public", uid);
    const publicSnap = await getDoc(publicRef);

    if (!publicSnap.exists()) {
      await setDoc(publicRef, {
        displayName: firebaseUser.displayName || "익명",
        photoURL: firebaseUser.photoURL || "/default_profile.png",
        createdAt: serverTimestamp(),
      });
    }

    const publicData = (await getDoc(publicRef)).data();

    // 비공개 정보
    const privateRef = doc(db, "users_private", uid);
    const privateSnap = await getDoc(privateRef);

    // users_private에 기본 필드가 모두 포함되도록 보장
    if (!privateSnap.exists()) {
      await setDoc(privateRef, {
        bio: "",
        email: firebaseUser.email || "",
        uid,
        role: "user",
        status: "active",
        itineraryCount: 0,
        reviewCount: 0,
        reportedCount: 0,
        createdAt: serverTimestamp(),
      });
    }

    const privateData = (await getDoc(privateRef)).data();

    // 병합 및 Redux 저장
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

/**
 * Firebase에서 비밀번호 변경 처리
 * @param {string} newPassword 새 비밀번호
 * @param {string} currentPassword 기존 비밀번호 (reauthenticate용)
 */
export const changeUserPassword = async (newPassword, currentPassword) => {
  const user = auth.currentUser;

  if (!user || !user.email) {
    throw new Error("사용자 정보를 불러올 수 없습니다.");
  }

  // 인증 정보 생성
  const credential = EmailAuthProvider.credential(user.email, currentPassword);

  // 기존 비밀번호로 재인증
  await reauthenticateWithCredential(user, credential);

  // 새 비밀번호로 변경
  await updatePassword(user, newPassword);
};
