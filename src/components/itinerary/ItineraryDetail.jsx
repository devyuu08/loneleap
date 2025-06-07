import React from "react";
import { format } from "date-fns";
import {
  MapPin,
  CalendarDays,
  TimerReset,
  Eye,
  EyeOff,
  Quote,
} from "lucide-react";
import FloatingButtons from "@/components/common/button/FloatingButtons";
import ItineraryHero from "@/components/itinerary/ItineraryHero";
import DayScheduleListContainer from "@/containers/itinerary/DayScheduleListContainer";
import ChecklistSectionContainer from "@/containers/itinerary/ChecklistSectionContainer";

/**
 * ItineraryDetail – 여행 일정 상세 페이지 본문 컴포넌트
 * - 여행 요약 정보, 한 줄 소개, 세부 일정, 체크리스트를 포함
 * - 소유자(isOwner)는 수정/삭제 버튼과 체크리스트를 확인 가능
 */

export default function ItineraryDetail({
  itineraryId,
  itinerary,
  isOwner,
  onDelete,
  isDeletePending,
}) {
  const { location, isPublic, summary, createdAt, days, checklist } = itinerary;

  return (
    <article className="pb-16" aria-labelledby="itinerary-heading">
      {/* Hero (타이틀, 이미지 등) */}
      <ItineraryHero data={itinerary} isOwner={isOwner} />

      <div className="px-4 mt-12">
        {/* 요약 정보 카드 */}
        <section
          aria-label="여행 요약 정보"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <InfoCard
            icon={<MapPin />}
            label="여행 지역"
            value={location || "미정"}
          />
          <InfoCard
            icon={<CalendarDays />}
            label="등록일"
            value={
              createdAt
                ? format(
                    createdAt.toDate?.() ?? new Date(createdAt),
                    "yyyy.MM.dd"
                  )
                : "정보 없음"
            }
          />
          <InfoCard
            icon={<TimerReset />}
            label="총 일정"
            value={days?.length ? `총 ${days.length}일` : "일정 미정"}
          />
          <InfoCard
            icon={isPublic ? <Eye /> : <EyeOff />}
            label="일정 공개"
            value={isPublic ? "공개" : "비공개"}
            valueClass={isPublic ? "text-blue-600" : "text-gray-500"}
          />
        </section>

        {/* 여행 한 줄 소개 */}
        {summary && (
          <section
            aria-label="일정 요약 소개"
            className="bg-white border border-gray-200 rounded-xl px-6 py-5 shadow-sm mt-6"
          >
            <h3 className="text-sm text-gray-500 font-semibold mb-2 flex items-center">
              <Quote className="w-4 h-4 mr-1" />
              여행 한 줄 소개
            </h3>
            <p className="text-base text-gray-800">{summary}</p>
          </section>
        )}

        {/* 일정 상세 리스트 */}
        {days?.length > 0 && (
          <section aria-label="일정 상세 보기" className="mt-10">
            <DayScheduleListContainer days={days} isOwner={isOwner} />
          </section>
        )}

        {/* 하단 버튼 및 체크리스트 */}
        {isOwner && (
          <>
            <FloatingButtons
              editPath={`/itinerary/edit/${itineraryId}`}
              onDelete={() => onDelete(itineraryId)}
              isDeletePending={isDeletePending}
            />
            <section aria-label="여행 체크리스트" className="pt-10">
              <ChecklistSectionContainer checklist={checklist} />
            </section>
          </>
        )}
      </div>
    </article>
  );
}

// 서브 컴포넌트: 요약 카드
const InfoCard = React.memo(function InfoCard({
  icon,
  label,
  value,
  valueClass = "text-gray-800",
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl px-6 py-4 shadow-sm">
      <div className="flex justify-between items-center text-sm text-gray-700">
        <span className="flex items-center gap-1 font-semibold text-gray-500">
          {icon}
          {label}
        </span>
        <span className={`text-base font-medium ${valueClass}`}>{value}</span>
      </div>
    </div>
  );
});
