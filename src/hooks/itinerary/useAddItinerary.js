import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { updateDoc, doc, increment } from "firebase/firestore";
import { db } from "services/firebase";
import { createItinerary } from "services/itinerary/createItinerary";
import { uploadImage } from "utils/uploadImage";

/**
 * 일정 생성 훅
 * @param {Object} options
 * @param {Function} options.onSuccessCallback - 생성 성공 시 호출
 * @param {Function} options.onErrorCallback - 생성 실패 시 호출
 */
export const useAddItinerary = ({
  onSuccessCallback = () => {},
  onErrorCallback = () => {},
} = {}) => {
  const user = useSelector((state) => state.user.user);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData) => {
      if (!user) throw new Error("로그인이 필요합니다.");

      let imageUrl = "";

      if (formData.image) {
        try {
          imageUrl = await uploadImage(formData.image, "itineraries");
          console.log(imageUrl);
        } catch (err) {
          throw new Error(err.message);
        }
      }

      const itineraryData = {
        ...formData,
        imageUrl,
        createdBy: {
          uid: user.uid,
          displayName: user.displayName || "익명",
          photoURL: user.photoURL || "",
          userId: user.uid,
        },
      };
      return createItinerary(itineraryData);
    },
    onSuccess: async (newId) => {
      try {
        if (user?.uid) {
          await updateDoc(doc(db, "users_private", user.uid), {
            itineraryCount: increment(1),
          });
        }
      } catch (err) {
        console.warn("itineraryCount 증가 실패:", err);
      }
      alert("일정이 성공적으로 등록되었습니다!");
      queryClient.invalidateQueries({ queryKey: ["itineraries"] });

      onSuccessCallback(newId);
    },
    onError: (error) => {
      console.error(error);
      alert(`일정 등록 중 오류가 발생했습니다: ${error.message}`);
      onErrorCallback(error);
    },
  });
};
