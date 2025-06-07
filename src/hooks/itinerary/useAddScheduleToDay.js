import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addScheduleToDay } from "@/services/itinerary/addScheduleToDay";
import { QUERY_KEYS } from "@/constants/queryKeys";

/**
 * useAddScheduleToDay
 * - 특정 일정의 하루(dayIndex)에 세부 일정을 추가하는 mutation 훅
 * - 일정 상세 페이지에서 사용되며, 추가 후 상세 캐시 무효화
 */

export function useAddScheduleToDay() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ itineraryId, dayIndex, newSchedule }) =>
      addScheduleToDay(itineraryId, dayIndex, newSchedule),

    onSuccess: (_, { itineraryId }) => {
      // 일정 상세 캐시 무효화
      queryClient.invalidateQueries(QUERY_KEYS.ITINERARY_DETAIL(itineraryId));
    },

    onError: (error) => {
      console.error("세부 일정 추가 실패:", error);
      alert("세부 일정을 추가하는 도중 오류가 발생했습니다.");
    },
  });
}
