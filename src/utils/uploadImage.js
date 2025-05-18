import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "services/firebase";

/**
 * 이미지를 Firebase Storage에 업로드하고 다운로드 URL 반환
 * @param {File} image - 업로드할 이미지 파일
 * @param {string} folder - 저장할 폴더 이름 (예: 'reviews', 'itineraries')
 * @returns {Promise<string>} - 업로드된 이미지의 다운로드 URL
 */
export const uploadImage = async (image, folder = "uploads", userUid) => {
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
    console.error("이미지 업로드 실패:", error);
    throw new Error("이미지 업로드에 실패했습니다. 다시 시도해주세요.");
  }
};
