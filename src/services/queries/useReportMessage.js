import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";

/**
 * 채팅 메시지를 신고하기 위한 커스텀 훅
 *
 * @returns {Object} useMutation 객체
 * @property {Function} mutate - 메시지 신고를 실행하는 함수
 * @property {Function} mutateAsync - 비동기적으로 메시지 신고를 실행하는 함수
 * @property {boolean} isLoading - 신고 처리 중인지 여부
 * @property {boolean} isError - 신고 처리 중 오류가 발생했는지 여부
 * @property {Object} error - 발생한 오류 객체
 * @property {boolean} isSuccess - 신고가 성공적으로 완료되었는지 여부
 */

export const useReportMessage = () => {
  const user = useSelector((state) => state.user.user);

  /**
   * @typedef {Object} ReportParams
   * @property {string} messageId - 신고할 메시지의 ID
   * @property {string} roomId - 메시지가 있는 채팅방의 ID
   * @property {string} reason - 신고 사유
   */

  return useMutation({
    /**
+     * 메시지를 신고하는 함수
+     * 
+     * @param {ReportParams} params - 신고에 필요한 매개변수
+     * @throws {Error} 사용자가 로그인하지 않았거나 Firestore 오류 발생 시
+     */
    mutationFn: async ({ messageId, roomId, reason }) => {
      if (!user) throw new Error("로그인 정보가 없습니다");
      // 입력 매개변수 검증
      if (!messageId) throw new Error("메시지 ID가 필요합니다");
      if (!roomId) throw new Error("채팅방 ID가 필요합니다");
      if (!reason || reason.trim() === "")
        throw new Error("신고 사유를 입력해주세요");

      try {
        await addDoc(collection(db, "chatReports"), {
          messageId,
          roomId,
          reporterId: user.uid,
          reason,
          reportedAt: serverTimestamp(),
        });
      } catch (error) {
        console.error("메시지 신고 중 오류 발생:", error);
        throw new Error("메시지 신고에 실패했습니다. 다시 시도해주세요.");
      }
    },
  });
};
