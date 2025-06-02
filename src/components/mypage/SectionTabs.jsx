import { useRef, useEffect, useState } from "react";

export default function SectionTabs({ activeTab, onChange }) {
  const tabs = [
    { key: "itinerary", label: "내 일정" },
    { key: "review", label: "내 리뷰" },
    { key: "chat", label: "내 채팅방" },
  ];

  const containerRef = useRef(null);
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const activeButton = containerRef.current?.querySelector(
      `[data-tab="${activeTab}"]`
    );
    if (activeButton) {
      const { offsetLeft, offsetWidth } = activeButton;
      setUnderlineStyle({ left: offsetLeft, width: offsetWidth });
    }
  }, [activeTab]);

  return (
    <div className="relative max-w-5xl mx-auto px-6 pt-6 pb-2 border-b border-white/30">
      <div
        ref={containerRef}
        className="flex justify-between transition-all duration-300 ease-in-out"
      >
        {tabs.map((tab) => (
          <button
            key={tab.key}
            data-tab={tab.key}
            onClick={() => onChange(tab.key)}
            className={`pb-2 w-full text-sm md:text-base font-medium text-center transition-colors ${
              activeTab === tab.key
                ? "text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 움직이는 밑줄 */}
      <span
        className="absolute bottom-0 h-0.5 bg-white transition-all duration-300 ease-in-out"
        style={{ left: underlineStyle.left, width: underlineStyle.width }}
      />
    </div>
  );
}
