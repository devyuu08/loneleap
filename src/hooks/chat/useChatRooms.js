import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { fetchChatRooms } from "@/services/chat/fetchChatRooms";

/**
 * useChatRooms
 * - 채팅방 리스트를 조건에 맞게 조회하는 React Query 훅
 * - 정렬 방향, 필터 조건, 페이징 수 설정 가능
 * - 30초마다 polling하며 실시간성 유지
 */

export const useChatRooms = ({
  limitCount = 10,
  orderDirection = "desc",
  filterBy = null,
  enabled = true,
  ...options
} = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.CHAT_ROOMS_FILTERED(
      limitCount,
      orderDirection,
      filterBy
    ),
    queryFn: () =>
      fetchChatRooms({
        limitCount,
        orderDirection,
        filterBy,
      }),
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
    refetchInterval: 30000, // 30초 polling 유지 (실시간성 고려)
    refetchOnWindowFocus: true, // 창에 다시 포커스 시 갱신
    enabled,
    ...options,
  });
};
