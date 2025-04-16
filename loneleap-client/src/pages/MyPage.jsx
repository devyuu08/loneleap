// src/pages/MyPage.jsx
import React, { useState } from "react";
import { useSelector } from "react-redux";
import ProfileSection from "components/mypage/ProfileSection";
import SectionTabs from "components/mypage/SectionTabs";
import EmptyState from "components/EmptyState";

import MyItineraryCard from "components/mypage/MyItineraryCard";
import MyReviewCard from "components/mypage/MyReviewCard";
import MyChatRoomCard from "components/mypage/MyChatRoomCard";

import { useMyItineraries } from "services/queries/useMyItineraries";
import { useMyReviews } from "services/queries/useMyReviews";
import { useMyChatRooms } from "services/queries/useMyChatRooms";

export default function MyPage() {
  const user = useSelector((state) => state.user.user);
  const [activeTab, setActiveTab] = useState("itinerary"); // 기본: 내 일정

  const { data: myItineraries = [], isLoading: isItineraryLoading } =
    useMyItineraries(user?.uid);
  const { data: myReviews = [], isLoading: isReviewLoading } = useMyReviews(
    user?.uid
  );
  const { data: myChatRooms = [], isLoading: isChatLoading } = useMyChatRooms(
    user?.uid
  );

  const renderContent = () => {
    if (activeTab === "itinerary") {
      if (isItineraryLoading) {
        return <div className="text-gray-400">불러오는 중...</div>;
      }

      return myItineraries.length === 0 ? (
        <EmptyState
          icon="📅"
          title="작성한 일정이 없습니다"
          description="새로운 일정을 추가해 LoneLeap 여정을 시작해보세요."
        />
      ) : (
        <div>
          {myItineraries.map((item) => (
            <MyItineraryCard key={item.id} itinerary={item} />
          ))}
        </div>
      );
    }

    if (activeTab === "review") {
      if (isReviewLoading) {
        return <div className="text-gray-400">불러오는 중...</div>;
      }

      return myReviews.length === 0 ? (
        <EmptyState
          icon="📝"
          title="작성한 리뷰가 없습니다"
          description="여행지를 다녀오셨다면, 리뷰를 공유해보세요."
        />
      ) : (
        <div>
          {myReviews.map((review) => (
            <MyReviewCard key={review.id} review={review} />
          ))}
        </div>
      );
    }

    if (activeTab === "chat") {
      if (isChatLoading) {
        return <div className="text-gray-400">불러오는 중...</div>;
      }

      return myChatRooms.length === 0 ? (
        <EmptyState
          icon="💬"
          title="참여한 채팅방이 없습니다"
          description="함께 소통할 채팅방에 참여해보세요."
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {myChatRooms.map((room) => (
            <MyChatRoomCard key={room.id} room={room} />
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-white text-black">
      {/* 상단: 어두운 그라디언트 배경 */}
      <section className="bg-gradient-to-b from-[#1c1f2a] to-[#2d3243] text-white">
        <ProfileSection user={user} />
      </section>

      {/* 탭 + 콘텐츠: 밝은 배경 */}
      <section className="bg-[#f8f9fa] min-h-screen">
        <SectionTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="max-w-5xl mx-auto px-6 py-10">{renderContent()}</div>
      </section>
    </div>
  );
}
