import { useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { reportMessage } from "@/services/chat/reportMessage";

/**
 * useReportMessage
 * - 채팅 메시지를 신고하는 mutation 훅
 * - 사용자 인증 여부 확인 후 신고 처리 요청
 */

export function useReportMessage() {
  const user = useSelector((state) => state.user.user);

  return useMutation({
    mutationFn: async ({ messageId, roomId, reason }) => {
      if (!user?.uid) {
        throw new Error("로그인한 사용자만 신고할 수 있습니다.");
      }
      return reportMessage({ messageId, roomId, reason, user });
    },
  });
}
