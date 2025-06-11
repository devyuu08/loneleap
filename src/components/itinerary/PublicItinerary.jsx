import ItineraryDetail from "@/components/itinerary/ItineraryDetail";

/**
 * PublicItinerary
 * - 공개된 여행 일정 상세 페이지 컴포넌트
 * - 소유자가 아닌 사용자가 열람하는 공개 뷰
 * - 삭제/수정 등은 비활성화됨
 */

export default function PublicItinerary({ id, itinerary }) {
  return (
    <main className="max-w-5xl mx-auto pt-10 px-4">
      {/* 여행 상세 컴포넌트 (소유자가 아님 → isOwner: false) */}
      <ItineraryDetail
        itineraryId={id}
        itinerary={itinerary}
        isOwner={false}
        onDelete={() => {}}
        isDeletePending={false}
      />
    </main>
  );
}
