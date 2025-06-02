import { useQuery } from "@tanstack/react-query";
import { fetchUserStats } from "@/services/user/fetchUserStats";
import { QUERY_KEYS } from "@/constants/queryKeys";

export const useUserStats = (uid, options = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.USER_STATS(uid),
    queryFn: () => fetchUserStats(uid),
    enabled: !!uid && options.enabled !== false,
    staleTime: 60 * 1000, // 1분 동안 fresh 상태 유지
    cacheTime: 5 * 60 * 1000, // 5분 간 메모리 캐시 유지
    refetchOnWindowFocus: false,
    ...options,
  });
};
