import { useState } from "react";
import { useSelector } from "react-redux";

import { useMyItineraries } from "@/hooks/itinerary/useMyItineraries";
import { useMyReviews } from "@/hooks/review/useMyReviews";
import { useMyChatRooms } from "@/hooks/chat/useMyChatRooms";
import MyPage from "@/components/mypage/MyPage";

export default function MyPageContainer() {
  const [activeTab, setActiveTab] = useState("itinerary");
  const user = useSelector((state) => state.user.user);

  const myItinerariesQuery = useMyItineraries(user?.uid, {
    enabled: activeTab === "itinerary",
  });

  const myReviewsQuery = useMyReviews({
    enabled: activeTab === "review",
  });

  const myChatRoomsQuery = useMyChatRooms(user?.uid, {
    enabled: activeTab === "chat",
  });

  return (
    <MyPage
      user={user}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      myItinerariesQuery={myItinerariesQuery}
      myReviewsQuery={myReviewsQuery}
      myChatRoomsQuery={myChatRoomsQuery}
    />
  );
}
