import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { getUsersByIds } from "@/services/user/getUsersByIds";

/**
 * useUsersByIds
 * - 전달받은 사용자 ID 배열을 기준으로 Firestore에서 사용자 정보 일괄 조회
 * - 유효한 ID가 존재할 때만 실행되며, null/undefined 데이터는 필터링됨
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
