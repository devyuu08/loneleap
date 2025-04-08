import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../services/firebase"; // auth에서 uid 가져옴
import { useAddItinerary } from "../services/queries/itinerary";

import DatePicker from "./DatePicker";
import FormSubmitButton from "./FormSubmitButton";

export default function CreateItinerary() {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [memo, setMemo] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  const { mutate, isPending } = useAddItinerary();

  const handleCreateItinerarySubmit = async (e) => {
    e.preventDefault(); // 폼 기본 제출 막기

    const user = auth.currentUser;
    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }

    const itineraryData = {
      title,
      location,
      startDate,
      endDate,
      memo,
      isPublic,
      userId: user.uid,
    };

    mutate(itineraryData);
  };

  return (
    <form className="space-y-4" onSubmit={handleCreateItinerarySubmit}>
      {/* 제목 */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">
          제목
        </label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
          placeholder="예: 제주도 혼행"
        />
      </div>

      {/* 지역 */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">
          여행지
        </label>
        <input
          type="text"
          name="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
          placeholder="예: 제주"
        />
      </div>

      {/* 날짜 */}
      <div className="grid grid-cols-2 gap-4">
        <DatePicker
          label="시작일"
          name="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <DatePicker
          label="종료일"
          name="endDate"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      {/* 메모 */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">
          메모
        </label>
        <textarea
          name="memo"
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          rows={3}
          className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
          placeholder="예: 성산일출봉 꼭 가기"
        />
      </div>

      {/* 공개 여부 */}
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="isPublic"
          checked={isPublic}
          onChange={(e) => setIsPublic(e.target.checked)}
          className="accent-gray-800"
        />
        <label className="text-sm text-gray-700">일정을 공개합니다</label>
      </div>

      {/* 버튼 */}
      <FormSubmitButton isLoading={isPending} label="일정 저장하기" />
    </form>
  );
}
