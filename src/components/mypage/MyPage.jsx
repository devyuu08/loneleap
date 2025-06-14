import SectionTabs from "@/components/mypage/SectionTabs";
import ProfileSectionContainer from "@/containers/mypage/ProfileSectionContainer";
import MyItineraryCard from "@/components/mypage/MyItineraryCard";
import MyReviewCard from "@/components/mypage/MyReviewCard";
import MyChatRoomCard from "@/components/mypage/MyChatRoomCard";
import LayoutWrapper from "@/components/common/layout/LayoutWrapper";
import FloatingButtons from "@/components/common/button/FloatingButtons";
import EmptyState from "@/components/common/feedback/EmptyState";
import ErrorState from "@/components/common/feedback/ErrorState";

import { CalendarDays, MessageSquareText, MessagesSquare } from "lucide-react";

/**
 * MyPage
 * - 마이페이지 메인 컴포넌트
 * - 작성한 일정 / 리뷰 / 채팅방 목록을 탭 형태로 전환해 보여줌
 * - 빈 목록일 경우 EmptyState, 오류 시 ErrorState 표시
 * - Floating 버튼으로 작성 페이지 이동 가능
 */

export default function MyPage({
  user,
  activeTab,
  onTabChange,
  myItinerariesQuery,
  myReviewsQuery,
  myChatRoomsQuery,
}) {
  const gridLayout =
    "grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 place-items-center sm:place-items-start";

  const emptyIconClass = "w-5 h-5 text-gray-200";

  const emptyTextColor = {
    iconColor: "text-white",
    textColor: "text-white",
    descColor: "text-gray-300",
  };

  // 탭에 따른 콘텐츠 렌더링
  const renderContent = () => {
    const renderTabContent = (query, EmptyStateProps, renderItems) => {
      if (query.isLoading) {
        return <div className="text-gray-200">불러오는 중...</div>;
      }

      if (query.isError) {
        return <ErrorState message={query.error?.message} />;
      }

      const items = query.data;

      if (!items || items.length === 0) {
        return <EmptyState {...EmptyStateProps} />;
      }

      return renderItems(items);
    };

    // 일정 탭
    if (activeTab === "itinerary") {
      return renderTabContent(
        myItinerariesQuery,
        {
          icon: <CalendarDays className={emptyIconClass} />,
          title: "작성한 일정이 없습니다",
          description: "새로운 일정을 추가해 LoneLeap 여정을 시작해보세요.",
          ...emptyTextColor,
        },
        (items) => (
          <div className={gridLayout}>
            {items.map((item) => (
              <MyItineraryCard key={item.id} itinerary={item} />
            ))}
          </div>
        )
      );
    }

    // 리뷰 탭
    if (activeTab === "review") {
      return renderTabContent(
        myReviewsQuery,
        {
          icon: <MessageSquareText className={emptyIconClass} />,
          title: "작성한 리뷰가 없습니다",
          description: "여행지를 다녀오셨다면, 리뷰를 공유해보세요.",
          ...emptyTextColor,
        },
        (reviews) => (
          <div className={gridLayout}>
            {reviews.map((review) => (
              <MyReviewCard key={review.id} review={review} />
            ))}
          </div>
        )
      );
    }

    // 채팅 탭
    if (activeTab === "chat") {
      return renderTabContent(
        myChatRoomsQuery,
        {
          icon: <MessagesSquare className={emptyIconClass} />,
          title: "참여한 채팅방이 없습니다",
          description: "함께 소통할 채팅방에 참여해보세요.",
          ...emptyTextColor,
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
          {/* 프로필 영역 */}
          <section>
            <ProfileSectionContainer user={user} />
          </section>

          {/* 탭 + 콘텐츠 영역 */}
          <section>
            <div className="max-w-5xl mx-auto">
              <SectionTabs activeTab={activeTab} onChange={onTabChange} />
              <div className="px-6 py-10">{renderContent()}</div>
            </div>
          </section>
        </LayoutWrapper>
      </div>

      {/* 플로팅 액션 버튼 */}
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
