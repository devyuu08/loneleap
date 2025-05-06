import { doc, getDoc } from "firebase/firestore";
import { setUser } from "store/userSlice";
import { db } from "services/firebase";

export const fetchUserWithProfile = async (firebaseUser, dispatch) => {
  if (!firebaseUser) return;

  const userDocRef = doc(db, "users", firebaseUser.uid);
  const userDoc = await getDoc(userDocRef);

  const bio = userDoc.exists() ? userDoc.data().bio || "" : "";

  dispatch(
    setUser({
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      displayName: firebaseUser.displayName,
      photoURL: firebaseUser.photoURL,
      bio,
    })
  );
};
