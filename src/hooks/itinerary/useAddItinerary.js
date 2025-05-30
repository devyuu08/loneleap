import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { createItineraryWithImage } from "@/services/itinerary/createItineraryWithImage";

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
    mutationFn: (formData) => createItineraryWithImage(formData, user),
    onSuccess: (newId) => {
      alert("일정이 성공적으로 등록되었습니다!");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ITINERARIES] });
      onSuccessCallback(newId);
    },
    onError: (error) => {
      console.error(error);
      alert(`일정 등록 중 오류가 발생했습니다: ${error.message}`);
      onErrorCallback(error);
    },
  });
};
