import { useQuery } from "@tanstack/react-query";
import { fetchUserStats } from "@/services/user/fetchUserStats";

export const useUserStats = (uid) => {
  return useQuery({
    queryKey: ["userStats", uid],
    queryFn: () => fetchUserStats(uid),
    enabled: !!uid,
    staleTime: 0,
    refetchOnWindowFocus: true,
  });
};
