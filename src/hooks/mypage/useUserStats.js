import { useQuery } from "@tanstack/react-query";
import { fetchUserStats } from "@/services/user/fetchUserStats";
import { QUERY_KEYS } from "@/constants/queryKeys";

export const useUserStats = (uid) => {
  return useQuery({
    queryKey: QUERY_KEYS.USER_STATS(uid),
    queryFn: () => fetchUserStats(uid),
    enabled: !!uid,
    staleTime: 0,
    refetchOnWindowFocus: true,
  });
};
