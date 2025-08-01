import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { auth } from "@/services/firebase";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { createItineraryWithImage } from "@/services/itinerary/createItineraryWithImage";
import toast from "react-hot-toast";

/**
 * useAddItinerary
 * - 새로운 여행 일정을 등록하는 mutation 훅
 * - 이미지 업로드를 포함한 일정 등록을 수행하며, 사용자 인증 상태 필요
 * - 등록 성공 시 전체 일정, 나의 일정 목록 캐시 무효화
 * - 등록 성공/실패 시 콜백 함수 실행
 */

export function useAddItinerary({
  onSuccessCallback = () => {},
  onErrorCallback = () => {},
} = {}) {
  const user = useSelector((state) => state.user.user);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData) => createItineraryWithImage(formData, user),
    onSuccess: (newId) => {
      toast.success("일정이 성공적으로 등록되었습니다!");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ITINERARIES] });

      const uid = auth.currentUser?.uid;
      if (uid) {
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.MY_ITINERARIES(uid),
        });
      }

      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.REGION_COUNTS] });

      onSuccessCallback(newId);
    },
    onError: (error) => {
      toast.error(`일정 등록 중 오류가 발생했습니다: ${error.message}`);
      onErrorCallback(error);
    },
  });
}
