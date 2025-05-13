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
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ title, description = "", category, user }) => {
      if (!user?.uid)
        throw new Error("인증된 사용자만 채팅방을 생성할 수 있습니다");

      if (!title) {
        throw new Error("채팅방 제목은 필수입니다");
      }

      const docRef = await addDoc(collection(db, "chatRooms"), {
        name: title,
        description,
        category,
        createdAt: serverTimestamp(),
        createdBy: {
          uid: user.uid,
          displayName: user.displayName || "익명",
          photoURL: user.photoURL || "/default_profile.png",
        },
        participants: [user.uid],
        isActive: true,
        lastActivity: serverTimestamp(),
      });

      return {
        id: docRef.id,
        title,
        description,
        category,
        user,
      };
    },

    onSuccess: (newRoom) => {
      queryClient.invalidateQueries({ queryKey: ["chatRooms"] });

      queryClient.setQueryData(["chatRooms"], (oldData) => {
        const newRoomData = {
          id: newRoom.id,
          name: newRoom.title,
          description: newRoom.description,
          createdBy: {
            uid: newRoom.user.uid,
            displayName: newRoom.user.displayName,
            photoURL: newRoom.user.photoURL,
          },
          participants: [newRoom.user.uid],
          createdAt: new Date().toISOString(),
          isActive: true,
        };
        return oldData ? [...oldData, newRoomData] : [newRoomData];
      });
    },
  });
};
