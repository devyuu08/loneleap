import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { setUser } from "@/store/userSlice";
import { db } from "@/services/firebase";
import { extractSafeUser } from "@/utils/extractSafeUser";

/**
 * Firebase에서 public + private 사용자 정보 병합 후 Redux 저장
 * @param {User} firebaseUser
 * @param {Dispatch} dispatch
 */
export async function fetchUserWithProfile(firebaseUser, dispatch) {
  if (!firebaseUser) return;

  const uid = firebaseUser.uid;

  try {
    // 공개 정보 (없으면 초기 생성)
    const publicRef = doc(db, "users_public", uid);
    const publicSnap = await getDoc(publicRef);

    if (!publicSnap.exists()) {
      await setDoc(publicRef, {
        displayName: firebaseUser.displayName || "익명",
        photoURL: firebaseUser.photoURL || "/images/default-profile.png",
        createdAt: serverTimestamp(),
      });
    }

    const publicData = (await getDoc(publicRef)).data();

    // 비공개 정보 (없으면 초기 생성)
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
      { ...firebaseUser, displayName, photoURL },
      bio
    );

    dispatch(setUser(safeUser));
  } catch (error) {
    console.error("사용자 정보 불러오기 실패:", error);
  }
}
