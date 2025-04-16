// src/services/queries/useMyChatRooms.js
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "../firebase";

export const useMyChatRooms = (uid) => {
  return useQuery({
    queryKey: ["myChatRooms", uid],
    enabled: !!uid,
    queryFn: async () => {
      const q = query(
        collection(db, "chatRooms"),
        where("participants", "array-contains", uid),
        orderBy("createdAt", "desc")
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    },
  });
};
