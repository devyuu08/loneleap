import { useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { reportMessage } from "@/services/chat/reportMessage";

export const useReportMessage = () => {
  const user = useSelector((state) => state.user.user);

  return useMutation({
    mutationFn: async ({ messageId, roomId, reason }) => {
      return await reportMessage({ messageId, roomId, reason, user });
    },
  });
};
