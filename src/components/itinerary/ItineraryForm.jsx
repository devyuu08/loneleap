import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "services/firebase";
import { useMutation } from "@tanstack/react-query";
import { useAddItinerary } from "services/queries/itinerary/useAddItinerary";
import { updateItinerary } from "services/itineraryService";
import DatePicker from "./DatePicker";
import FormSubmitButton from "components/common/FormSubmitButton";
import { BookOpenText, Camera, Clock, MapPin } from "lucide-react";

export default function ItineraryForm({ initialData, isEditMode = false }) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [location, setLocation] = useState(initialData?.location || "");
  const [startDate, setStartDate] = useState(initialData?.startDate || "");
  const [endDate, setEndDate] = useState(initialData?.endDate || "");
  const [summary, setSummary] = useState(initialData?.summary || "");
  const [isPublic, setIsPublic] = useState(initialData?.isPublic || true);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const { mutate: addMutate, isPending: isAdding } = useAddItinerary();

  const { mutate: updateMutate, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, updatedData }) => updateItinerary(id, updatedData),
    onSuccess: () => navigate(`/itinerary/${initialData.id}`),
    onError: () => alert("일정 수정 중 오류가 발생했습니다."),
  });

  const validateForm = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "제목을 입력해주세요.";
    if (!location.trim()) newErrors.location = "여행지를 입력해주세요.";
    if (!startDate) newErrors.startDate = "시작일을 선택해주세요.";
    if (!endDate) newErrors.endDate = "종료일을 선택해주세요.";
    if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
      newErrors.endDate = "종료일은 시작일보다 이후여야 합니다.";
    }
    if (!summary.trim()) newErrors.summary = "여행 소개를 입력해주세요.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const user = auth.currentUser;
    if (!user?.uid) {
      alert("로그인이 필요합니다.");
      return;
    }

    const itineraryData = {
      title,
      location,
      startDate,
      endDate,
      summary,
      isPublic,
      userId: user.uid,
      days: initialData?.days || [
        {
          day: 1,
          date: startDate,
          schedules: [
            { time: "오전", activity: "도착", description: "목적지 도착" },
            { time: "오후", activity: "관광", description: "주요 관광지 방문" },
            {
              time: "저녁",
              activity: "저녁 식사",
              description: "현지 맛집 방문",
            },
          ],
        },
      ],
    };

    isEditMode
      ? updateMutate({ id: initialData.id, updatedData: itineraryData })
      : addMutate(itineraryData);
  };

  return (
    <>
      <section className="max-w-4xl mx-auto px-4 py-12">
        {/* 상단 안내 문구 */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-semibold text-gray-900">
            나만의 여행 일정 만들기
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            당신만의 특별한 여정을 계획하고 기록하세요. 혼자만의 시간을 더 의미
            있게 만들어 드립니다.
          </p>
        </div>

        {/* 폼 */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
        >
          {/* 제목 */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              여행 제목
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="나만의 특별한 여행을 표현해보세요"
              className="mt-1 w-full border px-3 py-2 rounded-md focus:ring-gray-800 focus:border-gray-800"
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">{errors.title}</p>
            )}
          </div>

          {/* 지역 */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              여행 지역
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="여행할 지역을 입력하세요"
              className="mt-1 w-full border px-3 py-2 rounded-md focus:ring-gray-800 focus:border-gray-800"
            />
            {errors.location && (
              <p className="text-red-500 text-xs mt-1">{errors.location}</p>
            )}
          </div>

          {/* 날짜 선택 */}
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
            {errors.startDate && (
              <p className="text-red-500 text-xs">{errors.startDate}</p>
            )}
            {errors.endDate && (
              <p className="text-red-500 text-xs">{errors.endDate}</p>
            )}
          </div>

          {/* 소개 */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              여행 소개
            </label>
            <textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="이 여행에 담긴 이야기를 들려주세요"
              rows={3}
              className="mt-1 w-full border px-3 py-2 rounded-md focus:ring-gray-800 focus:border-gray-800"
            />
            {errors.summary && (
              <p className="text-red-500 text-xs mt-1">{errors.summary}</p>
            )}
          </div>

          {/* 공개 여부 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              공개 설정
            </label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="radio"
                  name="visibility"
                  value="true"
                  checked={isPublic}
                  onChange={() => setIsPublic(true)}
                />
                전체 공개
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="radio"
                  name="visibility"
                  value="false"
                  checked={!isPublic}
                  onChange={() => setIsPublic(false)}
                />
                나만 보기
              </label>
            </div>
          </div>

          {/* 대표 이미지 업로드 (아직 기능 없음) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              대표 이미지 (선택)
            </label>
            <div className="mt-2 border-2 border-dashed border-gray-300 rounded-md p-6 text-center text-sm text-gray-500">
              여행을 표현할 수 있는 이미지를 업로드해주세요
              <div className="mt-2">
                <button
                  type="button"
                  className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 text-sm"
                >
                  이미지 선택
                </button>
              </div>
            </div>
          </div>

          {/* 제출 버튼 */}
          <div className="flex justify-end">
            <FormSubmitButton
              isLoading={isEditMode ? isUpdating : isAdding}
              label={isEditMode ? "일정 수정하기" : "일정 만들기"}
            />
          </div>
        </form>
        <p className="text-center text-xs text-gray-400 mt-6">
          일정 작성이 완료되면 세부 일정을 추가할 수 있습니다. <br />
          <span className="underline text-gray-500 cursor-pointer">
            도움말 보기
          </span>
        </p>
      </section>

      {/* 혼행 팁 섹션 */}
      <section className="max-w-4xl mx-auto px-4 mt-5 pb-12">
        <div className="mt-6 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-800 mb-4">
            혼행 여정을 위한 팁
          </h3>
          <div className="grid grid-cols-2 gap-6 text-sm text-gray-600">
            {/* 1 */}
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-gray-500 mt-1" />
              <div>
                <p className="font-semibold text-gray-800">
                  여행 시작 지점 선택하기
                </p>
                <p>숙소 근처 또는 도착이 편리한 곳에서 하루를 시작해보세요.</p>
              </div>
            </div>

            {/* 2 */}
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-gray-500 mt-1" />
              <div>
                <p className="font-semibold text-gray-800">
                  충분한 여유 시간 확보
                </p>
                <p>이동 사이에 여유 시간을 둬야 예상치 못한 발견을 즐기세요.</p>
              </div>
            </div>

            {/* 3 */}
            <div className="flex items-start gap-3">
              <BookOpenText className="w-5 h-5 text-gray-500 mt-1" />
              <div>
                <p className="font-semibold text-gray-800">
                  현지 문화 미리 알아보기
                </p>
                <p>
                  현지 음식점, 문화와 예절을 미리 알아두면 경험이 풍부해져요.
                </p>
              </div>
            </div>

            {/* 4 */}
            <div className="flex items-start gap-3">
              <Camera className="w-5 h-5 text-gray-500 mt-1" />
              <div>
                <p className="font-semibold text-gray-800">
                  특별한 순간 기록하기
                </p>
                <p>사진뿐 아니라 메모로 여행의 특별한 순간을 기록해보세요.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
