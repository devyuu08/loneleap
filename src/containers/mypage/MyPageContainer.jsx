import { useState, useCallback } from "react";
import { useSelector } from "react-redux";

import { useMyItineraries } from "@/hooks/itinerary/useMyItineraries";
import { useMyReviews } from "@/hooks/review/useMyReviews";
import { useMyChatRooms } from "@/hooks/chat/useMyChatRooms";
import MyPage from "@/components/mypage/MyPage";

/**
 * MyPageContainer
 * - 마이페이지 탭 상태 및 사용자별 일정/리뷰/채팅 쿼리 관리
 */

export default function MyPageContainer() {
  const [activeTab, setActiveTab] = useState("itinerary");
  const user = useSelector((state) => state.user.user);

  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab);
  }, []);

  const myItinerariesQuery = useMyItineraries({
    enabled: activeTab === "itinerary",
  });

  const myReviewsQuery = useMyReviews({
    enabled: activeTab === "review",
  });

  const myChatRoomsQuery = useMyChatRooms({
    enabled: activeTab === "chat",
  });

  return (
    <MyPage
      user={user}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      onTabChange={handleTabChange}
      myItinerariesQuery={myItinerariesQuery}
      myReviewsQuery={myReviewsQuery}
      myChatRoomsQuery={myChatRoomsQuery}
    />
  );
}
