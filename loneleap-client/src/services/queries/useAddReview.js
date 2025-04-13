// src/services/queries/useAddReview.js
import { useMutation } from "@tanstack/react-query";
import { db, storage } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function useAddReview({
  onSuccessCallback = () => {},
  onErrorCallback = () => {},
} = {}) {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  // 사용자 인증 상태 확인
  const checkAuth = () => {
    if (!user) {
      navigate("/login", { state: { from: "/reviews/create" } });
      throw new Error("로그인이 필요한 서비스입니다.");
    }
  };

  const {
    mutate: addReview, // mutate → addReview로 이름 변경
    isLoading, // 외부에서 로딩 상태 사용할 수 있도록 반환
    isError,
    error,
  } = useMutation({
    mutationFn: async ({ title, destination, content, rating, image }) => {
      checkAuth();
      if (!title?.trim()) throw new Error("제목을 입력해주세요.");
      if (!destination?.trim()) throw new Error("여행지를 입력해주세요.");
      if (!content?.trim()) throw new Error("내용을 입력해주세요.");

      let imageUrl = "";

      if (image) {
        const maxSizeInBytes = 5 * 1024 * 1024;
        const allowedTypes = ["image/jpeg", "image/png", "image/gif"];

        if (image.size > maxSizeInBytes) {
          throw new Error("이미지 크기는 5MB 이하이어야 합니다.");
        }
        if (!allowedTypes.includes(image.type)) {
          throw new Error("지원되는 이미지 형식은 JPEG, PNG, GIF입니다.");
        }

        const imageRef = ref(storage, `reviews/${Date.now()}_${image.name}`);
        try {
          const snapshot = await uploadBytes(imageRef, image);
          imageUrl = await getDownloadURL(snapshot.ref);
        } catch (error) {
          console.error("이미지 업로드 중 오류 발생:", error);
          throw new Error("이미지 업로드에 실패했습니다. 다시 시도해 주세요.");
        }
      }

      await addDoc(collection(db, "reviews"), {
        title,
        destination,
        content,
        rating,
        imageUrl,
        authorId: user?.uid || "",
        authorName: user?.displayName || "익명",
        createdAt: serverTimestamp(),
      });
    },
    onSuccess: () => {
      alert("리뷰가 성공적으로 등록되었습니다!");
      navigate("/reviews");
      onSuccessCallback();
    },
    onError: (error) => {
      console.error(error);
      alert(`리뷰 등록 중 오류가 발생했습니다: ${error.message}`);
      onErrorCallback(error);
    },
  });

  return {
    addReview,
    isLoading,
    isError,
    error,
  };
}
