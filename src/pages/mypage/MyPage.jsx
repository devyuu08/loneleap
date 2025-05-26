import { useState } from "react";
import { useSelector } from "react-redux";
import ProfileSection from "components/mypage/ProfileSection";
import SectionTabs from "components/mypage/SectionTabs";
import EmptyState from "components/common/EmptyState";
import ErrorState from "components/common/ErrorState";

import MyItineraryCard from "components/mypage/MyItineraryCard";
import MyReviewCard from "components/mypage/MyReviewCard";
import MyChatRoomCard from "components/mypage/MyChatRoomCard";
import LayoutWrapper from "components/common/LayoutWrapper";

import { useMyItineraries } from "services/queries/itinerary/useMyItineraries";
import { useMyReviews } from "hooks/review/useMyReviews";
import { useMyChatRooms } from "services/queries/chat/useMyChatRooms";

import { CalendarDays, MessageSquareText, MessagesSquare } from "lucide-react";
import FloatingButtons from "components/common/FloatingButtons";

export default function MyPage() {
  const user = useSelector((state) => state.user.user);
  const [activeTab, setActiveTab] = useState("itinerary");

  const {
    data: myItineraries = [],
    isLoading: isItineraryLoading,
    isError: isItineraryError,
    error: itineraryError,
  } = useMyItineraries(user?.uid, {
    enabled: activeTab === "itinerary",
  });

  const {
    data: myReviews = [],
    isLoading: isReviewLoading,
    isError: isReviewError,
    error: reviewError,
  } = useMyReviews({ enabled: activeTab === "review" });

  const {
    data: myChatRooms = [],
    isLoading: isChatLoading,
    isError: isChatError,
    error: chatError,
  } = useMyChatRooms(user?.uid, {
    enabled: activeTab === "chat",
  });

  const renderContent = () => {
    const renderTabContent = (
      isLoading,
      isError,
      error,
      items,
      EmptyStateProps,
      renderItems
    ) => {
      if (isLoading) {
        return <div className="text-gray-200">불러오는 중...</div>;
      }

      if (isError) {
        return <ErrorState message={error?.message} />;
      }

      if (!items || items.length === 0) {
        return <EmptyState {...EmptyStateProps} />;
      }

      return renderItems(items);
    };

    if (activeTab === "itinerary") {
      return renderTabContent(
        isItineraryLoading,
        isItineraryError,
        itineraryError,
        myItineraries,
        {
          icon: <CalendarDays className="w-5 h-5 text-gray-400" />,
          title: "작성한 일정이 없습니다",
          description: "새로운 일정을 추가해 LoneLeap 여정을 시작해보세요.",
        },
        (items) => (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <MyItineraryCard key={item.id} itinerary={item} />
            ))}
          </div>
        )
      );
    }

    if (activeTab === "review") {
      return renderTabContent(
        isReviewLoading,
        isReviewError,
        reviewError,
        myReviews,
        {
          icon: <MessageSquareText className="w-5 h-5 text-gray-400" />,
          title: "작성한 리뷰가 없습니다",
          description: "여행지를 다녀오셨다면, 리뷰를 공유해보세요.",
        },
        (reviews) => (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <MyReviewCard key={review.id} review={review} />
            ))}
          </div>
        )
      );
    }

    if (activeTab === "chat") {
      return renderTabContent(
        isChatLoading,
        isChatError,
        chatError,
        myChatRooms,
        {
          icon: <MessagesSquare className="w-5 h-5 text-gray-200" />,
          title: "참여한 채팅방이 없습니다",
          description: "함께 소통할 채팅방에 참여해보세요.",
        },
        (rooms) => (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room) => (
              <MyChatRoomCard key={room.id} room={room} />
            ))}
          </div>
        )
      );
    }

    return null;
  };

  return (
    <main className="min-h-screen bg-[url('/images/mypage-bg.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="min-h-screen bg-black/40 backdrop-blur-sm">
        <LayoutWrapper>
          <section>
            <ProfileSection user={user} />
          </section>

          <section>
            <div className="max-w-5xl mx-auto">
              <SectionTabs activeTab={activeTab} setActiveTab={setActiveTab} />
              <div className="px-6 py-10">{renderContent()}</div>
            </div>
          </section>
        </LayoutWrapper>
      </div>

      <FloatingButtons
        createPath={
          activeTab === "itinerary"
            ? "/itinerary/create"
            : activeTab === "review"
            ? "/reviews/create"
            : null
        }
      />
    </main>
  );
}
