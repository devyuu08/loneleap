import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addScheduleToDay } from "@/services/itinerary/addScheduleToDay";
import { QUERY_KEYS } from "@/constants/queryKeys";

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
