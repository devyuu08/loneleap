// src/pages/MyPage.jsx
import React, { useState } from "react";
import { useSelector } from "react-redux";
import ProfileSection from "../components/mypage/ProfileSection";
import SectionTabs from "../components/mypage/SectionTabs";
import EmptyState from "../components/EmptyState";

export default function MyPage() {
  const user = useSelector((state) => state.user.user);
  const [activeTab, setActiveTab] = useState("itinerary"); // 기본: 내 일정

  const renderContent = () => {
    const myItineraries = [];
    const myReviews = [];
    const myChats = [];

    if (activeTab === "itinerary") {
      return myItineraries.length === 0 ? (
        <EmptyState
          icon="📅"
          title="작성한 일정이 없습니다"
          description="새로운 일정을 추가해 LoneLeap 여정을 시작해보세요."
        />
      ) : (
        <div>[일정 카드 리스트]</div>
      );
    }

    if (activeTab === "review") {
      return myReviews.length === 0 ? (
        <EmptyState
          icon="📝"
          title="작성한 리뷰가 없습니다"
          description="여행지를 다녀오셨다면, 리뷰를 공유해보세요."
        />
      ) : (
        <div>[리뷰 카드 리스트]</div>
      );
    }

    if (activeTab === "chat") {
      return myChats.length === 0 ? (
        <EmptyState
          icon="💬"
          title="참여한 채팅방이 없습니다"
          description="함께 소통할 채팅방에 참여해보세요."
        />
      ) : (
        <div>[채팅방 카드 리스트]</div>
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
