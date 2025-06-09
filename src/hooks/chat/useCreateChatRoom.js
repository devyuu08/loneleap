import {
  collection,
  addDoc,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/services/firebase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/queryKeys";

/**
 * useCreateChatRoom
 * - 새로운 채팅방을 생성하는 mutation 훅
 * - Firestore에 문서를 추가하고, 캐시를 갱신하며, 성공 시 네비게이션 처리까지 수행
 * - 사용자 인증 확인 및 기본값 처리 포함
 */

export function useCreateChatRoom(onSuccessNavigate) {
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
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.CHAT_ROOMS],
        predicate: (query) => query.queryKey[0] === QUERY_KEYS.CHAT_ROOMS,
      });

      queryClient.setQueriesData(
        {
          queryKey: [QUERY_KEYS.CHAT_ROOMS],
          predicate: (query) => query.queryKey[0] === QUERY_KEYS.CHAT_ROOMS,
        },
        (prev) => {
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
            createdAt: Timestamp.now(),
            isActive: true,
          };
          return prev ? [...prev, newRoomData] : [newRoomData];
        }
      );
      // 네비게이션
      if (onSuccessNavigate) {
        onSuccessNavigate(`/chat/${newRoom.id}`);
      }
    },
    onError: (error) => {
      console.error("채팅방 생성 오류:", error.message);
      alert("채팅방 생성 중 오류가 발생했습니다.");
    },
  });
}
