import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { auth } from "services/firebase"; // auth에서 uid 가져옴
import { useMutation } from "@tanstack/react-query";

import DatePicker from "./DatePicker";
import FormSubmitButton from "components/common/FormSubmitButton";

import { useAddItinerary } from "services/queries/itinerary/useAddItinerary";

import { updateItinerary } from "services/firestore";

export default function ItineraryForm({ initialData, isEditMode = false }) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [location, setLocation] = useState(initialData?.location || "");
  const [startDate, setStartDate] = useState(initialData?.startDate || "");
  const [endDate, setEndDate] = useState(initialData?.endDate || "");
  const [memo, setMemo] = useState(initialData?.memo || "");
  const [isPublic, setIsPublic] = useState(initialData?.isPublic || false);

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // 유효성 검사 함수
  const validateForm = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "제목을 입력해주세요.";
    if (!location.trim()) newErrors.location = "여행지를 입력해주세요.";
    if (!startDate) newErrors.startDate = "시작일을 선택해주세요.";
    if (!endDate) newErrors.endDate = "종료일을 선택해주세요.";
    if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
      newErrors.endDate = "종료일은 시작일보다 이후여야 합니다.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const { mutate: addMutate, isPending: isAdding } = useAddItinerary();

  const { mutate: updateMutate, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, updatedData }) => updateItinerary(id, updatedData),
    onSuccess: () => {
      navigate(`/itinerary/${initialData.id}`);
    },
    onError: () => alert("일정 수정 중 오류가 발생했습니다."),
  });

  const handleItinerarySubmit = async (e) => {
    e.preventDefault();

    // 유효성 검사 먼저 수행!
    if (!validateForm()) return;

    const user = auth.currentUser;
    if (!user || !user.uid) {
      alert("로그인 상태가 확인되지 않았습니다.. 다시 로그인해주세요.");
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
      days: initialData?.days || [
        {
          day: 1,
          date: startDate,
          schedules: [
            {
              time: "오전",
              activity: "도착",
              description: "목적지 도착",
            },
            {
              time: "오후",
              activity: "관광",
              description: "주요 관광지 방문",
            },
            {
              time: "저녁",
              activity: "저녁 식사",
              description: "현지 맛집 방문",
            },
          ],
        },
      ],
    };
    if (isEditMode) {
      updateMutate({ id: initialData.id, updatedData: itineraryData });
    } else {
      addMutate(itineraryData);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      {/*상단 제목 */}
      <h2 className="text-2xl font-bold mb-6">
        {isEditMode ? "일정 수정하기" : "새 일정 만들기"}
      </h2>
      <form className="space-y-4" onSubmit={handleItinerarySubmit}>
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
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
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
          {errors.location && (
            <p className="text-red-500 text-sm mt-1">{errors.location}</p>
          )}
        </div>

        {/* 날짜 */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <DatePicker
              label="시작일"
              name="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            {errors.startDate && (
              <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>
            )}
          </div>
          <div>
            <DatePicker
              label="종료일"
              name="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            {errors.endDate && (
              <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>
            )}
          </div>
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
        <FormSubmitButton
          isLoading={isEditMode ? isUpdating : isAdding}
          label={isEditMode ? "일정 수정하기" : "일정 저장하기"}
        />
      </form>
    </div>
  );
}
