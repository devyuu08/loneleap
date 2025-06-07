/**
 * 리뷰 문서 데이터를 정제하여 필요한 형태로 반환합니다.
 * @param {firebase.firestore.DocumentSnapshot} doc - Firestore 리뷰 문서
 * @returns {Object} 정제된 리뷰 객체
 */

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
