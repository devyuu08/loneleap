import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/services/firebase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/queryKeys";

/**
 * 채팅방 생성 훅
 * @param {Function} onSuccessNavigate - 생성 후 이동 콜백 (예: navigate 함수)
 */

export const useCreateChatRoom = (onSuccessNavigate) => {
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
          photoURL: user.photoURL || "/images/default-profile.png",
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
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CHAT_ROOMS] });

      queryClient.setQueryData([QUERY_KEYS.CHAT_ROOMS], (prev) => {
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
        return prev ? [...prev, newRoomData] : [newRoomData];
      });
      // 네비게이션
      if (onSuccessNavigate) {
        onSuccessNavigate(`/chat/${newRoom.id}`);
      }
    },
  });
};
