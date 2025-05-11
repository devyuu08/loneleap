import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";
import { useMutation, useQueryClient } from "@tanstack/react-query";

/**
 * 새로운 채팅방을 생성하는 커스텀 훅
 * @returns {Object} useMutation 객체
 * @example
 * const { mutateAsync, isLoading, error } = useCreateChatRoom();
 *
 * const handleSubmit = async (data) => {
 *   try {
 *     const chatRoomId = await mutateAsync({
 *       title: data.title,
 *       description: data.description,
 *       uid: currentUser.uid
 *     });
 *     // 성공 처리
 *   } catch (error) {
 *     // 오류 처리
 *   }
 * };
 */

export const useCreateChatRoom = () => {
  const queryClient = useQueryClient(); // 쿼리 클라이언트 접근

  return useMutation({
    mutationFn: async ({
      title,
      description = "",
      category,
      uid,
      userName,
    }) => {
      if (!uid) {
        throw new Error("인증된 사용자만 채팅방을 생성할 수 있습니다");
      }
      if (!title) {
        throw new Error("채팅방 제목은 필수입니다");
      }

      const docRef = await addDoc(collection(db, "chatRooms"), {
        name: title,
        description,
        category,
        createdAt: serverTimestamp(),
        createdBy: uid,
        createdByName: userName,
        participants: [uid],
        isActive: true,
        lastActivity: serverTimestamp(),
      });

      return {
        id: docRef.id,
        title,
        description,
        category,
        uid,
      };
    },

    onSuccess: (newRoom) => {
      // 1. 캐시 무효화 방식: 서버에서 목록 재조회
      queryClient.invalidateQueries({ queryKey: ["chatRooms"] });

      // 2. 낙관적 업데이트
      queryClient.setQueryData(["chatRooms"], (oldData) => {
        const newRoomData = {
          id: newRoom.id,
          name: newRoom.title,
          description: newRoom.description,
          createdBy: newRoom.uid,
          createdByName: newRoom.userName,
          createdAt: new Date().toISOString(), // 낙관적 예상값
          participants: [newRoom.uid],
          isActive: true,
        };
        return oldData ? [...oldData, newRoomData] : [newRoomData];
      });
    },
  });
};
