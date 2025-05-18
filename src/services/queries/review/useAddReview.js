import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  updateDoc,
  doc,
  increment,
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "services/firebase";
import { uploadImage } from "utils/uploadImage";

/**
 * 리뷰 추가 기능을 제공하는 커스텀 훅
 * @param {Object} options - 훅 옵션
 * @param {Function} options.onSuccessCallback - 성공 시 콜백
 * @param {Function} options.onErrorCallback - 실패 시 콜백
 * @returns {Object} 리뷰 추가 관련 함수와 상태
 */
export default function useAddReview({
  onSuccessCallback = () => {},
  onErrorCallback = () => {},
} = {}) {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const queryClient = useQueryClient();

  const checkAuth = () => {
    if (!user) {
      navigate("/login", { state: { from: "/reviews/create" } });
      throw new Error("로그인이 필요한 서비스입니다.");
    }
  };

  const {
    mutate: addReview,
    isLoading,
    isError,
    error,
  } = useMutation({
    mutationFn: async (review) => {
      checkAuth();

      const {
        title,
        destination,
        content,
        rating,
        image,
        type = "standard",
        interviewAnswers,
        interviewQuestions,
      } = review;

      if (!title?.trim()) throw new Error("제목을 입력해주세요.");
      if (!destination?.trim()) throw new Error("여행지명을 입력해주세요.");
      if (!rating) throw new Error("별점을 입력해주세요.");
      if (type === "standard" && (!content?.trim() || content.length < 100)) {
        throw new Error("내용을 100자 이상 입력해주세요.");
      }

      let imageUrl = "";
      if (image) {
        try {
          imageUrl = await uploadImage(image, "reviews", user.uid);
        } catch (err) {
          throw new Error(err.message);
        }
      }

      const reviewData = {
        title,
        destination,
        rating,
        imageUrl,
        createdBy: {
          uid: user.uid,
          displayName: user.displayName || "익명",
          photoURL: user.photoURL || "",
        },
        createdAt: serverTimestamp(),
        likeCount: 0,
        commentCount: 0,
        type,
      };

      if (type === "standard") {
        reviewData.content = content;
      } else {
        reviewData.interviewAnswers = interviewAnswers;
        reviewData.interviewQuestions = interviewQuestions;
      }

      const docRef = await addDoc(collection(db, "reviews"), reviewData);

      await updateDoc(doc(db, "users_private", user.uid), {
        reviewCount: increment(1),
      });

      return docRef.id;
    },

    onSuccess: (newId) => {
      alert("리뷰가 성공적으로 등록되었습니다!");
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      onSuccessCallback(newId);
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
