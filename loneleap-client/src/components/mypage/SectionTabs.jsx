// src/components/mypage/SectionTabs.jsx
import React from "react";

export default function SectionTabs({ activeTab, setActiveTab }) {
  const tabs = [
    { key: "itinerary", label: "내 일정" },
    { key: "review", label: "내 리뷰" },
    { key: "chat", label: "채팅방" },
  ];

  return (
    <div className="bg-[#f8f9fa] border-b border-gray-300">
      <div className="max-w-5xl mx-auto px-6 pt-6 pb-2 flex justify-start gap-12">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`pb-2 text-base transition-all ${
              activeTab === tab.key
                ? "text-black font-semibold border-b-2 border-black"
                : "text-gray-400 hover:text-black border-b-2 border-transparent"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
