import { useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { reportMessage } from "@/services/chat/reportMessage";

export const useReportMessage = () => {
  const user = useSelector((state) => state.user.user);

  return useMutation({
    mutationFn: async ({ messageId, roomId, reason }) => {
      if (!user?.uid) {
        throw new Error("로그인한 사용자만 신고할 수 있습니다.");
      }

      return reportMessage({ messageId, roomId, reason, user });
    },
    onSuccess: () => {
      alert("신고가 성공적으로 접수되었습니다.");
    },
    onError: (error) => {
      console.error("메시지 신고 오류:", error.message);
      alert("신고 중 오류가 발생했습니다.");
    },
  });
};
