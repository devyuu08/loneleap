import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/services/firebase";
import { uploadImage } from "@/utils/uploadImage";

export async function updateReview(id, updatedData) {
  try {
    const docRef = doc(db, "reviews", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error("존재하지 않는 리뷰입니다.");
    }

    // 이미지 처리
    let imageUrl = "";

    if (updatedData.image instanceof File) {
      try {
        imageUrl = await uploadImage(updatedData.image, "reviews");
      } catch (uploadErr) {
        console.error("이미지 업로드 실패:", uploadErr);
        throw new Error("이미지 업로드에 실패했습니다. 다시 시도해주세요.");
      }
    } else if (typeof updatedData.image === "string") {
      // 기존 이미지 URL 유지
      imageUrl = updatedData.image;
    }

    // Firestore에 저장할 데이터 준비
    const dataToUpdate = {
      title: updatedData.title,
      destination: updatedData.destination,
      rating: updatedData.rating,
      interviewAnswers: updatedData.interviewAnswers,
      interviewQuestions: updatedData.interviewQuestions,
      imageUrl,
      updatedAt: serverTimestamp(),
    };

    if (updatedData.type === "standard") {
      dataToUpdate.content = updatedData.content;
    }

    await updateDoc(docRef, dataToUpdate);
    return true;
  } catch (error) {
    console.error("리뷰 수정 중 오류 발생:", error);
    throw error;
  }
}
