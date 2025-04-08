import { useQuery } from "@tanstack/react-query";
import { fetchUserItineraries } from "../firestore";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export const useMyItineraries = () => {
  const [user, loading] = useAuthState(auth);

  return useQuery({
    queryKey: ["myItineraries", user?.uid],
    queryFn: () => fetchUserItineraries(user.uid),
    enabled: !loading && !!user?.uid, // 로그인된 경우에만 실행
  });
};
