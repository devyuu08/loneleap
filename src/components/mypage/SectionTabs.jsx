import { useRef, useEffect, useState } from "react";

/**
 * SectionTabs
 * - 마이페이지 내 섹션 전환 탭 UI
 * - 선택된 탭 하단에 애니메이션 underline 표시
 * - 반응형 대응 및 리사이즈 시 underline 위치 재계산
 */

export default function SectionTabs({ activeTab, onChange }) {
  const tabs = [
    { key: "itinerary", label: "내 일정" },
    { key: "review", label: "내 리뷰" },
    { key: "chat", label: "내 채팅방" },
  ];

  const containerRef = useRef(null);
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });

  // 현재 활성 탭 기준으로 underline 위치 설정
  useEffect(() => {
    const activeButton = containerRef.current?.querySelector(
      `[data-tab="${activeTab}"]`
    );
    if (activeButton) {
      const { offsetLeft, offsetWidth } = activeButton;
      setUnderlineStyle({ left: offsetLeft, width: offsetWidth });
    }
  }, [activeTab]);

  // 활성 탭 변경 시 underline 위치 갱신
  useEffect(() => {
    const updateUnderline = () => {
      const activeButton = containerRef.current?.querySelector(
        `[data-tab="${activeTab}"]`
      );
      if (activeButton) {
        const { offsetLeft, offsetWidth } = activeButton;
        setUnderlineStyle({ left: offsetLeft, width: offsetWidth });
      }
    };

    updateUnderline(); // 초기 실행
    window.addEventListener("resize", updateUnderline); // 리사이즈 대응

    return () => window.removeEventListener("resize", updateUnderline);
  }, [activeTab]);

  return (
    <nav
      className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-2 border-b border-white/30"
      aria-label="마이페이지 섹션 탭"
    >
      {/* 탭 버튼 그룹 */}
      <div
        ref={containerRef}
        className="flex items-center justify-center gap-2 sm:gap-6"
      >
        {tabs.map((tab) => (
          <button
            key={tab.key}
            data-tab={tab.key}
            onClick={() => onChange(tab.key)}
            className={`relative pb-2 px-2 sm:px-4 text-sm sm:text-base font-medium text-center transition-colors ${
              activeTab === tab.key
                ? "text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 하단 underline 애니메이션 */}
      <span
        className="absolute bottom-0 h-0.5 bg-white transition-all duration-300 ease-in-out"
        style={{ left: underlineStyle.left, width: underlineStyle.width }}
        aria-hidden="true"
      />
    </nav>
  );
}
