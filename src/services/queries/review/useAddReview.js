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
 * 일정 추가 기능을 제공하는 커스텀 훅
 * @param {Object} options - 훅 옵션
 * @param {Function} options.onSuccessCallback - 성공 시 콜백
 * @param {Function} options.onErrorCallback - 실패 시 콜백
 * @returns {Object} 일정 추가 관련 함수와 상태
 */
export default function useAddItinerary({
  onSuccessCallback = () => {},
  onErrorCallback = () => {},
} = {}) {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const queryClient = useQueryClient();

  const checkAuth = () => {
    if (!user) {
      navigate("/login", { state: { from: "/itinerary/create" } });
      throw new Error("로그인이 필요한 서비스입니다.");
    }
  };

  const {
    mutate: addItinerary,
    isLoading,
    isError,
    error,
  } = useMutation({
    mutationFn: async ({
      title,
      destination,
      description,
      image,
      isPublic = true,
      oneLineIntro = "",
    }) => {
      checkAuth();
      if (!title?.trim()) throw new Error("제목을 입력해주세요.");
      if (!destination?.trim()) throw new Error("여행지를 입력해주세요.");

      let imageUrl = "";

      if (image) {
        try {
          imageUrl = await uploadImage(image, "itineraries");
        } catch (err) {
          throw new Error(err.message);
        }
      }

      await addDoc(collection(db, "itineraries"), {
        title,
        destination,
        description,
        imageUrl,
        isPublic,
        oneLineIntro,
        createdBy: {
          uid: user.uid,
          displayName: user.displayName || "익명",
          photoURL: user.photoURL || "",
        },
        createdAt: serverTimestamp(),
        likeCount: 0,
      });

      await updateDoc(doc(db, "users", user.uid), {
        itineraryCount: increment(1),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["itineraries"] });
      alert("일정이 성공적으로 등록되었습니다!");
      navigate("/itinerary");
      onSuccessCallback();
    },
    onError: (error) => {
      console.error(error);
      alert(`일정 등록 중 오류가 발생했습니다: ${error.message}`);
      onErrorCallback(error);
    },
  });

  return {
    addItinerary,
    isLoading,
    isError,
    error,
  };
}
