export const normalizeReview = (doc) => {
  const data = doc.data();
  return {
    id: doc.id,
    ...data,
    createdAt: data.createdAt?.toDate() || new Date(),
    updatedAt: data.updatedAt?.toDate() || new Date(),
    likesCount: data.likesCount || 0,
    createdBy: {
      uid: data.createdBy?.uid || "",
      displayName: data.createdBy?.displayName || "익명",
      photoURL: data.createdBy?.photoURL || "/images/default-profile.png",
    },
  };
};
