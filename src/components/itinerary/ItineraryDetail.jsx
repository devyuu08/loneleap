import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { useItineraryDetail } from "services/queries/itinerary/useItineraryDetail";

import LoadingSpinner from "components/common/LoadingSpinner";
import NotFoundMessage from "components/common/NotFoundMessage";
import ItineraryHero from "components/itinerary/ItineraryHero";

import DayScheduleList from "./DayScheduleList";
import { format } from "date-fns";

import {
  MapPin,
  CalendarDays,
  TimerReset,
  Eye,
  EyeOff,
  Quote,
} from "lucide-react";
import FloatingButtons from "components/common/FloatingButtons";
import ChecklistSection from "./ChecklistSection";

export default function ItineraryDetail() {
  const { id } = useParams();
  const currentUser = useSelector((state) => state.user);
  const { data, isLoading, isError } = useItineraryDetail(id);

  if (isLoading || currentUser.isLoading) return <LoadingSpinner />;
  if (isError || !data)
    return <NotFoundMessage message="일정을 찾을 수 없습니다." />;

  const isOwner = currentUser?.user?.uid === data.userId;
  const { location, isPublic, summary } = data;

  return (
    <>
      <ItineraryHero data={data} isOwner={isOwner} />
      {/* 여행 정보 */}
      <section className="mt-10 space-y-6">
        {/* 여행 정보 4개 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 여행 지역 */}
          <div className="bg-white border border-gray-200 rounded-xl px-6 py-4 shadow-sm">
            <div className="flex justify-between items-center text-sm text-gray-700">
              <span className="flex items-center font-semibold text-gray-500">
                <MapPin className="w-4 h-4 mr-1" />
                여행 지역
              </span>
              <span className="text-base text-gray-800 font-medium">
                {location || "미정"}
              </span>
            </div>
          </div>

          {/* 등록일 */}
          <div className="bg-white border border-gray-200 rounded-xl px-6 py-4 shadow-sm">
            <div className="flex justify-between items-center text-sm text-gray-700">
              <span className="flex items-center font-semibold text-gray-500">
                <CalendarDays className="w-4 h-4 mr-1" />
                등록일
              </span>
              <span className="text-base text-gray-800 font-medium">
                {data.createdAt
                  ? format(new Date(data.createdAt), "yyyy.MM.dd")
                  : "정보 없음"}
              </span>
            </div>
          </div>

          {/* 총 일정 */}
          <div className="bg-white border border-gray-200 rounded-xl px-6 py-4 shadow-sm">
            <div className="flex justify-between items-center text-sm text-gray-700">
              <span className="flex items-center font-semibold text-gray-500">
                <TimerReset className="w-4 h-4 mr-1" />총 일정
              </span>
              <span className="text-base text-gray-800 font-medium">
                {data.days?.length ? `총 ${data.days.length}일` : "일정 미정"}
              </span>
            </div>
          </div>

          {/* 공개 여부 */}
          <div className="bg-white border border-gray-200 rounded-xl px-6 py-4 shadow-sm">
            <div className="flex justify-between items-center text-sm text-gray-700">
              <span className="flex items-center font-semibold text-gray-500">
                {isPublic ? (
                  <Eye className="w-4 h-4 mr-1" />
                ) : (
                  <EyeOff className="w-4 h-4 mr-1" />
                )}
                일정 공개
              </span>
              <span
                className={`text-base font-medium ${
                  isPublic ? "text-blue-600" : "text-gray-500"
                }`}
              >
                {isPublic ? "공개" : "비공개"}
              </span>
            </div>
          </div>
        </div>

        {/* 여행 한 줄 소개 */}
        {summary && (
          <div className="bg-white border border-gray-200 rounded-xl px-6 py-5 shadow-sm">
            <h3 className="text-sm text-gray-500 font-semibold mb-2 flex items-center">
              <Quote className="w-4 h-4 mr-1" />
              여행 한 줄 소개
            </h3>
            <p className="text-base text-gray-800">{summary}</p>
          </div>
        )}
      </section>

      <section className="mt-10 space-y-6">
        {/* 앞으로 추가될 일정 상세 / 포함사항 등은 이 아래 */}
        {data.days && <DayScheduleList days={data.days} isOwner={isOwner} />}

        {isOwner && <FloatingButtons />}

        {isOwner && <ChecklistSection checklist={data.checklist} />}
      </section>
    </>
  );
}
