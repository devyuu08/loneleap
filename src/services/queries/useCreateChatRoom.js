// src/services/queries/useCreateChatRoom.js
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useMutation } from "@tanstack/react-query";

export const useCreateChatRoom = () => {
  return useMutation({
    mutationFn: async ({ title, description, uid }) => {
      const docRef = await addDoc(collection(db, "chatRooms"), {
        name: title,
        description,
        createdAt: serverTimestamp(),
        createdBy: uid,
      });
      return docRef.id;
    },
  });
};
