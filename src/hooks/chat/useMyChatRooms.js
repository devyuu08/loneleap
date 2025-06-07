import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/queryKeys";
import { fetchMyChatRooms } from "@/services/chat/fetchMyChatRooms";
import { useSelector } from "react-redux";

/**
 * useMyChatRooms
 * - 현재 로그인한 사용자가 참여한 채팅방 목록 조회
 * - user.uid를 기준으로 필터링된 쿼리 사용
 * - 30초 polling + 포커스 시 자동 갱신
 */

export const useMyChatRooms = (options = {}) => {
  const user = useSelector((state) => state.user.user);

  return useQuery({
    queryKey: QUERY_KEYS.MY_CHAT_ROOMS(user?.uid),
    queryFn: () => fetchMyChatRooms(user.uid),
    enabled: !!user?.uid && options.enabled !== false,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
    refetchInterval: 30000,
    ...options,
  });
};
