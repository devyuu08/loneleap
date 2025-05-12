import { useQuery } from "@tanstack/react-query";
import { collection, query, where } from "firebase/firestore";
import { getCountFromServer } from "firebase/firestore";
import { db } from "services/firebase";

export const useUserStats = (uid) => {
  return useQuery({
    queryKey: ["userStats", uid],
    queryFn: async () => {
      const [itinerarySnap, reviewSnap, chatSnap] = await Promise.all([
        getCountFromServer(
          query(collection(db, "itineraries"), where("userId", "==", uid))
        ),
        getCountFromServer(
          query(collection(db, "reviews"), where("userId", "==", uid))
        ),
        getCountFromServer(
          query(
            collection(db, "chatRooms"),
            where("participants", "array-contains", uid)
          )
        ),
      ]);

      return {
        itineraryCount: itinerarySnap.data().count,
        reviewCount: reviewSnap.data().count,
        chatRoomCount: chatSnap.data().count,
      };
    },
    enabled: !!uid,
    staleTime: 0,
    refetchOnWindowFocus: true,
  });
};
