import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import RatingInput from "./RatingInput";
import ImageUploader from "components/common/ImageUploader";
import InterviewAnswerForm from "components/review/InterviewAnswerForm";
import useAddReview from "services/queries/review/useAddReview";
import { FIXED_QUESTIONS, RANDOM_QUESTIONS } from "data/interviewQuestions";
import ErrorMessage from "components/common/ErrorMessage";
import FormSubmitButton from "components/common/FormSubmitButton";
import { useMutation } from "@tanstack/react-query";
import { updateReviewData } from "services/reviewService";

export default function ReviewForm({ initialData = null, isEditMode = false }) {
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState(initialData?.title || "");
  const [destination, setDestination] = useState(
    initialData?.destination || ""
  );
  const [rating, setRating] = useState(initialData?.rating || 0);
  const [image, setImage] = useState(null);
  const [answers, setAnswers] = useState(initialData?.interviewAnswers || {});
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState(null);

  const navigate = useNavigate();

  const [questions] = useState(
    () =>
      initialData?.interviewQuestions || [
        ...FIXED_QUESTIONS,
        ...RANDOM_QUESTIONS.sort(() => Math.random() - 0.5).slice(0, 3),
      ]
  );

  const { addReview, isLoading } = useAddReview({
    onErrorCallback: (err) => setSubmitError(err.message),
  });

  const { mutate: updateReview, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, updatedData }) => updateReviewData(id, updatedData), // 만들어둔 함수
    onSuccess: () => navigate(`/reviews/${initialData?.id}`),
    onError: () => alert("리뷰 수정 중 오류가 발생했습니다."),
  });

  const handleNextStep = () => {
    const newErrors = {};
    if (!title) newErrors.title = "제목을 입력해주세요.";
    if (!destination) newErrors.destination = "여행지명을 입력해주세요.";
    if (rating === 0) newErrors.rating = "별점을 선택해주세요.";
    if (Object.keys(newErrors).length > 0) return setErrors(newErrors);
    setStep(2);
  };

  const handleChangeAnswer = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const newErrors = {};
      questions.forEach((q) => {
        if (!answers[q.id]?.trim()) {
          newErrors[q.id] = "답변을 작성해주세요.";
        }
      });

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      setErrors({});

      const reviewData = {
        title,
        destination,
        rating,
        image,
        type: "interview",
        interviewAnswers: answers,
        interviewQuestions: questions,
      };

      if (isEditMode && initialData?.id) {
        updateReview({ id: initialData.id, updatedData: reviewData });
      } else {
        addReview(reviewData, {
          onSuccess: () => navigate("/reviews"),
          onError: (err) => setSubmitError(err.message),
        });
      }
    },
    [
      title,
      destination,
      rating,
      image,
      answers,
      questions,
      addReview,
      updateReview,
      isEditMode,
      initialData,
      navigate,
    ]
  );

  return (
    <section
      className="relative min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/review-form-bg.jpg')" }}
    >
      {/* 어두운 오버레이 */}
      <div className="absolute inset-0 bg-black/40" />

      {/* 내용 전체 */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 py-20 text-white">
        {/* 헤더 문구 */}
        <h2 className="text-4xl font-extrabold text-center bg-gradient-to-r from-white/90 to-gray-300 bg-clip-text text-transparent drop-shadow-sm">
          혼자 떠난 그 순간, 당신의 이야기로 남겨보세요
        </h2>
        <p className="text-md mt-4 text-white/80 text-center leading-relaxed">
          낯선 도시, 익숙하지 않은 거리.
          <br />
          홀로 마주한 풍경과 감정을 천천히 풀어보세요.
        </p>

        {/* 폼 */}
        <div className="mt-10">
          {step === 1 && (
            <form className="mt-12 space-y-6 bg-white/60 backdrop-blur-lg p-10 rounded-3xl shadow-md border border-white/30 text-gray-800">
              {/* 제목 */}
              <div>
                <label className="block text-sm font-semibold mb-1">
                  리뷰 제목
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="예: 비 오는 날의 제주 혼행기"
                  className={`w-full bg-white/70 border ${
                    errors.title ? "border-gray-700" : "border-gray-300"
                  } rounded-md px-4 py-2 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-700`}
                />
                <ErrorMessage message={errors.title} />
              </div>

              {/* 여행지명 */}
              <div>
                <label className="block text-sm font-semibold mb-1">
                  여행지명
                </label>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="예: 성산일출봉, 한라산, 월정리 해변"
                  className={`w-full bg-white/70 border ${
                    errors.destination ? "border-gray-700" : "border-gray-300"
                  } rounded-md px-4 py-2 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-700`}
                />
                <ErrorMessage message={errors.destination} />
              </div>

              {/* 별점 */}
              <div>
                <label className="block text-sm font-semibold mb-1">별점</label>
                <RatingInput value={rating} onChange={setRating} />
                <ErrorMessage message={errors.rating} />
              </div>

              {/* 이미지 업로더 */}
              <ImageUploader imageFile={image} onChange={setImage} />

              {/* 다음 단계 버튼 */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-6 py-3 text-sm font-semibold rounded-full bg-white/80 text-gray-800 shadow-md hover:shadow-xl hover:bg-white transition-all backdrop-blur-sm border border-white/30"
                >
                  다음 질문으로 이어가기 →
                </button>
              </div>
            </form>
          )}

          {step === 2 && (
            <form
              onSubmit={handleSubmit}
              className="space-y-10 bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-gray-200 text-gray-800"
            >
              <h2 className="text-2xl font-semibold text-center">
                여행에 대한 질문에 답해주세요
              </h2>

              <InterviewAnswerForm
                questions={questions}
                answers={answers}
                onChange={handleChangeAnswer}
                errors={errors}
              />

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-6 py-3 text-sm font-semibold rounded-full bg-white/70 text-gray-800 shadow-md hover:shadow-xl hover:bg-white transition-all backdrop-blur-sm border border-white/30"
                >
                  ← 이전 단계로 돌아가기
                </button>
                <FormSubmitButton
                  isLoading={isEditMode ? isUpdating : isLoading}
                  label={isEditMode ? "리뷰 수정 완료" : "리뷰 등록 완료"}
                />
              </div>

              {submitError && (
                <p className="text-center text-sm text-red-600 mt-2">
                  {submitError}
                </p>
              )}
            </form>
          )}

          {/* 안내 박스 */}
          <div className="mt-12 bg-white/80 backdrop-blur-md text-sm text-gray-700 px-6 py-5 rounded-xl shadow-sm leading-relaxed">
            <p className="font-semibold text-gray-800 mb-2">리뷰 작성 안내</p>
            <ul className="list-disc list-inside space-y-1 leading-relaxed">
              <li>
                <strong>1단계</strong>: 여행 제목, 장소, 별점, 대표 이미지를
                입력해 주세요.
              </li>
              <li>
                <strong>2단계</strong>: 준비된 질문들에 따라 여행의 감정을
                천천히 풀어내 보세요.
              </li>
              <li>
                각 질문은 <strong>당신만의 여행 이야기</strong>를 더 풍부하게
                만들어줍니다.
              </li>
              <li>
                리뷰는 등록 후에도 <strong>수정하거나 이미지를 추가</strong>할
                수 있어요.
              </li>
              <li>
                작성한 리뷰는 <strong>리스트 페이지</strong>에서도 다른
                여행자들과 함께 공유됩니다.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
