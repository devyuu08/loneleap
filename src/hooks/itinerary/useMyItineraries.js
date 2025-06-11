import { useQuery } from "@tanstack/react-query";
import { auth } from "@/services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { fetchMyItineraries } from "@/services/itinerary/fetchMyItineraries";

/**
 * useMyItineraries
 * - 현재 로그인한 사용자의 여행 일정 목록을 가져오는 query 훅
 * - 로그인 상태일 때만 작동하며, 조건부 fetch 가능
 * - 마이페이지 또는 일정 관리 페이지에서 사용
 */

export function useMyItineraries(options = {}) {
  const [user, loading] = useAuthState(auth);

  return useQuery({
    queryKey: QUERY_KEYS.MY_ITINERARIES(user?.uid),
    queryFn: () => fetchMyItineraries(user.uid),
    staleTime: 5 * 60 * 1000,
    enabled: !loading && !!user?.uid && options.enabled !== false,
    ...options,
  });
}
