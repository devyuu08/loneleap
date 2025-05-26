import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "services/firebase";

/**
 * Firebase Storage에 사용자 프로필 이미지를 업로드하고 URL 반환
 * @param {File} file - 업로드할 이미지 파일
 * @param {string} uid - 사용자 UID
 * @returns {Promise<string>} - 업로드된 이미지의 다운로드 URL
 */
export async function uploadUserProfileImage(file, uid) {
  if (!file || !uid) throw new Error("파일 또는 사용자 ID가 없습니다.");

  const storageRef = ref(storage, `profile_images/${uid}`);
  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
}
