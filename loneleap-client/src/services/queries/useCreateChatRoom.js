// src/services/queries/useCreateChatRoom.js
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useMutation } from "@tanstack/react-query";

/**
+ * 새로운 채팅방을 생성하는 커스텀 훅
+ * @returns {Object} useMutation 객체
+ * @example
+ * const { mutateAsync, isLoading, error } = useCreateChatRoom();
+ * 
+ * const handleSubmit = async (data) => {
+ *   try {
+ *     const chatRoomId = await mutateAsync({ 
+ *       title: data.title, 
+ *       description: data.description, 
+ *       uid: currentUser.uid 
+ *     });
+ *     // 성공 처리
+ *   } catch (error) {
+ *     // 오류 처리
+ *   }
+ * };
+ */

export const useCreateChatRoom = () => {
  return useMutation({
    mutationFn: async ({ title, description = "", uid }) => {
      if (!uid) {
        throw new Error("인증된 사용자만 채팅방을 생성할 수 있습니다");
      }
      // 입력 매개변수 유효성 검사
      if (!title) {
        throw new Error("채팅방 제목은 필수입니다");
      }

      try {
        const docRef = await addDoc(collection(db, "chatRooms"), {
          name: title,
          description,
          createdAt: serverTimestamp(),
          createdBy: uid,
        });
        return docRef.id;
      } catch (error) {
        console.error(
          `채팅방 '${title}' 생성 중 오류 발생:`,
          error.code,
          error.message
        );
        throw error;
      }
    },
  });
};
