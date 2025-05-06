import { doc, getDoc } from "firebase/firestore";
import { setUser } from "store/userSlice";
import { db } from "services/firebase";
import { extractSafeUser } from "utils/extractSafeUser";

export const fetchUserWithProfile = async (firebaseUser, dispatch) => {
  if (!firebaseUser) return;

  const userDocRef = doc(db, "users", firebaseUser.uid);
  const userDoc = await getDoc(userDocRef);

  const bio = userDoc.exists() ? userDoc.data().bio || "" : "";

  const safeUser = extractSafeUser(firebaseUser, bio);
  dispatch(setUser(safeUser));
};
