export const extractSafeUser = (user, bio = "") => ({
  uid: user.uid,
  email: user.email,
  displayName: user.displayName || "",
  photoURL: user.photoURL || "",
  bio,
});
