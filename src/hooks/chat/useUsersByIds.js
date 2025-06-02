import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { getUsersByIds } from "@/services/user/getUsersByIds";

/**
 * 여러 유저의 공개 프로필 정보를 가져오는 훅
 */
export const useUsersByIds = (userIds = []) => {
  const enabled = Array.isArray(userIds) && userIds.length > 0;

  return useQuery({
    queryKey: QUERY_KEYS.USERS_BY_IDS(userIds),
    enabled,
    queryFn: () => getUsersByIds(userIds),
    staleTime: 5 * 60 * 1000,
    select: (data) => {
      return data?.filter(Boolean);
    },
  });
};
