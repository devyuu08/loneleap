import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/services/firebase";

/**
 * Firebase Storage에 이미지를 업로드하고 URL을 반환합니다.
 * @param {File} image - 업로드할 이미지 파일 객체
 * @param {string} folder - 저장 폴더 경로 (기본: "uploads")
 * @param {string} userUid - 사용자 UID
 * @returns {Promise<string>} 다운로드 가능한 이미지 URL
 * @throws 업로드 실패 또는 파일 조건 미충족 시 에러 발생
 */

export async function uploadImage(image, folder = "uploads", userUid) {
  const maxSizeInBytes = 5 * 1024 * 1024;
  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];

  if (image.size > maxSizeInBytes) {
    throw new Error("이미지 크기는 5MB 이하이어야 합니다.");
  }

  if (!allowedTypes.includes(image.type)) {
    throw new Error("지원되는 이미지 형식은 JPEG, PNG, GIF입니다.");
  }

  const imageRef = ref(
    storage,
    `${folder}/${userUid}/${Date.now()}_${image.name}`
  );

  try {
    const snapshot = await uploadBytes(imageRef, image);
    return await getDownloadURL(snapshot.ref);
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error("이미지 업로드 실패:", error);
    }
    throw new Error("이미지 업로드에 실패했습니다. 다시 시도해주세요.");
  }
}
