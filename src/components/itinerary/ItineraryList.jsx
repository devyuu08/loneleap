import React from "react";
import ItineraryCard from "@/components/itinerary/ItineraryCard";
import EmptyState from "@/components/common/feedback/EmptyState";
import { CalendarX } from "lucide-react";

/**
 * 여행 일정 목록 섹션
 * - 일정 리스트가 있을 경우: 카드 리스트 렌더링
 * - 없을 경우: EmptyState 컴포넌트로 안내 표시
 */

function ItineraryList({ filteredItineraries }) {
  const hasResults = filteredItineraries.length > 0;

  return (
    <section
      aria-label="여행 일정 목록"
      className="max-w-7xl mx-auto px-6 md:px-12 py-12 sm:py-16 lg:py-20"
    >
      {/* 일정이 존재할 경우 */}
      {hasResults ? (
        <ul
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          role="list"
        >
          {filteredItineraries.map((itinerary) => (
            <li key={itinerary.id} role="listitem">
              {/* 일정 카드 */}
              <ItineraryCard itinerary={itinerary} />
            </li>
          ))}
        </ul>
      ) : (
        // 일정이 없을 경우: 빈 상태 안내
        <article
          className="flex flex-col items-center justify-center h-60 text-center"
          role="status"
          aria-live="polite"
        >
          <EmptyState
            icon={<CalendarX className="w-8 h-8" />}
            title="일정을 찾을 수 없어요"
            description="다른 필터를 선택하거나 검색어를 바꿔보세요."
          />
        </article>
      )}
    </section>
  );
}

export default React.memo(ItineraryList);
