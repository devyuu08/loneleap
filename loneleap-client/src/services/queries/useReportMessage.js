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
      // messageId 형식 검증 (예: Firebase ID는 보통 20자 이상)
      if (typeof messageId !== "string" || messageId.length < 10)
        throw new Error("유효하지 않은 메시지 ID 형식입니다");

      if (!roomId) throw new Error("채팅방 ID가 필요합니다");
      // roomId 형식 검증
      if (typeof roomId !== "string" || roomId.length < 10)
        throw new Error("유효하지 않은 채팅방 ID 형식입니다");

      if (!reason || reason.trim() === "")
        throw new Error("신고 사유를 입력해주세요");
      // 신고 사유 길이 제한
      if (reason.length > 500)
        throw new Error("신고 사유는 500자 이내로 작성해주세요");

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
        // Firebase 오류 코드에 따른 구체적인 메시지 제공
        if (error.code === "permission-denied") {
          throw new Error("권한이 없습니다. 관리자에게 문의하세요.");
        } else if (error.code === "unavailable") {
          throw new Error(
            "서버 연결에 실패했습니다. 네트워크 상태를 확인해주세요."
          );
        } else if (error.code === "unauthenticated") {
          throw new Error("인증이 만료되었습니다. 다시 로그인해주세요.");
        } else if (error.code === "resource-exhausted") {
          throw new Error(
            "요청 한도를 초과했습니다. 잠시 후 다시 시도해주세요."
          );
        } else if (error.code === "cancelled") {
          throw new Error("요청이 취소되었습니다. 다시 시도해주세요.");
        } else {
          throw new Error("메시지 신고에 실패했습니다. 다시 시도해주세요.");
        }
      }
    },
  });
};
