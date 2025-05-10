import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "services/firebase";
import { useMutation } from "@tanstack/react-query";
import { useAddItinerary } from "services/queries/itinerary/useAddItinerary";
import { updateItinerary } from "services/itineraryService";
import DatePicker from "./DatePicker";
import FormSubmitButton from "components/common/FormSubmitButton";
import { BookOpenText, Camera, Clock, MapPin } from "lucide-react";
import ImageUploader from "components/common/ImageUploader";
import ErrorMessage from "components/common/ErrorMessage";

export default function ItineraryForm({ initialData, isEditMode = false }) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [location, setLocation] = useState(initialData?.location || "");
  const [startDate, setStartDate] = useState(initialData?.startDate || "");
  const [endDate, setEndDate] = useState(initialData?.endDate || "");
  const [summary, setSummary] = useState(initialData?.summary || "");
  const [isPublic, setIsPublic] = useState(initialData?.isPublic || true);
  const [errors, setErrors] = useState({});
  const [imageFile, setImageFile] = useState(
    initialData?.imageUrl ? initialData.imageUrl : null
  );

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
      days: initialData?.days || [],
      checklist: initialData?.checklist || { required: [], optional: [] },
      image: imageFile,
    };

    isEditMode
      ? updateMutate({ id: initialData.id, updatedData: itineraryData })
      : addMutate(itineraryData);
  };

  return (
    <>
      <article
        className="relative min-h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/itinerary-form-bg.jpg')" }}
      >
        {/* 어두운 오버레이 */}
        <div className="absolute inset-0 bg-black/40" />

        {/* 내용 전체 */}
        <div className="relative z-10 max-w-3xl mx-auto px-4 py-20 text-white">
          {/* 헤더 문구 */}
          <h2 className="text-4xl font-extrabold text-center bg-gradient-to-r from-white/90 to-gray-300 bg-clip-text text-transparent drop-shadow-sm">
            나만의 여행 일정을 기록해보세요
          </h2>
          <p className="text-md mt-4 text-white/80 text-center leading-relaxed">
            여행의 시작과 끝, 그리고 그 사이의 모든 기억을 <br />
            LoneLeap에서 아름답게 남겨보세요.
          </p>

          {/* 일정 폼 */}
          <form
            onSubmit={handleSubmit}
            className="mt-12 space-y-6 bg-white/60 backdrop-blur-lg p-10 rounded-3xl shadow-md border border-white/30 text-gray-800"
          >
            {/* 여행 제목 */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                여행 제목
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="나만의 특별한 여행을 표현해보세요"
                className={`w-full bg-white/70 border ${
                  errors.title ? "border-gray-700" : "border-gray-300"
                } rounded-md px-4 py-2 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-700`}
              />
              <ErrorMessage message={errors.title} />
            </div>

            {/* 지역 */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                여행 지역
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="여행할 지역을 입력하세요"
                className={`w-full bg-white/70 border ${
                  errors.location ? "border-gray-700" : "border-gray-300"
                } rounded-md px-4 py-2 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-700`}
              />
              <ErrorMessage message={errors.location} />
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
              <ErrorMessage message={errors.startDate} />
              <ErrorMessage message={errors.endDate} />
            </div>

            {/* 한 줄 소개 */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                여행 한 줄 소개
              </label>
              <textarea
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="예: 조용한 바람과 함께 걷는 혼행의 시작"
                className={`w-full bg-white/70 border ${
                  errors.summary ? "border-gray-700" : "border-gray-300"
                } rounded-md px-4 py-2 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-700`}
              />
              <ErrorMessage message={errors.summary} />
            </div>

            {/* 공개 설정 */}
            <div>
              <label className="block text-sm font-semibold mb-2">
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

            {/* 이미지 업로더 */}
            <ImageUploader imageFile={imageFile} onChange={setImageFile} />

            {/* 버튼 */}
            <div className="flex justify-end">
              <FormSubmitButton
                isLoading={isEditMode ? isUpdating : isAdding}
                label={isEditMode ? "일정 수정 완료" : "일정 등록 완료"}
              />
            </div>
          </form>

          {/* 안내 문구 */}
          <p className="text-center text-xs text-white/80 mt-6">
            일정 작성이 완료되면 세부 일정을 추가할 수 있습니다. <br />
            <span className="underline cursor-pointer">도움말 보기</span>
          </p>

          {/* 혼행 팁 섹션 */}
          <section className="mt-16">
            <div className="bg-white/80 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-md">
              <h3 className="text-sm font-semibold text-gray-800 mb-4">
                혼자 떠나는 여행을 위한 짧은 팁
              </h3>
              <div className="grid grid-cols-2 gap-6 text-sm text-gray-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-500 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-800">편안한 시작</p>
                    <p>숙소 가까운 곳에서 여행을 시작해보세요.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-gray-500 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-800">
                      여유 있는 일정
                    </p>
                    <p>계획 사이 여백이 더 많은 경험을 만듭니다.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <BookOpenText className="w-5 h-5 text-gray-500 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-800">
                      마음을 여는 인사
                    </p>
                    <p>간단한 현지 인사말만으로도 거리가 좁혀져요.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Camera className="w-5 h-5 text-gray-500 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-800">
                      기억을 남기세요
                    </p>
                    <p>사진 한 장, 문장 하나가 오래 남습니다.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </article>
    </>
  );
}
