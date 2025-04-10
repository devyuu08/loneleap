import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";

export const useReportMessage = () => {
  const user = useSelector((state) => state.user.user);

  return useMutation({
    mutationFn: async ({ messageId, roomId, reason }) => {
      if (!user) throw new Error("로그인 정보가 없습니다");

      await addDoc(collection(db, "reports/chats"), {
        messageId,
        roomId,
        reporterId: user.uid,
        reason,
        reportedAt: serverTimestamp(),
      });
    },
  });
};
